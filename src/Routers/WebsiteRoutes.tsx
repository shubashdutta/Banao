import React from "react";
import { Route } from "react-router-dom";
import {
  AboutsUs,
  BecameProvider,
  Contactus,
  FAQ,
  HowWeWork,
  LandingPage,
  PageNotFound,
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

    <Route path="/became-provider" element={<BecameProvider />} />

    <Route path="*" element={<PageNotFound />} />
  </Route>
);

export default WebsiteRoutes;
