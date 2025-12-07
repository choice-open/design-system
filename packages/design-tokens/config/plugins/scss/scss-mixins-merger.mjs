export default function scssMixinsMerger() {
  return {
    name: "scss-mixins-merger",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      try {
        // 检查是否有 mixins 数据
        if (!global.designTokensHelpers?.scssMixins) {
          console.warn(
            "[scss-mixins-merger] 没有找到 SCSS mixins 数据，跳过合并"
          );
          return;
        }

        const output = [];
        const mixinsData = global.designTokensHelpers.scssMixins;

        // 收集所有需要的 @use 语句（去重）
        const useStatements = new Set();
        
        // 从所有模块中提取 @use 语句
        mixinsData.forEach((moduleData) => {
          const useMatches = moduleData.content.match(/@use\s+"sass:[^"]+";?/g);
          if (useMatches) {
            useMatches.forEach(statement => {
              useStatements.add(statement.replace(/;?\s*$/, '') + ';');
            });
          }
        });

        // 首先输出所有 @use 语句
        useStatements.forEach(statement => output.push(statement));
        if (useStatements.size > 0) {
          output.push("");
        }

        // 添加文件头部注释
        output.push(
          "// ============================================================================"
        );
        output.push("// Design Tokens SCSS Mixins - 响应式断点专用");
        output.push("// 由 Terrazzo 自动生成 - 请勿手动编辑");
        output.push("//");
        output.push("// 这个文件只包含响应式断点相关的 SCSS mixins");
        output.push(
          "// 其他功能（颜色、间距、阴影等）请使用 functions.scss 中的函数"
        );
        output.push("//");
        output.push("// 使用方法:");
        output.push("//   @import 'path/to/functions'; // 先导入函数");
        output.push("//   @import 'path/to/mixins';    // 再导入 mixins");
        output.push("//");
        output.push("//   .my-component {");
        output.push("//     @include up('md') {");
        output.push("//       padding: spacing(4);           // 使用函数");
        output.push(
          "//       background: color('background.default'); // 使用函数"
        );
        output.push("//     }");
        output.push("//   }");
        output.push(
          "// ============================================================================"
        );
        output.push("");

        // 添加导入说明
        output.push(
          "// 注意：这些 mixins 主要用于媒体查询，其他样式请使用 functions.scss"
        );
        output.push("// 正确的导入顺序:");
        output.push(
          "// @import 'path/to/functions';  // functions 提供: color(), spacing(), shadow() 等"
        );
        output.push(
          "// @import 'path/to/mixins';     // mixins 提供: up(), down(), between() 等"
        );
        output.push("");

        // 按特定顺序合并模块
        const moduleOrder = ["responsive", "color", "utility"];

        moduleOrder.forEach((moduleName) => {
          const moduleData = mixinsData.find((m) => m.name === moduleName);
          if (moduleData) {
            // 移除模块中的 @use 语句，避免重复
            let moduleContent = moduleData.content;
            moduleContent = moduleContent.replace(/@use\s+"sass:[^"]+";?\s*\n?/g, '');
            
            output.push(moduleContent);
            output.push(""); // 模块之间的空行
          }
        });

        // 合并任何其他未排序的模块
        mixinsData.forEach((moduleData) => {
          if (!moduleOrder.includes(moduleData.name)) {
            // 移除模块中的 @use 语句，避免重复
            let moduleContent = moduleData.content;
            moduleContent = moduleContent.replace(/@use\s+"sass:[^"]+";?\s*\n?/g, '');
            
            output.push(moduleContent);
            output.push("");
          }
        });

        // 添加底部说明
        output.push(
          "// ============================================================================"
        );
        output.push("// 文件结束");
        output.push(
          "// ============================================================================"
        );

        // 写入文件
        const finalContent = output.join("\n");
        await outputFile("mixins.scss", finalContent);

        console.log("✅ SCSS mixins 文件已生成: dist/mixins.scss");
      } catch (error) {
        console.warn(
          "[scss-mixins-merger] 合并 SCSS mixins 时出错:",
          error.message
        );
      }
    },
  };
}
