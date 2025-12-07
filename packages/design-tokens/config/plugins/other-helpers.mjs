export default function otherHelpers(userOptions = {}) {
  return {
    name: "other-helpers",
    enforce: "post", // 在其他插件之后运行

    async build({ tokens, getTransforms, outputFile }) {
      try {
        // 独立生成其他 helper 函数
        const output = [];

        // 添加 Radius Helper 函数
        output.push(
          "// ============================================================================"
        );
        output.push("// Radius Helper Functions - 圆角辅助函数");
        output.push(
          "// ============================================================================"
        );
        output.push("");

        output.push("/**");
        output.push(" * 获取圆角值 - 使用 CSS 变量");
        output.push(" * @param name - 圆角名称");
        output.push(" * @param mode - 主题模式（暂不支持，保留接口兼容性）");
        output.push(" * @returns CSS 圆角变量");
        output.push(" */");
        output.push("export function radius(name, mode) {");
        output.push("  // 验证 token 是否存在（仅在开发模式下）");
        output.push(
          '  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
        );
        output.push("    const tokenValue = token(`radius.${name}`);");
        output.push("    if (!tokenValue) {");
        output.push("      const availableRadius = ['sm', 'md', 'lg'];");
        output.push("      throw new Error(");
        output.push(
          "        `Radius '${name}' not found. Available radius values: ${availableRadius.join(\", \")}`"
        );
        output.push("      );");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push("  return `var(--cdt-radius-${name})`;");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 批量获取多个圆角值");
        output.push(" * @param names - 圆角名称数组");
        output.push(" * @returns CSS 圆角变量数组");
        output.push(" */");
        output.push("export function radiusList(...names) {");
        output.push("  return names.map(name => radius(name));");
        output.push("}");
        output.push("");

        // 添加 Shadows Helper 函数
        output.push(
          "// ============================================================================"
        );
        output.push("// Shadow Helper Functions - 阴影辅助函数");
        output.push(
          "// ============================================================================"
        );
        output.push("");

        output.push("/**");
        output.push(" * 获取阴影样式 - 使用 CSS 变量");
        output.push(" * @param name - 阴影名称");
        output.push(" * @param mode - 主题模式（暂不支持，保留接口兼容性）");
        output.push(" * @returns CSS 阴影变量");
        output.push(" */");
        output.push("export function shadow(name, mode) {");
        output.push("  // 验证 token 是否存在（仅在开发模式下）");
        output.push(
          '  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
        );
        output.push("    const tokenValue = token(`shadows.${name}`);");
        output.push("    if (!tokenValue) {");
        output.push("      const availableShadows = [");
        output.push("        'border-default',");
        output.push("        'border-default-inset',");
        output.push("        'focus',");
        output.push("        'lg',");
        output.push("        'line',");
        output.push("        'md',");
        output.push("        'sm',");
        output.push("        'xl',");
        output.push("        'xs',");
        output.push("        'xxs'");
        output.push("      ];");
        output.push("      throw new Error(");
        output.push(
          "        `Shadow '${name}' not found. Available shadows: ${availableShadows.join(\", \")}`"
        );
        output.push("      );");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push("  return `var(--cdt-shadows-${name})`;");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 批量获取多个阴影样式");
        output.push(" * @param names - 阴影名称数组");
        output.push(" * @returns CSS 阴影变量数组");
        output.push(" */");
        output.push("export function shadowList(...names) {");
        output.push("  return names.map(name => shadow(name));");
        output.push("}");
        output.push("");

        // 添加 Z-Index Helper 函数
        output.push(
          "// ============================================================================"
        );
        output.push("// Z-Index Helper Functions - 层级辅助函数");
        output.push(
          "// ============================================================================"
        );
        output.push("");

        output.push("/**");
        output.push(" * 获取 z-index CSS 变量");
        output.push(" * @param name - z-index 名称");
        output.push(" * @param mode - 主题模式（暂不支持，保留接口兼容性）");
        output.push(" * @returns CSS z-index 变量");
        output.push(" */");
        output.push("export function zIndex(name, mode) {");
        output.push("  // 验证 token 是否存在（仅在开发模式下）");
        output.push(
          '  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {'
        );
        output.push("    const tokenValue = token(`zindex.${name}`);");
        output.push(
          "    if (tokenValue === undefined || tokenValue === null) {"
        );
        output.push("      const availableZIndex = [");
        output.push("        'sticky',");
        output.push("        'fixed',");
        output.push("        'backdrop',");
        output.push("        'modals',");
        output.push("        'popover',");
        output.push("        'menu',");
        output.push("        'tooltip',");
        output.push("        'notification',");
        output.push("        'scroll-bar'");
        output.push("      ];");
        output.push("      throw new Error(");
        output.push(
          "        `Z-index '${name}' not found. Available z-index values: ${availableZIndex.join(\", \")}`"
        );
        output.push("      );");
        output.push("    }");
        output.push("  }");
        output.push("");
        output.push("  return `var(--cdt-zindex-${name})`;");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 获取 z-index 的原始数值");
        output.push(" * @param name - z-index 名称");
        output.push(" * @param mode - 主题模式（暂不支持，保留接口兼容性）");
        output.push(" * @returns z-index 数值");
        output.push(" */");
        output.push("export function zIndexValue(name, mode) {");
        output.push("  const tokenValue = token(`zindex.${name}`);");
        output.push("");
        output.push('  if (typeof tokenValue !== "number") {');
        output.push("    const availableZIndex = [");
        output.push("      'sticky', 'fixed', 'backdrop', 'modals',");
        output.push(
          "      'popover', 'menu', 'tooltip', 'notification', 'scroll-bar'"
        );
        output.push("    ];");
        output.push("    throw new Error(");
        output.push(
          "      `Z-index '${name}' not found or invalid. Available z-index values: ${availableZIndex.join(\", \")}`"
        );
        output.push("    );");
        output.push("  }");
        output.push("");
        output.push("  return tokenValue;");
        output.push("}");
        output.push("");

        output.push("/**");
        output.push(" * 批量获取多个 z-index CSS 变量");
        output.push(" * @param names - z-index 名称数组");
        output.push(" * @returns CSS z-index 变量数组");
        output.push(" */");
        output.push("export function zIndexList(...names) {");
        output.push("  return names.map(name => zIndex(name));");
        output.push("}");
        output.push("");

        // 将其他 helper 内容存储到全局状态中
        if (!global.designTokensHelpers) {
          global.designTokensHelpers = {};
        }
        global.designTokensHelpers.other = output.join("\n");
      } catch (error) {
        console.warn("[other-helpers] 生成其他 helper 时出错:", error.message);
      }
    },
  };
}
