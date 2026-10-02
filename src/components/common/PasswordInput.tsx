/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, Lock } from "lucide-react";
import React, { FC, useState } from "react";

interface PasswordInputProps {
  register: any;
  label: string;
  errors: any;
  name: string;
  required?: boolean;
  disabled?: boolean;
  validation?: any;
  clearErrors?: (name?: any) => void;
}

const PasswordInput: FC<PasswordInputProps> = ({
  register,
  label,
  errors,
  name,
  required = false,
  disabled = false,
  validation,
  clearErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Destructure RHF registration — keep ref + name wired explicitly
  // so custom onChange/onBlur below don't override / drop them.
  const { onChange, onBlur, ref, name: regName } = register(name, validation);

  return (
    <div className="flex flex-col w-full space-y-1">
      <div className="relative w-full pt-2">
        {/* Optional Lock Icon on the left */}
        <div className="absolute inset-y-0 left-0 pl-3.5 pt-2 flex items-center pointer-events-none text-neutral-500 z-10">
          <Lock size={18} />
        </div>

        {/* Input Field */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder=""
          autoComplete="current-password"
          id={name}
          name={regName ?? name}
          disabled={disabled}
          ref={ref}
          onFocus={() => setIsFocused(true)}
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
          className={`peer w-full pl-10 pr-12 py-3 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none transition-all ${
            errors?.[name]
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-neutral-800 focus:border-[#FF6B35]"
          }`}
        />

        <label
          htmlFor={name}
          className={`absolute left-9 px-1.5 bg-neutral-900 text-xs font-medium transition-all duration-200 pointer-events-none rounded z-10
            ${
              isFocused || hasValue
                ? "-top-1 text-xs text-[#FF6B35]"
                : "top-6 text-sm text-neutral-500 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:-top-1 peer-focus:text-xs peer-focus:text-[#FF6B35]"
            }`}
        >
          {label} {required && <span className="text-[#FF6B35]">*</span>}
        </label>

        {/* Toggle Show/Hide Button on the right */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3.5 pt-2 flex items-center text-neutral-400 hover:text-white transition-colors cursor-pointer z-10"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {errors?.[name] && (
        <span className="text-red-500 text-xs mt-1 block pl-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
