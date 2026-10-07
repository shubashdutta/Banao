import React, { useEffect, useRef, useState } from "react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineItemProps {
  item: StepItem;
  index: number;
}

// const WORK_STEPS = [
//   {
//     step: "1",
//     title: "Browse & Select Service",
//     description:
//       "Explore our catalog of professional home repairs, cleaning, and maintenance. Choose the exact task you need assistance with.",
//     icon: "🔍",
//   },
//   {
//     step: "2",
//     title: "Pick Date & Time",
//     description:
//       "Select a convenient time slot and date that fits your schedule, then provide your location details to lock it in.",
//     icon: "📅",
//   },
//   {
//     step: "3",
//     title: "Transparent Instant Pricing",
//     description:
//       "Review clear, fixed rates upfront with zero hidden costs before confirming your booking request.",
//     icon: "💳",
//   },
//   {
//     step: "4",
//     title: "Expert Arrives at Your Door",
//     description:
//       "A background-checked, skilled professional arrives on time equipped with all the required tools and parts.",
//     icon: "🛠️",
//   },
//   {
//     step: "5",
//     title: "Relax & Pay Securely",
//     description:
//       "Sit back while we get the job done right. Pay easily after service completion and enjoy a hassle-free home.",
//     icon: "✨",
//   },
// ];

export const WORK_STEPS = [
  {
    step: "1",
    title: "Browse & Select Service",
    description:
      "Explore our comprehensive catalog of professional home repairs, cleaning, plumbing, electrical, and maintenance services.",
    icon: "🔍",
  },
  {
    step: "2",
    title: "Pick Location & Schedule",
    description:
      "Pinpoint your exact address and choose a convenient date and time slot that fits seamlessly into your daily routine.",
    icon: "📍",
  },
  {
    step: "3",
    title: "Upfront Transparent Pricing",
    description:
      "Review clear, fixed-rate cost estimates instantly with absolute zero hidden fees before confirming your request.",
    icon: "💳",
  },
  {
    step: "4",
    title: "Instant Expert Matching",
    description:
      "Our system automatically matches your service request with the nearest available, highly-rated professional.",
    icon: "⚡",
  },
  {
    step: "5",
    title: "Verified Expert Arrives",
    description:
      "A background-checked, skilled professional arrives right at your doorstep on time, fully equipped with all necessary tools.",
    icon: "🛠️",
  },
  {
    step: "6",
    title: "Secure & Flexible Payment",
    description:
      "Inspect the completed work and pay conveniently using cash or popular digital wallets like eSewa and Khalti.",
    icon: "📱",
  },
  {
    step: "7",
    title: "Rate & Review Service",
    description:
      "Share your feedback and rating to help us maintain top-tier service quality and accountability across our network.",
    icon: "⭐",
  },
];
function useScrollAnimation() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation when scrolling into view
          setIsVisible(true);
        } else {
          // Reset animation state when scrolling out of view (so it animates again when scrolling back)
          setIsVisible(false);
        }
      },
      { threshold: 0.15 },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible] as const;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const [ref, isVisible] = useScrollAnimation();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center relative transition-all duration-1000 transform ${
        isVisible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${isEven ? "md:-translate-x-24" : "md:translate-x-24"} translate-y-10`
      } ${isEven ? "md:flex-row-reverse text-left md:text-right" : "text-left"}`}
    >
      <div className="w-full md:w-5/12 px-4">
        <div
          className={`flex mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}
        >
          <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center text-xl shadow-md hover:scale-110 transition-transform">
            {item?.icon}
          </div>
        </div>

        <h3 className="text-lg font-bold text-[#FF6B00] mb-1">{item.title}</h3>

        <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-sm">
          {item.description}
        </p>
      </div>

      <div className="my-4 md:my-0 w-9 h-9 rounded-full bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center shadow-md z-20 shrink-0 md:mx-auto ring-4 ring-white">
        {item.step}
      </div>

      <div className="hidden md:block md:w-5/12"></div>
    </div>
  );
}

export default function HowWeWorkCleanUI() {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 pt-15 pb-6 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          How We Work, <span className="text-[#FF6B00]">Our Process</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          We streamline your service experience by understanding your needs,
          matching qualified professionals, and ensuring smooth execution from
          start to finish.
        </p>

        <div className="w-24 h-1 bg-[#FF6B00] mx-auto mt-6 rounded-full opacity-80"></div>
      </div>

      {/* <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white  p-8 md:p-12  transition-shadow">
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Professional team working"
              className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">
              Built on Trust & Transparency
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              At our platform, we follow a structured, transparent, and
              efficient process to provide reliable home repair and maintenance
              solutions for you. Starting from understanding your exact
              requirements, we carefully match and verify qualified
              professionals, manage scheduling seamlessly, and ensure adherence
              to high service standards.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our approach emphasizes smooth execution, prompt arrival, and
              absolute transparency with upfront pricing. We are committed to
              delivering skilled experts who respect your time and contribute to
              making your home maintenance completely hassle-free.
            </p>
          </div>
        </div>
      </div> */}

      <div className="w-full max-w-6xl mx-auto px-0 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-white p-0 md:p-12 transition-shadow">
          <div className="w-full rounded-none md:rounded-2xl overflow-hidden shadow-none md:shadow-md border-y md:border border-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Professional team working"
              className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4 px-6 md:px-0">
            <h3 className="text-xl font-bold text-gray-900">
              Built on Trust & Transparency
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              At our platform, we follow a structured, transparent, and
              efficient process to provide reliable home repair and maintenance
              solutions for you. Starting from understanding your exact
              requirements, we carefully match and verify qualified
              professionals, manage scheduling seamlessly, and ensure adherence
              to high service standards.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our approach emphasizes smooth execution, prompt arrival, and
              absolute transparency with upfront pricing. We are committed to
              delivering skilled experts who respect your time and contribute to
              making your home maintenance completely hassle-free.
            </p>
          </div>
        </div>
      </div>

      <div className="py-10"></div>

      <div className="max-w-3xl mx-auto text-center mb-16 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Step-by-Step Workflow
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
          Our Seamless <span className="text-[#FF6B00]">Process</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative px-6">
        <svg
          className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-24 hidden md:block pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 1000"
          fill="none"
        >
          <path
            d="M50 0 C 10 200, 90 400, 50 600 C 10 800, 90 1000, 50 1200"
            stroke="#FF6B00"
            strokeWidth="3"
            strokeDasharray="8 8"
            opacity="0.6"
          />
        </svg>

        <div className="space-y-24 hidden md:block relative z-10">
          {WORK_STEPS.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>

        <div className=" block md:hidden space-y-6">
          {WORK_STEPS.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-orange-100 text-[#FF6B00] font-bold text-xs flex items-center justify-center">
                {item.step}
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center shadow-sm">
                  <span className="text-sm">{item.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#FF6B00] pr-6">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
