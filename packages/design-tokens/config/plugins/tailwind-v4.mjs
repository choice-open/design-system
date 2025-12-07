export default function tailwindV4(options = {}) {
  const { filename = "tailwind.css" } = options;

  return {
    name: "tailwind-v4",
    async build({ tokens, outputFile }) {
      
      // 收集所有需要的令牌
      const colorTokens = {};
      const fontTokens = {};
      const otherTokens = {};
      
      // 分类令牌
      Object.entries(tokens).forEach(([id, token]) => {
        // 跳过未定义值的令牌
        if (!token.$value) return;
        
        // 处理颜色令牌
        if (token.$type === "color") {
          // 转换命名格式
          let varName = `--${id.replace(/\./g, "-")}`;
          
          // 特殊命名转换
          if (varName.startsWith("--color-text-")) {
            varName = varName.replace("--color-text-", "--color-") + "-foreground";
          } else if (varName.startsWith("--color-background-")) {
            const name = varName.replace("--color-background-", "");
            varName = `--color-${name}-background`;
          } else if (varName.startsWith("--color-border-")) {
            const name = varName.replace("--color-border-", "");
            varName = `--color-${name}-boundary`;
          } else if (varName.startsWith("--color-icon-")) {
            const name = varName.replace("--color-icon-", "");
            varName = `--color-${name}-icon`;
          }
          
          // 检查是否有自定义的 alpha 值
          let alpha = 1;
          
          // First check in originalValue.$extensions (where Terrazzo stores the original token data)
          if (token.originalValue && token.originalValue.$extensions && token.originalValue.$extensions.alpha) {
            const alphaValue = token.originalValue.$extensions.alpha;
            if (typeof alphaValue === 'number') {
              alpha = alphaValue;
            } else if (typeof alphaValue === 'object' && alphaValue.light !== undefined) {
              // 默认使用 light 模式的 alpha 值
              // 注意：在实际使用中，CSS 会根据主题自动切换到正确的值
              alpha = alphaValue.light;
            }
          }
          // Then check in token.$extensions (fallback)
          else if (token.$extensions && token.$extensions.alpha) {
            // 支持单一 alpha 值或 light/dark 模式的 alpha 值
            if (typeof token.$extensions.alpha === 'number') {
              alpha = token.$extensions.alpha;
            } else if (token.$extensions.alpha.light !== undefined) {
              // 默认使用 light 模式的 alpha 值
              // 注意：在实际使用中，CSS 会根据主题自动切换到正确的值
              alpha = token.$extensions.alpha.light;
            }
          }
          // 也检查 $value 中的 alpha
          else if (token.$value && typeof token.$value === 'object' && token.$value.alpha !== undefined) {
            alpha = token.$value.alpha;
          }
          
          
          const cssVarRef = `rgba(var(--cdt-${id.replace(/\./g, "-")}), ${alpha})`;
          colorTokens[varName] = cssVarRef;
        }
        // 处理阴影类型
        else if (token.$type === "shadow") {
          const varName = `--shadow-${id.replace("shadows.", "").replace(/\./g, "-")}`;
          const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
          otherTokens[varName] = cssVarRef;
        }
        // 处理字体相关
        else if (token.$type === "fontFamily") {
          const varName = `--font-${id.replace("font.families.", "").replace(/\./g, "-")}`;
          const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
          fontTokens[varName] = cssVarRef;
        }
        else if (token.$type === "fontWeight") {
          const varName = `--font-weight-${id.replace("font.weights.", "").replace(/\./g, "-")}`;
          const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
          otherTokens[varName] = cssVarRef;
        }
        else if (token.$type === "dimension") {
          // 处理字体大小
          if (id.startsWith("font.sizes.")) {
            const varName = `--text-${id.replace("font.sizes.", "").replace(/\./g, "-")}`;
            const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
            otherTokens[varName] = cssVarRef;
          }
          // 处理行高
          else if (id.startsWith("font.line-heights.")) {
            const varName = `--leading-${id.replace("font.line-heights.", "").replace(/\./g, "-")}`;
            const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
            otherTokens[varName] = cssVarRef;
          }
          // 处理字间距
          else if (id.startsWith("font.letter-spacings.")) {
            const varName = `--tracking-${id.replace("font.letter-spacings.", "").replace(/\./g, "-")}`;
            const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
            otherTokens[varName] = cssVarRef;
          }
          // 处理 spacing - 只处理 spacing.default
          else if (id === "spacing.default") {
            const varName = `--spacing`;
            const cssVarRef = `var(--cdt-spacing)`;
            otherTokens[varName] = cssVarRef;
          }
          // 跳过其他 spacing
          else if (id.startsWith("spacing.")) {
            return;
          }
          // 其他 dimension 类型
          else {
            const varName = `--${id.replace(/\./g, "-")}`;
            const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
            otherTokens[varName] = cssVarRef;
          }
        }
        else if (token.$type === "number") {
          // 处理 z-index - 检查 description 中是否包含 "Z-index"
          if (token.$description && token.$description.includes("Z-index")) {
            // 如果 id 已经包含 zindex，则去掉它
            const cleanId = id.startsWith("zindex.") ? id.substring(7) : id;
            const varName = `--z-index-${cleanId.replace(/\./g, "-")}`;
            const cssVarRef = `var(--cdt-${id.replace(/\./g, "-")})`;
            otherTokens[varName] = cssVarRef;
          }
        }
      });

      // 生成 CSS 内容
      let css = `@custom-variant dark (&:where(.dark, .dark *));
@custom-variant children (& > *);

`;

      // 生成 @theme 块
      css += `@theme {\n`;
      // 添加特定属性的 initial
      css += `  --color-*: initial;\n`;
      css += `  --text-*: initial;\n`;
      css += `  --font-*: initial;\n`;
      css += `  --shadow-*: initial;\n`;
      css += `  --radius-*: initial;\n`;
      css += `  --leading-*: initial;\n`;
      css += `  --tracking-*: initial;\n\n`;
      
      // 基础颜色
      Object.entries(colorTokens).forEach(([varName, value]) => {
        css += `  ${varName}: ${value};\n`;
      });
      
      css += `\n`;
      
      // 其他令牌 - 按类型分组输出
      const textTokens = {};
      const leadingTokens = {};
      const trackingTokens = {};
      const shadowTokens = {};
      const otherMiscTokens = {};
      
      // 对 otherTokens 进行分类
      Object.entries(otherTokens).forEach(([varName, value]) => {
        if (varName.startsWith("--text-")) {
          textTokens[varName] = value;
        } else if (varName.startsWith("--leading-")) {
          leadingTokens[varName] = value;
        } else if (varName.startsWith("--tracking-")) {
          trackingTokens[varName] = value;
        } else if (varName.startsWith("--shadow-")) {
          shadowTokens[varName] = value;
        } else if (!varName.startsWith("--font-weight-")) {
          // 排除 font-weight，它们会在后面单独处理
          otherMiscTokens[varName] = value;
        }
      });
      
      // 输出字体相关 (font families)
      const fontFamilyTokens = {};
      Object.entries(fontTokens).forEach(([varName, value]) => {
        if (!varName.startsWith("--font-weight-")) {
          fontFamilyTokens[varName] = value;
        }
      });
      
      if (Object.keys(fontFamilyTokens).length > 0) {
        css += `\n`;
        Object.entries(fontFamilyTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 处理 font weights - 从 otherTokens 中移除
      const fontWeightTokens = {};
      for (const [varName, value] of Object.entries(otherTokens)) {
        if (varName.startsWith("--font-weight-")) {
          fontWeightTokens[varName] = value;
        }
      }
      // 删除已处理的 font-weight
      Object.keys(fontWeightTokens).forEach(key => delete otherTokens[key]);
      
      if (Object.keys(fontWeightTokens).length > 0) {
        css += `\n`;
        Object.entries(fontWeightTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 输出 text sizes
      if (Object.keys(textTokens).length > 0) {
        css += `\n`;
        Object.entries(textTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 添加 typography presets
      const typographyPresets = [
        // Body presets
        {
          name: "body-large",
          fontSize: "md",
          lineHeight: "normal",
          fontWeight: "default",
          letterSpacing: "body-large"
        },
        {
          name: "body-large-strong",
          fontSize: "md",
          lineHeight: "normal",
          fontWeight: "strong",
          letterSpacing: "body-large"
        },
        {
          name: "body-medium",
          fontSize: "sm",
          lineHeight: "snug",
          fontWeight: "medium",
          letterSpacing: "body-medium"
        },
        {
          name: "body-medium-strong",
          fontSize: "sm",
          lineHeight: "snug",
          fontWeight: "heavy",
          letterSpacing: "body-medium"
        },
        {
          name: "body-small",
          fontSize: "xs",
          lineHeight: "tight",
          fontWeight: "default",
          letterSpacing: "body-small"
        },
        {
          name: "body-small-strong",
          fontSize: "xs",
          lineHeight: "tight",
          fontWeight: "strong",
          letterSpacing: "body-small-strong"
        },
        // Heading presets
        {
          name: "heading-display",
          fontSize: "2xl",
          lineHeight: "extra-loose",
          fontWeight: "light",
          letterSpacing: "display"
        },
        {
          name: "heading-large",
          fontSize: "xl",
          lineHeight: "loose",
          fontWeight: "heavy",
          letterSpacing: "heading-large"
        },
        {
          name: "heading-medium",
          fontSize: "lg",
          lineHeight: "relaxed",
          fontWeight: "heavy",
          letterSpacing: "heading-medium"
        },
        {
          name: "heading-small",
          fontSize: "md",
          lineHeight: "normal",
          fontWeight: "heavy",
          letterSpacing: "heading-small"
        }
      ];
      
      css += `\n`;
      typographyPresets.forEach(preset => {
        css += `  --text-${preset.name}: var(--cdt-font-sizes-${preset.fontSize});\n`;
        css += `  --text-${preset.name}--line-height: var(--cdt-font-line-heights-${preset.lineHeight});\n`;
        css += `  --text-${preset.name}--font-weight: var(--cdt-font-weights-${preset.fontWeight});\n`;
        css += `  --text-${preset.name}--letter-spacing: var(--cdt-font-letter-spacings-${preset.letterSpacing});\n`;
      });
      
      // 输出 leading (line heights)
      if (Object.keys(leadingTokens).length > 0) {
        css += `\n`;
        Object.entries(leadingTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 输出 tracking (letter spacing)
      if (Object.keys(trackingTokens).length > 0) {
        css += `\n`;
        Object.entries(trackingTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 输出其他
      if (Object.keys(otherMiscTokens).length > 0) {
        css += `\n`;
        Object.entries(otherMiscTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      // 输出 shadows
      if (Object.keys(shadowTokens).length > 0) {
        css += `\n`;
        Object.entries(shadowTokens).forEach(([varName, value]) => {
          css += `  ${varName}: ${value};\n`;
        });
      }
      
      
      // z-index 已经在上面处理过了
      
      
      css += `}\n`;

      outputFile(filename, css);
    }
  };
}

// 这些格式化函数不再需要，因为我们现在使用 CSS 变量引用

