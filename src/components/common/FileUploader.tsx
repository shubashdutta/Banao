// "use client";

// import React, { DragEvent, useRef, useState } from "react";
// import {
//   AlertCircle,
//   CheckCircle2,
//   File,
//   FileImage,
//   FileSpreadsheet,
//   FileText,
//   Loader2,
//   Trash2,
//   Upload,
//   X,
// } from "lucide-react";
// import { UploadedFile, FileInputType } from "@/hooks/useFileInput";

// interface FileUploaderProps {
//   value: UploadedFile[];
//   onChange: (files: FileList | File[]) => void;
//   onRemove: (index: number) => void;

//   loading?: boolean;
//   error?: string | null;

//   type?: FileInputType;

//   multiple?: boolean;
//   maxFiles?: number;

//   disabled?: boolean;

//   className?: string;

//   label?: string;
//   description?: string;

//   showFileList?: boolean;
// }

// const FILE_ACCEPT: Record<FileInputType, string> = {
//   PHOTO: "image/jpeg,image/png,image/webp,image/gif",

//   DOCUMENT: ".pdf,.doc,.docx",

//   PDF: ".pdf",

//   EXCEL: ".xls,.xlsx",

//   CSV: ".csv",

//   VIDEO: "video/mp4,video/webm,video/quicktime",

//   AUDIO: "audio/mpeg,audio/wav,audio/ogg,audio/mp4",

//   ANY: "*/*",
// };

// const FILE_DESCRIPTION: Record<FileInputType, string> = {
//   PHOTO: "JPG, PNG, WEBP or GIF",

//   DOCUMENT: "PDF, DOC or DOCX",

//   PDF: "PDF files",

//   EXCEL: "XLS or XLSX",

//   CSV: "CSV files",

//   VIDEO: "MP4, WebM or MOV",

//   AUDIO: "MP3, WAV, OGG or M4A",

//   ANY: "Any file type",
// };

// const getFileIcon = (file: UploadedFile) => {
//   const type = file.type || "";

//   if (type.startsWith("image/")) {
//     return <FileImage className="h-5 w-5" />;
//   }

//   if (
//     type.includes("spreadsheet") ||
//     type.includes("excel") ||
//     file.name.endsWith(".csv")
//   ) {
//     return <FileSpreadsheet className="h-5 w-5" />;
//   }

//   if (
//     type.includes("pdf") ||
//     type.includes("document") ||
//     file.name.endsWith(".doc") ||
//     file.name.endsWith(".docx")
//   ) {
//     return <FileText className="h-5 w-5" />;
//   }

//   return <File className="h-5 w-5" />;
// };

// const formatFileSize = (bytes?: number) => {
//   if (!bytes) return "";

//   if (bytes < 1024) {
//     return `${bytes} B`;
//   }

//   if (bytes < 1024 * 1024) {
//     return `${(bytes / 1024).toFixed(1)} KB`;
//   }

//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// };

// export default function FileUploader({
//   value,
//   onChange,
//   onRemove,
//   loading = false,
//   error = null,
//   type = "ANY",
//   multiple = false,
//   maxFiles = 10,
//   disabled = false,
//   className = "",
//   label = "Upload file",
//   description,
//   showFileList = true,
// }: FileUploaderProps) {
//   const inputRef = useRef<HTMLInputElement>(null);

//   const [dragging, setDragging] = useState(false);

//   const canUploadMore =
//     !disabled &&
//     !loading &&
//     (multiple ? value.length < maxFiles : value.length === 0);

//   const handleClick = () => {
//     if (!canUploadMore) return;

//     inputRef.current?.click();
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.target.files?.length) {
//       return;
//     }

//     onChange(event.target.files);

//     /*
//      * Reset input so the same file
//      * can be selected again.
//      */
//     event.target.value = "";
//   };

//   const handleDrop = (event: DragEvent<HTMLDivElement>) => {
//     event.preventDefault();

//     setDragging(false);

//     if (!canUploadMore) return;

//     const droppedFiles = event.dataTransfer.files;

//     if (!droppedFiles.length) return;

//     onChange(droppedFiles);
//   };

//   const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
//     event.preventDefault();

//     if (canUploadMore) {
//       setDragging(true);
//     }
//   };

//   const handleDragLeave = () => {
//     setDragging(false);
//   };

//   return (
//     <div className={`w-full ${className}`}>
//       {label && (
//         <div className="mb-2">
//           <label className="text-sm font-medium text-neutral-800">
//             {label}
//           </label>

//           {description && (
//             <p className="mt-0.5 text-xs text-neutral-400">{description}</p>
//           )}
//         </div>
//       )}

//       <input
//         ref={inputRef}
//         type="file"
//         accept={FILE_ACCEPT[type]}
//         multiple={multiple}
//         disabled={disabled || loading}
//         onChange={handleChange}
//         className="hidden"
//       />

//       {canUploadMore && (
//         <div
//           onClick={handleClick}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           className={`
//             flex
//             min-h-[150px]
//             cursor-pointer
//             flex-col
//             items-center
//             justify-center
//             rounded-xl
//             border
//             border-dashed
//             px-6
//             py-8
//             text-center
//             transition-all
//             ${
//               dragging
//                 ? "border-[#FF6B35] bg-orange-50"
//                 : "border-neutral-300 bg-white hover:border-[#FF6B35] hover:bg-orange-50/40"
//             }
//           `}
//         >
//           <div
//             className="
//               mb-3
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-full
//               bg-orange-50
//               text-[#FF6B35]
//             "
//           >
//             {loading ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               <Upload className="h-5 w-5" />
//             )}
//           </div>

//           <p className="text-sm font-semibold text-neutral-800">
//             {loading ? "Uploading..." : "Click to upload or drag and drop"}
//           </p>

//           <p className="mt-1 text-xs text-neutral-400">
//             {FILE_DESCRIPTION[type]}
//           </p>

//           {multiple && (
//             <p className="mt-1 text-xs text-neutral-400">
//               Maximum {maxFiles} files
//             </p>
//           )}
//         </div>
//       )}

//       {showFileList && value.length > 0 && (
//         <div className="mt-3 space-y-2">
//           {value.map((file, index) => (
//             <div
//               key={`${file.name}-${index}`}
//               className="
//                   flex
//                   items-center
//                   gap-3
//                   rounded-lg
//                   border
//                   border-neutral-200
//                   bg-white
//                   px-3
//                   py-3
//                 "
//             >
//               <div
//                 className="
//                     flex
//                     h-9
//                     w-9
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-lg
//                     bg-neutral-100
//                     text-neutral-500
//                   "
//               >
//                 {getFileIcon(file)}
//               </div>

//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-sm font-medium text-neutral-800">
//                   {file.name}
//                 </p>

//                 {file.size && (
//                   <p className="text-xs text-neutral-400">
//                     {formatFileSize(file.size)}
//                   </p>
//                 )}
//               </div>

//               <CheckCircle2
//                 className="
//                     h-4
//                     w-4
//                     shrink-0
//                     text-emerald-500
//                   "
//               />

//               <button
//                 type="button"
//                 onClick={() => onRemove(index)}
//                 disabled={disabled || loading}
//                 className="
//                     flex
//                     h-8
//                     w-8
//                     shrink-0
//                     items-center
//                     justify-center
//                     rounded-lg
//                     text-neutral-400
//                     transition
//                     hover:bg-red-50
//                     hover:text-red-500
//                     disabled:cursor-not-allowed
//                     disabled:opacity-50
//                   "
//               >
//                 <Trash2 className="h-4 w-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {error && (
//         <div
//           className="
//             mt-3
//             flex
//             items-start
//             gap-2
//             rounded-lg
//             border
//             border-red-100
//             bg-red-50
//             px-3
//             py-2.5
//           "
//         >
//           <AlertCircle
//             className="
//               mt-0.5
//               h-4
//               w-4
//               shrink-0
//               text-red-500
//             "
//           />

//           <p className="text-xs font-medium text-red-600">{error}</p>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import React, { DragEvent, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
  Loader2,
  Trash2,
  Upload,
} from "lucide-react";
import { UploadedFile, FileInputType } from "@/hooks/useFileInput";

interface FileUploaderProps {
  value: UploadedFile[];
  onChange: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;

  loading?: boolean;
  error?: string | null;

  type?: FileInputType;

  multiple?: boolean;
  maxFiles?: number;

  disabled?: boolean;

  className?: string;

  label?: string;
  description?: string;

  showFileList?: boolean;
}

const FILE_ACCEPT: Record<FileInputType, string> = {
  PHOTO: "image/jpeg,image/png,image/webp,image/gif",
  DOCUMENT: ".pdf,.doc,.docx",
  PDF: ".pdf",
  EXCEL: ".xls,.xlsx",
  CSV: ".csv",
  VIDEO: "video/mp4,video/webm,video/quicktime",
  AUDIO: "audio/mpeg,audio/wav,audio/ogg,audio/mp4",
  ANY: "*/*",
};

const FILE_DESCRIPTION: Record<FileInputType, string> = {
  PHOTO: "JPG, PNG, WEBP or GIF",
  DOCUMENT: "PDF, DOC or DOCX",
  PDF: "PDF files",
  EXCEL: "XLS or XLSX",
  CSV: "CSV files",
  VIDEO: "MP4, WebM or MOV",
  AUDIO: "MP3, WAV, OGG or M4A",
  ANY: "Any file type",
};

const getFileIcon = (file: UploadedFile) => {
  const type = file.type || "";
  const fileName = file.name.toLowerCase();

  if (type.startsWith("image/")) {
    return <FileImage className="h-5 w-5" />;
  }

  if (
    type.includes("spreadsheet") ||
    type.includes("excel") ||
    fileName.endsWith(".xls") ||
    fileName.endsWith(".xlsx") ||
    fileName.endsWith(".csv")
  ) {
    return <FileSpreadsheet className="h-5 w-5" />;
  }

  if (
    type.includes("pdf") ||
    type.includes("document") ||
    fileName.endsWith(".pdf") ||
    fileName.endsWith(".doc") ||
    fileName.endsWith(".docx")
  ) {
    return <FileText className="h-5 w-5" />;
  }

  return <File className="h-5 w-5" />;
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface ImagePreviewProps {
  file: UploadedFile;
}

const ImagePreview = ({ file }: ImagePreviewProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file.url) {
      setPreview(file.url);
      return;
    }

    if (file.file && file.type?.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file.file);

      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreview(null);
  }, [file]);

  if (!preview) {
    return (
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-neutral-100
          text-neutral-500
        "
      >
        <FileImage className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div
      className="
        h-12
        w-12
        shrink-0
        overflow-hidden
        rounded-lg
        border
        border-neutral-200
        bg-neutral-100
      "
    >
      <img
        src={preview}
        alt={file.name}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default function FileUploader({
  value,
  onChange,
  onRemove,
  loading = false,
  error = null,
  type = "ANY",
  multiple = false,
  maxFiles = 10,
  disabled = false,
  className = "",
  label = "Upload file",
  description,
  showFileList = true,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const canUploadMore =
    !disabled &&
    !loading &&
    (multiple ? value.length < maxFiles : value.length === 0);

  const handleClick = () => {
    if (!canUploadMore) return;

    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    onChange(event.target.files);

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    setDragging(false);

    if (!canUploadMore) return;

    const droppedFiles = event.dataTransfer.files;

    if (!droppedFiles.length) return;

    onChange(droppedFiles);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (canUploadMore) {
      setDragging(true);
    }
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-2">
          <label className="text-sm font-medium text-neutral-800">
            {label}
          </label>

          {description && (
            <p className="mt-0.5 text-xs text-neutral-400">{description}</p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={FILE_ACCEPT[type]}
        multiple={multiple}
        disabled={disabled || loading}
        onChange={handleChange}
        className="hidden"
      />

      {canUploadMore && (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            flex
            min-h-[150px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            px-6
            py-8
            text-center
            transition-all
            ${
              dragging
                ? "border-[#FF6B35] bg-orange-50"
                : "border-neutral-300 bg-white hover:border-[#FF6B35] hover:bg-orange-50/40"
            }
          `}
        >
          <div
            className="
              mb-3
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-orange-50
              text-[#FF6B35]
            "
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </div>

          <p className="text-sm font-semibold text-neutral-800">
            {loading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>

          <p className="mt-1 text-xs text-neutral-400">
            {FILE_DESCRIPTION[type]}
          </p>

          {multiple && (
            <p className="mt-1 text-xs text-neutral-400">
              Maximum {maxFiles} files
            </p>
          )}
        </div>
      )}

      {showFileList && value.length > 0 && (
        <div className="mt-3 space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-neutral-200
                bg-white
                px-3
                py-3
              "
            >
              {file.type?.startsWith("image/") ? (
                <ImagePreview file={file} />
              ) : (
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-neutral-100
                    text-neutral-500
                  "
                >
                  {getFileIcon(file)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-800">
                  {file.name}
                </p>

                {file.size && (
                  <p className="text-xs text-neutral-400">
                    {formatFileSize(file.size)}
                  </p>
                )}
              </div>

              <CheckCircle2
                className="
                  h-4
                  w-4
                  shrink-0
                  text-emerald-500
                "
              />

              <button
                type="button"
                onClick={() => onRemove(index)}
                disabled={disabled || loading}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div
          className="
            mt-3
            flex
            items-start
            gap-2
            rounded-lg
            border
            border-red-100
            bg-red-50
            px-3
            py-2.5
          "
        >
          <AlertCircle
            className="
              mt-0.5
              h-4
              w-4
              shrink-0
              text-red-500
            "
          />

          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}
