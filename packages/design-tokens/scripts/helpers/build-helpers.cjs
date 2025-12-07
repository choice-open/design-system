#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔧 构建 TypeScript helper 函数...");

// 确保 dist 目录存在
const distDir = path.join(__dirname, "../../dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 编译 TypeScript 文件
try {
  console.log("📦 使用 TypeScript 编译器编译 helpers...");

  // 运行 tsc 命令
  execSync("npx tsc --project ../../config/tsconfig.build.json", {
    stdio: "inherit",
    cwd: __dirname,
  });

  console.log("✅ TypeScript helper 函数构建完成!");
} catch (error) {
  console.error("❌ TypeScript 编译失败:", error.message);
  process.exit(1);
}

// 复制 preflight.css 文件到 dist 目录
try {
  console.log("📄 复制 preflight.css...");

  const sourceFile = path.join(__dirname, "../../src/styles/preflight.css");
  const targetFile = path.join(distDir, "preflight.css");

  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log("✅ preflight.css 复制完成!");
  } else {
    console.warn("⚠️  preflight.css 源文件不存在:", sourceFile);
  }
} catch (error) {
  console.error("❌ preflight.css 复制失败:", error.message);
}
