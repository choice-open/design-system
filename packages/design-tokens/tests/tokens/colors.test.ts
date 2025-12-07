import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

describe("颜色令牌测试", () => {
  let colorsW3C: any;

  beforeAll(async () => {
    // 确保输出文件存在
    const outputPath = join(__dirname, "../../output/colors-w3c.json");

    if (!existsSync(outputPath)) {
      // 如果文件不存在，先生成它
      const { execSync } = require("child_process");
      execSync("node scripts/generators/generate-w3c-colors-from-ts.cjs", {
        cwd: join(__dirname, "../.."),
      });
    }

    const content = readFileSync(outputPath, "utf-8");
    colorsW3C = JSON.parse(content);
  });

  describe("W3C 格式验证", () => {
    it("应该有正确的根结构", () => {
      expect(colorsW3C).toHaveProperty("color");
      expect(typeof colorsW3C.color).toBe("object");
    });

    it("基础颜色应该有正确的格式", () => {
      const blueColors = colorsW3C.color.blue;
      expect(blueColors).toBeDefined();

      // 检查 blue-500
      const blue500 = blueColors["500"];
      expect(blue500).toHaveProperty("$type", "color");
      expect(blue500).toHaveProperty("$value");

      const { $value } = blue500;
      expect($value).toHaveProperty("colorSpace", "srgb");
      expect($value).toHaveProperty("components");
      expect($value).toHaveProperty("alpha");
      expect(Array.isArray($value.components)).toBe(true);
      expect($value.components).toHaveLength(3);
    });

    it("语义颜色应该有正确的引用格式", () => {
      const textColors = colorsW3C.color.text;
      expect(textColors).toBeDefined();

      const defaultColor = textColors.default;
      expect(defaultColor).toHaveProperty("$type", "color");
      expect(defaultColor).toHaveProperty("$value");

      // 检查是否为引用格式或颜色对象
      const { $value } = defaultColor;
      if (typeof $value === "string") {
        expect($value).toMatch(/^\{color\..+\}$/);
      }
    });

    it("应该包含颜色分类信息", () => {
      const blueColors = colorsW3C.color.blue;
      const blue500 = blueColors["500"];

      if (
        blue500.$extensions &&
        blue500.$extensions["choiceform.design-system"]
      ) {
        expect(blue500.$extensions["choiceform.design-system"]).toHaveProperty(
          "category"
        );
        expect(blue500.$extensions["choiceform.design-system"].category).toBe(
          "hues"
        );
      }
    });
  });

  describe("主题模式支持", () => {
    it("某些颜色应该支持 light/dark 主题", () => {
      // 查找支持主题的颜色
      const findThemeColors = (obj: any): any[] => {
        const results: any[] = [];

        const traverse = (current: any, path: string[] = []) => {
          if (current && typeof current === "object") {
            if (current.$type === "color" && current.$extensions?.mode) {
              results.push({ token: current, path });
            }

            Object.keys(current).forEach((key) => {
              if (!key.startsWith("$")) {
                traverse(current[key], [...path, key]);
              }
            });
          }
        };

        traverse(obj);
        return results;
      };

      const themeColors = findThemeColors(colorsW3C.color);

      if (themeColors.length > 0) {
        const firstThemeColor = themeColors[0].token;
        expect(firstThemeColor.$extensions.mode).toHaveProperty("light");
        expect(firstThemeColor.$extensions.mode).toHaveProperty("dark");
      }
    });
  });

  describe("颜色数量统计", () => {
    it("应该生成足够的颜色令牌", () => {
      const countTokens = (obj: any): number => {
        let count = 0;

        const traverse = (current: any) => {
          if (current && typeof current === "object") {
            if (current.$type === "color") {
              count++;
            } else {
              Object.keys(current).forEach((key) => {
                if (!key.startsWith("$")) {
                  traverse(current[key]);
                }
              });
            }
          }
        };

        traverse(obj);
        return count;
      };

      const totalColors = countTokens(colorsW3C.color);
      expect(totalColors).toBeGreaterThan(200); // 应该有超过200个颜色
    });

    it("应该包含所有主要颜色组", () => {
      const colorGroups = Object.keys(colorsW3C.color);

      // 基础颜色
      expect(colorGroups).toContain("blue");
      expect(colorGroups).toContain("red");
      expect(colorGroups).toContain("green");

      // 语义颜色
      expect(colorGroups).toContain("text");
      expect(colorGroups).toContain("background");
      expect(colorGroups).toContain("icon");
      expect(colorGroups).toContain("border");

      // 特殊颜色
      expect(colorGroups).toContain("white");
      expect(colorGroups).toContain("black");
    });
  });
});
