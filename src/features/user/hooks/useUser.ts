import { queryClient } from "@app/App";
import type { User } from "@entities/User";
import { useLocale } from "@shares/locale";
import {
  useMutation,
  useSuspenseQuery,
  type UseMutateAsyncFunction,
} from "@tanstack/react-query";
import { message } from "antd";
import { deleteUser, getUser } from "../api/user";
import { localeTable } from "../locale";

export const USER_QUERY_KEY = ["user"];

function useUser(): {
  user: User | null;
  unRegister: UseMutateAsyncFunction<Response, Error, void, unknown>;
} {
  const { t } = useLocale(localeTable);
  const { data } = useSuspenseQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
  });

  const { mutateAsync: unRegister } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success(t("profile_delete_success"));
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
    onError: (_) => {
      message.error(t("profile_delete_error"));
    },
  });

  return { user: data, unRegister };
}

export { useUser };
