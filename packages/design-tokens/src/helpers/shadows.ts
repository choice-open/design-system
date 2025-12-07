// ============================================================================
// Shadow Helper Functions - 阴影辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替:
//
// import { shadow, shadowList } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token } from "../tokens.js";

import type { ShadowKey, ThemeMode } from "../types/helpers";

/**
 * 获取阴影样式（编译时类型检查版本）- 使用 CSS 变量
 * @param name - 阴影名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS 阴影变量
 * @example
 *   shadow("xs")        // "var(--cdt-shadows-xs)"
 *   shadow("sm")        // "var(--cdt-shadows-sm)"
 *   shadow("elevation") // "var(--cdt-shadows-elevation)"
 */
export function shadow(name: ShadowKey, mode?: ThemeMode): string;

/**
 * 获取阴影样式（运行时动态值版本）- 使用 CSS 变量
 * @param name - 阴影名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS 阴影变量
 */
export function shadow(name: string, mode?: ThemeMode): string;

/**
 * 获取阴影样式（实现）- 使用 CSS 变量
 */
export function shadow(name: string, mode?: ThemeMode): string {
  // 验证 token 是否存在（仅在开发模式下）
  if (process.env.NODE_ENV !== "production") {
    const tokenValue = token(`shadows.${name}`);
    if (!tokenValue) {
      const availableShadows = listShadows();
      throw new Error(
        `Shadow '${name}' not found. Available shadows: ${availableShadows.join(", ")}`
      );
    }
  }

  // 返回 CSS 变量，让浏览器在运行时解析
  return `var(--cdt-shadows-${name})`;
}

/**
 * 批量获取多个阴影样式（编译时类型检查版本）
 * @param names - 阴影名称数组
 * @returns CSS 阴影变量数组
 * @example
 *   shadowList("xs", "sm")  // ["var(--cdt-shadow-xs)", "var(--cdt-shadow-sm)"]
 */
export function shadowList(...names: ShadowKey[]): string[];

/**
 * 批量获取多个阴影样式（运行时动态值版本）
 */
export function shadowList(...names: string[]): string[];

/**
 * 批量获取多个阴影样式（实现）
 */
export function shadowList(...names: string[]): string[] {
  return names.map((name) => shadow(name));
}

/**
 * 获取所有可用的阴影名称
 * @returns 阴影名称数组
 */
export function listShadows(): string[] {
  // 在浏览器环境中，直接返回实际存在的 shadow tokens
  // 这些值与 shadows-w3c.json 中的实际 tokens 保持同步
  return [
    "border-default",
    "border-default-inset",
    "focus",
    "lg",
    "line",
    "md",
    "sm",
    "xl",
    "xs",
    "xxs",
  ].sort();
}

/**
 * 检查阴影是否存在
 * @param name - 阴影名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns 是否存在
 */
export function shadowExists(name: string, mode?: ThemeMode): boolean {
  return !!token(`shadows.${name}`);
}

/**
 * 获取阴影的详细信息（用于文档和调试）
 * @param name - 阴影名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns 阴影详细信息
 */
export function shadowInfo(name: string, mode?: ThemeMode) {
  const tokenValue = token(`shadows.${name}`);

  if (!tokenValue) {
    throw new Error(`Shadow '${name}' not found`);
  }

  // 简化信息返回，避免复杂的数据解析
  return {
    name,
    path: `shadows.${name}`,
    cssValue: shadow(name, mode),
    cssVariable: `--cdt-shadows-${name}`,
    rawToken: tokenValue, // 原始 token 数据，供调试使用
  };
}
