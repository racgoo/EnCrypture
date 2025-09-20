import {
  FileProtectOutlined,
  FileTextOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Col, Row, Tag, Typography } from "antd";

import { OptionCard } from "./components/Card/OptionCard";
import { HomeHeader } from "./components/HomeHeader";
import { HomeLayout } from "./components/HomeLayout";
import { HomeFooter } from "./components/HomeFooter";

const { Title, Paragraph } = Typography;

const options = [
  {
    icon: <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />,
    title: <Title level={3}>클라이언트 전용</Title>,
    description: (
      <Paragraph>
        <FileProtectOutlined /> 파일을 <b>암호화된 HTML</b>로 변환하여 인터넷
        없이도 안전하게 열람할 수 있습니다.
        <br />
        <FileTextOutlined /> <b>암호화된 HTML</b>과 <b>열람 가능한 문서</b>를
        함께 제공합니다.
      </Paragraph>
    ),
    tags: [
      <Tag color="blue">클라이언트 전용</Tag>,
      <Tag color="success">100% 오프라인</Tag>,
      <Tag color="processing">빠른 변환</Tag>,
    ],
    href: "/encrypt/client",
    disabled: false,
  },
  {
    icon: <LockOutlined style={{ fontSize: 48, color: "#1677ff" }} />,
    title: <Title level={3}>온라인 암호화</Title>,
    description: (
      <Paragraph>
        <FileProtectOutlined /> 서버를 통한 <b>고급 암호화</b> 및{" "}
        <b>문서 관리</b> 기능을 제공합니다.
      </Paragraph>
    ),
    tags: [
      <Tag color="cyan">서버 전용</Tag>,
      <Tag color="warning">인터넷 필요</Tag>,
      <Tag color="default">고급 기능</Tag>,
    ],
    href: "/encrypt/server",
    disabled: true,
  },
];

function HomePage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <Row gutter={32} justify="center">
        {options.map((option) => (
          <Col xs={24} md={10} key={option.href}>
            <OptionCard {...option} />
          </Col>
        ))}
      </Row>
      <HomeFooter />
    </HomeLayout>
  );
}

export { HomePage };
