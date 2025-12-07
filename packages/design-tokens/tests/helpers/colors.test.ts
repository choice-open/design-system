import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import { join } from "path";

describe("颜色 Helper 函数测试", () => {
  let helpers: any;

  beforeAll(async () => {
    // 构建 helper 函数
    execSync("pnpm run build:helpers", {
      cwd: join(__dirname, "../.."),
      stdio: "inherit",
    });

    // 导入构建后的 tokens 函数（函数已移动到 tokens.js）
    const tokensPath = join(__dirname, "../../dist/tokens.js");
    helpers = await import(tokensPath);
  });

  describe("color() 函数", () => {
    it("应该生成基础颜色的 CSS 变量", () => {
      const result = helpers.color("blue.500");
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^rgba\(var\(--cdt-color-blue-500\), 1\)$/);
    });

    it("应该支持透明度参数", () => {
      const result = helpers.color("blue.500", 0.5);
      expect(result).toBe("rgba(var(--cdt-color-blue-500), 0.5)");
    });

    it("应该支持主题模式参数", () => {
      const lightResult = helpers.color("blue.500", 1, "light");
      const darkResult = helpers.color("blue.500", 1, "dark");

      // 两者都应该生成相同的 CSS 变量引用（模式在 CSS 中处理）
      expect(lightResult).toBe("rgba(var(--cdt-color-blue-500), 1)");
      expect(darkResult).toBe("rgba(var(--cdt-color-blue-500), 1)");
    });

    it("应该自动添加 color. 前缀", () => {
      const result = helpers.color("blue.500");
      expect(result).toBe("rgba(var(--cdt-color-blue-500), 1)");
    });

    it("应该支持完整路径", () => {
      const result = helpers.color("color.blue.500");
      expect(result).toBe("rgba(var(--cdt-color-blue-500), 1)");
    });

    it("无效颜色在开发模式下应该返回 fallback", () => {
      const result = helpers.color("invalid.color");
      expect(result).toBe("rgba(0, 0, 0, 1)");
    });

    it("透明度应该被限制在 0-1 范围内", () => {
      const result1 = helpers.color("blue.500", -0.5);
      expect(result1).toBe("rgba(var(--cdt-color-blue-500), 0)");

      const result2 = helpers.color("blue.500", 1.5);
      expect(result2).toBe("rgba(var(--cdt-color-blue-500), 1)");
    });
  });

  describe("colorVar() 函数", () => {
    it("应该生成原始 CSS 变量", () => {
      const result = helpers.colorVar("blue.500");
      expect(result).toBe("var(--cdt-color-blue-500)");
    });

    it("应该自动添加 color. 前缀", () => {
      const result = helpers.colorVar("blue.500");
      expect(result).toBe("var(--cdt-color-blue-500)");
    });

    it("应该支持完整路径", () => {
      const result = helpers.colorVar("color.blue.500");
      expect(result).toBe("var(--cdt-color-blue-500)");
    });
  });

  describe("colorHex() 函数", () => {
    it("应该返回十六进制颜色值", () => {
      const result = helpers.colorHex("blue.500");
      expect(typeof result).toBe("string");
      expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("应该支持主题模式", () => {
      const lightResult = helpers.colorHex("blue.500", "light");
      const darkResult = helpers.colorHex("blue.500", "dark");

      expect(typeof lightResult).toBe("string");
      expect(typeof darkResult).toBe("string");
      expect(lightResult).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(darkResult).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it("不存在的颜色应该返回默认黑色", () => {
      const result = helpers.colorHex("invalid.color");
      expect(result).toBe("#000000");
    });
  });

  describe("colorRgb() 函数", () => {
    it("应该返回 RGB 数值数组", () => {
      const result = helpers.colorRgb("blue.500");
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);

      result.forEach((value: number) => {
        expect(typeof value).toBe("number");
        expect(value).toBeGreaterThanOrEqual(0);
        expect(value).toBeLessThanOrEqual(255);
        expect(Number.isInteger(value)).toBe(true);
      });
    });

    it("应该支持主题模式", () => {
      const lightResult = helpers.colorRgb("blue.500", "light");
      const darkResult = helpers.colorRgb("blue.500", "dark");

      expect(Array.isArray(lightResult)).toBe(true);
      expect(Array.isArray(darkResult)).toBe(true);
      expect(lightResult).toHaveLength(3);
      expect(darkResult).toHaveLength(3);
    });

    it("不存在的颜色应该返回 [0, 0, 0]", () => {
      const result = helpers.colorRgb("invalid.color");
      expect(result).toEqual([0, 0, 0]);
    });
  });

  describe("hasColor() 函数", () => {
    it("存在的颜色应该返回 true", () => {
      expect(helpers.hasColor("blue.500")).toBe(true);
    });

    it("不存在的颜色应该返回 false", () => {
      expect(helpers.hasColor("invalid.color")).toBe(false);
      expect(helpers.hasColor("nonexistent.token")).toBe(false);
    });

    it("应该支持主题模式检查", () => {
      const lightExists = helpers.hasColor("blue.500", "light");
      const darkExists = helpers.hasColor("blue.500", "dark");

      expect(typeof lightExists).toBe("boolean");
      expect(typeof darkExists).toBe("boolean");
    });
  });

  describe("token() 函数重新导出", () => {
    it("应该能直接访问 Terrazzo token 函数", () => {
      expect(typeof helpers.token).toBe("function");

      const tokenData = helpers.token("color.blue.500");
      expect(typeof tokenData).toBe("object");
      expect(tokenData).toHaveProperty("hex");
    });
  });

  describe("边界情况测试", () => {
    it("空字符串参数应该被正确处理", () => {
      expect(() => helpers.color("")).not.toThrow();
      expect(helpers.hasColor("")).toBe(false);

      const result = helpers.color("");
      expect(result).toBe("rgba(0, 0, 0, 1)");
    });

    it("null/undefined 参数应该被正确处理", () => {
      expect(() => helpers.color(null)).not.toThrow();
      expect(() => helpers.color(undefined)).not.toThrow();
      expect(helpers.hasColor(null)).toBe(false);
      expect(helpers.hasColor(undefined)).toBe(false);
    });

    it("path 前缀处理应该正确", () => {
      // 不带前缀
      const result1 = helpers.color("blue.500");
      expect(result1).toBe("rgba(var(--cdt-color-blue-500), 1)");

      // 带前缀
      const result2 = helpers.color("color.blue.500");
      expect(result2).toBe("rgba(var(--cdt-color-blue-500), 1)");

      // 两者应该生成相同的结果
      expect(result1).toBe(result2);
    });
  });
});
