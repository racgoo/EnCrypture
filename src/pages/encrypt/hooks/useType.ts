import { useLocaleNavigate } from "@shares/locale";
import { useParams } from "react-router-dom";
import type { EncryptionType } from "../../../features/encrypt/type";

function useType() {
  const { type = "client" } = useParams<{ type: EncryptionType }>();

  const navigate = useLocaleNavigate();

  const changeType = (targetType: EncryptionType) => {
    navigate(`/encrypt/${targetType}`, {
      replace: true,
    });
  };

  return { type, changeType };
}

export { useType };
