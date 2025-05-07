import { SvgIcon, SvgIconName } from "@choiceform/ui-react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../button"
import { Dropdown, DropdownItem } from "../dropdown"
import { NestingTextInput } from "./nesting-text-input"
import { Select } from "../select"
import { useState, useRef, useEffect } from "react"
const meta: Meta<typeof NestingTextInput> = {
  title: "NestingTextInput",
  component: NestingTextInput,
}

export default meta

type Story = StoryObj<typeof NestingTextInput>

/**
 * `NestingTextInput` is a basic input component that can be used to input text.
 */
export const Basic: Story = {
  render: function Render() {
    const inputRef = useRef<HTMLInputElement>(null)

    enum Option {
      Item1 = "item-1",
      Item2 = "item-2",
      Item3 = "item-3",
      Item4 = "item-4",
    }

    const [value, setValue] = useState("")
    const [selected, setSelected] = useState<Option | null>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
      if (!open) {
        inputRef.current?.focus()
      }
    }, [open])

    return (
      <NestingTextInput
        ref={inputRef}
        focused={open}
        value={value}
        onChange={setValue}
      >
        <Select
          open={open}
          onOpenChange={setOpen}
          placeholder="Select an option"
          options={Object.values(Option).map((option) => ({
            label: option,
            value: option,
          }))}
          value={selected}
          onChange={(value) => {
            setSelected(value as Option)
            setValue(value)
            setOpen(false)
          }}
        />
      </NestingTextInput>
    )
  },
}
