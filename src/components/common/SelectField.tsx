// "use client";

// import React, { type FC } from "react";
// import { Controller } from "react-hook-form";
// import { Select } from "antd";
// import type { SelectProps } from "antd";

// interface SelectFieldProps {
//   control: any;
//   errors?: any;
//   label?: string;
//   name: string;
//   classname?: string;
//   defaultValue?: any;
//   isDisabled?: boolean;
//   isMulti?: boolean;
//   isRequired?: boolean;
//   options: SelectProps["options"];
//   validation?: any;
//   placeholder?: string;
//   loading?: boolean;
//   showSearch?: boolean;
//   allowClear?: boolean;
//   size?: "small" | "middle" | "large";
//   mode?: "multiple" | "tags";
//   onChange?: (value: any) => void;
// }

// const SelectField: FC<SelectFieldProps> = ({
//   control,
//   errors,
//   label,
//   name,
//   classname,
//   defaultValue,
//   isDisabled = false,
//   isMulti = false,
//   isRequired = false,
//   options,
//   validation,
//   placeholder = "Select...",
//   loading = false,
//   showSearch = false,
//   allowClear = true,
//   size = "middle",
//   mode,
//   onChange,
// }) => {
//   const error = errors?.[name]?.message;

//   return (
//     <div className={`${classname ?? ""} flex flex-col`}>
//       {label && (
//         <label className="mb-1 text-sm font-medium text-neutral-700">
//           {label}
//           {isRequired && <span className="ml-1 text-red-500">*</span>}
//         </label>
//       )}

//       <Controller
//         name={name}
//         control={control}
//         rules={validation}
//         defaultValue={defaultValue}
//         render={({ field }) => (
//           <Select
//             {...field}
//             value={field.value ?? (isMulti ? [] : undefined)}
//             options={options}
//             mode={mode ?? (isMulti ? "multiple" : undefined)}
//             disabled={isDisabled}
//             placeholder={placeholder}
//             loading={loading}
//             showSearch={showSearch}
//             allowClear={allowClear}
//             size={size}
//             className="w-full"
//             onChange={(value) => {
//               field.onChange(value);
//               onChange?.(value);
//             }}
//             onBlur={field.onBlur}
//             filterOption={(input, option) =>
//               String(option?.label ?? "")
//                 .toLowerCase()
//                 .includes(input.toLowerCase())
//             }
//             getPopupContainer={() => document.body}
//           />
//         )}
//       />

//       {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
//     </div>
//   );
// };

// export default SelectField;

"use client";

import React, { type FC } from "react";
import { Controller } from "react-hook-form";
import { Select, ConfigProvider } from "antd";
import type { SelectProps } from "antd";

interface SelectFieldProps {
  control: any;
  errors?: any;
  label?: string;
  name: string;
  classname?: string;
  defaultValue?: any;
  isDisabled?: boolean;
  isMulti?: boolean;
  isRequired?: boolean;
  options: SelectProps["options"];
  validation?: any;
  placeholder?: string;
  loading?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  size?: "small" | "middle" | "large";
  mode?: "multiple" | "tags";
  onChange?: (value: any) => void;
}

const SelectField: FC<SelectFieldProps> = ({
  control,
  errors,
  label,
  name,
  classname,
  defaultValue,
  isDisabled = false,
  isMulti = false,
  isRequired = false,
  options,
  validation,
  placeholder = "Select...",
  loading = false,
  showSearch = false,
  allowClear = true,
  size = "middle",
  mode,
  onChange,
}) => {
  const error = errors?.[name]?.message;
  const isMultipleMode = mode === "multiple" || mode === "tags" || isMulti;

  return (
    <div className={`${classname ?? ""} flex flex-col`}>
      {label && (
        <label className="mb-1 text-sm font-medium text-neutral-700">
          {label}
          {isRequired && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF6B35",
            colorInfo: "#FF6B35",
            borderRadius: 8,
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          rules={validation}
          defaultValue={defaultValue ?? (isMultipleMode ? [] : undefined)}
          render={({ field }) => {
            let formattedValue = field.value;
            if (isMultipleMode) {
              if (!Array.isArray(formattedValue)) {
                formattedValue = formattedValue ? [formattedValue] : [];
              }
              formattedValue = formattedValue.filter(
                (val: any) => val !== "" && val != null,
              );
            } else {
              if (formattedValue === "" || formattedValue === null) {
                formattedValue = undefined;
              }
            }

            return (
              <Select
                {...field}
                value={formattedValue}
                options={options}
                mode={mode ?? (isMulti ? "multiple" : undefined)}
                disabled={isDisabled}
                placeholder={placeholder}
                loading={loading}
                showSearch={showSearch}
                allowClear={allowClear}
                size={size}
                className="w-full"
                onChange={(value) => {
                  field.onChange(value);
                  onChange?.(value);
                }}
                onBlur={field.onBlur}
                filterOption={(input, option) =>
                  String(option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                getPopupContainer={() => document.body}
              />
            );
          }}
        />
      </ConfigProvider>

      {error && <div className="mt-1 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default SelectField;
