// ============================================================================
// Design Tokens - 统一导出 (由 Terrazzo 插件生成)
// ============================================================================

// 导出所有由 Terrazzo 插件生成的 tokens 和 helper 函数
export * from "../dist/tokens";

// ============================================================================
// 迁移说明
// ============================================================================
//
// ⚠️  重要变更：所有 helper 函数已迁移到 Terrazzo 插件生成
//
// 旧的导入方式（已弃用）：
// import { color, spacing, radius } from "@your-org/design-tokens/helpers/colors";
//
// 新的导入方式（推荐）：
// import { color, spacing, radius, tokens } from "@your-org/design-tokens";
//
// 所有函数和类型现在都从主入口点统一导出，包括：
// - tokens: 完整的 token 对象
// - token(): 通用 token 访问函数
// - color(), colorVar(), colorHex(), colorRgb(): 颜色相关函数
// - spacing(), spacingList(), spacingExists(): 间距相关函数
// - radius(), radiusList(): 圆角相关函数
// - shadow(), shadowList(): 阴影相关函数
// - zIndex(), zIndexValue(), zIndexList(): z-index 相关函数
// - 以及所有相关的 TypeScript 类型定义
//
// ============================================================================
