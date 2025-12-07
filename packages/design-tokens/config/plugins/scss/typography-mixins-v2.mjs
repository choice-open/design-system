import { readFileSync } from "fs";
import { join } from "path";

/**
 * Typography Mixins Plugin for SCSS - v2 版本
 * 生成与 CSS-in-JS API 完全一致的 SCSS typography mixins
 */
export default function scssTypographyMixinsV2(userOptions = {}) {
  return {
    name: "scss-typography-mixins-v2",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const typographyMixins = generateTypographyMixins();

      // 存储到全局状态 - 与其他 SCSS mixins 插件保持一致
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      if (!global.designTokensHelpers.scssMixins) {
        global.designTokensHelpers.scssMixins = [];
      }

      // 添加 typography mixins 到数组中
      global.designTokensHelpers.scssMixins.push({
        name: "typography",
        content: typographyMixins,
      });
    },
  };
}

function generateTypographyMixins() {
  // 读取 composite typography 数据以获取可用预设
  const typographyCompositeData = readTypographyCompositeData();
  const typographyPresets = extractTypographyPresets(typographyCompositeData);

  return `
// ============================================================================
// TYPOGRAPHY MIXINS
// ============================================================================

@use "sass:map";
@use "sass:list";

// ============================================================================
// Typography 工具 Mixins - 与 CSS-in-JS API 完全一致
// ============================================================================

// Typography 预设数据
$typography-presets: (${generateTypographyPresetsMap(typographyPresets)});

/// 应用 typography 预设样式 - 与 CSS-in-JS typographyStyles() 一致
/// @param {String} $name - Typography preset 名称 (如 "body.large", "heading.medium")
/// @example scss - 使用示例
///   .card-title {
///     @include typography-styles("heading.large");
///   }
///   .body-text {
///     @include typography-styles("body.medium");
///   }
@mixin typography-styles($name) {
  @if not map.has-key($typography-presets, $name) {
    $available-presets: map.keys($typography-presets);
    @error "Typography preset '#{$name}' not found. Available presets: #{$available-presets}";
  }
  
  $preset: map.get($typography-presets, $name);
  
  font-family: map.get($preset, 'font-family');
  font-size: map.get($preset, 'font-size');
  font-weight: map.get($preset, 'font-weight');
  line-height: map.get($preset, 'line-height');
  letter-spacing: map.get($preset, 'letter-spacing');
}

/// 应用字体族样式
/// @param {String} $name - 字体族名称
/// @example scss - 使用示例
///   .heading {
///     @include font-family-style("display");
///   }
@mixin font-family-style($name) {
  font-family: font-family($name);
}

/// 应用字体重量样式
/// @param {String} $name - 字体重量名称
/// @example scss - 使用示例
///   .bold {
///     @include font-weight-style("strong");
///   }
@mixin font-weight-style($name) {
  font-weight: font-weight($name);
}

/// 应用字体大小样式
/// @param {String} $name - 字体大小名称
/// @example scss - 使用示例
///   .large {
///     @include font-size-style("lg");
///   }
@mixin font-size-style($name) {
  font-size: font-size($name);
}

/// 应用行高样式
/// @param {String} $name - 行高名称
/// @example scss - 使用示例
///   .relaxed {
///     @include line-height-style("relaxed");
///   }
@mixin line-height-style($name) {
  line-height: line-height($name);
}

/// 应用字符间距样式
/// @param {String} $name - 字符间距名称
/// @example scss - 使用示例
///   .spaced {
///     @include letter-spacing-style("body-large");
///   }
@mixin letter-spacing-style($name) {
  letter-spacing: letter-spacing($name);
}

/// 重置字体样式为默认值
/// @example scss - 使用示例
///   .reset {
///     @include reset-typography();
///   }
@mixin reset-typography() {
  font-family: font-family("default");
  font-size: font-size("md");
  font-weight: font-weight("default");
  line-height: line-height("normal");
  letter-spacing: letter-spacing("body-medium");
}

/// 创建响应式 typography，在不同断点使用不同预设
/// @param {Map} $breakpoint-presets - 断点和预设的映射
/// @example scss - 使用示例
///   .responsive-heading {
///     @include responsive-typography((
///       'mobile': 'heading.small',
///       'tablet': 'heading.medium',
///       'desktop': 'heading.large'
///     ));
///   }
@mixin responsive-typography($breakpoint-presets) {
  @each $breakpoint, $preset in $breakpoint-presets {
    @if $breakpoint == 'default' or $breakpoint == 'base' {
      @include typography-styles($preset);
    } @else {
      @include up($breakpoint) {
        @include typography-styles($preset);
      }
    }
  }
}

/// 应用文本省略号样式（单行）
/// @example scss - 使用示例
///   .truncate {
///     @include text-ellipsis();
///   }
@mixin text-ellipsis() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/// 应用多行文本省略号样式
/// @param {Number} $lines - 显示的行数，默认 2
/// @example scss - 使用示例
///   .truncate-multiline {
///     @include text-ellipsis-multiline(3);
///   }
@mixin text-ellipsis-multiline($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/// 应用 CSS 变量的 typography 样式（用于动态主题）
/// @param {String} $name - Typography preset 名称
/// @param {String} $prefix - CSS 变量前缀，默认为 'typography'
/// @example scss - 使用示例
///   .dynamic-text {
///     @include typography-styles-var("heading.large", "theme");
///   }
@mixin typography-styles-var($name, $prefix: 'typography') {
  font-family: var(--#{$prefix}-#{$name}-font-family, font-family("default"));
  font-size: var(--#{$prefix}-#{$name}-font-size, font-size("md"));
  font-weight: var(--#{$prefix}-#{$name}-font-weight, font-weight("default"));
  line-height: var(--#{$prefix}-#{$name}-line-height, line-height("normal"));
  letter-spacing: var(--#{$prefix}-#{$name}-letter-spacing, letter-spacing("body-medium"));
}`;
}

/**
 * 读取 typography composite 数据
 */
function readTypographyCompositeData() {
  try {
    // 尝试当前目录路径（在 packages/design-tokens 中运行）
    const filePath = join(
      process.cwd(),
      "output/typography-composite-w3c.json"
    );
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    try {
      // 尝试从项目根目录
      const fallbackPath = join(
        process.cwd(),
        "packages/design-tokens/output/typography-composite-w3c.json"
      );
      const data = readFileSync(fallbackPath, "utf8");
      return JSON.parse(data);
    } catch (fallbackError) {
      console.warn(
        "Could not load typography composite data from either path:",
        error.message,
        fallbackError.message
      );
      return { typography: {} };
    }
  }
}

/**
 * 从 typography composite 数据中提取预设
 */
function extractTypographyPresets(data) {
  const presets = {};

  function processLevel(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === "object") {
        if (value.$type === "typography") {
          const presetName = prefix ? `${prefix}.${key}` : key;
          presets[presetName] = {
            description: value.$description || "",
            fontFamily: value.$value.fontFamily,
            fontSize: value.$value.fontSize,
            fontWeight: value.$value.fontWeight,
            lineHeight: value.$value.lineHeight,
            letterSpacing: value.$value.letterSpacing,
          };
        } else {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          processLevel(value, newPrefix);
        }
      }
    }
  }

  if (data.typography) {
    processLevel(data.typography);
  }

  return presets;
}

/**
 * 生成 SCSS map 格式的 typography 预设数据
 */
function generateTypographyPresetsMap(presets) {
  if (Object.keys(presets).length === 0) {
    return "";
  }

  const entries = Object.entries(presets).map(([name, preset]) => {
    return `  "${name}": (
    "font-family": ${convertReferenceToScssVar(preset.fontFamily)},
    "font-size": ${convertReferenceToScssVar(preset.fontSize)},
    "font-weight": ${convertReferenceToScssVar(preset.fontWeight)},
    "line-height": ${convertReferenceToScssVar(preset.lineHeight)},
    "letter-spacing": ${convertReferenceToScssVar(preset.letterSpacing)}
  )`;
  });

  return "\n" + entries.join(",\n") + "\n";
}

/**
 * 将 token 引用转换为 SCSS 变量引用
 */
function convertReferenceToScssVar(reference) {
  if (
    typeof reference !== "string" ||
    !reference.startsWith("{") ||
    !reference.endsWith("}")
  ) {
    return `"${reference}"`;
  }

  const tokenPath = reference.slice(1, -1);
  const cssVarName = tokenPath.replace(/\./g, "-");
  return `var(--cdt-${cssVarName})`;
}
