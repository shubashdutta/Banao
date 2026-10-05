import { useCallback, useState } from "react";

export type FileInputType =
  | "PHOTO"
  | "DOCUMENT"
  | "PDF"
  | "EXCEL"
  | "CSV"
  | "VIDEO"
  | "AUDIO"
  | "ANY";

export interface UploadedFile {
  id?: string;
  name: string;
  url?: string;
  size?: number;
  type?: string;
  file?: File;
}

const FILE_RULES: Record<
  FileInputType,
  {
    accept: string[];
    maxSize: number;
  }
> = {
  PHOTO: {
    accept: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxSize: 5 * 1024 * 1024,
  },

  DOCUMENT: {
    accept: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxSize: 10 * 1024 * 1024,
  },

  PDF: {
    accept: ["application/pdf"],
    maxSize: 10 * 1024 * 1024,
  },

  EXCEL: {
    accept: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    maxSize: 10 * 1024 * 1024,
  },

  CSV: {
    accept: ["text/csv", "application/csv"],
    maxSize: 10 * 1024 * 1024,
  },

  VIDEO: {
    accept: ["video/mp4", "video/webm", "video/quicktime"],
    maxSize: 50 * 1024 * 1024,
  },

  AUDIO: {
    accept: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"],
    maxSize: 20 * 1024 * 1024,
  },

  ANY: {
    accept: ["*/*"],
    maxSize: 50 * 1024 * 1024,
  },
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const isValidFileType = (file: File, allowedTypes: string[]) => {
  if (allowedTypes.includes("*/*")) {
    return true;
  }

  return allowedTypes.includes(file.type);
};

export const useFileInput = (
  initialFiles: UploadedFile[] | null = null,
  fileType: FileInputType = "ANY",
) => {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles || []);

  const [loadingFiles, setLoadingFiles] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const rules = FILE_RULES[fileType];

  const handleFilesChange = useCallback(
    async (selectedFiles: FileList | File[]) => {
      setError(null);

      const incomingFiles = Array.from(selectedFiles);

      if (!incomingFiles.length) {
        return;
      }

      const validFiles: UploadedFile[] = [];

      for (const file of incomingFiles) {
        if (!isValidFileType(file, rules.accept)) {
          setError(
            `${file.name} is not a valid ${fileType.toLowerCase()} file.`,
          );
          continue;
        }

        if (file.size > rules.maxSize) {
          setError(
            `${file.name} exceeds the maximum size of ${formatFileSize(
              rules.maxSize,
            )}.`,
          );
          continue;
        }

        validFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          file,
        });
      }

      if (!validFiles.length) {
        return;
      }

      setLoadingFiles(true);

      try {
        /*
         * If you have an API upload here, call it here.
         *
         * Example:
         *
         * const formData = new FormData();
         * formData.append("file", file);
         *
         * const response = await api.post("/upload", formData);
         *
         * validFiles.push({
         *   id: response.data.id,
         *   name: response.data.name,
         *   url: response.data.url,
         * });
         */

        setFiles((previousFiles) => [...previousFiles, ...validFiles]);
      } finally {
        setLoadingFiles(false);
      }
    },
    [fileType, rules],
  );

  const removeFiles = useCallback(async (fileIndex: number) => {
    setError(null);

    setFiles((previousFiles) =>
      previousFiles.filter((_, index) => index !== fileIndex),
    );
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  return [
    files,
    handleFilesChange,
    removeFiles,
    setFiles,
    loadingFiles,
    error,
    clearFiles,
  ] as const;
};
