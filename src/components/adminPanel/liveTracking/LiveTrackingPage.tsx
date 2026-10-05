import React, { useMemo, useState } from "react";
import {
  Battery,
  Flame,
  Gauge,
  MapPin,
  Navigation,
  Radio,
  Search,
  Timer,
  Users,
  X,
} from "lucide-react";

type TrackTab = { id: string; label: string; icon: React.ElementType };
type Partner = {
  id: string;
  name: string;
  skill: string;
  speed: string;
  eta: string;
  arrived: boolean;
  battery: number;
  initials: string;
  color: string;
  job: string;
};

const tabs: TrackTab[] = [
  { id: "provider", label: "Provider", icon: Navigation },
  { id: "customer", label: "Customer", icon: Users },
];

const partners: Partner[] = [
  {
    id: "P1",
    name: "Ramesh Sunuwar",
    skill: "Plumbing & Pipe Repair",
    speed: "28 km/h",
    eta: "ETA: 8 mins",
    arrived: false,
    battery: 88,
    initials: "RS",
    color: "bg-[#FF6B35]",
    job: "BN-98412 - Binita Shrestha (Baneshwor)",
  },
  {
    id: "P2",
    name: "Suman Chaudhari",
    skill: "Electrical Services",
    speed: "0 km/h",
    eta: "ETA: Arrived",
    arrived: true,
    battery: 72,
    initials: "SC",
    color: "bg-emerald-600",
    job: "BN-98411 - Priya Karki (Lakeside)",
  },
  {
    id: "P3",
    name: "Dipak Gurung",
    skill: "Painting & Waterproofing",
    speed: "34 km/h",
    eta: "ETA: 15 mins",
    arrived: false,
    battery: 64,
    initials: "DG",
    color: "bg-blue-600",
    job: "BN-98407 - Sunita Rai (Boudha)",
  },
  {
    id: "P4",
    name: "Hari Bahadur",
    skill: "Plumbing & Fittings",
    speed: "22 km/h",
    eta: "ETA: 21 mins",
    arrived: false,
    battery: 91,
    initials: "HB",
    color: "bg-violet-600",
    job: "BN-98409 - Bibek Adhikari (Pulchowk)",
  },
  {
    id: "P5",
    name: "Anil Thapa",
    skill: "AC & Appliance Repair",
    speed: "19 km/h",
    eta: "ETA: 12 mins",
    arrived: false,
    battery: 76,
    initials: "AT",
    color: "bg-amber-600",
    job: "BN-98415 - Manisha KC (Maitidevi)",
  },
  {
    id: "P6",
    name: "Prakash Tamang",
    skill: "Carpentry & Furniture",
    speed: "26 km/h",
    eta: "ETA: 18 mins",
    arrived: false,
    battery: 83,
    initials: "PT",
    color: "bg-cyan-600",
    job: "BN-98418 - Roshan Shahi (Koteshwor)",
  },
];

const LiveTrackingPage = () => {
  const [activeTab, setActiveTab] = useState("provider");
  const [selected, setSelected] = useState("P2");
  const [query, setQuery] = useState("");
  const visiblePartners = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return partners;
    return partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.skill.toLowerCase().includes(q) ||
        p.job.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [query]);
  /**
   * Keep the map card in sync with the filtered list: prefer the still-visible
   * selection, then the first visible partner, then the full dataset.
   */
  const active =
    visiblePartners.find((p) => p.id === selected) ??
    visiblePartners[0] ??
    partners[0];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">
              Live GPS Telemetry & GIS Analytics
            </h1>
            <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              LIVE
            </span>
          </div>
        </div>
        {/* <button className="h-10 px-4 rounded-full border border-red-200 bg-white text-sm font-bold text-red-600 hover:bg-red-50 shadow-sm flex items-center gap-1.5 transition shrink-0">
          <Flame className="w-4 h-4" /> Simulate Emergency Alert
        </button> */}
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar max-w-full shrink-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            const on = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`h-10 px-4 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 shrink-0 ${on ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search partner, skill, job ID..."
            aria-label="Search partners"
            className="
        h-10
        w-[65%]
        rounded-xl
        border border-neutral-200
        bg-white
        pl-10
        pr-10
        text-[13px]
        font-medium
        text-neutral-700
        placeholder:text-neutral-400
        outline-none
        transition-all
        duration-200
        shadow-sm
        hover:border-neutral-300
        focus:border-[#FF6B35]
        focus:ring-2
        focus:ring-[#FF6B35]/10
      "
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="
          absolute
          right-3
          flex
          items-center
          justify-center
          w-5
          h-5
          rounded-full
          text-neutral-400
          hover:bg-neutral-100
          hover:text-neutral-700
          transition
          cursor-pointer
        "
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 relative bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden min-h-[520px]">
          <iframe
            title="Kathmandu Lalitpur live map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=85.28%2C27.66%2C85.38%2C27.73&layer=mapnik&marker=27.695%2C85.33"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full bg-neutral-900/90 text-white backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
            Kathmandu / Lalitpur -{" "}
            {activeTab === "provider"
              ? "Provider GPS"
              : activeTab === "customer"
                ? "Customer Locations"
                : "Heatmap"}
          </div>
          <div className="absolute left-4 right-4 sm:right-auto bottom-4 sm:max-w-sm bg-white rounded-2xl shadow-xl border border-neutral-200/70 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full ${active.color} text-white font-extrabold flex items-center justify-center shrink-0`}
              >
                {active.initials}
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-neutral-900 truncate">
                  {active.name}
                </div>
                <div className="text-xs font-bold text-[#FF6B35]">
                  En Route to Job
                </div>
              </div>
              <span className="ml-auto text-[11px] font-extrabold px-2 py-1 rounded-full bg-neutral-900 text-white whitespace-nowrap">
                {active.speed}
              </span>
            </div>
            <div className="mt-2.5 text-[13px] font-medium text-neutral-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />{" "}
              Customer: {active.job}
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-neutral-900">
              Active Field Partners
            </h3>
            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              {visiblePartners.length} online
            </span>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-[560px]">
            {visiblePartners.map((p) => {
              const isSel = selected === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className={`text-left rounded-2xl border p-4 transition w-full ${isSel ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/20 bg-orange-50/40" : "border-neutral-200/70 hover:border-neutral-300 bg-white"}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${p.color} text-white text-xs font-extrabold flex items-center justify-center shrink-0`}
                    >
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-neutral-900 text-sm truncate">
                        {p.name}
                      </div>
                      <div className="text-xs font-medium text-neutral-500 truncate">
                        {p.skill}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {p.arrived ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FF6B35] text-white flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {p.eta}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {p.eta}
                      </span>
                    )}
                    {/* <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-600 border border-neutral-200 flex items-center gap-1">
                      <Battery className="w-3 h-3" />
                      Battery: {p.battery}%
                    </span> */}

                    <span className="text-[11px] font-extrabold px-2 py-1 rounded-full  whitespace-nowrap flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      {p.speed}
                    </span>
                  </div>
                </button>
              );
            })}
            {visiblePartners.length === 0 && (
              <div className="px-4 py-10 text-center text-sm font-medium text-neutral-400">
                No partners match &quot;{query.trim()}&quot;.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;
