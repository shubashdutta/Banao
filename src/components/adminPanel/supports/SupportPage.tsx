import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  HelpCircle,
  Image as ImageIcon,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

type TicketPriority = "High" | "Medium" | "Low";
type ChatRole = "customer" | "admin";

type ChatMessage = {
  id: string;
  sender: string;
  time: string;
  role: ChatRole;
  text: string;
};

type Ticket = {
  id: string;
  priority: TicketPriority;
  title: string;
  customer: string;
  phone: string;
  createdAt: string;
  evidencePhoto: string;
  messages: ChatMessage[];
};

const priorityStyle: Record<TicketPriority, string> = {
  High: "border-red-100 bg-red-50 text-red-600",
  Medium: "border-amber-100 bg-amber-50 text-amber-600",
  Low: "border-emerald-100 bg-emerald-50 text-emerald-600",
};

const tickets: Ticket[] = [
  {
    id: "DISP-8812",
    priority: "Medium",
    title: "Additional parts cost discrepancy during plumbing work",
    customer: "Binita Shrestha",
    phone: "+977-9841234567",
    createdAt: "2026-07-28 11:10 AM",
    evidencePhoto:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    messages: [
      {
        id: "msg-1",
        sender: "Binita Shrestha",
        time: "11:10 AM",
        role: "customer",
        text: "Plumber Ramesh quoted रू 450 extra for a socket joint valve. Is this covered in platform rate?",
      },
      {
        id: "msg-2",
        sender: "Aayush Joshi",
        time: "11:20 AM",
        role: "admin",
        text: "Namaste Binita ji! Checked with Ramesh. Replacement CPVC ball valve receipt verified. Price is fair as per market.",
      },
    ],
  },
];

const SupportPage = () => {
  const [selectedId, setSelectedId] = useState<string>(tickets[0].id);
  const [reply, setReply] = useState<string>("");
  const [messageLog, setMessageLog] = useState<Record<string, ChatMessage[]>>(
    () =>
      tickets.reduce<Record<string, ChatMessage[]>>((accumulator, ticket) => {
        accumulator[ticket.id] = ticket.messages;
        return accumulator;
      }, {}),
  );

  const selected =
    tickets.find((ticket) => ticket.id === selectedId) ?? tickets[0];
  const messages = messageLog[selected.id] ?? selected.messages;

  const handleSelect = (ticket: Ticket) => {
    setSelectedId(ticket.id);
    setReply("");
  };

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = reply.trim();
    if (!text) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Aayush Joshi",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      role: "admin",
      text,
    };

    setMessageLog((previous) => ({
      ...previous,
      [selected.id]: [...(previous[selected.id] ?? []), newMessage],
    }));
    setReply("");
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-neutral-900">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50">
            <HelpCircle className="h-5 w-5 text-[#FF6B35]" />
          </span>
          Support &amp; Dispute Resolution
        </h1>
        <p className="mt-1.5 text-sm text-neutral-500">
          Resolve customer disputes, review photo evidence, and manage ticket
          assignments.
        </p>
      </div>

      {/* Two-column workspace */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[340px_1fr]">
        {/* LEFT: Tickets list */}
        <aside className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <MessageSquareText className="h-4 w-4 text-[#FF6B35]" />
              All Tickets ({tickets.length})
            </h2>
          </div>
          <div className="flex flex-col gap-2.5 p-3">
            {tickets.map((ticket) => {
              const active = ticket.id === selectedId;
              return (
                <button
                  key={ticket.id}
                  type="button"
                  onClick={() => handleSelect(ticket)}
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-neutral-900 bg-white shadow-md ring-1 ring-neutral-900/5"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                      {ticket.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${priorityStyle[ticket.priority]}`}
                    >
                      <Clock className="h-3 w-3" />
                      {ticket.priority}
                    </span>
                  </div>
                  <h3
                    className={`mt-2 text-[13.5px] font-bold leading-snug ${
                      active ? "text-neutral-900" : "text-neutral-700"
                    }`}
                  >
                    {ticket.title}
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold text-neutral-400">
                    {ticket.customer} • {ticket.createdAt}
                  </p>
                </button>
              );
            })}
          </div>
        </aside>

        {/* RIGHT: Ticket workspace */}
        <section className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
          {/* Workspace header */}
          <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400">
                  {selected.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${priorityStyle[selected.priority]}`}
                >
                  <Clock className="h-3 w-3" />
                  {selected.priority}
                </span>
              </div>
              <h2 className="mt-1.5 text-lg font-extrabold tracking-tight text-neutral-900">
                {selected.title}
              </h2>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] font-semibold text-neutral-500">
                <span>{selected.customer}</span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  {selected.phone}
                </span>
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 text-sm font-bold text-white shadow-sm shadow-orange-500/25 transition hover:bg-[#f45d26] active:scale-[0.98]"
            >
              <Check className="h-4 w-4" />
              Mark Resolved
            </button>
          </div>

          <div className="flex flex-col gap-5 p-5">
            {/* Dispute evidence photos */}
            <div className="rounded-2xl border border-neutral-200/70 bg-neutral-50/60 p-4">
              <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
                <ImageIcon className="h-3.5 w-3.5 text-[#FF6B35]" />
                Dispute Evidence Photos
              </div>
              <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <img
                  src={selected.evidencePhoto}
                  alt="Dispute evidence - bathroom plumbing setup"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>
            </div>

            {/* Conversation thread */}
            <div className="flex flex-col gap-5">
              {messages.map((message) =>
                message.role === "admin" ? (
                  <div key={message.id} className="flex justify-end">
                    <div className="w-full max-w-xl">
                      <div className="flex items-center justify-end gap-2 text-[11px] font-bold text-neutral-400">
                        <span className="text-[#FF6B35]">{message.sender}</span>
                        <span>•</span>
                        <span>{message.time}</span>
                      </div>
                      <div className="mt-1.5 rounded-2xl rounded-tr-sm border border-orange-100 bg-orange-50/70 p-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#FF6B35]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Admin Response
                        </div>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-neutral-700">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-start">
                    <div className="w-full max-w-xl">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400">
                        <span className="text-neutral-700">
                          {message.sender}
                        </span>
                        <span>•</span>
                        <span>{message.time}</span>
                      </div>
                      <div className="mt-1.5 rounded-2xl rounded-tl-sm border border-neutral-200 bg-neutral-50 p-4">
                        <p className="text-[13.5px] leading-relaxed text-neutral-700">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Admin reply input */}
            <form
              onSubmit={handleSend}
              className="flex flex-col gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:items-center"
            >
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Type official admin response to user..."
                className="h-11 w-full flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
              />
              <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 text-sm font-bold text-white shadow-sm shadow-orange-500/25 transition hover:bg-[#f45d26] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                Reply
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
