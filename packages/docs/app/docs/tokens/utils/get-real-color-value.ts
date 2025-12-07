import {
  color,
  hasColor,
  colorHex,
  colorRgb,
  getAllAvailableColors,
  token,
} from "@choice-ui/design-tokens";
import type { ColorPath } from "@choice-ui/design-tokens";
import tinycolor from "tinycolor2";

export type ColorType =
  | "semantic"
  | "extended-semantic"
  | "base-light"
  | "base-dark";

/**
 * 获取真实的颜色值（用于文档展示）
 * @param colorKey - 颜色键名（如 "background.default" 或 "blue.500"）
 * @param opacity - 不透明度
 * @param colorType - 颜色类型
 * @param mode - 主题模式
 * @returns 颜色值信息
 */
export function getRealColorValue(
  colorKey: string,
  opacity: number = 1,
  colorType: ColorType = "semantic",
  mode: "light" | "dark" = "light"
) {
  try {
    // 修复：将主题模式参数转换为正确格式
    const themeMode = mode === "light" ? "." : "dark";

    // 使用新的 color 函数获取 CSS 变量（类型断言以避免严格类型检查）
    const cssValue = color(colorKey as ColorPath, opacity, themeMode);

    // 直接从 Terrazzo tokens 获取颜色值
    let hexValue = "#000000";
    let rgbValue = "rgb(0, 0, 0)";
    let realOpacity = opacity;
    let isValid = true;

    try {
      // 获取 token 数据来获取真实的透明度
      const tokenPath = colorKey.startsWith("color.")
        ? colorKey
        : `color.${colorKey}`;
      const tokenData = token(tokenPath, themeMode);

      // 获取原始的 hex 和 rgb 值
      hexValue = colorHex(colorKey as ColorPath, themeMode);
      const [r, g, b] = colorRgb(colorKey as ColorPath, themeMode);
      rgbValue = `rgb(${r}, ${g}, ${b})`;

      // 从 token 数据中获取真实的透明度
      if (tokenData && tokenData.alpha !== undefined) {
        realOpacity = tokenData.alpha;
      }
    } catch (error) {
      // 如果找不到颜色，标记为无效
      console.warn(
        `Color "${colorKey}" not found in tokens for mode "${mode}"`
      );
      isValid = false;

      // 仅在确实找不到时使用极简的 fallback
      if (colorKey.includes("white") || colorKey.includes("default")) {
        hexValue = "#ffffff";
        rgbValue = "rgb(255, 255, 255)";
      } else if (colorKey.includes("black") || colorKey.includes("inverse")) {
        hexValue = "#000000";
        rgbValue = "rgb(0, 0, 0)";
      } else {
        // 其他情况使用中性灰色作为 fallback
        hexValue = "#6c757d";
        rgbValue = "rgb(108, 117, 125)";
      }
    }

    // 使用实际的透明度值（优先使用传入的 opacity，除非用户没有指定且token有透明度）
    const finalOpacity = opacity !== 1 ? opacity : realOpacity;

    // 生成带透明度的值
    const rgbaValue = tinycolor(hexValue).setAlpha(finalOpacity).toRgbString();

    return {
      key: colorKey,
      opacity: finalOpacity,
      colorType,
      mode,
      hexValue,
      rgbValue,
      rgbaValue,
      cssValue, // 这是CSS变量，是实际使用的值
      isValid,
    };
  } catch (error) {
    console.warn(`Failed to get color value for ${colorKey}:`, error);
    return {
      key: colorKey,
      opacity,
      colorType,
      mode,
      hexValue: "#000000",
      rgbValue: "rgb(0, 0, 0)",
      rgbaValue: "rgba(0, 0, 0, 0)",
      cssValue: "transparent",
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 获取可用的颜色别名（新的实现）
 */
export function getAvailableColorAliases(): string[] {
  try {
    return getAllAvailableColors();
  } catch (error) {
    console.warn("Failed to get available colors:", error);
    return [];
  }
}

/**
 * 按类别获取颜色
 */
export function getColorsByType(
  category: "background" | "text" | "border" | "icon"
): string[] {
  try {
    const allColors = getAllAvailableColors();
    return allColors.filter((color) => color.startsWith(`${category}.`));
  } catch (error) {
    console.warn(`Failed to get colors for category ${category}:`, error);
    return [];
  }
}

/**
 * 检查颜色键是否有效
 */
export function isValidColorKey(colorKey: string): boolean {
  // 修复：为 hasColor 函数提供正确的参数
  return hasColor(colorKey as ColorPath, ".");
}

/**
 * 获取颜色 token 的透明度值
 * @param colorKey - 颜色键名（如 "text.on-accent-secondary"）
 * @param mode - 主题模式
 * @returns 透明度值 (0-1)
 */
export function getColorAlpha(
  colorKey: string,
  mode: "light" | "dark" = "light"
): number {
  try {
    const themeMode = mode === "light" ? "." : "dark";
    const tokenPath = colorKey.startsWith("color.")
      ? colorKey
      : `color.${colorKey}`;

    const tokenData = token(tokenPath, themeMode);

    if (tokenData && tokenData.alpha !== undefined) {
      return tokenData.alpha;
    }

    return 1.0; // 默认不透明
  } catch (error) {
    console.warn(`Failed to get alpha for ${colorKey}:`, error);
    return 1.0;
  }
}

/**
 * 获取颜色数据的辅助信息
 */
export function getColorInfo(colorKey: string) {
  // 检查是否为语义颜色（使用新的命名系统）
  const isSemanticColor =
    colorKey.startsWith("background.") ||
    colorKey.startsWith("text.") ||
    colorKey.startsWith("border.") ||
    colorKey.startsWith("icon.");

  // 检查是否为标准色阶
  const isStandardColor = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "pink",
    "teal",
    "orange",
    "violet",
    "gray",
  ].some((c) => colorKey.startsWith(`${c}.`));

  // 检查是否为 pale 颜色
  const isPaleColor = colorKey.includes("-pale.");

  // 大多数颜色都支持主题模式
  const hasThemeSupport = isSemanticColor || isStandardColor || isPaleColor;

  return {
    tokenKey: colorKey,
    hasLightMode: hasThemeSupport,
    hasDarkMode: hasThemeSupport,
    isThemed: hasThemeSupport,
    isSemanticColor,
    isStandardColor,
    isPaleColor,
  };
}

/**
 * 获取颜色类别前缀列表
 */
export const COLOR_CATEGORIES = [
  "background",
  "text",
  "border",
  "icon",
] as const;

export type ColorCategory = (typeof COLOR_CATEGORIES)[number];

/**
 * 检查颜色是否属于指定类别
 */
export function isColorInCategory(
  colorKey: string,
  category: ColorCategory
): boolean {
  return colorKey.startsWith(`${category}.`);
}
