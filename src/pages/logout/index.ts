import { logout } from "@features/auth";
import { USER_QUERY_KEY } from "@features/user";
import { useLocaleNavigate } from "@shares/locale";
import { queryClient } from "../../app/App";
import { useEffect } from "react";

function LogoutPage() {
  const navigate = useLocaleNavigate();
  useEffect(() => {
    logout().then(() => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      navigate("/");
    });
  }, []);

  return null;
}

export { LogoutPage };
