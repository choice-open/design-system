import { readFileSync } from "fs";
import { join } from "path";

/**
 * Typography Functions Plugin for SCSS - v2 版本
 * 生成与 CSS-in-JS API 完全一致的 SCSS typography 函数
 */
export default function scssTypographyFunctionsV2(userOptions = {}) {
  return {
    name: "scss-typography-functions-v2",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const typographyFunctions = generateTypographyFunctions();

      // 存储到全局状态 - 与其他 SCSS 插件保持一致
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      if (!global.designTokensHelpers.scss) {
        global.designTokensHelpers.scss = {};
      }
      global.designTokensHelpers.scss.typography = typographyFunctions;
    },
  };
}

function generateTypographyFunctions() {
  // 读取原子 typography 数据以获取可用选项
  const typographyAtomicData = readTypographyAtomicData();

  return `
// ============================================================================
// TYPOGRAPHY FUNCTIONS
// ============================================================================

@use "sass:list";
@use "sass:meta";

// ============================================================================
// Typography 工具函数 - 与 CSS-in-JS API 完全一致
// ============================================================================

// ============================================================================
// Font Family Functions - 字体族函数
// ============================================================================

/// 获取字体族 - 与 CSS-in-JS fontFamily() 完全一致
/// @param {String} $name - 字体族名称
/// @return {String} CSS 字体族变量
/// @example scss - 使用示例
///   .heading {
///     font-family: font-family("display");
///   }
@function font-family($name) {
  @if not _font-family-exists($name) {
    @error "Font family '#{$name}' not found. Available font families: #{_list-font-families()}";
  }
  @return var(--cdt-font-families-#{$name});
}

/// 批量获取多个字体族 - 与 CSS-in-JS fontFamilyList() 一致
/// @param {String...} $names - 字体族名称列表
/// @return {List} CSS 字体族变量列表
@function font-family-list($names...) {
  $result: ();
  @each $name in $names {
    $result: list.append($result, font-family($name));
  }
  @return $result;
}

// ============================================================================
// Font Weight Functions - 字体重量函数
// ============================================================================

/// 获取字体重量 - 与 CSS-in-JS fontWeight() 完全一致
/// @param {String} $name - 字体重量名称
/// @return {String} CSS 字体重量变量
/// @example scss - 使用示例
///   .bold {
///     font-weight: font-weight("strong");
///   }
@function font-weight($name) {
  @if not _font-weight-exists($name) {
    @error "Font weight '#{$name}' not found. Available font weights: #{_list-font-weights()}";
  }
  @return var(--cdt-font-weights-#{$name});
}

/// 批量获取多个字体重量 - 与 CSS-in-JS fontWeightList() 一致
/// @param {String...} $names - 字体重量名称列表
/// @return {List} CSS 字体重量变量列表
@function font-weight-list($names...) {
  $result: ();
  @each $name in $names {
    $result: list.append($result, font-weight($name));
  }
  @return $result;
}

// ============================================================================
// Font Size Functions - 字体大小函数
// ============================================================================

/// 获取字体大小 - 与 CSS-in-JS fontSize() 完全一致
/// @param {String} $name - 字体大小名称
/// @return {String} CSS 字体大小变量
/// @example scss - 使用示例
///   .large {
///     font-size: font-size("lg");
///   }
@function font-size($name) {
  @if not _font-size-exists($name) {
    @error "Font size '#{$name}' not found. Available font sizes: #{_list-font-sizes()}";
  }
  @return var(--cdt-font-sizes-#{$name});
}

/// 批量获取多个字体大小 - 与 CSS-in-JS fontSizeList() 一致
/// @param {String...} $names - 字体大小名称列表
/// @return {List} CSS 字体大小变量列表
@function font-size-list($names...) {
  $result: ();
  @each $name in $names {
    $result: list.append($result, font-size($name));
  }
  @return $result;
}

// ============================================================================
// Line Height Functions - 行高函数
// ============================================================================

/// 获取行高 - 与 CSS-in-JS lineHeight() 完全一致
/// @param {String} $name - 行高名称
/// @return {String} CSS 行高变量
/// @example scss - 使用示例
///   .relaxed {
///     line-height: line-height("relaxed");
///   }
@function line-height($name) {
  @if not _line-height-exists($name) {
    @error "Line height '#{$name}' not found. Available line heights: #{_list-line-heights()}";
  }
  @return var(--cdt-font-line-heights-#{$name});
}

/// 批量获取多个行高 - 与 CSS-in-JS lineHeightList() 一致
/// @param {String...} $names - 行高名称列表
/// @return {List} CSS 行高变量列表
@function line-height-list($names...) {
  $result: ();
  @each $name in $names {
    $result: list.append($result, line-height($name));
  }
  @return $result;
}

// ============================================================================
// Letter Spacing Functions - 字符间距函数
// ============================================================================

/// 获取字符间距 - 与 CSS-in-JS letterSpacing() 完全一致
/// @param {String} $name - 字符间距名称
/// @return {String} CSS 字符间距变量
/// @example scss - 使用示例
///   .spaced {
///     letter-spacing: letter-spacing("body-large");
///   }
@function letter-spacing($name) {
  @if not _letter-spacing-exists($name) {
    @error "Letter spacing '#{$name}' not found. Available letter spacings: #{_list-letter-spacings()}";
  }
  @return var(--cdt-font-letter-spacings-#{$name});
}

/// 批量获取多个字符间距 - 与 CSS-in-JS letterSpacingList() 一致
/// @param {String...} $names - 字符间距名称列表
/// @return {List} CSS 字符间距变量列表
@function letter-spacing-list($names...) {
  $result: ();
  @each $name in $names {
    $result: list.append($result, letter-spacing($name));
  }
  @return $result;
}

// ============================================================================
// 辅助函数
// ============================================================================

/// 检查字体族是否存在
/// @param {String} $name - 字体族名称
/// @return {Boolean} 是否存在
/// @access private
@function _font-family-exists($name) {
  $valid-families: (${generateFontFamilyList(typographyAtomicData)});
  @return list.index($valid-families, $name) != null;
}

/// 列出所有可用字体族
/// @return {List} 字体族名称列表
/// @access private
@function _list-font-families() {
  @return (${generateFontFamilyList(typographyAtomicData)});
}

/// 检查字体重量是否存在
/// @param {String} $name - 字体重量名称
/// @return {Boolean} 是否存在
/// @access private
@function _font-weight-exists($name) {
  $valid-weights: (${generateFontWeightList(typographyAtomicData)});
  @return list.index($valid-weights, $name) != null;
}

/// 列出所有可用字体重量
/// @return {List} 字体重量名称列表
/// @access private
@function _list-font-weights() {
  @return (${generateFontWeightList(typographyAtomicData)});
}

/// 检查字体大小是否存在
/// @param {String} $name - 字体大小名称
/// @return {Boolean} 是否存在
/// @access private
@function _font-size-exists($name) {
  $valid-sizes: (${generateFontSizeList(typographyAtomicData)});
  @return list.index($valid-sizes, $name) != null;
}

/// 列出所有可用字体大小
/// @return {List} 字体大小名称列表
/// @access private
@function _list-font-sizes() {
  @return (${generateFontSizeList(typographyAtomicData)});
}

/// 检查行高是否存在
/// @param {String} $name - 行高名称
/// @return {Boolean} 是否存在
/// @access private
@function _line-height-exists($name) {
  $valid-line-heights: (${generateLineHeightList(typographyAtomicData)});
  @return list.index($valid-line-heights, $name) != null;
}

/// 列出所有可用行高
/// @return {List} 行高名称列表
/// @access private
@function _list-line-heights() {
  @return (${generateLineHeightList(typographyAtomicData)});
}

/// 检查字符间距是否存在
/// @param {String} $name - 字符间距名称
/// @return {Boolean} 是否存在
/// @access private
@function _letter-spacing-exists($name) {
  $valid-letter-spacings: (${generateLetterSpacingList(typographyAtomicData)});
  @return list.index($valid-letter-spacings, $name) != null;
}

/// 列出所有可用字符间距
/// @return {List} 字符间距名称列表
/// @access private
@function _list-letter-spacings() {
  @return (${generateLetterSpacingList(typographyAtomicData)});
}`;
}

/**
 * 读取 typography atomic 数据
 */
function readTypographyAtomicData() {
  try {
    // 尝试当前目录路径（在 packages/design-tokens 中运行）
    const filePath = join(process.cwd(), "output/typography-atomic-w3c.json");
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    try {
      // 尝试从项目根目录
      const fallbackPath = join(
        process.cwd(),
        "packages/design-tokens/output/typography-atomic-w3c.json"
      );
      const data = readFileSync(fallbackPath, "utf8");
      return JSON.parse(data);
    } catch (fallbackError) {
      console.warn(
        "Could not load typography atomic data from either path:",
        error.message,
        fallbackError.message
      );
      return { font: {} };
    }
  }
}

/**
 * 生成字体族选项列表
 */
function generateFontFamilyList(data) {
  if (!data.font || !data.font.families) return "";
  return Object.keys(data.font.families)
    .map((name) => `"${name}"`)
    .join(",\n    ");
}

/**
 * 生成字体重量选项列表
 */
function generateFontWeightList(data) {
  if (!data.font || !data.font.weights) return "";
  return Object.keys(data.font.weights)
    .map((name) => `"${name}"`)
    .join(",\n    ");
}

/**
 * 生成字体大小选项列表
 */
function generateFontSizeList(data) {
  if (!data.font || !data.font.sizes) return "";
  return Object.keys(data.font.sizes)
    .map((name) => `"${name}"`)
    .join(",\n    ");
}

/**
 * 生成行高选项列表
 */
function generateLineHeightList(data) {
  if (!data.font || !data.font["line-heights"]) return "";
  return Object.keys(data.font["line-heights"])
    .map((name) => `"${name}"`)
    .join(",\n    ");
}

/**
 * 生成字符间距选项列表
 */
function generateLetterSpacingList(data) {
  if (!data.font || !data.font["letter-spacings"]) return "";
  return Object.keys(data.font["letter-spacings"])
    .map((name) => `"${name}"`)
    .join(",\n    ");
}
