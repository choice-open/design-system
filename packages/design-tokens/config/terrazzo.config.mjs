import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";
import sass from "@terrazzo/plugin-sass";
import js from "@terrazzo/plugin-js";
import tailwind from "@terrazzo/plugin-tailwind";
import vanillaExtract from "@terrazzo/plugin-vanilla-extract";
import tailwindV4 from "./plugins/tailwind-v4.mjs";
import tokensBase from "./plugins/tokens-base.mjs";
import colorsHelper from "./plugins/colors-helper.mjs";
import spacingHelper from "./plugins/spacing-helper.mjs";
import typographyHelper from "./plugins/typography-helper.mjs";
import breakpointsHelper from "./plugins/breakpoints-helper.mjs";
import otherHelpers from "./plugins/other-helpers.mjs";
import tokensMerger from "./plugins/tokens-merger.mjs";
import typesGenerator from "./plugins/types-generator.mjs";

// SCSS 函数插件 - v2 版本（与 CSS-in-JS API 完全一致）
import scssColorsFunctionsV2 from "./plugins/scss/colors-functions-v2.mjs";
import scssSpacingFunctionsV2 from "./plugins/scss/spacing-functions-v2.mjs";
import scssOtherFunctionsV2 from "./plugins/scss/other-functions-v2.mjs";
import scssTypographyFunctionsV2 from "./plugins/scss/typography-functions-v2.mjs";
import scssFunctionsMerger from "./plugins/scss/scss-functions-merger.mjs";

// SCSS Mixins 插件 - 包含响应式断点和 typography mixins
import scssResponsiveMixinsV2 from "./plugins/scss/responsive-mixins-v2.mjs";
import scssTypographyMixinsV2 from "./plugins/scss/typography-mixins-v2.mjs";
import scssMixinsMerger from "./plugins/scss/scss-mixins-merger.mjs";

export default defineConfig({
  // 输入：W3C Design Tokens 文件
  tokens: [
    "./output/colors-w3c.json",
    "./output/typography-atomic-w3c.json", // 只包含原子类型，不包含复合类型
    "./output/spacing-w3c.json",
    "./output/radius-w3c.json",
    "./output/zindex-w3c.json",
    "./output/breakpoints-w3c.json",
    "./output/shadows-w3c.json",
  ],

  // 输出配置
  outDir: "./dist",

  plugins: [
    css({
      filename: "tokens.css",
      variableName: (token) => {
        // token是一个对象，需要访问其id属性
        const tokenId = token.id || String(token);

        // 特殊处理：spacing.default 应该生成 --cdt-spacing
        if (tokenId === "spacing.default") {
          return "--cdt-spacing";
        }

        return `--cdt-${tokenId.replace(/\./g, "-")}`;
      },
      // 过滤器：跳过复合类型，只导出原子类型到 CSS 变量
      filter: (token) => {
        // 现在 typography 复合类型已经分离到单独文件，只需要跳过其他复合类型
        const skipTypes = [
          "typography",
          "border",
          "transition",
          "gradient",
          "strokeStyle",
        ];
        return !skipTypes.includes(token.$type);
      },
      baseSelector: ":root",
      modeSelectors: [
        { mode: "dark", selectors: [".dark", '[data-theme="dark"]'] },
      ],
      // 自定义颜色转换为RGB组件格式
      transform(token, mode) {
        // 处理颜色类型，支持 light/dark 模式
        if (token.$type === "color") {
          // 首先检查原始值是否是引用
          const originalValue = token.originalValue?.$value;
          if (
            typeof originalValue === "string" &&
            originalValue.includes("{")
          ) {
            // 这是引用，使用默认转换
            return undefined;
          }

          // 然后尝试从 $extensions.mode 中获取模式特定的值
          const modeValue = token.originalValue?.$extensions?.mode?.[mode];

          // 如果有模式特定的值，检查是否是引用
          if (modeValue) {
            if (typeof modeValue === "string" && modeValue.includes("{")) {
              // 这是引用，使用默认转换
              return undefined;
            }

            // 如果是 RGB 对象，转换为 RGB 组件
            if (modeValue.colorSpace === "srgb" && modeValue.components) {
              const [r, g, b] = modeValue.components;
              const red = Math.round(r * 255);
              const green = Math.round(g * 255);
              const blue = Math.round(b * 255);
              return `${red}, ${green}, ${blue}`;
            }
          }

          // 最后处理默认的 token.$value 格式
          if (token.$value && token.$value.colorSpace === "srgb") {
            const [r, g, b] = token.$value.components;
            const red = Math.round(r * 255);
            const green = Math.round(g * 255);
            const blue = Math.round(b * 255);
            return `${red}, ${green}, ${blue}`;
          }
        }

        // 处理 shadow 类型，保持原有的 rgba 颜色格式，并支持 light/dark 模式
        if (token.$type === "shadow") {
          // 首先尝试从 $extensions.mode 中获取模式特定的值
          const modeValue = token.originalValue?.$extensions?.mode?.[mode];
          const shadowValue = modeValue || token.originalValue?.$value;

          if (shadowValue) {
            // 处理数组（多个阴影）
            if (Array.isArray(shadowValue)) {
              return shadowValue
                .map((shadow) => {
                  const parts = [];
                  if (shadow.inset) parts.push("inset");
                  parts.push(shadow.offsetX || "0");
                  parts.push(shadow.offsetY || "0");
                  parts.push(shadow.blur || "0");
                  if (shadow.spread) parts.push(shadow.spread);
                  parts.push(shadow.color || "transparent");
                  return parts.join(" ");
                })
                .join(", ");
            }
            // 处理单个阴影对象
            else if (typeof shadowValue === "object") {
              const parts = [];
              if (shadowValue.inset) parts.push("inset");
              parts.push(shadowValue.offsetX || "0");
              parts.push(shadowValue.offsetY || "0");
              parts.push(shadowValue.blur || "0");
              if (shadowValue.spread) parts.push(shadowValue.spread);
              parts.push(shadowValue.color || "transparent");
              return parts.join(" ");
            }
          }
        }

        return undefined;
      },
    }),
    sass({
      filename: "tokens.scss",
    }),
    js({
      json: "tokens.json", // 只生成 JSON 文件
      // ts 和 js 文件由我们的自定义插件处理
    }),
    // 分离的自定义插件 - 模块化维护
    tokensBase(), // 基础 tokens 对象和 token() 函数
    colorsHelper(), // 颜色相关 helper 函数
    spacingHelper(), // 间距相关 helper 函数
    typographyHelper(), // typography 相关 helper 函数
    breakpointsHelper(), // breakpoints 和 mediaQuery 相关 helper 函数
    otherHelpers(), // radius, shadows, zindex helper 函数
    tokensMerger(), // 合并所有部分为最终 tokens.js
    typesGenerator(), // TypeScript 类型定义

    // SCSS 函数插件 - v2 版本（与 CSS-in-JS API 完全一致）
    scssColorsFunctionsV2(), // SCSS 颜色函数 - color(), color-var(), has-color()
    scssSpacingFunctionsV2(), // SCSS 间距函数 - spacing(), spacing-list(), spacing-exists()
    scssOtherFunctionsV2(), // SCSS 其他函数 - radius(), shadow(), z-index() 等
    scssTypographyFunctionsV2(), // SCSS typography 函数 - font-family(), font-size(), line-height() 等
    scssFunctionsMerger(), // 合并所有 SCSS 函数

    // SCSS Mixins 插件 - 包含响应式断点和 typography mixins
    scssResponsiveMixinsV2(), // SCSS 响应式 mixins - up(), down(), between(), only() 等
    scssTypographyMixinsV2(), // SCSS typography mixins - typography-styles() 等
    scssMixinsMerger(), // 合并 SCSS mixins
    tailwind({
      filename: "tailwind-theme.js",

      theme: {
        /** @see https://tailwindcss.com/docs/configuration#theme */
        colors: ["color.*"],
        font: {
          sans: "typography.family.base",
        },
        spacing: ["spacing.*"],
        radius: ["borderRadius.*"],
      },
      modeVariants: [
        { variant: "light", mode: "light" },
        { variant: "dark", mode: "dark" }
      ]
    }),
    tailwindV4({ filename: "tailwind.css" }), // Tailwind CSS v4 格式
    // vanillaExtract({
    //   filename: "themes.css.ts",
    //   // Use global CSS vars (recommended). Your Vanilla Extract CSS is still scoped.
    //   globalThemeContract: true,

    //   // Option 1: scoped themes
    //   themes: {
    //     light: { mode: [".", "light"] },
    //     dark: { mode: [".", "dark"] },
    //   },

    //   // Option 2: global themes (in case you have code outside Vanilla Extract)
    //   globalThemes: {
    //     globalLight: {
    //       selector: "[data-color-mode=light]",
    //       mode: [".", "light"],
    //     },
    //     globalDark: { selector: "[data-color-mode=dark]", mode: [".", "dark"] },
    //   },
    // }),
  ],
});
