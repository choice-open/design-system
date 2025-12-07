/// <reference types="vitest" />
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { expect } from "vitest";

/**
 * 读取 JSON 文件的辅助函数
 */
export function readJsonFile(filePath: string): any {
  if (!existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * 读取输出目录中的 W3C token 文件
 */
export function readW3CTokens(tokenType: string): any {
  const filePath = join(__dirname, "../../output", `${tokenType}-w3c.json`);
  return readJsonFile(filePath);
}

/**
 * 验证 W3C Design Token 格式
 */
export function validateW3CToken(token: any, expectedType: string): void {
  expect(token).toHaveProperty("$type");
  expect(token).toHaveProperty("$value");
  expect(token.$type).toBe(expectedType);
}

/**
 * 验证颜色 token 格式
 */
export function validateColorToken(token: any): void {
  validateW3CToken(token, "color");

  const { $value } = token;

  if (typeof $value === "string") {
    // 引用格式: {color.xxx.xxx}
    expect($value).toMatch(/^\{color\..+\}$/);
  } else if (typeof $value === "object") {
    // 颜色对象格式
    expect($value).toHaveProperty("colorSpace");
    expect($value).toHaveProperty("components");
    expect($value).toHaveProperty("alpha");
    expect($value.colorSpace).toBe("srgb");
    expect(Array.isArray($value.components)).toBe(true);
    expect($value.components).toHaveLength(3);
    expect(typeof $value.alpha).toBe("number");
  }
}

/**
 * 验证 dimension token 格式
 */
export function validateDimensionToken(token: any): void {
  validateW3CToken(token, "dimension");

  const { $value } = token;
  expect($value).toHaveProperty("value");
  expect($value).toHaveProperty("unit");
  expect(typeof $value.value).toBe("number");
  expect(typeof $value.unit).toBe("string");
}

/**
 * 验证 typography token 格式
 */
export function validateTypographyToken(token: any): void {
  validateW3CToken(token, "typography");

  const { $value } = token;
  expect($value).toHaveProperty("fontFamily");
  expect($value).toHaveProperty("fontSize");
  expect($value).toHaveProperty("fontWeight");
  expect($value).toHaveProperty("lineHeight");
  expect($value).toHaveProperty("letterSpacing");
}

/**
 * 验证 shadow token 格式
 */
export function validateShadowToken(token: any): void {
  validateW3CToken(token, "shadow");

  const { $value } = token;
  if (Array.isArray($value)) {
    // 多重阴影
    $value.forEach((shadow) => validateSingleShadow(shadow));
  } else {
    // 单个阴影
    validateSingleShadow($value);
  }
}

function validateSingleShadow(shadow: any): void {
  expect(shadow).toHaveProperty("offsetX");
  expect(shadow).toHaveProperty("offsetY");
  expect(shadow).toHaveProperty("blur");
  expect(shadow).toHaveProperty("color");

  if (shadow.spread !== undefined) {
    expect(typeof shadow.spread).toBe("object");
  }
  if (shadow.inset !== undefined) {
    expect(typeof shadow.inset).toBe("boolean");
  }
}

/**
 * 模拟文件系统操作
 */
export const mockFs = {
  files: new Map<string, string>(),

  writeFileSync(path: string, content: string) {
    this.files.set(path, content);
  },

  readFileSync(path: string): string {
    if (!this.files.has(path)) {
      throw new Error(`ENOENT: no such file or directory, open '${path}'`);
    }
    return this.files.get(path)!;
  },

  existsSync(path: string): boolean {
    return this.files.has(path);
  },

  clear() {
    this.files.clear();
  },
};

/**
 * 创建测试用的颜色数据
 */
export const mockColorData = {
  baseColorsLight: {
    "blue-500": [13, 153, 255],
    "red-500": [242, 72, 34],
  },
  baseColorsDark: {
    "blue-500": [12, 140, 233],
    "red-500": [224, 62, 26],
  },
  semanticColorsLight: {
    "text-default": "black",
    "background-default": "white",
  },
  semanticColorsDark: {
    "text-default": "white",
    "background-default": "gray-800",
  },
  extendedSemanticColors: {
    white: [255, 255, 255],
    black: [0, 0, 0],
  },
  colorCategories: {
    blue: "hues",
    foreground: "text colors",
  },
  defaultAlpha: {
    "text-default": 0.9,
  },
};
