import React, { useState } from "react";
import {
  Building2,
  Download,
  Globe,
  Landmark,
  Map,
  MapPin,
  PenLine,
  Plus,
  Route,
} from "lucide-react";

type LocationCard = {
  title: string;
  subtitle: string;
  footer: string;
  badge: string;
};
type FilterTab = { id: string; label: string; icon: React.ElementType };

const filterTabs: FilterTab[] = [
  { id: "countries", label: "Countries", icon: Globe },
  { id: "provinces", label: "Provinces / States", icon: Map },
  { id: "districts", label: "Districts / Cities", icon: Building2 },
  { id: "municipalities", label: "Municipalities", icon: Landmark },
  { id: "streets", label: "Streets", icon: Route },
  { id: "landmarks", label: "Landmarks", icon: MapPin },
  { id: "builder", label: "Address Builder", icon: PenLine },
];

const locationCards: LocationCard[] = [
  {
    title: "Kathmandu Metropolitan City",
    subtitle: "Ward No. 10 (Maitighar/Baneshwor)",
    footer: "Bagmati Province",
    badge: "Kathmandu",
  },
  {
    title: "Lalitpur Metropolitan City",
    subtitle: "Ward No. 3 (Jhamsikhel/Pulchowk)",
    footer: "Bagmati Province",
    badge: "Lalitpur",
  },
  {
    title: "Pokhara Lekhnath Metropolitan",
    subtitle: "Ward No. 6 (Lakeside)",
    footer: "Gandaki Province",
    badge: "Pokhara",
  },
  {
    title: "Bhaktapur Municipality",
    subtitle: "Ward No. 2 (Durbar Square)",
    footer: "Bagmati Province",
    badge: "Bhaktapur",
  },
];

const GobalLocationPage = () => {
  const [activeTab, setActiveTab] = useState("municipalities");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Global Location & Geofencing Hierarchy
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              Nepal GIS Engine
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5 max-w-2xl">
            Manage hierarchical locations, GPS geofencing & map boundaries.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5 transition">
            <Download className="w-4 h-4" /> Export Hierarchy
          </button>
          <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition">
            <Plus className="w-4 h-4" /> Add Location Entry
          </button>
        </div>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
        {filterTabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`h-10 px-4 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${active ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locationCards.map((c) => (
          <div
            key={c.title}
            className="relative bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <span className="absolute top-5 right-5 text-[11px] font-bold px-3 py-1 rounded-full bg-neutral-900 text-white">
              {c.badge}
            </span>
            <h3 className="text-lg font-semibold text-neutral-900 tracking-tight pr-24">
              {c.title}
            </h3>
            <p className="text-sm font-medium text-neutral-500 mt-1">
              {c.subtitle}
            </p>
            <p className="text-[13px] font-semibold text-neutral-400 mt-3 pt-3 border-t border-neutral-100">
              {c.footer}
            </p>
          </div>
        ))}
      </div>
      <div className="px-1 text-[13px] font-medium text-neutral-400">
        Showing 4 municipalities - {activeTab} view - Country: Nepal
      </div>
    </div>
  );
};

export default GobalLocationPage;
