import fs from "node:fs"
import path from "node:path"
import { storyExt } from "./constants"

export function toExportName(storyId: string): string {
  const [, storySlug] = storyId.split("--")
  if (!storySlug) return ""
  return storySlug
    .split("-")
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : ""))
    .join("")
}

export function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export function walkStories(dir: string): string[] {
  const result: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...walkStories(full))
    } else if (entry.isFile() && entry.name.endsWith(storyExt)) {
      result.push(full)
    }
  }

  return result
}

export function readFile(filePath: string): string {
  return fs.readFileSync(filePath, "utf8")
}

export function isFile(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile()
  } catch {
    return false
  }
}

export function slugifyPart(part: string): string {
  return part
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}
