import React, { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";

type Sub = { en: string; ne: string; price: string };
type Cat = {
  title: string;
  neTag: string;
  slug: string;
  desc: string;
  commission: string;
  subCount: string;
  img: string;
  active: boolean;
  featured: boolean;
  emergency: boolean;
  subs: Sub[];
};

const categories: Cat[] = [
  {
    title: "Plumbing & Water Systems",
    neTag: "धारा तथा पाइप मर्मत",
    slug: "/plumbing",
    desc: "Expert plumbers for water tank leakage, CPVC pipe fitting, drain unblocking and tap repair.",
    commission: "15%",
    subCount: "4 items",
    img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop",
    active: true,
    featured: true,
    emergency: true,
    subs: [
      { en: "Tap Leakage Repair", ne: "धारा मर्मत", price: "NPR Rs.500" },
      {
        en: "Water Tank Installation",
        ne: "ट्यांकी जडान",
        price: "NPR Rs.2500",
      },
      { en: "Commode & Basin Fitting", ne: "कमोड जडान", price: "NPR Rs.1800" },
    ],
  },
  {
    title: "Electrical & Power Repairs",
    neTag: "बिजुली मर्मत सेवा",
    slug: "/electrical",
    desc: "Licensed electricians for short circuit fix, inverter wiring, MCB setup and generator repair.",
    commission: "15%",
    subCount: "4 items",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    active: true,
    featured: true,
    emergency: true,
    subs: [
      {
        en: "Short Circuit Repair",
        ne: "सर्ट सर्किट मर्मत",
        price: "NPR Rs.800",
      },
      {
        en: "Inverter & Battery Wiring",
        ne: "इनverter वायरिङ",
        price: "NPR Rs.1500",
      },
      { en: "Fan & Light Installation", ne: "पंखा जडान", price: "NPR Rs.600" },
    ],
  },
  {
    title: "Deep Home Cleaning",
    neTag: "घर सरसफाइ सेवा",
    slug: "/cleaning",
    desc: "Full house deep cleaning, sofa shampooing, carpet steam clean, and water tank sanitization.",
    commission: "18%",
    subCount: "3 items",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    active: true,
    featured: true,
    emergency: false,
    subs: [
      {
        en: "Sofa & Mattress Shampoo",
        ne: "सोफा सरसफाइ",
        price: "NPR Rs.2200",
      },
      {
        en: "Full House Deep Clean",
        ne: "फुल हाउस क्लिन",
        price: "NPR Rs.4500",
      },
      {
        en: "Water Tank Sanitization",
        ne: "ट्यांकी सरसफाइ",
        price: "NPR Rs.3000",
      },
    ],
  },
  {
    title: "Home Beauty & Salon",
    neTag: "ब्युटी तथा सैलुन",
    slug: "/beauty",
    desc: "Certified female beauticians for facial, waxing, bridal makeup, pedicure and her spa at home.",
    commission: "20%",
    subCount: "3 items",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
    active: true,
    featured: false,
    emergency: false,
    subs: [
      { en: "Herbal Glow Facial", ne: "फेसियल", price: "NPR Rs.1800" },
      {
        en: "Bridal Makeup Package",
        ne: "ब्राइडल मेकअप",
        price: "NPR Rs.12000",
      },
      { en: "Hair Spa & Keratin", ne: "हेयर स्पा", price: "NPR Rs.3500" },
    ],
  },
  {
    title: "AC & Appliance Repair",
    neTag: "एसी तथा उपकरण मर्मत",
    slug: "/ac-repair",
    desc: "AC gas refill, compressor repair, washing machine fixing and refrigerator maintenance.",
    commission: "15%",
    subCount: "2 items",
    img: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=800&auto=format&fit=crop",
    active: true,
    featured: false,
    emergency: true,
    subs: [
      {
        en: "AC Gas Refill R32/R410",
        ne: "एसी ग्यास भर्ने",
        price: "NPR Rs.2800",
      },
      {
        en: "Washing Machine Repair",
        ne: "वासिङ मेसिन मर्मत",
        price: "NPR Rs.1500",
      },
    ],
  },
];

type FilterId = "all" | "active" | "featured" | "emergency";

const CategoryPage = () => {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      categories.filter((c) => {
        const q = query.toLowerCase();
        const mQ =
          !q ||
          c.title.toLowerCase().includes(q) ||
          c.neTag.includes(query) ||
          c.desc.toLowerCase().includes(q);
        if (filter === "active") return c.active && mQ;
        if (filter === "featured") return c.featured && mQ;
        if (filter === "emergency") return c.emergency && mQ;
        return mQ;
      }),
    [filter, query],
  );
  const pills: Array<{ id: FilterId; label: string }> = [
    { id: "all", label: `All (${categories.length})` },
    { id: "active", label: "Active" },
    { id: "featured", label: "Featured" },
    { id: "emergency", label: "Emergency 24/7" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              Category Management System
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              Live Taxonomy
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Manage main service categories, subcategories, Nepali localizations,
            emergency toggles, and SEO metadata.
          </p>
        </div>
        <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition shrink-0">
          <Plus className="w-4 h-4" /> Create Main Category
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories by English / Nepali name or description..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {pills.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilter(p.id)}
              className={`h-10 px-4 rounded-full text-[13px] font-bold whitespace-nowrap border transition ${filter === p.id ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/25" : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.slug}
            className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
          >
            <div className="relative h-44 shrink-0">
              <img
                src={c.img}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow">
                Active
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-xs font-bold text-orange-400">
                  {c.neTag}
                </div>
                <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                  {c.title}
                </h3>
                <div className="text-xs font-medium text-white/60">
                  {c.slug}
                </div>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-3 flex-1">
              <p className="text-[13px] font-medium text-neutral-500 leading-relaxed">
                {c.desc}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-orange-50 border border-orange-100 px-3 py-2.5 text-center">
                  <div className="text-lg font-extrabold text-[#FF6B35]">
                    {c.commission}
                  </div>
                  <div className="text-[11px] font-bold text-neutral-500">
                    Commission
                  </div>
                </div>
                <div className="rounded-xl bg-orange-50 border border-orange-100 px-3 py-2.5 text-center">
                  <div className="text-lg font-extrabold text-[#FF6B35]">
                    {c.subCount}
                  </div>
                  <div className="text-[11px] font-bold text-neutral-500">
                    Subcategories
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Subcategories
                </div>
                <div className="flex flex-col gap-2">
                  {c.subs.map((s) => (
                    <div
                      key={s.en}
                      className="flex items-center gap-2 rounded-xl border border-neutral-100 bg-neutral-50/60 px-3 py-2"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-neutral-800 truncate">
                          {s.en}
                        </div>
                        <div className="text-[11px] font-medium text-neutral-400 truncate">
                          {s.ne}
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-neutral-900 whitespace-nowrap">
                        {s.price}
                      </span>
                      <button className="w-6 h-6 rounded-full hover:bg-red-50 text-neutral-300 hover:text-red-500 flex items-center justify-center transition shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-2 w-full h-9 rounded-xl border border-dashed border-neutral-200 text-xs font-bold text-neutral-500 hover:border-[#FF6B35] hover:text-[#FF6B35] transition flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Subcategory
                </button>
              </div>
              <div className="mt-auto pt-3 border-t border-neutral-100 flex gap-2">
                <button className="flex-1 h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 transition">
                  <Pencil className="w-3.5 h-3.5" /> Edit Settings
                </button>
                <button className="h-10 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-bold flex items-center gap-1.5 transition">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="bg-white border border-neutral-200/70 rounded-2xl py-12 text-center text-sm font-medium text-neutral-400">
          No categories match this filter. Try another tab or search.
        </div>
      )}
      <div className="px-1 text-[13px] font-medium text-neutral-400">
        Showing {filtered.length} of {categories.length} categories
      </div>
    </div>
  );
};

export default CategoryPage;
