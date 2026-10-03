"use client";

import React, { useMemo, useState } from "react";
import {
  Activity,
  CalendarDays,
  ChevronDown,
  Clock3,
  Download,
  Eye,
  FileBarChart,
  FileSpreadsheet,
  HardDrive,
  Mail,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

type ReportCategory =
  | "All Categories"
  | "Dashboard Summary"
  | "Revenue Report"
  | "Booking Report"
  | "Customer Report"
  | "Provider Report"
  | "Payment Report"
  | "Wallet Report"
  | "Payout Report"
  | "Commission Report"
  | "Complaint Report"
  | "Review Report"
  | "Marketing Report"
  | "AI Analytics Report";

type ReportStatus = "Ready" | "Processing" | "Scheduled";

type Report = {
  id: string;
  category: Exclude<ReportCategory, "All Categories">;
  title: string;
  period: string;
  size: string;
  updated: string;
  status: ReportStatus;
};

type StatusFilter = "All Statuses" | ReportStatus;

type SelectProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon: React.ElementType;
  className?: string;
};

const categories: ReportCategory[] = [
  "All Categories",
  "Dashboard Summary",
  "Revenue Report",
  "Booking Report",
  "Customer Report",
  "Provider Report",
  "Payment Report",
  "Wallet Report",
  "Payout Report",
  "Commission Report",
  "Complaint Report",
  "Review Report",
  "Marketing Report",
  "AI Analytics Report",
];

const dateRanges = [
  "This Month (July 2026)",
  "Last Month (June 2026)",
  "This Quarter (Q2 2026)",
  "This Year (2026)",
  "2026 YTD",
];

const districts = [
  "All Cities (Nepal)",
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Chitwan",
];

const statusOptions: StatusFilter[] = [
  "All Statuses",
  "Ready",
  "Processing",
  "Scheduled",
];

const reports: Report[] = [
  {
    id: "REP-001",
    category: "Revenue Report",
    title: "Monthly Gross Revenue & VAT 13% Tax Statement",
    period: "July 2026",
    size: "2.4 MB",
    updated: "2 minutes ago",
    status: "Ready",
  },
  {
    id: "REP-002",
    category: "Payout Report",
    title: "Provider Earnings & eSewa/Khalti Disbursement Audit",
    period: "July 2026",
    size: "1.8 MB",
    updated: "18 minutes ago",
    status: "Ready",
  },
  {
    id: "REP-003",
    category: "Booking Report",
    title: "Kathmandu & Pokhara District Demand & Completion Rate",
    period: "Q2 2026",
    size: "3.1 MB",
    updated: "1 hour ago",
    status: "Ready",
  },
  {
    id: "REP-004",
    category: "Commission Report",
    title: "Platform 15% Commission & Holiday Surge Performance",
    period: "July 2026",
    size: "940 KB",
    updated: "Yesterday",
    status: "Ready",
  },
  {
    id: "REP-005",
    category: "Customer Report",
    title: "Customer Retention & Loyalty Rating Audit",
    period: "2026 YTD",
    size: "1.2 MB",
    updated: "2 days ago",
    status: "Ready",
  },
  {
    id: "REP-006",
    category: "Provider Report",
    title: "Provider KYC Verification & Service Quality Scorecard",
    period: "July 2026",
    size: "1.5 MB",
    updated: "3 days ago",
    status: "Processing",
  },
  {
    id: "REP-007",
    category: "AI Analytics Report",
    title: "Demand Forecast & Smart Pricing Intelligence Digest",
    period: "Q3 2026",
    size: "2.0 MB",
    updated: "Scheduled for Aug 05",
    status: "Scheduled",
  },
];

const SelectControl = ({
  value,
  options,
  onChange,
  icon: Icon,
  className = "",
}: SelectProps) => {
  return (
    <div className={`relative ${className}`}>
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-neutral-200 bg-white pl-11 pr-10 text-sm font-semibold text-neutral-700 outline-none transition focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
    </div>
  );
};

const CategoryBadge = ({ category }: { category: Report["category"] }) => {
  return (
    <span className="inline-flex max-w-full items-center rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-bold leading-4 text-white">
      {category}
    </span>
  );
};

const statusStyles: Record<ReportStatus, string> = {
  Ready: "border-emerald-100 bg-emerald-50 text-emerald-700",
  Processing: "border-amber-100 bg-amber-50 text-amber-700",
  Scheduled: "border-sky-100 bg-sky-50 text-sky-700",
};

const statusDots: Record<ReportStatus, string> = {
  Ready: "bg-emerald-500",
  Processing: "bg-amber-500",
  Scheduled: "bg-sky-500",
};

const StatusBadge = ({ status }: { status: ReportStatus }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold leading-4 ${statusStyles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDots[status]}`} />
      {status}
    </span>
  );
};

const FilterChip = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6B35]/20 bg-orange-50 py-1 pl-3 pr-1.5 text-xs font-bold text-[#FF6B35]">
      {label}

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="flex h-4 w-4 items-center justify-center rounded-full text-[#FF6B35]/70 transition hover:bg-[#FF6B35]/15 hover:text-[#FF6B35]"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
};

const ReportRow = ({ report }: { report: Report }) => {
  const handleView = () => {
    console.log(`Viewing ${report.id}`);
  };

  const handleDownload = (format: "PDF" | "CSV") => {
    console.log(`Downloading ${report.id} as ${format}`);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition duration-200 hover:-translate-y-[2px] hover:border-[#FF6B35]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] sm:p-5">
      {/* Hover accent bar */}
      <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF6B35] to-orange-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
        {/* Document Icon */}
        <div className="flex shrink-0 items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 transition group-hover:border-[#FF6B35]/30">
            <FileBarChart className="h-6 w-6 text-[#FF6B35]" strokeWidth={2} />
          </div>
        </div>

        {/* Report Metadata */}
        <div className="min-w-0 flex-1">
          {/* Category + ID + Status */}
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={report.category} />

            <span className="text-xs font-bold tracking-wide text-neutral-400">
              {report.id}
            </span>

            <StatusBadge status={report.status} />
          </div>

          {/* Title */}
          <h2 className="mt-2 break-words text-base font-bold leading-6 text-neutral-900 sm:text-[17px]">
            {report.title}
          </h2>

          {/* Details */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-neutral-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-neutral-400" />
              {report.period}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5 text-neutral-400" />
              {report.size}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-neutral-400" />
              {report.updated}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleView}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#FF6B35] px-4 text-sm font-bold text-white shadow-sm shadow-orange-500/20 transition hover:bg-[#f45d26] active:scale-[0.98]"
          >
            <Eye className="h-4 w-4" />
            <span>View Report</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload("PDF")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 text-sm font-bold text-neutral-700 transition hover:border-[#FF6B35]/40 hover:bg-orange-50 hover:text-[#FF6B35]"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload("CSV")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-3.5 text-sm font-bold text-neutral-700 transition hover:border-[#FF6B35]/40 hover:bg-orange-50 hover:text-[#FF6B35]"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>
    </article>
  );
};

const EnterpriseReportsPage = () => {
  const [activeCategory, setActiveCategory] =
    useState<ReportCategory>("All Categories");

  const [dateRange, setDateRange] = useState<string>("This Month (July 2026)");

  const [district, setDistrict] = useState<string>("All Cities (Nepal)");

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All Statuses");

  const categoryCounts = useMemo(() => {
    const counts = new Map<ReportCategory, number>();
    counts.set("All Categories", reports.length);

    reports.forEach((report) => {
      counts.set(report.category, (counts.get(report.category) ?? 0) + 1);
    });

    return counts;
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Reports Available",
        value: String(reports.length),
        hint: "Across 13 enterprise categories",
        icon: FileBarChart,
        accent: "border-orange-100 bg-orange-50 text-[#FF6B35]",
      },
      {
        label: "Ready to Export",
        value: String(
          reports.filter((report) => report.status === "Ready").length,
        ),
        hint: "PDF & CSV generated",
        icon: Sparkles,
        accent: "border-emerald-100 bg-emerald-50 text-emerald-600",
      },
      {
        label: "Scheduled Deliveries",
        value: String(
          reports.filter((report) => report.status === "Scheduled").length,
        ),
        hint: "Automated email dispatch",
        icon: Mail,
        accent: "border-sky-100 bg-sky-50 text-sky-600",
      },
      {
        label: "Storage Used",
        value: "12.9 MB",
        hint: "Of 5 GB report vault",
        icon: HardDrive,
        accent: "border-violet-100 bg-violet-50 text-violet-600",
      },
    ],
    [],
  );

  const filteredReports = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesCategory =
        activeCategory === "All Categories" ||
        report.category === activeCategory;

      const matchesStatus =
        statusFilter === "All Statuses" || report.status === statusFilter;

      const matchesQuery =
        query.length === 0 ||
        report.title.toLowerCase().includes(query) ||
        report.category.toLowerCase().includes(query) ||
        report.id.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [activeCategory, searchQuery, statusFilter]);

  const activeFilterCount =
    (activeCategory !== "All Categories" ? 1 : 0) +
    (statusFilter !== "All Statuses" ? 1 : 0) +
    (searchQuery.trim().length > 0 ? 1 : 0);

  const resetFilters = () => {
    setActiveCategory("All Categories");
    setStatusFilter("All Statuses");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen   ">
      <div className="mx-auto max-w-[1440px]">
        {/* =========================================
            HEADER
        ========================================== */}
        <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[27px] font-bold leading-tight tracking-[-0.025em] text-neutral-900 sm:text-[30px]">
                Enterprise Financial & Operational Reports
              </h1>

              <span className="inline-flex shrink-0 items-center rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white">
                VAT 13% Ready
              </span>
            </div>

            <p className="mt-2 max-w-3xl text-[16px] leading-7 text-neutral-500 sm:text-[17px]">
              Generate, inspect, print, and export official PDF/CSV financial
              statements and district GIS analytics.
            </p>
          </div>

          {/* Schedule Button */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsScheduleOpen((previous) => !previous)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 text-sm font-bold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              <Mail className="h-4 w-4" />
              <span>Schedule Email Report</span>
            </button>

            {isScheduleOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[280px] rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
                <p className="text-sm font-bold text-neutral-900">
                  Schedule Email Report
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  Configure automated delivery for selected financial and
                  operational reports.
                </p>

                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="mt-4 w-full rounded-lg bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#f45d26]"
                >
                  Configure Schedule
                </button>
              </div>
            )}
          </div>
        </header>

        {/* =========================================
            SUMMARY STATS
        ========================================== */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    {stat.label}
                  </p>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${stat.accent}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-3 text-2xl font-extrabold tracking-tight text-neutral-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs font-medium text-neutral-500">
                  {stat.hint}
                </p>
              </div>
            );
          })}
        </section>

        {/* =========================================
            FILTER PANEL
        ========================================== */}
        <section className="mt-6 rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
          {/* Panel header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50">
                <SlidersHorizontal className="h-4 w-4 text-[#FF6B35]" />
              </span>

              <div>
                <h2 className="text-sm font-bold text-neutral-900">Filters</h2>

                <p className="text-xs font-medium text-neutral-500">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} active ${
                        activeFilterCount === 1 ? "filter" : "filters"
                      }`
                    : "Refine reports by category, status, city and date"}{" "}
                  • {filteredReports.length}{" "}
                  {filteredReports.length === 1 ? "result" : "results"}
                </p>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3.5 text-xs font-bold text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset all
              </button>
            )}
          </div>

          {/* Search + selects */}
          <div className="mt-4 space-y-3">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title, ID or category..."
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 text-sm font-semibold text-neutral-700 outline-none transition placeholder:font-medium placeholder:text-neutral-400 focus:border-[#FF6B35] focus:ring-4 focus:ring-[#FF6B35]/10"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <SelectControl
                value={statusFilter}
                options={statusOptions}
                onChange={(value) => setStatusFilter(value as StatusFilter)}
                icon={Activity}
                className="w-full"
              />

              <SelectControl
                value={dateRange}
                options={dateRanges}
                onChange={setDateRange}
                icon={CalendarDays}
                className="w-full"
              />

              <SelectControl
                value={district}
                options={districts}
                onChange={setDistrict}
                icon={MapPin}
                className="w-full"
              />
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-4 border-t border-neutral-100 pt-4">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Category
            </p>

            <div className="flex flex-wrap gap-2.5">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                const count = categoryCounts.get(category) ?? 0;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "border-[#FF6B35] bg-[#FF6B35] text-white shadow-sm"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-[#FF6B35]/40 hover:bg-orange-50 hover:text-[#FF6B35]"
                    }`}
                  >
                    <span>{category}</span>

                    <span
                      className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Active
              </span>

              {activeCategory !== "All Categories" && (
                <FilterChip
                  label={activeCategory}
                  onRemove={() => setActiveCategory("All Categories")}
                />
              )}

              {statusFilter !== "All Statuses" && (
                <FilterChip
                  label={statusFilter}
                  onRemove={() => setStatusFilter("All Statuses")}
                />
              )}

              {searchQuery.trim().length > 0 && (
                <FilterChip
                  label={`"${searchQuery.trim()}"`}
                  onRemove={() => setSearchQuery("")}
                />
              )}
            </div>
          )}
        </section>

        {/* =========================================
            REPORT LIST
        ========================================== */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Available Reports
              </h2>

              <p className="mt-0.5 text-sm text-neutral-500">
                {filteredReports.length}{" "}
                {filteredReports.length === 1 ? "report" : "reports"} available
              </p>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-bold text-[#FF6B35] hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="space-y-4">
            {filteredReports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                <FileBarChart className="h-6 w-6 text-[#FF6B35]" />
              </div>

              <h3 className="mt-4 text-base font-bold text-neutral-900">
                No reports found
              </h3>

              <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
                No reports match your current filters. Try adjusting the
                category, status or search filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-[#FF6B35] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#f45d26]"
              >
                View All Reports
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default EnterpriseReportsPage;
