import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment the next lines to run in Docker container.
  // server: {
  //   host: true,
  //   port: 5173
  // },
});
