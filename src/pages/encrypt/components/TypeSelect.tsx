import { Radio, type RadioChangeEvent } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { CloudServerOutlined } from "@ant-design/icons";
import { useType } from "../hooks/useType";

function TypeSelect() {
  const { type, changeType } = useType();

  const handleTypeChange = (e: RadioChangeEvent) => {
    const targetType = e.target.value;
    changeType(targetType);
  };

  return (
    <Radio.Group
      value={type}
      onChange={handleTypeChange}
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
      }}
      size="large"
    >
      <Radio.Button
        value="client"
        style={{ padding: "0 32px", height: "auto" }}
      >
        <LockOutlined style={{ marginRight: 8 }} />
        Client
      </Radio.Button>
      <Radio.Button
        value="server"
        style={{ padding: "0 32px", height: "auto" }}
      >
        <CloudServerOutlined style={{ marginRight: 8 }} />
        Server
      </Radio.Button>
    </Radio.Group>
  );
}

export { TypeSelect };
