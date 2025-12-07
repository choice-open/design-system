# Zero Runtime CSS-in-JS 支持

本文档介绍如何在 Zero Runtime CSS-in-JS 库（如 Linaria、vanilla-extract、Compiled 等）中使用我们的设计tokens系统。

## 背景

Zero Runtime CSS-in-JS 库在编译时提取CSS，而不是在运行时生成。这需要：

1. **编译时可访问的tokens数据**
2. **正确的CSS变量格式**：我们的CSS变量输出独立的RGB值（如 `--cdt-color-blue-100: 242, 249, 255`），需要包装在 `rgba()` 中

## 基本使用

### 1. Linaria 示例

```typescript
import { css } from "@linaria/core";
import {
  color,
  colorRaw,
  colorConstants,
} from "@choice-ui/design-tokens/helpers";

// 方式一：直接使用 color() 函数（推荐）
const button = css`
  background-color: ${color(
    "bg.accent"
  )}; // rgba(var(--cdt-color-background-accent))
  color: ${color(
    "fg.on-accent"
  )}; // rgba(var(--cdt-color-foreground-on-accent))
  border: 1px solid ${color("bd.default", 0.3)}; // rgba(var(--cdt-color-boundary-default), 0.3)

  &:hover {
    background-color: ${color("bg.accent-hover")};
  }
`;

// 方式二：使用 colorConstants（编译时优化）
const card = css`
  background: ${colorConstants.get("bg.default")};
  border: 1px solid ${colorConstants.get("bd.default")};
  box-shadow: 0 2px 8px ${colorConstants.get("bg.default", 0.1)};
`;

// 方式三：原始CSS变量（适用于自定义场景）
const customStyle = css`
  /* 直接使用原始RGB值 */
  background: rgba(${colorRaw("blue.500")}, 0.8);

  /* 或者在CSS中手动包装 */
  color: rgba(${colorConstants.raw("fg.default")});
`;
```

### 2. vanilla-extract 示例

```typescript
import { style } from "@vanilla-extract/css";
import { color, staticColors } from "@choice-ui/design-tokens/helpers";

// 使用 color() 函数
export const buttonStyle = style({
  backgroundColor: color("bg.accent"),
  color: color("fg.on-accent"),
  border: `1px solid ${color("bd.default")}`,

  selectors: {
    "&:hover": {
      backgroundColor: color("bg.accent-hover"),
    },
  },
});

// 使用静态颜色映射（编译时优化）
export const cardStyle = style({
  backgroundColor: staticColors["bg.default"],
  borderColor: staticColors["bd.default"],
});

// 带透明度的颜色
export const overlayStyle = style({
  backgroundColor: color("bg.default", 0.8),
  backdropFilter: "blur(4px)",
});
```

### 3. Compiled (Atlassian) 示例

```typescript
import { css } from '@compiled/react';
import { color } from '@choice-ui/design-tokens/helpers';

const MyComponent = () => (
  <div
    css={css`
      background-color: ${color('bg.default')};
      color: ${color('fg.default')};
      border: 1px solid ${color('bd.default')};

      /* 响应式颜色（支持深色模式） */
      @media (prefers-color-scheme: dark) {
        background-color: ${color('bg.default')}; /* 自动适配深色模式 */
      }
    `}
  >
    Content
  </div>
);
```

## 高级用法

### 1. 编译时tokens预加载

```typescript
// build.js 或 webpack.config.js
import { setTokensData } from "@choice-ui/design-tokens/helpers";
import { tokens } from "@choice-ui/design-tokens";

// 在构建开始前预加载tokens
setTokensData(tokens);

// 现在所有的color()函数都可以在编译时访问tokens
```

### 2. 主题切换支持

我们的CSS变量自动支持浅色/深色模式切换：

```typescript
// CSS变量会根据主题自动变化
const themeAwareStyle = css`
  background: ${color("bg.default")}; /* 浅色模式: rgba(255, 255, 255) */
  /* 深色模式: rgba(44, 44, 44) */
  color: ${color("fg.default")}; /* 自动适配对比色 */
`;
```

### 3. 性能优化

```typescript
import {
  color,
  colorRaw,
  colorConstants,
  staticColors,
} from "@choice-ui/design-tokens/helpers";

// 最佳性能：使用静态映射（编译时替换）
const optimized = css`
  background: ${staticColors["bg.default"]};
`;

// 好性能：使用colorConstants（编译时计算）
const good = css`
  background: ${colorConstants.get("bg.default")};
`;

// 一般性能：使用color函数（运行时计算，但仍然是编译时替换）
const normal = css`
  background: ${color("bg.default")};
`;
```

## 构建配置

### Webpack 配置示例

```javascript
// webpack.config.js
const { setTokensData } = require("@choice-ui/design-tokens/helpers");
const { tokens } = require("@choice-ui/design-tokens");

module.exports = {
  // 在构建开始前初始化tokens
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeRun.tap("TokensPreloader", () => {
          setTokensData(tokens);
        });
      },
    },
  ],

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: {
          loader: "@linaria/webpack-loader",
          options: {
            sourceMap: process.env.NODE_ENV !== "production",
          },
        },
      },
    ],
  },
};
```

### Vite 配置示例

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { linaria } from "@linaria/vite";
import { setTokensData } from "@choice-ui/design-tokens/helpers";
import { tokens } from "@choice-ui/design-tokens";

// 预加载tokens
setTokensData(tokens);

export default defineConfig({
  plugins: [
    linaria({
      // Linaria配置
    }),
  ],
});
```

## 最佳实践

### 1. 颜色命名约定

```typescript
// 推荐：使用语义化别名
color("bg.default"); // ✅ 清晰的语义
color("fg.accent"); // ✅ 易于理解
color("bd.strong"); // ✅ 简洁明了

// 避免：直接使用颜色名称
color("blue.500"); // ❌ 不利于主题切换
color("color.gray.100"); // ❌ 冗长且不语义化
```

### 2. 透明度处理

```typescript
// 推荐：使用alpha参数
color("bg.default", 0.8) // ✅ 清晰明确
// 避免：手动拼接
`rgba(${colorRaw("bg.default")}, 0.8)`; // ❌ 繁琐且易错
```

### 3. 构建时优化

```typescript
// 在构建脚本中预加载tokens
import { initColorHelpers } from "@choice-ui/design-tokens/helpers";

// 构建开始前
await initColorHelpers();

// 现在所有的颜色函数都可以立即访问tokens
```

## 常见问题

### Q: 为什么需要包装 `rgba()`？

A: 我们的CSS变量输出独立的RGB值（如 `242, 249, 255`），而不是完整的颜色值。这样设计是为了：

- 支持透明度调节
- 更好的性能
- 更灵活的颜色组合

### Q: 在编译时无法访问tokens怎么办？

A: 确保在构建过程开始前调用 `setTokensData()` 或 `initColorHelpers()`。

### Q: 如何在TypeScript中获得完整的类型支持？

A: 使用 `ColorPath` 类型：

```typescript
import type { ColorPath } from "@choice-ui/design-tokens/helpers";

function getButtonColor(variant: "primary" | "secondary"): ColorPath {
  return variant === "primary" ? "bg.accent" : "bg.secondary";
}
```
