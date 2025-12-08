// ============================================================================
// Breakpoint Helper Functions - 断点辅助函数
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// 注意：breakpoint 相关功能已集成到 spacing() 函数中
// ============================================================================

// 弃用警告 - 防止实际使用
console.warn(`
⚠️  弃用警告: src/helpers/breakpoints.ts 已被弃用

新的导入方式：
import { 
  breakpoint, mediaQuery, mediaQueryRule, breakpointExists, listBreakpoints 
} from "@choice-ui/design-tokens";

所有 breakpoint 和 mediaQuery 相关函数现在都从 tokens.js 统一导出
`)

// 抛出错误以阻止使用
throw new Error("此 breakpoints helper 文件已弃用，请使用 tokens.js 中的函数")

// 为了类型兼容性，导出空函数
export function breakpoint(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function mediaQuery(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function mediaQueryDown(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function breakpointList(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function listBreakpoints(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function breakpointExists(): never {
  throw new Error("已弃用，请使用 tokens.js")
}

export function breakpointInfo(): never {
  throw new Error("已弃用，请使用 tokens.js")
}
