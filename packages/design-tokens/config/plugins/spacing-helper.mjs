export default function spacingHelper(userOptions = {}) {
  return {
    name: "spacing-helper",
    enforce: "post", // 在其他插件之后运行

    async build({ tokens, getTransforms, outputFile }) {
      try {
        // 独立生成间距 helper 函数
        const output = [];

        // 添加 Spacing Helper 函数
        output.push(
          "// ============================================================================"
        );
        output.push("// Spacing Helper Functions - 间距辅助函数");
        output.push(
          "// ============================================================================"
        );
        output.push("");

        // 内部工具函数
        output.push("/**");
        output.push(" * 解析分数字符串为百分比");
        output.push(" * @param fraction - 分数字符串，如 '1/2', '2/3'");
        output.push(" * @returns 百分比字符串");
        output.push(" */");
        output.push("function parseFraction(fraction) {");
        output.push("  const match = fraction.match(/^(\\d+)\\/(\\d+)$/);");
        output.push("  if (!match) {");
        output.push(
          '    throw new Error(`无效的分数格式: \'${fraction}\'. 正确格式如: "1/2", "2/3"`);'
        );
        output.push("  }");
        output.push("");
        output.push("  const numerator = parseInt(match[1], 10);");
        output.push("  const denominator = parseInt(match[2], 10);");
        output.push("");
        output.push("  if (denominator === 0) {");
        output.push("    throw new Error(`分母不能为0: '${fraction}'`);");
        output.push("  }");
        output.push("");
        output.push("  const percentage = (numerator / denominator) * 100;");
        output.push("  return `${parseFloat(percentage.toFixed(6))}%`;");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 检查断点是否存在（内部函数，避免与导出函数冲突）");
        output.push(" */");
        output.push("function _breakpointExists(name) {");
        output.push("  return !!token(`breakpoints.${name}`);");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 获取间距值");
        output.push(
          " * @param size - 间距大小，支持预设值、任意数值、分数、断点值或任意值"
        );
        output.push(" * @returns 计算后的间距值");
        output.push(" */");
        output.push("export function spacing(size) {");
        output.push("  // 特殊值直接返回");
        output.push("  if (size === 0) {");
        output.push('    return "0";');
        output.push("  }");
        output.push("");
        output.push("  // 处理任意值 [value]");
        output.push(
          '  if (typeof size === "string" && size.startsWith("[") && size.endsWith("]")) {'
        );
        output.push("    return size.slice(1, -1);");
        output.push("  }");
        output.push("");
        output.push("  // 处理分数 1/2, 2/3 等");
        output.push('  if (typeof size === "string" && size.includes("/")) {');
        output.push("    return parseFraction(size);");
        output.push("  }");
        output.push("");
        output.push('  // 处理 "px" 特殊值 - 使用 CSS 变量');
        output.push('  if (size === "px") {');
        output.push(
          '    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
        );
        output.push('      const tokenValue = token("spacing.px");');
        output.push("      if (!tokenValue) {");
        output.push(
          "        console.warn('Spacing token \"spacing.px\" not found');"
        );
        output.push('        return "1px";');
        output.push("      }");
        output.push("    }");
        output.push('    return "var(--cdt-spacing-px)";');
        output.push("  }");
        output.push("");
        output.push("  // 处理断点值");
        output.push(
          '  if (typeof size === "string" && _breakpointExists(size)) {'
        );
        output.push("    const tokenValue = token(`breakpoints.${size}`);");
        output.push("    if (tokenValue) {");
        output.push("      // 如果是 dimension token，转换为 CSS 值");
        output.push(
          "      if (typeof tokenValue === 'object' && tokenValue.value && tokenValue.unit) {"
        );
        output.push("        return `${tokenValue.value}${tokenValue.unit}`;");
        output.push("      }");
        output.push("      return String(tokenValue);");
        output.push("    }");
        output.push('    return "0";');
        output.push("  }");
        output.push("");
        output.push("  // 处理数字值 - 使用 CSS 变量和 calc()");
        output.push('  if (typeof size === "number") {');
        output.push(
          '    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
        );
        output.push('      const baseToken = token("spacing.default");');
        output.push("      if (!baseToken) {");
        output.push(
          "        console.warn('Base spacing token \"spacing.default\" not found');"
        );
        output.push("      }");
        output.push("    }");
        output.push("");
        output.push("    if (size === 1) {");
        output.push("      // 对于 spacing(1)，直接返回基础变量");
        output.push('      return "var(--cdt-spacing)";');
        output.push("    } else {");
        output.push("      // 对于其他数值，使用 calc() 计算");
        output.push("      return `calc(var(--cdt-spacing) * ${size})`;");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push("  // 如果是字符串，尝试作为数字解析");
        output.push('  if (typeof size === "string") {');
        output.push("    const numericValue = parseFloat(size);");
        output.push("    if (!isNaN(numericValue)) {");
        output.push("      return spacing(numericValue);");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push(
          "  const availableBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];"
        );
        output.push("  throw new Error(");
        output.push(
          "    `spacing() 参数错误: '${size}' 不是有效的间距值.\\n` +"
        );
        output.push("    `支持的格式:\\n` +");
        output.push(
          "    `• 数字: 0, 4, 16 等 (生成 calc(var(--cdt-spacing) * N))\\n` +"
        );
        output.push(
          '    `• 分数值: "1/2", "1/3", "2/3", "1/4", "3/4" 等\\n` +'
        );
        output.push('    `• 任意值: "[10vh]", "[calc(100%-1rem)]" 等\\n` +');
        output.push('    `• 特殊值: "px" (生成 var(--cdt-spacing-px))\\n` +');
        output.push(
          "    `• 断点值: ${availableBreakpoints.join(', ')}\\n\\n` +"
        );
        output.push('    `示例: spacing(4) → "calc(var(--cdt-spacing) * 4)"`');
        output.push("  );");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 批量获取间距值（用于 padding, margin 简写）");
        output.push(" * @param sizes - 间距大小列表，支持1-4个值");
        output.push(" * @returns 计算后的间距值字符串");
        output.push(" */");
        output.push("export function spacingList(sizes) {");
        output.push("  return sizes.map(size => spacing(size)).join(' ');");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 检查是否为有效的间距值");
        output.push(" * @param size - 间距大小");
        output.push(" * @returns 是否为有效值");
        output.push(" */");
        output.push("export function spacingExists(size) {");
        output.push("  // 数值检查");
        output.push('  if (typeof size === "number") {');
        output.push("    return true;");
        output.push("  }");
        output.push("");
        output.push("  // 字符串值检查");
        output.push('  if (typeof size === "string") {');
        output.push("    // 任意值检查");
        output.push('    if (size.startsWith("[") && size.endsWith("]")) {');
        output.push("      return true;");
        output.push("    }");
        output.push("");
        output.push("    // 分数检查");
        output.push('    if (size.includes("/")) {');
        output.push("      return /^\\d+\\/\\d+$/.test(size);");
        output.push("    }");
        output.push("");
        output.push("    // 特殊值检查");
        output.push('    if (size === "px") {');
        output.push("      return true;");
        output.push("    }");
        output.push("");
        output.push("    // 断点值检查");
        output.push("    if (_breakpointExists(size)) {");
        output.push("      return true;");
        output.push("    }");
        output.push("");
        output.push("    // 数字字符串检查");
        output.push("    const numericValue = parseFloat(size);");
        output.push("    if (!isNaN(numericValue)) {");
        output.push("      return true;");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push("  return false;");
        output.push("}");
        output.push("");

        // 将间距 helper 内容存储到全局状态中
        if (!global.designTokensHelpers) {
          global.designTokensHelpers = {};
        }
        global.designTokensHelpers.spacing = output.join("\n");
      } catch (error) {
        console.warn("[spacing-helper] 生成间距 helper 时出错:", error.message);
      }
    },
  };
}
