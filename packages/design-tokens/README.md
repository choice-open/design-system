# 🎨 @choice-ui/design-tokens

> A type-safe, W3C-compliant design token system that bridges the gap between design and development.

[![npm version](https://img.shields.io/npm/v/@choice-ui/design-tokens.svg)](https://www.npmjs.com/package/@choice-ui/design-tokens)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_Mode-blue.svg)](https://www.typescriptlang.org/)
[![W3C Standard](https://img.shields.io/badge/W3C-Design_Tokens-green.svg)](https://www.w3.org/community/design-tokens/)

## ✨ Features

- **🔒 Type-Safe**: 100% TypeScript with strict mode and intelligent autocomplete
- **🎯 W3C Compliant**: Fully adheres to the W3C Design Tokens specification
- **🌓 Multi-Theme**: Seamless light/dark mode switching
- **📦 Multiple Formats**: CSS, SCSS, JavaScript, and TypeScript outputs
- **🚀 Smart Aliases**: Intuitive naming like `background.default` and `text.secondary`
- **⚡ Zero Runtime**: Optional compile-time CSS generation

## 📦 Installation

```bash
# npm
npm install @choice-ui/design-tokens

# pnpm (recommended)
pnpm add @choice-ui/design-tokens

# yarn
yarn add @choice-ui/design-tokens
```

## 🚀 Quick Start

### JavaScript/TypeScript

```javascript
import { color, spacing, shadow, typography, radius, breakpoint } from "@choice-ui/design-tokens"

// 🎨 Colors with theme support
const styles = {
  background: color("background.default"), // Auto theme
  color: color("text.secondary", "dark"), // Force dark theme
  border: color("border.strong", 0.5), // With opacity
}

// 📏 Spacing system
const layout = {
  padding: spacing(4), // → "1rem"
  margin: spacing("1/2"), // → "50%"
  gap: spacing("[10vh]"), // → "10vh"
}

// ✨ Other tokens
const components = {
  borderRadius: radius("md"), // → "0.3125rem"
  boxShadow: shadow("lg"), // → theme-aware shadow
  fontFamily: typography("heading.large").fontFamily,
  zIndex: zIndex("modal"), // → 810
}

// 📱 Responsive breakpoints
const mediaQuery = breakpoint.up("md") // → "@media screen and (min-width: 48rem)"
```

### CSS Variables

```css
/* Import CSS variables */
@import "@choice-ui/design-tokens/tokens.css";

.my-component {
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
  background: var(--color-background-default);
  padding: var(--spacing-4);
  color: var(--color-text-secondary);
}
```

### SCSS with Functions

```scss
// Import functions (must be first)
@import "@choice-ui/design-tokens/functions";
// Import mixins (must be second)
@import "@choice-ui/design-tokens/mixins";

.component {
  border-radius: radius("md");
  // 🎯 Individual values with functions
  background: color("background.default");
  padding: spacing(4);

  // 🔥 Multi-property mixins
  @include typography-styles("heading.large");

  // 📱 Responsive design
  @include up("md") {
    padding: spacing(6);
    @include typography-styles("heading.display");
  }
}
```

## 🎯 Core APIs

### Colors

```javascript
// Basic usage
color("background.default") // Auto theme
color("text.accent", "dark") // Force theme
color("border.default", 0.8) // With opacity

// Available aliases
color("background.default") // Background colors
color("text.secondary") // Text colors
color("border.strong") // Border colors
color("icon.primary") // Icon colors
```

### Spacing

```javascript
// Numeric scale (0.25rem increments)
spacing(4) // → "1rem"
spacing(8) // → "2rem"

// Percentage values
spacing("1/2") // → "50%"
spacing("1/3") // → "33.333333%"

// Custom values
spacing("[10vh]") // → "10vh"
spacing("[calc(100% - 2rem)]") // → "calc(100% - 2rem)"

// Multiple values
spacingList([2, 4]) // → "0.5rem 1rem"
```

### Typography

```javascript
// Complete typography objects
const heading = typography("heading.large")
// Returns: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }

// CSS string for styled-components
const cssString = typographyStyles("body.medium")

// Individual properties
fontFamily("default") // → "Inter, system-ui, sans-serif"
fontSize("lg") // → "1.125rem"
fontWeight("semibold") // → 600
```

### Responsive Breakpoints

```javascript
// Media queries
breakpoint.up("md") // → "@media screen and (min-width: 48rem)"
breakpoint.down("lg") // → "@media screen and (max-width: 63.98rem)"
breakpoint.between("sm", "xl") // → Between sm and xl
breakpoint.only("md") // → Only md breakpoint

// Device aliases
breakpoint.mobile() // → Tablet and up
breakpoint.tablet() // → Tablet only
breakpoint.desktop() // → Desktop and up
```

## 🌟 Advanced Usage

### Theme Switching

```javascript
// Auto theme (follows system preference)
const autoStyles = {
  background: color("background.default"),
  color: color("text.default"),
}

// Manual theme control
const lightStyles = {
  background: color("background.default", "light"),
  color: color("text.default", "light"),
}

const darkStyles = {
  background: color("background.default", "dark"),
  color: color("text.default", "dark"),
}
```

### SCSS Best Practices

```scss
// ✅ Correct import order
@import "@choice-ui/design-tokens/functions"; // First
@import "@choice-ui/design-tokens/mixins"; // Second

// ✅ Use functions for individual properties
.card {
  border: 1px solid color("border.default");
  background: color("background.default");
  padding: spacing(4);
}

// ✅ Use mixins for complex operations
.heading {
  @include typography-styles("heading.large"); // 5 properties at once
  @include text-ellipsis(); // Utility mixin
}

// ✅ Responsive patterns
.responsive-component {
  @include typography-styles("body.medium");

  @include up("md") {
    @include typography-styles("body.large");
  }
}
```

### Performance Optimization

```javascript
// ✅ Tree shaking - import only what you need
import { color } from "@choice-ui/design-tokens"

// ✅ Bulk operations
const margins = spacingList([2, 4, 6, 8])
const shadows = shadowList(["sm", "md"])

// ✅ Static values are optimized at build time
const styles = {
  padding: spacing(4), // Static → "1rem"
  margin: spacing(props.size), // Dynamic → runtime
}
```

## 📊 Token Overview

| Type            | Count    | Examples                                       |
| --------------- | -------- | ---------------------------------------------- |
| **Colors**      | 243      | `background.*`, `text.*`, `border.*`, `icon.*` |
| **Typography**  | 39       | `heading.large`, `body.medium`, `code.small`   |
| **Spacing**     | Flexible | `spacing(4)`, `spacing("1/2")`, custom values  |
| **Shadows**     | 22       | `sm`, `md`, `lg`, `xl` (with theme variants)   |
| **Breakpoints** | 6        | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`            |
| **Radius**      | 3        | `sm`, `md`, `lg`                               |
| **Z-Index**     | 9        | `sticky`, `modal`, `tooltip`, etc.             |

## 🎨 Available Exports

```javascript
// CSS files
import "@choice-ui/design-tokens/tokens.css";     // CSS custom properties
import "@choice-ui/design-tokens/preflight.css";  // Reset styles

// SCSS files
@import "@choice-ui/design-tokens/functions";     // SCSS functions
@import "@choice-ui/design-tokens/mixins";        // SCSS mixins
@import "@choice-ui/design-tokens/tokens";        // SCSS variables

// JavaScript/TypeScript
import {
  color, spacing, shadow, typography, radius, zIndex,
  spacingList, shadowList, typographyStyles,
  breakpoint, fontFamily, fontSize, fontWeight
} from "@choice-ui/design-tokens";
```

## 🤝 Support

- **Documentation**: [Full Documentation](https://choice-ui.com/tokens)
- **Examples**: [Live Examples](https://choice-ui.com/tokens)
- **Issues**: [GitHub Issues](https://github.com/choiceform/choice-ui/issues)

## 📄 License

MIT License - see the [LICENSE](https://github.com/choiceform/choice-ui/blob/main/LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by the Choiceform Design System Team**

[Examples](https://choice-ui.com/tokens) · [Documentation](https://choice-ui.com/tokens) · [npm](https://www.npmjs.com/package/@choice-ui/design-tokens)

</div>
