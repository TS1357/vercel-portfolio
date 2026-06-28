import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // The three.js chunk is unavoidably large but it's lazy-loaded (only
    // fetched when the hero canvas mounts), so the warning is expected/benign.
    chunkSizeWarningLimit: 800,
    // Split the heavy 3D libraries into their own chunk so the main bundle
    // stays small and the hero canvas can be lazy-loaded.
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          r3f: [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
        },
      },
    },
  },
});
