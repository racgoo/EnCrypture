const baseURL = import.meta.env.VITE_SERVER_URL;

const EXPIRED_TOKEN_EXCEPTION = "ExpiredTokenException";

function injectCustomFetch() {
  const nativeFetch = window.fetch;
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await nativeFetch(input, init);
    try {
      const body = await response.clone().json();
      if (response.status === 401 && body.message === EXPIRED_TOKEN_EXCEPTION) {
        //갱신
        const refreshResponse = await nativeFetch(`${baseURL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (refreshResponse.ok) {
          return nativeFetch(input, init);
        } else {
          return nativeFetch(`${baseURL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        }
      }
      return response;
    } catch (error) {
      return response;
    }
  };
}

export { injectCustomFetch };
