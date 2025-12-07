export default function scssFunctionsMerger(userOptions = {}) {
  return {
    name: "scss-functions-merger",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const helpers = global.designTokensHelpers?.scss || {};

      if (Object.keys(helpers).length === 0) {
        console.warn("[scss-functions-merger] 没有找到 SCSS helper 函数");
        return;
      }

      // 合并所有 SCSS 函数
      const output = [];

      // 文件头部注释
      output.push(
        "// ============================================================================"
      );
      output.push("// Design Tokens SCSS Functions - 由 Terrazzo 自动生成");
      output.push(
        "// ============================================================================"
      );
      output.push("// 此文件包含所有设计令牌的 SCSS 函数");
      output.push("// 请勿手动编辑此文件");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      // 收集所有需要的 @use 语句（去重）
      const useStatements = new Set();
      useStatements.add('@use "sass:string"');
      useStatements.add('@use "sass:map"');
      useStatements.add('@use "sass:meta"');
      useStatements.add('@use "sass:list"');
      useStatements.add('@use "sass:math"');
      
      // 输出所有 @use 语句
      useStatements.forEach(statement => output.push(statement + ";"));
      output.push("");

      // 添加各个模块的函数
      const moduleOrder = ["colors", "spacing", "shadows"];

      moduleOrder.forEach((moduleName) => {
        if (helpers[moduleName]) {
          output.push(
            `// ============================================================================`
          );
          output.push(`// ${moduleName.toUpperCase()} FUNCTIONS`);
          output.push(
            `// ============================================================================`
          );
          output.push("");
          
          // 移除模块中的 @use 语句，避免重复
          let moduleContent = helpers[moduleName];
          moduleContent = moduleContent.replace(/@use\s+"sass:[^"]+";?\s*\n?/g, '');
          
          output.push(moduleContent);
          output.push("");
        }
      });

      // 添加未在 moduleOrder 中的其他模块
      Object.keys(helpers).forEach((moduleName) => {
        if (!moduleOrder.includes(moduleName)) {
          output.push(
            `// ============================================================================`
          );
          output.push(`// ${moduleName.toUpperCase()} FUNCTIONS`);
          output.push(
            `// ============================================================================`
          );
          output.push("");
          
          // 移除模块中的 @use 语句，避免重复
          let moduleContent = helpers[moduleName];
          moduleContent = moduleContent.replace(/@use\s+"sass:[^"]+";?\s*\n?/g, '');
          
          output.push(moduleContent);
          output.push("");
        }
      });

      // 写入文件
      outputFile("functions.scss", output.join("\n"));

      console.log(`✅ SCSS 函数已生成: functions.scss`);
      console.log(`📊 包含模块: ${Object.keys(helpers).join(", ")}`);
    },
  };
}
