import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  initials: string;
  service: string;
  location: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Sita arrived right on time to fix our wiring issue in Patan. Extremely professional, equipped with all the right tools, and completely transparent with pricing. Highly recommend Banao!",
    name: "Anish Rajbhandari",
    initials: "AR",
    service: "Electrical Service",
    location: "Jhamsikhel, Lalitpur",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Booked a deep cleaning session for my apartment before a family gathering. The team was thorough, polite, and left every corner spotless. Absolutely worth every rupee.",
    name: "Pooja Shrestha",
    initials: "PS",
    service: "Deep Home Cleaning",
    location: "Baneshwor, Kathmandu",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Had a major pipe leak under the kitchen sink. The plumber came within 45 minutes of booking and fixed it cleanly without any mess. Super fast and reliable service!",
    name: "Bikash Gurung",
    initials: "BG",
    service: "Plumbing Repair",
    location: "Lakeside, Pokhara",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "The carpentry work for our customized shoe rack was exceptional. Clean finishes and great attention to detail. So glad I found a trusted service provider in Kathmandu.",
    name: "Sneha Maharjan",
    initials: "SM",
    service: "Carpentry & Furniture",
    location: "Sanepa, Lalitpur",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Booked an AC servicing and gas refill right before summer. The technician was extremely knowledgeable and gave great tips on maintenance. Fantastic experience overall.",
    name: "Prashant Karki",
    initials: "PK",
    service: "Appliance Maintenance",
    location: "Baluwatar, Kathmandu",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "Getting salon services right at home is a game changer for busy weekends. Professional kit, clean execution, and zero hassle. Will definitely book again.",
    name: "Rojina Thapa",
    initials: "RT",
    service: "Salon & Beauty at Home",
    location: "Jhamsikhel, Lalitpur",
    rating: 5,
  },
];

const TestimonialPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = testimonials.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-20 px-6 sm:px-10 lg:px-20 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto pb-5">
        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest px-3.5 py-1 bg-[#FF6B35]/10 text-[#FF6B35] rounded-full">
              Trusted Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              What Homeowners Say About{" "}
              <span className="text-[#FF6B35]">Banao</span>
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base">
              Real experiences from real households across the Kathmandu Valley
              and Pokhara.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all cursor-pointer shadow-xs"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:bg-[#FF6B35] hover:text-white hover:border-[#FF6B35] transition-all cursor-pointer shadow-xs"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Sliding Track Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-8"
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21.33px)] shrink-0 pb-3"
              >
                <div className="h-full relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col justify-between overflow-hidden group">
                  {/* Decorative Background Accent */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF6B35]/5 rounded-bl-full pointer-events-none group-hover:bg-[#FF6B35]/10 transition-colors" />

                  <div className="relative z-10 flex flex-col gap-6">
                    {/* Top Bar: Rating Stars & Verified Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-amber-400 fill-amber-400"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Verified
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <blockquote className="text-neutral-700 text-sm sm:text-base font-medium leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Customer Info / Footer */}
                  <div className="flex items-center gap-4 pt-6 mt-6 border-t border-neutral-100 relative z-10">
                    <div className="w-11 h-11 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-sm shadow-md shadow-[#FF6B35]/20 shrink-0">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-neutral-900">
                        {item.name}
                      </div>
                      <div className="text-xs font-medium text-neutral-500">
                        {item.service} · {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialPage;
