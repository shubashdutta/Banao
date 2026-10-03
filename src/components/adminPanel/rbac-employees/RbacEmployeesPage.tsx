import React, { useMemo, useState } from "react";
import {
  Building2,
  KeyRound,
  Lock,
  Mail,
  Pencil,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserMinus,
  Users,
  X,
} from "lucide-react";

type EmployeeStatus = "Active" | "On Leave" | "Suspended" | "Invited";
type MfaStatus = "Enforced" | "Pending";
type StatusFilter = "All" | EmployeeStatus;

type Employee = {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  scope: string;
  joined: string;
  lastActive: string;
  status: EmployeeStatus;
  mfa: MfaStatus;
};

type Role = {
  id: string;
  label: string;
  scope: string;
  system: boolean;
};

type PermissionModule = { key: string; label: string; hint: string };

const statusStyle: Record<EmployeeStatus, string> = {
  Active: "border-emerald-100 bg-emerald-50 text-emerald-600",
  "On Leave": "border-amber-100 bg-amber-50 text-amber-600",
  Suspended: "border-red-100 bg-red-50 text-red-600",
  Invited: "border-sky-100 bg-sky-50 text-sky-600",
};

const mfaStyle: Record<MfaStatus, string> = {
  Enforced: "text-emerald-600",
  Pending: "text-amber-600",
};

const avatarPalette = [
  "bg-orange-100 text-[#FF6B35]",
  "bg-sky-100 text-sky-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
];

const departments = [
  "Operations",
  "Finance",
  "Support",
  "Marketing",
  "Engineering",
  "Leadership",
];

const scopes = ["All Nepal", "Kathmandu Valley", "Pokhara", "Lalitpur", "Bhaktapur"];

const roles: Role[] = [
  { id: "super_admin", label: "Super Admin", scope: "Unrestricted platform control", system: true },
  { id: "ops_manager", label: "Operations Manager", scope: "Bookings, providers and live tracking", system: false },
  { id: "finance_controller", label: "Finance Controller", scope: "Payouts, commission and reports", system: false },
  { id: "support_lead", label: "Support Lead", scope: "Tickets, disputes and refunds", system: false },
  { id: "marketing_specialist", label: "Marketing Specialist", scope: "Campaigns and subscriber lists", system: false },
  { id: "auditor", label: "Auditor", scope: "Read-only access to logs and reports", system: false },
];

const permissionModules: PermissionModule[] = [
  { key: "dashboard", label: "Dashboard", hint: "KPI cards and revenue snapshots" },
  { key: "customers", label: "Customers", hint: "Customer profiles and history" },
  { key: "providers", label: "Providers", hint: "Provider verification and payouts" },
  { key: "bookings", label: "Bookings", hint: "Booking lifecycle management" },
  { key: "payments", label: "Payments & Payouts", hint: "Settlement and gateway settings" },
  { key: "pricing", label: "Pricing Config", hint: "Commission and rate rules" },
  { key: "marketing", label: "Marketing", hint: "Campaigns and subscriber lists" },
  { key: "support", label: "Support & Disputes", hint: "Ticket resolution and refunds" },
  { key: "reports", label: "Reports", hint: "Exports and scheduled digests" },
  { key: "audit", label: "Audit Logs", hint: "Immutable activity trail" },
  { key: "employees", label: "Employees & Roles", hint: "Invite staff and edit permissions" },
];

const initialEmployees: Employee[] = [
  { id: "emp-1", code: "ADM-101", name: "Aayush Joshi", email: "aayush@banao.com.np", phone: "+977-9841000001", role: "super_admin", department: "Leadership", scope: "All Nepal", joined: "2024-02-11", lastActive: "2 min ago", status: "Active", mfa: "Enforced" },
  { id: "emp-2", code: "ADM-102", name: "Nisha Maharjan", email: "nisha@banao.com.np", phone: "+977-9841000002", role: "ops_manager", department: "Operations", scope: "Kathmandu Valley", joined: "2024-06-03", lastActive: "18 min ago", status: "Active", mfa: "Enforced" },
  { id: "emp-3", code: "ADM-103", name: "Prashant Karki", email: "prashant@banao.com.np", phone: "+977-9841000003", role: "finance_controller", department: "Finance", scope: "All Nepal", joined: "2024-09-19", lastActive: "1 hr ago", status: "Active", mfa: "Enforced" },
  { id: "emp-4", code: "ADM-104", name: "Sanjita Thapa", email: "sanjita@banao.com.np", phone: "+977-9841000004", role: "support_lead", department: "Support", scope: "Kathmandu Valley", joined: "2025-01-27", lastActive: "3 hrs ago", status: "On Leave", mfa: "Pending" },
  { id: "emp-5", code: "ADM-105", name: "Bikash Bhandari", email: "bikash@banao.com.np", phone: "+977-9841000005", role: "marketing_specialist", department: "Marketing", scope: "All Nepal", joined: "2025-04-08", lastActive: "45 min ago", status: "Active", mfa: "Enforced" },
  { id: "emp-6", code: "ADM-106", name: "Rohit Poudel", email: "rohit@banao.com.np", phone: "+977-9841000006", role: "auditor", department: "Finance", scope: "All Nepal", joined: "2025-05-22", lastActive: "Yesterday", status: "Active", mfa: "Enforced" },
  { id: "emp-7", code: "ADM-107", name: "Anjali Rai", email: "anjali@banao.com.np", phone: "+977-9841000007", role: "ops_manager", department: "Operations", scope: "Pokhara", joined: "2025-08-14", lastActive: "4 days ago", status: "Suspended", mfa: "Pending" },
  { id: "emp-8", code: "ADM-108", name: "Manish Shrestha", email: "manish@banao.com.np", phone: "+977-9841000008", role: "support_lead", department: "Support", scope: "Lalitpur", joined: "2026-07-29", lastActive: "Never", status: "Invited", mfa: "Pending" },
];

const deniedByRole: Record<string, string[]> = {
  auditor: ["employees", "pricing", "payments", "providers", "marketing", "support"],
  support_lead: ["pricing", "payments", "marketing"],
  marketing_specialist: ["pricing", "payments", "providers", "customers", "support"],
  ops_manager: ["pricing", "marketing"],
  finance_controller: ["marketing", "support", "employees"],
  super_admin: [],
};

const initialMatrix = roles.reduce<Record<string, Record<string, boolean>>>(
  (matrix, role) => {
    const denied = deniedByRole[role.id] ?? [];
    matrix[role.id] = permissionModules.reduce<Record<string, boolean>>(
      (modules, module) => {
        modules[module.key] = !denied.includes(module.key);
        return modules;
      },
      {},
    );
    return matrix;
  },
  {},
);

const roleLabel = (roleId: string) =>
  roles.find((role) => role.id === roleId)?.label ?? roleId;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const RbacEmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [matrix, setMatrix] = useState(initialMatrix);
  const [filter, setFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [checked, setChecked] = useState<string[]>([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "ops_manager",
    department: "Operations",
    scope: "Kathmandu Valley",
  });

  const filtered = useMemo(
    () =>
      employees.filter((employee) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          employee.name.toLowerCase().includes(q) ||
          employee.code.toLowerCase().includes(q) ||
          employee.email.toLowerCase().includes(q);
        const matchesDepartment =
          department === "All Departments" || employee.department === department;
        const matchesRole =
          roleFilter === "All Roles" || employee.role === roleFilter;
        const matchesStatus = filter === "All" || employee.status === filter;
        return matchesQuery && matchesDepartment && matchesRole && matchesStatus;
      }),
    [employees, query, department, roleFilter, filter],
  );

  const statusCounts = useMemo(
    () => ({
      All: employees.length,
      Active: employees.filter((e) => e.status === "Active").length,
      "On Leave": employees.filter((e) => e.status === "On Leave").length,
      Suspended: employees.filter((e) => e.status === "Suspended").length,
      Invited: employees.filter((e) => e.status === "Invited").length,
    }),
    [employees],
  );

  const mfaPending = employees.filter((e) => e.mfa === "Pending").length;
  const privileged = employees.filter(
    (e) => e.role === "super_admin" || e.role === "finance_controller",
  ).length;

  const allChecked = filtered.length > 0 && filtered.every((e) => checked.includes(e.id));

  const toggleAll = () =>
    setChecked(allChecked ? [] : filtered.map((e) => e.id));

  const toggleOne = (id: string) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const setStatus = (id: string, status: EmployeeStatus) =>
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, status } : employee,
      ),
    );

  const changeRole = (id: string, role: string) =>
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, role } : employee,
      ),
    );

  const togglePermission = (roleId: string, moduleKey: string) =>
    setMatrix((current) => ({
      ...current,
      [roleId]: {
        ...current[roleId],
        [moduleKey]: !current[roleId]?.[moduleKey],
      },
    }));

  const removeSelected = () => {
    setEmployees((current) => current.filter((e) => !checked.includes(e.id)));
    setChecked([]);
  };

  const handleInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = inviteForm.name.trim();
    const email = inviteForm.email.trim();
    if (!name || !email) return;

    setEmployees((current) => [
      ...current,
      {
        id: `emp-${Date.now()}`,
        code: `ADM-${100 + current.length + 1}`,
        name,
        email,
        phone: "Not provided",
        role: inviteForm.role,
        department: inviteForm.department,
        scope: inviteForm.scope,
        joined: new Date().toISOString().slice(0, 10),
        lastActive: "Never",
        status: "Invited",
        mfa: "Pending",
      },
    ]);
    setInviteForm({
      name: "",
      email: "",
      role: "ops_manager",
      department: "Operations",
      scope: "Kathmandu Valley",
    });
    setIsInviteOpen(false);
  };

return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              RBAC &amp; Employees
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              Access Control
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Manage staff accounts, assign roles, and control module level permissions across the Banao admin panel.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={removeSelected}
            disabled={checked.length === 0}
            className={`h-11 px-4 rounded-full text-[13px] font-bold border shadow-sm flex items-center gap-1.5 transition whitespace-nowrap ${
              checked.length === 0
                ? "bg-white text-neutral-300 border-neutral-200 cursor-not-allowed"
                : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Remove Selected{checked.length > 0 ? ` (${checked.length})` : ""}
          </button>
          <button
            onClick={() => setIsInviteOpen(true)}
            className="h-11 px-5 rounded-full bg-[#FF6B35] hover:bg-[#e85a26] text-white text-[13px] font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Invite Employee
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Total Employees
            </span>
            <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-[#FF6B35]" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2">
            {employees.length}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            {statusCounts.Active} currently active
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Roles Defined
            </span>
            <span className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-sky-600" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2">
            {roles.length}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {permissionModules.length} permission modules
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              MFA Pending
            </span>
            <span className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <Lock className="w-4 h-4 text-amber-600" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2">
            {mfaPending}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Enforce 2FA before going live
          </div>
        </div>
        <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Privileged Access
            </span>
            <span className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
              <KeyRound className="w-4 h-4 text-violet-600" />
            </span>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2">
            {privileged}
          </div>
          <div className="text-xs font-semibold text-neutral-500 mt-1 flex items-center gap-1">
            <UserMinus className="w-3.5 h-3.5" /> Super admin &amp; finance
          </div>
        </div>
      </div>

{/* Search + filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employee name, code, or email..."
              className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-11 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 shadow-sm outline-none focus:border-[#FF6B35] transition"
            >
              <option value="All Roles">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-11 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 shadow-sm outline-none focus:border-[#FF6B35] transition"
            >
              <option value="All Departments">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {(["All", "Active", "On Leave", "Suspended", "Invited"] as StatusFilter[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`h-10 px-4 rounded-full text-[13px] font-bold border transition ${
                  filter === status
                    ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/25"
                    : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {status} ({statusCounts[status]})
              </button>
            ),
          )}
        </div>
      </div>

{/* Employee directory table */}
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
                    className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3.5">Employee</th>
                <th className="px-4 py-3.5">Role Assignment</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Access Scope</th>
                <th className="px-4 py-3.5">MFA</th>
                <th className="px-4 py-3.5">Last Active</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={checked.includes(employee.id)}
                      onChange={() => toggleOne(employee.id)}
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${
                          avatarPalette[index % avatarPalette.length]
                        }`}
                      >
                        {initials(employee.name)}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-neutral-900 truncate">
                          {employee.name}
                        </div>
                        <div className="text-[11px] font-semibold text-neutral-400 truncate">
                          {employee.code} · {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={employee.role}
                      onChange={(e) => changeRole(employee.id, e.target.value)}
                      disabled={employee.role === "super_admin"}
                      className="h-9 px-3 rounded-xl border border-neutral-200 bg-white text-[12px] font-bold text-neutral-700 outline-none focus:border-[#FF6B35] disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed transition"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-700">
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      {employee.department}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[12px] font-bold text-neutral-800 whitespace-nowrap">
                      {employee.scope}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div
                      className={`flex items-center gap-1.5 text-[12px] font-extrabold ${mfaStyle[employee.mfa]}`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {employee.mfa}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[12px] font-medium text-neutral-500 whitespace-nowrap">
                    {employee.lastActive}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full border whitespace-nowrap ${statusStyle[employee.status]}`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      {employee.status === "Suspended" ? (
                        <button
                          onClick={() => setStatus(employee.id, "Active")}
                          className="h-8 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          onClick={() => setStatus(employee.id, "Suspended")}
                          disabled={employee.role === "super_admin"}
                          className="h-8 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Suspend
                        </button>
                      )}
                      <button
                        onClick={() => setStatus(employee.id, "On Leave")}
                        disabled={employee.status === "On Leave"}
                        className="h-8 px-3 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Leave
                      </button>
                      <button
                        className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center transition"
                        title="Edit employee"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No employees match this filter. Try another tab or search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} of {employees.length} employees
            {checked.length > 0 ? ` - ${checked.length} selected` : ""}
          </span>
          <span className="text-xs font-bold text-neutral-400">Page 1 of 1</span>
        </div>
      </div>

{/* Roles + permission matrix */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm p-5 lg:w-[320px] shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#FF6B35]" />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">Roles</h2>
              <p className="text-[11px] font-semibold text-neutral-400">
                {roles.length} roles · {permissionModules.length} modules
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {roles.map((role) => {
              const memberCount = employees.filter((e) => e.role === role.id).length;
              const granted = permissionModules.filter(
                (module) => matrix[role.id]?.[module.key],
              ).length;
              return (
                <div
                  key={role.id}
                  className="rounded-xl border border-neutral-100 bg-neutral-50/60 px-3.5 py-3 hover:border-[#FF6B35]/40 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-bold text-neutral-900">
                      {role.label}
                    </span>
                    {role.system && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-neutral-900 text-white">
                        SYSTEM
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-400 mt-0.5">
                    {role.scope}
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {memberCount} member{memberCount === 1 ? "" : "s"}
                    </span>
                    <span className="flex items-center gap-1">
                      <KeyRound className="w-3 h-3" />
                      {granted}/{permissionModules.length} granted
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

<div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden flex-1">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-neutral-900">
                Permission Matrix
              </h2>
              <p className="text-[11px] font-semibold text-neutral-400">
                Toggle module access per role. Changes apply on next login.
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100 whitespace-nowrap">
              Least Privilege
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-white bg-neutral-900">
                  <th className="px-4 py-3">Module</th>
                  {roles.map((role) => (
                    <th key={role.id} className="px-3 py-3 text-center leading-tight">
                      {role.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissionModules.map((module) => (
                  <tr
                    key={module.key}
                    className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                  >
                    <td className="px-4 py-3">
                      <div className="font-bold text-neutral-800 text-[13px]">
                        {module.label}
                      </div>
                      <div className="text-[11px] font-medium text-neutral-400">
                        {module.hint}
                      </div>
                    </td>
                    {roles.map((role) => {
                      const allowed = matrix[role.id]?.[module.key] ?? false;
                      return (
                        <td key={role.id} className="px-3 py-3 text-center">
                          <button
                            onClick={() => togglePermission(role.id, module.key)}
                            disabled={role.system}
                            title={
                              role.system
                                ? "System role permissions are locked"
                                : `Toggle ${role.label}`
                            }
                            aria-label={`Toggle ${module.label} for ${role.label}`}
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center mx-auto transition disabled:opacity-50 disabled:cursor-not-allowed ${
                              allowed
                                ? "bg-[#FF6B35] border-[#FF6B35] text-white"
                                : "bg-white border-neutral-200 text-transparent hover:border-[#FF6B35]"
                            }`}
                          >
                            {allowed ? (
                              <ShieldCheck className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

{/* Invite employee modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#FF6B35]" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">
                    Invite Employee
                  </h2>
                  <p className="text-[12px] font-medium text-neutral-400">
                    An invite link will be emailed to the staff member.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="w-9 h-9 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-500 flex items-center justify-center transition shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleInvite}
              className="px-6 py-5 flex flex-col gap-4 overflow-y-auto"
            >
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Full Name
                </label>
                <input
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Ram Shrestha"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="name@banao.com.np"
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Role
                  </label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 outline-none focus:border-[#FF6B35] transition"
                  >
                    {roles
                      .filter((role) => !role.system)
                      .map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Department
                  </label>
                  <select
                    value={inviteForm.department}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, department: e.target.value })
                    }
                    className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 outline-none focus:border-[#FF6B35] transition"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Access Scope
                </label>
                <select
                  value={inviteForm.scope}
                  onChange={(e) => setInviteForm({ ...inviteForm, scope: e.target.value })}
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-700 outline-none focus:border-[#FF6B35] transition"
                >
                  {scopes.map((scope) => (
                    <option key={scope} value={scope}>
                      {scope}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium text-amber-800 leading-relaxed">
                  MFA stays pending until the invitee sets up 2FA on first login.
                  Access is limited to the region selected above.
                </p>
              </div>
            </form>
            <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsInviteOpen(false)}
                className="h-10 px-5 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-600 hover:bg-neutral-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                disabled={!inviteForm.name.trim() || !inviteForm.email.trim()}
                className="h-10 px-5 rounded-full bg-[#FF6B35] hover:bg-[#e85a26] text-white text-[13px] font-bold shadow-md shadow-orange-500/25 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RbacEmployeesPage;