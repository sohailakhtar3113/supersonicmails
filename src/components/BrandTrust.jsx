"use client";
import React from "react";
import FloatingDotsCanvas from "./FloatingDotsCanvas";

export default function BrandTrust() {
  return (
    <section className="relative w-full overflow-hidden bg-[#06070B] py-20 md:py-28 text-white select-none border-b border-[#3362FF]/50 shadow-[0_10px_30px_rgba(51,98,255,0.15)]">
      {/* Floating Dots Canvas Background */}
      <FloatingDotsCanvas />

      {/* Radial Soft Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(51,98,255,0.3) 0%, rgba(51,98,255,0.1) 50%, transparent 80%)",
        }}
      />

      {/* Glowing Bottom Blue Accent Line */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#3362FF] to-transparent opacity-90" />

      <div className="container-page relative z-10 mx-auto px-4 text-center">
        {/* Section Heading */}
        <h2
          className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-white tracking-normal leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          The World’s Top Brands{" "}
          <span className="inline-block border-[1.5px] border-[#3362FF] px-3 py-0.5 mx-1 sm:mx-1.5 text-white rounded-[2px] shadow-[0_0_12px_rgba(51,98,255,0.35)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(51,98,255,0.7)]">
            Trust
          </span>{" "}
          Supersonic Mails
        </h2>

        {/* Brand Logos Container */}
        <div className="mt-14 sm:mt-16 flex flex-col items-center gap-10 md:gap-14">
          {/* Row 1 Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {/* 1. Unilever */}
            <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <svg className="h-8 w-auto fill-white" viewBox="0 0 100 100">
                <path d="M22,15 C22,15 14,32 14,54 C14,76 30,86 50,86 C70,86 86,76 86,54 C86,32 78,15 78,15 C78,15 71,26 71,42 C71,58 60,69 50,69 C40,69 29,58 29,42 C29,26 22,15 22,15 Z M50,22 C53,22 55,24 55,27 C55,30 53,32 50,32 C47,32 45,30 45,27 C45,24 47,22 50,22 Z M35,42 C38,42 40,44 40,47 C40,50 38,52 35,52 C32,52 30,50 30,47 C30,44 32,42 35,42 Z M65,42 C68,42 70,44 70,47 C70,50 68,52 65,52 C62,52 60,50 60,47 C60,44 62,42 65,42 Z" />
              </svg>
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wide italic text-white">
                Unilever
              </span>
            </div>

            {/* 2. Kao */}
            <div className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tighter text-white">
                kāo
              </span>
            </div>

            {/* 3. Dēpology */}
            <div className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-white">
                Dēpology
              </span>
            </div>

            {/* 4. CROSSROPE */}
            <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <svg className="h-6 w-auto fill-white" viewBox="0 0 50 30">
                <path d="M5,15 C12,2 25,28 35,15 C40,8 45,8 48,15 C42,28 28,2 18,15 C12,22 8,22 5,15 Z" />
              </svg>
              <span className="font-sans text-xl sm:text-2xl font-black tracking-[0.18em] uppercase text-white">
                CROSSROPE
              </span>
            </div>

            {/* 5. Bondi Meal Prep */}
            <div className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="relative flex flex-col items-center justify-center p-2 rounded-full border border-dashed border-white/70 text-white text-center w-20 h-20 shrink-0">
                <span className="text-[7px] tracking-widest uppercase font-mono opacity-80">
                  PERFORMANCE
                </span>
                <span className="font-serif text-[12px] leading-tight font-bold italic">
                  Bondi
                </span>
                <span className="font-sans text-[8px] uppercase tracking-wider font-black">
                  Meal prep
                </span>
                <span className="text-[6px] tracking-widest uppercase font-mono opacity-80">
                  NUTRITION
                </span>
              </div>
            </div>
          </div>

          {/* Row 2 Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {/* 6. CARNIVORE SNAX */}
            <div className="flex flex-col text-left font-black tracking-wider leading-none text-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-sm sm:text-base font-extrabold">CARNIVORE</span>
              <span className="text-xl sm:text-2xl font-black tracking-[0.15em]">SNAX</span>
            </div>

            {/* 7. RAYCON */}
            <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <svg className="h-6 w-auto fill-white" viewBox="0 0 32 32">
                <path d="M16 2 A14 14 0 1 0 30 16 A14 14 0 0 0 16 2 Z M16 6 A10 10 0 0 1 26 16 C26 20 23 23 19 23 L14 16 L19 16 A4 4 0 0 0 19 8 L11 8 L11 24 L7 24 L7 6 Z" />
              </svg>
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-widest text-white">
                RAYCON
              </span>
            </div>

            {/* 8. Nutrition Kitchen */}
            <div className="relative flex flex-col items-center text-white opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              {/* Floating glowing dot above logo as seen in user reference image */}
              <div className="absolute -top-3.5 left-1/3 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_20px_#ffffff] animate-pulse" />
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight">
                Nutrition
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase font-bold text-gray-300 -mt-1">
                KITCHEN
              </span>
            </div>

            {/* 9. Loftie */}
            <div className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-white">
                Loftie
              </span>
            </div>

            {/* 10. PuraŪ */}
            <div className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
                PuraŪ
              </span>
            </div>

            {/* 11. SUBTL BEAUTY */}
            <div className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="font-serif text-3xl sm:text-4xl font-light text-white leading-none">
                8
              </span>
              <div className="flex flex-col text-left text-[9px] sm:text-[10px] font-bold tracking-[0.22em] leading-tight text-white">
                <span>SUBTL</span>
                <span>BEAUTY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
