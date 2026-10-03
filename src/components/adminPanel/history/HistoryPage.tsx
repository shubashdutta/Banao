import React, { useMemo, useState } from "react";
import { ChevronDown, Download, Eye, Search, ShieldCheck, X } from "lucide-react";

type AuditSeverity = "Info" | "Warning" | "Critical";
type AuditModule =
  | "PAYOUTS"
  | "PRICING"
  | "PROVIDER VERIFICATION"
  | "SETTINGS"
  | "CATEGORIES";

type AuditLog = {
  id: string;
  timestamp: string;
  admin: string;
  role: string;
  action: string;
  description: string;
  module: AuditModule;
  ip: string;
  severity: AuditSeverity;
};

type SeverityFilter = "All Severities" | AuditSeverity;
type ModuleFilter = "All Modules" | AuditModule;

type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon: React.ElementType;
  className?: string;
};

const severityStyle: Record<AuditSeverity, string> = {
  Info: "bg-sky-50 text-sky-700 border-sky-100",
  Warning: "bg-amber-50 text-amber-700 border-amber-100",
  Critical: "bg-red-900 text-white border-red-900",
};

const severityDot: Record<AuditSeverity, string> = {
  Info: "bg-sky-500",
  Warning: "bg-amber-500",
  Critical: "bg-red-400",
};

const severityOptions: SeverityFilter[] = [
  "All Severities",
  "Info",
  "Warning",
  "Critical",
];

const moduleOptions: ModuleFilter[] = [
  "All Modules",
  "PAYOUTS",
  "PRICING",
  "PROVIDER VERIFICATION",
  "SETTINGS",
  "CATEGORIES",
];

const auditLogs: AuditLog[] = [
  {
    id: "AUD-9001",
    timestamp: "2026-07-28 10:30:15 AM",
    admin: "Ram Shrestha",
    role: "Super Admin",
    action: "APPROVE_PAYOUT",
    description:
      "Approved and transferred payout ID PAY-8801 amounting to NPR 38,250 via eSewa.",
    module: "PAYOUTS",
    ip: "27.34.64.12",
    severity: "Info",
  },
  {
    id: "AUD-9002",
    timestamp: "2026-07-28 09:15:42 AM",
    admin: "Sita Sharma",
    role: "Finance Manager",
    action: "UPDATE_COMMISSION_RATE",
    description:
      "Modified platform commission rate from 12% to 15% for plumbing category.",
    module: "PRICING",
    ip: "183.1.22.45",
    severity: "Warning",
  },
  {
    id: "AUD-9003",
    timestamp: "2026-07-27 04:20:10 PM",
    admin: "Bikash Tamang",
    role: "Operations Lead",
    action: "VERIFY_PROVIDER",
    description:
      "Manually verified provider PROV-204 after cross-checking citizenship and electrical license.",
    module: "PROVIDER VERIFICATION",
    ip: "202.78.65.18",
    severity: "Info",
  },
  {
    id: "AUD-9004",
    timestamp: "2026-07-27 02:11:55 PM",
    admin: "Ram Shrestha",
    role: "Super Admin",
    action: "FORCE_LOGOUT_ADMIN",
    description:
      "Terminated active session for compromised administrative credential ID ADM-09.",
    module: "SETTINGS",
    ip: "27.34.64.12",
    severity: "Critical",
  },
  {
    id: "AUD-9005",
    timestamp: "2026-07-26 11:05:30 AM",
    admin: "Anita Maharjan",
    role: "Content Moderator",
    action: "CREATE_CATEGORY",
    description:
      "Created new sub-category: Solar Panel Maintenance under Home Utilities.",
    module: "CATEGORIES",
    ip: "110.44.120.9",
    severity: "Info",
  },
  {
    id: "AUD-9006",
    timestamp: "2026-07-26 08:45:12 AM",
    admin: "Sita Sharma",
    role: "Finance Manager",
    action: "REJECT_PAYOUT",
    description:
      "Rejected payout ID PAY-8807. Reason: Insufficient completed job verifications.",
    module: "PAYOUTS",
    ip: "183.1.22.45",
    severity: "Warning",
  },
  {
    id: "AUD-9007",
    timestamp: "2026-07-25 05:50:00 PM",
    admin: "Ram Shrestha",
    role: "Super Admin",
    action: "UPDATE_SECURITY_POLICY",
    description:
      "Enforced strict 2FA requirement for all financial and moderator accounts.",
    module: "SETTINGS",
    ip: "27.34.64.12",
    severity: "Critical",
  },
  {
    id: "AUD-9008",
    timestamp: "2026-07-25 03:22:19 PM",
    admin: "Bikash Tamang",
    role: "Operations Lead",
    action: "SUSPEND_PROVIDER",
    description:
      "Suspended provider PROV-119 due to multiple customer safety complaints.",
    module: "PROVIDER VERIFICATION",
    ip: "202.78.65.18",
    severity: "Warning",
  },
  {
    id: "AUD-9009",
    timestamp: "2026-07-24 01:10:45 PM",
    admin: "Anita Maharjan",
    role: "Content Moderator",
    action: "UPDATE_PRICING_RULE",
    description:
      "Updated base surge multiplier for Kathmandu valley peak hours to 1.4x.",
    module: "PRICING",
    ip: "110.44.120.9",
    severity: "Info",
  },
  {
    id: "AUD-9010",
    timestamp: "2026-07-23 10:05:22 AM",
    admin: "Sita Sharma",
    role: "Finance Manager",
    action: "EXPORT_FINANCIAL_REPORT",
    description:
      "Exported quarterly fiscal audit ledger statement for tax compliance filing.",
    module: "PAYOUTS",
    ip: "183.1.22.45",
    severity: "Info",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const toCsvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

const FilterSelect = ({
  value,
  onChange,
  options,
  icon: Icon,
  className = "",
}: FilterSelectProps) => (
  <div className={`relative ${className}`}>
    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full appearance-none rounded-full border border-neutral-200 bg-white pl-10 pr-9 text-[13px] font-bold text-neutral-700 outline-none focus:border-[#FF6B35] transition shadow-sm cursor-pointer"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
  </div>
);

const HistoryPage = () => {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<SeverityFilter>("All Severities");
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>("All Modules");
  const [checked, setChecked] = useState<string[]>([]);
  const [inspected, setInspected] = useState<AuditLog | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return auditLogs.filter((log) => {
      const matchesQuery =
        !q ||
        log.action.toLowerCase().includes(q) ||
        log.description.toLowerCase().includes(q) ||
        log.admin.toLowerCase().includes(q) ||
        log.role.toLowerCase().includes(q) ||
        log.module.toLowerCase().includes(q) ||
        log.ip.includes(q) ||
        log.id.toLowerCase().includes(q);
      const matchesSeverity =
        severity === "All Severities" || log.severity === severity;
      const matchesModule =
        moduleFilter === "All Modules" || log.module === moduleFilter;
      return matchesQuery && matchesSeverity && matchesModule;
    });
  }, [query, severity, moduleFilter]);

  const allChecked =
    filtered.length > 0 && filtered.every((log) => checked.includes(log.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : filtered.map((log) => log.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const exportCsv = () => {
    const rows = checked.length
      ? auditLogs.filter((log) => checked.includes(log.id))
      : filtered;
    if (rows.length === 0) return;

    const header = [
      "Log ID",
      "Timestamp",
      "Administrator",
      "Role",
      "Action",
      "Module",
      "IP Address",
      "Severity",
      "Details",
    ];
    const body = rows.map((log) =>
      [
        log.id,
        log.timestamp,
        log.admin,
        log.role,
        log.action,
        log.module,
        log.ip,
        log.severity,
        log.description,
      ]
        .map(toCsvCell)
        .join(","),
    );

    const blob = new Blob([[header.map(toCsvCell).join(","), ...body].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "banao-audit-trail.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              System Security &amp; Audit Logs
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-white tracking-wide">
              ENTERPRISE RBAC TRAIL
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Real-time immutable administrative trail capturing all state changes,
            role updates, pricing modifications, and payout approvals.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Tamper-proof retention active
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search action description, admin name, or system details..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <button
            type="button"
            onClick={exportCsv}
            disabled={checked.length === 0 && filtered.length === 0}
            className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center justify-center gap-1.5 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Export Audit Trail (CSV)
          </button>
          <FilterSelect
            value={severity}
            onChange={(value) => setSeverity(value as SeverityFilter)}
            options={severityOptions}
            icon={ShieldCheck}
            className="sm:w-[168px]"
          />
          <FilterSelect
            value={moduleFilter}
            onChange={(value) => setModuleFilter(value as ModuleFilter)}
            options={moduleOptions}
            icon={Search}
            className="sm:w-[200px]"
          />
        </div>
      </div>

      {/* Audit trail table */}
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[1180px]">
            <thead>
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-white bg-[#FF6B35]">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    aria-label="Select all audit logs"
                    className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5">Administrator</th>
                <th className="px-4 py-3.5">Action Performed</th>
                <th className="px-4 py-3.5">Module</th>
                <th className="px-4 py-3.5">IP Address</th>
                <th className="px-4 py-3.5 text-center">Severity</th>
                <th className="px-4 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={checked.includes(log.id)}
                      onChange={() => toggleOne(log.id)}
                      aria-label={`Select ${log.id}`}
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-bold text-neutral-900 text-[13px]">
                      {log.timestamp.split(" ")[0]}
                    </div>
                    <div className="text-[11px] font-semibold text-neutral-400">
                      {log.timestamp.split(" ").slice(1).join(" ")}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-orange-100 text-[#FF6B35] text-[11px] font-extrabold flex items-center justify-center shrink-0">
                        {initials(log.admin)}
                      </span>
                      <div>
                        <div className="font-bold text-neutral-900 text-[13px]">
                          {log.admin}
                        </div>
                        <div className="text-[11px] font-semibold text-neutral-400">
                          {log.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 max-w-[380px]">
                    <div className="font-extrabold text-neutral-900 text-[13px] tracking-tight">
                      {log.action}
                    </div>
                    <div className="text-[11px] font-medium text-neutral-400 mt-0.5">
                      {log.description}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-block text-[11px] font-extrabold px-3 py-1 rounded-full bg-neutral-900 text-white whitespace-nowrap">
                      {log.module}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[12px] font-semibold text-neutral-600 whitespace-nowrap">
                    {log.ip}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full border ${severityStyle[log.severity]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${severityDot[log.severity]}`}
                      />
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setInspected(log)}
                      className="h-8 px-3 rounded-full border border-neutral-200 bg-white text-xs font-bold text-neutral-700 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-orange-50 transition inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No audit records match the current search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} of {auditLogs.length} audit events
            {checked.length > 0 ? ` — ${checked.length} selected` : ""}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Retained for 7 years · WORM storage
          </span>
        </div>
      </div>

      {/* Inspect modal */}
      {inspected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/50 backdrop-blur-sm"
          onClick={() => setInspected(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#FF6B35] text-white">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  {inspected.id}
                </div>
                <div className="text-base font-extrabold tracking-tight">
                  {inspected.action}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspected(null)}
                aria-label="Close details"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <p className="text-sm font-medium text-neutral-700 leading-relaxed">
                {inspected.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Timestamp", value: inspected.timestamp },
                  {
                    label: "Administrator",
                    value: `${inspected.admin} (${inspected.role})`,
                  },
                  { label: "Module", value: inspected.module },
                  { label: "IP Address", value: inspected.ip },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-neutral-50 border border-neutral-200/70 rounded-xl px-3.5 py-3"
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {item.label}
                    </div>
                    <div className="text-[13px] font-bold text-neutral-900 mt-1 break-words">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full border ${severityStyle[inspected.severity]}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${severityDot[inspected.severity]}`}
                  />
                  {inspected.severity}
                </span>
                <span className="text-[11px] font-semibold text-neutral-400">
                  Integrity hash verified · record is immutable
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;