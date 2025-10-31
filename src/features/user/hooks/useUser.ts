import type { User } from "@entities/User";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../api/getUser";

export const USER_QUERY_KEY = ["user"];

function useUser(): { user: User | null; signedIn: boolean } {
  const { data } = useSuspenseQuery<User | null>({
    queryKey: USER_QUERY_KEY,
    queryFn: getUser,
  });
  return { user: data, signedIn: data !== null };
}

export { useUser };
