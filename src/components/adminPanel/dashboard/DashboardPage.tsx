import React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";

const kpis = [
  {
    label: "Today's Revenue",
    value: "Rs. 2,48,500",
    sub: "+18.2% vs yesterday",
    icon: Banknote,
    bg: "bg-orange-50",
    iconColor: "text-[#FF6B35]",
  },
  {
    label: "Bookings Today",
    value: "642",
    sub: "+64 from yesterday",
    icon: CalendarDays,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Active Providers",
    value: "1,284",
    sub: "96% online now",
    icon: UserCheck,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Total Customers",
    value: "48.2k",
    sub: "+312 this week",
    icon: Users,
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

const weeklyRevenue = [
  { day: "Sun", value: 42 },
  { day: "Mon", value: 65 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 72 },
  { day: "Fri", value: 95 },
  { day: "Sat", value: 88 },
];

const services = [
  { name: "Home Cleaning", bookings: 184, pct: 82, color: "bg-[#FF6B35]" },
  { name: "Plumbing", bookings: 142, pct: 64, color: "bg-blue-500" },
  { name: "Electrical", bookings: 118, pct: 52, color: "bg-emerald-500" },
  { name: "Painting", bookings: 86, pct: 38, color: "bg-violet-500" },
  { name: "Appliance Repair", bookings: 64, pct: 28, color: "bg-amber-500" },
];

const bookings = [
  {
    id: "BN-98412",
    customer: "Aashish Sharma",
    service: "Deep Home Cleaning",
    area: "Baneshwor, KTM",
    time: "Today, 2:00 PM",
    provider: "Ramesh Thapa",
    status: "In Progress",
    statusStyle: "bg-blue-50 text-blue-700 border-blue-100",
    amount: "Rs. 4,500",
  },
  {
    id: "BN-98411",
    customer: "Priya Karki",
    service: "AC Repair",
    area: "Lakeside, PKR",
    time: "Today, 1:30 PM",
    provider: "Suresh Yadav",
    status: "Assigned",
    statusStyle: "bg-amber-50 text-amber-700 border-amber-100",
    amount: "Rs. 1,800",
  },
  {
    id: "BN-98409",
    customer: "Bibek Adhikari",
    service: "Plumbing Fix",
    area: "Pulchowk, LTP",
    time: "Today, 12:15 PM",
    provider: "Hari Bahadur",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amount: "Rs. 2,200",
  },
  {
    id: "BN-98407",
    customer: "Sunita Rai",
    service: "Full House Painting",
    area: "Boudha, KTM",
    time: "Today, 11:00 AM",
    provider: "Dipak Gurung",
    status: "Completed",
    statusStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amount: "Rs. 28,000",
  },
  {
    id: "BN-98405",
    customer: "Niraj Shrestha",
    service: "Electric Wiring",
    area: "Thamel, KTM",
    time: "Today, 10:00 AM",
    provider: "Pending",
    status: "Pending",
    statusStyle: "bg-neutral-100 text-neutral-600 border-neutral-200",
    amount: "Rs. 3,400",
  },
];

const providers = [
  {
    name: "Ramesh Thapa",
    skill: "Cleaning - 4.9",
    jobs: "32 jobs this week",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    online: true,
  },
  {
    name: "Suresh Yadav",
    skill: "Electrician - 4.8",
    jobs: "28 jobs this week",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    online: true,
  },
  {
    name: "Dipak Gurung",
    skill: "Painter - 4.9",
    jobs: "24 jobs this week",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    online: false,
  },
];

const DashboardPage = () => {
  const maxBar = Math.max(...weeklyRevenue.map((d) => d.value));
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-700">Dashboard</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live - Nepal
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Namaste, Shubash
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            Friday, Oct 2, 2026 - Kathmandu / Pokhara / Lalitpur operations.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm">
            Export Report
          </button>
          <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> + New Booking
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-11 h-11 rounded-xl ${k.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${k.iconColor}`} />
                </div>
                <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {k.sub.split(" ")[0]}
                </span>
              </div>
              <div className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
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
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                Revenue Overview
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
                  This week
                </span>
              </h3>
              <p className="text-[13px] text-neutral-500 mt-1">
                Total{" "}
                <span className="font-bold text-neutral-800">Rs. 8,42,300</span>{" "}
                - <span className="text-emerald-600 font-semibold">+12.4%</span>{" "}
                vs last week
              </p>
            </div>
            <div className="flex items-center gap-2">
              {["Day", "Week", "Month"].map((t, i) => (
                <button
                  key={t}
                  className={`h-8 px-3 rounded-full text-xs font-bold border transition ${i === 1 ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-end gap-3 h-[210px] px-1">
            {weeklyRevenue.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <div className="text-[11px] font-bold text-neutral-500">
                  {d.value}k
                </div>
                <div
                  className={`w-full max-w-[56px] rounded-xl ${d.value === maxBar ? "bg-gradient-to-t from-[#FF6B35] to-[#ff9a62] shadow-lg shadow-orange-500/25" : "bg-neutral-100"}`}
                  style={{ height: `${(d.value / maxBar) * 140}px` }}
                />
                <div
                  className={`text-xs font-bold ${d.value === maxBar ? "text-[#FF6B35]" : "text-neutral-400"}`}
                >
                  {d.day}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-3">
            {[
              { l: "Kathmandu", v: "Rs. 5.1L", pct: "61%" },
              { l: "Pokhara", v: "Rs. 2.1L", pct: "25%" },
              { l: "Lalitpur", v: "Rs. 1.2L", pct: "14%" },
            ].map((c) => (
              <div
                key={c.l}
                className="rounded-xl bg-neutral-50 border border-neutral-100 px-3.5 py-3"
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  {c.l} - {c.pct}
                </div>
                <div className="font-extrabold text-neutral-900 mt-0.5">
                  {c.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF6B35]/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#FF6B35]" /> Live Tracking
              </h3>
              <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-white/10 border border-white/10">
                38 active jobs
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-white/5 border border-white/10 p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] flex items-center justify-center font-extrabold shrink-0">
                R
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">
                  Ramesh - BN-98412
                </div>
                <div className="text-xs text-white/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Baneshwor - Shantinagar - 12
                  min away
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#FF6B35] to-amber-400" />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2.5 text-center">
              <div className="rounded-xl bg-white/5 border border-white/10 py-2.5">
                <div className="font-extrabold">24</div>
                <div className="text-[11px] text-white/60 font-medium">
                  On the way
                </div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 py-2.5">
                <div className="font-extrabold">14</div>
                <div className="text-[11px] text-white/60 font-medium">
                  On job
                </div>
              </div>
            </div>
            <button className="mt-3 w-full h-10 rounded-xl bg-white text-neutral-900 text-sm font-bold hover:bg-neutral-100 transition flex items-center justify-center gap-1.5">
              Open live map <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600" /> Payouts
            </h3>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-2xl font-extrabold">Rs. 1,12,400</div>
                <div className="text-xs text-neutral-500 font-medium">
                  Pending this week
                </div>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 6 due
              </span>
            </div>
            <button className="mt-3 w-full h-10 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-700 hover:bg-neutral-50 transition">
              Review payouts
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900">Recent Bookings</h3>
              <p className="text-[13px] text-neutral-500">
                Latest 5 - 642 bookings today
              </p>
            </div>
            <button className="h-9 px-3.5 rounded-full border border-neutral-200 text-[13px] font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-400 border-y border-neutral-100 bg-neutral-50/60">
                  <th className="px-5 py-3 font-bold">Booking</th>
                  <th className="px-4 py-3 font-bold">Service / Area</th>
                  <th className="px-4 py-3 font-bold">Provider</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-neutral-900">{b.id}</div>
                      <div className="text-xs text-neutral-500 font-medium">
                        {b.customer} - {b.time}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-neutral-800 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-neutral-400" />{" "}
                        {b.service}
                      </div>
                      <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {b.area}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[13px] font-semibold text-neutral-700">
                      {b.provider}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${b.statusStyle}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-extrabold text-neutral-900 whitespace-nowrap">
                      {b.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-neutral-900">Top Providers</h3>
              <button className="text-xs font-bold text-[#FF6B35] hover:underline">
                View all
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {providers.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${p.online ? "bg-emerald-500" : "bg-neutral-300"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-neutral-900 flex items-center gap-1 truncate">
                      {p.name}{" "}
                      <BadgeCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    </div>
                    <div className="text-xs text-neutral-500 font-medium truncate">
                      {p.skill} - {p.jobs}
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-extrabold text-neutral-800 bg-neutral-50 border border-neutral-100 px-2 py-1 rounded-full shrink-0">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{" "}
                    {p.rating}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-orange-50/60 border border-orange-100 p-3 flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#FF6B35] shrink-0" />
              <p className="text-xs font-semibold text-neutral-700">
                <span className="font-extrabold text-[#FF6B35]">
                  12 providers
                </span>{" "}
                pending verification
              </p>
            </div>
          </div>
          <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-neutral-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF6B35]" /> Top Services
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {services.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-[13px] mb-1.5">
                    <span className="font-semibold text-neutral-700">
                      {s.name}
                    </span>
                    <span className="font-bold text-neutral-900">
                      {s.bookings} bookings
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.color}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
