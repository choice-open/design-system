export default function scssSpacingFunctionsV2(userOptions = {}) {
  return {
    name: "scss-spacing-functions-v2",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const output = [];

      // SCSS 文件头部
      output.push('@use "sass:map";');
      output.push('@use "sass:meta";');
      output.push('@use "sass:list";');
      output.push('@use "sass:math";');
      output.push("");
      output.push(
        "// ============================================================================"
      );
      output.push("// Spacing 工具函数 - 与 CSS-in-JS API 完全一致");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      // 收集断点 tokens
      const breakpointTokens = Object.keys(tokens)
        .filter((key) => key.startsWith("breakpoints."))
        .map((key) => key.replace("breakpoints.", ""));

      // 分数解析函数
      output.push("/// 解析分数字符串为百分比");
      output.push(
        "/// @param {String} $fraction - 分数字符串，如 '1/2', '2/3'"
      );
      output.push("/// @return {String} 百分比字符串");
      output.push("/// @access private");
      output.push("@function _parse-fraction($fraction) {");
      output.push("  // 简单分数映射，避免复杂的字符串解析");
      output.push("  $fractions: (");
      output.push('    "1/2": 50%,');
      output.push('    "1/3": 33.333333%,');
      output.push('    "2/3": 66.666667%,');
      output.push('    "1/4": 25%,');
      output.push('    "3/4": 75%,');
      output.push('    "1/5": 20%,');
      output.push('    "2/5": 40%,');
      output.push('    "3/5": 60%,');
      output.push('    "4/5": 80%,');
      output.push('    "1/6": 16.666667%,');
      output.push('    "5/6": 83.333333%,');
      output.push('    "1/12": 8.333333%,');
      output.push('    "5/12": 41.666667%,');
      output.push('    "7/12": 58.333333%,');
      output.push('    "11/12": 91.666667%');
      output.push("  );");
      output.push("  ");
      output.push("  @if map.has-key($fractions, $fraction) {");
      output.push("    @return map.get($fractions, $fraction);");
      output.push("  }");
      output.push("  ");
      output.push(
        "  @error \"无效的分数格式: '#{$fraction}'. 支持的分数: #{map.keys($fractions)}\";"
      );
      output.push("}");
      output.push("");

      // 检查断点是否存在
      output.push("/// 检查断点是否存在");
      output.push("/// @param {String} $name - 断点名称");
      output.push("/// @return {Boolean} 是否存在");
      output.push("/// @access private");
      output.push("@function _breakpoint-exists($name) {");
      output.push("  $valid-breakpoints: (");
      breakpointTokens.forEach((bp, index) => {
        const comma = index === breakpointTokens.length - 1 ? "" : ",";
        output.push(`    \"${bp}\"${comma}`);
      });
      output.push("  );");
      output.push("  @return list.index($valid-breakpoints, $name) != null;");
      output.push("}");
      output.push("");

      // 主要间距函数 - 完全匹配 CSS-in-JS API
      output.push("/// 获取间距值 - 与 CSS-in-JS spacing() 完全一致");
      output.push(
        "/// @param {String|Number} $size - 间距大小，支持预设值、任意数值、分数、断点值或任意值"
      );
      output.push("/// @return {String} 计算后的间距值");
      output.push("/// @example scss - 使用示例");
      output.push("///   .button {");
      output.push(
        "///     padding: spacing(4);        // calc(var(--cdt-spacing) * 4)"
      );
      output.push("///     margin: spacing(0);         // 0");
      output.push(
        '///     border: spacing("px");      // var(--cdt-spacing-px)'
      );
      output.push('///     width: spacing("1/2");      // 50%');
      output.push(
        '///     max-width: spacing("md");   // var(--cdt-breakpoints-md)'
      );
      output.push("///   }");
      output.push("@function spacing($size) {");
      output.push("  // 特殊值直接返回");
      output.push("  @if $size == 0 {");
      output.push("    @return 0;");
      output.push("  }");
      output.push("");
      output.push("  // 处理任意值 [value]");
      output.push("  @if meta.type-of($size) == string {");
      output.push(
        '    @if string.index($size, "[") == 1 and string.index($size, "]") == string.length($size) {'
      );
      output.push("      @return string.slice($size, 2, -2);");
      output.push("    }");
      output.push("  }");
      output.push("");
      output.push("  // 处理分数 1/2, 2/3 等");
      output.push(
        '  @if meta.type-of($size) == string and string.index($size, "/") {'
      );
      output.push("    @return _parse-fraction($size);");
      output.push("  }");
      output.push("");
      output.push('  // 处理 "px" 特殊值');
      output.push('  @if $size == "px" {');
      output.push("    @return var(--cdt-spacing-px);");
      output.push("  }");
      output.push("");
      output.push("  // 处理断点值");
      output.push(
        "  @if meta.type-of($size) == string and _breakpoint-exists($size) {"
      );
      output.push("    @return var(--cdt-breakpoints-#{$size});");
      output.push("  }");
      output.push("");
      output.push("  // 处理数字值");
      output.push("  @if meta.type-of($size) == number {");
      output.push("    @if $size == 1 {");
      output.push("      @return var(--cdt-spacing);");
      output.push("    } @else {");
      output.push("      @return calc(var(--cdt-spacing) * #{$size});");
      output.push("    }");
      output.push("  }");
      output.push("");
      output.push("  // 如果是字符串，尝试作为数字解析");
      output.push("  @if meta.type-of($size) == string {");
      output.push("    // 在 SCSS 中无法动态解析数字字符串，直接错误处理");
      output.push(
        "    @error \"spacing() 无法解析字符串数字 '#{$size}'，请使用数字类型\";"
      );
      output.push("  }");
      output.push("");
      output.push("  $available-breakpoints: (");
      breakpointTokens.forEach((bp) => {
        output.push(`    \"${bp}\",`);
      });
      output.push("  );");
      output.push(
        "  @error \"spacing() 参数错误: '#{$size}' 不是有效的间距值.\\A\" +"
      );
      output.push('         "支持的格式:\\A" +');
      output.push('         "• 数字: 0, 4, 16 等\\A" +');
      output.push(
        '         "• 分数值: \\"1/2\\", \\"1/3\\", \\"2/3\\" 等\\A" +'
      );
      output.push(
        '         "• 任意值: \\"[10vh]\\", \\"[calc(100%-1rem)]\\" 等\\A" +'
      );
      output.push('         "• 特殊值: \\"px\\"\\A" +');
      output.push('         "• 断点值: #{$available-breakpoints}";');
      output.push("}");
      output.push("");

      // spacingList 函数 - 批量处理
      output.push(
        "/// 批量获取间距值（用于 padding, margin 简写）- 与 CSS-in-JS spacingList() 一致"
      );
      output.push("/// @param {List} $sizes - 间距大小列表");
      output.push("/// @return {String} 计算后的间距值字符串");
      output.push("/// @example scss - 使用示例");
      output.push("///   .card {");
      output.push("///     padding: spacing-list(4, 6, 2, 8);");
      output.push("///   }");
      output.push("@function spacing-list($sizes...) {");
      output.push("  $result: ();");
      output.push("  @each $size in $sizes {");
      output.push("    $result: list.append($result, spacing($size));");
      output.push("  }");
      output.push("  @return $result;");
      output.push("}");
      output.push("");

      // spacingExists 函数 - 检查是否存在
      output.push(
        "/// 检查是否为有效的间距值 - 与 CSS-in-JS spacingExists() 一致"
      );
      output.push("/// @param {String|Number} $size - 间距大小");
      output.push("/// @return {Boolean} 是否为有效值");
      output.push("@function spacing-exists($size) {");
      output.push("  // 数值检查");
      output.push("  @if meta.type-of($size) == number {");
      output.push("    @return true;");
      output.push("  }");
      output.push("");
      output.push("  @if meta.type-of($size) == string {");
      output.push("    // 任意值检查");
      output.push(
        '    @if string.index($size, "[") == 1 and string.index($size, "]") == string.length($size) {'
      );
      output.push("      @return true;");
      output.push("    }");
      output.push("");
      output.push("    // 分数检查");
      output.push('    @if string.index($size, "/") {');
      output.push(
        '      $valid-fractions: ("1/2", "1/3", "2/3", "1/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "5/6", "1/12", "5/12", "7/12", "11/12");'
      );
      output.push("      @return list.index($valid-fractions, $size) != null;");
      output.push("    }");
      output.push("");
      output.push("    // 特殊值检查");
      output.push('    @if $size == "px" {');
      output.push("      @return true;");
      output.push("    }");
      output.push("");
      output.push("    // 断点值检查");
      output.push("    @if _breakpoint-exists($size) {");
      output.push("      @return true;");
      output.push("    }");
      output.push("  }");
      output.push("");
      output.push("  @return false;");
      output.push("}");

      // 存储到全局状态
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      if (!global.designTokensHelpers.scss) {
        global.designTokensHelpers.scss = {};
      }
      global.designTokensHelpers.scss.spacing = output.join("\n");
    },
  };
}
