import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";
import DashboardPage from "@/components/adminPanel/dashboard/DashboardPage";
import CustomerPage from "@/components/adminPanel/customers/CustomerPage";
import ProviderPage from "@/components/adminPanel/provider/providerPage";
import AdminLayout from "@/components/adminPanel/adminLayout/Layout";
import BookingListPage from "@/components/adminPanel/booking/bookingListPage";
import GobalLocationPage from "@/components/adminPanel/gobalLocation/gobalLocationPage";
import LiveTrackingPage from "@/components/adminPanel/liveTracking/LiveTrackingPage";
import CategoryPage from "@/components/adminPanel/category/CategoryPage";
import TimeSlotPage from "@/components/adminPanel/timeSlot/TimeSlotPage";
import NotFoundPage from "@/components/NotFoundPage";
import LoginPage from "@/components/loginPage";
import PamentPayoutPage from "@/components/adminPanel/paymenPayout/PamentPayoutPage";
import PageBuilderPage from "@/components/adminPanel/pageBuilder/PageBuilderPage";
import NotificationPage from "@/components/adminPanel/notifications/NotificationPage";
import CommissionPage from "@/components/adminPanel/commission/CommissionPage";
import AIAnalyticsPage from "@/components/adminPanel/ai_Analytics/AIAnalyticsPage";
import EnterpriseReportsPage from "@/components/adminPanel/reports/EnterpriseReportsPage";
import ReviewPage from "@/components/adminPanel/reviews/ReviewPage";
import SupportPage from "@/components/adminPanel/supports/SupportPage";
import MarketingPage from "@/components/adminPanel/marketing/MarketingPage";
import RbacEmployeesPage from "@/components/adminPanel/rbac-employees/RbacEmployeesPage";
import HistoryPage from "@/components/adminPanel/history/HistoryPage";
import SettingPages from "@/components/adminPanel/settings/SettingPages";

import PricingPage from "@/components/adminPanel/pricing/PricingPage";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/provider" element={<ProviderPage />} />

          <Route path="/booking" element={<BookingListPage />} />
          <Route path="/location" element={<GobalLocationPage />} />
          <Route path="/live-tracking" element={<LiveTrackingPage />} />
          <Route path="/categorys" element={<CategoryPage />} />
          <Route path="/time-slots" element={<TimeSlotPage />} />

          <Route path="/payment-payouts" element={<PamentPayoutPage />} />
          <Route path="/page-build" element={<PageBuilderPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/commission" element={<CommissionPage />} />
          <Route path="/reports" element={<EnterpriseReportsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/ai-analytics" element={<AIAnalyticsPage />} />
          <Route path="/reviews" element={<ReviewPage />} />

          <Route path="/help-center" element={<SupportPage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="rbac-employees" element={<RbacEmployeesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingPages />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Index;
