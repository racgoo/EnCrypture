import { useCallback, useState } from "react";
import type { RcFile } from "antd/es/upload";
import { message, Upload } from "antd";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_STRING } from "../constants";
import { useLocale } from "@shares/locale";
import { localeTable } from "../locale";

function useFile() {
  const [files, setFiles] = useState<RcFile[]>([]);
  const { t } = useLocale(localeTable);

  const handleAddFile = useCallback(
    (file: RcFile) => {
      const nextFiles = [...files, file];

      const totalSize = nextFiles.reduce((totalSize, file) => {
        totalSize += file.size ?? 0;
        return totalSize;
      }, 0);

      if (totalSize <= MAX_FILE_SIZE) {
        setFiles(nextFiles);
        return file;
      }
      message.error(MAX_FILE_SIZE_STRING + t("file_size_error_message"));
      return Upload.LIST_IGNORE;
    },
    [files, t]
  );

  const handleDeleteFile = useCallback(
    (file: RcFile) => {
      setFiles(files.filter((f) => f.uid !== file.uid));
    },
    [files]
  );

  return { files, handleAddFile, handleDeleteFile };
}
export { useFile };
