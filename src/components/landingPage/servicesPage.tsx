import React, { useState } from "react";

const SERVICES_DATA = [
  {
    id: 1,
    category: "repairs",
    title: "Expert Plumbing Repair",
    description:
      "Leak fixes, pipe installations, drain cleaning, and emergency plumbing services by verified pros.",
    price: "Starts at Rs. 500",
    icon: "🚰",
  },
  {
    id: 2,
    category: "repairs",
    title: "Electrical Maintenance",
    description:
      "Wiring, switchboard fixes, appliance installation, and safety checks handled safely.",
    price: "Starts at Rs. 400",
    icon: "⚡",
  },
  {
    id: 3,
    category: "cleaning",
    title: "Deep Home Cleaning",
    description:
      "Comprehensive deep cleaning for kitchens, bathrooms, living rooms, and complete apartments.",
    price: "Starts at Rs. 1,500",
    icon: "🧹",
  },
  {
    id: 4,
    category: "maintenance",
    title: "AC Servicing & Repair",
    description:
      "Gas refilling, general filter cleaning, cooling checks, and complete unit servicing.",
    price: "Starts at Rs. 800",
    icon: "❄️",
  },
  {
    id: 5,
    category: "repairs",
    title: "Appliance Repair",
    description:
      "Quick diagnostics and repair for washing machines, refrigerators, microwaves, and more.",
    price: "Starts at Rs. 600",
    icon: "🔧",
  },
  {
    id: 6,
    category: "maintenance",
    title: "Home Painting & Touchups",
    description:
      "Interior and exterior wall painting, waterproofing, and texture design by professionals.",
    price: "Get Free Quote",
    icon: "🎨",
  },
];

const servicesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredServices =
    activeTab === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((item) => item.category === activeTab);

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="text-center py-16 px-4 bg-white border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Whatever Your Home Needs,{" "}
          <span className="text-[#FF6B00]">We've Got It Covered.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8">
          Explore our wide range of professional home services. Book trusted
          experts in just a few taps.
        </p>

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          {[
            { id: "all", label: "All Services" },
            { id: "repairs", label: "Repairs & Fixes" },
            { id: "cleaning", label: "Cleaning" },
            { id: "maintenance", label: "Maintenance" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#FF6B00] text-white border-2 border-[#FF6B00] shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. SERVICES GRID SECTION */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="font-bold text-[#FF6B00] text-sm">
                  {service.price}
                </span>
                <button
                  className="bg-[#FF6B00] hover:bg-[#e05f00] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  onClick={() =>
                    alert(`Booking flow started for: ${service.title}`)
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ORANGE CALLOUT BANNER */}
      <section className="max-w-7xl mx-auto my-12 px-4 sm:px-6">
        <div className="bg-[#FF6B00] text-white rounded-2xl p-8 sm:p-12 text-center shadow-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Need a Custom Service or Emergency Repair?
          </h2>
          <p className="text-base opacity-90 max-w-xl mx-auto mb-6">
            We are always ready to help. Download our app or reach out directly
            to get instant professional assistance.
          </p>
          <button className="bg-white text-[#FF6B00] hover:bg-gray-100 font-bold px-6 py-3 rounded-lg text-base transition-colors cursor-pointer shadow-sm">
            Get the App
          </button>
        </div>
      </section>
    </div>
  );
};

export default servicesPage;
