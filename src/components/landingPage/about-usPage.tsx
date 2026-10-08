"use client";

import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-orange-50/60 to-[#faf9f6] pt-16 pb-20 px-6 text-center border-b border-orange-100/50">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-semibold text-xs tracking-wider uppercase rounded-full">
            About Banao
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Need It Fixed? <span className="text-[#ff6b00]">Just Banao.</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your ultimate on-demand home solutions platform. We bring trusted,
            vetted professionals right to your doorstep with total transparency
            and zero hassle.
          </p>
        </div>
      </section>

      {/* 2. Story / Mission Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-snug">
              Transforming How You Manage Home Services & Repairs.
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Finding reliable electricians, plumbers, appliance technicians, or
              cleaners can often be frustrating. At Banao, we built a digital
              ecosystem that cuts out the uncertainty. Every service provider is
              rigorously checked, trained, and rated to ensure your home is in
              safe hands.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether it is a minor fixture fix or a major maintenance task, we
              empower your daily routine with speed, safety, and fixed upfront
              pricing.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#ff6b00] text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-[#e05e00] transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Highlight Feature Card Block */}
          <div className="bg-[#ff6b00] text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-black select-none">
              🔧
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Core Mission</h3>
            <p className="text-orange-100 leading-relaxed mb-6">
              To deliver seamless, high-quality home care services powered by
              technology, ensuring absolute peace of mind for every homeowner.
            </p>
            <ul className="space-y-3 text-sm font-medium text-orange-50">
              <li className="flex items-center gap-2">
                ✓ 100% Background-Checked Experts
              </li>
              <li className="flex items-center gap-2">
                ✓ Transparent & Fixed Pricing
              </li>
              <li className="flex items-center gap-2">
                ✓ Real-time Support Guarantee
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Animated Stats Bar using react-countup */}
      <section className="bg-slate-900 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              <CountUp
                end={10000}
                duration={2.5}
                separator=","
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <div className="text-xs md:text-sm text-slate-400">
              Happy Homeowners
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              <CountUp
                end={500}
                duration={2.5}
                separator=","
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <div className="text-xs md:text-sm text-slate-400">
              Verified Technicians
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              <CountUp
                end={15}
                duration={2}
                suffix="+"
                enableScrollSpy
                scrollSpyOnce
              />
            </div>
            <div className="text-xs md:text-sm text-slate-400">
              Service Categories
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-[#ff6b00] mb-1">
              4.8★
            </div>
            <div className="text-xs md:text-sm text-slate-400">
              Average Customer Rating
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three-Step / Values Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Why People Trust Banao
          </h2>
          <p className="text-slate-600 text-sm">
            Simple, useful, and trustworthy everyday services for your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              🛡️
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Verified & Secure
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every provider goes through stringent profile checks and practical
              assessments to safeguard your household.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              ⚡
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Quick Booking
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Book appointments in just a few taps using our mobile-friendly
              platform or app layout.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-xl mb-4">
              🤝
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Complete Support
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our customer success team stays connected with you from booking
              confirmation until the job is fully complete.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
