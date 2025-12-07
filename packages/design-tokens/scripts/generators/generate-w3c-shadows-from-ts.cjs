#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// ============================================================================
// 导入从 shadows.ts 提取的完整数据
// ============================================================================

const {
  shadowsLight,
  shadowsDark,
  semanticShadows,
} = require("../../tokens/primitives/shadows.cjs");

// ============================================================================
// 辅助函数
// ============================================================================

/**
 * 解析 CSS 颜色到标准 rgba 格式
 */
function parseColorToTerrazzo(colorStr) {
  if (!colorStr) return "rgba(0, 0, 0, 1)";

  // 解析 rgb(r g b / alpha) 格式转换为 rgba(r, g, b, alpha)
  const rgbMatch = colorStr.match(
    /rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)/
  );
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    const alpha = parseFloat(rgbMatch[4]);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 解析 rgba(r, g, b, alpha) 格式（保持原样）
  const rgbaMatch = colorStr.match(
    /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/
  );
  if (rgbaMatch) {
    return colorStr; // 已经是正确格式
  }

  // 解析 rgb(r, g, b) 格式转换为 rgba(r, g, b, 1)
  const rgbSimpleMatch = colorStr.match(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
  );
  if (rgbSimpleMatch) {
    const r = parseInt(rgbSimpleMatch[1]);
    const g = parseInt(rgbSimpleMatch[2]);
    const b = parseInt(rgbSimpleMatch[3]);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }

  // 默认返回黑色
  return "rgba(0, 0, 0, 1)";
}

// 辅助函数：解析 CSS 阴影字符串
function parseCssShadow(shadowString) {
  // 移除多余空格
  shadowString = shadowString.trim();

  // 检查是否为内嵌阴影（可能在开头或结尾）
  const isInset = shadowString.includes("inset");
  if (isInset) {
    shadowString = shadowString
      .replace(/^inset\s+/, "")
      .replace(/\s+inset$/, "");
  }

  // 查找颜色部分
  let color = null;
  let colorString = "";

  // 匹配 rgb/rgba 颜色（包括空格分隔格式）
  const colorMatch = shadowString.match(/(rgba?\([^)]+\))/);
  if (colorMatch) {
    colorString = colorMatch[0];
    color = parseColorToTerrazzo(colorString);
  }

  // 移除颜色部分，获取数值部分
  const valuesString = shadowString.replace(colorString, "").trim();
  const values = valuesString.split(/\s+/).filter((v) => v);

  // 辅助函数：确保值有单位
  const ensureUnit = (value) => {
    if (!value) return "0px";
    // 如果是纯数字（包括 "0"），添加 px 单位
    if (/^\d+(\.\d+)?$/.test(value)) {
      return value + "px";
    }
    return value;
  };

  // Terrazzo 官方推荐格式：字符串格式的距离值，所有值都需要单位
  const offsetX = ensureUnit(values[0]);
  const offsetY = ensureUnit(values[1]);
  const blur = ensureUnit(values[2]);
  const spread = ensureUnit(values[3]);

  return {
    offsetX,
    offsetY,
    blur,
    spread,
    color,
    ...(isInset ? { inset: true } : {}),
  };
}

// ============================================================================
// 主转换函数
// ============================================================================

function generateW3CTokens() {
  const result = {
    shadows: {},
  };

  // 处理所有阴影名称
  const shadowNames = new Set([
    ...Object.keys(shadowsLight),
    ...Object.keys(shadowsDark),
  ]);

  for (const shadowName of shadowNames) {
    const lightShadowArray = shadowsLight[shadowName];
    const darkShadowArray = shadowsDark[shadowName];

    if (!lightShadowArray && !darkShadowArray) continue;

    // 使用 light 作为默认值
    const defaultShadowArray = lightShadowArray || darkShadowArray;

    const shadowValue =
      defaultShadowArray.length === 1
        ? parseCssShadow(defaultShadowArray[0])
        : defaultShadowArray.map((shadow) => parseCssShadow(shadow));

    const token = {
      $type: "shadow",
      $description: `${shadowName} shadow with light/dark mode support`,
      $value: shadowValue,
    };

    // 如果有主题差异，添加 mode 扩展
    if (
      lightShadowArray &&
      darkShadowArray &&
      JSON.stringify(lightShadowArray) !== JSON.stringify(darkShadowArray)
    ) {
      const darkShadowValue =
        darkShadowArray.length === 1
          ? parseCssShadow(darkShadowArray[0])
          : darkShadowArray.map((shadow) => parseCssShadow(shadow));

      token.$extensions = {
        mode: {
          light: shadowValue,
          dark: darkShadowValue,
        },
      };
    }

    result.shadows[shadowName] = token;
  }

  return result;
}

// ============================================================================
// 执行转换
// ============================================================================

function main() {
  try {
    console.log("🔄 开始转换 Shadows 数据为 W3C Design Tokens 格式...");
    console.log("📥 读取 Shadows 数据...");

    // 生成 tokens
    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = generateW3CTokens();

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/shadows-w3c.json");
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入新文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2));
    console.log("✅ W3C Shadows Tokens 转换完成！");
    console.log(`📄 输出文件: ${outputPath}`);

    // 统计信息
    const shadowCount = Object.keys(w3cTokens.shadows).length;
    const basicShadows = ["xxs", "xs", "sm", "md", "lg", "xl"].filter(
      (name) => w3cTokens.shadows[name]
    ).length;
    const otherShadows = shadowCount - basicShadows;

    console.log("📊 转换统计:");
    console.log(`   🎯 基础阴影: ${basicShadows} 个（支持light/dark模式）`);
    console.log(`   ⚡ 其他阴影: ${otherShadows} 个`);
    console.log(`   📋 总计: ${shadowCount} 个 shadow tokens`);

    console.log("\n📋 转换特性:");
    console.log("   ✨ 多重阴影支持（数组格式）");
    console.log("   🎨 主题模式切换（$extensions.mode）");
    console.log("   🎭 内嵌阴影支持（inset: true）");
    console.log("   🌈 直接颜色值解析");
  } catch (error) {
    console.error("❌ 转换失败:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  main,
  generateW3CTokens,
  parseCssShadow,
};
