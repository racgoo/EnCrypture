import { useState } from "react";
import {
  Avatar,
  Card,
  Typography,
  Button,
  Space,
  Divider,
  Descriptions,
  Tag,
  message,
} from "antd";
import { EditOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useLocale } from "@shares/locale";
import { ProfileLayout } from "./components/ProfileLayout";
import { localeTable } from "./locale";

const { Title, Text } = Typography;

function ProfilePage() {
  const { t } = useLocale(localeTable);

  // 필요한 데이터 useState로
  const [profile, setProfile] = useState({
    avatar: "",
    username: "EncryptureUser",
    email: "user@example.com",
    status: "active",
    joinDate: "2024-06-01",
    bio: "Hello! Welcome to my profile.",
  });

  const handleEditProfile = () => {
    message.info(t("profile_edit_click") || "Edit profile 클릭됨!");
  };

  return (
    <ProfileLayout>
      <Space
        direction="vertical"
        style={{ width: "100%", maxWidth: 500, margin: "0 auto" }}
        size="large"
      >
        <Card
          style={{ width: "100%" }}
          bordered={false}
          bodyStyle={{ padding: 32 }}
        >
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Avatar
              size={96}
              src={profile.avatar || undefined}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#b6e3ff", marginBottom: 12 }}
            />
            <Title level={3} style={{ marginBottom: 0 }}>
              {profile.username}
            </Title>
            <Text type="secondary">
              <MailOutlined style={{ marginRight: 4 }} />
              {profile.email}
            </Text>

            <Tag
              color={profile.status === "active" ? "success" : "default"}
              style={{ marginTop: 8 }}
            >
              {profile.status === "active"
                ? t("profile_active") || "Active"
                : t("profile_inactive") || "Inactive"}
            </Tag>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={handleEditProfile}
            >
              {t("profile_edit") || "프로필 편집"}
            </Button>
          </Space>
        </Card>
        <Card
          title={t("profile_information") || "Profile Information"}
          style={{ width: "100%" }}
          bodyStyle={{ padding: 24 }}
        >
          <Descriptions column={1} size="middle">
            <Descriptions.Item label={t("profile_username") || "닉네임"}>
              {profile.username}
            </Descriptions.Item>
            <Descriptions.Item label={t("profile_email") || "이메일"}>
              {profile.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("profile_join_date") || "가입일"}>
              {profile.joinDate}
            </Descriptions.Item>
            <Descriptions.Item label={t("profile_bio") || "소개"}>
              {profile.bio}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Space>
    </ProfileLayout>
  );
}

export { ProfilePage };
