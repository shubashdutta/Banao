"use client";

import React from "react";

const PARTNERS = [
  { name: "Bidhee Pvt. Ltd.", logoText: "Bidhee" },
  { name: "Careercraft", logoText: "Careercraft" },
  { name: "Nectar Digit", logoText: "Nectar Digit" },
  { name: "Kathmandu Expo", logoText: "Kathmandu Expo" },
  { name: "Valley Builders", logoText: "Valley Builders" },
  { name: "Home Experts", logoText: "Home Experts" },
];

export default function PartnersShowcase() {
  return (
    <section className="bg-white border-t border-slate-200/80 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12 px-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ff6b00] bg-orange-50 px-3.5 py-1.5 rounded-full inline-block">
          Our Ecosystem
        </span>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Trusted Strategic & Operational Partners
        </h3>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap items-center gap-16 py-4 group-hover:[animation-play-state:paused]">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 group/item"
            >
              <span className="font-black text-lg md:text-xl tracking-tight text-orange-300 hover:text-[#ff6b00] transition-all duration-300 select-none">
                {partner.logoText}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
