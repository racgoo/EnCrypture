import { Result } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

function MobileBlockPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#22222",
        padding: "16px",
      }}
    >
      <Result
        status="403"
        title="모바일 미지원"
        subTitle={
          <Text>
            EnCrypture는 현재 모바일 환경을 지원하지 않습니다.
            <br />
            PC에서 접속해 주세요.
          </Text>
        }
        icon={<span style={{ fontSize: 48 }}>📵</span>}
      />
    </div>
  );
}

export default MobileBlockPage;
