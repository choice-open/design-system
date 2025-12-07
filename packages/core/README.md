# @choice-ui/react

A desktop-first UI component library built for professional desktop applications.

This library provides a set of high-quality, customizable React components designed specifically for building modern, professional-grade desktop web applications. Unlike general-purpose UI libraries, Choice UI is optimized for desktop experiences with rich interactivity, complex data handling, and enterprise-grade features suitable for applications like Figma, Notion, and other professional desktop tools.

## Features

- 🖥️ Desktop-first: Optimized for desktop applications with rich interactions
- 🖥️ Optimized for professional desktop web apps
- 🧩 Rich set of reusable React components
- 🎨 Built-in theming and dark mode support
- ⚡️ Tailwind CSS for rapid styling
- 🛠️ TypeScript for type safety

## Installation

Add the packages to your project:

```bash
pnpm add @choice-ui/react @choice-ui/design-tokens
# or
npm install @choice-ui/react @choice-ui/design-tokens
```

## Setup

Import the design tokens in your main CSS file:

```css
/* In your main CSS file (e.g., app.css or index.css) */
@import "@choice-ui/design-tokens/tokens.css";
@import "@choice-ui/design-tokens/preflight.css";
@import "@choice-ui/design-tokens/tailwind.css";
```

**Note:** The old `@import "@choice-ui/react/styles/theme.css"` is no longer needed and should be removed.

Learn more about design tokens at [https://choice-ui.com/tokens](https://choice-ui.com/tokens)

## Usage

Import and use components in your React app:

```tsx
import { Button, Input } from "@choice-ui/react"

export default function Example() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Type here..." />
    </div>
  )
}
```

## Development

Run the development server:

```bash
pnpm dev
```

## Build

Build the library for production:

```bash
pnpm build
```

## Contributing

Contributions are welcome! Please open issues or pull requests for new components, bug fixes, or improvements.

---

© Choiceform. All rights reserved.
