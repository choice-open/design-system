import type { Meta, StoryObj } from "@storybook/react"
import { IconButton } from "./icon-button"
import { IconButtonGroup } from "./icon-button-group"
import { Fragment, useState } from "react"
import { Select } from "../select"
import {
  FieldTypeAttachment,
  FieldTypeButton,
  FieldTypeCheckbox,
  FieldTypeCount,
  FieldTypeDate,
  FieldTypeRating,
} from "@choiceform/icons-react"

const meta: Meta<typeof IconButton> = {
  title: "IconButton",
  component: IconButton,
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Basic: Story = {
  render: function BasicStory() {
    return (
      <IconButton>
        <FieldTypeButton />
      </IconButton>
    )
  },
}

/**
 * The `variant` prop is used to set the variant of the icon button.
 * - `default`: default variant
 * - `secondary`: secondary variant
 * - `solid`: solid variant
 * - `transparent`: transparent variant
 */
export const Variants: Story = {
  render: function Variants() {
    enum Variant {
      Default = "default",
      Secondary = "secondary",
      Solid = "solid",
      Highlight = "highlight",
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

    const [variant, setVariant] = useState<Variant>(Variant.Default)
    const [size, setSize] = useState<Size>(Size.Default)

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="flex gap-4">
          <Select
            options={Object.values(Variant).map((variant) => ({
              label: variant,
              value: variant,
            }))}
            value={variant}
            onChange={(value) => setVariant(value as Variant)}
          />
          <Select
            options={Object.values(Size).map((size) => ({
              label: size,
              value: size,
            }))}
            value={size}
            onChange={(value) => setSize(value as Size)}
          />
        </div>

        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          {Object.values(State).map((state) => (
            <Fragment key={state}>
              <span className="text-fuchsia-500 capitalize">{state}</span>
              <IconButton
                variant={variant}
                size={size}
                active={state === State.Active}
                disabled={state === State.Disabled}
                loading={state === State.Loading}
                focused={state === State.Focused}
              >
                <FieldTypeRating />
              </IconButton>
            </Fragment>
          ))}
        </div>
      </div>
    )
  },
}

/**
 * The `tooltip` prop is used to show a tooltip when hovering over the icon button.
 * - `content`: the content of the tooltip
 * - `placement`: the placement of the tooltip
 * - `open`: whether the tooltip is open
 * - `onOpenChange`: the callback function to handle the open state of the tooltip
 */
export const Tooltip: Story = {
  render: () => (
    <IconButton tooltip={{ content: "Tooltip" }}>
      <FieldTypeDate />
    </IconButton>
  ),
}

/**
 * The `IconButtonGroup` component is used to group the icon buttons.
 */
export const Group: Story = {
  render: () => (
    <IconButtonGroup variant="solid">
      <IconButton>
        <FieldTypeButton />
      </IconButton>
      <IconButton>
        <FieldTypeCount />
      </IconButton>
      <IconButton>
        <FieldTypeCheckbox />
      </IconButton>
    </IconButtonGroup>
  ),
}

/**
 * The `asChild` prop is used to render the icon button as a child element.
 */
export const AsChild: Story = {
  render: () => (
    <IconButton asChild>
      <a href="#">
        <FieldTypeAttachment />
      </a>
    </IconButton>
  ),
}
