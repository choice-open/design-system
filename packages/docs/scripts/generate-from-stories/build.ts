import fs from "node:fs"
import path from "node:path"
import { loadCsf } from "@storybook/csf-tools"
import type { Parameters } from "@storybook/types"
import { computeFileHash, getCacheKey, loadCache, saveCache } from "./cache"
import {
  readComponentDoc,
  readComponentExports,
  readComponentPackageJson,
  readComponentProps,
  resolveComponentFromStoryPath,
  resolveSlug,
} from "./component"
import {
  outputComponentsDir,
  outputDir,
  outputIndex,
  storybookStoriesDir,
  workspaceRoot,
} from "./constants"
import {
  extractDescription,
  extractStoryDescription,
  extractStoryDocblocks,
  extractStorySnippets,
  formatStoryAsExample,
} from "./extraction"
import { generateOutputs } from "./output"
import type {
  CacheData,
  CacheEntry,
  ComponentDetail,
  IndexItem,
  MetaLike,
  PackageInfo,
  StoryItem,
  StoryLike,
} from "./types"
import { ensureDir, readFile, toExportName, walkStories } from "./utils"

function collectDocFromStory(storyPath: string): { index: IndexItem; detail: ComponentDetail } {
  const code = readFile(storyPath)
  const storyDocblocks = extractStoryDocblocks(code)
  const storySnippets = extractStorySnippets(code)
  const componentInfo = resolveComponentFromStoryPath(storyPath)
  const componentDoc = componentInfo ? readComponentDoc(componentInfo.path) : ""
  const packageInfo = readComponentPackageJson(storyPath)
  const componentExports = readComponentExports(storyPath)

  const csf = loadCsf(code, {
    fileName: storyPath,
    makeTitle: (userTitle?: string) => userTitle ?? "Component",
  })
  csf.parse()

  const meta = (csf.meta ?? {}) as MetaLike
  const metaDescription =
    extractDescription((meta as { parameters?: Parameters }).parameters) || componentDoc

  const componentName =
    (typeof meta.component === "function" && (meta.component as { name?: string }).name) ||
    (typeof meta.component === "object" &&
    meta.component !== null &&
    "displayName" in meta.component
      ? String((meta.component as { displayName?: string }).displayName ?? "")
      : "") ||
    componentInfo?.name ||
    "Component"

  const slug = resolveSlug(meta.title, storyPath)
  const title = meta.title?.split("/").pop() ?? componentName
  const props = componentInfo ? readComponentProps(componentInfo.path) : []

  const stories: StoryItem[] = (csf.stories as StoryLike[]).map((story) => {
    const parameters = (story.parameters ?? {}) as Parameters
    const storyName = story.name ?? story.id
    const description = extractStoryDescription(parameters) || storyDocblocks[storyName] || ""
    const exportName = story.exportName ?? toExportName(story.id)
    const rawSnippet = storySnippets[exportName] ?? storySnippets[storyName]

    return {
      id: story.id,
      name: storyName,
      exportName,
      description,
      source: formatStoryAsExample(
        rawSnippet,
        packageInfo?.name ?? `@choice-ui/${slug.split("/").pop() ?? "unknown"}`,
        componentExports,
      ),
    }
  })

  const defaultPackage: PackageInfo = {
    name: `@choice-ui/${slug.split("/").pop() ?? "unknown"}`,
    version: "0.0.0",
    description: metaDescription,
    dependencies: {},
  }

  const index: IndexItem = {
    slug,
    name: packageInfo?.name ?? defaultPackage.name,
    title,
    description: metaDescription,
    version: packageInfo?.version ?? "0.0.0",
  }

  const detail: ComponentDetail = {
    slug,
    title,
    package: packageInfo ?? defaultPackage,
    exports: componentExports.length > 0 ? componentExports : [componentName],
    props,
    stories,
  }

  return { index, detail }
}

function processFile(storyPath: string, cache: CacheData): { updated: boolean; entry: CacheEntry } {
  const cacheKey = getCacheKey(storyPath)
  const currentHash = computeFileHash(storyPath)
  const cached = cache.entries[cacheKey]

  if (cached && cached.hash === currentHash) {
    return { updated: false, entry: cached }
  }

  const { index, detail } = collectDocFromStory(storyPath)
  const entry: CacheEntry = { hash: currentHash, index, detail }
  cache.entries[cacheKey] = entry
  return { updated: true, entry }
}

function removeDeletedFiles(storyFiles: string[], cache: CacheData): boolean {
  const currentKeys = new Set(storyFiles.map(getCacheKey))
  const cachedKeys = Object.keys(cache.entries)
  let changed = false

  for (const key of cachedKeys) {
    if (!currentKeys.has(key)) {
      const entry = cache.entries[key]
      if (entry) {
        const fileName = entry.detail.slug.replace(/\//g, "-") + ".json"
        const filePath = path.join(outputComponentsDir, fileName)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      }
      delete cache.entries[key]
      changed = true
    }
  }

  return changed
}

export function buildAll(isWatch = false): CacheData {
  ensureDir(outputDir)
  ensureDir(outputComponentsDir)

  const cache = loadCache()
  const storyFiles = walkStories(storybookStoriesDir)

  let updatedCount = 0

  for (const storyPath of storyFiles) {
    try {
      const result = processFile(storyPath, cache)
      if (result.updated) {
        updatedCount++
        if (isWatch) {
          console.log(`  📝 ${path.relative(workspaceRoot, storyPath)}`)
        }
      }
    } catch (err) {
      console.error(`  ❌ Error processing ${path.relative(workspaceRoot, storyPath)}:`, err)
    }
  }

  const hasDeleted = removeDeletedFiles(storyFiles, cache)
  const outputExists = fs.existsSync(outputIndex)

  if (updatedCount > 0 || hasDeleted || !outputExists) {
    generateOutputs(cache)
    saveCache(cache)
  }

  return cache
}

export function processSingleFile(storyPath: string, cache: CacheData): boolean {
  try {
    const result = processFile(storyPath, cache)
    if (result.updated) {
      generateOutputs(cache)
      saveCache(cache)
      return true
    }
  } catch (err) {
    console.error(`  ❌ Error processing ${path.relative(workspaceRoot, storyPath)}:`, err)
  }
  return false
}

export function handleFileDelete(storyPath: string, cache: CacheData) {
  const cacheKey = getCacheKey(storyPath)
  const entry = cache.entries[cacheKey]
  if (entry) {
    const fileName = entry.detail.slug.replace(/\//g, "-") + ".json"
    const filePath = path.join(outputComponentsDir, fileName)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    delete cache.entries[cacheKey]
    generateOutputs(cache)
    saveCache(cache)
    console.log(`  🗑️  Removed ${path.relative(workspaceRoot, storyPath)}`)
  }
}
