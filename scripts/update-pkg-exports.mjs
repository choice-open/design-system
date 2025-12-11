#!/usr/bin/env node
/**
 * 更新所有组件包的 package.json，支持开发时指向 src，发布时指向 dist
 *
 * 使用方法: node scripts/update-pkg-exports.mjs
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.resolve(__dirname, "../packages/core/app/components")

function updatePackageJson(pkgPath) {
  const content = fs.readFileSync(pkgPath, "utf-8")
  const pkg = JSON.parse(content)

  // 跳过已经更新过的
  if (pkg.source === "./src/index.ts") {
    console.log(`⏭️  跳过 ${pkg.name} (已更新)`)
    return false
  }

  // 保存原始的 publishConfig.access
  const originalAccess = pkg.publishConfig?.access || "public"

  // 更新字段
  pkg.source = "./src/index.ts"
  pkg.types = "./src/index.ts"

  // 更新 exports
  pkg.exports = {
    ".": {
      types: "./src/index.ts",
      development: "./src/index.ts",
      default: "./dist/index.js",
    },
  }

  // 更新 publishConfig（发布时覆盖）
  pkg.publishConfig = {
    access: originalAccess,
    types: "./dist/index.d.ts",
    exports: {
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
      },
    },
  }

  // 格式化输出
  const output = JSON.stringify(pkg, null, 2) + "\n"
  fs.writeFileSync(pkgPath, output)

  console.log(`✅ 更新 ${pkg.name}`)
  return true
}

// 主逻辑
const entries = fs.readdirSync(componentsDir, { withFileTypes: true })
let updated = 0
let skipped = 0

for (const entry of entries) {
  if (!entry.isDirectory()) continue

  const pkgPath = path.join(componentsDir, entry.name, "package.json")
  if (!fs.existsSync(pkgPath)) continue

  if (updatePackageJson(pkgPath)) {
    updated++
  } else {
    skipped++
  }
}

console.log(`\n📦 完成: ${updated} 个包已更新, ${skipped} 个包已跳过`)
