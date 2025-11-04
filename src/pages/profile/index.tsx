import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "@features/user";

import { useLocale, useLocaleNavigate } from "@shares/locale";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Modal,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { ProfileLayout } from "./components/ProfileLayout";
import { localeTable } from "./locale";

const { Title, Text } = Typography;

function ProfilePage() {
  const { user, unRegister } = useUser();
  const navigate = useLocaleNavigate();
  const { t } = useLocale(localeTable);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 필요한 데이터 useState로
  const [profile, _] = useState({
    avatar: "",
    username: "EncryptureUser",
    email: "user@example.com",
    status: "active",
    joinDate: "2024-06-01",
    bio: "Hello! Welcome to my profile.",
  });

  const handleDeleteAccount = useCallback(async () => {
    setIsDeleting(true);
    try {
      await unRegister();
      navigate("/");
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  }, [unRegister, navigate, t]);

  if (!user) {
    navigate("/sign-in");
    return null;
  }

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
              {user.name}
            </Title>
            <Text type="secondary">
              <MailOutlined style={{ marginRight: 4 }} />
              {user.email}
            </Text>
          </Space>
        </Card>
        <Card
          title={t("profile_information") || "Profile Information"}
          style={{ width: "100%" }}
          bodyStyle={{ padding: 24 }}
        >
          <Descriptions column={1} size="middle">
            <Descriptions.Item label={t("profile_email") || "이메일"}>
              {user.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("profile_join_date") || "가입일"}>
              {dayjs(user.createdAt).format("YYYY-MM-DD")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card style={{ width: "100%", borderColor: "#ff4d4f" }} bordered>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text type="danger" strong>
              {t("profile_delete_account")}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {t("profile_delete_confirm_content")}
            </Text>
            <Button
              type="primary"
              danger
              onClick={() => setDeleteModalOpen(true)}
              style={{ width: "100%" }}
            >
              {t("profile_delete_account")}
            </Button>
          </Space>
        </Card>
      </Space>

      <Modal
        title={t("profile_delete_confirm_title")}
        open={deleteModalOpen}
        onOk={handleDeleteAccount}
        onCancel={() => setDeleteModalOpen(false)}
        okText={t("profile_delete_confirm_ok")}
        cancelText={t("profile_delete_confirm_cancel")}
        okButtonProps={{ danger: true, loading: isDeleting }}
        confirmLoading={isDeleting}
      >
        <p>{t("profile_delete_confirm_content")}</p>
      </Modal>
    </ProfileLayout>
  );
}

export { ProfilePage };
