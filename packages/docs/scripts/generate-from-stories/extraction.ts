import type { Parameters } from "@storybook/types"
import ts from "typescript"

export function extractDescription(parameters?: Parameters): string {
  const componentDescription =
    parameters?.docs?.description &&
    typeof parameters.docs.description === "object" &&
    "component" in parameters.docs.description
      ? String(parameters.docs.description.component)
      : undefined

  if (componentDescription) return componentDescription

  const docDescription =
    parameters?.docs?.description && typeof parameters.docs.description === "string"
      ? parameters.docs.description
      : undefined

  if (docDescription) return docDescription

  return ""
}

export function extractStoryDescription(parameters?: Parameters): string {
  if (!parameters?.docs?.description) return ""

  const { description } = parameters.docs

  if (typeof description === "object" && "story" in description && description.story) {
    return String(description.story)
  }

  if (typeof description === "string") return description

  return ""
}

export function extractStoryDocblocks(sourceCode: string): Record<string, string> {
  const sourceFile = ts.createSourceFile(
    "story.tsx",
    sourceCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
  const docMap: Record<string, string> = {}

  const collectDoc = (node: ts.Node) => {
    if (
      ts.isVariableStatement(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const variableNode = node as ts.VariableStatement & { jsDoc?: readonly ts.JSDoc[] }
      const jsDocs = variableNode.jsDoc ?? []
      const doc = jsDocs
        .map((docNode: ts.JSDoc) => {
          const { comment } = docNode
          if (!comment) return ""
          if (typeof comment === "string") return comment
          if (Array.isArray(comment)) {
            return comment
              .map((chunk) => {
                if (typeof chunk === "string") return chunk
                if (typeof (chunk as { text?: unknown }).text === "string") {
                  return String((chunk as { text: string }).text)
                }
                return ""
              })
              .join("")
          }
          return ""
        })
        .join("\n")

      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && doc.trim()) {
          docMap[decl.name.text] = doc.trim()
        }
      }
    }
    ts.forEachChild(node, collectDoc)
  }

  collectDoc(sourceFile)
  return docMap
}

export function extractStorySnippets(sourceCode: string): Record<string, string> {
  const snippets: Record<string, string> = {}
  const lines = sourceCode.split("\n")
  let currentName: string | null = null
  let start = -1

  const flush = (end: number) => {
    if (currentName && start >= 0) {
      const slice = lines.slice(start, end).join("\n").trim()
      if (slice) snippets[currentName] = slice
    }
    currentName = null
    start = -1
  }

  const exportRegex = /^export\s+const\s+([A-Za-z0-9_]+)\s*(?::[^=]*)?=/

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    const match = line.match(exportRegex)
    if (match) {
      flush(i)
      currentName = match[1]
      start = i
    }
  }

  flush(lines.length)
  return snippets
}

/** 提取括号内的内容，处理嵌套括号 */
function extractParenContent(code: string, startIdx: number): string {
  let depth = 0
  let start = -1

  for (let i = startIdx; i < code.length; i++) {
    if (code[i] === "(") {
      if (depth === 0) start = i + 1
      depth++
    } else if (code[i] === ")") {
      depth--
      if (depth === 0 && start !== -1) {
        return code.slice(start, i)
      }
    }
  }
  return ""
}

/** 从 story 代码片段中提取 render 函数的 JSX 内容，转换为简洁的示例格式 */
export function formatStoryAsExample(
  storySnippet: string | undefined,
  packageName: string,
  exports: string[],
): string {
  if (!storySnippet) return ""

  let jsx = ""

  // 找到 render 的位置
  const renderIdx = storySnippet.indexOf("render")
  if (renderIdx === -1) return ""

  const afterRender = storySnippet.slice(renderIdx)

  // 1. 箭头函数带括号: render: () => ( ... )
  const arrowParenMatch = afterRender.match(/render:\s*\([^)]*\)\s*=>\s*\(/)
  if (arrowParenMatch) {
    const parenStart = renderIdx + arrowParenMatch.index! + arrowParenMatch[0].length - 1
    jsx = extractParenContent(storySnippet, parenStart)
  }

  // 2. 箭头函数直接返回 JSX: render: () => <...>
  if (!jsx) {
    const arrowJsxMatch = afterRender.match(/render:\s*\([^)]*\)\s*=>\s*(<[\s\S]+)/m)
    if (arrowJsxMatch) {
      const content = arrowJsxMatch[1]
      const endMatch = content.match(/([\s\S]*?>)\s*,?\s*\n?\s*\}/)
      if (endMatch) {
        jsx = endMatch[1].trim()
      }
    }
  }

  // 3. 函数形式带 return
  if (!jsx) {
    const returnMatch = afterRender.match(/return\s*\(/)
    if (returnMatch) {
      const returnStart = renderIdx + returnMatch.index! + returnMatch[0].length - 1
      jsx = extractParenContent(storySnippet, returnStart)
    }
  }

  if (!jsx) return ""

  // 格式化 JSX 缩进
  const trimmedJsx = jsx.replace(/^\s*\n/, "").replace(/\n\s*$/, "")
  const jsxLines = trimmedJsx.split("\n")
  let formattedJsx: string

  if (jsxLines.length === 1) {
    formattedJsx = `    ${trimmedJsx.trim()}`
  } else {
    const nonEmptyLines = jsxLines.filter((line) => line.trim())
    const minIndent = Math.min(
      ...nonEmptyLines.map((line) => line.match(/^(\s*)/)?.[1].length ?? 0),
    )
    formattedJsx = jsxLines
      .map((line) => {
        if (!line.trim()) return ""
        const lineIndent = line.match(/^(\s*)/)?.[1].length ?? 0
        const relativeIndent = lineIndent - minIndent
        return "    " + " ".repeat(relativeIndent) + line.trim()
      })
      .join("\n")
  }

  // 分析 JSX 中实际使用了哪些导出
  const componentExports = exports.filter((e) => !e.startsWith("type "))
  const usedExports = componentExports.filter((exportName) => {
    const tagPattern = new RegExp(`<${exportName}(?:\\s|>|\\.|/)`)
    const hookPattern = new RegExp(`\\b${exportName}\\s*\\(`)
    const valuePattern = new RegExp(`[{=(,\\s]${exportName}[}),\\s]`)
    return tagPattern.test(jsx) || hookPattern.test(jsx) || valuePattern.test(jsx)
  })

  const finalExports = usedExports.length > 0 ? usedExports : componentExports.slice(0, 1)

  const importStatement =
    finalExports.length > 0
      ? `import { ${finalExports.join(", ")} } from "${packageName}"`
      : `import { Component } from "${packageName}"`

  return `${importStatement}

export default function App() {
  return (
${formattedJsx}
  );
}`
}
