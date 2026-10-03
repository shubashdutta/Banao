import React, { useState } from "react";
import { Ban, CalendarOff, Clock, Pencil, Plus, Trash2 } from "lucide-react";

type Slot = { title: string; sub: string; jobs: string; pros: string; type: "Standard Slot" | "Emergency Slot"; days: boolean[]; };
type Blackout = { name: string; date: string; note: string; };

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const slots: Slot[] = [
  { title: "08:00 - 10:00 AM", sub: "08:00 - 10:00", jobs: "15 Jobs", pros: "20 Pros", type: "Standard Slot", days: [true, true, true, true, true, true, true] },
  { title: "10:00 - 12:00 PM", sub: "10:00 - 12:00", jobs: "25 Jobs", pros: "30 Pros", type: "Standard Slot", days: [true, true, true, true, true, true, true] },
  { title: "01:00 - 03:00 PM", sub: "13:00 - 15:00", jobs: "20 Jobs", pros: "25 Pros", type: "Standard Slot", days: [true, true, true, true, true, true, true] },
  { title: "03:00 - 05:00 PM", sub: "15:00 - 17:00", jobs: "20 Jobs", pros: "25 Pros", type: "Standard Slot", days: [true, true, true, true, true, true, true] },
  { title: "06:00 - 08:00 PM", sub: "18:00 - 20:00 - Night Service", jobs: "10 Jobs", pros: "15 Pros", type: "Emergency Slot", days: [true, true, true, true, true, true, true] },
];

const blackouts: Blackout[] = [
  { name: "Dashain - Ghatasthapana", date: "Oct 12, 2026", note: "No dispatch - all slots paused" },
  { name: "Dashain - Vijaya Dashami", date: "Oct 21, 2026", note: "Emergency slots only" },
  { name: "Tihar - Laxmi Puja", date: "Nov 08, 2026", note: "No dispatch - all slots paused" },
  { name: "Chhath Parba", date: "Nov 15, 2026", note: "Morning slots paused" },
];

const TimeSlotPage = () => {
  const [tab, setTab] = useState<"slots" | "blackout">("slots");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Time Slot Management</h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">Dispatch Engine</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">Configure daily dispatch windows, job capacities per slot, festival blackout dates, and recurring schedules.</p>
        </div>
        <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition shrink-0"><Plus className="w-4 h-4" /> Add Time Slot</button>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
        <button onClick={() => setTab("slots")} className={`h-10 px-5 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${tab === "slots" ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}>
          <Clock className="w-4 h-4" />Time Slot List ({slots.length})
        </button>
        <button onClick={() => setTab("blackout")} className={`h-10 px-5 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${tab === "blackout" ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}>
          <Ban className="w-4 h-4" />Festival Blackout Dates
        </button>
      </div>
      {tab === "slots" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {slots.map((s) => (
            <div key={s.title} className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-[#FF6B35]" /></span>
                <div className="min-w-0">
                  <div className="text-base font-extrabold text-neutral-900 tracking-tight">{s.title}</div>
                  <div className="text-xs font-semibold text-neutral-400">{s.sub}</div>
                </div>
                <span className="ml-auto text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-center"><div className="text-base font-extrabold text-neutral-900">{s.jobs}</div><div className="text-[11px] font-bold text-neutral-400">Max Jobs Cap</div></div>
                <div className="rounded-xl bg-neutral-50 border border-neutral-100 px-3 py-2.5 text-center"><div className="text-base font-extrabold text-neutral-900">{s.pros}</div><div className="text-[11px] font-bold text-neutral-400">Capacity Limit</div></div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Active Recurring Days</div>
                <div className="flex gap-1.5 flex-wrap">
                  {DAYS.map((d, i) => (
                    <span key={d} className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full border transition ${s.days[i] ? "bg-orange-50 text-[#FF6B35] border-orange-200" : "bg-white text-neutral-300 border-neutral-100"}`}>{d}</span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                {s.type === "Emergency Slot" ? (
                  <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-full border border-[#FF6B35] text-[#FF6B35]">Emergency Slot</span>
                ) : (
                  <span className="text-[11px] font-bold px-2.5 py-1.5 rounded-full bg-neutral-900 text-white">Standard Slot</span>
                )}
                <div className="flex gap-1.5">
                  <button className="h-8 px-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold flex items-center gap-1 transition"><Pencil className="w-3 h-3" /> Edit</button>
                  <button className="h-8 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition"><Trash2 className="w-3 h-3" /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 pb-3 flex items-center justify-between">
            <div><h3 className="font-extrabold text-neutral-900 flex items-center gap-2"><CalendarOff className="w-4 h-4 text-[#FF6B35]" /> Festival Blackout Dates</h3><p className="text-[13px] text-neutral-500 mt-0.5">Dispatch paused or limited on these Nepali festival dates.</p></div>
            <button className="h-9 px-3.5 rounded-full bg-neutral-900 text-white text-[13px] font-bold flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Date</button>
          </div>
          <div className="divide-y divide-neutral-100">
            {blackouts.map((b) => (
              <div key={b.name} className="px-5 py-4 flex items-center gap-3 hover:bg-neutral-50/60 transition">
                <span className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0"><Ban className="w-4 h-4 text-red-500" /></span>
                <div className="flex-1 min-w-0"><div className="text-sm font-extrabold text-neutral-900 truncate">{b.name}</div><div className="text-xs font-medium text-neutral-500">{b.note}</div></div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 whitespace-nowrap">{b.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="px-1 text-[13px] font-medium text-neutral-400">Showing {tab === "slots" ? `${slots.length} time slots` : `${blackouts.length} blackout dates`} - Dispatch Engine - Nepal</div>
    </div>
  );
};

export default TimeSlotPage;
