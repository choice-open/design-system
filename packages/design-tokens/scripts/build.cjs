#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🚀 开始批量转换所有 Design Tokens 为 W3C 格式...\n");

const scripts = [
  { name: "Colors", file: "./generators/generate-w3c-colors-from-ts.cjs" },
  {
    name: "Typography",
    file: "./generators/generate-w3c-typography-from-ts.cjs",
  },
  { name: "Spacing", file: "./generators/generate-w3c-spacing-from-ts.cjs" },
  { name: "Radius", file: "./generators/generate-w3c-radius-from-ts.cjs" },
  { name: "Z-index", file: "./generators/generate-w3c-zindex-from-ts.cjs" },
  {
    name: "Breakpoints",
    file: "./generators/generate-w3c-breakpoints-from-ts.cjs",
  },
  { name: "Shadows", file: "./generators/generate-w3c-shadows-from-ts.cjs" },
];

let totalTokens = 0;
const results = [];

async function runScript(script) {
  try {
    console.log(`⏳ 转换 ${script.name}...`);
    const scriptPath = path.join(__dirname, script.file);

    // 动态 require 并执行 main 函数
    const module = require(scriptPath);
    if (typeof module.main === "function") {
      await module.main();
    }

    console.log(`✅ ${script.name} 转换完成\n`);
    results.push({ name: script.name, status: "success" });
  } catch (error) {
    console.error(`❌ ${script.name} 转换失败:`, error.message);
    results.push({ name: script.name, status: "failed", error: error.message });
  }
}

async function main() {
  // 确保输出目录存在
  const outputDir = path.join(__dirname, "..", "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 依次运行所有转换脚本
  for (const script of scripts) {
    await runScript(script);
  }

  // 统计结果
  const successful = results.filter((r) => r.status === "success").length;
  const failed = results.filter((r) => r.status === "failed").length;

  console.log("📊 转换汇总:");
  console.log(`✅ 成功: ${successful} 个`);
  if (failed > 0) {
    console.log(`❌ 失败: ${failed} 个`);
    results
      .filter((r) => r.status === "failed")
      .forEach((r) => {
        console.log(`   - ${r.name}: ${r.error}`);
      });
  }

  // 列出生成的文件
  try {
    const outputFiles = fs
      .readdirSync(outputDir)
      .filter((f) => f.endsWith(".json"));
    console.log(`\n📁 生成的文件 (${outputFiles.length} 个):`);
    outputFiles.forEach((file) => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      console.log(`   📄 ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
    });

    console.log(`\n🎉 所有转换完成！输出目录: ${outputDir}`);
  } catch (error) {
    console.log(`\n✅ 转换过程完成`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
