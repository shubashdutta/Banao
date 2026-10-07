"use client";

import React from "react";
import { Lottie } from "lottie-react";
import loaderAnimation from "@/Assets/Loader/banao-loader.json";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-white">
      <Lottie src={loaderAnimation} loop autoplay className="h-64 w-64 " />
    </div>
  );
};

export default GlobalLoader;
