import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://jlpt-voca-server.vercel.app",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      // "@apis": path.resolve(__dirname, "src/apis"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
});
