import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  Wrench,
  X,
} from "lucide-react";

type PStatus = "Verified" | "Pending" | "Rejected";
type Provider = {
  id: string;
  name: string;
  phone: string;
  skill: string;
  area: string;
  city: string;
  jobs: number;
  earnings: string;
  rating: number;
  status: PStatus;
  applied: string;
  img: string;
};

const providers: Provider[] = [
  {
    id: "PR-1284",
    name: "Ramesh Thapa",
    phone: "+977-98410-11223",
    skill: "Home Cleaning",
    area: "Baneshwor",
    city: "Kathmandu",
    jobs: 132,
    earnings: "Rs. 3,42,000",
    rating: 4.9,
    status: "Verified",
    applied: "Jan 12, 2024",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1271",
    name: "Suresh Yadav",
    phone: "+977-98510-44556",
    skill: "Electrician",
    area: "Lakeside",
    city: "Pokhara",
    jobs: 118,
    earnings: "Rs. 2,98,500",
    rating: 4.8,
    status: "Verified",
    applied: "Feb 03, 2024",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1255",
    name: "Dipak Gurung",
    phone: "+977-98460-77889",
    skill: "Painter",
    area: "Boudha",
    city: "Kathmandu",
    jobs: 96,
    earnings: "Rs. 4,10,000",
    rating: 4.9,
    status: "Verified",
    applied: "Nov 20, 2023",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1240",
    name: "Hari Bahadur",
    phone: "+977-98134-99001",
    skill: "Plumber",
    area: "Pulchowk",
    city: "Lalitpur",
    jobs: 104,
    earnings: "Rs. 2,65,200",
    rating: 4.7,
    status: "Verified",
    applied: "Mar 15, 2024",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1233",
    name: "Gita Sharma",
    phone: "+977-98601-22334",
    skill: "Home Cleaning",
    area: "Jhamsikhel",
    city: "Lalitpur",
    jobs: 88,
    earnings: "Rs. 1,96,800",
    rating: 4.8,
    status: "Verified",
    applied: "Apr 02, 2024",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1310",
    name: "Bikash Rai",
    phone: "+977-98455-66778",
    skill: "AC Repair",
    area: "Chipledhunga",
    city: "Pokhara",
    jobs: 0,
    earnings: "Rs. 0",
    rating: 0,
    status: "Pending",
    applied: "Sep 28, 2026",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1309",
    name: "Anita KC",
    phone: "+977-98160-11224",
    skill: "Beautician",
    area: "Kapan",
    city: "Kathmandu",
    jobs: 0,
    earnings: "Rs. 0",
    rating: 0,
    status: "Pending",
    applied: "Sep 30, 2026",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1308",
    name: "Santosh Magar",
    phone: "+977-98470-33445",
    skill: "Carpenter",
    area: "Maharajgunj",
    city: "Kathmandu",
    jobs: 0,
    earnings: "Rs. 0",
    rating: 0,
    status: "Pending",
    applied: "Oct 01, 2026",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1305",
    name: "Nabin Limbu",
    phone: "+977-98512-55667",
    skill: "Electrician",
    area: "Ekantakuna",
    city: "Lalitpur",
    jobs: 0,
    earnings: "Rs. 0",
    rating: 0,
    status: "Pending",
    applied: "Oct 02, 2026",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1290",
    name: "Kamal Oli",
    phone: "+977-98491-88990",
    skill: "Plumber",
    area: "Thamel",
    city: "Kathmandu",
    jobs: 4,
    earnings: "Rs. 8,400",
    rating: 3.2,
    status: "Rejected",
    applied: "Aug 12, 2026",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "PR-1288",
    name: "Sabina Tamang",
    phone: "+977-98601-11002",
    skill: "Home Cleaning",
    area: "Kapan",
    city: "Kathmandu",
    jobs: 2,
    earnings: "Rs. 3,600",
    rating: 3.0,
    status: "Rejected",
    applied: "Aug 20, 2026",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
];

const statusStyle: Record<PStatus, string> = {
  Verified: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
};
const tabs: Array<"All" | PStatus> = ["All", "Pending", "Verified", "Rejected"];

const toCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

const cityOptions = ["All cities", "Kathmandu", "Pokhara", "Lalitpur"];

const ProviderPage = () => {
  const [tab, setTab] = useState<"All" | PStatus>("All");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
  const [checked, setChecked] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const counts = useMemo(
    () => ({
      All: providers.length,
      Pending: providers.filter((p) => p.status === "Pending").length,
      Verified: providers.filter((p) => p.status === "Verified").length,
      Rejected: providers.filter((p) => p.status === "Rejected").length,
    }),
    [],
  );
  const filtered = useMemo(
    () =>
      providers.filter((p) => {
        const q = query.toLowerCase();
        const mQ =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.skill.toLowerCase().includes(q);
        const mC = city === "All cities" || p.city === city;
        const mT = tab === "All" || p.status === tab;
        return mQ && mC && mT;
      }),
    [query, city, tab],
  );

  const allChecked =
    filtered.length > 0 && filtered.every((p) => checked.includes(p.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : filtered.map((p) => p.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const selectedCount = checked.length;

  /** Providers the admin can action in bulk (awaiting approval). */
  const selectedPendingCount = filtered.filter(
    (p) => checked.includes(p.id) && p.status === "Pending",
  ).length;

  const hasActiveFilter = query.trim() !== "" || city !== "All cities";

  const clearFilters = () => {
    setQuery("");
    setCity("All cities");
  };

  // Close the filter dropdown on outside click or Escape.
  const filterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!filterOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFilterOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterOpen]);

  const exportCsv = () => {
    const rows = selectedCount
      ? filtered.filter((p) => checked.includes(p.id))
      : filtered;
    if (rows.length === 0) return;

    const header = [
      "Provider ID",
      "Name",
      "Phone",
      "Skill",
      "Area",
      "City",
      "Jobs",
      "Earnings",
      "Rating",
      "Status",
      "Applied",
    ];
    const body = rows.map((p) =>
      [
        p.id,
        p.name,
        p.phone,
        p.skill,
        p.area,
        p.city,
        String(p.jobs),
        p.earnings,
        p.rating > 0 ? p.rating.toFixed(1) : "New",
        p.status,
        p.applied,
      ]
        .map(toCsvCell)
        .join(","),
    );

    const blob = new Blob(
      [[header.map(toCsvCell).join(","), ...body].join("\n")],
      { type: "text/csv;charset=utf-8;" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = selectedCount
      ? `banao-providers-selected-${selectedCount}.csv`
      : "banao-providers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-700">Providers</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#FF6B35] text-white">
              1 Pending
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Providers
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Verify, manage and track all Banao pros - {filtered.length} showing.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add Provider
          </button>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Total Providers", "1,342", "across 3 cities"],
          ["Verified", String(counts.Verified * 256), "96% approval"],
          ["Pending Review", String(counts.Pending * 3), "needs action"],
          ["Avg. Rating", "4.8", "from 28k reviews"],
        ].map(([l, v, s]) => (
          <div
            key={l}
            className="bg-white border border-neutral-200/70 rounded-2xl px-5 py-4 shadow-sm"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {l}
            </div>
            <div className="text-xl font-semibold text-neutral-900 mt-1">
              {v}
            </div>
            <div className="text-xs font-medium text-neutral-500 mt-0.5">
              {s}
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`h-10 px-5 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 shrink-0 ${tab === t ? "bg-[#ff4d4f] text-white shadow" : "text-neutral-500 hover:bg-neutral-50"}`}
            >
              {t === "All" ? "All Providers" : t}
              <span
                className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${tab === t ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}
              >
                {counts[t]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative shrink-0" ref={filterRef}>
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            aria-haspopup="dialog"
            className={`h-12 px-4 rounded-full border text-[13px] font-bold flex items-center gap-2 transition whitespace-nowrap ${filterOpen || hasActiveFilter ? "border-orange-100 bg-orange-50 text-[#FF6B35]" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
            {hasActiveFilter && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
            )}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>
          {filterOpen && (
            <div className="absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-lg shadow-neutral-900/10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, ID, phone, skill..."
                  className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-[#FF6B35] transition"
                />
              </div>
              <div className="relative mt-3">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  aria-label="Filter by city"
                  className="h-11 w-full appearance-none rounded-full border border-neutral-200 bg-white pl-10 pr-9 text-[13px] font-bold text-neutral-700 outline-none focus:border-[#FF6B35] transition cursor-pointer"
                >
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold text-neutral-400">
                  {filtered.length} provider{filtered.length === 1 ? "" : "s"}
                </span>
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="h-8 px-3 rounded-full border border-orange-100 bg-orange-50 text-[12px] font-bold text-[#FF6B35] hover:bg-orange-100 transition flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedCount > 0 && (
        <div className="bg-white border border-orange-100 rounded-2xl p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <span className="font-extrabold text-[#FF6B35]">
              {selectedCount}
            </span>{" "}
            provider{selectedCount > 1 ? "s" : ""} selected
            {selectedPendingCount > 0 && (
              <span className="text-[11px] font-bold text-amber-600">
                - {selectedPendingCount} awaiting approval
              </span>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="h-9 px-3.5 rounded-full border border-neutral-200 bg-white text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Export {selectedCount}
            </button>
            <button
              type="button"
              disabled={selectedPendingCount === 0}
              className="h-9 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check className="w-3.5 h-3.5" /> Approve Selected
            </button>
            <button
              type="button"
              disabled={selectedPendingCount === 0}
              className="h-9 px-3.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-[12px] font-bold flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <X className="w-3.5 h-3.5" /> Reject Selected
            </button>
            <button
              type="button"
              onClick={() => setChecked([])}
              className="text-[11px] font-bold text-[#FF6B35] hover:underline"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100 bg-neutral-50/60">
                <th className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all providers"
                    className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5 font-bold">Provider</th>
                <th className="px-4 py-3.5 font-bold">Skill / Area</th>
                <th className="px-4 py-3.5 font-bold text-center">Jobs</th>
                <th className="px-4 py-3.5 font-bold text-center">Rating</th>
                <th className="px-4 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isSelected = checked.includes(p.id);
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-neutral-100 last:border-0 transition ${isSelected ? "bg-orange-50/60" : "hover:bg-neutral-50/70"}`}
                  >
                    <td className="px-5 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(p.id)}
                        aria-label={`Select provider ${p.name}`}
                        className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-neutral-900 flex items-center gap-1 truncate">
                            {p.name}
                            {p.status === "Verified" && (
                              <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {p.phone}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-medium">
                            {p.id} - Applied {p.applied}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-neutral-800 flex items-center gap-1.5 text-[13px]">
                        <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                        {p.skill}
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {p.area}, {p.city}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="font-extrabold text-neutral-900">
                        {p.jobs}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-semibold">
                        {p.earnings}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      {p.rating > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-amber-50 border border-amber-100 text-neutral-800 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {p.rating.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-neutral-400">
                          - new -
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyle[p.status]}`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        {p.status === "Pending" ? (
                          <>
                            <button className="h-8 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition">
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button className="h-8 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-bold flex items-center gap-1 transition">
                              <X className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        ) : (
                          <button className="text-xs font-bold text-[#FF6B35] hover:underline inline-flex items-center gap-0.5">
                            View <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No providers in this tab. Try another tab or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} providers in {tab === "All" ? "all" : tab}{" "}
            tab
            {selectedCount > 0 && (
              <>
                {" - "}
                <span className="font-extrabold text-[#FF6B35]">
                  {selectedCount} selected
                </span>
              </>
            )}
          </span>
          <div className="flex gap-1.5">
            {["1", "2", "3"].map((pg, i) => (
              <button
                key={pg}
                className={`w-8 h-8 rounded-full text-xs font-bold border transition ${i === 0 ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-200 hover:bg-neutral-50"}`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
