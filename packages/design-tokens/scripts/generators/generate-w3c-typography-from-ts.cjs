const fs = require("fs");
const path = require("path");

// 辅助函数：解析 rem 值
function parseRemValue(remString) {
  if (typeof remString !== "string") return null;
  const match = remString.match(/^(-?[\d.]+)rem$/);
  if (!match) return null;
  return {
    value: parseFloat(match[1]),
    unit: "rem",
  };
}

// 辅助函数：转换字体族
function convertFontFamilies(fontFamilies) {
  const result = {};

  for (const [key, value] of Object.entries(fontFamilies)) {
    result[key] = {
      $type: "fontFamily",
      $value: Array.isArray(value) ? value : [value],
    };
  }

  return result;
}

// 辅助函数：转换字体重量
function convertFontWeights(fontWeights) {
  const result = {};

  for (const [key, value] of Object.entries(fontWeights)) {
    result[key] = {
      $type: "fontWeight",
      $value: value,
    };
  }

  return result;
}

// 辅助函数：转换字体大小
function convertFontSizes(fontSizes) {
  const result = {};

  for (const [key, value] of Object.entries(fontSizes)) {
    const dimensionValue = parseRemValue(value);
    if (dimensionValue) {
      result[key] = {
        $type: "dimension",
        $value: dimensionValue,
      };
    }
  }

  return result;
}

// 辅助函数：转换行高
function convertLineHeights(lineHeights) {
  const result = {};

  for (const [key, value] of Object.entries(lineHeights)) {
    const dimensionValue = parseRemValue(value);
    if (dimensionValue) {
      result[key] = {
        $type: "dimension",
        $value: dimensionValue,
      };
    }
  }

  return result;
}

// 辅助函数：转换字符间距
function convertLetterSpacings(letterSpacings) {
  const result = {};

  for (const [key, value] of Object.entries(letterSpacings)) {
    const dimensionValue = parseRemValue(value);
    if (dimensionValue) {
      result[key] = {
        $type: "dimension",
        $value: dimensionValue,
      };
    }
  }

  return result;
}

// 辅助函数：转换 typography 预设
function convertTypographyPreset(preset, type) {
  return {
    $type: "typography",
    $description: `${type} typography preset`,
    $value: {
      fontFamily: `{font.families.${preset.fontFamily}}`,
      fontSize: `{font.sizes.${preset.fontSize}}`,
      fontWeight: `{font.weights.${preset.fontWeight}}`,
      lineHeight: `{font.line-heights.${preset.lineHeight}}`,
      letterSpacing: `{font.letter-spacings.${preset.letterSpacing}}`,
    },
  };
}

// 辅助函数：转换 typography 预设组
function convertTypographyPresets(presets, type) {
  const result = {};

  for (const [key, preset] of Object.entries(presets)) {
    // 去掉键名中的类型前缀，例如 "body-medium" -> "medium"
    const simplifiedKey = key.startsWith(`${type}-`)
      ? key.substring(type.length + 1)
      : key;

    result[simplifiedKey] = convertTypographyPreset(preset, type);
  }

  return result;
}

// 主转换函数
function convertTypographyToW3C(typographyData) {
  const w3cTokens = {
    font: {
      families: convertFontFamilies(typographyData.fontFamilies),
      weights: convertFontWeights(typographyData.fontWeights),
      sizes: convertFontSizes(typographyData.fontSizes),
      "line-heights": convertLineHeights(typographyData["line-heights"]),
      "letter-spacings": convertLetterSpacings(
        typographyData["letter-spacings"]
      ),
    },
    // 复合 typography 类型 - W3C 规范支持，但不会导出为 CSS 变量（由 Terrazzo 过滤器控制）
    typography: {
      body: convertTypographyPresets(typographyData.bodyTypography, "body"),
      heading: convertTypographyPresets(
        typographyData.headingTypography,
        "heading"
      ),
    },
  };

  return w3cTokens;
}

// 主执行函数
function main() {
  try {
    console.log("🔄 开始转换 Typography 数据为 W3C Design Tokens 格式...");

    // 读取数据
    console.log("📥 读取 Typography 数据...");
    const typographyData = require("../../tokens/primitives/typography.cjs");

    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = convertTypographyToW3C(typographyData);

    // 生成两个输出文件
    const atomicTokens = { font: w3cTokens.font };
    const compositeTokens = { typography: w3cTokens.typography };

    const atomicPath = path.join(
      __dirname,
      "../../output/typography-atomic-w3c.json"
    );
    const compositePath = path.join(
      __dirname,
      "../../output/typography-composite-w3c.json"
    );
    const fullPath = path.join(__dirname, "../../output/typography-w3c.json");

    // 确保输出目录存在
    const outputDir = path.dirname(atomicPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入分离的文件
    fs.writeFileSync(atomicPath, JSON.stringify(atomicTokens, null, 2), "utf8");
    fs.writeFileSync(
      compositePath,
      JSON.stringify(compositeTokens, null, 2),
      "utf8"
    );

    // 写入完整文件（供 helper 函数使用）
    fs.writeFileSync(fullPath, JSON.stringify(w3cTokens, null, 2), "utf8");

    // 统计信息
    const stats = {
      fontFamilies: Object.keys(w3cTokens.font.families).length,
      fontWeights: Object.keys(w3cTokens.font.weights).length,
      fontSizes: Object.keys(w3cTokens.font.sizes).length,
      lineHeights: Object.keys(w3cTokens.font["line-heights"]).length,
      letterSpacings: Object.keys(w3cTokens.font["letter-spacings"]).length,
      // 复合 typography 类型现已启用
      bodyTypography: Object.keys(w3cTokens.typography.body).length,
      headingTypography: Object.keys(w3cTokens.typography.heading).length,
    };

    const totalTokens = Object.values(stats).reduce(
      (sum, count) => sum + count,
      0
    );

    console.log("✅ W3C Typography Tokens 转换完成！");
    console.log(`📄 输出文件:`);
    console.log(`   - 原子类型: ${atomicPath}`);
    console.log(`   - 复合类型: ${compositePath}`);
    console.log(`   - 完整文件: ${fullPath}`);
    console.log(`📊 转换统计:`);
    console.log(`   📝 基础令牌:`);
    console.log(`      - Font Families: ${stats.fontFamilies} 个`);
    console.log(`      - Font Weights: ${stats.fontWeights} 个`);
    console.log(`      - Font Sizes: ${stats.fontSizes} 个`);
    console.log(`      - Line Heights: ${stats.lineHeights} 个`);
    console.log(`      - Letter Spacings: ${stats.letterSpacings} 个`);
    console.log(`   🎨 复合令牌: (不导出CSS变量，供helper使用)`);
    console.log(`      - Body Typography: ${stats.bodyTypography} 个`);
    console.log(`      - Heading Typography: ${stats.headingTypography} 个`);
    console.log(`   📋 总计: ${totalTokens} 个 Typography tokens`);

    // 显示一些示例
    console.log(`\n📋 转换示例:`);
    console.log(`   Font Family: "default" → fontFamily 类型`);
    console.log(`   Font Weight: 450 → fontWeight 类型`);
    console.log(
      `   Font Size: "0.8125rem" → dimension 类型 {value: 0.8125, unit: "rem"}`
    );
    console.log(
      `   Line Height: "1.375rem" → dimension 类型 {value: 1.375, unit: "rem"}`
    );
    console.log(
      `   Typography: body-large → typography 复合类型 (W3C规范，不导出CSS)`
    );
  } catch (error) {
    console.error("❌ 转换失败:", error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { convertTypographyToW3C, main };
