import React from "react";

interface AuthButtonProps {
  provider: "google" | "github";
  text?: string;
  onClick?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ provider, text, onClick }) => {
  const providers = {
    google: {
      label: text || "Sign in with Google",
      bg: "white",
      color: "black",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 48 48"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.58 1.21 9.03 3.19l6.76-6.76C35.63 2.54 30.13 0 24 0 14.62 0 6.29 5.38 2.68 13.14l7.87 6.11C12.1 13.52 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.43 24.5c0-1.57-.13-3.07-.38-4.5H24v8.5h12.43c-.54 2.85-2.23 5.26-4.71 6.9l7.87 6.11C43.95 36.98 46.43 31.02 46.43 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.55 28.25l-7.87-6.11C1.68 24.62 0 29.12 0 34c0 4.88 1.68 9.38 4.68 12.86l7.87-6.11C12.5 35.75 10.55 31.37 10.55 28.25z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.13 0 11.63-2.05 15.83-5.58l-7.87-6.11c-2.2 1.48-5 2.34-7.96 2.34-6.26 0-11.9-4.02-13.44-9.67L2.68 34C6.29 41.76 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
      ),
    },
    github: {
      label: text || "Sign in with GitHub",
      bg: "black",
      color: "white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.605-2.665-.304-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.653 1.649.242 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.479 5.921.43.37.823 1.096.823 2.21v3.293c0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
  };

  const current = providers[provider];

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: current.bg,
        color: current.color,
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {current.icon}
      {current.label}
    </button>
  );
};

export default AuthButton;
