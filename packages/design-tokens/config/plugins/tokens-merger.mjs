export default function tokensMerger(userOptions = {}) {
  return {
    name: "tokens-merger",
    enforce: "post", // 最后运行，合并所有文件

    async build({ tokens, getTransforms, outputFile, readFile }) {
      const output = [];

      // 从全局状态读取各个 helper 的内容
      if (global.designTokensHelpers) {
        // 添加基础 tokens 内容
        if (global.designTokensHelpers.base) {
          output.push(global.designTokensHelpers.base);
        }
        if (global.designTokensHelpers.colors) {
          output.push("");
          output.push(global.designTokensHelpers.colors);
        }

        if (global.designTokensHelpers.spacing) {
          output.push("");
          output.push(global.designTokensHelpers.spacing);
        }

        if (global.designTokensHelpers.typography) {
          output.push("");
          output.push(global.designTokensHelpers.typography);
        }

        if (global.designTokensHelpers.breakpoints) {
          output.push("");
          output.push(global.designTokensHelpers.breakpoints);
        }

        if (global.designTokensHelpers.other) {
          output.push("");
          output.push(global.designTokensHelpers.other);
        }
      } else {
        console.warn("[tokens-merger] 未找到 helper 内容，可能是插件顺序问题");
      }

      outputFile("tokens.js", output.join("\n"));

      // 清理全局状态
      if (global.designTokensHelpers) {
        delete global.designTokensHelpers;
      }
    },
  };
}
