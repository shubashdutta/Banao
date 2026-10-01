import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Navigation,
  Sparkles,
  Zap,
  Droplets,
  CreditCard,
  User,
  Home,
  FileText,
  ChevronRight,
} from "lucide-react";

interface AppPhoneProps {
  screen?: "home" | "booking" | "profile";
  small?: boolean;
}

export default function AppPhone({
  screen = "home",
  small = false,
}: AppPhoneProps) {
  const [activeScreen, setActiveScreen] = useState<
    "home" | "booking" | "profile"
  >(screen);

  // Sync state if prop changes
  React.useEffect(() => {
    setActiveScreen(screen);
  }, [screen]);

  return (
    <div
      className={`relative mx-auto rounded-[42px] border-[7px] border-[#1E1E1E] bg-[#121212] p-2 shadow-2xl transition-all ${
        small ? "w-[230px] sm:w-[250px]" : "w-[290px] sm:w-[320px]"
      }`}
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Outer Phone Shell / Glass Screen */}
      <div
        className={`relative overflow-hidden rounded-[34px] bg-[#F8F9FA] text-neutral-800 ${
          small ? "min-h-[460px] text-xs" : "min-h-[570px] text-sm"
        } flex flex-col justify-between`}
      >
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between w-[92px] h-[20px] bg-black rounded-full px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-neutral-700/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Top Status Bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-bold text-neutral-800 tracking-tight">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <div className="w-4 h-2 rounded-xs border border-neutral-800 p-0.5 flex items-center">
              <div className="w-full h-full bg-neutral-800 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none">
          {activeScreen === "home" && (
            <div className="space-y-3">
              {/* App Header */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-neutral-500">
                    <MapPin size={11} className="text-[#FF6B35]" />
                    <span>Jhamsikhel, Lalitpur</span>
                  </div>
                  <h4 className="text-base font-extrabold text-neutral-900 tracking-tight leading-tight">
                    Namaste, Aarav 🙏
                  </h4>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#FF6B35]/15 text-[#FF6B35] font-bold flex items-center justify-center text-xs">
                  A
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-neutral-200 shadow-2xs">
                <Search size={14} className="text-neutral-400" />
                <span className="text-[11px] text-neutral-400">
                  Search plumber, AC, cleaning...
                </span>
              </div>

              {/* Live Tracking Banner */}
              <div className="bg-neutral-900 text-white p-3 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      Arriving Soon
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-400">
                    12 mins away
                  </span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">
                  Bikram Shrestha · Plumbing
                </div>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  Tap repair & drain unclogging
                </div>
                <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px]">
                  <span className="text-neutral-300">
                    Live GPS tracking active
                  </span>
                  <span className="text-[#FF6B35] font-semibold flex items-center gap-0.5">
                    View <ChevronRight size={10} />
                  </span>
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-neutral-800">
                    Popular Services
                  </span>
                  <span className="text-[10px] text-[#FF6B35] font-semibold">
                    View all
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    {
                      name: "Plumber",
                      icon: Droplets,
                      bg: "#EBF2FA",
                      color: "#3B82F6",
                    },
                    {
                      name: "Electric",
                      icon: Zap,
                      bg: "#FFF8E7",
                      color: "#F59E0B",
                    },
                    {
                      name: "Cleaning",
                      icon: Sparkles,
                      bg: "#FFF0F3",
                      color: "#EC4899",
                    },
                    {
                      name: "Beauty",
                      icon: User,
                      bg: "#F3EEFF",
                      color: "#8B5CF6",
                    },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setActiveScreen("booking")}
                        className="flex flex-col items-center gap-1 p-1.5 rounded-xl hover:bg-neutral-100 transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-2xs"
                          style={{ backgroundColor: cat.bg }}
                        >
                          <Icon size={16} color={cat.color} />
                        </div>
                        <span className="text-[10px] font-medium text-neutral-700">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upfront Pricing Card */}
              <div className="bg-white p-2.5 rounded-2xl border border-neutral-200 shadow-2xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-neutral-900">
                    Standard Rates
                  </span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">
                    Guaranteed
                  </span>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between text-neutral-600">
                    <span>Electrician visit & inspection</span>
                    <span className="font-bold text-neutral-900">रू 350</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Standard tap replacement</span>
                    <span className="font-bold text-neutral-900">रू 400</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeScreen === "booking" && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveScreen("home")}
                  className="text-[10px] font-semibold text-neutral-500 hover:text-neutral-900"
                >
                  ← Back
                </button>
                <h4 className="text-xs font-bold text-neutral-900">
                  Schedule Service
                </h4>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-2xs space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF8E7] flex items-center justify-center">
                    <Zap size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-900">
                      Electrical Repair
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      MCB switch & room rewiring
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[10px]">
                  <div className="flex items-center gap-1.5 text-neutral-700">
                    <Calendar size={12} className="text-[#FF6B35]" />
                    <span>Today, 2:30 PM - 3:30 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-700">
                    <MapPin size={12} className="text-[#2F7D72]" />
                    <span>Ward 3, Jhamsikhel, Lalitpur</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-2xs space-y-1.5 text-[10px]">
                <div className="font-bold text-neutral-900 mb-1">
                  Pricing Breakdown
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Base diagnostic fee</span>
                  <span>रू 350</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Labour (approx 45 min)</span>
                  <span>रू 250</span>
                </div>
                <div className="pt-1.5 border-t border-neutral-100 flex justify-between font-bold text-neutral-900 text-xs">
                  <span>Estimated Total</span>
                  <span className="text-[#FF6B35]">रू 600</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-2.5 rounded-2xl border border-neutral-200 text-[10px] space-y-1">
                <div className="text-neutral-500">Payment Option</div>
                <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                  <CreditCard size={12} className="text-purple-600" />
                  <span>eSewa / Khalti / Cash on Delivery</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveScreen("profile")}
                className="w-full py-2.5 bg-[#FF6B35] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#e85925] transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          )}

          {activeScreen === "profile" && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveScreen("home")}
                  className="text-[10px] font-semibold text-neutral-500 hover:text-neutral-900"
                >
                  ← Home
                </button>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  VERIFIED PRO
                </span>
              </div>

              {/* Pro Avatar and Info */}
              <div className="text-center bg-white p-3 rounded-2xl border border-neutral-200 shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-[#2F7D72] text-white font-black text-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                  S
                </div>
                <div className="text-xs font-bold text-neutral-900">
                  Sita Maharjan
                </div>
                <div className="text-[10px] text-neutral-500">
                  Electrical Specialist · Lalitpur
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-amber-500 text-[11px] font-bold">
                  <Star size={12} fill="#F59E0B" />
                  <span>4.9</span>
                  <span className="text-neutral-400 font-normal">
                    (312 completed)
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-1.5 text-center text-[10px]">
                <div className="bg-neutral-100 p-2 rounded-xl">
                  <div className="font-bold text-neutral-800">Background</div>
                  <div className="text-emerald-600 font-semibold">
                    Police Verified
                  </div>
                </div>
                <div className="bg-neutral-100 p-2 rounded-xl">
                  <div className="font-bold text-neutral-800">Experience</div>
                  <div className="text-neutral-600">5+ Years</div>
                </div>
              </div>

              {/* Recent Review */}
              <div className="bg-white p-2.5 rounded-2xl border border-neutral-200 text-[10px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800">
                    Ramesh K.
                  </span>
                  <span className="text-[9px] text-neutral-400">Patan</span>
                </div>
                <p className="text-neutral-600 italic">
                  "Prompt arrival, diagnosed short circuit in 15 mins and
                  replaced the damaged breaker cleanly."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        <div className="relative z-20 border-t border-neutral-200/80 bg-white/95 px-4 py-2 flex items-center justify-between text-[9px] text-neutral-400">
          <button
            onClick={() => setActiveScreen("home")}
            className={`flex flex-col items-center gap-0.5 ${
              activeScreen === "home"
                ? "text-[#FF6B35] font-bold"
                : "hover:text-neutral-700"
            }`}
          >
            <Home size={15} />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveScreen("booking")}
            className={`flex flex-col items-center gap-0.5 ${
              activeScreen === "booking"
                ? "text-[#FF6B35] font-bold"
                : "hover:text-neutral-700"
            }`}
          >
            <FileText size={15} />
            <span>Book</span>
          </button>
          <button
            onClick={() => setActiveScreen("profile")}
            className={`flex flex-col items-center gap-0.5 ${
              activeScreen === "profile"
                ? "text-[#FF6B35] font-bold"
                : "hover:text-neutral-700"
            }`}
          >
            <User size={15} />
            <span>Profile</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="pb-1 pt-0.5 flex justify-center bg-white">
          <div className="w-24 h-1 bg-neutral-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
