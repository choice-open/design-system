import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "output/**",
        "tests/**",
        "**/*.d.ts",
        "vitest.config.ts",
        "config/**",
      ],
    },
    include: ["tests/**/*.{test,spec}.{js,ts}"],
    exclude: ["node_modules/**", "dist/**", "output/**"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@tokens": resolve(__dirname, "./tokens"),
      "@scripts": resolve(__dirname, "./scripts"),
      "@output": resolve(__dirname, "./output"),
    },
  },
});
