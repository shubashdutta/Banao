import React from 'react';

export interface TrustCardProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export default function TrustCard({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}: TrustCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={24} color={iconColor} />
        </div>
        <h3 className="text-base font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-sm text-neutral-600 leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center text-xs font-semibold text-neutral-700">
        <span className="text-[#FF6B35] mr-1.5 font-bold">✓</span>
        <span>Banao Guarantee</span>
      </div>
    </div>
  );
}
