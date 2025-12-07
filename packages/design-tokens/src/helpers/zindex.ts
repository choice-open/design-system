// ============================================================================
// Z-Index Helper Functions - 层级辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替:
//
// import { zIndex, zIndexValue, zIndexList } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token } from "../tokens.js";

import type { ZIndexKey, ThemeMode } from "../types/helpers";

/**
 * 获取 z-index CSS 变量（编译时类型检查版本）
 * @param name - z-index 名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS z-index 变量
 * @example
 *   zIndex("sticky")      // "var(--cdt-zindex-sticky)"
 *   zIndex("backdrop")    // "var(--cdt-zindex-backdrop)"
 *   zIndex("tooltip")     // "var(--cdt-zindex-tooltip)"
 */
export function zIndex(name: ZIndexKey, mode?: ThemeMode): string;

/**
 * 获取 z-index CSS 变量（运行时动态值版本）
 * @param name - z-index 名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns CSS z-index 变量
 */
export function zIndex(name: string, mode?: ThemeMode): string;

/**
 * 获取 z-index CSS 变量（实现）
 */
export function zIndex(name: string, mode?: ThemeMode): string {
  // 验证 token 是否存在（仅在开发模式下）
  if (process.env.NODE_ENV !== "production") {
    const tokenValue = token(`zindex.${name}`);
    if (tokenValue === undefined || tokenValue === null) {
      const availableZIndex = listZIndex();
      throw new Error(
        `Z-index '${name}' not found. Available z-index values: ${availableZIndex.join(", ")}`
      );
    }
  }

  // 返回 CSS 变量，让浏览器在运行时解析
  return `var(--cdt-zindex-${name})`;
}

/**
 * 获取 z-index 的原始数值（用于需要数值计算的场景）
 * @param name - z-index 名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns z-index 数值
 * @example
 *   zIndexValue("sticky")    // 100
 *   zIndexValue("backdrop")  // 800
 */
export function zIndexValue(name: ZIndexKey, mode?: ThemeMode): number;

/**
 * 获取 z-index 的原始数值（运行时动态值版本）
 */
export function zIndexValue(name: string, mode?: ThemeMode): number;

/**
 * 获取 z-index 的原始数值（实现）
 */
export function zIndexValue(name: string, mode?: ThemeMode): number {
  const tokenValue = token(`zindex.${name}`);

  if (typeof tokenValue !== "number") {
    const availableZIndex = listZIndex();
    throw new Error(
      `Z-index '${name}' not found or invalid. Available z-index values: ${availableZIndex.join(", ")}`
    );
  }

  return tokenValue;
}

/**
 * 批量获取多个 z-index CSS 变量（编译时类型检查版本）
 * @param names - z-index 名称数组
 * @returns CSS z-index 变量数组
 * @example
 *   zIndexList("sticky", "backdrop")  // ["var(--cdt-zindex-sticky)", "var(--cdt-zindex-backdrop)"]
 */
export function zIndexList(...names: ZIndexKey[]): string[];

/**
 * 批量获取多个 z-index CSS 变量（运行时动态值版本）
 */
export function zIndexList(...names: string[]): string[];

/**
 * 批量获取多个 z-index CSS 变量（实现）
 */
export function zIndexList(...names: string[]): string[] {
  return names.map((name) => zIndex(name));
}

/**
 * 获取所有可用的 z-index 名称
 * @returns z-index 名称数组
 */
export function listZIndex(): string[] {
  // 在浏览器环境中，直接返回已知的 zindex tokens
  // 这些值与实际的 zindex tokens 保持同步
  return [
    "sticky",
    "fixed",
    "backdrop",
    "modals",
    "popover",
    "menu",
    "tooltip",
    "notification",
    "scroll-bar",
  ].sort();
}

/**
 * 检查 z-index 是否存在
 * @param name - z-index 名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns 是否存在
 */
export function zIndexExists(name: string, mode?: ThemeMode): boolean {
  const tokenValue = token(`zindex.${name}`);
  return tokenValue !== undefined && tokenValue !== null;
}

/**
 * 获取 z-index 的详细信息（用于文档和调试）
 * @param name - z-index 名称
 * @param mode - 主题模式（暂不支持，保留接口兼容性）
 * @returns z-index 详细信息
 */
export function zIndexInfo(name: string, mode?: ThemeMode) {
  const tokenValue = token(`zindex.${name}`);

  if (typeof tokenValue !== "number") {
    throw new Error(`Z-index '${name}' not found`);
  }

  return {
    name,
    path: `zindex.${name}`,
    value: tokenValue,
    cssValue: zIndex(name, mode),
    cssVariable: `--cdt-zindex-${name}`,
    numericValue: tokenValue,
  };
}
