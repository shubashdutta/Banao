import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../common/TextInput";

const contactUsPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     // Handle form submission logic here (e.g., API call)
  //     setSubmitted(true);
  //   };
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans py-16 px-6 md:px-12 ">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-bold text-xs tracking-wider uppercase rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            We’d Love to Hear From You
          </h1>
          <p className="text-slate-600 text-base">
            Have questions about a booking, need support, or want to join as a
            professional? Drop us a message or reach out directly.
          </p>
        </div>

        <div className=" grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-orange-300 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden space-y-8">
              <div className="absolute right-[-20px] bottom-[-20px] text-white/5 text-[150px] font-black select-none pointer-events-none">
                📞
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className=" text-zinc-900 text-sm">
                  Fill out the form or reach us through any of these channels.
                  We respond promptly.
                </p>
              </div>

              <div className="space-y-6 relative z-10 text-sm">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[#ff6b00] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">
                      Office Location
                    </h4>
                    <p className="text-zinc-600 mt-0.5">Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[#ff6b00] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">
                      Email Address
                    </h4>
                    <p className="text-zinc-600 mt-0.5">support@banao.np</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-xl bg-[#ff6b00] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200">
                      Helpline Phone
                    </h4>
                    <p className="text-zinc-600 mt-0.5">
                      +977 1-4000000 / 9802392348
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 relative z-10 text-xs text-black font-semibold">
                Working Hours: Sunday – Friday (9:00 AM – 6:00 PM)
              </div>
            </div>
          </div>

          <div className=" lg:col-span-7 bg-white p-5 md:p-5 rounded-3xl border border-slate-200/80 shadow-sm">
            {submitted ? (
              <div className=" text-center py-16 space-y-4">
                <div className=" h-16 w-16 bg-orange-100 text-[#ff6b00] rounded-full flex items-center justify-center text-3xl mx-auto font-semibold">
                  {" "}
                  ✓
                </div>

                <h3 className=" text-2xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>

                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Banao. Our customer success team
                  has received your message and will get back to you shortly.
                </p>

                <button
                  //   onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#ff6b00] text-white font-semibold text-sm hover:bg-[#e05e00] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-3 mb-5 text-center">
                  <span className="px-4 py-1.5 bg-orange-100 text-[#ff6b00] font-bold text-xs tracking-wider uppercase rounded-full shadow-sm">
                    Get in Touch
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                    Let’s Start a{" "}
                    <span className="text-[#ff6b00]">Conversation</span>
                  </h1>
                  <div className="h-1 w-12 bg-[#ff6b00] rounded-full"></div>
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
                    label="Email"
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

                  {/* Floating Label Textarea */}
                  <div className="relative col-span-2 pt-2">
                    <textarea
                      required
                      rows={4}
                      placeholder=""
                      id="message"
                      {...register("message", {
                        required: "Message is Required",
                      })}
                      className="peer w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff6b00] transition-colors resize-none text-slate-900"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-3 top-5 px-1.5 bg-white text-xs font-medium text-slate-400 transition-all duration-200 pointer-events-none rounded peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#ff6b00]"
                    >
                      Your Message <span className="text-[#ff6b00]">*</span>
                    </label>
                    {errors?.message && (
                      <span className="text-red-500 text-xs mt-1 block pl-1">
                        {String(errors.message?.message)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="cursor-pointer w-full sm:w-[60%] py-4 rounded-xl bg-[#ff6b00] text-white font-semibold shadow-lg shadow-orange-500/20 hover:bg-[#e05e00] transition-all text-sm uppercase tracking-wider mx-auto"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactUsPage;
