import React from "react";
import { ArrowUpRight } from "lucide-react";

export interface ServiceCardProps {
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  name: string;
  bgColor: string;
  iconColor: string;
  onClick?: () => void;
}

const servicePricing: Record<string, { price: string; popular: string }> = {
  Plumbing: { price: "From रू 1200/hr", popular: "Tap, pipe & drainage" },
  Electrical: {
    price: "From रू 1000/hr",
    popular: "Wiring, MCB & sockets",
  },
  Cleaning: { price: "From रू 500/hr", popular: "Deep clean & sofa" },
  Beauty: { price: "From रू 900/hr", popular: "Salon & grooming at home" },
  Carpentry: {
    price: "From रू 500/Day",
    popular: "Furniture & door repair",
  },
  Handyman: {
    price: "From रू 500/Day",
    popular: "Drilling, mounts & fixes",
  },
  Maintenance: {
    price: "From रू 500/Day",
    popular: "Appliance & seasonal check",
  },
};

export default function ServiceCard({
  icon: Icon,
  name,
  bgColor,
  iconColor,
  onClick,
}: ServiceCardProps) {
  const details = servicePricing[name] || {
    price: "From रू 350",
    popular: "Doorstep service",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#FF6B35]/40 hover:shadow-lg transition-all duration-200 text-center cursor-pointer relative overflow-hidden"
    >
      {/* Decorative subtle hover tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${bgColor} 0%, transparent 80%)`,
        }}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Icon Circle */}
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110 shadow-2xs"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={26} color={iconColor} />
        </div>

        {/* Name */}
        <div className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#FF6B35] transition-colors">
          {name}
        </div>

        {/* Micro detail */}
        {/* <div className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
          {details.popular}
        </div> */}
      </div>

      {/* <div className="relative z-10 mt-3 pt-2.5 border-t border-neutral-100 w-full flex items-center justify-between text-xs">
        <span className="font-semibold text-neutral-800 text-xs sm:text-sm">
          {details.price}
        </span>
        <ArrowUpRight
          size={14}
          className="text-neutral-400 group-hover:text-[#FF6B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div> */}

      <div className="relative z-10 mt-3 pt-2.5 border-t border-neutral-100 w-full flex  justify-center gap-x-3 text-xs">
        <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs tracking-tight">
          {details.price}
        </span>
        <ArrowUpRight
          size={14}
          className="text-neutral-400 group-hover:text-[#FF6B35] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
        />
      </div>
    </button>
  );
}
