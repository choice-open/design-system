import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { describe, it } from "vitest";

const projectRoot = join(__dirname, "../..");

describe("构建流程集成测试", () => {
  it("应该能够成功构建所有 tokens", () => {
    // 运行构建命令
    execSync("npm run build:tokens", {
      cwd: projectRoot,
      stdio: "inherit",
    });

    // 验证输出文件存在
    const outputFiles = [
      "colors-w3c.json",
      "typography-w3c.json",
      "spacing-w3c.json",
      "radius-w3c.json",
      "shadows-w3c.json",
      "breakpoints-w3c.json",
      "zindex-w3c.json",
    ];

    outputFiles.forEach((file) => {
      const filePath = join(projectRoot, "output", file);
      if (!existsSync(filePath)) {
        throw new Error(`输出文件不存在: ${file}`);
      }
    });
  });

  it("应该生成有效的 JSON 文件", () => {
    const outputFiles = ["colors-w3c.json", "typography-w3c.json"];

    outputFiles.forEach((file) => {
      const filePath = join(projectRoot, "output", file);
      if (existsSync(filePath)) {
        const content = readFileSync(filePath, "utf-8");

        // 验证是有效的 JSON
        let data;
        try {
          data = JSON.parse(content);
        } catch (error) {
          throw new Error(`无效的 JSON 文件: ${file}`);
        }

        // 验证基本结构
        if (typeof data !== "object" || data === null) {
          throw new Error(`JSON 文件应该是对象: ${file}`);
        }
      }
    });
  });

  it("应该能够成功运行 Terrazzo", () => {
    execSync("npm run terrazzo", {
      cwd: projectRoot,
      stdio: "inherit",
    });

    // 验证 Terrazzo 输出文件
    const terrazzoFiles = [
      "tokens.css",
      "tokens.scss",
      "tokens.js",
      "tokens.d.ts",
    ];

    terrazzoFiles.forEach((file) => {
      const filePath = join(projectRoot, "dist", file);
      if (!existsSync(filePath)) {
        throw new Error(`Terrazzo 输出文件不存在: ${file}`);
      }
    });
  });

  it("应该能够成功构建 helper 函数", () => {
    execSync("npm run build:helpers", {
      cwd: projectRoot,
      stdio: "inherit",
    });

    // 验证 helper 文件
    const helperFiles = [
      "index.js",
      "index.d.ts",
      "helpers/colors.js",
      "helpers/colors.d.ts",
    ];

    helperFiles.forEach((file) => {
      const filePath = join(projectRoot, "dist", file);
      if (!existsSync(filePath)) {
        throw new Error(`Helper 文件不存在: ${file}`);
      }
    });
  });
});
