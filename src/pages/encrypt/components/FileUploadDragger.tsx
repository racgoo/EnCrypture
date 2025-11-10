import { UploadOutlined } from "@ant-design/icons";
import { Typography, Upload } from "antd";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useCallback } from "react";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";
import { useReactiveState, type ReactiveRef } from "@racgoo/reactive-kit/react";

const { Text } = Typography;

interface FileUploadDraggerProps {
  fileRef: ReactiveRef<RcFile[]>;
  addFile: (file: RcFile) => File | string;
  deleteFile: (file: RcFile) => void;
  disabled: boolean;
}

function FileUploadDragger({
  fileRef,
  addFile,
  deleteFile,
  disabled,
}: FileUploadDraggerProps) {
  const { t } = useLocale(localeTable);
  // reactive state for files(only rendering)
  const files = useReactiveState(fileRef);

  // handle file change
  const handleChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      const { file } = info;
      if (file.status === "removed") {
        deleteFile(file as RcFile);
      }
    },
    [deleteFile]
  );

  return (
    <Upload.Dragger
      // multiple
      disabled={disabled}
      fileList={files}
      beforeUpload={addFile}
      onChange={handleChange}
      accept="*"
      style={{
        borderRadius: 12,
        borderColor: "#1677ff33",
      }}
    >
      <p style={{ margin: 0 }}>
        <UploadOutlined style={{ fontSize: 32, color: "#1677ff" }} />
      </p>
      <Text strong>{t("file_upload_dragger_text")}</Text>
    </Upload.Dragger>
  );
}

export { FileUploadDragger };
