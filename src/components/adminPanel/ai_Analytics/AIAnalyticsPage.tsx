import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Download,
  Lightbulb,
  Sparkles,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

type Insight = {
  title: string;
  desc: string;
  impact: string;
  tone: "orange" | "emerald" | "blue";
};

const kpis = [
  {
    label: "Predicted Revenue (7d)",
    value: "Rs. 9.4L",
    sub: "+14.2% forecast",
    up: true,
    icon: Wallet,
    bg: "bg-orange-50",
    iconColor: "text-[#FF6B35]",
  },
  {
    label: "Demand Forecast",
    value: "812 jobs",
    sub: "next 7 days",
    up: true,
    icon: TrendingUp,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Churn Risk Users",
    value: "214",
    sub: "-8% vs last week",
    up: false,
    icon: Users,
    bg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    label: "Avg. Rating Trend",
    value: "4.82",
    sub: "+0.06 this month",
    up: true,
    icon: Star,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

const demand = [
  { day: "Sun", actual: 52, predicted: 58 },
  { day: "Mon", actual: 64, predicted: 70 },
  { day: "Tue", actual: 60, predicted: 66 },
  { day: "Wed", actual: 78, predicted: 84 },
  { day: "Thu", actual: 74, predicted: 80 },
  { day: "Fri", actual: 95, predicted: 102 },
  { day: "Sat", actual: 88, predicted: 96 },
];

const categories: Array<{
  name: string;
  score: number;
  trend: string;
  up: boolean;
}> = [
  { name: "Deep Home Cleaning", score: 94, trend: "+12%", up: true },
  { name: "AC & Appliance Repair", score: 88, trend: "+18%", up: true },
  { name: "Plumbing & Water Systems", score: 81, trend: "+6%", up: true },
  { name: "Electrical & Power Repairs", score: 76, trend: "-2%", up: false },
  { name: "Home Beauty & Salon", score: 69, trend: "+4%", up: true },
];

const insights: Insight[] = [
  {
    title: "Surge pricing recommended Fri-Sat",
    desc: "Demand exceeds provider capacity by 22% in Baneshwor + Lakeside. Enable +15% surge 10AM-2PM.",
    impact: "High impact",
    tone: "orange",
  },
  {
    title: "214 customers at churn risk",
    desc: "No booking in 60+ days. Send win-back offer: 20% off cleaning + free inspection.",
    impact: "Rs. 1.8L recovery",
    tone: "emerald",
  },
  {
    title: "Hire 6 more electricians in KTM",
    desc: "Electrical jobs wait time up 34%. 3 providers cover 78% of load. Add capacity before Dashain.",
    impact: "Medium impact",
    tone: "blue",
  },
];

const AIAnalyticsPage = () => {
  const [range, setRange] = useState("7 days");
  const maxV = Math.max(...demand.map((d) => d.predicted));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-[#FF6B35]" />
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              AI Analytics & Demand Forecast
            </h1>
            <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              <Sparkles className="w-3 h-3" /> AI Engine
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            ML-powered revenue prediction, demand heatmaps, churn alerts, and
            smart staffing suggestions.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {(["7 days", "30 days"] as string[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`h-10 px-4 rounded-full text-[13px] font-bold border transition ${range === r ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"}`}
            >
              {r}
            </button>
          ))}
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl ${k.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${k.iconColor}`} />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${k.up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}
                >
                  {k.up ? (
                    <TrendingUp className="w-3.5 h-3.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5" />
                  )}
                  {k.sub.split(" ")[0]}
                </span>
              </div>
              <div className="mt-4 text-2xl font-extrabold text-neutral-900">
                {k.value}
              </div>
              <div className="text-[13px] font-medium text-neutral-500 mt-0.5">
                {k.label} - {k.sub}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-extrabold text-neutral-900">
                Demand Forecast vs Actual ({range})
              </h3>
              <p className="text-[13px] text-neutral-500 mt-0.5">
                Gray bars actual jobs - Orange line AI prediction
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-neutral-200" />{" "}
                Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6B35]" />{" "}
                Predicted
              </span>
            </div>
          </div>
          <div className="mt-5 flex items-end gap-3 h-[220px] px-1">
            {demand.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
              >
                <div className="text-[10px] font-bold text-[#FF6B35]">
                  {d.predicted}
                </div>
                <div
                  className="w-full max-w-[48px] flex flex-col justify-end gap-1"
                  style={{ height: `${(d.predicted / maxV) * 150}px` }}
                >
                  <div
                    className="w-full rounded-t-lg bg-[#FF6B35]/90"
                    style={{
                      height: `${((d.predicted - d.actual) / d.predicted) * 100}%`,
                      minHeight: 6,
                    }}
                  />
                  <div
                    className="w-full rounded-b-lg bg-neutral-200"
                    style={{ height: `${(d.actual / d.predicted) * 100}%` }}
                  />
                </div>
                <div className="text-xs font-bold text-neutral-400">
                  {d.day}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <h3 className="font-extrabold text-neutral-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#FF6B35]" /> Category Demand Score
          </h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-bold text-neutral-700">{c.name}</span>
                  <span
                    className={`font-extrabold flex items-center gap-1 ${c.up ? "text-emerald-600" : "text-red-500"}`}
                  >
                    {c.up ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {c.trend}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400"
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-md">
        <h3 className="font-extrabold flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" /> AI Smart
          Recommendations
        </h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {insights.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl bg-white/5 border border-white/10 p-4"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 ${s.tone === "orange" ? "text-[#FF6B35]" : s.tone === "emerald" ? "text-emerald-400" : "text-blue-400"}`}
                />
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                  {s.impact}
                </span>
              </div>
              <div className="mt-2.5 text-sm font-extrabold">{s.title}</div>
              <p className="mt-1 text-[13px] text-white/60 font-medium leading-relaxed">
                {s.desc}
              </p>
              <button className="mt-3 h-9 px-4 rounded-full bg-white text-neutral-900 text-xs font-bold hover:bg-neutral-100 transition">
                Apply Suggestion
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalyticsPage;
