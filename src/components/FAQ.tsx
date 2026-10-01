import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Which cities in Nepal does Banao currently operate in?",
    answer:
      "Banao currently serves Kathmandu, Lalitpur, and Bhaktapur throughout the Kathmandu Valley, as well as Pokhara. We are expanding to Butwal, Biratnagar, and Chitwan soon. Same-day service is available 7 days a week from 7:00 AM to 9:00 PM.",
  },
  {
    question: "How are Banao professionals vetted and verified?",
    answer:
      "Every technician and service partner undergoes a 3-step screening: (1) Government citizenship and address verification, (2) Criminal record check with Nepal Police clearance, and (3) Practical trade skills test conducted by our senior master technicians.",
  },
  {
    question: "Are the prices fixed or will the professional quote extra?",
    answer:
      "All inspection and standard labour fees are clearly listed upfront on Banao before you confirm your booking. If spare parts (like water pipes, valves, circuit breakers, or switches) are needed, our pro will provide an itemized quote with standard store receipts before proceeding.",
  },
  {
    question: "What if I am unhappy with the repair quality?",
    answer:
      "We stand behind every service with our 7-Day Banao Guarantee. If any issue re-occurs within 7 days of completion, we will dispatch another senior professional to re-inspect and fix it free of charge.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "You only pay after the job is completed and inspected. We accept Cash on Delivery, eSewa, Khalti, and Fonepay mobile banking QR scans directly with the technician.",
  },
  {
    question: "Can I request emergency same-day repairs?",
    answer:
      "Yes! Emergency bookings for sudden electrical blackouts, burst pipes, and bathroom blockages are prioritized for dispatch within 30 to 45 minutes across Kathmandu and Lalitpur.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-neutral-200/80">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-eyebrow">COMMON QUESTIONS</div>
            <h2 className="section-heading">Frequently Asked Questions.</h2>
            <p className="section-sub mx-auto">
              Everything you need to know about booking, pricing, and our
              verified pros.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-neutral-200/90 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 bg-white hover:bg-neutral-50/70 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-neutral-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-neutral-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#FF6B35]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed bg-white border-t border-neutral-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
