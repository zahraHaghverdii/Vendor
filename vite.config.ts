import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // هشدار chunk بزرگ رو زیاد کن
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // کتابخانه‌ها رو جدا کن
        },
      },
    },
  },
});
