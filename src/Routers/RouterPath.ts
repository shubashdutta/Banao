import { lazy } from "react";

export const LandingPage = lazy(() => import("@/App"));

export const ServicePage = lazy(
  () => import("@/components/landingPage/servicesPage"),
);

export const HowWeWork = lazy(
  () => import("@/components/landingPage/howWeWorkPage"),
);

export const AboutsUs = lazy(
  () => import("@/components/landingPage/about-usPage"),
);

export const FAQ = lazy(() => import("@/components/landingPage/faqPage"));

export const Contactus = lazy(
  () => import("@/components/landingPage/contactUsPage"),
);

export const PageNotFound = lazy(
  () => import("@/components/landingPage/404Page"),
);

export const BecameProvider = lazy(
  () => import("@/components/landingPage/becameProviderPage"),
);

export const DashboardPage = lazy(
  () => import("@/components/adminPanel/dashboard/DashboardPage"),
);

export const CustomerPage = lazy(
  () => import("@/components/adminPanel/customers/CustomerPage"),
);

export const ProviderPage = lazy(
  () => import("@/components/adminPanel/provider/providerPage"),
);

export const BookingListPage = lazy(
  () => import("@/components/adminPanel/booking/bookingListPage"),
);

export const GobalLocationPage = lazy(
  () => import("@/components/adminPanel/gobalLocation/gobalLocationPage"),
);

export const LiveTrackingPage = lazy(
  () => import("@/components/adminPanel/liveTracking/LiveTrackingPage"),
);

export const CategoryPage = lazy(
  () => import("@/components/adminPanel/category/CategoryPage"),
);

export const TimeSlotPage = lazy(
  () => import("@/components/adminPanel/timeSlot/TimeSlotPage"),
);

export const PamentPayoutPage = lazy(
  () => import("@/components/adminPanel/paymenPayout/PamentPayoutPage"),
);

export const PageBuilderPage = lazy(
  () => import("@/components/adminPanel/pageBuilder/PageBuilderPage"),
);

export const NotificationPage = lazy(
  () => import("@/components/adminPanel/notifications/NotificationPage"),
);

export const CommissionPage = lazy(
  () => import("@/components/adminPanel/commission/CommissionPage"),
);

export const AIAnalyticsPage = lazy(
  () => import("@/components/adminPanel/ai_Analytics/AIAnalyticsPage"),
);

export const EnterpriseReportsPage = lazy(
  () => import("@/components/adminPanel/reports/EnterpriseReportsPage"),
);

export const ReviewPage = lazy(
  () => import("@/components/adminPanel/reviews/ReviewPage"),
);

export const SupportPage = lazy(
  () => import("@/components/adminPanel/supports/SupportPage"),
);

export const MarketingPage = lazy(
  () => import("@/components/adminPanel/marketing/MarketingPage"),
);

export const RbacEmployeesPage = lazy(
  () => import("@/components/adminPanel/rbac-employees/RbacEmployeesPage"),
);

export const HistoryPage = lazy(
  () => import("@/components/adminPanel/history/HistoryPage"),
);

export const SettingPages = lazy(
  () => import("@/components/adminPanel/settings/SettingPages"),
);

export const PricingPage = lazy(
  () => import("@/components/adminPanel/pricing/PricingPage"),
);

export const TestEditor = lazy(
  () => import("@/components/common/BlogTextEdtor"),
);
