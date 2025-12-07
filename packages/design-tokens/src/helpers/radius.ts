// ============================================================================
// Radius Helper Functions - 圆角辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替:
//
// import { radius, radiusList } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token } from "../tokens.js";

import type { RadiusKey, ThemeMode } from "../types/helpers";

/**
 * 获取圆角值（编译时类型检查版本）- 使用 CSS 变量
 * @param name - 圆角名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS 圆角变量
 * @example
 *   radius("sm")    // "var(--cdt-radius-sm)"
 *   radius("md")    // "var(--cdt-radius-md)"
 *   radius("lg")    // "var(--cdt-radius-lg)"
 */
export function radius(name: RadiusKey, mode?: ThemeMode): string;

/**
 * 获取圆角值（运行时动态值版本）- 使用 CSS 变量
 * @param name - 圆角名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS 圆角变量
 */
export function radius(name: string, mode?: ThemeMode): string;

/**
 * 获取圆角值（实现）- 使用 CSS 变量
 */
export function radius(name: string, mode?: ThemeMode): string {
  // 验证 token 是否存在（仅在开发模式下）
  if (process.env.NODE_ENV !== "production") {
    const tokenValue = token(`radius.${name}`);
    if (!tokenValue) {
      const availableRadius = listRadius();
      throw new Error(
        `Radius '${name}' not found. Available radius values: ${availableRadius.join(", ")}`
      );
    }
  }

  // 返回 CSS 变量，让浏览器在运行时解析
  return `var(--cdt-radius-${name})`;
}

/**
 * 批量获取多个圆角值
 * @param names - 圆角名称数组
 * @returns CSS 圆角变量数组
 * @example
 *   radiusList("sm", "md")  // ["var(--cdt-radius-sm)", "var(--cdt-radius-md)"]
 */
export function radiusList(...names: RadiusKey[]): string[] {
  return names.map((name) => radius(name));
}

/**
 * 获取所有可用的圆角名称
 * @returns 圆角名称数组
 */
export function listRadius(): string[] {
  // 在浏览器环境中，直接返回已知的 radius tokens
  return ["sm", "md", "lg"].sort();
}

/**
 * 检查圆角是否存在
 * @param name - 圆角名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns 是否存在
 */
export function radiusExists(name: string, mode?: ThemeMode): boolean {
  return !!token(`radius.${name}`);
}

/**
 * 获取圆角的详细信息（用于文档和调试）
 * @param name - 圆角名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns 圆角详细信息
 */
export function radiusInfo(name: string, mode?: ThemeMode) {
  const tokenValue = token(`radius.${name}`);

  if (!tokenValue) {
    throw new Error(`Radius '${name}' not found`);
  }

  // 如果是尺寸令牌，提供详细信息
  let value = "unknown";
  let unit = "unknown";

  if (typeof tokenValue === "object" && tokenValue.value && tokenValue.unit) {
    value = tokenValue.value;
    unit = tokenValue.unit;
  } else if (typeof tokenValue === "string") {
    // 尝试解析字符串值
    const match = String(tokenValue).match(/^([\d.]+)(.*)$/);
    if (match) {
      value = match[1];
      unit = match[2] || "px";
    }
  }

  return {
    name,
    path: `radius.${name}`,
    value,
    unit,
    cssValue: radius(name, mode),
    cssVariable: `--cdt-radius-${name}`,
  };
}
