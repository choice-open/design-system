// ============================================================================
// Color Helper Functions - 基于 Terrazzo 的简洁颜色系统
// ============================================================================
//
// ⚠️ DEPRECATED: 这个文件已弃用
// 请使用 tokens.js 中的函数代替:
//
// import { color, colorVar, colorHex, colorRgb, hasColor, getAllAvailableColors } from "../tokens.js";
//
// tokens.js 包含了所有的 helper 函数和更准确的类型定义
// ============================================================================

import type { ColorPath, ColorAlpha } from "../types/helpers";

/*
⚠️ 已弃用：此文件已被 Terrazzo 插件替代，函数现在直接生成到 tokens.js 中

所有导出函数已被移动到 tokens.js，请直接从 tokens.js 导入：
import { color, colorVar, colorHex, colorRgb, hasColor, getAllAvailableColors, token } from "./tokens.js";

使用方式保持不变：
- color('text.secondary') 现在会自动使用正确的透明度
- colorHex('blue.500') 获取十六进制值
- token('color.blue.500') 获取原始 token 数据
*/
