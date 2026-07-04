"use client";
import { useEffect, useRef } from "react";

export default function FloatingDotsCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate high quality floating dots / starry particles
    const numDots = Math.floor((width * height) / 7500) + 50;
    const dots = Array.from({ length: numDots }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.5,
      baseAlpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.008,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.22 + 0.05), // float slowly upwards
    }));

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        // Move dot
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap boundaries
        if (dot.y < 0) {
          dot.y = height;
          dot.x = Math.random() * width;
        }
        if (dot.x < 0) dot.x = width;
        if (dot.x > width) dot.x = 0;

        // Smooth pulse / twinkle effect
        const currentAlpha = Math.max(
          0.15,
          Math.min(0.95, dot.baseAlpha + Math.sin(t * 3.5 + dot.x * 0.05 + dot.y * 0.05) * 0.3)
        );

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        if (dot.radius > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
