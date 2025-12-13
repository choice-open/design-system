import { SpinnerSpin, tcx } from "@choice-ui/react"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta<typeof SpinnerSpin> = {
  title: "Status/Spinner/SpinnerSpin",
  component: SpinnerSpin,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof SpinnerSpin>

/** Default spin spinner with medium size. */
export const Basic: Story = {
  render: () => <SpinnerSpin />,
}

/** Available sizes: `small`, `medium`, and `large`. */
export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerSpin size="small" />
      <SpinnerSpin size="medium" />
      <SpinnerSpin size="large" />
    </div>
  ),
}

/** Customize individual shape opacity using `classNames.shape` with nth-of-type selectors. */
export const Opacity: Story = {
  render: () => (
    <SpinnerSpin
      classNames={{
        shape: tcx(
          "[&:nth-of-type(1)]:opacity-100 [&:nth-of-type(2)]:opacity-10 [&:nth-of-type(3)]:opacity-10 [&:nth-of-type(4)]:opacity-100",
        ),
      }}
    />
  ),
}

/** Available variants: `default` and `primary`. */
export const Variant: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SpinnerSpin />
      <SpinnerSpin variant="primary" />
    </div>
  ),
}

/** Apply custom colors to each shape using `classNames.shape`. */
export const CustomColor: Story = {
  render: () => (
    <SpinnerSpin
      classNames={{
        shape: tcx(
          "!opacity-100",
          "[&:nth-of-type(1)]:bg-warning-background",
          "[&:nth-of-type(2)]:bg-success-background",
          "[&:nth-of-type(3)]:bg-accent-background",
          "[&:nth-of-type(4)]:bg-danger-background",
        ),
      }}
    />
  ),
}

/** Display a text label alongside the spinner. */
export const Label: Story = {
  render: () => <SpinnerSpin label="Loading..." />,
}
