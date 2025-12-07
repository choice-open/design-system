import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("基础功能测试", () => {
  it("数学运算应该正常工作", () => {
    expect(2 + 2).toBe(4);
  });

  it("应该能够读取项目文件", () => {
    const packageJsonPath = join(__dirname, "../package.json");
    expect(existsSync(packageJsonPath)).toBe(true);

    const content = readFileSync(packageJsonPath, "utf-8");
    const pkg = JSON.parse(content);
    expect(pkg.name).toContain("design-tokens");
  });
});
