"use client";

import React from "react";
import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import BananoProviderimage from "@/Assets/Image/BanaoProviderImage.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Qrcode from "@/Assets/Image/websiteQr.svg";

const PRO_PROVIDERS = [
  {
    name: "Ramesh Thapa",
    category: "Master Plumber",
    rating: 4.9,
    jobsCompleted: "1,420+",
    location: "Baneshwor, Kathmandu",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    specialty: "Pipe leakage, bathroom fitting, water tanks",
  },
  {
    name: "Sunil Maharjan",
    category: "Senior Electrician",
    rating: 4.8,
    jobsCompleted: "1,150+",
    location: "Patan, Lalitpur",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    specialty: "Wiring checks, switchboard setup, inverter wiring",
  },
  {
    name: "Deepak Karki",
    category: "AC & Appliance Expert",
    rating: 4.9,
    jobsCompleted: "980+",
    location: "Baluwatar, Kathmandu",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop",
    specialty: "AC servicing, gas refill, washing machine repair",
  },
  {
    name: "Anil Shrestha",
    category: "General Handyman",
    rating: 4.7,
    jobsCompleted: "850+",
    location: "Thamel, Kathmandu",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    specialty: "Furniture assembly, TV mounting, door locks",
  },
  {
    name: "Pooja Gurung",
    category: "Deep Cleaning Lead",
    rating: 4.9,
    jobsCompleted: "1,310+",
    location: "Boudha, Kathmandu",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    specialty: "Kitchen degreasing, sofa shampooing, bathroom sanitization",
  },
  {
    name: "Bikash Adhikari",
    category: "Home Painter",
    rating: 4.8,
    jobsCompleted: "720+",
    location: "Bhaktapur",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
    specialty: "Interior wall priming, texture finishes, waterproofing",
  },
];

export default function ProvidersShowcasePage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans">
      {/* 1. TOP HERO BANNER (Flat-lay background image with text overlaid on top) */}
      <div className="relative w-full bg-slate-900 py-28 md:py-36 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={BananoProviderimage}
            alt="Banao Pro Partners Header"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-left space-y-4 pl-6 md:pl-16">
          <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#ff6b00] px-3.5 py-1.5 rounded-full inline-block shadow-sm">
            Independent Expert Network
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Earn More on Your Terms <br />
            <span className="text-[#ff6b00]">With Banao Pro.</span>
          </h1>
          <p className="text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed">
            Are you a skilled independent expert? Connect with homeowners across
            Kathmandu Valley, set your own working hours, and boost your monthly
            income using our digital platform.
          </p>
        </div>
      </div>

      {/* 2. FIRST CONTENT SECTION (Why Join & Stats) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b00] bg-orange-50 px-3.5 py-1.5 rounded-full inline-block">
            Why Join Us
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Built for Independent Professionals
          </h2>
          <p className="text-slate-600 text-sm md:text-base">
            Get a steady stream of customer requests right on your phone so you
            can focus entirely on your craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              📈
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Steady Daily Jobs
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No need to look for clients or spend on advertising. Service
              requests come directly to you.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              ⏰
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Be Your Own Boss
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Work when you want. Accept jobs that fit your personal schedule
              and daily availability.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              💳
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Instant Direct Payouts
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get paid securely and immediately after completing a task via
              eSewa, Khalti, or cash.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center shadow-lg">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              <CountUp
                end={500}
                duration={2.5}
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <div className="text-xs text-slate-400">
              Active Independent Pros
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              4.8★
            </div>
            <div className="text-xs text-slate-400">Average Pro Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              <CountUp
                end={50000}
                duration={2.5}
                separator=","
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <div className="text-xs text-slate-400">
              Successful Jobs Completed
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto bg-white/60 border-y border-slate-200/60 overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b00] bg-orange-50 px-3 py-1 rounded-full inline-block">
            Our Pro Community
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Meet Our Featured Specialists
          </h2>
          <p className="text-slate-600 text-xs md:text-sm">
            Skilled independent experts successfully earning across Kathmandu
            Valley.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {PRO_PROVIDERS.map((pro, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={pro.image}
                        alt={pro.name}
                        className="w-12 h-12 rounded-xl object-cover border border-orange-100 shadow-xs group-hover:scale-105 transition-transform shrink-0"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">
                          {pro.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-[#ff6b00]">
                          {pro.category}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          📍 {pro.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 bg-[#faf9f6] p-2.5 rounded-lg border border-slate-100 leading-snug mb-4">
                      <span className="font-semibold text-slate-900">
                        Focus:{" "}
                      </span>
                      {pro.specialty}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span className="bg-orange-50 text-[#ff6b00] px-2 py-0.5 rounded-md">
                      ★ {pro.rating}
                    </span>
                    <span className="text-slate-500">
                      {pro.jobsCompleted} Jobs
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* 4. FINAL CONTENT & APP DOWNLOAD SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-orange-600 to-[#ff6b00] rounded-3xl p-8 md:p-14 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-block">
              Start Earning Today
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Ready to Work on Your Own Terms?
            </h2>
            <p className="text-orange-100 text-sm md:text-base leading-relaxed">
              Download the Banao Pro app today, create your independent profile,
              and start accepting customer service requests right in your
              neighborhood.
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="#download-android"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Downloading Banao Pro APK");
                }}
                className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                Download Android App
              </a>
              <a
                href="#download-ios"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Redirecting to App Store");
                }}
                className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
              >
                Download iOS App
              </a>
            </div>
          </div>

          <div className="bg-white text-slate-900 p-6 rounded-2xl shadow-lg text-center shrink-0 w-64 space-y-3">
            <div className="w-32 h-32 mx-auto bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center p-2">
              <img
                src={Qrcode}
                alt="Scan QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs font-bold text-slate-700">
              Scan to install Banao Pro
            </p>
            <p className="text-[10px] text-slate-400">
              For independent experts
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
