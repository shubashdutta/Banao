import React, { useState } from "react";

const SERVICES_LIST = [
  {
    title: "General Handyman",
    category: "Repairs",
    image:
      "https://plus.unsplash.com/premium_photo-1661342490985-26da70d07a52?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Quick home fixes, TV mounting, furniture assembly, and lock repairs.",
    startingPrice: "Rs. 400",
  },
  {
    title: "Plumbing Solutions",
    category: "Repairs",
    image:
      "https://plus.unsplash.com/premium_photo-1664301972519-506636f0245d?q=80&w=1196&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Leak detection, pipe sealing, faucet setup, and drain cleaning.",
    startingPrice: "Rs. 500",
  },
  {
    title: "Electrical Maintenance",
    category: "Repairs",
    image:
      "https://plus.unsplash.com/premium_photo-1661911021547-b0188f22d548?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Wiring checks, switchboard replacement, and light installations.",
    startingPrice: "Rs. 450",
  },
  {
    title: "Deep House Cleaning",
    category: "Cleaning",
    image:
      "https://plus.unsplash.com/premium_photo-1663011218145-c1d0c3ba3542?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Kitchen degreasing, bathroom disinfection, and thorough dusting.",
    startingPrice: "Rs. 1,500",
  },
  {
    title: "AC Servicing & Repair",
    category: "Maintenance",
    image:
      "https://plus.unsplash.com/premium_photo-1682126009570-3fe2399162f7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Filter deep clean, cooling check, and refrigerant gas refilling.",
    startingPrice: "Rs. 800",
  },
  {
    title: "Home Painting",
    category: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Interior wall prep, priming, and smooth texture finishes.",
    startingPrice: "Free Quote",
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Repairs", "Cleaning", "Maintenance"];

  const filteredServices =
    selectedCategory === "All"
      ? SERVICES_LIST
      : SERVICES_LIST.filter((s) => s.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00] bg-orange-50 px-3 py-1.5 rounded-full inline-block mb-3">
          Professional Home Solutions
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
          Quality Services, Delivered Right <br />
          <span className="text-[#FF6B00]">To Your Doorstep.</span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From minor repairs to major upkeep, connect with verified and
          experienced professionals who get the job done right the first time.
        </p>

        <div className="w-full overflow-x-auto no-scrollbar py-2 mt-8">
          <div className="flex justify-start sm:justify-center gap-2 px-4 min-w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#ff6b00] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-gray-900/80 px-2.5 py-0.5 rounded">
                      {service.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[11px] font-semibold text-gray-900 bg-white/90 px-2 py-0.5 rounded shadow-xs">
                      {service.startingPrice}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-[#FF6B00] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-5 pb-5 pt-0">
                <button
                  onClick={() =>
                    alert(`Booking flow started for: ${service.title}`)
                  }
                  className="w-full bg-orange-500 hover:bg-orange-400 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-b border-gray-200 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Why Homeowners Trust Us
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            We ensure safety, transparency, and top-tier quality on every single
            booking.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-10 h-10 bg-orange-100 text-[#FF6B00] rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">
              ✓
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Verified Professionals
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              All experts undergo strict background checks, skill tests, and
              identity verification before joining.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-10 h-10 bg-orange-100 text-[#FF6B00] rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">
              ₹
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Transparent Pricing
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              No hidden fees or surprise costs. Review standard rates upfront
              before confirming any booking.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            <div className="w-10 h-10 bg-orange-100 text-[#FF6B00] rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">
              🛡️
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              Satisfaction Guarantee
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              We stand by our work. If you are not completely satisfied, our
              support team ensures it gets resolved.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CALL TO ACTION BANNER */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-[#FF6B00] text-white rounded-2xl p-8 md:p-12 text-center shadow-md">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Ready to get started?
          </h2>
          <p className="text-sm md:text-base opacity-90 max-w-lg mx-auto mb-6">
            Download our app or book online in seconds. Let us handle the chores
            while you relax.
          </p>
          <button
            onClick={() => alert("App download or booking triggered")}
            className="bg-white text-[#FF6B00] hover:bg-gray-100 font-bold px-8 py-3 rounded-xl text-sm transition-colors cursor-pointer shadow-sm"
          >
            Book a Service Now
          </button>
        </div>
      </div>
    </div>
  );
}
