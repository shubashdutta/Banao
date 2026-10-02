import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-[#FF6B35]">404</h1>
      <h2 className="text-2xl font-bold text-neutral-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-neutral-500 mt-2 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-2.5 bg-[#FF6B35] text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
