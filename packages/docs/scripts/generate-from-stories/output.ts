import fs from "node:fs"
import path from "node:path"
import { outputComponentsDir, outputIndex, outputRegistry, workspaceRoot } from "./constants"
import type { CacheData } from "./types"

export function generateOutputs(cache: CacheData) {
  const cacheEntries = Object.entries(cache.entries)

  // 生成索引文件
  const indexItems = cacheEntries
    .map(([, entry]) => entry.index)
    .sort((a, b) => a.title.localeCompare(b.title))
  fs.writeFileSync(outputIndex, JSON.stringify({ components: indexItems }, null, 2), "utf8")

  // 生成每个组件的详情文件
  for (const [, entry] of cacheEntries) {
    const fileName = entry.detail.slug.replace(/\//g, "-") + ".json"
    const filePath = path.join(outputComponentsDir, fileName)
    fs.writeFileSync(filePath, JSON.stringify(entry.detail, null, 2), "utf8")
  }

  // 生成 registry.ts
  const registryEntries = cacheEntries.map(([storyPath, entry], idx) => {
    const importVar = `StoryModule${idx}`
    const importPath = path
      .relative(path.dirname(outputRegistry), path.resolve(workspaceRoot, storyPath))
      .replace(/\\/g, "/")
      .replace(/\.tsx?$/, "")

    return { importVar, importPath, slug: entry.detail.slug }
  })

  const imports = registryEntries
    .map(
      ({ importVar, importPath }) =>
        `import * as ${importVar} from "${importPath.startsWith(".") ? importPath : `./${importPath}`}"`,
    )
    .join("\n")

  const registryMap = registryEntries
    .map(({ importVar, slug }) => `  "${slug}": ${importVar},`)
    .join("\n")

  const registryContent = `${imports}

export const storyRegistry: Record<string, Record<string, unknown>> = {
${registryMap}
}
`

  fs.writeFileSync(outputRegistry, registryContent, "utf8")
}
