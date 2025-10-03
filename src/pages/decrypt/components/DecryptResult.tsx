import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { downloadFile } from "@features/file";
import { useLocale } from "@shares/locale";
import { Button, Space, Tooltip, Typography } from "antd";
import { localeTable } from "../locale";
const { Text } = Typography;

interface DecryptResultProps {
  success: boolean;
  files: File[];
}

function downloadAllFiles(files: File[]) {
  files.forEach((file, idx) => {
    setTimeout(() => downloadFile(file), idx * 200);
  });
}

function DecryptResult({ files, success }: DecryptResultProps) {
  const { t } = useLocale(localeTable);

  if (!success) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 900,
        minWidth: 600,
        margin: "0 auto",
        background: "#181818",
        borderRadius: 12,
        padding: "32px 40px",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          marginBottom: 24,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text strong style={{ fontSize: 20 }}>
          {t("decrypt_result_title")}
        </Text>
        <Tooltip title={t("decrypt_result_download_all_files_tooltip")}>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => downloadAllFiles(files)}
            disabled={files.length === 0}
            style={{
              background: "#1677ff",
              borderColor: "#1677ff",
              fontWeight: 600,
              fontSize: 16,
              padding: "0 24px",
            }}
          >
            {t("decrypt_result_download_all_files_text")}
          </Button>
        </Tooltip>
      </div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {files.map((file, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#232323",
              borderRadius: 8,
              padding: "16px 20px",
              minHeight: 56,
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            }}
          >
            <Text
              style={{
                color: "#fff",
                flex: 1,
                fontSize: 16,
                wordBreak: "break-all",
              }}
            >
              {file.name}
            </Text>
            <Tooltip title={t("decrypt_result_download_file_tooltip")}>
              <Button
                type="link"
                icon={<CloudDownloadOutlined twoToneColor="#1677ff,#fff" />}
                onClick={() => downloadFile(file)}
                style={{ color: "#1677ff", fontWeight: 500, fontSize: 15 }}
              >
                {t("single_download_button_text")}
              </Button>
            </Tooltip>
          </div>
        ))}
      </Space>
    </div>
  );
}

export { DecryptResult };
