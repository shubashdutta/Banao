import React, { useState } from "react";
import {
  Building2,
  Check,
  CreditCard,
  Mail,
  MessageSquare,
  Palette,
  Save,
} from "lucide-react";

type SettingsTabId =
  | "company"
  | "branding"
  | "notifications"
  | "email"
  | "gateways";

type FieldConfig = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
};

type TabConfig = {
  id: SettingsTabId;
  label: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  fields: FieldConfig[];
};

type FormState = Record<SettingsTabId, Record<string, string>>;

const tabs: TabConfig[] = [
  {
    id: "company",
    label: "Company & PAN/VAT",
    icon: Building2,
    title: "Legal Entity & Company Information",
    subtitle:
      "Official company legal registration, PAN/VAT tax numbers, and headquarters address.",
    fields: [
      {
        name: "legalName",
        label: "Company Legal Name",
        required: true,
      },
      {
        name: "registrationNo",
        label: "Company Registration No. (Nepal Office of Company Registrar)",
      },
      {
        name: "panVat",
        label: "PAN / VAT Tax ID No.",
        required: true,
      },
      { name: "address", label: "Headquarters Address" },
      { name: "phone", label: "Official Support Phone Number" },
      { name: "email", label: "Official Support Email Address" },
    ],
  },
  {
    id: "branding",
    label: "Branding & Theme",
    icon: Palette,
    title: "Branding & Theme",
    subtitle:
      "Public facing brand identity, accent colour and marketing copy shown across the app.",
    fields: [
      { name: "brandName", label: "Brand Display Name", required: true },
      { name: "primaryColor", label: "Primary Accent Colour (HEX)" },
      { name: "tagline", label: "Marketing Tagline" },
      { name: "supportEmail", label: "Public Support Email Address" },
    ],
  },
  {
    id: "notifications",
    label: "SMS & Push Notifications",
    icon: MessageSquare,
    title: "SMS & Push Notifications",
    subtitle:
      "Nepali SMS gateway routing for OTPs and booking alerts, plus mobile push credentials.",
    fields: [
      { name: "smsProvider", label: "Primary SMS Gateway" },
      { name: "smsUsername", label: "SMS Gateway Username" },
      { name: "smsPassword", label: "SMS Gateway Password", type: "password" },
      { name: "senderId", label: "Registered Sender ID (ALERT)" },
    ],
  },
  {
    id: "email",
    label: "Email SMTP Config",
    icon: Mail,
    title: "Email SMTP Configuration",
    subtitle:
      "Outbound transactional email relay used for invoices, receipts and staff invites.",
    fields: [
      { name: "smtpHost", label: "SMTP Host" },
      { name: "smtpPort", label: "SMTP Port" },
      { name: "smtpUser", label: "SMTP Username" },
      { name: "smtpPassword", label: "SMTP Password", type: "password" },
    ],
  },
  {
    id: "gateways",
    label: "eSewa / Khalti / Fonepay Gateways",
    icon: CreditCard,
    title: "Payment Gateways",
    subtitle:
      "Production merchant credentials for eSewa, Khalti and Fonepay settlement routing.",
    fields: [
      { name: "esewaMerchantId", label: "eSewa Merchant ID" },
      { name: "esewaSecret", label: "eSewa Secret Key", type: "password" },
      { name: "khaltiPublicKey", label: "Khalti Public Key" },
      { name: "khaltiSecret", label: "Khalti Secret Key", type: "password" },
    ],
  },
];

const initialForms: FormState = {
  company: {
    legalName: "BOLAO Services Nepal Pvt. Ltd.",
    registrationNo: "REG-991204/2024",
    panVat: "304918239",
    address: "Maitighar Heights, Ward 10, Kathmandu, Nepal",
    phone: "+977-1-4792100",
    email: "admin@bolao.np",
  },
  branding: {
    brandName: "BOLAO",
    primaryColor: "#FF6B35",
    tagline: "Trusted home services, right across Nepal.",
    supportEmail: "help@bolao.np",
  },
  notifications: {
    smsProvider: "Aakash SMS",
    smsUsername: "bolao_live",
    smsPassword: "••••••••••••",
    senderId: "BOLAO",
  },
  email: {
    smtpHost: "smtp.bolao.np",
    smtpPort: "587",
    smtpUser: "no-reply@bolao.np",
    smtpPassword: "••••••••••••",
  },
  gateways: {
    esewaMerchantId: "ESEWA-24008871",
    esewaSecret: "••••••••••••",
    khaltiPublicKey: "pk_live_9f2c41ab77de",
    khaltiSecret: "••••••••••••",
  },
};

type FieldProps = FieldConfig & {
  value: string;
  onChange: (value: string) => void;
};

const Field = ({ label, value, onChange, required, placeholder, type }: FieldProps) => (
  <div>
    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
      {label}
      {required && <span className="text-[#FF6B35] ml-0.5">*</span>}
    </label>
    <input
      type={type ?? "text"}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-800 outline-none focus:border-[#FF6B35] transition shadow-sm"
    />
  </div>
);

const SettingPages = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("company");
  const [forms, setForms] = useState<FormState>(initialForms);
  const [saved, setSaved] = useState(false);

  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const ActiveIcon = active.icon;

  const updateField = (tabId: SettingsTabId, field: string, value: string) => {
    setForms((current) => ({
      ...current,
      [tabId]: { ...current[tabId], [field]: value },
    }));
    setSaved(false);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
              System &amp; Enterprise Settings
            </h1>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-900 text-white tracking-wide">
              SUPER ADMIN CONSOLE
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1.5">
            Configure BOLAO legal credentials, branding themes, Nepalese SMS
            gateways (Aakash/Sparrow), SMTP email, and eSewa/Khalti payment keys.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="h-11 px-5 rounded-xl bg-[#FF6B35] hover:bg-[#e85a26] text-white text-[13px] font-bold flex items-center gap-1.5 transition whitespace-nowrap shrink-0"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Configuration Saved" : "Save System Configuration"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-4 rounded-full text-[13px] font-bold border flex items-center gap-2 transition whitespace-nowrap ${
                isActive
                  ? "bg-[#FF6B35] text-white border-[#FF6B35]"
                  : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active tab panel */}
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <ActiveIcon className="w-5 h-5 text-[#FF6B35]" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-neutral-900">
              {active.title}
            </h2>
            <p className="text-[11px] font-medium text-neutral-400">
              {active.subtitle}
            </p>
          </div>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {active.fields.map((field) => (
              <Field
                key={field.name}
                {...field}
                value={forms[activeTab][field.name] ?? ""}
                onChange={(value) => updateField(activeTab, field.name, value)}
              />
            ))}
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 text-[12px] font-medium text-neutral-400">
          <span>
            Changes apply platform-wide after saving. Secrets are stored encrypted.
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Last synced 4 min ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default SettingPages;
