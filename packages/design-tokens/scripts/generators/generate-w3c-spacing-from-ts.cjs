const fs = require("fs");
const path = require("path");

// 辅助函数：解析数值，转换为 dimension
function parseSpacingValue(value, key) {
  if (typeof value === "number") {
    if (value === 0) {
      return { value: 0, unit: "rem" };
    }
    // default 直接使用值，不再乘以基础单位
    return { value: value, unit: "rem" };
  } else if (typeof value === "string") {
    // 处理像 "1px" 这样的字符串
    const pxMatch = value.match(/^(\d+)px$/);
    if (pxMatch) {
      return { value: parseInt(pxMatch[1], 10), unit: "px" };
    }
    const remMatch = value.match(/^([\d.]+)rem$/);
    if (remMatch) {
      return { value: parseFloat(remMatch[1]), unit: "rem" };
    }
  }
  return null;
}

// 读取 spacing 数据
function getSpacingData() {
  return require("../../tokens/primitives/spacing.cjs");
}

// 转换为 W3C 格式
function convertSpacingToW3C(spacingData) {
  const w3cTokens = {
    spacing: {},
  };

  for (const [key, value] of Object.entries(spacingData.scale)) {
    const dimensionValue = parseSpacingValue(value, key);
    if (dimensionValue) {
      // 生成描述
      let description = `Spacing value ${key}`;
      if (typeof value === "number" && value > 0) {
        description += ` (${value}rem)`;
      } else if (value === 0) {
        description += " (0px)";
      }

      w3cTokens.spacing[key] = {
        $type: "dimension",
        $description: description,
        $value: dimensionValue,
      };
    }
  }

  return w3cTokens;
}

// 主执行函数
function main() {
  try {
    console.log("🔄 开始转换 Spacing 数据为 W3C Design Tokens 格式...");

    // 读取数据
    console.log("📥 读取 Spacing 数据...");
    const spacingData = getSpacingData();

    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = convertSpacingToW3C(spacingData);

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/spacing-w3c.json");

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2), "utf8");

    // 统计信息
    const totalTokens = Object.keys(w3cTokens.spacing).length;

    console.log("✅ W3C Spacing Tokens 转换完成！");
    console.log(`📄 输出文件: ${outputPath}`);
    console.log(`📊 转换统计: ${totalTokens} 个 spacing tokens`);
    console.log(`📋 转换示例:`);
    console.log(`   数字: 4 → dimension {value: 1, unit: "rem"} (16px)`);
    console.log(`   字符串: "1px" → dimension {value: 1, unit: "px"}`);
    console.log(`   零值: 0 → dimension {value: 0, unit: "rem"}`);

    // 显示前几个转换的内容
    console.log(`\n📋 转换内容 (前10个):`);
    Object.entries(w3cTokens.spacing)
      .slice(0, 10)
      .forEach(([key, token]) => {
        console.log(`   ${key}: ${token.$value.value}${token.$value.unit}`);
      });
    if (totalTokens > 10) {
      console.log(`   ... 共 ${totalTokens} 个`);
    }
  } catch (error) {
    console.error("❌ 转换失败:", error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { convertSpacingToW3C, main };
