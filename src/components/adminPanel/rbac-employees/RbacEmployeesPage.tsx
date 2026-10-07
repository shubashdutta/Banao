/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ShieldCheck, Copy, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";
import AddEmpolyess from "./AddEmpolyess";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface PermissionRow {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
  reject: boolean;
  publish: boolean;
  export: boolean;
}

const AdminManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"personnel" | "matrix">(
    "personnel",
  );
  const [selectedRole, setSelectedRole] = useState("Verification Officer");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const { openModal } = useModal();

  // Sample data for Active Admin Staff
  const adminStaff: AdminUser[] = [
    {
      id: "1",
      name: "Binod Pokhrel",
      email: "binod.p@bolao.np",
      department: "Executive Management",
      role: "Super Admin",
    },
    {
      id: "2",
      name: "Sushma Basnet",
      email: "sushma.finance@bolao.np",
      department: "Finance & Payouts",
      role: "Finance",
    },
    {
      id: "3",
      name: "Pradeep Khadka",
      email: "pradeep.verify@bolao.np",
      department: "Provider Onboarding",
      role: "Verification",
    },
  ];

  const [permissions, setPermissions] = useState<PermissionRow[]>([
    {
      module: "Dashboard",
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Users / Customers",
      view: true,
      create: false,
      edit: true,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Providers / Partners",
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: true,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Bookings / Jobs",
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Service Categories",
      view: false,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Reports & Analytics",
      view: false,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
    {
      module: "Payments & Wallet",
      view: true,
      create: false,
      edit: false,
      delete: false,
      approve: false,
      reject: false,
      publish: false,
      export: false,
    },
  ]);

  const handleAddEmployess = () => {
    openModal("Admin Staff", <AddEmpolyess />, "medium");
  };

  const handleCheckboxChange = (index: number, field: keyof PermissionRow) => {
    const updated = [...permissions];
    updated[index] = {
      ...updated[index],
      [field]: !updated[index][field],
    };
    setPermissions(updated);
  };

  const deletableSelected = selectedEmployees.filter((id) => id !== "1"); // Example: Super admin id 1 is protected
  const protectedSelected = selectedEmployees.filter((id) => id === "1");

  const removeSelected = () => {
    // Handle remove logic here
  };

  return (
    <div className="w-full space-y-6 ">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              RBAC &amp; Employees
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
              Access Control
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Manage staff accounts, assign roles, and control module level
            permissions across the Banao admin panel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {deletableSelected.length > 0 && (
            <button
              type="button"
              onClick={removeSelected}
              title={
                protectedSelected.length > 0
                  ? "Super Admin accounts are protected and cannot be removed"
                  : undefined
              }
              className="h-10 px-3.5 rounded-xl text-[12px] font-bold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 flex items-center gap-1.5 transition whitespace-nowrap"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove ({deletableSelected.length})
            </button>
          )}
          <button
            type="button"
            onClick={() => handleAddEmployess()}
            className=" cursor-pointer h-10 px-4 rounded-xl bg-[#FF6B35] hover:bg-[#e85a26] text-white text-[12px] font-bold flex items-center gap-1.5 transition whitespace-nowrap shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        </div>
      </div>

      {/* Top Navigation Tabs */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setActiveTab("personnel")}
          className={` cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
            activeTab === "personnel"
              ? "bg-[#FF6B35] text-white shadow-orange-500/20"
              : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
          }`}
        >
          Admin Personnel ({adminStaff.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("matrix")}
          className={` cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
            activeTab === "matrix"
              ? "bg-[#FF6B35] text-white shadow-orange-500/20"
              : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
          }`}
        >
          Granular Permission Matrix
        </button>
      </div>

      {/* Tab 1: Active Admin Staff Personnel */}
      {activeTab === "personnel" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Active Admin Staff Personnel
            </h2>
          </div>

          <div className="divide-y divide-neutral-100">
            {adminStaff.map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      {staff.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      <span className="text-neutral-600">{staff.email}</span>{" "}
                      <span className="mx-1.5">•</span>{" "}
                      <span className="font-medium text-neutral-600">
                        {staff.department}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-semibold tracking-wide">
                    {staff.role}
                  </span>
                  <button
                    type="button"
                    className="px-4 py-1.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 hover:border-neutral-300 transition-all"
                  >
                    Disable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Granular Permission Matrix */}
      {activeTab === "matrix" && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-neutral-800">
                Select Role for Matrix Config:
              </span>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200 rounded-xl px-4 py-2 pr-10 text-sm font-semibold text-neutral-800 focus:outline-none focus:border-[#FF6B35] transition-all cursor-pointer shadow-sm"
                >
                  <option value="Verification Officer">
                    Verification Officer
                  </option>
                  <option value="Operations Manager">Operations Manager</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Finance & Payouts">Finance & Payouts</option>
                  <option value="Provider Onboarding">
                    Provider Onboarding
                  </option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-all self-start sm:self-auto shadow-sm"
            >
              <Copy className="w-4 h-4 text-neutral-500" />
              Clone Role Matrix
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50/50">
                  <th className="py-4 px-6">Module Name</th>
                  <th className="py-4 px-4 text-center">View</th>
                  <th className="py-4 px-4 text-center">Create</th>
                  <th className="py-4 px-4 text-center">Edit</th>
                  <th className="py-4 px-4 text-center">Delete</th>
                  <th className="py-4 px-4 text-center">Approve</th>
                  <th className="py-4 px-4 text-center">Reject</th>
                  <th className="py-4 px-4 text-center">Publish</th>
                  <th className="py-4 px-4 text-center">Export</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {permissions.map((row, index) => (
                  <tr
                    key={row.module}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-neutral-900">
                      {row.module}
                    </td>
                    {(
                      [
                        "view",
                        "create",
                        "edit",
                        "delete",
                        "approve",
                        "reject",
                        "publish",
                        "export",
                      ] as Array<keyof PermissionRow>
                    ).map((field) => (
                      <td key={field} className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={Boolean(row[field])}
                          onChange={() => handleCheckboxChange(index, field)}
                          className="w-4 h-4 rounded border-neutral-300 text-[#FF6B35] focus:ring-[#FF6B35] cursor-pointer accent-[#FF6B35]"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagementPage;
