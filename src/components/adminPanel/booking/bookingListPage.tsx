import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock,
  Download,
  MapPin,
  Plus,
  Search,
  User,
  Wrench,
  X,
} from "lucide-react";

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
    amount: "Rs. 4,500",
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

const BookingListPage = () => {
  const [tab, setTab] = useState<"All" | BStatus>("All");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
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
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-700">Bookings</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-[#FF6B35] text-white">
              642 Today
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Bookings
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Track every job from request to completion - {filtered.length}{" "}
            showing.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
          {/* <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> New Booking
          </button> */}
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Today's Jobs", "642", "+64 vs yesterday"],
          ["On Going Now", String(counts["On Going"] * 19), "live tracking"],
          ["Pending Assign", String(counts.Pending * 42), "needs provider"],
          ["Completed Today", String(counts.Completed * 189), "98% on time"],
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
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-2 shadow-sm flex gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-10 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${tab === t ? "bg-[#ff4d4f] text-white shadow" : "text-neutral-500 hover:bg-neutral-50"}`}
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
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ID, customer, service, provider..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-[#FF6B35] transition"
          />
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-11 rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none cursor-pointer"
        >
          {["All cities", "Kathmandu", "Pokhara", "Lalitpur"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[920px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100 bg-neutral-50/60">
                <th className="px-5 py-3.5 font-bold">Booking</th>
                <th className="px-4 py-3.5 font-bold">Service / Area</th>
                <th className="px-4 py-3.5 font-bold">Provider</th>
                <th className="px-4 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-neutral-900">{b.id}</div>
                    <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {b.customer}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {b.date} - {b.time}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-neutral-800 flex items-center gap-1.5 text-[13px]">
                      <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                      {b.service}
                    </div>
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {b.area}, {b.city}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-[13px] font-semibold ${b.provider === "Unassigned" ? "text-amber-600" : "text-neutral-700"}`}
                    >
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
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No bookings in this tab. Try another tab or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} jobs in {tab === "All" ? "all jobs" : tab}{" "}
            tab
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
