/**
 * Helper Functions Types - 所有辅助函数的严格类型定义
 * 基于 Terrazzo 生成的 tokens 类型提供编译时类型安全
 */

import type { tokens } from "../../dist/tokens.js";

// ============================================================================
// 基础类型提取
// ============================================================================

// 提取各类 token 键
type ColorTokenKeys = Extract<keyof typeof tokens, `color.${string}`>;
type SpacingTokenKeys = Extract<keyof typeof tokens, `spacing.${string}`>;
type BreakpointTokenKeys = Extract<
  keyof typeof tokens,
  `breakpoints.${string}`
>;
type TypographyTokenKeys = Extract<keyof typeof tokens, `font.${string}`>;
type ShadowTokenKeys = Extract<keyof typeof tokens, `shadows.${string}`>;
type RadiusTokenKeys = Extract<keyof typeof tokens, `radius.${string}`>;
type ZIndexTokenKeys = Extract<keyof typeof tokens, `zindex.${string}`>;

// ============================================================================
// Color Types - 颜色相关类型
// ============================================================================

// 从完整颜色路径中提取可用的路径（移除 color. 前缀）
type ExtractColorPath<T extends string> = T extends `color.${infer Rest}`
  ? Rest
  : never;

// 颜色路径类型 - 支持完整路径和短路径
export type ColorPath =
  | ExtractColorPath<ColorTokenKeys> // 如 "background.accent", "blue.500"
  | ColorTokenKeys; // 如 "color.background.accent", "color.blue.500"

export type ColorAlpha = number;

// 提供一些常用的颜色路径类型别名
type BaseColorPath = ExtractColorPath<ColorTokenKeys>;
type BackgroundColors = Extract<BaseColorPath, `background.${string}`>;
type ForegroundColors = Extract<BaseColorPath, `foreground.${string}`>;
type BoundaryColors = Extract<BaseColorPath, `boundary.${string}`>;
type IconColors = Extract<BaseColorPath, `icon.${string}`>;
type StandardColors = Extract<
  BaseColorPath,
  | `blue.${string}`
  | `violet.${string}`
  | `purple.${string}`
  | `pink.${string}`
  | `teal.${string}`
  | `red.${string}`
  | `orange.${string}`
  | `yellow.${string}`
  | `green.${string}`
  | `gray.${string}`
  | `white`
  | `black`
>;

// 导出具体的颜色类型以供使用
export type {
  BackgroundColors,
  ForegroundColors,
  BoundaryColors,
  IconColors,
  StandardColors,
};

// ============================================================================
// Spacing Types - 间距相关类型
// ============================================================================

// 提取有效的键名
type ExtractSpacingKey<T extends string> = T extends `spacing.${infer Key}`
  ? Key
  : never;
type ExtractBreakpointKey<T extends string> =
  T extends `breakpoints.${infer Key}` ? Key : never;

type ValidSpacingKeys = ExtractSpacingKey<SpacingTokenKeys>;
type ValidBreakpointKeys = ExtractBreakpointKey<BreakpointTokenKeys>;

export type FractionString = `${number}/${number}`;
export type ArbitraryValue = `[${string}]`;

export type SpacingValue =
  | number
  | ValidSpacingKeys
  | ValidBreakpointKeys
  | FractionString
  | ArbitraryValue;

// ============================================================================
// Typography Types - 排版相关类型
// ============================================================================

// 提取字体相关键名
type ExtractFontKey<
  T extends string,
  Prefix extends string,
> = T extends `font.${Prefix}.${infer Key}` ? Key : never;

export type FontFamilyKey = ExtractFontKey<TypographyTokenKeys, "families">;
export type FontWeightKey = ExtractFontKey<TypographyTokenKeys, "weights">;
export type FontSizeKey = ExtractFontKey<TypographyTokenKeys, "sizes">;
export type LineHeightKey = ExtractFontKey<TypographyTokenKeys, "lineHeights">;
export type LetterSpacingKey = ExtractFontKey<
  TypographyTokenKeys,
  "letterSpacings"
>;

// Typography 预设类型（需要基于生成的复合 tokens）
export type TypographyPresetKey = string; // 这里需要从生成的 JSON 中动态获取

export type CSSProperties = Record<string, string | number>;

// ============================================================================
// Shadow Types - 阴影相关类型
// ============================================================================

type ExtractShadowKey<T extends string> = T extends `shadows.${infer Key}`
  ? Key
  : never;

export type ShadowKey = ExtractShadowKey<ShadowTokenKeys>;

// ============================================================================
// Radius Types - 圆角相关类型
// ============================================================================

type ExtractRadiusKey<T extends string> = T extends `radius.${infer Key}`
  ? Key
  : never;

export type RadiusKey = ExtractRadiusKey<RadiusTokenKeys>;

// ============================================================================
// Z-Index Types - 层级相关类型
// ============================================================================

type ExtractZIndexKey<T extends string> = T extends `zindex.${infer Key}`
  ? Key
  : never;

export type ZIndexKey = ExtractZIndexKey<ZIndexTokenKeys>;

// ============================================================================
// Breakpoint Types - 断点相关类型
// ============================================================================

export type BreakpointValue = ValidBreakpointKeys;
export type MediaQueryType = "screen" | "print" | "all";

// ============================================================================
// 通用类型
// ============================================================================

export type ThemeMode = "." | "light" | "dark";
