import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["{lib,components}/**/*.test.{ts,tsx}"],
    coverage: {
      include: ["lib/**", "components/**"],
    },
  },
});
