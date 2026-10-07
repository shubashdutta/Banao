import React, { useState } from "react";
import { MapPin, Menu, X, ChevronDown, PhoneCall } from "lucide-react";
import Button from "./Button";
import Logo from "@/Assets/Image/Logo.png";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Kathmandu");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Plumbing");

  const cities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara"];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBooking = (serviceName = "Plumbing") => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-shadow">
      <div className="container">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single element Brand wordmark */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-2xl font-black tracking-tight text-neutral-900 select-none flex items-center"
              aria-label="Banao Home"
            >
              {/* <span>banao</span>
      <span className="text-[#FF6B35]">.</span> */}

              <img
                src={Logo}
                alt="Banao Logo"
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* City Selector Pill */}
            {/* <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors cursor-pointer"
                aria-expanded={cityDropdownOpen}
              >
                <MapPin size={13} className="text-[#FF6B35]" />
                <span>{selectedCity}</span>
                <ChevronDown size={12} className="text-neutral-500" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-neutral-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Service Valley
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedCity === city
                          ? "bg-[#FF6B35]/10 text-[#FF6B35] font-semibold"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          </div>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a
              href="#services"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              How It Works
            </a>
            <a
              href="#download"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              App
            </a>
            <a
              href="#pros"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              For Pros
            </a>
            <a
              href="#faq"
              className="hover:text-neutral-900 transition-colors whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+9779802392348"
              className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 transition-colors"
            >
              <PhoneCall size={14} className="text-[#2F7D72]" />
              <span>+(977) 980-2392348</span>
            </a>
            <Button
              variant="primary"
              size="md"
              onClick={handleOpenBooking}
              href="#services"
            >
              Book a Service
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <Button
              variant="primary"
              size="sm"
              onClick={onBookClick}
              href="#services"
            >
              Book
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-5 py-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
              <MapPin size={14} className="text-[#FF6B35]" />
              <span>City:</span>
            </div>
            <div className="flex gap-1.5">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    selectedCity === city
                      ? "bg-[#FF6B35] text-white"
                      : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-2 pt-1 text-sm font-medium text-neutral-700">
            <button
              onClick={() => handleNavClick("#services")}
              className="text-left py-2 hover:text-[#FF6B35]"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("#how-it-works")}
              className="text-left py-2 hover:text-[#FF6B35]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick("#download")}
              className="text-left py-2 hover:text-[#FF6B35]"
            >
              Mobile App
            </button>
            <button
              onClick={() => handleNavClick("#pros")}
              className="text-left py-2 hover:text-[#FF6B35]"
            >
              Become a Pro
            </button>
            <button
              onClick={() => handleNavClick("#faq")}
              className="text-left py-2 hover:text-[#FF6B35]"
            >
              Frequently Asked Questions
            </button>
          </nav>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>Customer Helpline:+(977)980-2392348</span>
            <span className="font-semibold text-emerald-600">
              Open 7 AM - 9 PM
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
