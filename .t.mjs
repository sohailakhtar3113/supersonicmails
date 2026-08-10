import { chromium } from "playwright";
const OUT="C:/Users/sohai/AppData/Local/Temp/claude/c--projects-supersonicmails/7eaf53e1-0444-4c88-8cea-3281d368983a/scratchpad";
const b=await chromium.launch();
const sizes=[["laptop-sm",1280,720],["laptop",1440,800],["laptop-tall",1440,900],["desktop",1920,1080],["tablet",820,1000],["iPhone17",402,874],["iPhone15",390,844],["SE",375,667]];
let fails=0;
for (const [tag,W,H] of sizes) {
  const p=await b.newPage({viewport:{width:W,height:H},isMobile:W<500,hasTouch:W<500});
  const errs=[];p.on("pageerror",e=>errs.push(e.message));
  await p.goto("http://localhost:3262/",{waitUntil:"networkidle"});
  const top=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(e=>e.textContent.includes('8-Fig Scaling'));
    return window.scrollY+h.closest('section').querySelector(':scope > div').getBoundingClientRect().top;});
  let clip=0, navOv=0, headCov=0;
  for (const f of [0.15,0.35,0.55,0.75,0.97]) {
    await p.evaluate(y=>window.scrollTo(0,y), top + f*(3.6-1)*H);
    await p.waitForTimeout(650);
    const m=await p.evaluate(()=>{
      const navB=document.querySelector('header nav').getBoundingClientRect().bottom;
      const h2=[...document.querySelectorAll('h2')].find(e=>e.textContent.includes('8-Fig Scaling')).getBoundingClientRect();
      const cards=[...document.querySelectorAll('.sticky [class*="rounded-[24px]"]')].map(c=>c.getBoundingClientRect());
      const stage=document.querySelector('.sticky').getBoundingClientRect();
      return {navOv:Math.round(navB-h2.top),
              clip:Math.round(Math.max(...cards.map(r=>r.bottom))-stage.height),
              headCov:Math.round(h2.bottom-Math.min(...cards.map(r=>r.top)))};
    });
    clip=Math.max(clip,m.clip); navOv=Math.max(navOv,m.navOv); headCov=Math.max(headCov,m.headCov);
  }
  const ok=clip<=0&&navOv<=0&&headCov<=0; if(!ok)fails++;
  console.log(`${tag.padEnd(11)} ${String(W).padStart(4)}x${H}: nav ${navOv<=0?'✅':'❌+'+navOv} | clip ${clip<=0?'✅':'❌+'+clip} | h2 covered by deck ${headCov<=0?'✅':'❌+'+headCov}  ${errs.length?errs:''}`);
  await p.close();
}
console.log(fails?`\n${fails} failing`:"\nAll clear ✅");
// settled screenshots
for (const [tag,W,H] of [["laptop",1440,800],["iPhone17",402,874]]) {
  const p=await b.newPage({viewport:{width:W,height:H},isMobile:W<500,hasTouch:W<500});
  await p.goto("http://localhost:3262/",{waitUntil:"networkidle"});
  const top=await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(e=>e.textContent.includes('8-Fig Scaling'));
    return window.scrollY+h.closest('section').querySelector(':scope > div').getBoundingClientRect().top;});
  await p.evaluate(y=>window.scrollTo(0,y), top + 0.97*(3.6-1)*H);
  await p.waitForTimeout(1600);
  await p.screenshot({path:`${OUT}/final-${tag}.png`});
  await p.close();
}
await b.close();
