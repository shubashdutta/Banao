import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
  category: "booking" | "services" | "pricing" | "safety";
}

const faqData: FAQItem[] = [
  {
    category: "booking",
    question: "How do I book a service on Banao?",
    answer:
      "Booking is simple! Choose your required service category, select a convenient date and time slot, provide your address, and confirm your booking in just a few taps.",
  },
  {
    category: "booking",
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes, you can easily reschedule or cancel your booking through your user dashboard or by reaching out to our support team up to 2 hours before the scheduled appointment time.",
  },
  {
    category: "services",
    question: "What types of home services do you offer?",
    answer:
      "We offer a wide variety of on-demand home solutions including plumbing, electrical maintenance, appliance repairs, deep house cleaning, carpentry, and general home upkeep.",
  },
  {
    category: "services",
    question: "Are the service professionals background-checked?",
    answer:
      "Absolute safety is our priority. Every technician and service partner undergoes strict background screening, identity verification, and practical skills evaluations before joining Banao.",
  },
  {
    category: "pricing",
    question: "Are there any hidden charges or extra fees?",
    answer:
      "No. We believe in 100% pricing transparency. All service rates and estimated parts or labor costs are shown upfront before you confirm your appointment.",
  },
  {
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept secure digital payments, online banking options, mobile wallets, and cash on completion depending on your preference.",
  },
  {
    category: "safety",
    question: "What happens if something gets damaged during the service?",
    answer:
      "All services booked through Banao are backed by our customer satisfaction guarantee. If any accidental damage occurs due to our technician, our support team will investigate and make it right.",
  },
];

const faqPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqData?.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item?.category === activeCategory;

    const matchesSearch =
      item?.question
        ?.toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      item?.answer.toLocaleLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans pb-24">
      {/* 1. Hero Header */}
      <section className="bg-gradient-to-b from-orange-50/60 to-[#faf9f6] pt-16 pb-16 px-6 text-center border-b border-orange-100/50">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-semibold text-xs tracking-wider uppercase rounded-full">
            Help & Support
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Frequently Asked <span className="text-[#ff6b00]">Questions</span>
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
            Got questions about bookings, pricing, or safety? Find quick answers
            right here or get in touch with our team.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search your question (e.g., booking, payment)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-[#ff6b00] transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Questions" },
            { id: "booking", label: "Booking & Schedule" },
            { id: "services", label: "Services & Pros" },
            { id: "pricing", label: "Pricing & Payments" },
            { id: "safety", label: "Safety & Guarantee" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={` cursor-pointer px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-[#ff6b00] text-white shadow-md shadow-orange-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-orange-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className=" cursor-pointer w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 focus:outline-none"
                  >
                    <span className="text-base md:text-lg">{faq.question}</span>
                    <span
                      className={`h-8 w-8 rounded-full bg-orange-50 text-[#ff6b00] flex items-center justify-center font-bold text-lg transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-45 bg-[#ff6b00] text-white" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-base">
                No matching questions found.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-3 text-[#ff6b00] font-semibold text-sm hover:underline"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4. Still Have Questions Callout */}
      <section className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none">
            💬
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Still have questions?
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
            Can't find the answer you're looking for? Our friendly customer
            support team is available 24/7 to help you out.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#ff6b00] text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-[#e05e00] transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default faqPage;
