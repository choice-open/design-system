import { SearchSmall } from "@choiceform/icons-react"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import { Fragment, useState } from "react"
import { Select } from "../select"
import { Button } from "./button"
import React from "react"

const meta: Meta<typeof Button> = {
  title: "Buttons/Button",
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

/**
 * `Button` is a versatile button component with loading state and accessibility support.
 *
 * - Multiple visual variants
 * - Loading state with spinner
 * - Active/Selected states
 * - Accessibility support
 */
export const Basic: Story = {
  render: () => <Button>Button</Button>,
}

/**
 * Available in different sizes:
 * - `default` height: 1.5rem / 24px (default)
 * - `large` height: 2rem / 32px
 */
export const Sizes: Story = {
  render: () => (
    <>
      <Button>Default</Button>
      <Button size="large">Large</Button>
    </>
  ),
}

/**
 * The button component comes with different variants:
 * - `primary`: Default button style
 * - `secondary`: Secondary button style
 * - `destructive`: Destructive button style
 * - `secondary-destruct`: Secondary destructive button style
 * - `inverse`: Inverse button style
 * - `success`: Success button style
 * - `link`: Link button style
 * - `link-danger`: Link danger button style
 * - `ghost`: Ghost button style
 */
export const Variants: Story = {
  render: function Variants() {
    enum Variant {
      Primary = "primary",
      Secondary = "secondary",
      Solid = "solid",
      Destructive = "destructive",
      SecondaryDestruct = "secondary-destruct",
      Inverse = "inverse",
      Success = "success",
      Link = "link",
      LinkDanger = "link-danger",
      Ghost = "ghost",
    }

    enum Size {
      Default = "default",
      Large = "large",
    }

    enum State {
      Rest = "rest",
      Active = "active",
      Focused = "focused",
      Loading = "loading",
      Disabled = "disabled",
    }

    const [variant, setVariant] = useState<Variant>(Variant.Primary)
    const [size, setSize] = useState<Size>(Size.Default)

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <Select
            value={variant}
            onChange={(value) => setVariant(value as Variant)}
          >
            <Select.Trigger>{variant}</Select.Trigger>
            {Object.values(Variant).map((variant) => (
              <Select.Item
                key={variant}
                value={variant}
              >
                {variant}
              </Select.Item>
            ))}
          </Select>
          <Select
            value={size}
            onChange={(value) => setSize(value as Size)}
          >
            <Select.Trigger>{size}</Select.Trigger>
            {Object.values(Size).map((size) => (
              <Select.Item
                key={size}
                value={size}
              >
                {size}
              </Select.Item>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-4">
          {Object.values(State).map((state) => (
            <Fragment key={state}>
              <span className="text-fuchsia-500 capitalize">{state}</span>
              <Button
                variant={variant}
                size={size}
                active={state === State.Active}
                disabled={state === State.Disabled}
                loading={state === State.Loading}
                focused={state === State.Focused}
              >
                Button
              </Button>
              <Button
                variant={variant}
                size={size}
                active={state === State.Active}
                disabled={state === State.Disabled}
                loading={state === State.Loading}
                focused={state === State.Focused}
              >
                <SearchSmall />
                Button
              </Button>
            </Fragment>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * The button can be rendered as other elements using the `asChild` prop.
 * - `asChild`: Render the button as other elements
 */
export const AsChild: Story = {
  render: () => (
    <>
      <Button asChild>
        <a href="#">Link</a>
      </Button>
    </>
  ),
}

/**
 * The button component can be used as a tooltip.
 * - `tooltip`: content of the tooltip
 */
export const Tooltip: Story = {
  render: () => <Button tooltip={{ content: "Tooltip" }}>Button</Button>,
}
