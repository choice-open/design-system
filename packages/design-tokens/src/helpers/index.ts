/**
 * Design Token Helpers - 统一导出
 */

// ============================================================================
// Design Tokens Helpers - 导出所有辅助函数和类型
// ============================================================================
//
// ⚠️ DEPRECATED: 这个导出文件已弃用
// 请直接从 tokens.js 导入所有 helper 函数:
//
// import {
//   color, colorVar, colorHex, colorRgb, hasColor, getAllAvailableColors,
//   spacing, spacingList, spacingExists,
//   radius, radiusList,
//   shadow, shadowList,
//   zIndex, zIndexValue, zIndexList
// } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

// 颜色相关功能
export * from "./colors";

// 间距相关功能
export * from "./spacing";

// 断点相关功能
export * from "./breakpoints";

// 排版相关功能
export * from "./typography";

// 阴影相关功能
export * from "./shadows";

// 圆角相关功能
export * from "./radius";

// 层级相关功能
export * from "./zindex";
