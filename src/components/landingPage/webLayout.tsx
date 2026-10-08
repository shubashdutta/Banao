import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebSiteLoader from "../common/WebSiteLoader";

const WebsiteLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <Suspense fallback={<WebSiteLoader />}>
        <main className="flex-1">
          <Outlet />
        </main>
      </Suspense>

      <Footer />
    </div>
  );
};

export default WebsiteLayout;
