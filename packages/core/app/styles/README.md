# Tailwind CSS Theme System

The core theming system for the ChoiceForm Design System, implementing a sophisticated Figma-inspired color system with automatic dark mode support and comprehensive design tokens.

## Import

```css
@import "~/styles/theme.css";
```

## Architecture Overview

The theme system is built on **Tailwind CSS 4.0** with a three-layer architecture:

### 1. Base Layer (`@layer base`)

- Global CSS resets and defaults
- Custom border defaults for all elements
- Body typography and font settings
- SVG flex-none utility

### 2. Custom Variants

- `dark`: Automatic dark mode variant `(&:where(.dark, .dark *))`
- `children`: Child selector variant `(& > *)`

### 3. Theme Layer (`@theme`)

- Design tokens and custom properties
- Color system with semantic naming
- Typography scale and font stacks
- Spacing, shadows, and z-index scales

## Color System

### Figma-Inspired Semantic Colors

The system implements a sophisticated semantic color architecture that automatically adapts between light and dark themes:

#### Base Colors (Theme-Aware)

```css
/* Auto-adapting colors that change between light/dark modes */
--blue-100 through --blue-950
--violet-100 through --violet-950
--purple-100 through --purple-950
--pink-100 through --pink-950
--teal-100 through --teal-950
--red-100 through --red-950
--orange-100 through --orange-950
--yellow-100 through --yellow-950
--green-100 through --green-950
```

#### Static Grays

```css
/* Consistent across themes */
--color-gray-50 through --color-gray-950
--color-white: rgba(255, 255, 255, 1)
--color-black: rgba(0, 0, 0, 1)
```

#### Semantic Foreground Colors

```css
--foreground-default         /* Primary text color */
--foreground-secondary       /* Secondary text (50% opacity in light, 70% in dark) */
--foreground-tertiary        /* Tertiary text (30% opacity in light, 40% in dark) */
--foreground-accent          /* Accent/brand color */
--foreground-success         /* Success states */
--foreground-warning         /* Warning states */
--foreground-danger          /* Error/danger states */
--foreground-assistive       /* AI/assistant features */
--foreground-component       /* Component-specific highlights */
--foreground-inverse         /* Inverse text color */
```

#### Semantic Background Colors

```css
--background-default              /* Primary background */
--background-secondary            /* Secondary surfaces */
--background-secondary-hover      /* Secondary surface hover state */
--background-secondary-secondary  /* Nested secondary surfaces */
--background-tertiary            /* Tertiary surfaces */
--background-selected            /* Selected item background */
--background-disabled            /* Disabled state background */
--background-inverse             /* Inverse/contrast background */
```

#### Boundary/Border Colors

```css
--boundary-default           /* Default border color */
--boundary-strong            /* Strong borders */
--boundary-selected-strong   /* Selected item strong border */
```

### Color Usage in Tailwind

All semantic colors are automatically available as Tailwind utilities:

```html
<!-- Foreground colors -->
<div class="text-default-foreground">Default text</div>
<div class="text-secondary-foreground">Secondary text</div>
<div class="text-accent-foreground">Accent text</div>

<!-- Background colors -->
<div class="bg-default-background">Default background</div>
<div class="bg-secondary-background">Secondary background</div>
<div class="bg-accent-background">Accent background</div>

<!-- Interactive states -->
<button class="bg-accent-background hover:bg-accent-hover-background">
  Button with hover state
</button>

<!-- Border colors -->
<div class="border-default-boundary border">Default border</div>
<div class="border-strong-boundary border-2">Strong border</div>
```

## Shadow System

### Pre-defined Shadow Scales

```css
--shadow-xxs    /* Extra extra small shadows */
--shadow-xs     /* Extra small shadows */
--shadow-sm     /* Small shadows */
--shadow-md     /* Medium shadows */
--shadow-lg     /* Large shadows */
--shadow-xl     /* Extra large shadows */
```

### Special Purpose Shadows

```css
--shadow-focus         /* Focus rings */
--shadow-line          /* Subtle line separators */
--shadow-border        /* Border-like shadows */
--shadow-inset-border  /* Inset border effects */
```

### Usage

```html
<!-- Standard shadow scale -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>

<!-- Special shadows -->
<input class="focus:shadow-focus" />
<div class="shadow-line">Separator line</div>
```

## Typography System

### Font Scale

```css
--text-sm: 0.5625rem /* 9px */ --text-md: 0.6875rem /* 11px */ --text-lg: 0.8125rem /* 13px */
  --text-xl: 1rem /* 16px */;
```

### Font Families

```css
--font-en-us:
  "Inter", "Myriad Set Pro", "Helvetica Neue", "Helvetica", "Arial",
  sans-serif --font-zh-cn: "PingFang SC", "Helvetica Neue", "Helvetica", "STHeitiSC-Light", "Arial",
  sans-serif --font-zh-tw: "MHei", "Helvetica Neue", "Helvetica", "Arial",
  "Verdana" --font-ja-jp: "Apple TP", "Helvetica Neue", "Helvetica", "Hiragino Kaku Gothic Pro",
  ... --font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
  monospace
    --font-emoji:
    "EmojiMart,Segoe UI Emoji,Segoe UI Symbol,Segoe UI,Apple Color Emoji,Twemoji Mozilla,...";
```

### Font Weights & Spacing

```css
--font-weight-base: 400 --font-weight-medium: 550 --leading-sm: 0.875rem /* Line height small */
  --leading-md: 1rem /* Line height medium */ --leading-lg: 1.375rem /* Line height large */
  --tracking-sm: 0.00281rem /* Letter spacing small */ --tracking-md: 0.00344rem
  /* Letter spacing medium */ --tracking-lg: -0.002rem /* Letter spacing large */;
```

## Border Radius System

```css
--radius-sm: 0.125rem /* 2px */ --radius-md: 0.3125rem /* 5px */ --radius-lg: 0.4375rem /* 7px */
  --radius-xl: 0.8125rem /* 13px */;
```

## Z-Index Scale

```css
--z-index-sticky: 100 /* Sticky positioned elements */ --z-index-fixed: 700
  /* Fixed positioned elements */ --z-index-backdrop: 800 /* Modal backdrops */
  --z-index-modals: 810 /* Modal dialogs */ --z-index-popover: 820 /* Popovers and dropdowns */
  --z-index-alert: 830 /* Alert dialogs */ --z-index-menu: 910 /* Context menus */
  --z-index-tooltip: 1000 /* Tooltips */ --z-index-notification: 1100 /* Toast notifications */
  --z-index-scroll: 1200 /* Scroll areas */;
```

## Code Editor Theming

### Syntax Highlighting Colors

```css
--code-syntax-keyword: var(--color-violet-600) /* Keywords (if, function, const) */
  --code-syntax-string: var(--color-green-600) /* String literals */
  --code-syntax-number: var(--color-orange-600) /* Numbers */
  --code-syntax-boolean: var(--color-orange-600) /* true/false */
  --code-syntax-function: var(--color-blue-600) /* Function names */
  --code-syntax-variable: var(--color-default-foreground) /* Variables */
  --code-syntax-property: var(--color-blue-600) /* Object properties */
  --code-syntax-operator: var(--color-default-foreground) /* Operators (+, -, etc) */
  --code-syntax-comment: var(--color-secondary-foreground) /* Comments */;
```

### Indentation Markers

```css
--color-code-indentation-marker: var(--color-gray-300) /* Inactive guides */
  --color-code-indentation-marker-active: var(--color-blue-500) /* Active guides */;
```

## Dark Mode Implementation

### Automatic Theme Switching

The system supports both class-based and data-attribute dark mode:

```html
<!-- Class-based -->
<html class="dark">
  <!-- All elements automatically use dark theme -->
</html>

<!-- Data attribute -->
<html data-theme="dark">
  <!-- Alternative dark theme activation -->
</html>
```

### Custom Variant Usage

```css
/* Custom dark mode styles */
.my-component {
  color: var(--foreground-default);

  &:where(.dark, .dark *) {
    /* Dark mode specific overrides */
    border-color: rgba(255, 255, 255, 0.1);
  }
}
```

## Professional Design System Features

### Figma-Inspired Color Science

The color system replicates Figma's sophisticated approach:

1. **Perceptual Color Scaling**: Each color step maintains visual consistency
2. **Accessibility Compliance**: Contrast ratios meet WCAG guidelines
3. **Cross-Platform Consistency**: Colors work across web, mobile, and desktop
4. **Designer-Developer Bridge**: Direct mapping from Figma design tokens

### Enterprise-Grade Architecture

- **Design Token System**: Centralized, maintainable color definitions
- **Semantic Naming**: Intent-based rather than implementation-based names
- **Theme Inheritance**: Automatic light/dark mode without code changes
- **Component Consistency**: All components share the same color language

## Usage Examples

### Basic Component Styling

```tsx
// Using semantic colors in components
const Button = ({ variant = "primary", children }) => {
  const variants = tcv({
    base: "rounded-md px-4 py-2 font-strong transition-colors",
    variants: {
      variant: {
        primary: "bg-accent-background hover:bg-accent-hover-background text-white",
        secondary: "bg-secondary-background text-default-foreground hover:bg-tertiary-background",
        danger: "bg-danger-background hover:bg-danger-hover-background text-white",
      },
    },
  })

  return <button className={variants({ variant })}>{children}</button>
}
```

### Advanced Theme Customization

```css
/* Custom component with theme integration */
.calendar-widget {
  box-shadow: var(--shadow-md);
  border: 1px solid var(--boundary-default);
  border-radius: var(--radius-lg);
  background: var(--background-secondary);

  .calendar-header {
    border-bottom: 1px solid var(--boundary-default);
    color: var(--foreground-secondary);
  }

  .calendar-today {
    background: var(--background-selected);
    color: var(--foreground-accent);
    font-weight: var(--font-weight-medium);
  }
}
```

### Theme-Aware Animations

```css
/* Smooth transitions that respect theme changes */
.theme-transition {
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
    box-shadow 200ms ease;
}
```

## Best Practices

### 1. Use Semantic Colors

```css
/* ✅ Good - Semantic meaning */
color: var(--foreground-danger);
background: var(--background-selected);

/* ❌ Avoid - Hard-coded colors */
color: #ef4444;
background: #dbeafe;
```

### 2. Leverage Custom Properties

```css
/* ✅ Good - Uses design tokens */
border-radius: var(--radius-md);
font-family: var(--font-en-us);

/* ❌ Avoid - Magic numbers */
border-radius: 5px;
font-family: "Inter", sans-serif;
```

### 3. Respect the Shadow Scale

```css
/* ✅ Good - Uses predefined shadows */
box-shadow: var(--shadow-lg);

/* ❌ Avoid - Custom shadow values */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
```

### 4. Theme-Agnostic Implementation

```css
/* ✅ Good - Works in both themes */
.my-component {
  background: var(--background-secondary);
  color: var(--foreground-default);
}

/* ❌ Avoid - Theme-specific hardcoding */
.my-component {
  background: white;
  color: black;
}

.dark .my-component {
  background: #1f1f1f;
  color: white;
}
```

## Migration Guide

### From Standard Tailwind

```css
/* Before: Standard Tailwind */
.component {
  @apply border-gray-200 bg-white text-gray-900;
}

/* After: ChoiceForm Design System */
.component {
  @apply bg-default-background text-default-foreground border-default-boundary;
}
```

### From Custom CSS Variables

```css
/* Before: Custom variables */
:root {
  --primary-color: #3b82f6;
  --background: #ffffff;
  --text: #1f2937;
}

/* After: Design system variables */
/* Variables are automatically provided by theme.css */
.component {
  border-color: var(--foreground-accent);
  background: var(--background-default);
  color: var(--foreground-default);
}
```

## Advanced Customization

### Adding Custom Colors

```css
/* Extend the theme with custom colors */
@theme {
  --color-brand-100: rgba(240, 249, 255, 1);
  --color-brand-500: rgba(59, 130, 246, 1);
  --color-brand-900: rgba(30, 58, 138, 1);
}

/* Use in components */
.custom-component {
  background: var(--color-brand-100);
  color: var(--color-brand-900);
}
```

### Custom Shadow Definitions

```css
@theme {
  --shadow-custom: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Theme-Specific Overrides

```css
/* Light theme specific */
.light {
  --custom-overlay: rgba(0, 0, 0, 0.5);
}

/* Dark theme specific */
.dark {
  --custom-overlay: rgba(0, 0, 0, 0.8);
}
```

## Performance Considerations

- **CSS Custom Properties**: Efficient runtime theme switching
- **Minimal Specificity**: Low-specificity selectors for easy overrides
- **Tree-Shakable**: Unused color variables are eliminated in production
- **Cache-Friendly**: Static theme definitions enable efficient caching

## Browser Support

- **Modern Browsers**: Full support for CSS custom properties and advanced selectors
- **Progressive Enhancement**: Graceful fallbacks for older browsers
- **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility

## Related Files

- [`preflight.css`](./preflight.css): CSS reset and normalization
- [`components.css`](./components.css): Component-specific styles
- [`stories.css`](./stories.css): Storybook-specific styling

## Architecture Benefits

1. **Maintainability**: Centralized theme definitions
2. **Consistency**: Unified color language across all components
3. **Accessibility**: Built-in contrast and readability standards
4. **Flexibility**: Easy theme customization and extension
5. **Performance**: Efficient CSS custom property usage
6. **Developer Experience**: IntelliSense-friendly token names
7. **Design-Development Alignment**: Direct Figma token mapping
