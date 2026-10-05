import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Wallet,
  X,
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
  tier: "VIP" | "Regular";
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
    tier: "VIP",
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
    tier: "VIP",
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
    tier: "Regular",
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
    tier: "VIP",
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
    tier: "Regular",
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
    tier: "Regular",
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
    tier: "Regular",
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
    tier: "Regular",
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
    tier: "Regular",
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
    tier: "Regular",
    joined: "Dec 2023",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
  },
];

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  New: "bg-blue-50 text-blue-700 border-blue-100",
  Inactive: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

const toCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

const cityOptions = ["All cities", "Kathmandu", "Pokhara", "Lalitpur"];
const statusOptions = ["All status", "Active", "New", "Inactive"];

type CustomerTab = "all" | "active" | "stats";

type SortKey = "recent" | "oldest" | "spent-desc" | "spent-asc" | "name";

const sortOptions: Array<{ id: SortKey; label: string }> = [
  { id: "recent", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "spent-desc", label: "Highest spend" },
  { id: "spent-asc", label: "Lowest spend" },
  { id: "name", label: "Name (A-Z)" },
];

/** Parses the mock "Oct 1, 2026" date strings used by lastBooking. */
const parseLastBooking = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

type StatsSummary = {
  total: number;
  activeCount: number;
  newCount: number;
  inactiveCount: number;
  revenue: number;
  totalBookings: number;
  avgRating: number;
  avgBookings: number;
  avgSpend: number;
  repeatRate: number;
  cityBreakdown: Array<{
    name: string;
    count: number;
    spend: number;
    pct: number;
  }>;
  statusBreakdown: Array<{ label: string; count: number; bar: string }>;
  topSpenders: Customer[];
};

/** Uses the Indian numbering system to match the rest of the dashboard. */
const formatNpr = (value: number) => `Rs. ${value.toLocaleString("en-IN")}`;

const StatTile = ({
  label,
  value,
  sub,
  icon: Icon,
  bg,
  iconColor,
}: {
  label: string;
  value: string;
  sub: string;
  icon: typeof Users;
  bg: string;
  iconColor: string;
}) => (
  <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
    <div
      className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}
    >
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
      {value}
    </div>
    <div className="text-[11px] font-medium text-neutral-500 mt-0.5">
      {label} - {sub}
    </div>
  </div>
);

const StatsView = ({ summary }: { summary: StatsSummary }) => {
  const {
    total,
    activeCount,
    newCount,
    inactiveCount,
    revenue,
    totalBookings,
    avgRating,
    avgBookings,
    avgSpend,
    repeatRate,
    cityBreakdown,
    statusBreakdown,
    topSpenders,
  } = summary;

  if (total === 0) {
    return (
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm px-5 py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center mx-auto">
          <Users className="w-6 h-6 text-neutral-400" />
        </div>
        <p className="text-sm font-bold text-neutral-700 mt-4">
          No stats to show
        </p>
        <p className="text-[13px] font-medium text-neutral-400 mt-1">
          Adjust your filters to include customers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatTile
          label="Total Customers"
          value={total.toLocaleString()}
          sub={`${activeCount} active`}
          icon={Users}
          bg="bg-orange-50"
          iconColor="text-[#FF6B35]"
        />
        <StatTile
          label="Lifetime Revenue"
          value={formatNpr(revenue)}
          sub={`${formatNpr(avgSpend)} avg`}
          icon={Wallet}
          bg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatTile
          label="Bookings Placed"
          value={totalBookings.toLocaleString()}
          sub={`${avgBookings.toFixed(1)} avg`}
          icon={CalendarDays}
          bg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatTile
          label="Avg. Rating"
          value={avgRating.toFixed(1)}
          sub={`${repeatRate}% repeat`}
          icon={Star}
          bg="bg-amber-50"
          iconColor="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-neutral-900">Customers by City</h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {cityBreakdown.map((city) => (
              <div key={city.name}>
                <div className="flex items-center justify-between text-[13px] mb-1.5">
                  <span className="font-semibold text-neutral-700">
                    {city.name}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-400">
                    {city.count} customers - {city.pct}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FF6B35] transition-all"
                    style={{ width: `${city.pct}%` }}
                  />
                </div>
                <div className="text-[11px] font-medium text-neutral-400 mt-1">
                  {formatNpr(city.spend)} lifetime spend
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-neutral-900">Status Breakdown</h3>
          <div className="mt-4 flex flex-col gap-3.5">
            {statusBreakdown.map((row) => {
              const pct = total ? Math.round((row.count / total) * 100) : 0;
              return (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-[13px] mb-1.5">
                    <span className="font-semibold text-neutral-700">
                      {row.label}
                    </span>
                    <span className="text-[11px] font-bold text-neutral-400">
                      {row.count} - {pct}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.bar} transition-all`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-3 gap-3 text-center">
            {statusBreakdown.map((row) => (
              <div key={row.label}>
                <div className="text-lg font-extrabold text-neutral-900">
                  {row.count}
                </div>
                <div className="text-[11px] font-semibold text-neutral-400 mt-0.5">
                  {row.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-neutral-900">Top Spenders</h3>
        <p className="text-[13px] text-neutral-500 mt-0.5">
          Highest lifetime value customers in the current view.
        </p>
        <div className="mt-4 flex flex-col gap-2.5">
          {topSpenders.map((c, index) => (
            <div
              key={c.id}
              className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-100 hover:bg-neutral-50/60 transition"
            >
              <span className="w-6 h-6 rounded-lg bg-orange-50 text-[#FF6B35] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                {index + 1}
              </span>
              <img
                src={c.img}
                alt={c.name}
                className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold text-neutral-900 truncate">
                  {c.name}
                </div>
                <div className="text-[11px] font-medium text-neutral-400 truncate">
                  {c.city} - {c.bookings} bookings
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-amber-50 border border-amber-100 text-neutral-800 px-2 py-1 rounded-full shrink-0">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {c.rating.toFixed(1)}
              </span>
              <span className="text-[13px] font-extrabold text-neutral-900 whitespace-nowrap shrink-0">
                {c.spent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomerPage = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
  const [status, setStatus] = useState("All status");
  const [checked, setChecked] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<CustomerTab>("all");
  const [sortKey, setSortKey] = useState<SortKey>("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
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

  /** Counter badges respect the active search/city/status filters. */
  const tabCounts = useMemo(
    () => ({
      all: filtered.length,
      active: filtered.filter((c) => c.status === "Active").length,
    }),
    [filtered],
  );

  const visible = useMemo(() => {
    const scoped =
      activeTab === "active"
        ? filtered.filter((c) => c.status === "Active")
        : filtered;

    const sorted = [...scoped];
    switch (sortKey) {
      case "oldest":
        sorted.sort(
          (a, b) =>
            parseLastBooking(a.lastBooking) - parseLastBooking(b.lastBooking),
        );
        break;
      case "spent-desc":
        sorted.sort((a, b) => b.spentNum - a.spentNum);
        break;
      case "spent-asc":
        sorted.sort((a, b) => a.spentNum - b.spentNum);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort(
          (a, b) =>
            parseLastBooking(b.lastBooking) - parseLastBooking(a.lastBooking),
        );
    }
    return sorted;
  }, [filtered, activeTab, sortKey]);

  const allChecked =
    visible.length > 0 && visible.every((c) => checked.includes(c.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : visible.map((c) => c.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const exportCsv = () => {
    const rows = checked.length
      ? visible.filter((c) => checked.includes(c.id))
      : visible;
    if (rows.length === 0) return;

    const header = [
      "Customer ID",
      "Name",
      "Phone",
      "Area",
      "City",
      "Bookings",
      "Rating",
      "Last Booking",
      "Status",
      "Total Spent",
    ];
    const body = rows.map((c) =>
      [
        c.id,
        c.name,
        c.phone,
        c.area,
        c.city,
        String(c.bookings),
        c.rating.toFixed(1),
        c.lastBooking,
        c.status,
        c.spent,
      ]
        .map(toCsvCell)
        .join(","),
    );

    const blob = new Blob(
      [[header.map(toCsvCell).join(","), ...body].join("\n")],
      {
        type: "text/csv;charset=utf-8;",
      },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "banao-customers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const hasActiveFilter =
    query.trim() !== "" || city !== "All cities" || status !== "All status";

  const clearFilters = () => {
    setQuery("");
    setCity("All cities");
    setStatus("All status");
  };

  // Close the sort dropdown when clicking or pressing Escape outside of it.
  const sortRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sortOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sortOpen]);

  const tabs: Array<{ id: CustomerTab; label: string; count: number }> = [
    { id: "all", label: "All Customers", count: tabCounts.all },
    { id: "active", label: "Active", count: tabCounts.active },
  ];

  const statsSummary = useMemo(() => {
    const rows = filtered;
    const total = rows.length;
    const activeCount = rows.filter((c) => c.status === "Active").length;
    const newCount = rows.filter((c) => c.status === "New").length;
    const inactiveCount = rows.filter((c) => c.status === "Inactive").length;
    const revenue = rows.reduce((sum, c) => sum + c.spentNum, 0);
    const totalBookings = rows.reduce((sum, c) => sum + c.bookings, 0);
    const avgRating = total
      ? rows.reduce((sum, c) => sum + c.rating, 0) / total
      : 0;
    const avgBookings = total ? totalBookings / total : 0;
    const avgSpend = total ? Math.round(revenue / total) : 0;
    const repeatRate = total
      ? Math.round((rows.filter((c) => c.bookings > 1).length / total) * 100)
      : 0;

    const cityBreakdown = cityOptions
      .filter((name) => name !== "All cities")
      .map((name) => {
        const inCity = rows.filter((c) => c.city === name);
        const spend = inCity.reduce((sum, c) => sum + c.spentNum, 0);
        return {
          name,
          count: inCity.length,
          spend,
          pct: total ? Math.round((inCity.length / total) * 100) : 0,
        };
      })
      .sort((a, b) => b.count - a.count);

    const statusBreakdown = [
      { label: "Active", count: activeCount, bar: "bg-emerald-500" },
      { label: "New", count: newCount, bar: "bg-blue-500" },
      { label: "Inactive", count: inactiveCount, bar: "bg-neutral-300" },
    ];

    const topSpenders = [...rows]
      .sort((a, b) => b.spentNum - a.spentNum)
      .slice(0, 5);

    return {
      total,
      activeCount,
      newCount,
      inactiveCount,
      revenue,
      totalBookings,
      avgRating,
      avgBookings,
      avgSpend,
      repeatRate,
      cityBreakdown,
      statusBreakdown,
      topSpenders,
    };
  }, [filtered]);

  const activeSortLabel =
    sortOptions.find((option) => option.id === sortKey)?.label ?? "Sort";

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs + sort/filter toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex gap-1 overflow-x-auto no-scrollbar bg-white border border-neutral-200/70 rounded-2xl p-1.5 shadow-sm w-full lg:w-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-bold whitespace-nowrap shrink-0 transition ${isActive ? "bg-[#FF6B35] text-white shadow-md shadow-orange-500/25" : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800"}`}
              >
                {tab.label}
                <span
                  className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {activeTab !== "stats" && (
            <>
              <div className="relative" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setSortOpen((open) => !open)}
                  aria-expanded={sortOpen}
                  aria-haspopup="listbox"
                  className={`h-10 px-4 rounded-full border text-[13px] font-bold flex items-center gap-1.5 transition whitespace-nowrap ${sortOpen ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortKey !== "recent" ? activeSortLabel : "Sort"}
                </button>
                {sortOpen && (
                  <div
                    role="listbox"
                    aria-label="Sort customers"
                    className="absolute right-0 z-30 mt-2 w-56 rounded-2xl border border-neutral-200/70 bg-white p-1.5 shadow-lg shadow-neutral-900/10"
                  >
                    {sortOptions.map((option) => {
                      const isSelected = sortKey === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSortKey(option.id);
                            setSortOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-3 h-9 rounded-xl text-[13px] font-semibold text-left transition ${isSelected ? "bg-orange-50 text-[#FF6B35]" : "text-neutral-700 hover:bg-neutral-50"}`}
                        >
                          {option.label}
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={exportCsv}
                disabled={visible.length === 0}
                className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                {checked.length > 0 ? `Export ${checked.length}` : "Export"}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() =>
              setActiveTab(activeTab === "stats" ? "all" : "stats")
            }
            aria-pressed={activeTab === "stats"}
            className={`h-10 px-4 rounded-full border text-[13px] font-bold flex items-center gap-1.5 transition whitespace-nowrap ${activeTab === "stats" ? "border-orange-100 bg-orange-50 text-[#FF6B35]" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}
          >
            <BarChart3 className="w-4 h-4" />
            Stats
          </button>
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            aria-expanded={filterOpen}
            className={`h-10 px-4 rounded-full border text-[13px] font-bold flex items-center gap-1.5 transition whitespace-nowrap ${filterOpen || hasActiveFilter ? "border-orange-100 bg-orange-50 text-[#FF6B35]" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Expandable filter panel */}
      {filterOpen && (
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
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Filter by city"
                className="h-11 appearance-none rounded-full border border-neutral-200 bg-white pl-10 pr-9 text-[13px] font-bold text-neutral-700 outline-none focus:border-[#FF6B35] transition cursor-pointer"
              >
                {cityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            </div>
            <div className="relative">
              <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filter by status"
                className="h-11 appearance-none rounded-full border border-neutral-200 bg-white pl-10 pr-9 text-[13px] font-bold text-neutral-700 outline-none focus:border-[#FF6B35] transition cursor-pointer"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            </div>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearFilters}
                className="h-11 px-4 rounded-full border border-orange-100 bg-orange-50 text-[13px] font-bold text-[#FF6B35] hover:bg-orange-100 transition flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === "stats" ? (
        <StatsView summary={statsSummary} />
      ) : (
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm ">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-white border-b border-neutral-100 bg-[#FF6B35]">
                  <th className="px-5 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={toggleAll}
                      aria-label="Select all customers"
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3.5 font-bold">Customer</th>
                  <th className="px-4 py-3.5 font-bold">Contact / Area</th>
                  <th className="px-4 py-3.5 font-bold text-center">
                    Bookings
                  </th>
                  <th className="px-4 py-3.5 font-bold text-center">Rating</th>
                  <th className="px-4 py-3.5 font-bold">Status</th>
                  <th className="px-5 py-3.5 font-bold text-right">
                    Total Spent
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((c) => {
                  const isSelected = checked.includes(c.id);
                  return (
                    <tr
                      key={c.id}
                      className={`border-b border-neutral-100 last:border-0 transition cursor-pointer ${isSelected ? "bg-orange-50/60" : "hover:bg-neutral-50/70"}`}
                    >
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(c.id)}
                          aria-label={`Select customer ${c.name}`}
                          className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.img}
                            alt={c.name}
                            className="w-10 h-10 rounded-full object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-neutral-900 flex items-center gap-1 truncate">
                              {c.name}
                              {c.tier === "VIP" && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-orange-50 text-[#FF6B35] border border-orange-100 shrink-0">
                                  VIP
                                </span>
                              )}
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
                  );
                })}
                {visible.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                    >
                      No customers found. Try another search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 text-[13px] font-medium text-neutral-500">
            <span>
              Showing {visible.length} of 48,214 customers
              {checked.length > 0 && (
                <>
                  {" - "}
                  <span className="font-extrabold text-[#FF6B35]">
                    {checked.length} selected
                  </span>
                </>
              )}
            </span>
            <div className="flex items-center gap-2">
              {checked.length > 0 && (
                <button
                  type="button"
                  onClick={() => setChecked([])}
                  className="text-[11px] font-bold text-[#FF6B35] hover:underline"
                >
                  Clear selection
                </button>
              )}
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
      )}
    </div>
  );
};

export default CustomerPage;
