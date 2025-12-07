import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { coreComponentsDir, getDocgenParser, storyExt, storybookStoriesDir } from "./constants"
import type { PackageInfo, PropDoc, PropsGroup } from "./types"
import { isFile, readFile, slugifyPart } from "./utils"

export function readComponentPackageJson(storyPath: string): PackageInfo | undefined {
  const relativePath = path.relative(storybookStoriesDir, storyPath)
  const parts = relativePath.split(path.sep)
  if (parts.length < 1) return undefined

  const componentFolder = parts[0]
  const packageJsonPath = path.join(coreComponentsDir, componentFolder, "package.json")

  if (!isFile(packageJsonPath)) return undefined

  try {
    const content = JSON.parse(readFile(packageJsonPath))
    return {
      name: content.name ?? "",
      version: content.version ?? "",
      description: content.description ?? "",
      dependencies: content.dependencies ?? {},
      peerDependencies: content.peerDependencies,
    }
  } catch {
    return undefined
  }
}

export function readComponentExports(storyPath: string): string[] {
  const relativePath = path.relative(storybookStoriesDir, storyPath)
  const parts = relativePath.split(path.sep)
  if (parts.length < 1) return []

  const componentFolder = parts[0]
  const indexPath = path.join(coreComponentsDir, componentFolder, "src", "index.ts")

  if (!isFile(indexPath)) return []

  try {
    const content = readFile(indexPath)
    const sourceFile = ts.createSourceFile(
      "index.ts",
      content,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    )

    const exports: string[] = []

    for (const statement of sourceFile.statements) {
      if (!ts.isExportDeclaration(statement)) continue

      const exportClause = statement.exportClause
      if (!exportClause || !ts.isNamedExports(exportClause)) continue

      for (const element of exportClause.elements) {
        const name = element.name.text
        const isTypeOnly = statement.isTypeOnly || element.isTypeOnly
        exports.push(isTypeOnly ? `type ${name}` : name)
      }
    }

    return exports
  } catch {
    return []
  }
}

export function resolveComponentFromStoryPath(
  storyPath: string,
): { name: string; path: string } | null {
  const relativePath = path.relative(storybookStoriesDir, storyPath)
  const parts = relativePath.split(path.sep)
  if (parts.length < 2) return null

  const componentFolder = parts[0]
  const componentDir = path.join(coreComponentsDir, componentFolder, "src")

  if (!fs.existsSync(componentDir)) return null

  const candidates = [
    path.join(componentDir, `${componentFolder}.tsx`),
    path.join(componentDir, "index.tsx"),
    path.join(componentDir, "index.ts"),
  ]

  for (const candidate of candidates) {
    if (isFile(candidate)) {
      const componentName = componentFolder
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")
      return { name: componentName, path: candidate }
    }
  }

  return null
}

export function readComponentDoc(componentPath: string): string {
  if (!componentPath || !isFile(componentPath)) return ""
  const content = readFile(componentPath)
  const docMatch = content.match(/\/\*\*([\s\S]*?)\*\//)
  if (!docMatch) return ""
  const cleaned = docMatch[1]
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter((line) => line.length > 0)
  return cleaned[0] ?? ""
}

export function readComponentProps(componentPath: string): PropsGroup[] {
  try {
    if (!isFile(componentPath)) return []
    const docs = getDocgenParser().parse(componentPath)
    if (!docs.length) return []
    return docs.map((doc) => {
      const props = doc.props ?? {}
      const propList: PropDoc[] = Object.entries(props).map(([name, prop]) => ({
        name,
        type: prop.type?.name ?? "",
        required: prop.required ?? false,
        defaultValue: prop.defaultValue?.value ?? undefined,
        description: prop.description ?? "",
      }))
      return {
        displayName: doc.displayName ?? "",
        description: doc.description ?? "",
        props: propList,
      }
    })
  } catch {
    return []
  }
}

export function resolveSlug(title?: string, storyPath?: string): string {
  if (title) {
    return title.split("/").map(slugifyPart).filter(Boolean).join("/")
  }

  if (storyPath) {
    const relativePath = path.relative(storybookStoriesDir, storyPath)
    const parts = relativePath.split(path.sep)
    if (parts.length >= 1) {
      const last = parts[parts.length - 1].replace(storyExt, "")
      const relParts = parts.slice(0, parts.length - 1).concat(last)
      return relParts
        .map(slugifyPart)
        .filter((part, index, arr) => part.length > 0 && arr.indexOf(part) === index)
        .join("/")
    }
  }

  return ""
}
