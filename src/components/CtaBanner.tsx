import React, { useEffect, useRef, useState } from "react";
import video from "../Assets/CtaVideo.mp4";

import Image from "@/Assets/Image/MyTime.png";

const CtaBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger when at least 20% of the section is visible on screen
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Run animation only once when scrolled into view
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-orange-500 rounded-2xl py-16 px-6 sm:px-10 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Column: Text & CTA */}
        <div
          className={`flex-1 text-left space-y-6 ${
            isVisible
              ? "animate__animated animate__fadeInLeft animate__fast"
              : "opacity-0"
          }`}
        >
          <img
            src={Image}
            alt="Image"
            className="h-auto w-auto object-contain"
          />
          {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display capitalize">
            Your home. <br />
            Your time. <br />
            <span className="text-[#2D1B14]">Your Banao.</span>
          </h1> */}
          <p className=" text-white text-base sm:text-lg max-w-lg font-normal leading-relaxed tracking-wide">
            Professional, reliable home services booked seamlessly around your
            routine. Experience stress-free maintenance and top-tier quality
            right at your doorstep.
          </p>
          <div className="pt-2">
            <button
              type="button"
              className="bg-white text-[#FF6B35] font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
            >
              Book a Service
            </button>
          </div>
        </div>

        {/* Right Column: Video Container */}
        <div
          className={`flex-1 w-full max-w-xl ${
            isVisible
              ? "animate__animated animate__fadeInRight animate__fast"
              : "opacity-0"
          }`}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[16/10] bg-[#2D1B14]/30 flex items-center justify-center">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
