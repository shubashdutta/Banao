"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../common/TextInput";

export default function ContactUsPage() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 font-sans py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-extrabold text-xs tracking-widest uppercase rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
            We're Here to Help
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Let’s start a conversation about your{" "}
            <span className="text-[#ff6b00]">project.</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
            Have questions about bookings, looking to partner up, or need
            technical assistance? Reach out to our Kathmandu team.
          </p>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Clean Transparent Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-black tracking-tight text-slate-900">
                Direct Channels
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Choose your preferred way to connect with us. We usually reply
                within a few hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#ff6b00]/50 shadow-xs transition-all group">
                <div className="h-12 w-12 rounded-xl bg-orange-100 text-[#ff6b00] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  📍
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Office
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    Kathmandu, Nepal
                  </h4>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#ff6b00]/50 shadow-xs transition-all group">
                <div className="h-12 w-12 rounded-xl bg-orange-100 text-[#ff6b00] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  ✉️
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Email Us
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    support@banao.com.np
                  </h4>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#ff6b00]/50 shadow-xs transition-all group">
                <div className="h-12 w-12 rounded-xl bg-orange-100 text-[#ff6b00] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  📞
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Call Helpline
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm md:text-base">
                    +977 9802392348
                  </h4>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 font-semibold">
              🕒 Working Hours: Sunday – Friday (9:00 AM – 6:00 PM)
            </div>
          </div>

          {/* Right Column: High-End Form Card */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-3xl border border-slate-200/85 shadow-xl shadow-slate-100">
            {submitted ? (
              <div className="text-center py-20 space-y-6">
                <div className="h-20 w-20 bg-orange-100 text-[#ff6b00] rounded-full flex items-center justify-center text-4xl mx-auto font-black shadow-inner">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                    Message Dispatched!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Our support team has logged your
                    query and will contact you shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    reset();
                  }}
                  className="mt-4 px-8 py-3.5 rounded-xl bg-[#ff6b00] text-white font-extrabold text-sm hover:bg-[#e05e00] transition-all shadow-lg shadow-orange-500/25 cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1 mb-6 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    Send Us a Message
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Fill out the form below and we’ll get back to you
                    immediately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <TextInput
                    errors={errors}
                    label="Full Name"
                    name="name"
                    register={register}
                    type="text"
                    required
                    validation={{ required: "Full Name is Required" }}
                  />

                  <TextInput
                    errors={errors}
                    label="Email Address"
                    name="email"
                    register={register}
                    type="email"
                    clearErrors={clearErrors}
                  />

                  <TextInput
                    errors={errors}
                    label="Phone Number"
                    name="phoneNumber"
                    register={register}
                    type="number"
                    clearErrors={clearErrors}
                    required
                    validation={{ required: "Phone is Required" }}
                  />

                  <TextInput
                    errors={errors}
                    label="Subject"
                    name="subject"
                    register={register}
                    type="text"
                    clearErrors={clearErrors}
                    required
                    validation={{ required: "Contact Subject Is Required" }}
                  />

                  {/* Textarea Field */}
                  <div className="relative col-span-2 pt-2">
                    <textarea
                      rows={5}
                      placeholder=""
                      id="message"
                      {...register("message", {
                        required: "Message is Required",
                      })}
                      className="peer w-full px-4 py-4 bg-[#faf9f6] border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-[#ff6b00] focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/20 transition-all resize-none text-slate-900 font-medium"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-3 top-6 px-1.5 bg-transparent text-xs font-bold text-slate-400 transition-all duration-200 pointer-events-none rounded peer-focus:top-2 peer-focus:bg-white peer-focus:text-xs peer-focus:text-[#ff6b00]"
                    >
                      Your Message <span className="text-[#ff6b00]">*</span>
                    </label>
                    {errors?.message && (
                      <span className="text-red-500 text-xs mt-1.5 block pl-1 font-semibold">
                        {String(errors.message?.message)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-4 rounded-2xl bg-[#ff6b00] text-white font-black shadow-xl shadow-orange-500/30 hover:bg-[#e05e00] transition-all text-sm uppercase tracking-wider transform hover:-translate-y-0.5"
                  >
                    Submit Message 🚀
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
