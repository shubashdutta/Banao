import React from "react";
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";

import Logo from "@/Assets/Image/Logo.png";

import FooterImage from "@/Assets/Image/FooterImage.png";
import FooterSvg from "@/Assets/Image/7b9dc1ec-7cb1-423b-889f-40dea327a0c7.svg";

export default function Footer() {
  return (
    // <footer className="bg-[##FF6B35] text-neutral-400 text-sm border-t border-neutral-800">
    //   <div className="container py-16">
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
    //       {/* Brand Col */}
    //       <div className="lg:col-span-2 space-y-4">
    //         <div className="text-2xl font-black text-white tracking-tight flex items-center">
    //           {/* <span>banao</span>
    //           <span className="text-[#FF6B35]">.</span> */}

    //           <img
    //             src={Logo}
    //             alt="Banao Logo"
    //             className="h-8 w-auto object-contain"
    //           />
    //         </div>
    //         <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
    //           Nepal’s trusted on-demand home services platform. We connect
    //           homeowners with verified plumbers, electricians, cleaners, and
    //           carpenters with clear upfront pricing.
    //         </p>
    //         <div className="pt-2 space-y-2 text-xs text-neutral-300">
    //           <div className="flex items-center gap-2">
    //             <MapPin size={14} className="text-[#FF6B35] shrink-0" />
    //             <span>Jhamsikhel 3, Lalitpur & New Baneshwor, Kathmandu</span>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Phone size={14} className="text-[#2F7D72] shrink-0" />
    //             <span>Customer Care: +977 1-4412345 (7:00 AM - 9:00 PM)</span>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Mail size={14} className="text-[#3B82F6] shrink-0" />
    //             <span>namaste@banao.np</span>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Services */}
    //       <div>
    //         <div className="text-white font-bold text-sm tracking-wide mb-3">
    //           Popular Services
    //         </div>
    //         <ul className="space-y-2 text-xs">
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Plumbing & Leak Repairs
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Electrician & Wiring
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Deep Home Cleaning
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Salon & Beauty at Home
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Carpentry & Furniture
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#services"
    //               className="hover:text-white transition-colors"
    //             >
    //               Appliance Maintenance
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Company */}
    //       <div>
    //         <div className="text-white font-bold text-sm tracking-wide mb-3">
    //           Company
    //         </div>
    //         <ul className="space-y-2 text-xs">
    //           <li>
    //             <a
    //               href="#how-it-works"
    //               className="hover:text-white transition-colors"
    //             >
    //               How It Works
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#pros" className="hover:text-white transition-colors">
    //               Become a Banao Pro
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#download"
    //               className="hover:text-white transition-colors"
    //             >
    //               Mobile App (iOS & Android)
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#faq" className="hover:text-white transition-colors">
    //               FAQ & Safety Rules
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="hover:text-white transition-colors">
    //               About Us & Mission
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Service Valleys */}
    //       <div>
    //         <div className="text-white font-bold text-sm tracking-wide mb-3">
    //           Service Areas
    //         </div>
    //         <div className="space-y-2 text-xs">
    //           <div className="flex items-center gap-1.5 text-neutral-300">
    //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //             <span>Kathmandu Valley (All Wards)</span>
    //           </div>
    //           <div className="flex items-center gap-1.5 text-neutral-300">
    //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //             <span>Lalitpur (Patan, Sanepa, Imadol)</span>
    //           </div>
    //           <div className="flex items-center gap-1.5 text-neutral-300">
    //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //             <span>Bhaktapur & Thimi</span>
    //           </div>
    //           <div className="flex items-center gap-1.5 text-neutral-300">
    //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //             <span>Pokhara (Lakeside & City)</span>
    //           </div>
    //           <div className="pt-2 text-[11px] text-neutral-500">
    //             Coming soon: Chitwan & Butwal
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Bottom Bar */}
    //     <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
    //       <p>
    //         © {new Date().getFullYear()} Banao Technologies Pvt. Ltd. All rights
    //         reserved.
    //       </p>
    //       <div className="flex items-center gap-4 text-neutral-500">
    //         <a href="#" className="hover:text-neutral-300 transition-colors">
    //           Privacy Policy
    //         </a>
    //         <span>·</span>
    //         <a href="#" className="hover:text-neutral-300 transition-colors">
    //           Terms of Service
    //         </a>
    //         <span>·</span>
    //         <a href="#" className="hover:text-neutral-300 transition-colors">
    //           Customer Safety
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer className="relative overflow-hidden bg-white text-neutral-400 text-sm border-t border-neutral-800">
      {/* SVG Background */}
      <div
        className="absolute inset-0 pointer-events-none bg-no-repeat bg-bottom bg-cover"
        style={{
          backgroundImage: `url(${FooterSvg})`,
        }}
      />

      {/* Footer Content */}
      <div className="relative z-10 container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-2">
            <div className="text-2xl font-black  tracking-tight flex items-center">
              <img
                src={Logo}
                alt="Banao Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="text-black text-sm leading-relaxed max-w-sm">
              Nepal’s trusted on-demand home services platform. We connect
              homeowners with verified plumbers, electricians, cleaners, and
              carpenters with clear upfront pricing.
            </p>

            <div className="pt-2 space-y-2 text-xs text-black">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#FF6B35] shrink-0" />
                <span>Pingalasthan-9, Gaushala, Kathmandu, Nepal.</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#2F7D72] shrink-0" />
                <span>
                  Customer Care: +(977) 980-2392348 (7:00 AM - 9:00 PM)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#3B82F6] shrink-0" />
                <span>info@mybanao.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className=" text-black">
            <div className=" font-bold text-sm tracking-wide mb-3">
              Popular Services
            </div>

            <ul className="space-y-2 text-md">
              <li>
                <a href="#services" className=" transition-colors">
                  Plumbing & Leak Repairs
                </a>
              </li>

              <li>
                <a href="#services" className=" transition-colors">
                  Electrician & Wiring
                </a>
              </li>

              <li>
                <a href="#services" className=" transition-colors">
                  Deep Home Cleaning
                </a>
              </li>

              <li>
                <a href="#services" className=" transition-colors">
                  Salon & Beauty at Home
                </a>
              </li>

              <li>
                <a href="#services" className=" transition-colors">
                  Carpentry & Furniture
                </a>
              </li>

              <li>
                <a href="#services" className=" transition-colors">
                  Appliance Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className=" text-black">
            <div className=" font-bold text-sm tracking-wide mb-3">Company</div>

            <ul className="space-y-2 text-md">
              <li>
                <a href="#how-it-works" className=" transition-colors">
                  How It Works
                </a>
              </li>

              <li>
                <a href="#pros" className=" transition-colors">
                  Become a Banao Pro
                </a>
              </li>

              <li>
                <a href="#download" className=" transition-colors">
                  Mobile App (iOS & Android)
                </a>
              </li>

              <li>
                <a href="#faq" className=" transition-colors">
                  FAQ & Safety Rules
                </a>
              </li>

              <li>
                <a href="#" className=" transition-colors">
                  About Us & Mission
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className=" text-black">
            <div className=" font-bold text-sm tracking-wide mb-3">
              Service Areas
            </div>

            <div className="space-y-2 text-md ">
              <div className="flex items-center gap-1.5   ">
                {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
                <span>Kathmandu Valley (All Wards)</span>
              </div>

              <div className="flex items-center gap-1.5 ">
                {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
                <span>Lalitpur (Patan, Sanepa, Imadol)</span>
              </div>

              <div className="flex items-center gap-1.5 ">
                {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
                <span>Bhaktapur & Thimi</span>
              </div>

              <div className="flex items-center gap-1.5 ">
                {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
                <span>Pokhara (Lakeside & City)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-[#FF6B35]  font-semibold pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Banao All rights reserved.</p>

          <div className="flex items-center gap-4 text-black font-semibold">
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>

            <span>·</span>

            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>

            <span>·</span>

            <a href="#" className="hover:text-neutral-300 transition-colors">
              Customer Safety
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
