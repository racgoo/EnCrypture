import { useCallback, useState } from "react";
import type { RcFile } from "antd/es/upload";
import { message, Upload } from "antd";
import { MAX_FILE_SIZE } from "../constants";

function useFile() {
  const [files, setFiles] = useState<RcFile[]>([]);

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
      message.error("100MB를 초과하는 파일은 업로드할 수 없습니다.");
      return Upload.LIST_IGNORE;
    },
    [files]
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
