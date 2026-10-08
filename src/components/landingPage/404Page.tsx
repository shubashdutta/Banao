import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-bold text-xs tracking-wider uppercase rounded-full shadow-sm">
          <span>⚠️</span> Error 404
        </div>

        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter select-none opacity-90">
            4<span className="text-[#ff6b00]">0</span>4
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 bg-[#faf9f6] px-3">
              Page Not Found
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Looks like this page took a wrong turn, or is under maintenance.
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            The link you followed might be broken, or the page may have been
            moved. Let's get you back on track with Banao.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#ff6b00] text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-[#e05e00] transition-all text-sm uppercase tracking-wider"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
