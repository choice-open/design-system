/**
 * 组件发布脚本
 *
 * 功能：
 * 1. 构建指定组件或全部组件
 * 2. 替换 workspace:* 为实际版本号
 * 3. 发布到 npm
 *
 * 用法：
 * - pnpm tsx scripts/publish-components.ts              # 发布所有组件
 * - pnpm tsx scripts/publish-components.ts button       # 发布单个组件
 * - pnpm tsx scripts/publish-components.ts --dry-run    # 干跑模式，不实际发布
 * - pnpm tsx scripts/publish-components.ts --build-only # 只构建，不发布
 */

import { execSync } from "child_process"
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs"
import { join, resolve } from "path"

// ============================================================================
// 类型定义
// ============================================================================

interface PackageJson {
  name: string
  version: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

interface ComponentInfo {
  name: string
  dir: string
  packageJson: PackageJson
}

// ============================================================================
// 常量
// ============================================================================

const ROOT_DIR = resolve(__dirname, "..")
const COMPONENTS_DIR = resolve(ROOT_DIR, "packages/core/app/components")
const SHARED_PACKAGE_PATH = resolve(ROOT_DIR, "packages/shared/package.json")
const CORE_PACKAGE_PATH = resolve(ROOT_DIR, "packages/core/package.json")

// 解析命令行参数
const args = process.argv.slice(2)
const isDryRun = args.includes("--dry-run")
const isBuildOnly = args.includes("--build-only")
const targetComponents = args.filter((arg) => !arg.startsWith("--"))

// ============================================================================
// 工具函数
// ============================================================================

function log(message: string, type: "info" | "success" | "error" | "warn" = "info") {
  const prefix = {
    info: "ℹ️ ",
    success: "✅",
    error: "❌",
    warn: "⚠️ ",
  }
  console.log(`${prefix[type]} ${message}`)
}

function readPackageJson(path: string): PackageJson {
  return JSON.parse(readFileSync(path, "utf-8"))
}

function writePackageJson(path: string, content: PackageJson) {
  writeFileSync(path, JSON.stringify(content, null, 2) + "\n")
}

function exec(command: string, cwd?: string) {
  try {
    execSync(command, {
      cwd,
      stdio: "inherit",
      encoding: "utf-8",
    })
    return true
  } catch {
    return false
  }
}

// ============================================================================
// 版本解析
// ============================================================================

/**
 * 获取所有内部包的版本映射
 */
function getInternalVersions(): Map<string, string> {
  const versions = new Map<string, string>()

  // @choice-ui/shared 版本
  const sharedPkg = readPackageJson(SHARED_PACKAGE_PATH)
  versions.set("@choice-ui/shared", sharedPkg.version)

  // @choice-ui/react 版本
  const corePkg = readPackageJson(CORE_PACKAGE_PATH)
  versions.set("@choice-ui/react", corePkg.version)

  // 所有组件版本
  const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  for (const componentName of componentDirs) {
    const pkgPath = join(COMPONENTS_DIR, componentName, "package.json")
    if (existsSync(pkgPath)) {
      const pkg = readPackageJson(pkgPath)
      versions.set(pkg.name, pkg.version)
    }
  }

  return versions
}

/**
 * 替换 workspace:* 为实际版本号
 */
function resolveWorkspaceVersions(
  deps: Record<string, string> | undefined,
  versions: Map<string, string>,
): Record<string, string> | undefined {
  if (!deps) return undefined

  const resolved: Record<string, string> = {}
  for (const [name, version] of Object.entries(deps)) {
    if (version.startsWith("workspace:")) {
      const actualVersion = versions.get(name)
      if (actualVersion) {
        // workspace:* -> ^x.x.x, workspace:^ -> ^x.x.x
        resolved[name] = `^${actualVersion}`
      } else {
        log(`找不到包 ${name} 的版本`, "warn")
        resolved[name] = version
      }
    } else {
      resolved[name] = version
    }
  }
  return resolved
}

// ============================================================================
// 组件处理
// ============================================================================

/**
 * 获取所有组件信息
 */
function getAllComponents(): ComponentInfo[] {
  const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  const components: ComponentInfo[] = []

  for (const name of componentDirs) {
    const dir = join(COMPONENTS_DIR, name)
    const pkgPath = join(dir, "package.json")

    if (existsSync(pkgPath)) {
      components.push({
        name,
        dir,
        packageJson: readPackageJson(pkgPath),
      })
    }
  }

  return components
}

/**
 * 构建组件
 */
function buildComponent(component: ComponentInfo): boolean {
  log(`构建 ${component.packageJson.name}...`)
  return exec("pnpm run build", component.dir)
}

/**
 * 发布组件
 */
function publishComponent(component: ComponentInfo, versions: Map<string, string>): boolean {
  const pkgPath = join(component.dir, "package.json")
  const originalContent = readFileSync(pkgPath, "utf-8")

  try {
    // 替换 workspace:* 版本
    const pkg = { ...component.packageJson }
    pkg.dependencies = resolveWorkspaceVersions(pkg.dependencies, versions)
    pkg.devDependencies = resolveWorkspaceVersions(pkg.devDependencies, versions)
    pkg.peerDependencies = resolveWorkspaceVersions(pkg.peerDependencies, versions)

    // 写入修改后的 package.json
    writePackageJson(pkgPath, pkg)

    if (isDryRun) {
      log(`[DRY-RUN] 将发布 ${pkg.name}@${pkg.version}`, "info")
      return true
    }

    if (isBuildOnly) {
      log(`[BUILD-ONLY] 跳过发布 ${pkg.name}`, "info")
      return true
    }

    // 发布
    log(`发布 ${pkg.name}@${pkg.version}...`)
    const success = exec("pnpm publish --access public --no-git-checks", component.dir)

    if (success) {
      log(`${pkg.name}@${pkg.version} 发布成功`, "success")
    } else {
      log(`${pkg.name} 发布失败`, "error")
    }

    return success
  } finally {
    // 恢复原始 package.json
    writeFileSync(pkgPath, originalContent)
  }
}

// ============================================================================
// 主流程
// ============================================================================

async function main() {
  console.log("\n🚀 Choice UI 组件发布工具\n")

  if (isDryRun) {
    log("干跑模式 - 不会实际发布", "warn")
  }

  if (isBuildOnly) {
    log("仅构建模式 - 不会发布", "warn")
  }

  // 获取版本映射
  const versions = getInternalVersions()
  log(`已加载 ${versions.size} 个内部包版本`)

  // 获取组件列表
  let components = getAllComponents()
  log(`找到 ${components.length} 个组件`)

  // 过滤目标组件
  if (targetComponents.length > 0) {
    components = components.filter((c) => targetComponents.includes(c.name))
    log(`过滤后: ${components.length} 个组件`)
  }

  if (components.length === 0) {
    log("没有找到要发布的组件", "warn")
    return
  }

  console.log("")

  // 构建和发布
  let successCount = 0
  let failCount = 0

  for (const component of components) {
    const buildSuccess = buildComponent(component)
    if (!buildSuccess) {
      log(`${component.name} 构建失败，跳过发布`, "error")
      failCount++
      continue
    }

    const publishSuccess = publishComponent(component, versions)
    if (publishSuccess) {
      successCount++
    } else {
      failCount++
    }

    console.log("")
  }

  // 结果汇总
  console.log("━".repeat(50))
  log(`完成: ${successCount} 成功, ${failCount} 失败`, successCount > 0 ? "success" : "error")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
