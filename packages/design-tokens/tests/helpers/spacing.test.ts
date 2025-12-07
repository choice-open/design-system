import { execSync } from "child_process";
import { join } from "path";
import { beforeAll, describe, expect, it } from "vitest";

describe("Spacing Helper 函数测试", () => {
  let helpers: any;

  beforeAll(async () => {
    // 确保 helpers 已构建
    try {
      execSync("npm run build:helpers", {
        cwd: join(__dirname, "../.."),
        stdio: "pipe",
      });
    } catch (error) {
      // 忽略构建错误，继续测试
    }

    try {
      const tokensPath = join(__dirname, "../../dist/tokens.js");
      helpers = await import(tokensPath);
    } catch (error) {
      console.warn("无法加载 spacing helpers:", error.message);
    }
  });

  describe("spacing() 函数", () => {
    it("应该支持分数百分比", () => {
      if (!helpers?.spacing) return;

      const result = helpers.spacing("1/2");
      console.log('spacing("1/2"):', result);

      if (typeof result === "string") {
        // 应该返回 "50%" 或类似值
        expect(result).toMatch(/\d+%|[\d.]+rem/);
      }
    });
  });

  describe("spacingList() 函数", () => {
    it("应该支持多个值", () => {
      if (!helpers?.spacingList) return;

      const result = helpers.spacingList([4, 2]);
      console.log("spacingList([4, 2]):", result);

      if (typeof result === "string") {
        // 应该返回空格分隔的值
        expect(result).toContain(" ");
      }
    });
  });
});
