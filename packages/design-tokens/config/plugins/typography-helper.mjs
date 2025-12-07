import { readFileSync } from "fs";
import { join } from "path";

/**
 * Typography Helper Plugin for Terrazzo
 * 生成 typography 相关的 helper 函数
 */
export default function typographyHelperPlugin() {
  return {
    name: "typography-helper",
    transform(tokens) {
      const typographyHelperCode = generateTypographyHelperCode();

      // 初始化全局状态
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }

      // 存储 typography helper 代码
      global.designTokensHelpers.typography = typographyHelperCode;

      return tokens;
    },
  };
}

function generateTypographyHelperCode() {
  // 读取 typography composite 数据
  const typographyCompositeData = readTypographyCompositeData();
  const typographyPresets = extractTypographyPresets(typographyCompositeData);

  return `
// ============================================================================
// Typography Helper Functions - 字体排版辅助函数
// ============================================================================

/**
 * 从引用中解析 token 值
 */
function resolveTokenReference(reference) {
  if (typeof reference !== 'string' || !reference.startsWith('{') || !reference.endsWith('}')) {
    return reference;
  }
  
  const tokenPath = reference.slice(1, -1);
  const tokenValue = token(tokenPath);
  
  if (!tokenValue) {
    console.warn(\`Typography reference "\${reference}" could not be resolved\`);
    return reference;
  }
  
  // 处理 dimension tokens
  if (typeof tokenValue === 'object' && tokenValue.value && tokenValue.unit) {
    return \`\${tokenValue.value}\${tokenValue.unit}\`;
  }
  
  // 处理 fontFamily arrays
  if (Array.isArray(tokenValue)) {
    return tokenValue.join(', ');
  }
  
  return String(tokenValue);
}

/**
 * 从引用中解析 CSS 变量
 */
function resolveTokenReferenceAsVar(reference) {
  if (typeof reference !== 'string' || !reference.startsWith('{') || !reference.endsWith('}')) {
    return reference;
  }
  
  const tokenPath = reference.slice(1, -1);
  const cssVarName = tokenPath.replace(/\\./g, '-');
  return \`var(--cdt-\${cssVarName})\`;
}

/**
 * Typography 预设数据
 */
const TYPOGRAPHY_PRESETS = ${JSON.stringify(typographyPresets, null, 2)};

/**
 * 获取完整的 typography 预设样式
 * @param name - Typography preset 名称 (如 "body.large", "heading.medium")
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns CSS 属性对象
 */
export function typography(name, asVar = true) {
  const preset = TYPOGRAPHY_PRESETS[name];
  
  if (!preset) {
    const availablePresets = Object.keys(TYPOGRAPHY_PRESETS);
    throw new Error(
      \`Typography preset "\${name}" not found. Available presets: \${availablePresets.join(', ')}\`
    );
  }
  
  const resolver = asVar ? resolveTokenReferenceAsVar : resolveTokenReference;
  
  return {
    fontFamily: resolver(preset.fontFamily),
    fontSize: resolver(preset.fontSize),
    fontWeight: resolver(preset.fontWeight),
    lineHeight: resolver(preset.lineHeight),
    letterSpacing: resolver(preset.letterSpacing)
  };
}

/**
 * 获取 typography 预设的 CSS 字符串
 * @param name - Typography preset 名称
 * @param asVar - 是否使用 CSS 变量，默认 true
 * @returns CSS 字符串
 */
export function typographyStyles(name, asVar = true) {
  const styles = typography(name, asVar);
  
  return Object.entries(styles)
    .map(([property, value]) => {
      const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      return \`\${cssProperty}: \${value}\`;
    })
    .join('; ');
}

/**
 * 获取 typography 预设的样式对象（用于 React/styled-components）
 * @param name - Typography preset 名称
 * @param asVar - 是否使用 CSS 变量，默认 true
 * @returns 样式对象
 */
export function typographyStylesObject(name, asVar = true) {
  return typography(name, asVar);
}

/**
 * 获取字体族
 * @param name - 字体族名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体族值或 CSS 变量
 */
export function fontFamily(name, asVar = true) {
  const tokenKey = \`font.families.\${name}\`;
  
  if (asVar) {
    return \`var(--cdt-font-families-\${name})\`;
  }
  
  const families = token(tokenKey);
  return Array.isArray(families) ? families.join(', ') : String(families);
}

/**
 * 获取字体重量
 * @param name - 字体重量名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体重量值或 CSS 变量
 */
export function fontWeight(name, asVar = true) {
  if (asVar) {
    return \`var(--cdt-font-weights-\${name})\`;
  }
  
  return String(token(\`font.weights.\${name}\`));
}

/**
 * 获取字体大小
 * @param name - 字体大小名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字体大小值或 CSS 变量
 */
export function fontSize(name, asVar = true) {
  if (asVar) {
    return \`var(--cdt-font-sizes-\${name})\`;
  }
  
  const sizeToken = token(\`font.sizes.\${name}\`);
  if (typeof sizeToken === 'object' && sizeToken && 'value' in sizeToken && 'unit' in sizeToken) {
    return \`\${sizeToken.value}\${sizeToken.unit}\`;
  }
  
  return String(sizeToken);
}

/**
 * 获取行高
 * @param name - 行高名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 行高值或 CSS 变量
 */
export function lineHeight(name, asVar = true) {
  if (asVar) {
    return \`var(--cdt-font-line-heights-\${name})\`;
  }
  
  const lineHeightToken = token(\`font.line-heights.\${name}\`);
  if (typeof lineHeightToken === 'object' && lineHeightToken && 'value' in lineHeightToken && 'unit' in lineHeightToken) {
    return \`\${lineHeightToken.value}\${lineHeightToken.unit}\`;
  }
  
  return String(lineHeightToken);
}

/**
 * 获取字符间距
 * @param name - 字符间距名称
 * @param asVar - 是否返回 CSS 变量，默认 true
 * @returns 字符间距值或 CSS 变量
 */
export function letterSpacing(name, asVar = true) {
  if (asVar) {
    return \`var(--cdt-font-letter-spacings-\${name})\`;
  }
  
  const spacingToken = token(\`font.letter-spacings.\${name}\`);
  if (typeof spacingToken === 'object' && spacingToken && 'value' in spacingToken && 'unit' in spacingToken) {
    return \`\${spacingToken.value}\${spacingToken.unit}\`;
  }
  
  return String(spacingToken);
}

/**
 * 列出所有可用的 typography presets
 * @returns Typography preset 名称数组
 */
export function listTypographyPresets() {
  return Object.keys(TYPOGRAPHY_PRESETS).sort();
}

/**
 * 检查 typography preset 是否存在
 * @param name - Typography preset 名称
 * @returns 是否存在
 */
export function typographyExists(name) {
  return name in TYPOGRAPHY_PRESETS;
}

/**
 * 获取 typography preset 的详细信息
 * @param name - Typography preset 名称
 * @returns Typography preset 详细信息
 */
export function typographyInfo(name) {
  const preset = TYPOGRAPHY_PRESETS[name];
  
  if (!preset) {
    throw new Error(\`Typography preset "\${name}" not found\`);
  }
  
  return {
    name,
    description: preset.description,
    value: {
      fontFamily: preset.fontFamily,
      fontSize: preset.fontSize,
      fontWeight: preset.fontWeight,
      lineHeight: preset.lineHeight,
      letterSpacing: preset.letterSpacing
    },
    resolved: {
      fontFamily: resolveTokenReference(preset.fontFamily),
      fontSize: resolveTokenReference(preset.fontSize),
      fontWeight: resolveTokenReference(preset.fontWeight),
      lineHeight: resolveTokenReference(preset.lineHeight),
      letterSpacing: resolveTokenReference(preset.letterSpacing)
    }
  };
}
`;
}

/**
 * 读取 typography composite 数据
 */
function readTypographyCompositeData() {
  try {
    // 尝试当前目录路径（在 packages/design-tokens 中运行）
    const filePath = join(
      process.cwd(),
      "output/typography-composite-w3c.json"
    );
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    try {
      // 尝试从项目根目录
      const fallbackPath = join(
        process.cwd(),
        "packages/design-tokens/output/typography-composite-w3c.json"
      );
      const data = readFileSync(fallbackPath, "utf8");
      return JSON.parse(data);
    } catch (fallbackError) {
      console.warn(
        "Could not load typography composite data from either path:",
        error.message,
        fallbackError.message
      );
      return { typography: {} };
    }
  }
}

/**
 * 从 typography composite 数据中提取预设
 */
function extractTypographyPresets(data) {
  const presets = {};

  function processLevel(obj, prefix = "") {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === "object") {
        if (value.$type === "typography") {
          const presetName = prefix ? `${prefix}.${key}` : key;
          presets[presetName] = {
            description: value.$description || "",
            fontFamily: value.$value.fontFamily,
            fontSize: value.$value.fontSize,
            fontWeight: value.$value.fontWeight,
            lineHeight: value.$value.lineHeight,
            letterSpacing: value.$value.letterSpacing,
          };
        } else {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          processLevel(value, newPrefix);
        }
      }
    }
  }

  if (data.typography) {
    processLevel(data.typography);
  }

  return presets;
}
