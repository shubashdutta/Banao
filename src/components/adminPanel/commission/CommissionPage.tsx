import React, { useState } from "react";
import { Percent, Zap } from "lucide-react";

type Override = { name: string; ne: string; desc: string; value: number; };

const initialOverrides: Override[] = [
  { name: "Plumbing & Water Systems", ne: "धारा तथा पाइप मर्मत", desc: "Expert plumbers for water tank leakage, CPVC pipe fitting, drain unblocking and tap repair.", value: 15 },
  { name: "Electrical & Power Repairs", ne: "बिजुली तथा वाइरिङ", desc: "Licensed electricians for short circuit fix, inverter wiring, MCB setup and generator repair.", value: 15 },
  { name: "Deep Home Cleaning", ne: "घर सरसफाई तथा निर्माणीकरण", desc: "Full house deep cleaning, sofa shampooing, carpet steam clean, and water tank sanitization.", value: 18 },
  { name: "Home Beauty & Salon", ne: "सौन्दर्य तथा होम सैलुन", desc: "Certified female beauticians for facial, waxing, bridal makeup, pedicure and hair spa at home.", value: 20 },
  { name: "AC & Appliance Repair", ne: "एसी तथा फ्रिज मर्मत", desc: "AC gas refill, compressor repair, washing machine fixing and refrigerator maintenance.", value: 15 },
];

const CommissionPage = () => {
  const [globalPct, setGlobalPct] = useState(20);
  const [surgeOn, setSurgeOn] = useState(false);
  const [overrides, setOverrides] = useState(initialOverrides);
  const setVal = (i: number, v: number) => setOverrides((o) => o.map((r, idx) => (idx === i ? { ...r, value: v } : r)));
  const pct = Math.min(30, Math.max(5, globalPct));
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Commission & Surge Pricing Engine</h1>
        <p className="text-sm text-neutral-500 mt-1">Configure default platform commission, category overrides, and holiday surge multipliers.</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-extrabold text-neutral-900 flex items-center gap-2"><span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center"><Percent className="w-4 h-4 text-[#FF6B35]" /></span> Global Platform Commission</h3>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-white whitespace-nowrap">{pct}% Standard</span>
          </div>
          <p className="text-[13px] font-medium text-neutral-500 leading-relaxed">Base fee deducted automatically from provider earnings for every completed job unless overridden by category rules.</p>
          <div className="rounded-xl bg-neutral-50/70 border border-neutral-100 p-4">
            <div className="flex items-center justify-between text-sm font-bold text-neutral-800">
              <span>Commission Percentage:</span>
              <span className="text-[#FF6B35] text-lg font-extrabold">{pct}%</span>
            </div>
            <input type="range" min={5} max={30} value={pct} onChange={(e) => setGlobalPct(Number(e.target.value))} className="w-full mt-3 accent-[#FF6B35] cursor-pointer" />
            <div className="mt-1.5 flex items-center justify-between text-[11px] font-bold text-neutral-400">
              <span>5% (Minimum)</span>
              <span className={pct === 15 ? "text-[#FF6B35]" : ""}>15% (Recommended)</span>
              <span>30% (Maximum)</span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-extrabold text-neutral-900 flex items-center gap-2"><span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center"><Zap className="w-4 h-4 text-[#FF6B35]" /></span> Festive / Holiday Surge Pricing</h3>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${surgeOn ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-neutral-100 text-neutral-500 border-neutral-200"}`}>{surgeOn ? "Active" : "Inactive"}</span>
          </div>
          <p className="text-[13px] font-medium text-neutral-500 leading-relaxed">Automatically applies +20% surge rate during Dashain, Tihar, and Public Holidays in Nepal to incentivize providers.</p>
          <div className="rounded-xl bg-orange-50/60 border border-orange-100 p-4 flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <div className="text-sm font-extrabold text-neutral-900">Dashain & Tihar Festive Multiplier (+20%)</div>
              <div className="text-xs font-medium text-neutral-500 mt-0.5">Providers earn +20% higher payout during peak festival rush</div>
            </div>
            <button onClick={() => setSurgeOn((s) => !s)} className={`h-9 px-4 rounded-full text-[13px] font-bold border transition ${surgeOn ? "bg-[#FF6B35] text-white border-[#FF6B35]" : "bg-white text-[#FF6B35] border-[#FF6B35] hover:bg-orange-50"}`}>{surgeOn ? "Deactivate" : "Activate Surge"}</button>
          </div>
        </div>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 pb-3">
          <h3 className="font-extrabold text-neutral-900">Category-Specific Commission Overrides</h3>
          <p className="text-[13px] text-neutral-500 mt-0.5">Global {pct}% applies unless a category below overrides it.</p>
        </div>
        <div className="divide-y divide-neutral-100">
          {overrides.map((r, i) => (
            <div key={r.name} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-neutral-50/60 transition">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-extrabold text-neutral-900">{r.name} <span className="font-bold text-neutral-400">({r.ne})</span></div>
                <div className="text-xs font-medium text-neutral-500 mt-0.5">{r.desc}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center h-10 rounded-full border border-neutral-200 bg-white pl-4 pr-1 overflow-hidden focus-within:border-[#FF6B35] transition">
                  <input type="number" min={0} max={50} value={r.value} onChange={(e) => setVal(i, Number(e.target.value))} className="w-12 text-sm font-extrabold text-neutral-900 outline-none bg-transparent" />
                  <span className="text-sm font-bold text-neutral-400">%</span>
                  <span className="ml-2 h-8 px-3 rounded-full bg-orange-50 text-[#FF6B35] text-xs font-bold flex items-center">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between text-[13px] font-medium text-neutral-500">
          <span>5 categories - Global {pct}%{surgeOn ? " - Surge +20% active" : ""}</span>
          <button className="h-9 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-bold transition">Save Overrides</button>
        </div>
      </div>
    </div>
  );
};

export default CommissionPage;
