import xss, { escapeAttrValue } from "xss"

export const ALLOWED_HTML_ATTRIBUTES = ["href", "name", "target", "title", "class", "id", "style"]

export const ALLOWED_HTML_TAGS = [
  "p",
  "strong",
  "b",
  "code",
  "a",
  "br",
  "i",
  "ul",
  "li",
  "em",
  "small",
  "details",
  "summary",
  "mark",
]

/**
 * Constants and utility functions that help in HTML, CSS and DOM manipulation
 */
export function sanitizeHtml(dirtyHtml: string) {
  const sanitizedHtml = xss(dirtyHtml, {
    onTagAttr: (tag, name, value) => {
      if (tag === "img" && name === "src") {
        // Only allow http requests to supported image files from the `static` directory
        const isImageFile = value.split("#")[0].match(/\.(jpeg|jpg|gif|png|webp)$/) !== null
        const isStaticImageFile = isImageFile && value.startsWith("/static/")
        if (!value.startsWith("https://") && !isStaticImageFile) {
          return ""
        }
      }

      if (ALLOWED_HTML_ATTRIBUTES.includes(name) || name.startsWith("data-")) {
        // href is allowed but we allow only https and relative URLs
        if (name === "href" && !value.match(/^https?:\/\//gm) && !value.startsWith("/")) {
          return ""
        }
        return `${name}="${escapeAttrValue(value)}"`
      }

      return
      // Return nothing, means keep the default handling measure
    },
    onTag: (tag) => {
      if (!ALLOWED_HTML_TAGS.includes(tag)) return ""
      return
    },
  })

  return sanitizedHtml
}

/**
 * 检查第一个字符串是否以第二个字符串为前缀（不区分大小写）
 * @param first 要检查的字符串
 * @param second 前缀字符串
 * @returns 如果first以second开头则返回true，否则返回false
 */
export const prefixMatch = (first: string, second: string) =>
  first.toLocaleLowerCase().startsWith(second.toLocaleLowerCase())

/**
 * 计算多个字符串的最长公共前缀
 * @param strings 要计算公共前缀的字符串数组
 * @returns 所有字符串的最长公共前缀，如果没有公共前缀则返回空字符串
 * @example
 * longestCommonPrefix("hello", "help", "helicopter") // 返回 "he"
 * longestCommonPrefix("apple", "banana", "cherry") // 返回 ""
 */
export function longestCommonPrefix(...strings: string[]) {
  if (strings.length < 2) return ""

  return strings.reduce((prefix, str) => {
    while (!str.startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if (prefix === "") return ""
    }
    return prefix
  }, strings[0])
}
