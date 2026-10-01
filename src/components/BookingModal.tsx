import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  Droplets,
  Zap,
  Sparkles,
  UserRound,
  Hammer,
  BriefcaseBusiness,
  Home,
} from "lucide-react";
import Button from "./Button";

import Logo from "@/Assets/Image/Logo.png";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const serviceCatalog: Record<
  string,
  {
    icon: React.ComponentType<{ size?: number; color?: string }>;
    basePrice: number;
    subServices: { name: string; price: number }[];
  }
> = {
  Plumbing: {
    icon: Droplets,
    basePrice: 350,
    subServices: [
      { name: "Tap repair & leakage fix", price: 350 },
      { name: "Pipe replacement & fitting", price: 500 },
      { name: "Bathroom drain blockage clear", price: 650 },
      { name: "Water geyser / tank installation", price: 950 },
    ],
  },
  Electrical: {
    icon: Zap,
    basePrice: 300,
    subServices: [
      { name: "Switchboard / socket replacement", price: 300 },
      { name: "Ceiling fan install & repair", price: 450 },
      { name: "MCB breaker / short circuit diagnosis", price: 550 },
      { name: "Inverter / generator wiring setup", price: 850 },
    ],
  },
  Cleaning: {
    icon: Sparkles,
    basePrice: 800,
    subServices: [
      { name: "Standard kitchen & bathroom deep clean", price: 800 },
      { name: "Full 2BHK flat deep cleaning", price: 2500 },
      { name: "Sofa & upholstery shampooing (5-seater)", price: 1200 },
      { name: "Water tank (overhead) disinfection", price: 1500 },
    ],
  },
  Beauty: {
    icon: UserRound,
    basePrice: 600,
    subServices: [
      { name: "Hair styling & salon blowout at home", price: 600 },
      { name: "Herbal facial & skin treatment", price: 900 },
      { name: "Manicure & pedicure grooming combo", price: 1100 },
      { name: "Bridal & festival makeup package", price: 3500 },
    ],
  },
  Carpentry: {
    icon: Hammer,
    basePrice: 450,
    subServices: [
      { name: "Door lock & hinge repair", price: 450 },
      { name: "Wardrobe drawer alignment & repair", price: 600 },
      { name: "Custom wooden shelf mounting", price: 750 },
      { name: "Bed frame & table structural assembly", price: 950 },
    ],
  },
  Handyman: {
    icon: BriefcaseBusiness,
    basePrice: 400,
    subServices: [
      { name: "Wall drilling & TV mount installation", price: 450 },
      { name: "Curtain rod & mirror hanging", price: 400 },
      { name: "General minor home repairs (1 hr)", price: 500 },
    ],
  },
  Maintenance: {
    icon: Home,
    basePrice: 500,
    subServices: [
      { name: "Refrigerator / Washing machine check", price: 500 },
      { name: "Water purifier filter replacement", price: 600 },
      { name: "Seasonal AC servicing & coil cleaning", price: 850 },
    ],
  },
};

const locations = [
  "Jhamsikhel, Lalitpur",
  "Pulchowk, Lalitpur",
  "Sanepa, Lalitpur",
  "New Baneshwor, Kathmandu",
  "Baluwatar, Kathmandu",
  "Kapan, Kathmandu",
  "Thamel, Kathmandu",
  "Suryabinayak, Bhaktapur",
  "Lakeside, Pokhara",
];

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "Plumbing",
}: BookingModalProps) {
  const [selectedService, setSelectedService] = useState<string>(
    serviceCatalog[initialService] ? initialService : "Plumbing",
  );
  const [selectedSubService, setSelectedSubService] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>(
    locations[0],
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("Today (Within 2 Hours)");
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "esewa" | "khalti"
  >("cash");
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  // Update selected service if initialService changes
  React.useEffect(() => {
    if (initialService && serviceCatalog[initialService]) {
      setSelectedService(initialService);
      setSelectedSubService(0);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const currentServiceData =
    serviceCatalog[selectedService] || serviceCatalog["Plumbing"];
  const activeSubService =
    currentServiceData.subServices[selectedSubService] ||
    currentServiceData.subServices[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `BAN-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            {/* <span className="text-lg font-black tracking-tight text-neutral-900 font-display">
              banao<span className="text-[#FF6B35]">.</span>
            </span>
            <span className="text-xs text-neutral-400">·</span> */}
            <img
              src={Logo}
              alt="Banao Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xs font-semibold text-neutral-600">
              Quick Doorstep Booking
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-neutral-500">
                  Booking Reference:{" "}
                  <strong className="text-neutral-900 font-mono">
                    {bookingRef}
                  </strong>
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Service:</span>
                  <span className="font-semibold text-neutral-900">
                    {selectedService} ({activeSubService.name})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Assigned Pro:</span>
                  <span className="font-semibold text-emerald-600">
                    Bikram Shrestha (⭐ 4.9)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Slot:</span>
                  <span className="font-semibold text-neutral-900">
                    {timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Location:</span>
                  <span className="font-semibold text-neutral-900">
                    {selectedLocation}
                  </span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 font-bold text-sm">
                  <span>Upfront Price:</span>
                  <span className="text-[#FF6B35]">
                    रू {activeSubService.price}
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                We sent an SMS with tracking details to {phone || "your phone"}.
                Our technician will call you 15 minutes before arrival.
              </p>

              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleReset}>
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Select Category
                </label>
                {/* <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 ">
                  {Object.keys(serviceCatalog).map((svc) => {
                    const isCur = selectedService === svc;
                    return (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => {
                          setSelectedService(svc);
                          setSelectedSubService(0);
                        }}
                        className={`py-2 px-1 text-xs rounded-xl font-medium flex flex-col items-center gap-1 transition-all ${
                          isCur
                            ? "bg-[#FF6B35] text-white shadow-xs"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80"
                        }`}
                      >
                        <span className="text-[11px] truncate w-full text-center ">
                          {svc}
                        </span>
                      </button>
                    );
                  })}
                </div> */}

                <div className="flex overflow-x-auto gap-1.5 no-scrollbar pb-2 ">
                  {Object.keys(serviceCatalog).map((svc) => {
                    const isCur = selectedService === svc;
                    return (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => {
                          setSelectedService(svc);
                          setSelectedSubService(0);
                        }}
                        className={` cursor-pointer py-2 px-3 text-xs rounded-xl font-medium flex flex-col items-center gap-1 transition-all flex-shrink-0 min-w-[80px] ${
                          isCur
                            ? "bg-[#FF6B35] text-white shadow-xs"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80"
                        }`}
                      >
                        <span className="text-[11px] truncate w-full text-center">
                          {svc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Service Option */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Specific Fix or Package
                </label>
                <div className="space-y-1.5">
                  {currentServiceData.subServices.map((sub, idx) => {
                    const isSelected = selectedSubService === idx;
                    return (
                      <label
                        key={sub.name}
                        onClick={() => setSelectedSubService(idx)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#FF6B35] bg-[#FF6B35]/5 font-semibold text-neutral-900"
                            : "border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                        }`}
                      >
                        <span>{sub.name}</span>
                        <span className="font-bold text-[#FF6B35]">
                          रू {sub.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Location & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Area / City
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  >
                    <option>Today (Within 2 Hours)</option>
                    <option>Today (Evening 4:00 PM - 6:00 PM)</option>
                    <option>Tomorrow Morning (8:00 AM - 10:00 AM)</option>
                    <option>Tomorrow Afternoon (1:00 PM - 3:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Thapa"
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
              </div>

              {/* Pricing & Trust Notice */}
              <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 font-medium">
                    Standard rate upfront
                  </div>
                  <div className="text-base font-extrabold text-neutral-900">
                    रू {activeSubService.price}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                  <ShieldCheck size={14} className="text-[#2F7D72]" />
                  <span>7-Day Guarantee</span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  Confirm Doorstep Booking
                </Button>
                <div className="text-center text-[10px] text-neutral-400 mt-2">
                  No payment needed now · Pay by Cash, eSewa or Khalti after
                  inspection
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
