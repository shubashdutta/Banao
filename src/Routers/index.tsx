import React from "react";
import App from "@/App";
import LoginPage from "@/components/loginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "@/components/adminPanel/dashboard/DashboardPage";
import AdminLayout from "@/components/adminPanel/adminLayout/Layout";
import NotFoundPage from "@/components/NotFoundPage";

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>{" "}
      </Routes>
    </Router>
  );
};

export default Index;
