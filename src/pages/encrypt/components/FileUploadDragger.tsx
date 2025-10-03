import { UploadOutlined } from "@ant-design/icons";
import { Typography, Upload } from "antd";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { useCallback } from "react";
import { localeTable } from "../locale";
import { useLocale } from "@shares/locale";

const { Text } = Typography;

interface FileUploadDraggerProps {
  files: RcFile[];
  handleAddFile: (file: RcFile) => RcFile | string;
  handleDeleteFile: (file: RcFile) => void;
  disabled: boolean;
}

function FileUploadDragger({
  files,
  handleAddFile,
  handleDeleteFile,
  disabled,
}: FileUploadDraggerProps) {
  const { t } = useLocale(localeTable);
  const handleChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      const { file } = info;
      if (file.status === "removed") {
        handleDeleteFile(file as RcFile);
      }
    },
    [handleDeleteFile]
  );

  return (
    <Upload.Dragger
      // multiple
      disabled={disabled}
      fileList={files}
      beforeUpload={handleAddFile}
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
