import { AuthButton, getOauthURL } from "@features/auth";
import { Col, Divider, Row } from "antd";
import { motion } from "motion/react";
function SignInButtons() {
  const handleSignInWithGoogle = () => {
    window.location.href = getOauthURL("google");
  };

  const handleSignInWithGithub = () => {
    window.location.href = getOauthURL("github");
  };
  return (
    <>
      <Divider style={{ margin: "24px 0 20px 0" }} />
      <Row gutter={[0, 12]} justify="center" align="middle">
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
            <AuthButton
              provider="google"
              text="Sign in with Google"
              onClick={handleSignInWithGoogle}
            />
          </motion.div>
        </Col>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
            <AuthButton
              provider="github"
              text="Sign in with Github"
              onClick={handleSignInWithGithub}
            />
          </motion.div>
        </Col>
      </Row>
    </>
  );
}

export { SignInButtons };
