import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Download,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
} from "lucide-react";

type Customer = {
  id: string;
  name: string;
  phone: string;
  area: string;
  city: string;
  bookings: number;
  spent: string;
  spentNum: number;
  rating: number;
  lastBooking: string;
  status: "Active" | "New" | "Inactive";
  joined: string;
  img: string;
};

const customers: Customer[] = [
  {
    id: "CU-48201",
    name: "Aashish Sharma",
    phone: "+977-98412-33445",
    area: "Baneshwor",
    city: "Kathmandu",
    bookings: 24,
    spent: "Rs. 68,400",
    spentNum: 68400,
    rating: 4.9,
    lastBooking: "Oct 1, 2026",
    status: "Active",
    joined: "Jan 2024",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48198",
    name: "Priya Karki",
    phone: "+977-98510-22114",
    area: "Lakeside",
    city: "Pokhara",
    bookings: 18,
    spent: "Rs. 42,800",
    spentNum: 42800,
    rating: 4.8,
    lastBooking: "Oct 2, 2026",
    status: "Active",
    joined: "Mar 2024",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48177",
    name: "Bibek Adhikari",
    phone: "+977-98460-99812",
    area: "Pulchowk",
    city: "Lalitpur",
    bookings: 15,
    spent: "Rs. 38,200",
    spentNum: 38200,
    rating: 4.7,
    lastBooking: "Sep 29, 2026",
    status: "Active",
    joined: "Jun 2024",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48160",
    name: "Sunita Rai",
    phone: "+977-98134-55678",
    area: "Boudha",
    city: "Kathmandu",
    bookings: 21,
    spent: "Rs. 85,000",
    spentNum: 85000,
    rating: 5.0,
    lastBooking: "Oct 2, 2026",
    status: "Active",
    joined: "Nov 2023",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48155",
    name: "Niraj Shrestha",
    phone: "+977-98491-20394",
    area: "Thamel",
    city: "Kathmandu",
    bookings: 9,
    spent: "Rs. 18,500",
    spentNum: 18500,
    rating: 4.6,
    lastBooking: "Sep 25, 2026",
    status: "Active",
    joined: "Aug 2024",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48140",
    name: "Sneha Maharjan",
    phone: "+977-98601-44721",
    area: "Jhamsikhel",
    city: "Lalitpur",
    bookings: 12,
    spent: "Rs. 29,600",
    spentNum: 29600,
    rating: 4.8,
    lastBooking: "Sep 28, 2026",
    status: "Active",
    joined: "Feb 2024",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48132",
    name: "Dipesh Thapa",
    phone: "+977-98455-12987",
    area: "Chipledhunga",
    city: "Pokhara",
    bookings: 3,
    spent: "Rs. 6,200",
    spentNum: 6200,
    rating: 4.5,
    lastBooking: "Oct 1, 2026",
    status: "New",
    joined: "Sep 2026",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48120",
    name: "Kabita Gurung",
    phone: "+977-98160-33412",
    area: "Kapan",
    city: "Kathmandu",
    bookings: 7,
    spent: "Rs. 14,900",
    spentNum: 14900,
    rating: 4.7,
    lastBooking: "Sep 20, 2026",
    status: "Inactive",
    joined: "May 2024",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48115",
    name: "Rohan Poudel",
    phone: "+977-98470-88213",
    area: "Maharajgunj",
    city: "Kathmandu",
    bookings: 2,
    spent: "Rs. 3,800",
    spentNum: 3800,
    rating: 4.9,
    lastBooking: "Oct 2, 2026",
    status: "New",
    joined: "Sep 2026",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "CU-48102",
    name: "Mina Tamang",
    phone: "+977-98512-99034",
    area: "Ekantakuna",
    city: "Lalitpur",
    bookings: 5,
    spent: "Rs. 11,300",
    spentNum: 11300,
    rating: 4.4,
    lastBooking: "Aug 30, 2026",
    status: "Inactive",
    joined: "Dec 2023",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
  },
];

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  New: "bg-blue-50 text-blue-700 border-blue-100",
  Inactive: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

const CustomerPage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
  const [status, setStatus] = useState("All status");
  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        const q = query.toLowerCase();
        const matchQ =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.area.toLowerCase().includes(q);
        const matchC = city === "All cities" || c.city === city;
        const matchS = status === "All status" || c.status === status;
        return matchQ && matchC && matchS;
      }),
    [query, city, status],
  );
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-700">Customers</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              48.2k total
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Customers
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Manage all Banao customers across Nepal - {filtered.length} showing.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          ["Total Customers", "48,214", "+312 this week"],
          ["Active", "42,890", "89% of total"],
          ["New (Sep)", "1,240", "+18% growth"],
          ["Avg. Rating", "4.8", "from 32k reviews"],
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
      <div className="bg-white border border-neutral-200/70 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, phone, area..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none focus:bg-white focus:border-[#FF6B35] transition"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11 rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none cursor-pointer"
          >
            {["All cities", "Kathmandu", "Pokhara", "Lalitpur"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none cursor-pointer"
          >
            {["All status", "Active", "New", "Inactive"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100 bg-neutral-50/60">
                <th className="px-5 py-3.5 font-bold">Customer</th>
                <th className="px-4 py-3.5 font-bold">Contact / Area</th>
                <th className="px-4 py-3.5 font-bold text-center">Bookings</th>
                <th className="px-4 py-3.5 font-bold text-center">Rating</th>
                <th className="px-4 py-3.5 font-bold">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition cursor-pointer"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-neutral-900 flex items-center gap-1 truncate">
                          {c.name}
                          {c.rating >= 4.8 && (
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium">
                          {c.id} - Joined {c.joined}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-neutral-800 flex items-center gap-1.5 text-[13px]">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      {c.phone}
                    </div>
                    <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {c.area}, {c.city}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <div className="font-extrabold text-neutral-900">
                      {c.bookings}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-medium flex items-center justify-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {c.lastBooking}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold bg-amber-50 border border-amber-100 text-neutral-800 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {c.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusStyle[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="font-extrabold text-neutral-900 whitespace-nowrap">
                      {c.spent}
                    </div>
                    <button className="text-xs font-bold text-[#FF6B35] hover:underline inline-flex items-center gap-0.5">
                      View <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No customers found. Try another search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between text-[13px] font-medium text-neutral-500">
          <span>Showing {filtered.length} of 48,214 customers</span>
          <div className="flex gap-1.5">
            {["1", "2", "3", "...", "4822"].map((p, i) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-full text-xs font-bold border transition ${i === 0 ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-200 hover:bg-neutral-50"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
