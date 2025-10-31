type ProviderType = "google" | "github";

const baseURL = import.meta.env.VITE_SERVER_URL;

function getOauthURL(provider: ProviderType): string {
  switch (provider) {
    case "google":
      return `${baseURL}/auth/google`;
    case "github":
      return `${baseURL}/auth/github`;
  }
}

export { getOauthURL };
