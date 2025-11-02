import type { User } from "@entities/User";

const baseURL = import.meta.env.VITE_SERVER_URL;

async function getUser(): Promise<User | null> {
  try {
    const response = await fetch(`${baseURL}/user/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

async function deleteUser(): Promise<Response> {
  const response = await fetch(`${baseURL}/user`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error();
  }
  return response;
}

export { getUser, deleteUser };
