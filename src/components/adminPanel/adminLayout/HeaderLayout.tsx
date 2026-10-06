import React, { useEffect, useRef, useState } from "react";
import { Layout } from "antd";
import {
  Search,
  Command,
  Bell,
  ShieldCheck,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Download,
  Plus,
  ClipboardListIcon,
} from "lucide-react";
import { FormProvider } from "react-hook-form";

const { Header: AntHeader } = Layout;

interface AdminHeaderProps {
  colorBgContainer: string;
}

const Header: React.FC<AdminHeaderProps> = ({ colorBgContainer }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AntHeader
      style={{
        padding: "0 32px",
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
        height: 72,
      }}
    >
      <div className="flex items-center">
        <div className="relative w-80 shrink-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-full rounded-full border border-neutral-200/80 bg-neutral-50/80 pl-11 pr-14 text-sm text-neutral-800 placeholder-neutral-400 transition-all focus:border-[#FF6B35] focus:bg-white focus:outline-none"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-neutral-300/50 bg-neutral-200/60 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-neutral-500">
            <Command className="h-3 w-3" />
            <span>K</span>
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* <div className="flex items-center gap-2 px-3.5 py-1.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-xs font-semibold text-neutral-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Online</span>
            </div> */}

        <button className=" cursor-pointer relative p-2.5 bg-neutral-50 border border-neutral-200/80 rounded-full text-neutral-600 hover:bg-neutral-100 transition-colors shadow-sm">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-neutral-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          {/* <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Binod Pokhrel"
              className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-neutral-900">
                Shubash dutta
              </span>
              <ShieldCheck className="w-4 h-4 text-orange-500 fill-orange-500/10" />
            </div>
            <span className="text-xs text-neutral-400 font-medium">
              Super Admin
            </span>
          </div> */}

          <div className="relative">
            {/* Profile Button */}
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative" ref={profileRef}>
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Binod Pokhrel"
                  className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-sm"
                />

                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl">
                <div className="border-b border-neutral-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Binod Pokhrel"
                      className="h-10 w-10 rounded-full object-cover border border-neutral-200"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-neutral-900">
                        Shubash Dutta
                      </p>

                      <p className="truncate text-xs text-neutral-400">
                        shubash@example.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-1.5">
                  <button
                    type="button"
                    className=" hover:bg-[#ff6b00] cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition  hover:text-white"
                  >
                    <Download className="h-4 w-4 text-neutral-400" /> Export
                    Reports
                  </button>

                  {/* <div className=" border-b-2 border-b-gray-200 " /> */}

                  <button
                    type="button"
                    className=" hover:bg-[#ff6b00] cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition  hover:text-white"
                  >
                    <Plus className="h-4 w-4 text-neutral-400" /> New Booking
                  </button>
                  <button
                    type="button"
                    className=" hover:bg-[#ff6b00] cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition  hover:text-white"
                  >
                    <ClipboardListIcon className="h-4 w-4 text-neutral-400" />{" "}
                    Add Provider
                  </button>
                  <button
                    type="button"
                    className=" hover:bg-[#ff6b00] cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition  hover:text-white"
                  >
                    <User className="h-4 w-4 text-neutral-400" />
                    My Profile
                  </button>

                  <button
                    type="button"
                    className=" hover:bg-[#ff6b00] cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 transition  hover:text-white"
                  >
                    <Settings className="h-4 w-4 text-neutral-400 !group-hover:text-white" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-neutral-100 p-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      // logout logic here
                    }}
                    className=" cursor-pointer flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
