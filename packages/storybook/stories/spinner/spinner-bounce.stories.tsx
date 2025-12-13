import { SpinnerBounce } from "@choice-ui/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof SpinnerBounce> = {
  title: "Status/Spinner/SpinnerBounce",
  component: SpinnerBounce,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof SpinnerBounce>

/** Default bounce spinner with medium size. */
export const Basic: Story = {
  render: () => <SpinnerBounce />,
}

/** Available sizes: `small`, `medium`, and `large`. */
export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerBounce size="small" />
      <SpinnerBounce size="medium" />
      <SpinnerBounce size="large" />
    </div>
  ),
}

/** Available variants: `default` and `primary`. */
export const Variant: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerBounce variant="default" />
      <SpinnerBounce variant="primary" />
    </div>
  ),
}

/** Display a text label alongside the spinner. */
export const Label: Story = {
  render: () => <SpinnerBounce label="Loading..." />,
}
