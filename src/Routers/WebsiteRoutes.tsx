import React from "react";
import { Route } from "react-router-dom";
import {
  AboutsUs,
  Contactus,
  FAQ,
  HowWeWork,
  LandingPage,
  ServicePage,
} from "./RouterPath";
import WebsiteLayout from "@/components/landingPage/webLayout";
import ScrollToTop from "@/components/common/ScrollToTop";

const WebsiteRoutes = (
  <Route
    element={
      <>
        <ScrollToTop />
        <WebsiteLayout />
      </>
    }
  >
    <Route path="/" element={<LandingPage />} />
    <Route path="/services" element={<ServicePage />} />

    <Route path="/how-we-work" element={<HowWeWork />} />
    <Route path="/about-us" element={<AboutsUs />} />

    <Route path="/faq" element={<FAQ />} />

    <Route path="/contact-us" element={<Contactus />} />
  </Route>
);

export default WebsiteRoutes;
