import TextInput from "@/components/common/TextInput";
import React from "react";
import { useForm } from "react-hook-form";
import { BriefcaseBusiness, CalendarDays, Check, Siren } from "lucide-react";
import SubmiteBtn from "@/components/common/SubmiteBtn";

/** Sunday-first, matching the order used on the Time Slot list cards. */
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const TimeSlotFormPage = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    clearErrors,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      startTime: "",
      endTime: "",
      jobs: "",
      slotProvide: "",
      days: [] as string[],
      emergencyEnabled: false,
    },
  });

  /** Day pills write straight into the form so the value submits with the rest. */
  const selectedDays: string[] = watch("days") ?? [];

  register("days", {
    validate: (value: string[]) =>
      (value?.length ?? 0) > 0 || "Select at least one active day",
  });

  const setDays = (days: string[]) =>
    setValue("days", days, { shouldValidate: true, shouldDirty: true });

  const toggleDay = (day: string) =>
    setDays(
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day],
    );

  const emergencyEnabled: boolean = watch("emergencyEnabled") ?? false;

  const toggleEmergency = () =>
    setValue("emergencyEnabled", !emergencyEnabled, { shouldDirty: true });

  return (
    <form>
      <div className=" grid grid-cols-2  gap-3 wrapper max-h-96 overflow-y-auto no-scrollbar">
        <div className=" col-span-2">
          <TextInput
            errors={errors}
            label="Time Slot Label"
            name="title"
            register={register}
            type="text"
            clearErrors={clearErrors}
            required
            validation={{ required: "Label is Required" }}
          />
        </div>

        <TextInput
          errors={errors}
          label="Start Time"
          name="startTime"
          register={register}
          type="time"
          required
        />

        <TextInput
          errors={errors}
          label="End Time"
          name="endTime"
          register={register}
          type="time"
          required
        />

        <TextInput
          errors={errors}
          label="Max jobs Allow"
          name="jobs"
          register={register}
          type="number"
          required={true}
          validation={{ required: "Jobs Numbers is Required" }}
        />

        <TextInput
          errors={errors}
          label="Slots Provider Capacity Limit"
          name="slotProvide"
          register={register}
          type="number"
          required={true}
          validation={{ required: "Provider Limit is Required" }}
        />

        <div className="col-span-2 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <CalendarDays className="w-4 h-4 text-[#FF6B35]" />
              </span>
              <div>
                <h3 className="text-[13px] font-extrabold text-neutral-900">
                  Active Schedule Days
                </h3>
                <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                  Choose the days this slot is bookable. At least one is
                  required.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100 whitespace-nowrap shrink-0">
              {selectedDays.length}/7 days
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-3">
            {DAYS.map((day) => {
              const isActive = selectedDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  aria-pressed={isActive}
                  className={`h-10 rounded-xl border text-[13px] font-bold transition flex items-center justify-center gap-1.5 ${
                    isActive
                      ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/25"
                      : "bg-white text-neutral-500 border-neutral-200 hover:border-orange-200 hover:text-[#FF6B35]"
                  }`}
                >
                  {isActive && <Check className="w-3.5 h-3.5" />}
                  {day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setDays(WEEKDAYS)}
              className="h-8 px-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-bold flex items-center gap-1.5 transition"
            >
              <BriefcaseBusiness className="w-3 h-3" /> Weekdays Only
            </button>
            <button
              type="button"
              onClick={() => setDays([])}
              disabled={selectedDays.length === 0}
              className="h-8 px-3 rounded-full border border-neutral-200 text-[11px] font-bold text-neutral-500 hover:bg-neutral-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
          </div>

          {errors.days && (
            <p className="text-[11px] font-semibold text-red-500 mt-2">
              {errors.days.message}
            </p>
          )}
        </div>

        <div className="col-span-2 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <Siren className="w-4 h-4 text-[#FF6B35]" />
              </span>
              <div>
                <h3 className="text-[13px] font-extrabold text-neutral-900">
                  Emergency Priority Slot
                </h3>
                <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                  Attach emergency surge surcharge rules
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={emergencyEnabled}
              aria-label="Enable emergency slot"
              onClick={toggleEmergency}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                emergencyEnabled ? "bg-[#FF6B35]" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  emergencyEnabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className=" flex justify-end mt-3">
        <SubmiteBtn label="Created Time Slot" />
      </div>
    </form>
  );
};

export default TimeSlotFormPage;
