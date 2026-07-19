"use client";
import React from "react";
import { ASSET } from "./data";

export default function LogoBrand({ className = "", size = "normal", hideTextOnMobile = false }) {
  const isSm = size === "sm";

  return (
    <div className={`flex items-center  shrink-0 select-none ${className}`}>
      {/* Rocket Icon */}
      <img
        src={ASSET.logo}
        alt="Supersonic Mails"
        className={isSm ? "h-9 sm:h-10 w-auto object-contain shrink-0" : "h-[42px] sm:h-[58px] md:h-[64px] w-auto object-contain shrink-0"}
      />

      {/* Text Stack: SUPERSONIC on top, Mails ---- Previously Bad Retention on bottom */}
      <div
        className={`${
          hideTextOnMobile ? "hidden min-[480px]:flex" : "flex"
        } flex-col text-left leading-none justify-center`}
      >
        <span
          className={`font-black text-white uppercase font-sans tracking-tight ${isSm ? "text-[16px] sm:text-[18px]" : "text-[17px] sm:text-[26px] md:text-[28px]"
            }`}
        >
          S U P E R S O N I C
        </span>
        <div className="flex items-center w-full mt-1 sm:mt-1.5">
          <span
            className={`font-bold text-white/95 font-sans shrink-0 ${isSm ? "text-[11px] sm:text-[12px]" : "text-[11px] sm:text-[15px]"
              }`}
          >
            Mails
          </span>
          <span className="h-[2px] flex-1 mx-1.5 sm:mx-2 bg-gradient-to-r from-white via-white/50 to-transparent" />
          <span
            className={`font-medium text-white/90 whitespace-nowrap font-sans shrink-0 ${isSm ? "text-[10px] sm:text-[11px]" : "text-[10px] sm:text-[14px]"
              }`}
          >
            Previously Bad Retention
          </span>
        </div>
      </div>
    </div>
  );
}
