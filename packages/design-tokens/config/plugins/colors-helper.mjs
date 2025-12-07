export default function colorsHelper(userOptions = {}) {
  return {
    name: "colors-helper",
    enforce: "post", // 在基础插件之后运行

    async build({ tokens, getTransforms, outputFile }) {
      const output = [];

      // 添加颜色 Helper 函数
      output.push(
        "// ============================================================================"
      );
      output.push("// Color Helper Functions - 基于 Terrazzo 的简洁颜色系统");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      output.push("/**");
      output.push(
        " * 颜色辅助函数 - 返回包装在 rgba() 中的 CSS 变量，考虑 token 自带的透明度"
      );
      output.push(" *");
      output.push(
        " * @param path - 颜色 token 路径，如 'blue.500' 或 'text.secondary'"
      );
      output.push(
        " * @param alpha - 可选的透明度值 (0-1)，会覆盖 token 自带的 alpha"
      );
      output.push(
        " * @param mode - 可选的主题模式 ('light' | 'dark' | '.')，默认为 '.'"
      );
      output.push(
        " * @returns CSS 颜色值，格式为 rgba(var(--cdt-color-xxx), alpha)"
      );
      output.push(" */");
      output.push('export function color(path, alpha, mode = ".") {');
      output.push('  if (!path || typeof path !== "string") {');
      output.push(
        '    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
      );
      output.push(
        '      console.warn("[design-tokens] Invalid color path:", path);'
      );
      output.push("    }");
      output.push("    return `rgba(0, 0, 0, ${alpha ?? 1})`;");
      output.push("  }");
      output.push("");
      output.push(
        '  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;'
      );
      output.push("  const tokenValue = token(tokenPath, mode);");
      output.push("");
      output.push("  if (!tokenValue) {");
      output.push(
        '    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
      );
      output.push(
        '      console.warn(`[design-tokens] Color token "${path}" (${tokenPath}:${mode}) not found`);'
      );
      output.push("    }");
      output.push("    return `rgba(0, 0, 0, ${alpha ?? 1})`;");
      output.push("  }");
      output.push("");
      output.push("  // 确定最终的 alpha 值");
      output.push("  let finalAlpha;");
      output.push("  if (alpha !== undefined) {");
      output.push("    finalAlpha = Math.max(0, Math.min(1, alpha));");
      output.push("  } else {");
      output.push("    finalAlpha = tokenValue.alpha ?? 1;");
      output.push("  }");
      output.push("");
      output.push('  const cssVarName = tokenPath.replace(/\\./g, "-");');
      output.push("  const cssVar = `var(--cdt-${cssVarName})`;");
      output.push("");
      output.push("  return `rgba(${cssVar}, ${finalAlpha})`;");
      output.push("}");
      output.push("");

      output.push("/**");
      output.push(" * 获取原始颜色 CSS 变量（不包装 rgba）");
      output.push(" */");
      output.push("export function colorVar(path) {");
      output.push(
        '  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;'
      );
      output.push('  const cssVarName = tokenPath.replace(/\\./g, "-");');
      output.push("  return `var(--cdt-${cssVarName})`;");
      output.push("}");
      output.push("");

      output.push("/**");
      output.push(" * 获取颜色的十六进制值");
      output.push(" */");
      output.push('export function colorHex(path, mode = ".") {');
      output.push(
        '  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;'
      );
      output.push("  const tokenValue = token(tokenPath, mode);");
      output.push('  return tokenValue?.hex ?? "#000000";');
      output.push("}");
      output.push("");

      output.push("/**");
      output.push(" * 获取颜色的 RGB 数值数组");
      output.push(" */");
      output.push('export function colorRgb(path, mode = ".") {');
      output.push(
        '  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;'
      );
      output.push("  const tokenValue = token(tokenPath, mode);");
      output.push("  if (tokenValue?.components) {");
      output.push("    const [r, g, b] = tokenValue.components;");
      output.push(
        "    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];"
      );
      output.push("  }");
      output.push("  return [0, 0, 0];");
      output.push("}");
      output.push("");

      output.push("/**");
      output.push(" * 检查颜色 token 是否存在");
      output.push(" */");
      output.push('export function hasColor(path, mode = ".") {');
      output.push('  if (!path || typeof path !== "string") return false;');
      output.push(
        '  const tokenPath = path.startsWith("color.") ? path : `color.${path}`;'
      );
      output.push("  return !!token(tokenPath, mode);");
      output.push("}");
      output.push("");

      output.push("/**");
      output.push(" * 获取所有可用的颜色路径");
      output.push(" */");
      output.push("export function getAllAvailableColors() {");
      output.push("  return Object.keys(tokens)");
      output.push('    .filter(key => key.startsWith("color."))');
      output.push('    .map(key => key.replace("color.", ""));');
      output.push("}");
      output.push("");

      // 将颜色 helper 内容存储到全局状态中
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      global.designTokensHelpers.colors = output.join("\n");
    },
  };
}
