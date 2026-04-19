import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],

      // ✅ THIS FIXES YOUR ISSUE
      exclude: [
        "src/index.ts", // <-- ignore re-export file
      ],

      // ✅ Pro-level thresholds
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 80,
        statements: 90,
      },
    },
  },
});