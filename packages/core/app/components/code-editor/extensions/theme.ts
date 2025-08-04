import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags } from "@lezer/highlight"
import { EditorView } from "@codemirror/view"

interface ThemeSettings {
  isReadOnly?: boolean
  maxHeight?: string
  minHeight?: string
  rows?: number
}

const createSyntaxHighlighting = () => {
  return syntaxHighlighting(
    HighlightStyle.define([
      // 🔑 关键字和控制流
      { tag: tags.keyword, color: "var(--code-syntax-keyword)" },

      // 📝 字面量
      { tag: [tags.string, tags.special(tags.string)], color: "var(--code-syntax-string)" },
      { tag: [tags.number], color: "var(--code-syntax-number)" },
      { tag: [tags.bool], color: "var(--code-syntax-boolean)" },

      // 🔧 函数和方法
      {
        tag: [tags.function(tags.variableName), tags.function(tags.propertyName)],
        color: "var(--code-syntax-function)",
      },

      // 🏷️ 变量和属性
      {
        tag: [tags.variableName, tags.definition(tags.variableName)],
        color: "var(--code-syntax-variable)",
      },
      {
        tag: [tags.propertyName, tags.definition(tags.propertyName)],
        color: "var(--code-syntax-property)",
      },

      // ⚡ 操作符
      { tag: [tags.operator, tags.operatorKeyword], color: "var(--code-syntax-operator)" },

      // 💬 注释
      {
        tag: [tags.comment, tags.lineComment, tags.blockComment],
        color: "var(--code-syntax-comment)",
      },

      // 🎯 JSX 标签 - 映射到属性颜色（包括自定义组件）
      { tag: [tags.tagName], color: "var(--code-syntax-property)" }, // HTML 标签 <div>
      { tag: [tags.className, tags.typeName], color: "var(--code-syntax-property)" }, // 自定义组件 <MyComponent>
      { tag: [tags.name], color: "var(--code-syntax-property)" }, // 通用名称

      // 🎯 特殊标记
      { tag: [tags.atom, tags.null], color: "var(--code-syntax-boolean)" },

      // 🔗 链接和引用
      { tag: [tags.url, tags.link], color: "var(--code-syntax-string)" },

      // ❌ 错误和无效
      { tag: tags.invalid, color: "var(--foreground-danger)" },

      // 📊 格式化
      { tag: tags.strong, fontWeight: "bold" },
      { tag: tags.emphasis, fontStyle: "italic" },
      { tag: tags.strikethrough, textDecoration: "line-through" },
      { tag: tags.heading, fontWeight: "bold", color: "var(--code-syntax-keyword)" },
    ]),
  )
}

export const codeEditorTheme = ({ isReadOnly, minHeight, maxHeight, rows }: ThemeSettings) => {
  const computedMinHeight =
    rows && rows !== -1 ? `${Number(rows + 1) * 1.3}em` : (minHeight ?? "200px")

  const computedMaxHeight = maxHeight ?? "100%"

  const customTheme = EditorView.theme({
    "&": {
      "--editor-max-height": computedMaxHeight,
      "--editor-min-height": computedMinHeight,
      "--editor-is-readonly": isReadOnly ? "true" : "false",
      "--editor-rows": rows?.toString() ?? "auto",
    } as { [key: string]: string },
  })

  return [customTheme, createSyntaxHighlighting()]
}
