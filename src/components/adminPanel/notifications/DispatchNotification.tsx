import SubmiteBtn from "@/components/common/SubmiteBtn";
import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";

const DispatchNotification = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
  } = useForm({
    defaultValues: {
      number: "9876543210",
    },
  });
  return (
    <>
      <div className=" wrapper">
        <h1 className=" text-sm text-zinc-500 font-semibold px-3">
          Send a simulated live payload test message using channel SMS.
        </h1>

        <form className=" py-5">
          <TextInput
            errors={errors}
            label="Recipient Phone"
            name="number"
            register={register}
            type="text"
            required
            validation={{ required: "Recipient is Required" }}
          />
        </form>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                <span className="text-sm">⚡</span>
              </div>

              <span className="text-sm font-semibold text-slate-700">
                Resolved Test Payload
              </span>
            </div>

            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              Preview
            </span>
          </div>

          <div className="rounded-xl bg-slate-900 px-4 py-3.5 shadow-sm">
            <div className="mb-2 font-mono text-xs font-semibold text-amber-400">
              // Resolved Test Payload
            </div>

            <p className="font-mono text-sm leading-6 text-slate-200">
              Your BOLAO verification OTP is{" "}
              <span className="font-bold text-white">891024</span>. Valid for 5
              minutes. Do not share with anyone.
            </p>
          </div>
        </div>
      </div>

      <div className=" flex justify-end  mt-2">
        <SubmiteBtn label="Send Test" />
      </div>
    </>
  );
};

export default DispatchNotification;
