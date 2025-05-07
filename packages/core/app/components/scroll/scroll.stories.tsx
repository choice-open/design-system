import type { Meta, StoryObj } from "@storybook/react"
import { useMemo } from "react"
import { Scroll } from "./scroll"

const meta: Meta<typeof Scroll> = {
  title: "Scroll",
  component: Scroll,
}

export default meta

type Story = StoryObj<typeof Scroll>

/**
 * `Scroll` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: function BasicStory() {
    const contents = useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => <div key={i}>{i}</div>)
    }, [])

    return (
      <Scroll className="h-64 w-64 overflow-hidden">
        <Scroll.Viewport className="h-full">{contents}</Scroll.Viewport>
      </Scroll>
    )
  },
}
