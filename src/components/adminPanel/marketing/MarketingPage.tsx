import React, { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  FileText,
  Filter,
  LayoutDashboard,
  LayoutTemplate,
  Mail,
  Megaphone,
  MousePointerClick,
  Send,
  Server,
  ShieldCheck,
  Target,
  TrendingUp,
  TriangleAlert,
  UserCheck,
  UserMinus,
  Users,
  Zap,
} from "lucide-react";
import { BarChart3 as ChartColumn } from "lucide-react";

type MarketingTab =
  | "Newsletter Dashboard"
  | "Email Campaigns"
  | "Email Templates"
  | "Subscriber Lists"
  | "Audience Segments"
  | "Campaign Analytics"
  | "Email Queue"
  | "Unsubscribe Management"
  | "SMTP Config";

type NavTab = { id: MarketingTab; label: string; icon: React.ElementType };

type Metric = {
  label: string;
  value: string;
  hint: string;
  icon: React.ElementType;
  accent: string;
};

type ActivitySeries = {
  days: string[];
  sent: number[];
  opened: number[];
  clicked: number[];
};

type GrowthSeries = { months: string[]; total: number[]; active: number[] };
type TrendSeries = { months: string[]; values: number[] };
type DeviceSlice = { label: string; value: number; color: string };
type CampaignBar = { name: string; open: number; click: number };
// test
const navTabs: NavTab[] = [
  {
    id: "Newsletter Dashboard",
    label: "Newsletter Dashboard",
    icon: LayoutDashboard,
  },
  { id: "Email Campaigns", label: "Email Campaigns", icon: Send },
  { id: "Email Templates", label: "Email Templates", icon: LayoutTemplate },
  { id: "Subscriber Lists", label: "Subscriber Lists", icon: Users },
  { id: "Audience Segments", label: "Audience Segments", icon: Filter },
  { id: "Campaign Analytics", label: "Campaign Analytics", icon: ChartColumn },
  { id: "Email Queue", label: "Email Queue", icon: Mail },
  {
    id: "Unsubscribe Management",
    label: "Unsubscribe Management",
    icon: UserMinus,
  },
  { id: "SMTP Config", label: "SMTP Config", icon: Server },
];

const primaryMetrics: Metric[] = [
  {
    label: "Total Subscribers",
    value: "38,560",
    hint: "+12.4% last mo",
    icon: Users,
    accent: "border-orange-100 bg-orange-50 text-[#FF6B35]",
  },
  {
    label: "Active Subscribers",
    value: "35,475",
    hint: "93.5% delivery valid",
    icon: UserCheck,
    accent: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  {
    label: "Unsubscribed Users",
    value: "96",
    hint: "0.24% opt-out rate",
    icon: UserMinus,
    accent: "border-red-100 bg-red-50 text-red-600",
  },
  {
    label: "Emails Sent Today",
    value: "18,450",
    hint: "SMTP SendGrid 100%",
    icon: Send,
    accent: "border-sky-100 bg-sky-50 text-sky-600",
  },
  {
    label: "Scheduled Campaigns",
    value: "1",
    hint: "Next run at 10:00 AM",
    icon: CalendarDays,
    accent: "border-amber-100 bg-amber-50 text-amber-600",
  },
  {
    label: "Draft Campaigns",
    value: "1",
    hint: "In creation pipeline",
    icon: FileText,
    accent: "border-violet-100 bg-violet-50 text-violet-600",
  },
];

const performanceMetrics: Metric[] = [
  {
    label: "Avg Open Rate",
    value: "48.2%",
    hint: "+3.1% benchmark",
    icon: Mail,
    accent: "border-orange-100 bg-orange-50 text-[#FF6B35]",
  },
  {
    label: "Avg Click Rate (CTR)",
    value: "18.5%",
    hint: "High intent clicks",
    icon: MousePointerClick,
    accent: "border-sky-100 bg-sky-50 text-sky-600",
  },
  {
    label: "Bounce Rate",
    value: "1.3%",
    hint: "Below 2.0% threshold",
    icon: TriangleAlert,
    accent: "border-amber-100 bg-amber-50 text-amber-600",
  },
  {
    label: "Failed Queue Emails",
    value: "28",
    hint: "Auto-retrying SMTP",
    icon: Target,
    accent: "border-red-100 bg-red-50 text-red-600",
  },
  {
    label: "Spam Complaints",
    value: "15",
    hint: "0.003% ultra low",
    icon: ShieldCheck,
    accent: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  {
    label: "Conversion Rate",
    value: "5.8%",
    hint: "NPR 1.85M generated",
    icon: TrendingUp,
    accent: "border-violet-100 bg-violet-50 text-violet-600",
  },
];

const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;

const activitySeries: ActivitySeries = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  sent: [18400, 21200, 16800, 24600, 22100, 15200, 12900],
  opened: [8600, 10400, 7900, 12100, 10800, 7100, 5900],
  clicked: [3200, 3900, 2800, 4600, 4100, 2400, 1900],
};

const growthSeries: GrowthSeries = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  total: [28100, 29600, 31200, 32800, 34900, 36700, 38560],
  active: [25800, 27300, 28900, 30400, 32100, 33900, 35475],
};

const openRateSeries: TrendSeries = {
  months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  values: [42.1, 44.6, 43.2, 46.8, 47.5, 48.2],
};

const deviceSlices: DeviceSlice[] = [
  { label: "Desktop Web", value: 52, color: "#FF6B35" },
  { label: "Mobile App/Web", value: 39, color: "#10b981" },
  { label: "Tablet/iPad", value: 9, color: "#0ea5e9" },
];

const campaignEngagement: CampaignBar[] = [
  { name: "Dashain/Mega Festi...", open: 62, click: 27 },
  { name: "Service Provider I...", open: 55, click: 21 },
  { name: "Nepal New Year Offer", open: 48, click: 18 },
  { name: "Loyalty Cashback...", open: 41, click: 14 },
  { name: "Winter AC Service...", open: 37, click: 12 },
];

const activityMax = Math.max(
  ...activitySeries.sent,
  ...activitySeries.opened,
  ...activitySeries.clicked,
);
const growthMax = Math.max(...growthSeries.total, ...growthSeries.active);
const openRateMax = Math.max(...openRateSeries.values) * 1.1;
const campaignMaxOpen = Math.max(...campaignEngagement.map((bar) => bar.open));

const DEVICE_RADIUS = 70;
const DEVICE_CIRCUMFERENCE = 2 * Math.PI * DEVICE_RADIUS;

type DonutSegment = {
  label: string;
  value: number;
  color: string;
  dash: string;
  rotation: number;
};

const deviceSegments: DonutSegment[] = (() => {
  let offset = 0;
  return deviceSlices.map((slice) => {
    const length = (slice.value / 100) * DEVICE_CIRCUMFERENCE;
    const rotation = (offset / DEVICE_CIRCUMFERENCE) * 360 - 90;
    offset += length;
    return {
      label: slice.label,
      value: slice.value,
      color: slice.color,
      dash: `${length} ${DEVICE_CIRCUMFERENCE - length}`,
      rotation,
    };
  });
})();

const buildLinePath = (
  values: number[],
  width: number,
  height: number,
  maxValue: number,
): string => {
  const stepX = values.length > 1 ? width / (values.length - 1) : 0;
  return values
    .map((value, index) => {
      const x = index * stepX;
      const y = height - (value / maxValue) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

const buildAreaPath = (
  values: number[],
  width: number,
  height: number,
  maxValue: number,
): string =>
  `${buildLinePath(values, width, height, maxValue)} L${width},${height} L0,${height} Z`;

/**
 * Adds `reveal-active` to its wrapper the first time it scrolls into view,
 * which is what triggers the chart CSS animations.
 */
const Reveal = ({
  children,
  className = "",
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActive(true);
          observer.disconnect();
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${active ? "reveal-active" : ""} ${className}`}>
      {children}
    </div>
  );
};

/** Counts from 0 up to `value` once scrolled into view. */
const CountUp = ({
  value,
  duration = 1400,
  decimals = 0,
}: {
  value: number;
  duration?: number;
  decimals?: number;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo for a fast start that settles smoothly
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played.current) return;
          played.current = true;
          run();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    // If the node is already on screen the observer callback can be missed
    // in some browsers, so guarantee the animation still runs.
    const fallback = window.setTimeout(() => {
      if (played.current) return;
      played.current = true;
      run();
    }, 120);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
};

const MetricCard = ({
  metric,
  index = 0,
}: {
  metric: Metric;
  index?: number;
}) => {
  const Icon = metric.icon;
  return (
    <div
      className="animate-rise-in rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
          {metric.label}
        </p>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${metric.accent}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 text-xl font-semibold  tracking-tight text-neutral-900">
        {metric.value}
      </div>
      <div className="mt-0.5 text-[11px] font-semibold text-neutral-500">
        {metric.hint}
      </div>
    </div>
  );
};

const ChartCard = ({
  title,
  subtitle,
  headerRight,
  children,
  index = 0,
}: {
  title: string;
  subtitle: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  index?: number;
}) => (
  <section
    className="animate-rise-in rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm transition duration-300 hover:shadow-md"
    style={{ animationDelay: `${index * 90}ms` }}
  >
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-sm font-bold text-neutral-900">{title}</h3>
        <p className="mt-0.5 text-xs font-medium text-neutral-500">
          {subtitle}
        </p>
      </div>
      {headerRight}
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

const BulkNewsletterStudioPage = () => {
  const [activeTab, setActiveTab] = useState<MarketingTab>(
    "Newsletter Dashboard",
  );
  const ActiveTabIcon =
    navTabs.find((tab) => tab.id === activeTab)?.icon ?? LayoutDashboard;

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold  tracking-tight text-neutral-900 lg:text-[27px]">
            Bulk Newsletter &amp; Email Campaign Studio
          </h1>
          <span className="inline-flex shrink-0 items-center rounded-full bg-orange-700 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
            BOLAO Marketing Engine
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-500">
          Enterprise newsletter management, segmented audience dispatch,
          TipTap/HTML email template design, and deliverability analytics.
        </p>
      </div>

      {/* Sub-navigation tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-neutral-200/70 bg-white p-2 shadow-sm">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex h-10 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-bold transition ${
                active
                  ? "bg-[#FF6B35] text-white shadow shadow-orange-500/30"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "Newsletter Dashboard" ? (
        // key forces a full remount on every tab switch so the chart
        // animations replay instead of reusing already-animated DOM nodes.
        <div key={activeTab} className="flex flex-col gap-5">
          {/* Action banner */}
          <section className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50">
                  <Megaphone className="h-6 w-6 text-[#FF6B35]" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-extrabold tracking-tight text-neutral-900">
                      Enterprise Email Marketing Engine
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Real-Time Dispatch
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-2xl text-[13px] font-medium text-neutral-500">
                    High-deliverability newsletter dispatch system for Nepal
                    Customers, Service Providers &amp; Internal Staff.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-bold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <Server className="h-4 w-4" />
                  Flush SMTP Queue
                </button>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 text-sm font-bold text-white shadow-sm shadow-orange-500/25 transition hover:bg-[#f45d26] active:scale-[0.98]"
                >
                  <Zap className="h-4 w-4" />+ New Campaign
                </button>
              </div>
            </div>
          </section>

          {/* Primary metrics */}
          <Reveal
            className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
            threshold={0.05}
          >
            {primaryMetrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </Reveal>

          {/* Performance metrics */}
          <Reveal
            className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6"
            threshold={0.05}
          >
            {performanceMetrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                index={index + primaryMetrics.length}
              />
            ))}
          </Reveal>

          {/* Main analytics */}
          <Reveal className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
            {/* Daily Email Activity Breakdown */}
            <ChartCard
              title="Daily Email Activity Breakdown"
              subtitle="Sent, Delivered, Opened, and Clicked volumes"
              index={0}
              headerRight={
                <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-bold text-[#FF6B35]">
                  <TrendingUp className="h-3.5 w-3.5" />7 Days Trend
                </span>
              }
            >
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="h-56 w-full"
              >
                <defs>
                  <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="openedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="clickedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4].map((line) => (
                  <line
                    key={line}
                    x1={0}
                    x2={CHART_WIDTH}
                    y1={(CHART_HEIGHT / 4) * line}
                    y2={(CHART_HEIGHT / 4) * line}
                    stroke="#f1f1f1"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                <path
                  d={buildAreaPath(
                    activitySeries.sent,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-area"
                  style={{ animationDelay: "450ms" }}
                  fill="url(#sentGradient)"
                />
                <path
                  d={buildLinePath(
                    activitySeries.sent,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "0ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={buildAreaPath(
                    activitySeries.opened,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-area"
                  style={{ animationDelay: "650ms" }}
                  fill="url(#openedGradient)"
                />
                <path
                  d={buildLinePath(
                    activitySeries.opened,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "200ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={buildAreaPath(
                    activitySeries.clicked,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-area"
                  style={{ animationDelay: "850ms" }}
                  fill="url(#clickedGradient)"
                />
                <path
                  d={buildLinePath(
                    activitySeries.clicked,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    activityMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "400ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="mt-2 flex justify-between px-1 text-[10px] font-semibold text-neutral-400">
                {activitySeries.days.map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-3">
                {[
                  { label: "Sent", color: "#FF6B35" },
                  { label: "Opened", color: "#10b981" },
                  { label: "Clicked", color: "#0ea5e9" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </span>
                ))}
              </div>
            </ChartCard>

            {/* Subscriber Growth */}
            <ChartCard
              title="Subscriber Growth"
              subtitle="Total vs Active subscribers over time"
              index={1}
              headerRight={
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +14.2% YoY
                </span>
              }
            >
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="h-56 w-full"
              >
                <defs>
                  <linearGradient
                    id="growthGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4].map((line) => (
                  <line
                    key={line}
                    x1={0}
                    x2={CHART_WIDTH}
                    y1={(CHART_HEIGHT / 4) * line}
                    y2={(CHART_HEIGHT / 4) * line}
                    stroke="#f1f1f1"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                <path
                  d={buildAreaPath(
                    growthSeries.total,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    growthMax,
                  )}
                  className="chart-area"
                  style={{ animationDelay: "400ms" }}
                  fill="url(#growthGradient)"
                />
                <path
                  d={buildLinePath(
                    growthSeries.total,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    growthMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "0ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={buildLinePath(
                    growthSeries.active,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    growthMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "250ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="mt-2 flex justify-between px-1 text-[10px] font-semibold text-neutral-400">
                {growthSeries.months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B35]" />
                  Total Subscribers
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Active Subscribers
                </span>
              </div>
            </ChartCard>
          </Reveal>

          {/* Bottom analytics */}
          <Reveal
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
            threshold={0.1}
          >
            {/* Open Rate Trend */}
            <ChartCard
              title="Open Rate Trend %"
              subtitle="6-Month historical performance"
              index={2}
            >
              <svg
                viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                preserveAspectRatio="none"
                className="h-48 w-full"
              >
                <defs>
                  <linearGradient
                    id="openRateGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {[0, 1, 2, 3, 4].map((line) => (
                  <line
                    key={line}
                    x1={0}
                    x2={CHART_WIDTH}
                    y1={(CHART_HEIGHT / 4) * line}
                    y2={(CHART_HEIGHT / 4) * line}
                    stroke="#f1f1f1"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                <path
                  d={buildAreaPath(
                    openRateSeries.values,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    openRateMax,
                  )}
                  className="chart-area"
                  style={{ animationDelay: "400ms" }}
                  fill="url(#openRateGradient)"
                />
                <path
                  d={buildLinePath(
                    openRateSeries.values,
                    CHART_WIDTH,
                    CHART_HEIGHT,
                    openRateMax,
                  )}
                  className="chart-line"
                  style={{ animationDelay: "0ms" }}
                  pathLength={1}
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {openRateSeries.values.map((value, index) => {
                  const stepX =
                    CHART_WIDTH / (openRateSeries.values.length - 1);
                  const x = index * stepX;
                  const y = CHART_HEIGHT - (value / openRateMax) * CHART_HEIGHT;
                  return (
                    <circle
                      key={value}
                      cx={x}
                      cy={y}
                      r={3}
                      className="chart-dot"
                      style={{ animationDelay: `${600 + index * 130}ms` }}
                      fill="#ffffff"
                      stroke="#FF6B35"
                      strokeWidth={2}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              <div className="mt-2 flex justify-between px-1 text-[10px] font-semibold text-neutral-400">
                {openRateSeries.months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </ChartCard>

            {/* Device Client Analytics */}
            <ChartCard
              title="Device Client Analytics"
              subtitle="Mobile app vs Desktop vs Tablet readers"
              index={3}
            >
              <div className="relative mx-auto h-44 w-44">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  <circle
                    cx="100"
                    cy="100"
                    r={DEVICE_RADIUS}
                    fill="none"
                    stroke="#f4f4f5"
                    strokeWidth="22"
                  />
                  {deviceSegments.map((segment, index) => (
                    <circle
                      key={segment.label}
                      cx="100"
                      cy="100"
                      r={DEVICE_RADIUS}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="22"
                      strokeDasharray={segment.dash}
                      className="donut-seg"
                      style={
                        {
                          "--donut-c": `${DEVICE_CIRCUMFERENCE}px`,
                          animationDelay: `${index * 220}ms`,
                        } as React.CSSProperties
                      }
                      transform={`rotate(${segment.rotation} 100 100)`}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold tracking-tight text-neutral-900">
                    <CountUp value={38.5} decimals={1} />k
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Readers
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {deviceSegments.map((segment) => (
                  <div
                    key={segment.label}
                    className="flex items-center justify-between gap-2 text-[12px]"
                  >
                    <span className="flex items-center gap-2 font-semibold text-neutral-600">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                      {segment.label}
                    </span>
                    <span className="font-extrabold text-neutral-900">
                      {segment.value}%
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Device Client Analytics */}
          </Reveal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50">
            <ActiveTabIcon className="h-6 w-6 text-[#FF6B35]" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-neutral-900">
            {activeTab}
          </h2>
          <p className="mt-1 max-w-md text-sm text-neutral-500">
            This workspace is being finalised. Live dispatch, template editing
            and deliverability analytics for {activeTab} will appear here.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab("Newsletter Dashboard")}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#f45d26]"
          >
            Back to Newsletter Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkNewsletterStudioPage;
