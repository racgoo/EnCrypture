import type { User } from "@entities/User";

const baseURL = import.meta.env.VITE_SERVER_URL;

async function getUser(): Promise<User | null> {
  try {
    const response = await fetch(`${baseURL}/user/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

export { getUser };
