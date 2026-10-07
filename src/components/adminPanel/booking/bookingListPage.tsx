import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Download,
  MapPin,
  Navigation,
  Plus,
  Search,
  SlidersHorizontal,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type BStatus = "On Going" | "Accepted" | "Pending" | "Completed" | "Rejected";
type Booking = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  area: string;
  city: string;
  date: string;
  time: string;
  provider: string;
  status: BStatus;
  amount: string;
};

const bookings: Booking[] = [
  {
    id: "BN-98412",
    customer: "Aashish Sharma",
    phone: "+977-98412-33445",
    service: "Deep Home Cleaning",
    area: "Baneshwor",
    city: "Kathmandu",
    date: "Oct 2, 2026",
    time: "2:00 PM",
    provider: "Ramesh Thapa",
    status: "On Going",
    amount: "Rs. 1,500",
  },
  {
    id: "BN-98411",
    customer: "Priya Karki",
    phone: "+977-98510-22114",
    service: "AC Repair",
    area: "Lakeside",
    city: "Pokhara",
    date: "Oct 2, 2026",
    time: "1:30 PM",
    provider: "Suresh Yadav",
    status: "Accepted",
    amount: "Rs. 1,800",
  },
  {
    id: "BN-98410",
    customer: "Kiran Pokhrel",
    phone: "+977-98460-11223",
    service: "Electric Wiring",
    area: "Thamel",
    city: "Kathmandu",
    date: "Oct 2, 2026",
    time: "12:45 PM",
    provider: "Nabin Limbu",
    status: "Accepted",
    amount: "Rs. 3,400",
  },
  {
    id: "BN-98409",
    customer: "Bibek Adhikari",
    phone: "+977-98460-99812",
    service: "Plumbing Fix",
    area: "Pulchowk",
    city: "Lalitpur",
    date: "Oct 2, 2026",
    time: "12:15 PM",
    provider: "Hari Bahadur",
    status: "On Going",
    amount: "Rs. 2,200",
  },
  {
    id: "BN-98408",
    customer: "Sneha Maharjan",
    phone: "+977-98601-44721",
    service: "Salon at Home",
    area: "Jhamsikhel",
    city: "Lalitpur",
    date: "Oct 2, 2026",
    time: "11:30 AM",
    provider: "Unassigned",
    status: "Pending",
    amount: "Rs. 1,500",
  },
  {
    id: "BN-98407",
    customer: "Sunita Rai",
    phone: "+977-98134-55678",
    service: "Full House Painting",
    area: "Boudha",
    city: "Kathmandu",
    date: "Oct 2, 2026",
    time: "11:00 AM",
    provider: "Dipak Gurung",
    status: "Completed",
    amount: "Rs. 28,000",
  },
  {
    id: "BN-98406",
    customer: "Dipesh Thapa",
    phone: "+977-98455-12987",
    service: "Carpentry Work",
    area: "Chipledhunga",
    city: "Pokhara",
    date: "Oct 2, 2026",
    time: "10:30 AM",
    provider: "Unassigned",
    status: "Pending",
    amount: "Rs. 5,200",
  },
  {
    id: "BN-98405",
    customer: "Niraj Shrestha",
    phone: "+977-98491-20394",
    service: "Electric Wiring",
    area: "Thamel",
    city: "Kathmandu",
    date: "Oct 2, 2026",
    time: "10:00 AM",
    provider: "Unassigned",
    status: "Pending",
    amount: "Rs. 3,400",
  },
  {
    id: "BN-98402",
    customer: "Rohan Poudel",
    phone: "+977-98470-88213",
    service: "Bathroom Cleaning",
    area: "Maharajgunj",
    city: "Kathmandu",
    date: "Oct 1, 2026",
    time: "4:00 PM",
    provider: "Gita Sharma",
    status: "Completed",
    amount: "Rs. 2,800",
  },
  {
    id: "BN-98398",
    customer: "Mina Tamang",
    phone: "+977-98512-99034",
    service: "Plumbing Fix",
    area: "Ekantakuna",
    city: "Lalitpur",
    date: "Oct 1, 2026",
    time: "2:00 PM",
    provider: "Kamal Oli",
    status: "Rejected",
    amount: "Rs. 1,200",
  },
  {
    id: "BN-98395",
    customer: "Kabita Gurung",
    phone: "+977-98160-33412",
    service: "Home Deep Cleaning",
    area: "Kapan",
    city: "Kathmandu",
    date: "Oct 1, 2026",
    time: "11:00 AM",
    provider: "Sabina Tamang",
    status: "Rejected",
    amount: "Rs. 4,200",
  },
];

const statusStyle: Record<BStatus, string> = {
  "On Going": "bg-blue-50 text-blue-700 border-blue-100",
  Accepted: "bg-violet-50 text-violet-700 border-violet-100",
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Rejected: "bg-red-50 text-red-600 border-red-100",
};
const tabs: Array<"All" | BStatus> = [
  "All",
  "On Going",
  "Accepted",
  "Pending",
  "Completed",
  "Rejected",
];

const toCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

const cityOptions = ["All cities", "Kathmandu", "Pokhara", "Lalitpur"];

type ShiftId = "all" | "morning" | "afternoon" | "night";

type ShiftMeta = {
  id: ShiftId;
  label: string;
  range: string;
  icon: React.ElementType;
  /** Tailwind classes for the active pill state. */
  active: string;
  idle: string;
};

const shifts: ShiftMeta[] = [
  {
    id: "all",
    label: "All Shifts",
    range: "Full day",
    icon: Clock,
    active: "bg-neutral-900 text-white border-neutral-900",
    idle: "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50",
  },
  {
    id: "morning",
    label: "Morning",
    range: "6 AM - 12 PM",
    icon: Clock,
    active: "bg-amber-50 text-amber-700 border-amber-200",
    idle: "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "12 PM - 5 PM",
    icon: Clock,
    active: "bg-orange-50 text-[#FF6B35] border-orange-200",
    idle: "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50",
  },
  {
    id: "night",
    label: "Night",
    range: "5 PM - 12 AM",
    icon: Clock,
    active: "bg-violet-50 text-violet-700 border-violet-200",
    idle: "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50",
  },
];

/** Converts a 12-hour mock time such as "2:00 PM" into 24-hour minutes. */
const to24HourMinutes = (time: string) => {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) return null;
  const [, rawHour, rawMinute, meridiem] = match;
  let hour = Number(rawHour) % 12;
  if (meridiem.toUpperCase() === "PM") hour += 12;
  return hour * 60 + Number(rawMinute);
};

/**
 * Morning 6:00-12:00, Afternoon 12:00-17:00, Night 17:00-24:00.
 * Unparseable times fall back to "all" so they are never silently dropped.
 */
const shiftOfBooking = (time: string): Exclude<ShiftId, "all"> | "all" => {
  const minutes = to24HourMinutes(time);
  if (minutes === null) return "all";
  if (minutes >= 6 * 60 && minutes < 12 * 60) return "morning";
  if (minutes >= 12 * 60 && minutes < 17 * 60) return "afternoon";
  if (minutes >= 17 * 60) return "night";
  return "all";
};

/**
 * Resolves the pill metadata for a booking time, falling back to "All Shifts"
 * so every row always renders a badge.
 */
const shiftMetaOf = (time: string) =>
  shifts.find((s) => s.id === shiftOfBooking(time)) ?? shifts[0];

const shiftLabelOf = (time: string) => shiftMetaOf(time).label;

const BookingListPage = () => {
  const [tab, setTab] = useState<"All" | BStatus>("All");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
  const [checked, setChecked] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);

  const navigate = useNavigate();
  const counts = useMemo(
    () => ({
      All: bookings.length,
      "On Going": bookings.filter((b) => b.status === "On Going").length,
      Accepted: bookings.filter((b) => b.status === "Accepted").length,
      Pending: bookings.filter((b) => b.status === "Pending").length,
      Completed: bookings.filter((b) => b.status === "Completed").length,
      Rejected: bookings.filter((b) => b.status === "Rejected").length,
    }),
    [],
  );
  const filtered = useMemo(
    () =>
      bookings.filter((b) => {
        const q = query.toLowerCase();
        const mQ =
          !q ||
          b.id.toLowerCase().includes(q) ||
          b.customer.toLowerCase().includes(q) ||
          b.phone.includes(q) ||
          b.service.toLowerCase().includes(q) ||
          b.provider.toLowerCase().includes(q);
        const mC = city === "All cities" || b.city === city;
        const mT = tab === "All" || b.status === tab;
        return mQ && mC && mT;
      }),
    [query, city, tab],
  );

  const allChecked =
    filtered.length > 0 && filtered.every((b) => checked.includes(b.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : filtered.map((b) => b.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  /** Bookings the admin can act on in bulk (pending approval). */
  const selectedPendingCount = filtered.filter(
    (b) => checked.includes(b.id) && b.status === "Pending",
  ).length;

  const selectedCount = checked.length;

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
      ? filtered.filter((b) => checked.includes(b.id))
      : filtered;
    if (rows.length === 0) return;

    const header = [
      "Booking ID",
      "Customer",
      "Phone",
      "Service",
      "Area",
      "City",
      "Date",
      "Time",
      "Provider",
      "Status",
      "Shifts",
      "Amount",
    ];
    const body = rows.map((b) =>
      [
        b.id,
        b.customer,
        b.phone,
        b.service,
        b.area,
        b.city,
        b.date,
        b.time,
        b.provider,
        b.status,
        shiftLabelOf(b.time),
        b.amount,
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
      ? `banao-bookings-selected-${selectedCount}.csv`
      : "banao-bookings.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`h-10 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 shrink-0 ${tab === t ? "bg-[#ff4d4f] text-white shadow" : "text-neutral-500 hover:bg-neutral-50"}`}
            >
              {t === "All" ? "All Jobs" : t}
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
                  placeholder="Search ID, customer, service, provider..."
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
                  {filtered.length} booking{filtered.length === 1 ? "" : "s"}
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
      {checked.length > 0 && (
        <div className="bg-white border border-orange-100 rounded-2xl p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] font-semibold text-neutral-700 flex items-center gap-1.5">
            <span className="font-extrabold text-[#FF6B35]">
              {selectedCount}
            </span>{" "}
            booking{selectedCount > 1 ? "s" : ""} selected
            {selectedPendingCount > 0 && (
              <span className="text-[11px] font-bold text-amber-600">
                - {selectedPendingCount} pending approval
              </span>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportCsv}
              disabled={filtered.length === 0}
              className="h-9 px-3.5 rounded-full border border-neutral-200 bg-white text-[12px] font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              Export {selectedCount}
            </button>
            <button
              type="button"
              disabled={selectedPendingCount === 0}
              className="h-9 px-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check className="w-3.5 h-3.5" /> Accept Selected
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
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm ">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-white border-b border-neutral-100 bg-[#FF6B35]">
                <th className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all bookings"
                    className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5 font-bold">Booking</th>
                <th className="px-4 py-3.5 font-bold">Service / Area</th>
                <th className="px-4 py-3.5 font-bold">Provider</th>
                <th className="px-4 py-3.5 font-bold">Shifts</th>
                <th className="px-4 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const isSelected = checked.includes(b.id);
                return (
                  <tr
                    key={b.id}
                    className={`border-b border-neutral-100 last:border-0 transition ${isSelected ? "bg-orange-50/60" : "hover:bg-neutral-50/70"}`}
                  >
                    <td className="px-5 py-3.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(b.id)}
                        aria-label={`Select booking ${b.id}`}
                        className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="   text-neutral-900">{b.id}</div>
                      <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                        {b.customer}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                        {/* <CalendarDays className="w-3 h-3" /> */}
                        {b.date} - {b.time}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className=" text-neutral-800 flex items-center gap-1.5 text-[13px]">
                        <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                        {b.service}
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <Navigation className="w-3 h-3" />
                        {b.area}, {b.city}
                      </div>
                    </td>
                    <td className="px-1 py-3.5">
                      <span
                        onClick={() => navigate("/live-tracking")}
                        className={` cursor-pointer hover:text-orange-400 text-[13px]  inline-flex items-center gap-1.5 ${b.provider === "Unassigned" ? "text-amber-600" : "text-neutral-700"}`}
                      >
                        <Navigation className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        {b.provider}
                      </span>
                      {b.provider === "Unassigned" && (
                        <div className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Assign now
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        title={shiftMetaOf(b.time).range}
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-flex items-center gap-1 whitespace-nowrap ${shiftMetaOf(b.time).active}`}
                      >
                        <Clock className="w-3 h-3" />
                        {shiftMetaOf(b.time).label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyle[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="font-extrabold text-neutral-900 whitespace-nowrap">
                        {b.amount}
                      </div>
                      <div className="flex justify-end gap-1.5 mt-1.5">
                        {b.status === "Pending" ? (
                          <>
                            <button className="h-7 px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition">
                              <Check className="w-3 h-3" /> Accept
                            </button>
                            <button className="h-7 px-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-[11px] font-bold flex items-center gap-1 transition">
                              <X className="w-3 h-3" /> Reject
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
                    No bookings in this tab. Try another tab or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} jobs in {tab === "All" ? "all jobs" : tab}{" "}
            tab
            {checked.length > 0 && (
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

export default BookingListPage;
