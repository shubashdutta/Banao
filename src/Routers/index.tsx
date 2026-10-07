import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "@/components/adminPanel/adminLayout/Layout";
import {
  AIAnalyticsPage,
  BookingListPage,
  CategoryPage,
  CommissionPage,
  CustomerPage,
  DashboardPage,
  EnterpriseReportsPage,
  GobalLocationPage,
  HistoryPage,
  LiveTrackingPage,
  MarketingPage,
  NotificationPage,
  PageBuilderPage,
  PamentPayoutPage,
  PricingPage,
  ProviderPage,
  RbacEmployeesPage,
  ReviewPage,
  SettingPages,
  SupportPage,
  TestEditor,
  TimeSlotPage,
} from "./RouterPath";
import NotFoundPage from "@/components/NotFoundPage";
import WebsiteRoutes from "./WebsiteRoutes";

const Index = () => {
  return (
    <Router>
      <Routes>
        {WebsiteRoutes}
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

        <Route path="/text" element={<TestEditor />} />
      </Routes>
    </Router>
  );
};

export default Index;
