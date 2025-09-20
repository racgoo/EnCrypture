import { useType } from "../hooks/useType";
import { Typography } from "antd";
const { Text } = Typography;

function TypeDescription() {
  const { type } = useType();
  if (type === "client") {
    return (
      <Text
        type="secondary"
        style={{
          textAlign: "center",
          display: "block",
        }}
      >
        Argon2 알고리즘을 사용합니다.
        <br />
        최소 암호 해독 시간을 보장하여 무차별 대입 공격에 안전합니다.
      </Text>
    );
  }
  if (type === "server") {
    return (
      <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
        해싱된 사용자의 암호가 서버에 저장되어 열람 기간, 암호 입력 시도 제한 등
        다양한 보안 기능을 제공합니다.
      </Text>
    );
  }
  return null;
}

export { TypeDescription };
