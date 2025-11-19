import type { Meta, StoryObj } from "@storybook/react-vite"
import { useDarkMode } from "@vueless/storybook-dark-mode"
import React from "react"
import { MdRenderer } from "./md-renderer"

const meta: Meta<typeof MdRenderer> = {
  title: "Forms/MdInput/MdRenderer",
  component: MdRenderer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

type Story = StoryObj<typeof MdRenderer>

const sampleMarkdown = `# Heading 1

## Heading 2

### Heading 3

This is a paragraph with **bold text**, *italic text*, and ***bold italic text***.

---

## Lists

### Unordered List

- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List

1. First item
2. Second item
3. Third item

### Task List

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

---

## Code

Inline code: \`const x = 10\`

Code block:

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
}
\`\`\`

---

## Blockquote

> This is a blockquote.
> It can span multiple lines.

---

## Links and Images

[Link to example](https://example.com)

---

## Table

| Feature | Status | Notes |
|---------|--------|-------|
| Markdown | ✅ | Fully supported |
| Syntax Highlighting | ✅ | Via Shiki |
| Tables | ✅ | GFM supported |
`

/**
 * Basic: Shows the standalone markdown renderer with default light theme.
 * - Can be used independently without the md-input editor.
 * - Renders GitHub Flavored Markdown.
 */
export const Basic: Story = {
  args: {
    content: sampleMarkdown,
  },
}

/**
 * Light Theme: Explicitly sets light theme.
 * - Use this when you need to force light theme regardless of system settings.
 */
export const LightTheme: Story = {
  args: {
    content: sampleMarkdown,
    theme: "light",
  },
}

/**
 * Dark Theme: Renders markdown with dark theme.
 * - Code highlighting uses dark color scheme.
 * - Text colors adapted for dark backgrounds.
 */
export const DarkTheme: Story = {
  args: {
    content: sampleMarkdown,
    theme: "dark",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}

/**
 * Adaptive Theme: Adapts to Storybook dark mode toggle.
 * - Demonstrates theme switching based on context.
 */
export const AdaptiveTheme: Story = {
  render: function AdaptiveTheme(args) {
    const isDark = useDarkMode()
    return (
      <MdRenderer
        {...args}
        theme={isDark ? "dark" : "light"}
      />
    )
  },
  args: {
    content: sampleMarkdown,
  },
}

/**
 * Simple Content: Minimal markdown example.
 * - Shows basic text formatting.
 * - Useful for simple documentation.
 */
export const SimpleContent: Story = {
  args: {
    content: `# Welcome

This is a **simple** markdown example with *italic* text.

- Point 1
- Point 2
- Point 3`,
  },
}

/**
 * Code Heavy: Content with multiple code blocks.
 * - Demonstrates syntax highlighting for different languages.
 */
export const CodeHeavy: Story = {
  args: {
    content: `## JavaScript

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## TypeScript

\`\`\`typescript
interface Config {
  apiKey: string
  endpoint: string
}
\`\`\`

## JSON

\`\`\`json
{
  "name": "example",
  "version": "1.0.0"
}
\`\`\``,
  },
}

/**
 * Empty Content: Handles empty markdown gracefully.
 * - Shows how the component behaves with no content.
 */
export const EmptyContent: Story = {
  args: {
    content: "",
  },
}

/**
 * Custom Styling: Markdown with custom className.
 * - Demonstrates ability to apply custom styles.
 */
export const CustomStyling: Story = {
  args: {
    content: sampleMarkdown,
    className: "p-4 border border-default-border rounded-lg",
  },
}
