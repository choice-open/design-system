const fs = require("fs");
const path = require("path");

// 读取所有 W3C JSON 文件并生成 JavaScript
const outputDir = "./output";
const distDir = "./dist";

// 确保 dist 目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const jsonFiles = [
  "colors-w3c.json",
  "typography-w3c.json",
  "spacing-w3c.json",
  "radius-w3c.json",
  "zindex-w3c.json",
  "breakpoints-w3c.json",
  "shadows-w3c.json",
];

// 生成 JavaScript 导出
const generateJSTokens = () => {
  const tokens = {};

  jsonFiles.forEach((file) => {
    const filePath = path.join(outputDir, file);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const category = file.replace("-w3c.json", "");
      tokens[category] = data;
    }
  });

  // 生成 ESM 格式的 JavaScript
  const jsContent = `// Auto-generated design tokens
// Generated from W3C Design Tokens format

// 导出所有 tokens 数据
export const tokens = ${JSON.stringify(tokens, null, 2)};

// 按类别导出
${Object.keys(tokens)
  .map((category) => `export const ${category} = tokens.${category};`)
  .join("\n")}

// 默认导出
export default tokens;
`;

  fs.writeFileSync(path.join(distDir, "tokens.js"), jsContent);
  console.log("✅ JavaScript tokens 文件生成成功: dist/tokens.js");
};

// 生成 TypeScript 声明文件
const generateDTS = () => {
  const dtsContent = `// Auto-generated design tokens type definitions

export interface DesignTokens {
  [key: string]: any;
}

${jsonFiles
  .map((file) => {
    const category = file.replace("-w3c.json", "");
    return `export declare const ${category}: DesignTokens;`;
  })
  .join("\n")}

export declare const tokens: DesignTokens;
export default tokens;
`;

  fs.writeFileSync(path.join(distDir, "tokens.d.ts"), dtsContent);
  console.log("✅ TypeScript 声明文件生成成功: dist/tokens.d.ts");
};

try {
  generateJSTokens();
  generateDTS();
  console.log("🎉 所有 JavaScript 相关文件生成完成！");
} catch (error) {
  console.error("❌ 生成 JavaScript 文件时出错:", error);
  process.exit(1);
}
