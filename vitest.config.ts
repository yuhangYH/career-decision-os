import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: {
    jsx: { runtime: "automatic" },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    exclude: [
      "e2e/**",
      "node_modules/**",
      ".next/**",
      ".worktrees/**",
      "test-results/**",
    ],
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
