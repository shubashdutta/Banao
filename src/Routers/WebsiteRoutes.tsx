import React from "react";
import { Route } from "react-router-dom";
import { LandingPage, ServicePage } from "./RouterPath";
import WebsiteLayout from "@/components/landingPage/webLayout";

const WebsiteRoutes = (
  <Route element={<WebsiteLayout />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/services" element={<ServicePage />} />
  </Route>
);

export default WebsiteRoutes;
