import { Card, Typography } from "antd";
import { StartButton } from "./StartButton";
import { DisabledMark } from "./DisabledMark";
import { Fragment } from "react/jsx-runtime";
const { Paragraph } = Typography;

interface OptionCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  tags: React.ReactNode[];
  href: string;
  disabled?: boolean;
}

function OptionCard({
  icon,
  title,
  description,
  tags,
  href,
  disabled = false,
}: OptionCardProps) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(22,119,255,0.08)",
        minHeight: "100%",
        opacity: disabled ? 0.7 : 1,
      }}
      cover={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 120,
            background: "#f0f5ff",
            borderRadius: "16px 16px 0 0",
          }}
        >
          {icon}
        </div>
      }
    >
      {title}
      {description}
      <Paragraph>
        {tags.map((tag, index) => (
          <Fragment key={index}>{tag}</Fragment>
        ))}
      </Paragraph>
      <StartButton disabled={disabled} href={href} />
      <DisabledMark disabled={disabled} />
    </Card>
  );
}

export { OptionCard };
