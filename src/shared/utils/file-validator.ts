import type { SupportedFileTypes } from "@/features/summary/types";

export const isValidFileType = (filename: string, acceptedTypes: SupportedFileTypes[]) => {
  const extension = filename.toLowerCase().slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  return acceptedTypes.includes(`.${extension}` as SupportedFileTypes);
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB