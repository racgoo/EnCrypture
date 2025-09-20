import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function StartButton({ disabled, href }: { disabled: boolean; href: string }) {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  if (disabled) {
    return (
      <Button
        type="default"
        size="large"
        block
        disabled
        style={{ marginTop: 16 }}
      >
        <Space>
          Coming Soon
          <Tooltip title="곧 제공 예정입니다!">
            <InfoCircleOutlined />
          </Tooltip>
        </Space>
      </Button>
    );
  }

  return (
    <Button
      type="primary"
      size="large"
      block
      style={{ marginTop: 16 }}
      onClick={onClick}
    >
      시작하기
    </Button>
  );
}

export { StartButton };
