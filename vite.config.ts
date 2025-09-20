import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  optimizeDeps: {
    exclude: ["argon2-browser"],
  },
  resolve: {
    alias: {
      "@entities": "/src/entities",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@shares": "/src/shares",
    },
  },
});
