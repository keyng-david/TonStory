import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills(), sentryVitePlugin({
    org: "keyng",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "keyng",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "keyng",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "keyng",
    project: "javascript-react-iy"
  })],

  define: {
    "process.env": {},
  },

  build: {
    sourcemap: true
  }
});