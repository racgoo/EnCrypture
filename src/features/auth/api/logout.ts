const baseURL = import.meta.env.VITE_SERVER_URL;

function logout() {
  return fetch(`${baseURL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export { logout };
