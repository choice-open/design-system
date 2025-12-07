// ============================================================================
// Spacing Helper Functions - 间距辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替:
//
// import { spacing, spacingList, spacingExists } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

// 使用 Terrazzo 生成的类型定义
import type { FractionString, SpacingValue } from "../../dist/tokens";
// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token } from "../tokens.js";

// 直接从 tokens.js 获取 breakpoint 数据
function getBreakpointValue(name: string): string {
  const tokenValue = token(`breakpoints.${name}`);
  if (!tokenValue) {
    return "0";
  }

  // 如果是 dimension token，转换为 CSS 值
  if (typeof tokenValue === "object" && tokenValue.value && tokenValue.unit) {
    return `${tokenValue.value}${tokenValue.unit}`;
  }

  return String(tokenValue);
}

function breakpointExists(name: string): boolean {
  return !!token(`breakpoints.${name}`);
}

function listBreakpoints(): string[] {
  // 在浏览器环境中，直接返回已知的 breakpoint tokens
  return ["xs", "sm", "md", "lg", "xl", "2xl"];
}

// 重新导出类型
export type { SpacingValue, FractionString } from "../../dist/tokens";

// 定义尺寸令牌的类型
interface DimensionToken {
  value: number;
  unit: string;
}

/**
 * 检查是否为尺寸令牌
 * @param token - 令牌对象
 * @returns 是否为尺寸令牌
 */
function isDimensionToken(token: any): token is DimensionToken {
  return (
    token &&
    typeof token === "object" &&
    typeof token.value === "number" &&
    typeof token.unit === "string"
  );
}

/**
 * 获取间距值 (编译时类型检查版本)
 * @param size - 间距大小，支持预设值、任意数值、分数、断点值或任意值
 * @returns 计算后的间距值
 * @example
 *   spacing(0)                    // "0"
 *   spacing(4)                    // "1rem" (基于 0.25rem 基础单位)
 *   spacing(16)                   // "4rem"
 *   spacing("1/2")                // "50%" - 分数百分比
 *   spacing("2/3")                // "66.666667%" - 分数百分比
 *   spacing("[10vh]")             // "10vh" - 任意值
 *   spacing("[calc(100%-1rem)]")  // "calc(100%-1rem)" - calc表达式
 *   spacing("md")                 // "48rem" - 断点值
 *   spacing("lg")                 // "64rem" - 断点值
 */
export function spacing(size: SpacingValue): string;

/**
 * 获取间距值 (运行时动态值版本)
 * @param size - 间距大小，支持预设值、任意数值、分数、断点值或任意值
 * @returns 计算后的间距值
 */
export function spacing(size: string | number): string;

/**
 * 获取间距值 (实现) - 使用 CSS 变量和 calc()
 */
export function spacing(size: string | number): string {
  // 特殊值直接返回
  if (size === 0) {
    return "0";
  }

  // 处理任意值 [value]
  if (typeof size === "string" && size.startsWith("[") && size.endsWith("]")) {
    const arbitraryValue = size.slice(1, -1);
    return arbitraryValue;
  }

  // 处理分数 1/2, 2/3 等
  if (typeof size === "string" && size.includes("/")) {
    return parseFraction(size);
  }

  // 处理 "px" 特殊值 - 使用 CSS 变量
  if (size === "px") {
    // 验证 token 是否存在（仅在开发模式下）
    if (process.env.NODE_ENV !== "production") {
      const tokenValue = token("spacing.px");
      if (!tokenValue) {
        console.warn('Spacing token "spacing.px" not found');
        return "1px";
      }
    }
    return "var(--cdt-spacing-px)";
  }

  // 处理断点值
  if (typeof size === "string" && breakpointExists(size)) {
    return getBreakpointValue(size);
  }

  // 处理数字值 - 使用 CSS 变量和 calc()
  if (typeof size === "number") {
    // 验证基础 token 是否存在（仅在开发模式下）
    if (process.env.NODE_ENV !== "production") {
      const baseToken = token("spacing.default");
      if (!baseToken) {
        console.warn('Base spacing token "spacing.default" not found');
      }
    }

    if (size === 1) {
      // 对于 spacing(1)，直接返回基础变量
      return "var(--cdt-spacing)";
    } else {
      // 对于其他数值，使用 calc() 计算
      return `calc(var(--cdt-spacing) * ${size})`;
    }
  }

  // 如果是字符串，尝试作为数字解析
  if (typeof size === "string") {
    const numericValue = parseFloat(size);
    if (!isNaN(numericValue)) {
      return spacing(numericValue);
    }
  }

  const availableBreakpoints = listBreakpoints();
  throw new Error(
    `spacing() 参数错误: '${size}' 不是有效的间距值。\n` +
      `支持的格式：\n` +
      `• 数字: 0, 4, 16 等 (生成 calc(var(--cdt-spacing) * N))\n` +
      `• 分数值: "1/2", "1/3", "2/3", "1/4", "3/4" 等\n` +
      `• 任意值: "[10vh]", "[calc(100%-1rem)]" 等\n` +
      `• 特殊值: "px" (生成 var(--cdt-spacing-px))\n` +
      `• 断点值: ${availableBreakpoints.join(", ")}\n\n` +
      `示例: spacing(4) → "calc(var(--cdt-spacing) * 4)"`
  );
}

/**
 * 批量获取间距值（用于 padding, margin 简写）
 * @param sizes - 间距大小列表，支持1-4个值
 * @returns 计算后的间距值字符串
 * @example
 *   spacingList([4, 6])              // "1rem 1.5rem"
 *   spacingList([0, 4, 2])           // "0 1rem 0.5rem"
 *   spacingList(["1/2", 4])          // "50% 1rem"
 *   spacingList(["md", 4])           // "48rem 1rem"
 */
export function spacingList(sizes: SpacingValue[]): string {
  return sizes.map((size) => spacing(size)).join(" ");
}

/**
 * 检查是否为有效的间距值
 * @param size - 间距大小
 * @returns 是否为有效值
 * @example
 *   spacingExists(4)           // true - 数字值
 *   spacingExists("1/2")       // true - 分数
 *   spacingExists("[10vh]")    // true - 任意值
 *   spacingExists("md")        // true - 断点值
 *   spacingExists("abc")       // false - 无效值
 */
export function spacingExists(size: unknown): boolean {
  // 数值检查
  if (typeof size === "number") {
    return true;
  }

  // 字符串值检查
  if (typeof size === "string") {
    // 任意值检查
    if (size.startsWith("[") && size.endsWith("]")) {
      return true;
    }

    // 分数检查
    if (size.includes("/")) {
      return /^\d+\/\d+$/.test(size);
    }

    // 特殊值检查
    if (size === "px") {
      return true;
    }

    // 断点值检查
    if (breakpointExists(size)) {
      return true;
    }

    // 数字字符串检查
    const numericValue = parseFloat(size);
    if (!isNaN(numericValue)) {
      return true;
    }
  }

  return false;
}

/**
 * 获取间距值对应的像素值（用于文档和调试）
 * @param size - 间距大小
 * @param basePx - 基础单位的像素值，默认为4px (对应0.25rem)
 * @returns 像素值描述
 * @example
 *   spacingToPx(0)           // "0px"
 *   spacingToPx(4)           // "16px"
 *   spacingToPx("1/2")       // "50%"
 *   spacingToPx("[10vh]")    // "10vh"
 *   spacingToPx("md")        // "768px (breakpoint)"
 */
export function spacingToPx(size: SpacingValue, basePx: number = 4): string {
  if (size === 0) {
    return "0px";
  }

  // 任意值
  if (typeof size === "string" && size.startsWith("[") && size.endsWith("]")) {
    return size.slice(1, -1);
  }

  // 分数值
  if (typeof size === "string" && size.includes("/")) {
    return parseFraction(size);
  }

  // px 值
  if (size === "px") {
    return "1px";
  }

  // 断点值
  if (typeof size === "string" && breakpointExists(size)) {
    const breakpointValue = getBreakpointValue(size);
    // 尝试解析断点值为像素值（假设16px = 1rem）
    const numericValue = parseFloat(breakpointValue);
    if (!isNaN(numericValue) && breakpointValue.includes("rem")) {
      return `${numericValue * 16}px (breakpoint)`;
    }
    return `${breakpointValue} (breakpoint)`;
  }

  // 数字值
  if (typeof size === "number") {
    return `${size * basePx}px`;
  }

  // 数字字符串
  if (typeof size === "string") {
    const numericValue = parseFloat(size);
    if (!isNaN(numericValue)) {
      return `${numericValue * basePx}px`;
    }
  }

  return "未知";
}

/**
 * 获取所有可用的间距相关 tokens
 * @returns 间距 token 路径数组
 */
export function listSpacingTokens(): string[] {
  // 在浏览器环境中，直接返回已知的 spacing tokens
  return ["spacing.default", "spacing.px"];
}

/**
 * 获取常用分数值列表
 * @returns 常用分数值数组
 */
export function commonFractions(): FractionString[] {
  return [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "5/6",
    "1/12",
    "5/12",
    "7/12",
    "11/12",
  ];
}

// ============================================================================
// 内部工具函数
// ============================================================================

/**
 * 解析分数字符串为百分比
 * @param fraction - 分数字符串，如 "1/2", "2/3"
 * @returns 百分比字符串
 * @example
 *   parseFraction("1/2")  // "50%"
 *   parseFraction("2/3")  // "66.666667%"
 *   parseFraction("3/4")  // "75%"
 */
function parseFraction(fraction: string): string {
  const match = fraction.match(/^(\d+)\/(\d+)$/);
  if (!match) {
    throw new Error(`无效的分数格式: '${fraction}'. 正确格式如: "1/2", "2/3"`);
  }

  const numerator = parseInt(match[1], 10);
  const denominator = parseInt(match[2], 10);

  if (denominator === 0) {
    throw new Error(`分母不能为0: '${fraction}'`);
  }

  const percentage = (numerator / denominator) * 100;

  // 保留6位小数，去除多余的0
  return `${parseFloat(percentage.toFixed(6))}%`;
}
