const fs = require("fs");
const path = require("path");

// 辅助函数：转换像素值为 rem 值
function pxToRem(pxValue) {
  return {
    value: pxValue / 16,
    unit: "rem",
  };
}

// 读取 breakpoints 数据
function getBreakpointsData() {
  return require("../../tokens/primitives/breakpoints.cjs");
}

// 转换为 W3C 格式
function convertBreakpointsToW3C(breakpointsData) {
  const w3cTokens = {
    breakpoints: {},
  };

  // 转换基础断点
  for (const [key, value] of Object.entries(breakpointsData.breakpoints)) {
    if (typeof value === "number") {
      w3cTokens.breakpoints[key] = {
        $type: "dimension",
        $description: `Breakpoint ${key} (${value}px)`,
        $value: pxToRem(value),
      };
    }
  }

  return w3cTokens;
}

// 主执行函数
function main() {
  try {
    console.log("🔄 开始转换 Breakpoints 数据为 W3C Design Tokens 格式...");

    // 读取数据
    console.log("📥 读取 Breakpoints 数据...");
    const breakpointsData = getBreakpointsData();

    console.log("🔄 转换为 W3C 格式...");
    const w3cTokens = convertBreakpointsToW3C(breakpointsData);

    // 生成输出文件
    const outputPath = path.join(__dirname, "../../output/breakpoints-w3c.json");

    // 确保输出目录存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(outputPath, JSON.stringify(w3cTokens, null, 2), "utf8");

    // 统计信息
    const stats = {
      breakpoints: Object.keys(w3cTokens.breakpoints).length,
    };

    const totalTokens = stats.breakpoints;

    console.log("✅ W3C Breakpoints Tokens 转换完成！");
    console.log(`📄 输出文件: ${outputPath}`);
    console.log(`📊 转换统计: ${stats.breakpoints} 个 breakpoint tokens`);
    console.log(`📋 转换示例: 768 → dimension {value: 48, unit: "rem"}`);

    console.log(`\n📋 转换内容:`);
    for (const [key, value] of Object.entries(breakpointsData.breakpoints)) {
      const remValue = (value / 16).toFixed(4).replace(/\.?0+$/, "");
      console.log(`   ${key}: ${remValue}rem`);
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

module.exports = { convertBreakpointsToW3C, main };
