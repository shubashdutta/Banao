import React, { useState } from "react";
import { ClipboardList, Globe, Link2, Pencil, Plus, Trash2 } from "lucide-react";

type CmsItem = { status: string; updated: string; title: string; url: string; fields: string; };

const pages: CmsItem[] = [
  { status: "Draft", updated: "2026-07-28 12:00 PM", title: "Customer Home Landing Page", url: "https://bolao.np/home-customer", fields: "Hero + Services + SEO" },
  { status: "Draft", updated: "2026-07-25 04:30 PM", title: "Service Provider Onboarding Hub", url: "https://bolao.np/provider-join", fields: "Join steps + KYC + SEO" },
];

const forms: CmsItem[] = [
  { status: "Published", updated: "2026-07-20 10:00 AM", title: "Plumbing Intake Form", url: "https://bolao.np/forms/plumbing-intake", fields: "6 fields + file upload" },
  { status: "Draft", updated: "2026-07-18 02:15 PM", title: "Emergency Repair Request Form", url: "https://bolao.np/forms/emergency-repair", fields: "4 fields + photo upload" },
];

const PageBuilderPage = () => {
  const [tab, setTab] = useState<"pages" | "forms">("pages");
  const list = tab === "pages" ? pages : forms;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">Dynamic CMS & Form Builder</h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">No-Code Engine</span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">Build SEO-optimized static web pages, terms & conditions, and custom dynamic intake forms with file upload fields.</p>
        </div>
        <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition shrink-0"><Plus className="w-4 h-4" /> Create CMS Page</button>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
        <button onClick={() => setTab("pages")} className={`h-10 px-5 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${tab === "pages" ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}>
          <Globe className="w-4 h-4" />Static Web Pages ({pages.length})
        </button>
        <button onClick={() => setTab("forms")} className={`h-10 px-5 rounded-xl text-[13px] font-bold whitespace-nowrap transition flex items-center gap-2 ${tab === "forms" ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50"}`}>
          <ClipboardList className="w-4 h-4" />Custom Intake Forms ({forms.length})
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((c) => (
          <div key={c.title} className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.status === "Published" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-neutral-100 text-neutral-500 border border-neutral-200"}`}>{c.status}</span>
              <span className="text-[11px] font-semibold text-neutral-400">Updated: {c.updated}</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-neutral-900 tracking-tight">{c.title}</h3>
              <div className="mt-1 text-[13px] font-bold text-[#FF6B35] flex items-center gap-1 truncate"><Link2 className="w-3.5 h-3.5 shrink-0" />{c.url}</div>
            </div>
            <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50/70 px-4 py-5 text-center">
              <div className="h-2 rounded-full bg-neutral-200/80 w-3/4 mx-auto" />
              <div className="h-2 rounded-full bg-neutral-200/60 w-1/2 mx-auto mt-2" />
              <div className="mt-2 text-[11px] font-bold text-neutral-400">{c.fields}</div>
            </div>
            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
              <button className="h-9 px-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-bold flex items-center gap-1.5 transition"><Pencil className="w-3.5 h-3.5" /> Edit Content</button>
              <button className="h-9 px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-bold flex items-center gap-1.5 transition"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="px-1 text-[13px] font-medium text-neutral-400">Showing {list.length} {tab === "pages" ? "static pages" : "intake forms"} - No-Code Engine</div>
    </div>
  );
};

export default PageBuilderPage;
