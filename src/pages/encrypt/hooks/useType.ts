import { useNavigate, useParams } from "react-router-dom";

type EncryptionType = "client" | "server";

function useType() {
  const { type = "client" } = useParams<{ type: EncryptionType }>();
  const navigate = useNavigate();

  const changeType = (targetType: EncryptionType) => {
    navigate(`/encrypt/${targetType}`, {
      replace: true,
    });
  };

  return { type, changeType };
}

export { useType };
