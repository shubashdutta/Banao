// import React from "react";
// import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react";

// import Logo from "@/Assets/Image/Logo.png";

// import FooterSvg from "@/Assets/Image/7b9dc1ec-7cb1-423b-889f-40dea327a0c7.svg";

// export default function Footer() {
//   return (
//     <footer className="relative overflow-hidden bg-white text-neutral-400 text-sm border-t border-neutral-800">
//       {/* SVG Background */}
//       <div
//         className="absolute inset-0 pointer-events-none bg-no-repeat bg-bottom bg-cover"
//         style={{
//           backgroundImage: `url(${FooterSvg})`,
//         }}
//       />

//       {/* Footer Content */}
//       <div className="relative z-10 container py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
//           {/* Brand Col */}
//           <div className="lg:col-span-2 space-y-2">
//             <div className="text-2xl font-black  tracking-tight flex items-center">
//               <img
//                 src={Logo}
//                 alt="Banao Logo"
//                 className="h-16 w-auto object-contain"
//               />
//             </div>

//             <p className="text-black text-sm leading-relaxed max-w-sm">
//               Nepal’s trusted on-demand home services platform. We connect
//               homeowners with verified plumbers, electricians, cleaners, and
//               carpenters with clear upfront pricing.
//             </p>

//             <div className="pt-2 space-y-2 text-xs text-black">
//               <div className="flex items-center gap-2">
//                 <MapPin size={14} className="text-[#FF6B35] shrink-0" />
//                 <span>Pingalasthan-9, Gaushala, Kathmandu, Nepal.</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Phone size={14} className="text-[#2F7D72] shrink-0" />
//                 <span>
//                   Customer Care: +(977) 980-2392348 (7:00 AM - 9:00 PM)
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Mail size={14} className="text-[#3B82F6] shrink-0" />
//                 <span>info@mybanao.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Services */}
//           <div className=" text-black">
//             <div className=" font-bold text-sm tracking-wide mb-3">
//               Popular Services
//             </div>

//             <ul className="space-y-2 text-md">
//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Plumbing & Leak Repairs
//                 </a>
//               </li>

//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Electrician & Wiring
//                 </a>
//               </li>

//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Deep Home Cleaning
//                 </a>
//               </li>

//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Salon & Beauty at Home
//                 </a>
//               </li>

//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Carpentry & Furniture
//                 </a>
//               </li>

//               <li>
//                 <a href="#services" className=" transition-colors">
//                   Appliance Maintenance
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div className=" text-black">
//             <div className=" font-bold text-sm tracking-wide mb-3">Company</div>

//             <ul className="space-y-2 text-md">
//               <li>
//                 <a href="#how-it-works" className=" transition-colors">
//                   How It Works
//                 </a>
//               </li>

//               <li>
//                 <a href="#pros" className=" transition-colors">
//                   Become a Banao Pro
//                 </a>
//               </li>

//               <li>
//                 <a href="#download" className=" transition-colors">
//                   Mobile App (iOS & Android)
//                 </a>
//               </li>

//               <li>
//                 <a href="#faq" className=" transition-colors">
//                   FAQ & Safety Rules
//                 </a>
//               </li>

//               <li>
//                 <a href="#" className=" transition-colors">
//                   About Us & Mission
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Service Areas */}
//           <div className=" text-black">
//             <div className=" font-bold text-sm tracking-wide mb-3">
//               Service Areas
//             </div>

//             <div className="space-y-2 text-md ">
//               <div className="flex items-center gap-1.5   ">
//                 {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
//                 <span>Kathmandu Valley (All Wards)</span>
//               </div>

//               <div className="flex items-center gap-1.5 ">
//                 {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
//                 <span>Lalitpur (Patan, Sanepa, Imadol)</span>
//               </div>

//               <div className="flex items-center gap-1.5 ">
//                 {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
//                 <span>Bhaktapur </span>
//               </div>

//               <div className="flex items-center gap-1.5 ">
//                 {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> */}
//                 <span>Pokhara (Lakeside & City)</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="text-[#FF6B35]  font-semibold pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
//           <p>© {new Date().getFullYear()} Banao All rights reserved.</p>

//           <div className="flex items-center gap-4 text-black font-semibold">
//             <a href="#" className="hover:text-neutral-300 transition-colors">
//               Privacy Policy
//             </a>

//             <span>·</span>

//             <a href="#" className="hover:text-neutral-300 transition-colors">
//               Terms of Service
//             </a>

//             <span>·</span>

//             <a href="#" className="hover:text-neutral-300 transition-colors">
//               Customer Safety
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

import Logo from "@/Assets/Image/Logo.png";
import FooterSvg from "@/Assets/Image/7b9dc1ec-7cb1-423b-889f-40dea327a0c7.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#faf9f6] text-slate-600 text-sm border-t border-slate-200/80">
      {/* SVG Background Watermark */}
      <div
        className="absolute inset-0 pointer-events-none bg-no-repeat bg-bottom bg-cover opacity-30"
        style={{
          backgroundImage: `url(${FooterSvg})`,
        }}
      />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-6 md:px-12">
        {/* TOP ROW: Brand Info & Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-2xl font-black tracking-tight flex items-center">
              <img
                src={Logo}
                alt="Banao Logo"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Nepal’s trusted on-demand home services platform. We connect
              homeowners with verified plumbers, electricians, cleaners, and
              carpenters with clear upfront pricing.
            </p>

            <div className="pt-2 space-y-2.5 text-xs font-medium text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#ff6b00] shrink-0 mt-0.5" />
                <span>Pingalasthan-9, Gaushala, Kathmandu, Nepal</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Customer Care: +(977) 980-2392348 (7:00 AM - 9:00 PM)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-blue-600 shrink-0" />
                <span>info@mybanao.com</span>
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
              Popular Services
            </h4>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600">
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Plumbing & Leak Repairs
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Electrician & Wiring
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Deep Home Cleaning
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Salon & Beauty at Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Carpentry & Furniture
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Appliance Maintenance
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600">
              <li>
                <Link
                  to="/how-we-work"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/became-provider"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Become a Banao Pro
                </Link>
              </li>
              <li>
                <a
                  href="#download"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  Mobile App (iOS & Android)
                </a>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-[#ff6b00] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
              Service Areas
            </h4>
            <ul className="space-y-2 text-xs md:text-sm font-medium text-slate-600">
              <li>
                <span className="hover:text-[#ff6b00] transition-colors cursor-pointer">
                  Kathmandu Valley
                </span>
              </li>
              <li>
                <span className="hover:text-[#ff6b00] transition-colors cursor-pointer">
                  Lalitpur (Patan, Sanepa)
                </span>
              </li>
              <li>
                <span className="hover:text-[#ff6b00] transition-colors cursor-pointer">
                  Bhaktapur City
                </span>
              </li>
              <li>
                <span className="hover:text-[#ff6b00] transition-colors cursor-pointer">
                  Pokhara (Lakeside)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* MIDDLE SECTION: Local SEO Service Links (As requested by your owner!) */}
        <div className="py-8 border-t border-slate-200/80 space-y-4">
          <h4 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
            Top Home Services Across Major Cities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Plumber in Kathmandu
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Electrician in Lalitpur
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Cleaning in Bhaktapur
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Carpenter in Pokhara
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              AC Repair Kathmandu
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Painter in Patan
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Sofa Cleaning KTM
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Home Salon Kathmandu
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Appliance Repair Lalitpur
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Geyser Installation KTM
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Pest Control Bhaktapur
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-[#ff6b00] transition-colors"
            >
              Handyman Services Nepal
            </a>
          </div>
        </div>

        {/* BOTTOM BAR: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Banao All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-700">
            <a href="#" className="hover:text-[#ff6b00] transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-[#ff6b00] transition-colors">
              Terms of Service
            </a>
            <span>·</span>
            <a href="#" className="hover:text-[#ff6b00] transition-colors">
              Customer Safety
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
