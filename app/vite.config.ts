import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep React ecosystem together
          "react-vendor": ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          mui: [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
