import React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ClipboardList,
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dateUtils } from "@/utils/dateUtils";

type KpiTrend = {
  /** Short delta shown in the badge, e.g. "+18.2%". */
  value: string;
  direction: "up" | "down" | "flat";
};

const kpis: Array<{
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  bg: string;
  iconColor: string;
  trend: KpiTrend;
}> = [
  {
    label: "Today's Revenue",
    value: "Rs. 2,48,500",
    sub: "+18.2% vs yesterday",
    icon: Wallet,
    bg: "bg-orange-50",
    iconColor: "text-[#FF6B35]",
    trend: { value: "+18.2%", direction: "up" },
  },
  {
    label: "Bookings Today",
    value: "642",
    sub: "+64 from yesterday",
    icon: ClipboardList,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trend: { value: "+64", direction: "up" },
  },
  {
    label: "Active Providers",
    value: "1,284",
    sub: "96% online now",
    icon: UserCheck,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: { value: "96% online", direction: "flat" },
  },
  {
    label: "Total Customers",
    value: "48.2k",
    sub: "+312 this week",
    icon: Users,
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
    trend: { value: "+312", direction: "up" },
  },
];

type RevenueRange = "Day" | "Week" | "Month";

type RevenuePoint = { label: string; value: number };

type RevenueSeries = {
  badge: string;
  total: string;
  growth: string;
  vs: string;
  points: RevenuePoint[];
  areas: Array<{ l: string; v: string; pct: string }>;
};

const revenueRanges: RevenueRange[] = ["Day", "Week", "Month"];

const BRAND_ORANGE = "#FF6B35";
const MUTED_BAR = "#f5f5f5";

/** Values are in thousands (Rs. k) and each set sums to its own total. */
const revenueSeries: Record<RevenueRange, RevenueSeries> = {
  Day: {
    badge: "Today",
    total: "Rs. 2,48,500",
    growth: "+18.2%",
    vs: "vs yesterday",
    points: [
      { label: "8 AM", value: 18.5 },
      { label: "10 AM", value: 26.4 },
      { label: "12 PM", value: 34.2 },
      { label: "2 PM", value: 41.8 },
      { label: "4 PM", value: 38.6 },
      { label: "6 PM", value: 44.7 },
      { label: "8 PM", value: 30.9 },
      { label: "10 PM", value: 13.4 },
    ],
    areas: [
      { l: "Kathmandu", v: "Rs. 1.5L", pct: "62%" },
      { l: "Pokhara", v: "Rs. 62k", pct: "25%" },
      { l: "Lalitpur", v: "Rs. 36.5k", pct: "13%" },
    ],
  },
  Week: {
    badge: "This week",
    total: "Rs. 8,42,300",
    growth: "+12.4%",
    vs: "vs last week",
    points: [
      { label: "Sun", value: 70.8 },
      { label: "Mon", value: 109.5 },
      { label: "Tue", value: 97.7 },
      { label: "Wed", value: 134.8 },
      { label: "Thu", value: 121.3 },
      { label: "Fri", value: 160 },
      { label: "Sat", value: 148.2 },
    ],
    areas: [
      { l: "Kathmandu", v: "Rs. 5.1L", pct: "61%" },
      { l: "Pokhara", v: "Rs. 2.1L", pct: "25%" },
      { l: "Lalitpur", v: "Rs. 1.2L", pct: "14%" },
    ],
  },
  Month: {
    badge: "This month",
    total: "Rs. 24,86,900",
    growth: "+9.6%",
    vs: "vs last month",
    points: [
      { label: "W1", value: 452.3 },
      { label: "W2", value: 518.7 },
      { label: "W3", value: 486.4 },
      { label: "W4", value: 561.2 },
      { label: "W5", value: 468.3 },
    ],
    areas: [
      { l: "Kathmandu", v: "Rs. 15.2L", pct: "61%" },
      { l: "Pokhara", v: "Rs. 6.2L", pct: "25%" },
      { l: "Lalitpur", v: "Rs. 3.5L", pct: "14%" },
    ],
  },
};

type RevenueTickProps = {
  x?: number;
  y?: number;
  payload?: RevenuePoint;
  maxValue: number;
};

const RevenueTick = ({ x = 0, y = 0, payload, maxValue }: RevenueTickProps) => {
  if (!payload) return null;
  return (
    <text
      x={x}
      y={y + 16}
      textAnchor="middle"
      fontSize={12}
      fontWeight={700}
      fill={payload.value === maxValue ? BRAND_ORANGE : "#a3a3a3"}
    >
      {payload.label}
    </text>
  );
};

type RevenueTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload?: RevenuePoint }>;
};

const RevenueTooltip = ({ active, payload }: RevenueTooltipProps) => {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return (
    <div className="rounded-xl border border-neutral-200/70 bg-white px-3 py-2 shadow-lg shadow-neutral-900/5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
        {point.label}
      </div>
      <div className="text-sm font-extrabold text-neutral-900 mt-0.5">
        Rs. {point.value}k
      </div>
    </div>
  );
};

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
  const [range, setRange] = React.useState<RevenueRange>("Week");
  const [checked, setChecked] = React.useState<string[]>([]);
  const series = revenueSeries[range];
  const maxBar = Math.max(...series.points.map((p) => p.value));

  const allChecked =
    bookings.length > 0 && bookings.every((b) => checked.includes(b.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : bookings.map((b) => b.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {/* <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-neutral-700">Dashboard</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live - Nepal
            </span>
          </div> */}
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 mt-1">
            Namaste, Shubash
          </h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {dateUtils} - Kathmandu / Pokhara / Lalitpur operations.
          </p>
        </div>
        {/* <div className="flex items-center gap-2.5">
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 shadow-sm">
            Report
          </button>
          <button className="h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> + Booking
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const TrendIcon =
            k.trend.direction === "down"
              ? ArrowDownRight
              : k.trend.direction === "flat"
                ? null
                : ArrowUpRight;
          return (
            <div
              key={k.label}
              className="group relative bg-white border border-neutral-200/70 rounded-2xl p-3 cursor-pointer  shadow-sm hover:shadow-md hover:border-neutral-300 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`w-4 h-4 rounded-xl ${k.bg} flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                >
                  <Icon className={`w-4 h-4 ${k.iconColor}`} />
                </span>
                <span
                  className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border shrink-0 ${k.trend.direction === "down" ? "bg-red-50 text-red-600 border-red-100" : k.trend.direction === "flat" ? "bg-neutral-50 text-neutral-500 border-neutral-200" : "bg-emerald-50 text-emerald-700 border-emerald-100"}`}
                >
                  {TrendIcon && <TrendIcon className="w-3.5 h-3.5" />}
                  {k.trend.value}
                </span>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
                {k.value}
              </div>
              <div className="text-[11px] font-medium text-neutral-500 mt-0.5">
                {k.label} · {k.sub}
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
                  {series.badge}
                </span>
              </h3>
              <p className="text-[13px] text-neutral-500 mt-1">
                Total{" "}
                <span className="font-bold text-neutral-800">
                  {series.total}
                </span>{" "}
                -{" "}
                <span className="text-emerald-600 font-semibold">
                  {series.growth}
                </span>{" "}
                {series.vs}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {revenueRanges.map((t) => (
                <button
                  key={t}
                  onClick={() => setRange(t)}
                  className={`h-8 px-3 rounded-full text-xs font-bold border transition ${t === range ? "bg-neutral-900 text-white border-neutral-900" : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 px-1">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart
                data={series.points}
                margin={{ top: 26, right: 8, left: 8, bottom: 0 }}
                barCategoryGap="24%"
              >
                <defs>
                  <linearGradient
                    id="revenueMaxBar"
                    x1="0"
                    y1="1"
                    x2="0"
                    y2="0"
                  >
                    <stop offset="0%" stopColor={BRAND_ORANGE} />
                    <stop offset="100%" stopColor="#ff9a62" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f5f5f5" />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  height={24}
                  interval={0}
                  tick={<RevenueTick maxValue={maxBar} />}
                />
                <YAxis hide domain={[0, "dataMax + 15"]} />
                <Tooltip
                  cursor={{ fill: "rgba(245,245,245,0.65)" }}
                  content={<RevenueTooltip />}
                />
                <Bar dataKey="value" maxBarSize={56} radius={[12, 12, 12, 12]}>
                  {series.points.map((p) => (
                    <Cell
                      key={p.label}
                      fill={
                        p.value === maxBar ? "url(#revenueMaxBar)" : MUTED_BAR
                      }
                    />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    offset={10}
                    fill="#737373"
                    fontSize={11}
                    fontWeight={700}
                    formatter={(v: any) => `${v}k`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-3">
            {series.areas.map((c) => (
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
          <div className="bg-neutral-500 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#FF6B35]/70 blur-2xl" />
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
            <table className="w-full text-sm ">
              <thead className=" bg-[#FF6B35] text-white">
                <tr className="text-left text-[11px] uppercase tracking-wider  border-y border-neutral-100 ">
                  <th className="px-5 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      aria-label="Select all bookings"
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3 font-bold">Booking</th>
                  <th className="px-4 py-3 font-bold">Service / Area</th>
                  <th className="px-4 py-3 font-bold">Provider</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((b) => {
                  const isSelected = checked.includes(b.id);
                  return (
                    <tr
                      key={b.id}
                      className={`border-b border-neutral-100 last:border-0 transition ${isSelected ? "bg-orange-50/60" : "hover:bg-neutral-50/60"}`}
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
                  );
                })}
              </tbody>
            </table>
          </div>
          {checked.length > 0 && (
            <div className="px-5 py-3 border-t border-neutral-100 flex items-center justify-between gap-3 bg-orange-50/40">
              <span className="text-[12px] font-semibold text-neutral-600">
                <span className="font-extrabold text-[#FF6B35]">
                  {checked.length}
                </span>{" "}
                booking{checked.length > 1 ? "s" : ""} selected
              </span>
              <button
                type="button"
                onClick={() => setChecked([])}
                className="text-[11px] font-bold text-[#FF6B35] hover:underline"
              >
                Clear selection
              </button>
            </div>
          )}
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
