import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Calendar,
  Phone,
} from "lucide-react";
import Button from "./Button";

import logo from "@/Assets/Image/Logo.png";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProModal({ isOpen, onClose }: ProModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [trade, setTrade] = useState("Electrical");
  const [experience, setExperience] = useState("3-5 Years");
  const [city, setCity] = useState("Kathmandu Valley");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            {/* <span className="text-lg font-black text-neutral-900 font-display">
              banao<span className="text-[#FF6B35]">.</span>
            </span>
            <span className="text-xs text-neutral-400">·</span> */}

            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
            <span className="text-xs font-semibold text-neutral-600">
              Become a Banao Pro
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                Application Received, {name}!
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you for applying to join the Banao Pro network. Our
                partner verification officer in Kathmandu will call your number
                (<strong className="text-neutral-900">{phone}</strong>) within
                24 hours to schedule your document verification & tool
                onboarding.
              </p>
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs text-neutral-700">
                <span className="font-bold">Next Step:</span> Keep your
                citizenship card & trade certificates handy.
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleReset}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900">
                  Earn more on your own schedule.
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Join 1,200+ trusted technicians earning steady monthly income
                  across Nepal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sita Maharjan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Mobile Number (Nepal)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="98XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Primary Trade
                  </label>
                  <select
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option>Electrician</option>
                    <option>Plumber</option>
                    <option>Home Cleaner</option>
                    <option>Carpenter</option>
                    <option>AC Technician</option>
                    <option>Salon & Beautician</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white"
                  >
                    <option>1-2 Years</option>
                    <option>3-5 Years</option>
                    <option>5+ Years</option>
                    <option>10+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Preferred Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white"
                >
                  <option>Kathmandu Valley (All)</option>
                  <option>Lalitpur & Patan</option>
                  <option>Bhaktapur & Thimi</option>
                  <option>Pokhara</option>
                </select>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  Submit Pro Application
                </Button>
                <div className="text-center text-[10px] text-neutral-400 mt-2">
                  Zero sign-up fee · Weekly bank transfer to your account
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
