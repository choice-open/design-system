const fs = require("fs");
const path = require("path");

// 读取 zindex 数据
function getZindexData() {
  return require("../../tokens/primitives/zindex.cjs");
}

// 转换为 W3C 格式
function convertZindexToW3C(zindexData) {
  const w3cTokens = {
    zindex: {},
  };

  for (const [key, value] of Object.entries(zindexData.zindexValues)) {
    w3cTokens.zindex[key] = {
      $type: "number",
      $description: `Z-index value for ${key} layer`,
      $value: value,
    };
  }

  return w3cTokens;
}

// 主执行函数
function main() {
  try {
    console.log("🔄 开始转换 Z-index 数据为 W3C Design Tokens 格式...");

    // 读取数据
    console.log("📥 读取 Z-index 数据...");
    const zindexData = getZindexData();

    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = convertZindexToW3C(zindexData);

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/zindex-w3c.json");

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2), "utf8");

    // 统计信息
    const totalTokens = Object.keys(w3cTokens.zindex).length;

    console.log("✅ W3C Z-index Tokens 转换完成！");
    console.log(`📄 输出文件: ${outputPath}`);
    console.log(`📊 转换统计: ${totalTokens} 个 z-index tokens`);
    console.log(`📋 转换示例: 100 → number 类型`);

    // 显示转换的内容
    console.log(`\n📋 转换内容:`);
    Object.entries(w3cTokens.zindex).forEach(([key, token]) => {
      console.log(`   ${key}: ${token.$value}`);
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

module.exports = { convertZindexToW3C, main };
