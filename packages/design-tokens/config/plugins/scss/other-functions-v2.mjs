export default function scssOtherFunctionsV2(userOptions = {}) {
  return {
    name: "scss-other-functions-v2",
    enforce: "post",

    async build({ tokens, getTransforms, outputFile }) {
      const output = [];

      // SCSS 文件头部
      output.push('@use "sass:list";');
      output.push('@use "sass:meta";');
      output.push("");
      output.push(
        "// ============================================================================"
      );
      output.push("// 其他工具函数 - 与 CSS-in-JS API 完全一致");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      // 收集各类 tokens
      const radiusTokens = Object.keys(tokens)
        .filter((key) => key.startsWith("radius."))
        .map((key) => key.replace("radius.", ""));

      const shadowTokens = Object.keys(tokens)
        .filter((key) => key.startsWith("shadows."))
        .map((key) => key.replace("shadows.", ""));

      const zindexTokens = Object.keys(tokens)
        .filter((key) => key.startsWith("zindex."))
        .map((key) => key.replace("zindex.", ""));

      // ============================================================================
      // Radius 函数
      // ============================================================================
      output.push(
        "// ============================================================================"
      );
      output.push("// Radius Helper Functions - 圆角辅助函数");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      output.push("/// 获取圆角值 - 与 CSS-in-JS radius() 完全一致");
      output.push("/// @param {String} $name - 圆角名称");
      output.push("/// @param {String} $mode - 主题模式（保留兼容性）");
      output.push("/// @return {String} CSS 圆角变量");
      output.push("/// @example scss - 使用示例");
      output.push("///   .card {");
      output.push('///     border-radius: radius("md");');
      output.push("///   }");
      output.push('@function radius($name, $mode: ".") {');
      output.push("  @if not _radius-exists($name) {");
      output.push(
        "    @error \"Radius '#{$name}' not found. Available radius values: #{_list-radius()}\";"
      );
      output.push("  }");
      output.push("  @return var(--cdt-radius-#{$name});");
      output.push("}");
      output.push("");

      output.push("/// 批量获取多个圆角值 - 与 CSS-in-JS radiusList() 一致");
      output.push("/// @param {String...} $names - 圆角名称列表");
      output.push("/// @return {List} CSS 圆角变量列表");
      output.push("@function radius-list($names...) {");
      output.push("  $result: ();");
      output.push("  @each $name in $names {");
      output.push("    $result: list.append($result, radius($name));");
      output.push("  }");
      output.push("  @return $result;");
      output.push("}");
      output.push("");

      // ============================================================================
      // Shadow 函数
      // ============================================================================
      output.push(
        "// ============================================================================"
      );
      output.push("// Shadow Helper Functions - 阴影辅助函数");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      output.push("/// 获取阴影样式 - 与 CSS-in-JS shadow() 完全一致");
      output.push("/// @param {String} $name - 阴影名称");
      output.push("/// @param {String} $mode - 主题模式（保留兼容性）");
      output.push("/// @return {String} CSS 阴影变量");
      output.push("/// @example scss - 使用示例");
      output.push("///   .card {");
      output.push('///     box-shadow: shadow("md");');
      output.push("///   }");
      output.push('@function shadow($name, $mode: ".") {');
      output.push("  @if not _shadow-exists($name) {");
      output.push(
        "    @error \"Shadow '#{$name}' not found. Available shadows: #{_list-shadows()}\";"
      );
      output.push("  }");
      output.push("  @return var(--cdt-shadows-#{$name});");
      output.push("}");
      output.push("");

      output.push("/// 批量获取多个阴影样式 - 与 CSS-in-JS shadowList() 一致");
      output.push("/// @param {String...} $names - 阴影名称列表");
      output.push("/// @return {List} CSS 阴影变量列表");
      output.push("@function shadow-list($names...) {");
      output.push("  $result: ();");
      output.push("  @each $name in $names {");
      output.push("    $result: list.append($result, shadow($name));");
      output.push("  }");
      output.push("  @return $result;");
      output.push("}");
      output.push("");

      // ============================================================================
      // Z-Index 函数
      // ============================================================================
      output.push(
        "// ============================================================================"
      );
      output.push("// Z-Index Helper Functions - 层级辅助函数");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      output.push("/// 获取 z-index CSS 变量 - 与 CSS-in-JS zIndex() 完全一致");
      output.push("/// @param {String} $name - z-index 名称");
      output.push("/// @param {String} $mode - 主题模式（保留兼容性）");
      output.push("/// @return {String} CSS z-index 变量");
      output.push("/// @example scss - 使用示例");
      output.push("///   .modal {");
      output.push('///     z-index: z-index("modal");');
      output.push("///   }");
      output.push('@function z-index($name, $mode: ".") {');
      output.push("  @if not _zindex-exists($name) {");
      output.push(
        "    @error \"Z-index '#{$name}' not found. Available z-index values: #{_list-zindex()}\";"
      );
      output.push("  }");
      output.push("  @return var(--cdt-zindex-#{$name});");
      output.push("}");
      output.push("");

      output.push(
        "/// 批量获取多个 z-index CSS 变量 - 与 CSS-in-JS zIndexList() 一致"
      );
      output.push("/// @param {String...} $names - z-index 名称列表");
      output.push("/// @return {List} CSS z-index 变量列表");
      output.push("@function z-index-list($names...) {");
      output.push("  $result: ();");
      output.push("  @each $name in $names {");
      output.push("    $result: list.append($result, z-index($name));");
      output.push("  }");
      output.push("  @return $result;");
      output.push("}");
      output.push("");

      // ============================================================================
      // 辅助函数
      // ============================================================================
      output.push(
        "// ============================================================================"
      );
      output.push("// 辅助函数");
      output.push(
        "// ============================================================================"
      );
      output.push("");

      // Radius 辅助函数
      output.push("/// 检查圆角是否存在");
      output.push("/// @param {String} $name - 圆角名称");
      output.push("/// @return {Boolean} 是否存在");
      output.push("/// @access private");
      output.push("@function _radius-exists($name) {");
      output.push("  $valid-radius: (");
      radiusTokens.forEach((token, index) => {
        const comma = index === radiusTokens.length - 1 ? "" : ",";
        output.push(`    \"${token}\"${comma}`);
      });
      output.push("  );");
      output.push("  @return list.index($valid-radius, $name) != null;");
      output.push("}");
      output.push("");

      output.push("/// 列出所有可用圆角");
      output.push("/// @return {List} 圆角名称列表");
      output.push("/// @access private");
      output.push("@function _list-radius() {");
      output.push("  @return (");
      radiusTokens.forEach((token) => {
        output.push(`    \"${token}\",`);
      });
      output.push("  );");
      output.push("}");
      output.push("");

      // Shadow 辅助函数
      output.push("/// 检查阴影是否存在");
      output.push("/// @param {String} $name - 阴影名称");
      output.push("/// @return {Boolean} 是否存在");
      output.push("/// @access private");
      output.push("@function _shadow-exists($name) {");
      output.push("  $valid-shadows: (");
      shadowTokens.forEach((token, index) => {
        const comma = index === shadowTokens.length - 1 ? "" : ",";
        output.push(`    \"${token}\"${comma}`);
      });
      output.push("  );");
      output.push("  @return list.index($valid-shadows, $name) != null;");
      output.push("}");
      output.push("");

      output.push("/// 列出所有可用阴影");
      output.push("/// @return {List} 阴影名称列表");
      output.push("/// @access private");
      output.push("@function _list-shadows() {");
      output.push("  @return (");
      shadowTokens.slice(0, 8).forEach((token) => {
        output.push(`    \"${token}\",`);
      });
      if (shadowTokens.length > 8) {
        output.push(`    // ... 共 ${shadowTokens.length} 个阴影`);
      }
      output.push("  );");
      output.push("}");
      output.push("");

      // Z-index 辅助函数
      output.push("/// 检查 z-index 是否存在");
      output.push("/// @param {String} $name - z-index 名称");
      output.push("/// @return {Boolean} 是否存在");
      output.push("/// @access private");
      output.push("@function _zindex-exists($name) {");
      output.push("  $valid-zindex: (");
      zindexTokens.forEach((token, index) => {
        const comma = index === zindexTokens.length - 1 ? "" : ",";
        output.push(`    \"${token}\"${comma}`);
      });
      output.push("  );");
      output.push("  @return list.index($valid-zindex, $name) != null;");
      output.push("}");
      output.push("");

      output.push("/// 列出所有可用 z-index");
      output.push("/// @return {List} z-index 名称列表");
      output.push("/// @access private");
      output.push("@function _list-zindex() {");
      output.push("  @return (");
      zindexTokens.forEach((token) => {
        output.push(`    \"${token}\",`);
      });
      output.push("  );");
      output.push("}");

      // 存储到全局状态
      if (!global.designTokensHelpers) {
        global.designTokensHelpers = {};
      }
      if (!global.designTokensHelpers.scss) {
        global.designTokensHelpers.scss = {};
      }
      global.designTokensHelpers.scss.other = output.join("\n");
    },
  };
}
