// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { formats, TextAreaModules } from "@/lib/TextAreaModules";
// import { TextAreaProps } from "@/lib/type";
// import React, { useRef } from "react";
// import { Controller, FieldValues } from "react-hook-form";

// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// const TextArea = <T extends FieldValues>({
//   control,
//   errors,
//   label,
//   name,
//   className = "",
//   defaultValue = "",
//   isRequired = false,
//   validation,
//   height,
// }: TextAreaProps<T>) => {
//   const quillRef = useRef<any>(null);

//   const imageHandler = () => {
//     const input = document.createElement("input");

//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files?.[0];

//       if (file && quillRef.current) {
//         const reader = new FileReader();

//         reader.onload = () => {
//           const quill = quillRef.current.getEditor();
//           const range = quill.getSelection(true);

//           if (range) {
//             quill.insertEmbed(range.index, "image", reader.result);
//             quill.setSelection(range.index + 1);
//           }
//         };

//         reader.readAsDataURL(file);
//       }
//     };
//   };

//   const enhancedModules = {
//     ...TextAreaModules,
//     toolbar: {
//       container: TextAreaModules.toolbar,
//       handlers: {
//         image: imageHandler,
//       },
//     },
//   };

//   return (
//     <div className={`mb-3 ${className}`}>
//       <label className="mb-2 block text-sm font-medium">
//         {label}

//         {isRequired && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <Controller
//         name={name}
//         control={control}
//         defaultValue={defaultValue as any}
//         rules={{
//           ...validation,

//           validate: (value) => {
//             if (!isRequired && !validation?.required) {
//               return true;
//             }

//             const text = value
//               ?.replace(/<[^>]*>/g, "")
//               .replace(/&nbsp;/g, "")
//               .trim();

//             return text?.length > 0 || "Remarks is Required";
//           },
//         }}
//         render={({ field }) => (
//           <ReactQuill
//             ref={quillRef}
//             value={field.value || ""}
//             formats={formats}
//             modules={enhancedModules}
//             onChange={field.onChange}
//             onBlur={field.onBlur}
//             style={{
//               height: height || "150px",
//             }}
//           />
//         )}
//       />

//       {errors[name] && (
//         <div className="mt-2 flex items-center justify-center text-center text-sm text-red-600">
//           {(errors[name] as any)?.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextArea;

"use client";

import { formats, TextAreaModules } from "@/lib/TextAreaModules";
import { TextAreaProps } from "@/lib/type";
import React, { useRef } from "react";
import { Controller, FieldValues } from "react-hook-form";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextArea = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  className = "",
  defaultValue = "",
  isRequired = false,
  validation,
  height = "120px",
}: TextAreaProps<T>) => {
  const quillRef = useRef<any>(null);

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];

      if (file && quillRef.current) {
        const reader = new FileReader();

        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);

          if (range) {
            quill.insertEmbed(range.index, "image", reader.result);
            quill.setSelection(range.index + 1);
          }
        };

        reader.readAsDataURL(file);
      }
    };
  };

  const enhancedModules = {
    ...TextAreaModules,
    toolbar: {
      container: TextAreaModules.toolbar,
      handlers: {
        image: imageHandler,
      },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="mb-2 block text-sm font-medium">
        {label}

        {isRequired && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as any}
        rules={{
          ...validation,
          validate: (value) => {
            if (!isRequired && !validation?.required) {
              return true;
            }

            const text = value
              ?.replace(/<[^>]*>/g, "")
              .replace(/&nbsp;/g, "")
              .trim();

            return text?.length > 0 || "Remarks is Required";
          },
        }}
        render={({ field }) => (
          <div
            className="quill-editor"
            style={
              {
                "--quill-height": height,
              } as React.CSSProperties
            }
          >
            <ReactQuill
              ref={quillRef}
              value={field.value || ""}
              formats={formats}
              modules={enhancedModules}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          </div>
        )}
      />

      {errors[name] && (
        <div className="mt-2 flex items-center justify-center text-center text-sm text-red-600">
          {(errors[name] as any)?.message}
        </div>
      )}
    </div>
  );
};

export default TextArea;
