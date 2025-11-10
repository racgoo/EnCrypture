import { useCallback, useState } from "react";
import type { RcFile } from "antd/es/upload";
import { message, Upload } from "antd";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_STRING } from "../constants";
import { useLocale } from "@shares/locale";
import { localeTable } from "../locale";
import { useReactiveRef } from "@racgoo/reactive-kit/react";

function useFile() {
  const { t } = useLocale(localeTable);
  // reactive ref for files
  const fileRef = useReactiveRef<RcFile[]>([]);

  const addFile = useCallback((file: RcFile) => {
    // calculate current total size
    const currentTotalSize = fileRef.current.reduce((totalSize, file) => {
      totalSize += file.size ?? 0;
      return totalSize;
    }, 0);

    //file size check
    if (currentTotalSize + (file.size ?? 0) <= MAX_FILE_SIZE) {
      // add file to reactive ref
      fileRef.current.push(file);
      return file;
    }

    // show error message
    message.error(MAX_FILE_SIZE_STRING + t("file_size_error_message"));
    return Upload.LIST_IGNORE;
  }, []);

  const deleteFile = useCallback((file: RcFile) => {
    fileRef.current = fileRef.current.filter((f) => f.uid !== file.uid);
  }, []);

  const clearFiles = useCallback(() => {
    fileRef.current = [];
  }, []);

  return { fileRef, addFile, deleteFile, clearFiles };
}
export { useFile };
