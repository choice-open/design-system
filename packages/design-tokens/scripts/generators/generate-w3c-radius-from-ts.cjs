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

// 读取 radius 数据
function getRadiusData() {
  return require("../../tokens/primitives/radius.cjs");
}

// 转换为 W3C 格式
function convertRadiusToW3C(radiusData) {
  const w3cTokens = {
    radius: {},
  };

  for (const [key, value] of Object.entries(radiusData.radiusValues)) {
    const dimensionValue = parseRemValue(value);
    if (dimensionValue) {
      w3cTokens.radius[key] = {
        $type: "dimension",
        $description: `Border radius ${key} size`,
        $value: dimensionValue,
      };
    }
  }

  return w3cTokens;
}

// 主执行函数
function main() {
  try {
    console.log("🔄 开始转换 Radius 数据为 W3C Design Tokens 格式...");

    // 读取数据
    console.log("📥 读取 Radius 数据...");
    const radiusData = getRadiusData();

    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = convertRadiusToW3C(radiusData);

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/radius-w3c.json");

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2), "utf8");

    // 统计信息
    const totalTokens = Object.keys(w3cTokens.radius).length;

    console.log("✅ W3C Radius Tokens 转换完成！");
    console.log(`📄 输出文件: ${outputPath}`);
    console.log(`📊 转换统计: ${totalTokens} 个 radius tokens`);
    console.log(
      `📋 转换示例: "0.125rem" → dimension 类型 {value: 0.125, unit: "rem"}`
    );

    // 显示转换的内容
    console.log(`\n📋 转换内容:`);
    Object.entries(w3cTokens.radius).forEach(([key, token]) => {
      console.log(`   ${key}: ${token.$value.value}${token.$value.unit}`);
    });
  } catch (error) {
    console.error("❌ 转换失败:", error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { convertRadiusToW3C, main };
