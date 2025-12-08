# Design Tokens 使用指南

## 📦 安装

```bash
npm install @choice-ui/design-tokens-generator
```

## 🚀 使用方式

### 1. CSS 变量

直接导入 CSS 文件到你的项目中：

```css
@import "@choice-ui/design-tokens-generator/css";

/* 或者 */
@import "@choice-ui/design-tokens-generator/tokens.css";
```

然后在 CSS 中使用变量：

```css
.button {
  box-shadow: var(--cdt-shadows-sm);
  border-radius: var(--cdt-radius-md);
  background-color: rgb(var(--cdt-color-background-default));
  padding: var(--cdt-spacing-default);
  color: rgb(var(--cdt-color-foreground-default));
}
```

### 2. SCSS 变量

导入 SCSS 文件：

```scss
@import "@choice-ui/design-tokens-generator/scss";

// 或者
@import "@choice-ui/design-tokens-generator/tokens.scss";
```

使用 SCSS 变量：

```scss
.card {
  border: 1px solid $cdt-color-boundary-default;
  border-radius: $cdt-radius-lg;
  background: $cdt-color-background-default;
  padding: $cdt-spacing-default;
}
```

### 3. JavaScript/TypeScript

导入 JavaScript 令牌：

```javascript
import { tokens, token } from "@choice-ui/design-tokens-generator"

// tokens 对象包含所有令牌
// token() 函数用于获取特定令牌和模式
```

使用示例：

```javascript
// 辅助函数：转换颜色令牌为 CSS 值
const getColorValue = (tokenPath, mode = ".") => {
  const colorToken = token(tokenPath, mode)
  return `rgb(${colorToken.components.map((c) => Math.round(c * 255)).join(", ")})`
}

// 辅助函数：转换尺寸令牌为 CSS 值
const getDimensionValue = (tokenPath, mode = ".") => {
  const dimToken = token(tokenPath, mode)
  return `${dimToken.value}${dimToken.unit}`
}

// React 组件示例
const Button = ({ children, theme = "." }) => (
  <button
    style={{
      backgroundColor: getColorValue("color.background.default", theme),
      color: getColorValue("color.foreground.default", theme),
      borderRadius: getDimensionValue("radius.md", theme),
      padding: getDimensionValue("spacing.default", theme),
      border: `1px solid ${getColorValue("color.boundary.default", theme)}`,
    }}
  >
    {children}
  </button>
)

// 获取特定主题的令牌
const lightBg = getColorValue("color.background.default", "light")
const darkBg = getColorValue("color.background.default", "dark")
```

### 4. CSS-in-JS (styled-components)

```javascript
import styled from "styled-components"
import { token } from "@choice-ui/design-tokens-generator"

// 辅助函数
const getColorValue = (tokenPath, mode = ".") => {
  const colorToken = token(tokenPath, mode)
  return `rgb(${colorToken.components.map((c) => Math.round(c * 255)).join(", ")})`
}

const getDimensionValue = (tokenPath, mode = ".") => {
  const dimToken = token(tokenPath, mode)
  return `${dimToken.value}${dimToken.unit}`
}

const StyledButton = styled.button`
  background-color: ${getColorValue("color.background.default")};
  color: ${getColorValue("color.foreground.default")};
  border-radius: ${getDimensionValue("radius.md")};
  padding: ${getDimensionValue("spacing.default")};
  border: 1px solid ${getColorValue("color.boundary.default")};

  /* 支持主题切换 */
  .dark & {
    background-color: ${getColorValue("color.background.default", "dark")};
    color: ${getColorValue("color.foreground.default", "dark")};
  }
`
```

## 🎨 可用的设计令牌

### 颜色 (Colors)

- **基础颜色**: `--cdt-color-white`, `--cdt-color-black`
- **色相**: `--cdt-color-blue-500`, `--cdt-color-red-600` 等
- **语义颜色**:
  - `--cdt-color-background-default`
  - `--cdt-color-foreground-default`
  - `--cdt-color-boundary-default`
  - `--cdt-color-icon-default`

### 间距 (Spacing)

- `--cdt-spacing-default` (0.25rem)
- `--cdt-spacing-px` (1px)

### 圆角 (Radius)

- `--cdt-radius-sm` (0.125rem)
- `--cdt-radius-md` (0.3125rem)
- `--cdt-radius-lg` (0.8125rem)

### 阴影 (Shadows)

- `--cdt-shadows-xxs` 到 `--cdt-shadows-xl`
- `--cdt-shadows-focus` (焦点阴影)
- `--cdt-shadows-line` (线条阴影)
- `--cdt-shadows-border-default` (边框阴影)

### 字体 (Typography)

- **字体族**: `--cdt-font-families-default`
- **字重**: `--cdt-font-weights-normal`, `--cdt-font-weights-strong`
- **字号**: `--cdt-font-sizes-sm` 到 `--cdt-font-sizes-2xl`
- **行高**: `--cdt-font-lineHeights-tight` 到 `--cdt-font-lineHeights-extra-loose`

### 层级 (Z-index)

- `--cdt-zindex-sticky` (100)
- `--cdt-zindex-modals` (810)
- `--cdt-zindex-menu` (910)
- 等等...

### 断点 (Breakpoints)

- `--cdt-breakpoints-xs` (29.6875rem)
- `--cdt-breakpoints-sm` (40rem)
- `--cdt-breakpoints-md` (48rem)
- 等等...

## 🌗 主题支持

设计令牌支持亮色和暗色主题。使用 CSS 类来切换主题：

```css
/* 亮色主题（默认） */
:root {
  /* 所有令牌的亮色值 */
}

/* 暗色主题 */
.dark,
[data-theme="dark"] {
  /* 重写的暗色值 */
}
```

在 HTML 中应用暗色主题：

```html
<body class="dark">
  <!-- 或者 -->
  <body data-theme="dark"></body>
</body>
```

## 🔧 构建集成

如果你需要重新构建令牌，可以运行：

```bash
npm run build        # 完整构建
npm run build:tokens # 只生成 W3C tokens
npm run terrazzo     # 只运行 Terrazzo 转换
```

## 📋 类型支持

包含完整的 TypeScript 类型定义，提供智能提示和类型安全：

```typescript
import { tokens, token } from "@choice-ui/design-tokens-generator";

// token() 函数提供类型安全的令牌访问
const bgColor = token("color.background.default"); // 自动类型推断
const radius = token("radius.md"); // 自动类型推断

// 辅助函数的类型定义
const getColorValue = (tokenPath: string, mode: string = "."): string => {
  const colorToken = token(tokenPath, mode);
  return `rgb(${colorToken.components.map(c => Math.round(c * 255)).join(", ")})`;
};

const getDimensionValue = (tokenPath: string, mode: string = "."): string => {
  const dimToken = token(tokenPath, mode);
  return `${dimToken.value}${dimToken.unit}`;
};

// React 组件中的使用
interface ButtonProps {
  children: React.ReactNode;
  theme?: "." | "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({ children, theme = "." }) => (
  <button
    style={{
      backgroundColor: getColorValue("color.background.default", theme),
      borderRadius: getDimensionValue("radius.md", theme),
    }}
  >
    {children}
  </button>
);
```

## 颜色系统 API 更新 (v0.1.0+)

### 新的动态颜色系统

新的颜色系统完全基于 Terrazzo 生成的 tokens，不再需要硬编码的别名映射。

#### 基本使用

```typescript
import { color, initColorHelpers } from "@choice-ui/design-tokens/helpers"

// 推荐：在应用启动时预加载 tokens
await initColorHelpers()

// 使用语义化别名
const backgroundColor = color("bg.default") // "rgba(var(--cdt-color-background-default))"
const primaryColor = color("fg.accent") // "rgba(var(--cdt-color-foreground-accent))"

// 使用完整路径
const blueColor = color("blue.500") // "rgba(var(--cdt-color-blue-500))"
const customColor = color("color.background.hover") // "rgba(var(--cdt-color-background-hover))"

// 带透明度
const translucentBg = color("bg.default", 0.8) // "rgba(var(--cdt-color-background-default), 0.8)"
```

#### 异步使用（确保 tokens 已加载）

```typescript
import { colorAsync } from "@choice-ui/design-tokens/helpers"

// 异步版本会确保 tokens 已加载
const backgroundColor = await colorAsync("bg.default")
```

#### 获取原始颜色值

```typescript
import { colorHex, colorRgb, getColorToken } from "@choice-ui/design-tokens/helpers"

// 获取十六进制值
const hexValue = colorHex("bg.default") // "#ffffff"
const darkHexValue = colorHex("bg.default", "dark") // "#2c2c2c"

// 获取 RGB 值
const [r, g, b] = colorRgb("blue.500") // [13, 153, 255]

// 获取完整 token 数据
const tokenData = getColorToken("bg.default")
console.log(tokenData.hex) // "#ffffff"
console.log(tokenData.components) // [1, 1, 1]
```

#### 探索可用的颜色

```typescript
import { listColorTokens, listColorAliases, hasColor } from "@choice-ui/design-tokens/helpers"

// 获取所有颜色 tokens
const allColors = listColorTokens()
console.log(allColors) // ['color.blue.100', 'color.blue.200', ...]

// 获取所有别名
const aliases = listColorAliases()
console.log(aliases) // ['bg.default', 'bg.secondary', 'fg.accent', ...]

// 检查颜色是否存在
if (hasColor("bg.custom")) {
  const customBg = color("bg.custom")
}
```

#### 批量处理颜色

```typescript
import { colorList } from "@choice-ui/design-tokens/helpers"

// 批量获取颜色
const colors = colorList(
  "bg.default",
  "fg.accent",
  ["bg.hover", 0.8], // 带透明度
  "blue.500",
)
// 返回: [
//   "rgba(var(--cdt-color-background-default))",
//   "rgba(var(--cdt-color-foreground-accent))",
//   "rgba(var(--cdt-color-background-hover), 0.8)",
//   "rgba(var(--cdt-color-blue-500))"
// ]
```

#### 在测试中使用

```typescript
import { setTokensData } from "@choice-ui/design-tokens/helpers"

// 在测试中设置模拟数据
const mockTokens = {
  "color.background.default": {
    ".": { hex: "#ffffff", components: [1, 1, 1] },
  },
}

setTokensData(mockTokens)
```

### 迁移指南

如果你之前使用的是硬编码的颜色系统，迁移很简单：

```typescript
// 旧方式 (仍然支持，但不推荐)
const oldColor = color("bg.default")

// 新方式 (推荐 - 完全相同的API，但基于动态tokens)
await initColorHelpers() // 添加这一行初始化
const newColor = color("bg.default") // API完全相同
```

### 性能优化

- tokens 数据会被缓存，避免重复加载
- 别名映射会被缓存，避免重复计算
- 在生产环境中会跳过 token 存在性验证以提高性能

### 错误处理

系统具有良好的容错性：

- 如果无法加载 tokens，会使用空对象并发出警告
- 在开发模式下，使用不存在的 token 会发出警告
- 生产模式下会跳过验证以提高性能
