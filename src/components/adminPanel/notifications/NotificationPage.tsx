import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/providers/ModalProvider";
import NotificationForm from "./NotificationForm";
import DispatchNotification from "./DispatchNotification";

type Template = {
  channel: string;
  event: string;
  title: string;
  en: string;
  ne: string;
  vars: string[];
};

const templates: Template[] = [
  {
    channel: "SMS",
    event: "OTP",
    title: "OTP Authentication SMS",
    en: "Your BOLAO verification OTP is 482913. Valid for 5 minutes. Do not share with anyone.",
    ne: "तपाईंको बोलाव प्रमाणीकरण OTP 482913 हो। ५ मिनेटको लागि मान्य छ। कसैसँग सेयर नगर्नुहोला।",
    vars: ["482913", "BOLAO"],
  },
  {
    channel: "Email",
    event: "Booking Created",
    title: "Booking Confirmation Email",
    en: "Hello Aashish Sharma, your booking for Deep Home Cleaning on Oct 2, 2026 at 2:00 PM is confirmed. Total: NPR Rs. 4,500.",
    ne: "नमस्ते Aashish Sharma, Oct 2, 2026 मा Deep Home Cleaning को लागि तपाईंको बुकिंग BN-98412 पक्का भयो।",
    vars: [
      "Aashish Sharma",
      "Deep Home Cleaning",
      "BN-98412",
      "Oct 2, 2026",
      "2:00 PM",
      "NPR Rs. 4,500",
    ],
  },
  {
    channel: "Push Notification",
    event: "Provider Arriving",
    title: "Provider Arriving Push Notification",
    en: "Your service partner Ramesh Thapa is arriving at your location in 10 mins for Deep Home Cleaning.",
    ne: "तपाईंको सेवा प्रदायक Ramesh Thapa १० मिनेटमा आउँदै हुनुहुन्छ।",
    vars: ["Ramesh Thapa", "Deep Home Cleaning"],
  },
  {
    channel: "WhatsApp",
    event: "Payout Approved",
    title: "Payout Approved WhatsApp Notice",
    en: "Dear Ram Shrestha, your payout request of NPR Rs. 38,250 has been approved and transferred via eSewa.",
    ne: "प्रिय Ram Shrestha, तपाईंको Rs. 38,250 भुक्तानी ईसेवा मार्फत पठायो।",
    vars: ["Ram Shrestha", "NPR Rs. 38,250"],
  },
];

const channels = [
  "All Channels",
  "SMS",
  "Email",
  "Push Notification",
  "WhatsApp",
];

const renderVars = (text: string, vars: string[]) => {
  let out: React.ReactNode[] = [text];
  vars.forEach((v) => {
    out = out.flatMap((node: any, idx) => {
      if (typeof node !== "string") return [node];
      const parts = node.split(v);
      return parts.flatMap((part, j) =>
        j < parts.length - 1
          ? [
              part,
              <span
                key={`${v}-${idx}-${j}`}
                className="font-extrabold text-[#FF6B35] bg-orange-50 px-1 rounded"
              >
                {v}
              </span>,
            ]
          : [part],
      );
    });
  });
  return out;
};

const NotificationPage = () => {
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("All Channels");

  const { openModal, closeModal } = useModal();
  const filtered = useMemo(
    () =>
      templates.filter((t) => {
        const q = query.toLowerCase();
        const mQ =
          !q ||
          t.title.toLowerCase().includes(q) ||
          t.en.toLowerCase().includes(q) ||
          t.vars.join(" ").toLowerCase().includes(q);
        const mC = channel === "All Channels" || t.channel === channel;
        return mQ && mC;
      }),
    [query, channel],
  );

  const handleAddNotificationTemplate = () => {
    openModal("Create Notification Template", <NotificationForm />, "medium");
  };

  const handleDispatchNotification = () => {
    openModal("Test Dispatch Notification", <DispatchNotification />, "medium");
  };

  // const nvaigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-semibold  tracking-tight text-neutral-900">
              Centralized Notification Template Hub
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              Push / SMS / Email / WhatsApp
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Manage notification templates, translations & dynamic variables.
          </p>
        </div>
        <button
          onClick={handleAddNotificationTemplate}
          className=" cursor-pointer h-10 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-sm font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 transition shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Template
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search template name, payload string, or variable..."
            className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
          />
        </div>
        <div className="relative">
          <select
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            className="h-11 rounded-full border border-neutral-200 bg-white pl-4 pr-10 text-sm font-bold text-neutral-700 outline-none cursor-pointer appearance-none shadow-sm"
          >
            {channels.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <div
            key={t.title}
            className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-white">
                  {t.channel}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
                  {t.event}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Active
              </span>
            </div>
            <h3 className="text-base font-extrabold text-neutral-900 tracking-tight">
              {t.title}
            </h3>
            <div className="rounded-xl bg-neutral-50/70 border border-neutral-100 p-4 flex flex-col gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  English Template
                </div>
                <p className="text-[13px] font-medium text-neutral-700 leading-relaxed">
                  {renderVars(t.en, t.vars)}
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-200/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  नेपाली रुपान्तरण
                </div>
                <p className="text-[13px] font-medium text-neutral-700 leading-relaxed">
                  {renderVars(t.ne, t.vars)}
                </p>
              </div>
              <div className="flex gap-1.5 flex-wrap pt-1">
                {t.vars.map((v) => (
                  <code
                    key={v}
                    className="text-[11px] font-bold px-2 py-1 rounded-md bg-neutral-900 text-white"
                  >
                    {v}
                  </code>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
              <button
                onClick={handleDispatchNotification}
                className=" cursor-pointer h-9 px-4 rounded-full bg-[#FF6B35] hover:bg-[#e85a28] text-white text-[13px] font-bold flex items-center gap-1.5 transition"
              >
                <Send className="w-3.5 h-3.5" /> Test Dispatch
              </button>
              <button
                onClick={handleAddNotificationTemplate}
                className=" cursor-pointer h-9 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[13px] font-bold flex items-center gap-1.5 transition"
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
              <button className="ml-auto h-9 px-4 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-bold flex items-center gap-1.5 transition">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="bg-white border border-neutral-200/70 rounded-2xl py-12 text-center text-sm font-medium text-neutral-400">
          No templates match. Try another search or channel.
        </div>
      )}
      <div className="px-1 text-[13px] font-medium text-neutral-400">
        Showing {filtered.length} of {templates.length} templates
      </div>
    </div>
  );
};

export default NotificationPage;
