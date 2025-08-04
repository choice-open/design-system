import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { CodeEditor } from "./code-editor"

const meta = {
  title: "Components/CodeEditor",
  component: CodeEditor,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CodeEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultRender() {
    return (
      <CodeEditor
        value=""
        className="h-64 rounded-md border"
      />
    )
  },
}
