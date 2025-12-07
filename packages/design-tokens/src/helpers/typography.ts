// ============================================================================
// Typography Helper Functions - 字体排版辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// 注意：typography 相关功能将在后续版本中添加到 tokens.js
// ============================================================================

// 导入正确的类型定义
import type {
  FontFamilyKey,
  FontWeightKey,
  FontSizeKey,
  LineHeightKey,
  LetterSpacingKey,
  TypographyPresetKey,
  CSSProperties,
  ThemeMode,
} from "../types/helpers";

// 按照 Terrazzo 生成的实际导出方式导入
// @ts-ignore - tokens.js 由 Terrazzo 在构建时生成
import { tokens, token } from "../tokens.js";

// 直接导入 typography composite JSON 数据
import typographyCompositeData from "../../output/typography-composite-w3c.json";

export type TypographyValue = Record<string, string>;

// 加载复合 Typography tokens（这些不在 Terrazzo 简单输出中）
let compositeTypographyTokens: any = null;

function loadCompositeTypographyTokens() {
  if (compositeTypographyTokens === null) {
    try {
      // 使用预导入的 JSON 数据
      compositeTypographyTokens = flattenTokens(typographyCompositeData);
    } catch (error) {
      console.warn("Could not load composite typography tokens:", error);
      compositeTypographyTokens = {};
    }
  }
  return compositeTypographyTokens;
}

function flattenTokens(obj: any, prefix = ""): any {
  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && "$type" in value) {
      result[newKey] = value;
    } else if (value && typeof value === "object") {
      Object.assign(result, flattenTokens(value, newKey));
    }
  }

  return result;
}

// Typography preset 类型已在 types/helpers.ts 中定义

// ============================================================================
// Typography Preset Functions - 复合类型函数
// ============================================================================

/**
 * 获取完整的 typography 预设样式（编译时类型检查版本）
 * @param name - Typography preset 名称
 * @returns CSS 属性对象
 * @example
 *   typography("body.large")
 *   typography("body.medium")
 *   typography("heading.medium")
 *   typography("heading.display")
 */
export function typography(name: TypographyPresetKey): TypographyValue;

/**
 * 获取完整的 typography 预设样式（运行时动态值版本）
 * @param name - Typography preset 名称
 * @returns CSS 属性对象
 */
export function typography(name: string): TypographyValue;

/**
 * 获取完整的 typography 预设样式（实现）
 */
export function typography(name: string): TypographyValue {
  const compositeTokens = loadCompositeTypographyTokens();
  const tokenPath = `typography.${name}`;
  const typographyToken = compositeTokens[tokenPath];

  if (!typographyToken || typographyToken.$type !== "typography") {
    const availablePresets = listTypographyPresets();
    throw new Error(
      `Typography preset "${name}" not found. Available presets: ${availablePresets.join(", ")}`
    );
  }

  const value = typographyToken.$value;

  // 解析引用并转换为 CSS 变量格式
  return {
    fontFamily: resolveTokenReference(value.fontFamily),
    fontSize: resolveTokenReference(value.fontSize),
    fontWeight: resolveTokenReference(value.fontWeight),
    lineHeight: resolveTokenReference(value.lineHeight),
    letterSpacing: resolveTokenReference(value.letterSpacing),
  };
}

/**
 * 获取 typography 预设的 CSS 字符串（编译时类型检查版本）
 * @param name - Typography preset 名称
 * @returns CSS 字符串
 * @example
 *   typographyStyles("body.body-large")
 *   // "font-family: var(--cdt-font-families-default); font-size: var(--cdt-font-sizes-md); ..."
 */
export function typographyStyles(name: TypographyPresetKey): string;

/**
 * 获取 typography 预设的 CSS 字符串（运行时动态值版本）
 */
export function typographyStyles(name: string): string;

/**
 * 获取 typography 预设的 CSS 字符串（实现）
 */
export function typographyStyles(name: string): string {
  const styles = typography(name);

  return Object.entries(styles)
    .map(([property, value]) => {
      const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssProperty}: ${value}`;
    })
    .join("; ");
}

/**
 * 获取 typography 预设的样式对象（编译时类型检查版本）
 * @param name - Typography preset 名称
 * @returns React 样式对象
 * @example
 *   typographyStylesObject("body.large")
 *   // { fontFamily: "var(--cdt-font-families-default)", fontSize: "var(--cdt-font-sizes-md)", ... }
 */
export function typographyStylesObject(
  name: TypographyPresetKey
): CSSProperties;

/**
 * 获取 typography 预设的样式对象（运行时动态值版本）
 */
export function typographyStylesObject(name: string): CSSProperties;

/**
 * 获取 typography 预设的样式对象（实现）
 */
export function typographyStylesObject(name: string): CSSProperties {
  return typography(name) as CSSProperties;
}

// ============================================================================
// Individual Property Functions - 原子类型函数
// ============================================================================

/**
 * 获取字体族（编译时类型检查版本）
 * @param name - 字体族名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体族值或 CSS 变量
 * @example
 *   fontFamily("default")        // "var(--cdt-font-families-default)"
 *   fontFamily("mono", false)    // "Roboto Mono, Monaco, Courier New, ..."
 */
export function fontFamily(name: FontFamilyKey, asVar?: boolean): string;

/**
 * 获取字体族（运行时动态值版本）
 */
export function fontFamily(name: string, asVar?: boolean): string;

/**
 * 获取字体族（实现）
 */
export function fontFamily(name: string, asVar: boolean = true): string {
  const tokenKey = `font.families.${name}`;

  if (!(tokenKey in tokens)) {
    const availableFamilies = listFontFamilies();
    throw new Error(
      `Font family "${name}" not found. Available families: ${availableFamilies.join(", ")}`
    );
  }

  if (asVar) {
    return `var(--cdt-font-families-${name})`;
  }

  const families = token(tokenKey);
  return Array.isArray(families) ? families.join(", ") : String(families);
}

/**
 * 获取字体重量（编译时类型检查版本）
 * @param name - 字体重量名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体重量值或 CSS 变量
 * @example
 *   fontWeight("strong")        // "var(--cdt-font-weights-strong)"
 *   fontWeight("heavy", false)  // "550"
 */
export function fontWeight(name: FontWeightKey, asVar?: boolean): string;

/**
 * 获取字体重量（运行时动态值版本）
 */
export function fontWeight(name: string, asVar?: boolean): string;

/**
 * 获取字体重量（实现）
 */
export function fontWeight(name: string, asVar: boolean = true): string {
  const tokenKey = `font.weights.${name}`;

  if (!(tokenKey in tokens)) {
    const availableWeights = listFontWeights();
    throw new Error(
      `Font weight "${name}" not found. Available weights: ${availableWeights.join(", ")}`
    );
  }

  if (asVar) {
    return `var(--cdt-font-weights-${name})`;
  }

  return String(token(tokenKey));
}

/**
 * 获取字体大小（编译时类型检查版本）
 * @param name - 字体大小名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体大小值或 CSS 变量
 * @example
 *   fontSize("md")           // "var(--cdt-font-sizes-md)"
 *   fontSize("lg", false)    // "0.9375rem"
 */
export function fontSize(name: FontSizeKey, asVar?: boolean): string;

/**
 * 获取字体大小（运行时动态值版本）
 */
export function fontSize(name: string, asVar?: boolean): string;

/**
 * 获取字体大小（实现）
 */
export function fontSize(name: string, asVar: boolean = true): string {
  const tokenKey = `font.sizes.${name}`;

  if (!(tokenKey in tokens)) {
    const availableSizes = listFontSizes();
    throw new Error(
      `Font size "${name}" not found. Available sizes: ${availableSizes.join(", ")}`
    );
  }

  if (asVar) {
    return `var(--cdt-font-sizes-${name})`;
  }

  const sizeToken = token(tokenKey);
  if (
    typeof sizeToken === "object" &&
    sizeToken &&
    "value" in sizeToken &&
    "unit" in sizeToken
  ) {
    return `${sizeToken.value}${sizeToken.unit}`;
  }

  return String(sizeToken);
}

/**
 * 获取行高（编译时类型检查版本）
 * @param name - 行高名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 行高值或 CSS 变量
 * @example
 *   lineHeight("normal")        // "var(--cdt-font-lineHeights-normal)"
 *   lineHeight("relaxed", false) // "1.5625rem"
 */
export function lineHeight(name: LineHeightKey, asVar?: boolean): string;

/**
 * 获取行高（运行时动态值版本）
 */
export function lineHeight(name: string, asVar?: boolean): string;

/**
 * 获取行高（实现）
 */
export function lineHeight(name: string, asVar: boolean = true): string {
  const tokenKey = `font.lineHeights.${name}`;

  if (!(tokenKey in tokens)) {
    const availableLineHeights = listLineHeights();
    throw new Error(
      `Line height "${name}" not found. Available line heights: ${availableLineHeights.join(", ")}`
    );
  }

  if (asVar) {
    return `var(--cdt-font-lineHeights-${name})`;
  }

  const lineHeightToken = token(tokenKey);
  if (
    typeof lineHeightToken === "object" &&
    lineHeightToken &&
    "value" in lineHeightToken &&
    "unit" in lineHeightToken
  ) {
    return `${lineHeightToken.value}${lineHeightToken.unit}`;
  }

  return String(lineHeightToken);
}

/**
 * 获取字符间距（编译时类型检查版本）
 * @param name - 字符间距名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字符间距值或 CSS 变量
 * @example
 *   letterSpacing("body-large")      // "var(--cdt-font-letterSpacings-body-large)"
 *   letterSpacing("display", false)  // "-0.09rem"
 */
export function letterSpacing(name: LetterSpacingKey, asVar?: boolean): string;

/**
 * 获取字符间距（运行时动态值版本）
 */
export function letterSpacing(name: string, asVar?: boolean): string;

/**
 * 获取字符间距（实现）
 */
export function letterSpacing(name: string, asVar: boolean = true): string {
  const tokenKey = `font.letterSpacings.${name}`;

  if (!(tokenKey in tokens)) {
    const availableSpacings = listLetterSpacings();
    throw new Error(
      `Letter spacing "${name}" not found. Available spacings: ${availableSpacings.join(", ")}`
    );
  }

  if (asVar) {
    return `var(--cdt-font-letterSpacings-${name})`;
  }

  const spacingToken = token(tokenKey);
  if (
    typeof spacingToken === "object" &&
    spacingToken &&
    "value" in spacingToken &&
    "unit" in spacingToken
  ) {
    return `${spacingToken.value}${spacingToken.unit}`;
  }

  return String(spacingToken);
}

// ============================================================================
// Utility Functions - 工具函数
// ============================================================================

/**
 * 列出所有可用的 typography presets
 * @returns Typography preset 名称数组
 */
export function listTypographyPresets(): string[] {
  const compositeTokens = loadCompositeTypographyTokens();
  return Object.keys(compositeTokens)
    .filter((path) => path.startsWith("typography."))
    .map((path) => path.replace("typography.", ""))
    .sort();
}

/**
 * 列出所有可用的字体族
 * @returns 字体族名称数组
 */
export function listFontFamilies(): string[] {
  return Object.keys(tokens)
    .filter((key: string) => key.startsWith("font.families."))
    .map((key: string) => key.replace("font.families.", ""));
}

/**
 * 列出所有可用的字体重量
 * @returns 字体重量名称数组
 */
export function listFontWeights(): string[] {
  return Object.keys(tokens)
    .filter((key: string) => key.startsWith("font.weights."))
    .map((key: string) => key.replace("font.weights.", ""));
}

/**
 * 列出所有可用的字体大小
 * @returns 字体大小名称数组
 */
export function listFontSizes(): string[] {
  return Object.keys(tokens)
    .filter((key: string) => key.startsWith("font.sizes."))
    .map((key: string) => key.replace("font.sizes.", ""));
}

/**
 * 列出所有可用的行高
 * @returns 行高名称数组
 */
export function listLineHeights(): string[] {
  return Object.keys(tokens)
    .filter((key: string) => key.startsWith("font.lineHeights."))
    .map((key: string) => key.replace("font.lineHeights.", ""));
}

/**
 * 列出所有可用的字符间距
 * @returns 字符间距名称数组
 */
export function listLetterSpacings(): string[] {
  return Object.keys(tokens)
    .filter((key: string) => key.startsWith("font.letterSpacings."))
    .map((key: string) => key.replace("font.letterSpacings.", ""));
}

/**
 * 检查 typography preset 是否存在
 * @param name - Typography preset 名称
 * @returns 是否存在
 */
export function typographyExists(name: string): boolean {
  const availablePresets = listTypographyPresets();
  return availablePresets.includes(name);
}

/**
 * 获取 typography preset 的详细信息
 * @param name - Typography preset 名称
 * @returns Typography preset 详细信息
 */
export function typographyInfo(name: string) {
  const compositeTokens = loadCompositeTypographyTokens();
  const tokenPath = `typography.${name}`;
  const typographyToken = compositeTokens[tokenPath];

  if (!typographyToken || typographyToken.$type !== "typography") {
    throw new Error(`Typography preset "${name}" not found`);
  }

  const value = typographyToken.$value;

  return {
    name,
    path: tokenPath,
    type: typographyToken.$type,
    description: typographyToken.$description,
    value: {
      fontFamily: value.fontFamily,
      fontSize: value.fontSize,
      fontWeight: value.fontWeight,
      lineHeight: value.lineHeight,
      letterSpacing: value.letterSpacing,
    },
    resolved: {
      fontFamily: resolveTokenReference(value.fontFamily),
      fontSize: resolveTokenReference(value.fontSize),
      fontWeight: resolveTokenReference(value.fontWeight),
      lineHeight: resolveTokenReference(value.lineHeight),
      letterSpacing: resolveTokenReference(value.letterSpacing),
    },
  };
}

// ============================================================================
// Internal Helper Functions - 内部辅助函数
// ============================================================================

/**
 * 解析 token 引用并转换为 CSS 变量
 * @param reference - Token 引用字符串
 * @returns CSS 变量
 */
function resolveTokenReference(reference: string): string {
  if (
    typeof reference !== "string" ||
    !reference.startsWith("{") ||
    !reference.endsWith("}")
  ) {
    return reference;
  }

  // 移除大括号并获取路径
  const tokenPath = reference.slice(1, -1);

  // 转换为 CSS 变量格式
  const cssVarName = tokenPath.replace(/\./g, "-");
  return `var(--cdt-${cssVarName})`;
}
