import React, { useState } from "react";
import { Battery, Flame, Gauge, MapPin, Navigation, Radio, Timer, Users } from "lucide-react";

type TrackTab = { id: string; label: string; icon: React.ElementType; };
type Partner = { id: string; name: string; skill: string; speed: string; eta: string; arrived: boolean; battery: number; initials: string; color: string; job: string; };

const tabs: TrackTab[] = [
  { id: "provider", label: "Provider GPS Tracking", icon: Navigation },
  { id: "customer", label: "Customer Live Locations", icon: Users },
  { id: "heatmap", label: "Location Analytics & Heatmap", icon: MapPin },
];

const partners: Partner[] = [
  { id: "P1", name: "Ramesh Sunuwar", skill: "Plumbing & Pipe Repair", speed: "28 km/h", eta: "ETA: 8 mins", arrived: false, battery: 88, initials: "RS", color: "bg-[#FF6B35]", job: "BN-98412 - Binita Shrestha (Baneshwor)" },
  { id: "P2", name: "Suman Chaudhari", skill: "Electrical Services", speed: "0 km/h", eta: "ETA: Arrived", arrived: true, battery: 72, initials: "SC", color: "bg-emerald-600", job: "BN-98411 - Priya Karki (Lakeside)" },
  { id: "P3", name: "Dipak Gurung", skill: "Painting & Waterproofing", speed: "34 km/h", eta: "ETA: 15 mins", arrived: false, battery: 64, initials: "DG", color: "bg-blue-600", job: "BN-98407 - Sunita Rai (Boudha)" },
  { id: "P4", name: "Hari Bahadur", skill: "Plumbing & Fittings", speed: "22 km/h", eta: "ETA: 21 mins", arrived: false, battery: 91, initials: "HB", color: "bg-violet-600", job: "BN-98409 - Bibek Adhikari (Pulchowk)" },
];

const LiveTrackingPage = () => {
  const [activeTab, setActiveTab] = useState("provider");
  const [selected, setSelected] = useState("P2");
  const active = partners.find((p) => p.id === selected) ?? partners[0];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0"><Radio className="w-5 h-5 text-[#FF6B35]" /></span>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Live GPS Telemetry & GIS Analytics</h1>
            <span className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">Real-time provider en-route tracking, customer live location status, emergency SOS, and GIS heatmaps.</p>
        </div>
        <button className="h-10 px-4 rounded-full border border-red-200 bg-white text-sm font-bold text-red-600 hover:bg-red-50 shadow-sm flex items-center gap-1.5 transition shrink-0"><Flame className="w-4 h-4" /> Simulate Emergency Alert</button>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          const on = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`h-10 px-4 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${on ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}>
              <Icon className="w-4 h-4" />{t.label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 relative bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden min-h-[520px]">
          <iframe
            title="Kathmandu Lalitpur live map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=85.28%2C27.66%2C85.38%2C27.73&layer=mapnik&marker=27.695%2C85.33"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full bg-neutral-900/90 text-white backdrop-blur"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Kathmandu / Lalitpur - {activeTab === "provider" ? "Provider GPS" : activeTab === "customer" ? "Customer Locations" : "Heatmap"}</div>
          <div className="absolute left-4 right-4 sm:right-auto bottom-4 sm:max-w-sm bg-white rounded-2xl shadow-xl border border-neutral-200/70 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full ${active.color} text-white font-extrabold flex items-center justify-center shrink-0`}>{active.initials}</div>
              <div className="min-w-0">
                <div className="font-extrabold text-neutral-900 truncate">{active.name}</div>
                <div className="text-xs font-bold text-[#FF6B35]">En Route to Job</div>
              </div>
              <span className="ml-auto text-[11px] font-extrabold px-2 py-1 rounded-full bg-neutral-900 text-white whitespace-nowrap">{active.speed}</span>
            </div>
            <div className="mt-2.5 text-[13px] font-medium text-neutral-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" /> Customer: {active.job}</div>
            <div className="mt-2 h-1.5 rounded-full bg-neutral-100 overflow-hidden"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" /></div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-neutral-900">Active Field Partners</h3>
            <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">4 online</span>
          </div>
          <div className="flex flex-col gap-3 overflow-y-auto no-scrollbar max-h-[560px]">
            {partners.map((p) => {
              const isSel = selected === p.id;
              return (
                <button key={p.id} onClick={() => setSelected(p.id)} className={`text-left rounded-2xl border p-4 transition w-full ${isSel ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/20 bg-orange-50/40" : "border-neutral-200/70 hover:border-neutral-300 bg-white"}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${p.color} text-white text-xs font-extrabold flex items-center justify-center shrink-0`}>{p.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-neutral-900 text-sm truncate">{p.name}</div>
                      <div className="text-xs font-medium text-neutral-500 truncate">{p.skill}</div>
                    </div>
                    <span className="text-[11px] font-extrabold px-2 py-1 rounded-full bg-neutral-900 text-white whitespace-nowrap flex items-center gap-1"><Gauge className="w-3 h-3" />{p.speed}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {p.arrived ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FF6B35] text-white flex items-center gap-1"><Timer className="w-3 h-3" />{p.eta}</span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 flex items-center gap-1"><Timer className="w-3 h-3" />{p.eta}</span>
                    )}
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-600 border border-neutral-200 flex items-center gap-1"><Battery className="w-3 h-3" />Battery: {p.battery}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingPage;
