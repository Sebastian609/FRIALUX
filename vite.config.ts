import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const host = process.env.TAURI_DEV_HOST;
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || '127.0.0.1', // Valor por defecto más seguro
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
