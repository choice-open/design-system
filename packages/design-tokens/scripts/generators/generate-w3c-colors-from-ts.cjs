#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ============================================================================
// 导入从 colors.ts 提取的完整数据
// ============================================================================

const {
  baseColorsLight,
  baseColorsDark,
  semanticColorsLight,
  semanticColorsDark,
  paleColors,
  extendedSemanticColors,
  defaultAlpha,
  colorCategories,
} = require("../../tokens/primitives/colors.cjs");

// ============================================================================
// 工具函数
// ============================================================================

/**
 * 将 RGB 数组转换为 W3C Design Tokens 颜色格式
 */
function convertRgbToW3C(rgb, alpha = 1) {
  if (!Array.isArray(rgb) || rgb.length !== 3) {
    throw new Error(`Invalid RGB array: ${JSON.stringify(rgb)}`);
  }

  // 计算十六进制值
  const hex =
    "#" +
    rgb
      .map((v) => {
        const hexValue = Math.round(v).toString(16).padStart(2, "0");
        return hexValue;
      })
      .join("");

  return {
    colorSpace: "srgb",
    components: rgb.map((v) => Math.round((v / 255) * 1000) / 1000),
    alpha: alpha,
    hex: hex, // 添加hex字段，方便检查数据
  };
}

/**
 * 检查是否为颜色引用
 */
function isColorReference(value) {
  // 字符串且不是十六进制颜色值就是引用
  return typeof value === "string" && !value.startsWith("#");
}

/**
 * 将颜色引用转换为 W3C 引用格式
 */
function convertColorReference(reference) {
  // 处理复合引用如 "blue-pale-700"
  const parts = reference.split("-");
  if (parts.length >= 2) {
    if (parts.includes("pale")) {
      // blue-pale-700 -> {color.blue-pale.700}
      const colorName = parts.slice(0, -1).join("-");
      const shade = parts[parts.length - 1];
      return `{color.${colorName}.${shade}}`;
    } else {
      // blue-600 -> {color.blue.600}
      const colorName = parts.slice(0, -1).join("-");
      const shade = parts[parts.length - 1];
      return `{color.${colorName}.${shade}}`;
    }
  }

  // 处理简单颜色名如 "black", "white" -> {color.black}, {color.white}
  if (reference === "black" || reference === "white") {
    return `{color.${reference}}`;
  }

  // 处理语义引用 foreground-default -> {color.foreground.default}
  return `{color.${reference.replace(/-/g, ".")}}`;
}

/**
 * 获取颜色的透明度
 */
function getAlphaForColor(colorName, theme) {
  // 检查主题特定的透明度
  const themeSpecificKey = `${colorName}-${theme}`;
  if (defaultAlpha[themeSpecificKey]) {
    return defaultAlpha[themeSpecificKey];
  }

  // 检查通用透明度
  if (defaultAlpha[colorName]) {
    return defaultAlpha[colorName];
  }

  return 1.0; // 默认不透明
}

/**
 * 获取颜色的分类标签
 */
function getColorCategory(colorName, groupName) {
  // 首先检查完整的颜色名
  if (colorCategories[colorName]) {
    return colorCategories[colorName];
  }

  // 检查组名（如 background, foreground, icon, boundary）
  if (colorCategories[groupName]) {
    return colorCategories[groupName];
  }

  // 检查是否是基础颜色组（如 blue, gray）
  const parts = colorName.split("-");
  if (parts.length >= 2) {
    const baseColorName = parts.slice(0, -1).join("-");
    if (colorCategories[baseColorName]) {
      return colorCategories[baseColorName];
    }
  }

  // 特殊处理 gray（因为数据中是 gray-100 格式）
  if (colorName.startsWith("gray")) {
    return "Neutrals";
  }

  return null;
}

/**
 * 动态生成颜色的别名列表 (已禁用)
 */
function getColorAliases(colorName, groupName) {
  // 不再生成别名，返回 null
  return null;
}

// ============================================================================
// 主转换函数
// ============================================================================

function generateW3CTokens() {
  const result = {
    color: {},
  };

  // 处理基础颜色（有主题差异的）
  const processBaseColors = (lightColors, darkColors, categoryName = "") => {
    const allColorNames = new Set([
      ...Object.keys(lightColors),
      ...Object.keys(darkColors),
    ]);

    for (const colorName of allColorNames) {
      const lightRgb = lightColors[colorName];
      const darkRgb = darkColors[colorName];

      if (!lightRgb && !darkRgb) continue;

      // 分离颜色名和数字 (如 "blue-500" -> "blue", "500")
      const parts = colorName.split("-");
      let groupName, shade;

      if (parts.length >= 2 && !isNaN(parts[parts.length - 1])) {
        shade = parts[parts.length - 1];
        groupName = parts.slice(0, -1).join("-");
      } else {
        groupName = colorName;
        shade = null;
      }

      // 创建嵌套结构
      if (!result.color[groupName]) {
        result.color[groupName] = {};
      }

      const tokenKey = shade || "default";
      const alpha = getAlphaForColor(colorName, "light");

      // 使用 light 主题作为默认值
      const defaultRgb = lightRgb || darkRgb;
      const token = {
        $type: "color",
        $value: convertRgbToW3C(defaultRgb, alpha),
      };

      // 添加分类和别名信息
      const category = getColorCategory(colorName, groupName);
      const aliases = getColorAliases(colorName, groupName);

      if (category || aliases) {
        if (!token.$extensions) token.$extensions = {};
        token.$extensions["choiceform.design-system"] = {};

        if (category) {
          token.$extensions["choiceform.design-system"].category = category;
        }

        if (aliases) {
          token.$extensions["choiceform.design-system"].aliases = aliases;
        }
      }

      // 如果有主题差异，添加 mode 扩展
      if (
        lightRgb &&
        darkRgb &&
        JSON.stringify(lightRgb) !== JSON.stringify(darkRgb)
      ) {
        if (!token.$extensions) token.$extensions = {};
        token.$extensions.mode = {
          light: convertRgbToW3C(lightRgb, alpha),
          dark: convertRgbToW3C(darkRgb, getAlphaForColor(colorName, "dark")),
        };
      }

      result.color[groupName][tokenKey] = token;
    }
  };

  // 处理 pale 颜色（单一主题）
  const processPaleColors = (colors) => {
    for (const [colorName, rgb] of Object.entries(colors)) {
      const parts = colorName.split("-");
      if (parts.length >= 3) {
        const shade = parts[parts.length - 1];
        const groupName = parts.slice(0, -1).join("-");

        if (!result.color[groupName]) {
          result.color[groupName] = {};
        }

        const token = {
          $type: "color",
          $value: convertRgbToW3C(rgb, getAlphaForColor(colorName, "pale")),
        };

        // 添加分类和别名信息
        const category = getColorCategory(groupName, groupName);
        const aliases = getColorAliases(colorName, groupName);

        if (category || aliases) {
          token.$extensions = {
            "choiceform.design-system": {},
          };

          if (category) {
            token.$extensions["choiceform.design-system"].category = category;
          }

          if (aliases) {
            token.$extensions["choiceform.design-system"].aliases = aliases;
          }
        }

        result.color[groupName][shade] = token;
      }
    }
  };

  // 处理语义颜色
  const processSemanticColors = (lightColors, darkColors) => {
    const allColorNames = new Set([
      ...Object.keys(lightColors),
      ...Object.keys(darkColors),
    ]);

    for (const colorName of allColorNames) {
      const lightValue = lightColors[colorName];
      const darkValue = darkColors[colorName];

      const parts = colorName.split("-");
      const groupName = parts[0]; // text, background, icon, border
      const variant = parts.slice(1).join("-"); // default, secondary, etc.

      if (!result.color[groupName]) {
        result.color[groupName] = {};
      }

      let token;

      // 检查透明度设置
      const lightAlpha = getAlphaForColor(colorName, "light");
      const darkAlpha = getAlphaForColor(colorName, "dark");

      // 判断主题间是否有差异
      const hasThemeDifference =
        lightValue &&
        darkValue &&
        // 类型不同（一个是引用，一个是RGB）
        (isColorReference(lightValue) !== isColorReference(darkValue) ||
          // 同为引用但值不同
          (isColorReference(lightValue) &&
            isColorReference(darkValue) &&
            lightValue !== darkValue) ||
          // 同为RGB但值不同
          (Array.isArray(lightValue) &&
            Array.isArray(darkValue) &&
            JSON.stringify(lightValue) !== JSON.stringify(darkValue)));

      // 使用 light 值作为默认值
      const defaultValue = lightValue || darkValue;
      const defaultAlpha = lightAlpha;

      if (isColorReference(defaultValue)) {
        // 默认值是引用
        token = {
          $type: "color",
          $value: convertColorReference(defaultValue),
          $description: `${colorName.replace(/-/g, " ")} color`,
        };

        // 如果有透明度设置，添加到 extensions
        if (lightAlpha !== 1.0 || darkAlpha !== 1.0) {
          if (!token.$extensions) token.$extensions = {};
          token.$extensions.alpha = {
            light: lightAlpha,
            dark: darkAlpha,
          };
        }
      } else {
        // 默认值是 RGB 数组
        token = {
          $type: "color",
          $value: convertRgbToW3C(defaultValue, defaultAlpha),
          $description: `${colorName.replace(/-/g, " ")} color`,
        };
      }

      // 如果有主题差异，添加 mode 扩展
      if (hasThemeDifference) {
        if (!token.$extensions) token.$extensions = {};
        token.$extensions.mode = {};

        // 处理 light 模式
        if (isColorReference(lightValue)) {
          token.$extensions.mode.light = convertColorReference(lightValue);
        } else {
          token.$extensions.mode.light = convertRgbToW3C(
            lightValue,
            lightAlpha
          );
        }

        // 处理 dark 模式
        if (isColorReference(darkValue)) {
          token.$extensions.mode.dark = convertColorReference(darkValue);
        } else {
          token.$extensions.mode.dark = convertRgbToW3C(darkValue, darkAlpha);
        }
      }

      // 添加分类和别名信息
      const category = getColorCategory(colorName, groupName);
      const aliases = getColorAliases(colorName, groupName);

      if (category || aliases) {
        if (!token.$extensions) token.$extensions = {};
        if (!token.$extensions["choiceform.design-system"]) {
          token.$extensions["choiceform.design-system"] = {};
        }

        if (category) {
          token.$extensions["choiceform.design-system"].category = category;
        }

        if (aliases) {
          token.$extensions["choiceform.design-system"].aliases = aliases;
        }
      }

      result.color[groupName][variant] = token;
    }
  };

  // 处理扩展语义颜色
  const processExtendedColors = (colors) => {
    for (const [colorName, value] of Object.entries(colors)) {
      // 特殊处理 white 和 black - 作为顶级颜色，不添加 default 后缀
      if (colorName === "white" || colorName === "black") {
        const alpha = getAlphaForColor(colorName, "light");
        const token = {
          $type: "color",
          $value: convertRgbToW3C(value, alpha),
          $description: `${colorName} color (absolute)`,
        };

        // 添加分类信息
        const category = getColorCategory(colorName, colorName);
        if (category) {
          token.$extensions = {
            "choiceform.design-system": {
              category: category,
            },
          };
        }

        result.color[colorName] = token;
        continue;
      }

      // 处理其他扩展语义颜色
      const parts = colorName.split("-");
      const groupName = parts[0];
      const variant = parts.slice(1).join("-");

      if (!result.color[groupName]) {
        result.color[groupName] = {};
      }

      // 检查透明度设置
      const lightAlpha = getAlphaForColor(colorName, "light");
      const darkAlpha = getAlphaForColor(colorName, "dark");

      let token;

      if (isColorReference(value)) {
        // 引用其他颜色，但也要检查透明度
        token = {
          $type: "color",
          $value: convertColorReference(value),
          $description: `${colorName.replace(/-/g, " ")} color (extended)`,
        };

        // 如果有透明度设置，添加到 extensions
        if (lightAlpha !== 1.0 || darkAlpha !== 1.0) {
          if (!token.$extensions) token.$extensions = {};
          token.$extensions.alpha = {
            light: lightAlpha,
            dark: darkAlpha,
          };
        }
      } else {
        // 直接值，添加 alpha
        token = {
          $type: "color",
          $value: convertRgbToW3C(value, lightAlpha),
          $description: `${colorName.replace(/-/g, " ")} color (extended)`,
        };
      }

      // 添加分类和别名信息
      const category = getColorCategory(colorName, groupName);
      const aliases = getColorAliases(colorName, groupName);

      if (category || aliases) {
        if (!token.$extensions) token.$extensions = {};
        if (!token.$extensions["choiceform.design-system"]) {
          token.$extensions["choiceform.design-system"] = {};
        }

        if (category) {
          token.$extensions["choiceform.design-system"].category = category;
        }

        if (aliases) {
          token.$extensions["choiceform.design-system"].aliases = aliases;
        }
      }

      result.color[groupName][variant] = token;
    }
  };

  // 执行转换
  console.log("🚀 开始转换基础颜色...");
  processBaseColors(baseColorsLight, baseColorsDark);

  console.log("🎨 转换 Pale 颜色...");
  processPaleColors(paleColors);

  console.log("✨ 转换扩展语义颜色...");
  processExtendedColors(extendedSemanticColors);

  console.log("📝 转换语义颜色...");
  processSemanticColors(semanticColorsLight, semanticColorsDark);

  // 🔧 修正 white 和 black 的结构 - 移除 default 嵌套
  console.log("🔧 修正 white 和 black 为顶级颜色...");
  if (result.color.white && result.color.white.default) {
    const whiteToken = result.color.white.default;
    result.color.white = whiteToken;
  }
  if (result.color.black && result.color.black.default) {
    const blackToken = result.color.black.default;
    result.color.black = blackToken;
  }

  return result;
}

// ============================================================================
// 执行转换
// ============================================================================

function main() {
  try {
    console.log("🎯 基于 colors.ts 生成 W3C Design Tokens...\n");

    // 生成 tokens
    const w3cTokens = generateW3CTokens();

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/colors-w3c.json");
    const backupPath = path.join(__dirname, "../../output/colors-backup.json");

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (fs.existsSync(path.join(__dirname, "../../output/colors.json"))) {
      fs.copyFileSync(
        path.join(__dirname, "../../output/colors.json"),
        backupPath
      );
      console.log(`📦 已备份原文件至 ${backupPath}`);
    }

    // 写入新文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2));
    console.log(`✅ W3C Design Tokens 已生成至 ${outputPath}`);

    // 统计信息
    const colorCount = Object.values(w3cTokens.color).reduce(
      (sum, group) => sum + Object.keys(group).length,
      0
    );
    console.log(`📊 共生成 ${colorCount} 个颜色 tokens`);
    console.log(`📊 涵盖 ${Object.keys(w3cTokens.color).length} 个颜色分组`);
  } catch (error) {
    console.error("❌ 转换失败:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
