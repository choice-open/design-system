import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { MdInput } from "./md-input"
import { useDarkMode } from "@vueless/storybook-dark-mode"

const meta: Meta<typeof MdInput> = {
  title: "Forms/MdInput",
  component: MdInput,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof MdInput>

/**
 * Basic: Shows the default markdown input usage.
 * - Demonstrates a simple markdown editor with toolbar and preview.
 * - Use for basic markdown editing needs.
 */
export const Basic: Story = {
  render: function Basic() {
    const [value, setValue] = useState(
      "### Heading\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2",
    )
    return (
      <MdInput
        value={value}
        onChange={setValue}
        placeholder="Enter markdown..."
      />
    )
  },
}

/**
 * Without Preview: Shows markdown input without preview tab.
 * - Only shows the write mode with toolbar.
 * - Useful when preview is not needed.
 */
export const WithoutPreview: Story = {
  render: function WithoutPreview() {
    const [value, setValue] = useState("### Heading\n\n**Bold text**")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        showPreview={false}
      />
    )
  },
}

/**
 * Without Toolbar: Shows markdown input without toolbar.
 * - Only shows the textarea and preview tabs.
 * - Useful when users prefer keyboard shortcuts.
 */
export const WithoutToolbar: Story = {
  render: function WithoutToolbar() {
    const [value, setValue] = useState("### Heading\n\n**Bold text**")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        showToolbar={false}
      />
    )
  },
}

/**
 * Read Only: Shows markdown input in read-only mode.
 * - Displays content but prevents editing.
 * - Useful for displaying formatted content.
 */
export const ReadOnly: Story = {
  render: function ReadOnly() {
    const value = "### Heading\n\n**Bold text** and *italic text*\n\n- List item 1\n- List item 2"
    return (
      <MdInput
        value={value}
        readOnly
      />
    )
  },
}

/**
 * Disabled: Shows markdown input in disabled state.
 * - Prevents all interactions.
 * - Useful for disabled form states.
 */
export const Disabled: Story = {
  render: function Disabled() {
    const value = "### Heading\n\n**Bold text**"
    return (
      <MdInput
        value={value}
        disabled
      />
    )
  },
}

/**
 * Custom Height: Shows markdown input with custom minimum height.
 * - Allows customizing the editor height.
 * - Useful for different layout requirements.
 */
export const CustomHeight: Story = {
  render: function CustomHeight() {
    const [value, setValue] = useState("### Heading\n\n**Bold text**")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        maxRows={10}
      />
    )
  },
}

/**
 * Empty: Shows markdown input with empty initial value.
 * - Demonstrates the placeholder functionality.
 * - Useful for new content creation.
 */
export const Empty: Story = {
  render: function Empty() {
    const [value, setValue] = useState("")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        placeholder="Start writing markdown..."
      />
    )
  },
}

/**
 * Custom Toolbar Actions: Shows markdown input with only specific toolbar actions.
 * - Demonstrates filtering toolbar actions using toolbarActions prop.
 * - Only shows bold, italic, and code actions.
 * - Useful when you want to limit available formatting options.
 */
export const CustomToolbarActions: Story = {
  render: function CustomToolbarActions() {
    const [value, setValue] = useState("### Heading\n\n**Bold text** and *italic text*\n\n`code`")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        toolbarActions={["bold", "italic", "code"]}
      />
    )
  },
}

/**
 * Text Formatting Only: Shows markdown input with only text formatting actions.
 * - Demonstrates toolbar with heading, bold, italic, quote, and code actions.
 * - Hides list-related actions.
 * - Useful for simple text formatting needs.
 */
export const TextFormattingOnly: Story = {
  render: function TextFormattingOnly() {
    const [value, setValue] = useState(
      "### Heading\n\n**Bold text** and *italic text*\n\n> Quote\n\n`code`",
    )
    return (
      <MdInput
        value={value}
        onChange={setValue}
        toolbarActions={["heading", "bold", "italic", "quote", "code"]}
      />
    )
  },
}

/**
 * Lists Only: Shows markdown input with only list-related actions.
 * - Demonstrates toolbar with only list actions.
 * - Hides text formatting actions.
 * - Useful for structured content creation.
 */
export const ListsOnly: Story = {
  render: function ListsOnly() {
    const [value, setValue] = useState(
      "- Unordered item 1\n- Unordered item 2\n\n1. Ordered item 1\n2. Ordered item 2\n\n- [ ] Task 1\n- [x] Task 2",
    )
    return (
      <MdInput
        value={value}
        onChange={setValue}
        toolbarActions={["unordered-list", "ordered-list", "task-list"]}
      />
    )
  },
}

/**
 * Minimal Toolbar: Shows markdown input with minimal toolbar actions.
 * - Demonstrates toolbar with only bold and italic actions.
 * - Useful for simple use cases with minimal formatting options.
 */
export const MinimalToolbar: Story = {
  render: function MinimalToolbar() {
    const [value, setValue] = useState("**Bold text** and *italic text*")
    return (
      <MdInput
        value={value}
        onChange={setValue}
        toolbarActions={["bold", "italic"]}
      />
    )
  },
}

/**
 * GitHub Flavored Markdown: Comprehensive test of all GitHub-supported Markdown formats.
 * - Headings (H1-H6)
 * - Text formatting (bold, italic, strikethrough, inline code)
 * - Lists (ordered, unordered, task lists)
 * - Code blocks with syntax highlighting
 * - Tables
 * - Blockquotes
 * - Links and images
 * - Horizontal rules
 * - Auto-links
 * - Mentions and issue references
 * - And more GitHub-specific features
 */
export const GitHubFlavoredMarkdown: Story = {
  render: function GitHubFlavoredMarkdown() {
    const [value, setValue] = useState(`# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Text Formatting

**Bold text** and *italic text* and ***bold italic text***

~~Strikethrough text~~

\`Inline code\` and \`\`\`code block\`\`\`

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
   1. Nested ordered 3.1
   2. Nested ordered 3.2

### Task List

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Another incomplete task

---

## Code Blocks

### JavaScript

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

### JSON

\`\`\`json
{
  "name": "package.json",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}
\`\`\`

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Tables | ✅ | Fully supported |
| Alignment | ✅ | Left, center, right |
| Styling | ✅ | Customizable |

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left | Center | Right |
| Text | Text | Text |

---

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

> Nested blockquotes
> > Are also supported
> > > With multiple levels

---

## Links and Images

[Link text](https://example.com)

[Link with title](https://example.com "Link title")

<https://example.com>

<user@example.com>

![Image alt text](https://via.placeholder.com/150 "Image title")

---

## Mentions and References

@username

#123

#issue-123

---

## Horizontal Rules

---

***

___

---

## Mixed Content

Here's a paragraph with **bold**, *italic*, \`code\`, and a [link](https://example.com).

1. First item with **bold text**
2. Second item with *italic text*
3. Third item with \`inline code\`

> Blockquote with **bold** and *italic* text
> 
> And a list:
> - Item 1
> - Item 2

---

## Special Characters

Escaped characters: \\* \\_ \\\` \\# \\[ \\]

Math expressions: $E = mc^2$ and $\\sum_{i=1}^{n} x_i$

---

## Complex Example

### Project README

This is a **sample project** demonstrating various Markdown features.

#### Features

- [x] Feature 1
- [x] Feature 2
- [ ] Feature 3 (in progress)

#### Installation

\`\`\`bash
npm install
npm run dev
\`\`\`

#### Usage

\`\`\`typescript
import { Component } from './component';

const app = new Component();
app.init();
\`\`\`

#### Contributing

> Please read our [contributing guidelines](CONTRIBUTING.md) before submitting a PR.

#### License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Note**: This example demonstrates all GitHub Flavored Markdown features supported by the component.`)

    const isDarkMode = useDarkMode()
    return (
      <div style={{ height: "800px" }}>
        <MdInput
          theme={isDarkMode ? "dark" : "light"}
          value={value}
          onChange={setValue}
          showToolbar={true}
          showPreview={true}
        />
      </div>
    )
  },
}
