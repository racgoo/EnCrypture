import { Card, Col, Row } from "antd";
import { SignInLayout } from "./components/SignInLayout";
import { SignInHeader } from "./components/SignInHeader";
import { SignInButtons } from "./components/SignInButtons";
import { SignInFooter } from "./components/SignInFooter";
import { motion } from "motion/react";

function SignInPage() {
  return (
    <SignInLayout>
      <motion.div layout initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Row justify="center" align="middle" style={{ minHeight: "75vh" }}>
          <Col xs={24} sm={18} md={12} lg={8}>
            <Card
              style={{
                borderRadius: 22,
                padding: "40px 30px 32px 30px",
                boxShadow: "0 6px 32px rgba(22,119,255,0.11)",
                textAlign: "center",
                backdropFilter: "blur(2px)",
              }}
              bodyStyle={{ padding: 0 }}
            >
              <SignInHeader />
              <SignInButtons />
              <SignInFooter />
            </Card>
          </Col>
        </Row>
      </motion.div>
    </SignInLayout>
  );
}

export { SignInPage };
