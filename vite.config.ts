import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import wyw from "@wyw-in-js/vite";

export default defineConfig({
  plugins: [
    react(),
    wyw({
      include: ["**/*.{ts,tsx}"],
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      workbox: {
        // Defaults, plus the Latin subset of Inter so the font works offline
        globPatterns: [
          "**/*.{js,css,html}",
          "**/inter-latin-wght-normal-*.woff2",
        ],
      },
      manifest: {
        name: "KeySight",
        short_name: "KeySight",
        description: "Sight-reading practice game for F and G clef",
        theme_color: "#EEF4F7",
        background_color: "#EEF4F7",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
