import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "@/App";
import LoginPage from "@/components/LoginPage";
import DashboardPage from "@/components/adminPanel/dashboard/DashboardPage";
import CustomerPage from "@/components/adminPanel/customers/CustomerPage";
import ProviderPage from "@/components/adminPanel/provider/providerPage";
import AdminLayout from "@/components/adminPanel/adminLayout/Layout";
import BookingListPage from "@/components/adminPanel/booking/bookingListPage";
import NotFoundPage from "@/components/NotFoundPage";

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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Index;
