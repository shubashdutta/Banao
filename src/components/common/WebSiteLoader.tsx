import React from "react";

const WebSiteLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#faf9f6]/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-orange-500/15 animate-ping duration-1000"></div>

        <div className="w-20 h-20 rounded-full border-4 border-orange-100 border-t-[#ff6b00] animate-spin"></div>

        <div className="absolute w-12 h-12 rounded-full border-4 border-transparent border-b-[#ff6b00]/80 animate-[spin_1.5s_linear_infinite_reverse]"></div>

        <div className="absolute w-3 h-3 bg-[#ff6b00] rounded-full shadow-lg shadow-orange-500 animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center space-y-1">
        <p className="text-sm font-bold text-slate-800 tracking-wider uppercase animate-pulse">
          {"Loading Banao..."}
        </p>
        <div className="flex gap-1 items-center pt-1">
          <span className="h-1.5 w-1.5 bg-[#ff6b00] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-1.5 w-1.5 bg-[#ff6b00] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-1.5 w-1.5 bg-[#ff6b00] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default WebSiteLoader;
