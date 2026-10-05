import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInput from "./common/TextInput";
import PasswordInput from "./common/PasswordInput";

import logo from "@/Assets/Image/Logo.png"; // You can safely remove this import if unused
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const {
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending, error } = useLogin();
  const onSubmit = (data: any) => {
    login(data, {
      onSuccess: () => {
        // Handle navigation right here inside the component context!
        // navigate("/dashboard");
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#141414] text-white selection:bg-[#FF6B35] selection:text-white">
      <div className=" animate__animated animate__fadeInLeft hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border-r border-neutral-800/60 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF6B35_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex items-center">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-white flex items-center gap-1 group"
          >
            Banao
            <span className="text-[#FF6B35] group-hover:scale-125 transition-transform duration-200">
              .
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md my-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-semibold tracking-wider uppercase mb-4 border border-[#FF6B35]/20">
            Trusted Home Services
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Your home, <br />
            <span className="text-[#FF6B35]">expertly managed.</span>
          </h1>
          <p className="text-neutral-400 text-base mb-8 leading-relaxed">
            Access verified professionals for plumbing, electrical, cleaning,
            and everyday home repairs with just a few taps.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <CheckCircle2 size={18} className="text-[#FF6B35] shrink-0" />
              <span>100% Background-verified service partners</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <CheckCircle2 size={18} className="text-[#FF6B35] shrink-0" />
              <span>Transparent pricing with no hidden charges</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <CheckCircle2 size={18} className="text-[#FF6B35] shrink-0" />
              <span>Quick booking and instant doorstep support</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Banao Pvt. Ltd. All rights reserved.
        </div>
      </div>

      <div className="animate__animated animate__fadeInRight w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#141414]">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-between mb-2">
            <Link
              to="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              Banao<span className="text-[#FF6B35]">.</span>
            </Link>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back 👋
            </h2>
            <p className="text-neutral-400 text-sm mt-2">
              Please enter your details to sign in to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <TextInput
              errors={errors}
              label="Email"
              name="email"
              register={register}
              type="email"
              required={true}
              clearErrors={clearErrors}
              validation={{ required: "Email is Required" }}
            />

            <PasswordInput
              errors={errors}
              label="Password"
              name="password"
              register={register}
              required
              clearErrors={clearErrors}
              validation={{ required: "Password is Required" }}
            />

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FF6B35] hover:bg-[#e05a2b] text-white font-semibold text-sm transition-all shadow-lg shadow-[#FF6B35]/25 cursor-pointer disabled:opacity-50"
            >
              Sign In
            </button>
          </form>

          {/* Sign up prompt */}
          <p className="text-center text-sm text-neutral-400 mt-6">
            Don't have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-[#FF6B35] hover:underline"
            >
              Back to Home / Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
