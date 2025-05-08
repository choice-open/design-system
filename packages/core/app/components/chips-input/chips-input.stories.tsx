import { RemoveSmall } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { ChipsInput, RenderChipProps, type ChipsInputProps } from "."

const meta = {
  title: "Forms/ChipsInput",
  component: ChipsInput,
} satisfies Meta<typeof ChipsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Add tags...",
    className: "w-32",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Add tags...",
    disabled: true,
    className: "w-32",
  },
}

export const Controlled: Story = {
  render: (args: ChipsInputProps) => {
    // Define a temporary component to handle state
    const ControlledComponent = () => {
      const [tags, setTags] = useState(["Initial", "Controlled"])
      return (
        <div className="flex flex-col gap-2">
          <ChipsInput
            {...args}
            className="w-32"
            value={tags}
            onChange={(newTags: string[]) => {
              args.onChange?.(newTags) // Trigger Storybook action
              setTags(newTags)
            }}
            placeholder="Controlled tags input..."
          />
          <div className="text-secondary-foreground text-xs">
            Current Tags: {JSON.stringify(tags)}
          </div>
        </div>
      )
    }
    // Render the temporary component
    return <ControlledComponent />
  },
  args: {
    // Args specific to the controlled story if needed, otherwise keep empty
  },
}

export const Empty: Story = {
  args: {
    placeholder: "Add tags...",
  },
}

export const AllowDuplicates: Story = {
  args: {
    placeholder: "Add tags (duplicates allowed)...",
    allowDuplicates: true,
  },
}

// Example custom render function
const customRenderChip = ({
  chip,
  index,
  isSelected,
  disabled,
  handleChipClick,
  handleChipRemoveClick,
}: RenderChipProps) => {
  return (
    <div
      style={{
        padding: "2px 8px",
        margin: "2px",
        border: isSelected ? "2px solid #007bff" : "1px solid #ced4da",
        borderRadius: "12px",
        display: "inline-flex",
        alignItems: "center",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        backgroundColor: isSelected ? "#cfe2ff" : "#f8f9fa",
        fontSize: "0.875rem",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={disabled ? undefined : () => handleChipClick(index)}
    >
      <span style={{ marginRight: "4px" }}>
        {isSelected ? "🌟" : "🏷️"} {chip}
      </span>
      {!disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation() // Important!
            handleChipRemoveClick(index)
          }}
          style={{
            marginLeft: "4px",
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
          aria-label={`Remove ${chip}`}
          disabled={disabled}
        >
          <RemoveSmall />
        </button>
      )}
    </div>
  )
}

export const CustomRenderChip: Story = {
  args: {
    placeholder: "Add custom chips...",
    renderChip: customRenderChip,
  },
}
