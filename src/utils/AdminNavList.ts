import {
  CalendarDays,
  Clock,
  Globe,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Navigation,
  Tag,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";

export const AdminNavList = [
  {
    label: "Dashboard",
    id: "dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
  },
  {
    label: "Customers",
    id: "customer",
    icon: Users,
    link: "/customer",
    badge: "48.2k",
  },

  {
    label: "Providers",
    id: "providers",
    icon: UserCheck,
    badge: "1 Pending",
    link: "/provider",
  },
  {
    label: "Bookings",
    id: "booking",
    icon: CalendarDays,
    link: "/booking",
    badge: "642 Today",
  },

  {
    label: "Global Locations",
    id: "globalLocation",
    link: "/location",
    icon: Globe,
  },
  {
    label: "Live Tracking",
    id: "liveTracking",
    icon: Navigation,
    link: "/tracking",
  },
  {
    label: "Categories",
    id: "categories",
    icon: Layers,
    link: "/categories",
  },
  {
    label: "Pricing Config",
    id: "pricingConfig",
    link: "/pricing",
    icon: Tag,
  },

  {
    label: "Time Slots",
    id: "timeSlots",
    link: "/time-slots",
    icon: Clock,
  },
  {
    label: "Payments & Payouts",
    id: "paymentPayouts",
    link: "/payment-payouts",
    icon: Wallet,
  },
  {
    label: "Page & Form Builder",
    id: "pageBuilder",
    icon: LayoutTemplate,
    link: "/page-build",
  },
];
