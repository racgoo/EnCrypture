import { Result } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

function NotFoundPage() {
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
        status="404"
        title="페이지를 찾을 수 없습니다"
        subTitle={
          <Text>
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            주소가 잘못되었거나, 존재하지 않는 페이지입니다.
            <br />
            메인 페이지로 이동해 주세요.
          </Text>
        }
        icon={<span style={{ fontSize: 48 }}>🔍</span>}
      />
    </div>
  );
}

export default NotFoundPage;
