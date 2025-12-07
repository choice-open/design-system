import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { CACHE_VERSION, cacheFile, workspaceRoot } from "./constants"
import type { CacheData } from "./types"

export function loadCache(): CacheData {
  try {
    if (fs.existsSync(cacheFile)) {
      const data = JSON.parse(fs.readFileSync(cacheFile, "utf8")) as CacheData
      if (data.version === CACHE_VERSION) {
        return data
      }
    }
  } catch {
    // ignore
  }
  return { version: CACHE_VERSION, entries: {} }
}

export function saveCache(cache: CacheData) {
  fs.writeFileSync(cacheFile, JSON.stringify(cache), "utf8")
}

export function computeFileHash(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8")
  return crypto.createHash("md5").update(content).digest("hex")
}

export function getCacheKey(storyPath: string): string {
  return path.relative(workspaceRoot, storyPath)
}
