import type { Meta, StoryObj } from "@storybook/react"
import { Splitter } from "./splitter"
import React from "react"

const meta = {
  title: "Splitter",
  component: Splitter,
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  render: function BasicStory() {
    return (
      <Splitter className="h-screen w-full">
        <Splitter.Pane>
          <div>Pane 1</div>
        </Splitter.Pane>
        <Splitter.Pane>
          <div>Pane 2</div>
        </Splitter.Pane>
      </Splitter>
    )
  },
}
