import React, { useState } from "react";
import {
  CalendarClock,
  ShieldCheck,
  CreditCard,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Pick your service & slot",
    subtitle: "Transparent pricing with no hidden charges",
    description: "Choose from plumbing, electrical, cleaning, or beauty.",
    icon: CalendarClock,
    highlight: "Instant confirmation in 60 seconds",
    color: "#FF6B35",
    bgColor: "#FFF0E8",
  },
  {
    number: "02",
    title: "Verified Pro arrives on time",
    subtitle: "Equipped with tools and verified credentials",
    description:
      "Our background-verified professional arrives at your doorstep on time. ",
    icon: ShieldCheck,
    highlight: "Police-verified & trade-certified",
    color: "#FF6B35",
    bgColor: "#FFF0E8",
  },
  {
    number: "03",
    title: "Inspect & pay when satisfied",
    subtitle: "Cash, eSewa, Khalti, or card",
    description: "Review the completed work thoroughly before paying.",
    icon: CreditCard,
    highlight: "7-day rework guarantee on every job",
    color: "#FF6B35",
    bgColor: "#FFF0E8",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      className="py-20 bg-white border-b border-neutral-200/70"
    >
      <div className="container">
        <div className="max-w-3xl mb-14">
          <div className="section-eyebrow">HOW BANAO WORKS</div>
          <h2 className="section-heading capitalize">
            Home services in three simple steps.
          </h2>
          <p className="section-sub  !sm:text-lg ">
            From booking To Payment, We Eliminate Uncertainty with Upfront
            Pricing and Verified Professionals.
          </p>
        </div>

        {/* 3 Step Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = activeStep === index;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(index)}
                className={`relative rounded-2xl p-7 border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#FAFAFA] border-neutral-900 shadow-md"
                    : "bg-white border-neutral-200/90 hover:border-neutral-300 hover:shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-neutral-300 font-display">
                    {step.number}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs"
                    style={{ backgroundColor: step.bgColor }}
                  >
                    <Icon size={22} color={step.color} />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                  {step.title}
                </h3>
                <div className="text-xs font-semibold text-[#FF6B35] mb-3">
                  {step.subtitle}
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div> */}

        <div className="relative">
          <div className="relative">
            <div className="hidden md:block absolute bottom-22 left-0 right-0 h-[1px] bg-neutral-200 z-0" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isSelected = activeStep === index;
                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={`relative rounded-2xl p-7 border transition-all duration-200 cursor-pointer bg-white ${
                      isSelected
                        ? "border-neutral-900 shadow-md ring-2 ring-neutral-900/5"
                        : "border-neutral-200/90 hover:border-neutral-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-black text-neutral-300 font-display">
                        {step.number}
                      </span>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs relative z-10"
                        style={{ backgroundColor: step.bgColor }}
                      >
                        <Icon size={22} color={step.color} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-neutral-900 mb-1.5">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#FF6B35] mb-3">
                      {step.subtitle}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
