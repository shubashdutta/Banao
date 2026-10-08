// import React, { useEffect, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { MapPin, Menu, X, ChevronDown, PhoneCall } from "lucide-react";
// import Button from "./Button";
// import Logo from "@/Assets/Image/Logo.png";

// interface NavbarProps {
//   onBookClick?: () => void;
// }

// export default function Navbar({ onBookClick }: NavbarProps) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [selectedCity, setSelectedCity] = useState("Kathmandu");

//   const location = useLocation();

//   useEffect(() => {
//     setMobileMenuOpen(false);
//   }, [location.pathname]);
//   const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
//   const [bookingModalOpen, setBookingModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState("Plumbing");

//   const cities = ["Kathmandu", "Lalitpur", "Bhaktapur", "Pokhara"];

//   const handleNavClick = (href: string) => {
//     setMobileMenuOpen(false);
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleOpenBooking = (event: React.MouseEvent<HTMLButtonElement>) => {
//     const serviceName =
//       (event.currentTarget as HTMLButtonElement).dataset.service ?? "Plumbing";
//     setSelectedService(serviceName);
//     setBookingModalOpen(true);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-shadow">
//       <div className="container">
//         <div className="flex items-center justify-between h-18">
//           {/* Zone 1: Single element Brand wordmark */}
//           <div className="flex items-center gap-6">
//             <Link
//               to="/"
//               className="text-2xl font-black tracking-tight text-neutral-900 select-none flex items-center"
//               aria-label="Banao Home"
//             >
//               <img
//                 src={Logo}
//                 alt="Banao Logo"
//                 className="h-12 w-auto object-contain"
//               />
//             </Link>

//             {/* City Selector Pill */}
//             {/* <div className="relative hidden md:block">
//               <button
//                 type="button"
//                 onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
//                 className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 rounded-lg transition-colors cursor-pointer"
//                 aria-expanded={cityDropdownOpen}
//               >
//                 <MapPin size={13} className="text-[#FF6B35]" />
//                 <span>{selectedCity}</span>
//                 <ChevronDown size={12} className="text-neutral-500" />
//               </button>

//               {cityDropdownOpen && (
//                 <div className="absolute top-full left-0 mt-1.5 w-36 bg-white rounded-xl shadow-lg border border-neutral-200/80 py-1.5 z-50 animate-in fade-in zoom-in-95">
//                   <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
//                     Service Valley
//                   </div>
//                   {cities.map((city) => (
//                     <button
//                       key={city}
//                       onClick={() => {
//                         setSelectedCity(city);
//                         setCityDropdownOpen(false);
//                       }}
//                       className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
//                         selectedCity === city
//                           ? "bg-[#FF6B35]/10 text-[#FF6B35] font-semibold"
//                           : "text-neutral-700 hover:bg-neutral-50"
//                       }`}
//                     >
//                       {city}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div> */}
//           </div>

//           {/* Zone 2: Clean 4-6 text navigation links */}
//           <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600">
//             {/* <Link
//               to="/"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               Home
//             </Link> */}

//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/services"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               Services
//             </NavLink>
//             <NavLink
//               to="/how-we-work"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               How It Works
//             </NavLink>
//             {/* <Link
//               to="#download"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               App
//             </Link>
//             <Link
//               to="#pros"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               For Pros
//             </Link> */}
//             {/* <Link
//               to="/faq"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               FAQ
//             </Link> */}

//             <NavLink
//               to="/became-provider"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors whitespace-nowrap ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               For Pros
//             </NavLink>
//             <NavLink
//               to="/faq"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors whitespace-nowrap ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               FAQ
//             </NavLink>
//             <NavLink
//               to="/about-us"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors whitespace-nowrap ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               About Us
//             </NavLink>

//             <NavLink
//               to="/contact-us"
//               className={({ isActive }) =>
//                 `text-left py-2 transition-colors whitespace-nowrap ${
//                   isActive
//                     ? "text-[#FF6B35] font-semibold"
//                     : "hover:text-[#FF6B35]"
//                 }`
//               }
//             >
//               Contact Us
//             </NavLink>
//           </nav>

//           {/* Zone 3: Primary action */}
//           <div className="hidden sm:flex items-center gap-3">
//             <a
//               href="tel:+9779802392348"
//               className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-2.5 py-1.5 transition-colors"
//             >
//               <PhoneCall size={14} className="text-[#2F7D72]" />
//               <span>+(977) 980-2392348</span>
//             </a>
//             <Button
//               variant="primary"
//               size="md"
//               onClick={handleOpenBooking}
//               data-service="Plumbing"
//               href="#services"
//             >
//               Book a Service
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex items-center gap-2 sm:hidden">
//             <Button
//               variant="primary"
//               size="sm"
//               onClick={onBookClick}
//               href="#services"
//             >
//               Book
//             </Button>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
//               aria-label="Toggle navigation menu"
//             >
//               {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden border-t border-neutral-200 bg-white px-5 py-4 space-y-3 shadow-xl">
//           {/* <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
//             <div className="flex items-center gap-2 text-xs font-semibold text-neutral-600">
//               <MapPin size={14} className="text-[#FF6B35]" />
//               <span>City:</span>
//             </div>
//             <div className="flex gap-1.5">
//               {cities.map((city) => (
//                 <button
//                   key={city}
//                   onClick={() => setSelectedCity(city)}
//                   className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
//                     selectedCity === city
//                       ? "bg-[#FF6B35] text-white"
//                       : "bg-neutral-100 text-neutral-700"
//                   }`}
//                 >
//                   {city}
//                 </button>
//               ))}
//             </div>
//           </div> */}

//           <nav className="flex flex-col space-y-2 pt-1 text-sm font-medium text-neutral-700">
//             <Link
//               to="/services"
//               className="text-left py-2 hover:text-[#FF6B35]"
//             >
//               Services
//             </Link>
//             <Link
//               to="/how-we-work"
//               className="text-left py-2 hover:text-[#FF6B35]"
//             >
//               How It Works
//             </Link>
//             {/* <button
//               onClick={() => handleNavClick("#download")}
//               className="text-left py-2 hover:text-[#FF6B35]"
//             >
//               Mobile App
//             </button>
//             <button
//               onClick={() => handleNavClick("#pros")}
//               className="text-left py-2 hover:text-[#FF6B35]"
//             >
//               Become a Pro
//             </button>
//             <button
//               onClick={() => handleNavClick("#faq")}
//               className="text-left py-2 hover:text-[#FF6B35]"
//             >
//               Frequently Asked Questions
//             </button> */}

//             <Link
//               to="/faq"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               FAQ
//             </Link>
//             <Link
//               to="/about-us"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               About_us
//             </Link>

//             <Link
//               to="/contact-us"
//               className="hover:text-neutral-900 transition-colors whitespace-nowrap"
//             >
//               Contact_us
//             </Link>
//           </nav>

//           <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
//             <span>Customer Helpline:+(977)980-2392348</span>
//             <span className="font-semibold text-emerald-600">
//               Open 7 AM - 9 PM
//             </span>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/Assets/Image/Logo.png"; // Adjust path to your logo

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "How it Works", path: "/how-we-work" },
    { name: "For Pros", path: "/became-provider" },
    // { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#ff6b00] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LEFT GROUP: Logo + Navigation Links */}
        <div className="flex items-center gap-10 lg:gap-14">
          {/* LOGO with a clean white backing container so dark text stands out */}
          <Link
            to="/"
            className="flex items-center bg-white px-3 py-1.5 rounded-2xl shadow-xs hover:scale-105 transition-transform"
          >
            <img
              src={Logo}
              alt="Banao Logo"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          {/* NAVIGATION LINKS (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-all hover:text-white pb-1 relative ${
                    isActive
                      ? "text-white font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
                      : "text-white/90"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT ACTION: Get the App Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/download"
            className="bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-xs md:text-sm px-6 py-3 rounded-full shadow-md transition-all transform hover:scale-105"
          >
            Get the App
          </Link>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-black/10 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#e05e00] border-t border-white/10 px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold tracking-wide py-2 transition-colors ${
                    isActive
                      ? "text-white underline underline-offset-4"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
