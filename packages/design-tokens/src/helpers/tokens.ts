/**
 * Design Tokens - 直接使用 Terrazzo 生成的 tokens
 *
 * 按照 Terrazzo 官方文档：https://terrazzo.app/docs/cli/integrations/js/
 * 使用方式：import token from "./tokens.js"; token("color.blue.500");
 */

// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { token, tokens } from "../tokens.js";

// 重新导出，方便其他模块使用
export { tokens, token };
export default token;

// 重新导出类型（用于其他 helper 函数）
export type {
  ColorTokenNormalized,
  DimensionTokenNormalized,
  FontFamilyTokenNormalized,
  FontWeightTokenNormalized,
  NumberTokenNormalized,
  ShadowTokenNormalized,
} from "@terrazzo/parser";

// 获取所有 token 键的类型
export type TokenKey = keyof typeof tokens;

// 获取主题模式类型
export type ThemeMode = "." | "light" | "dark";

// 获取 Color token 键的类型
export type ColorTokenKey = Extract<TokenKey, `color.${string}`>;

// 获取 Shadow token 键的类型
export type ShadowTokenKey = Extract<TokenKey, `shadows.${string}`>;

// 获取 Dimension token 键的类型
export type DimensionTokenKey = Extract<
  TokenKey,
  | `spacing.${string}`
  | `radius.${string}`
  | `font.sizes.${string}`
  | `font.lineHeights.${string}`
  | `font.letterSpacings.${string}`
  | `breakpoints.${string}`
>;

// 获取 Number token 键的类型
export type NumberTokenKey = Extract<TokenKey, `zindex.${string}`>;

// 获取 FontFamily token 键的类型
export type FontFamilyTokenKey = Extract<TokenKey, `font.families.${string}`>;

// 获取 FontWeight token 键的类型
export type FontWeightTokenKey = Extract<TokenKey, `font.weights.${string}`>;

/**
 * 检查 token 是否存在
 */
export function tokenExists<T extends string>(
  tokenId: T
): tokenId is T & TokenKey {
  return tokenId in tokens;
}

/**
 * 获取所有 token 键
 */
export function listTokens(): string[] {
  return Object.keys(tokens).filter(
    (key): key is string => typeof key === "string"
  );
}

/**
 * 获取 token 的详细信息
 */
export function tokenInfo<K extends TokenKey>(tokenId: K) {
  const tokenData = tokens[tokenId];
  if (!tokenData) {
    throw new Error(`Token "${String(tokenId)}" not found`);
  }

  return {
    id: tokenId,
    modes: Object.keys(tokenData).filter(
      (key): key is string => typeof key === "string"
    ),
    data: tokenData,
  };
}

// ============================================================================
// 兼容性函数 - 为其他 helper 文件提供向后兼容
// ============================================================================

/**
 * 获取设计令牌值 (兼容性函数)
 * @param path - 令牌路径，如 "color.background.default"
 * @param mode - 主题模式，默认为 "."
 * @returns 令牌对象
 */
export function getToken(path: string, mode: ThemeMode = ".") {
  const tokenData = tokens[path as TokenKey];
  if (!tokenData) {
    throw new Error(`Token '${path}' not found`);
  }

  // 安全地访问模式数据
  const modeData = (tokenData as any)[mode];
  if (modeData === undefined) {
    // 如果指定模式不存在，尝试默认模式
    const defaultData = (tokenData as any)["."];
    if (defaultData === undefined) {
      throw new Error(
        `Token '${path}' has no data for mode '${mode}' or default mode`
      );
    }
    return defaultData;
  }

  return modeData;
}

/**
 * 获取完整的设计令牌对象（包含所有模式）(兼容性函数)
 * @param path - 令牌路径
 * @returns 完整的令牌对象
 */
export function getFullToken(path: string) {
  const tokenData = tokens[path as TokenKey];
  if (!tokenData) {
    throw new Error(`Token '${path}' not found`);
  }
  return tokenData;
}

/**
 * 获取所有令牌路径 (兼容性函数)
 * @returns 令牌路径数组
 */
export function getAllTokenPaths(): string[] {
  return listTokens();
}

/**
 * 将尺寸令牌转换为 CSS 值 (兼容性函数)
 * @param dimensionToken - 尺寸令牌对象
 * @returns CSS 尺寸字符串
 */
export function dimensionTokenToCss(dimensionToken: any): string {
  if (
    !dimensionToken ||
    typeof dimensionToken.value === "undefined" ||
    !dimensionToken.unit
  ) {
    throw new Error("Invalid dimension token");
  }

  return `${dimensionToken.value}${dimensionToken.unit}`;
}
