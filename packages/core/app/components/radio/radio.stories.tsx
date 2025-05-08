import type { Meta, StoryObj } from "@storybook/react"
import React, { Fragment, useState } from "react"
import { Radio } from "./radio"
import { RadioGroup } from "./radio-group"

const meta: Meta<typeof Radio> = {
  title: "Forms/Radio",
  component: Radio,
}

export default meta

type Story = StoryObj<typeof Radio>

/**
 * - This is a controlled component that requires `value` and `onChange` props to control its state.
 * - `label`: The label of the radio
 */
export const Basic: Story = {
  render: function BasicStory() {
    enum State {
      Rest = "rest",
      Focused = "focused",
      Disabled = "disabled",
    }

    enum Interaction {
      On = "on",
      Off = "off",
    }

    enum Variant {
      Default = "default",
      Accent = "accent",
      Outline = "outline",
    }

    return (
      <div className="flex flex-col items-start gap-4">
        {Object.values(Variant).map((variant, index) => (
          <Fragment key={variant}>
            <span className="capitalize">{variant}</span>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(State).map((state) => (
                <Fragment key={state}>
                  <span className="text-pink-500 capitalize">{state}</span>

                  {Object.values(Interaction).map((interaction) => (
                    <Fragment key={interaction}>
                      <Radio
                        value={interaction === Interaction.On}
                        label={interaction}
                        disabled={state === State.Disabled}
                        focused={state === State.Focused}
                        variant={variant}
                        onChange={(value) => {
                          console.log(value)
                        }}
                      />
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </div>
            {index !== Object.values(Variant).length - 1 && <hr className="w-full" />}
          </Fragment>
        ))}
      </div>
    )
  },
}
/**
 * The `disabled` prop is used to disable the radio.
 */
export const Disabled: Story = {
  render: function DisabledStory() {
    const [value, setValue] = useState(false)
    return (
      <Radio
        value={value}
        onChange={setValue}
        label="Disabled"
        disabled
      />
    )
  },
}

/**
 * The `variant` prop is used to change the variant of the radio.
 * - `default`: The default variant of the radio.
 * - `accent`: The accent variant of the radio.
 * - `outline`: The outline variant of the radio.
 */
export const Variant: Story = {
  render: function VariantStory() {
    const [variant, setVariant] = useState({
      default: false,
      accent: false,
      outline: false,
    })

    return (
      <>
        <Radio
          name="variant"
          value={variant.default}
          onChange={(value) => setVariant({ ...variant, default: value })}
          label="Default"
        />
        <Radio
          name="variant"
          value={variant.accent}
          onChange={(value) => setVariant({ ...variant, accent: value })}
          label="Accent"
          variant="accent"
        />
        <Radio
          name="variant"
          value={variant.outline}
          onChange={(value) => setVariant({ ...variant, outline: value })}
          label="Outline"
          variant="outline"
        />
      </>
    )
  },
}

/**
 * The `IfRadioGroup` component is used to group the radio.
 */
export const Group: Story = {
  render: function GroupStory() {
    const groupOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ]

    const [selectedIds, setSelectedIds] = useState<string>(groupOptions[0].value)

    return (
      <div className="flex flex-col gap-1">
        <RadioGroup
          options={groupOptions}
          value={selectedIds}
          onChange={(value) => setSelectedIds(value)}
        />
      </div>
    )
  },
}

/**
 * The `IfRadioGroup` component has `variant` prop.
 * - `default`: The default variant of the radio.
 * - `accent`: The accent variant of the radio.
 * - `outline`: The outline variant of the radio.
 */
export const GroupVariant: Story = {
  render: function GroupVariantStory() {
    const groupOptions = [
      { value: "default", label: "Default" },
      { value: "accent", label: "Accent" },
      { value: "outline", label: "Outline" },
    ]

    const [variant, setVariant] = useState("default")

    return (
      <>
        <RadioGroup
          variant={variant as "default" | "accent" | "outline"}
          options={groupOptions}
          value={variant}
          onChange={(value) => setVariant(value)}
        />
      </>
    )
  },
}
