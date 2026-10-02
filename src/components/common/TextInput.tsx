/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type FC } from "react";

interface InputType {
  register: any;
  label: string;
  errors: any;
  type: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  validation?: any;
  value?: string;
  defaultValue?: string | boolean;
  clearErrors?: (name?: any) => void;
  onclick?: () => void;
  max?: number;
  min?: number;
  step?: string | number;
}

const TextInput: FC<InputType> = ({
  register,
  label,
  errors,
  type,
  name,
  required = false,
  disabled = false,
  value,
  defaultValue,
  clearErrors,
  onclick,
  validation,
  max,
  min,
  step,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const { ref, onChange, onBlur, name: regName } = register(name, validation);

  const endOfYear = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .split("T")[0];

  const dateProps =
    type === "date" || type === "Date"
      ? name === "dateOfBirth"
        ? { max: endOfYear }
        : {}
      : {};

  return (
    <div className="flex flex-col w-full space-y-1">
      {type === "checkbox" ? (
        <label className="flex items-center gap-3 cursor-pointer text-sm text-neutral-300 select-none py-1">
          <input
            type="checkbox"
            name={regName ?? name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            id={name}
            defaultChecked={Boolean(defaultValue)}
            onClick={onclick}
            className="w-4 h-4 rounded bg-neutral-900 border-neutral-800 text-[#FF6B35] focus:ring-[#FF6B35] focus:ring-offset-neutral-900 cursor-pointer"
          />
          <span>
            {label} {required && <span className="text-[#FF6B35]">*</span>}
          </span>
        </label>
      ) : (
        <div className="relative w-full pt-2">
          {/* Input Field */}
          <input
            type={type === "Date" ? "date" : type === "Time" ? "time" : type}
            placeholder=""
            autoComplete={
              type === "email"
                ? "email"
                : type === "time" ||
                    type === "Time" ||
                    type === "date" ||
                    type === "Date"
                  ? "off"
                  : "new-password"
            }
            {...(type === "number" ? { min: min ?? 0, max } : {})}
            step={
              type === "time" || type === "Time"
                ? "60"
                : type === "number"
                  ? step || "any"
                  : undefined
            }
            id={name}
            name={regName ?? name}
            {...dateProps}
            disabled={disabled}
            defaultValue={
              typeof defaultValue === "string" ? defaultValue : undefined
            }
            ref={ref}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(Boolean(e.target.value));
              onBlur(e);
            }}
            onChange={(e) => {
              setHasValue(Boolean(e.target.value));
              onChange(e); // natively updates React Hook Form's state
              // Drop the error as soon as user types, so it doesn't stick after submit
              if (e.target.value && errors?.[name]) {
                clearErrors?.(name);
              }
            }}
            className={`peer w-full px-4 py-3 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-all ${
              errors?.[name]
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-neutral-800 focus:border-[#FF6B35]"
            }`}
          />

          {/* Outlined Notch Label */}
          <label
            htmlFor={name}
            className={`absolute left-3 px-1.5 bg-neutral-900 text-xs font-medium transition-all duration-200 pointer-events-none rounded
              ${
                isFocused ||
                hasValue ||
                Boolean(value) ||
                type === "date" ||
                type === "Date" ||
                type === "time" ||
                type === "Time"
                  ? "-top-1 text-xs text-[#FF6B35]"
                  : "top-6 text-sm text-neutral-500 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#FF6B35]"
              }`}
          >
            {label} {required && <span className="text-[#FF6B35]">*</span>}
          </label>
        </div>
      )}

      {errors?.[name] && (
        <span className="text-red-500 text-xs mt-1 block pl-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
