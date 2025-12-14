import { Label, OtpInput } from "@choice-ui/react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

const meta: Meta<typeof OtpInput> = {
  title: "Forms/OtpInput",
  component: OtpInput,
  tags: ["autodocs", "new"],
}

export default meta

type Story = StoryObj<typeof OtpInput>

/**
 * `OtpInput` is a one-time password input component for verification codes.
 *
 * Features:
 * - Composable slot-based architecture
 * - Multiple visual variants (default, light, dark)
 * - Support for disabled and invalid states
 * - Flexible grouping with separators
 * - Auto-focus and paste support
 * - Full keyboard accessibility
 *
 * Usage Guidelines:
 * - Use for OTP, PIN codes, or verification code inputs
 * - Group slots logically (e.g., 3-3 or 4-2 patterns)
 * - Provide clear feedback for invalid codes
 * - Consider auto-submit on completion
 */

/**
 * Basic: Demonstrates a standard 6-digit OTP input with separator.
 *
 * This is the most common pattern for verification codes,
 * split into two groups of 3 digits.
 */
export const Basic: Story = {
  render: () => (
    <OtpInput maxLength={6}>
      <OtpInput.Group>
        <OtpInput.Slot index={0} />
        <OtpInput.Slot index={1} />
        <OtpInput.Slot index={2} />
      </OtpInput.Group>
      <OtpInput.Separator />
      <OtpInput.Group>
        <OtpInput.Slot index={3} />
        <OtpInput.Slot index={4} />
        <OtpInput.Slot index={5} />
      </OtpInput.Group>
    </OtpInput>
  ),
}

/**
 * FourDigits: Demonstrates a 4-digit PIN code input.
 *
 * Common for PIN codes or shorter verification codes.
 * All slots in a single group without separator.
 */
export const FourDigits: Story = {
  render: () => (
    <OtpInput maxLength={4}>
      <OtpInput.Group>
        <OtpInput.Slot index={0} />
        <OtpInput.Slot index={1} />
        <OtpInput.Slot index={2} />
        <OtpInput.Slot index={3} />
      </OtpInput.Group>
    </OtpInput>
  ),
}

/**
 * Controlled: Demonstrates controlled usage with value state.
 *
 * Features:
 * - Value managed by React state
 * - onComplete callback when all digits entered
 * - onChange callback for each input change
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState("")

    return (
      <div className="space-y-4">
        <OtpInput
          maxLength={6}
          value={value}
          onChange={setValue}
          onComplete={(code) => alert(`Code submitted: ${code}`)}
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
          </OtpInput.Group>
          <OtpInput.Separator />
          <OtpInput.Group>
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
        <p className="text-secondary-foreground text-sm">Current value: {value || "(empty)"}</p>
      </div>
    )
  },
}

/**
 * Disabled: Demonstrates the disabled state.
 *
 * Use when:
 * - Verification is in progress
 * - User has exceeded attempt limits
 * - The feature is temporarily unavailable
 */
export const Disabled: Story = {
  render: () => (
    <OtpInput
      maxLength={6}
      disabled
    >
      <OtpInput.Group>
        <OtpInput.Slot index={0} />
        <OtpInput.Slot index={1} />
        <OtpInput.Slot index={2} />
      </OtpInput.Group>
      <OtpInput.Separator />
      <OtpInput.Group>
        <OtpInput.Slot index={3} />
        <OtpInput.Slot index={4} />
        <OtpInput.Slot index={5} />
      </OtpInput.Group>
    </OtpInput>
  ),
}

/**
 * Invalid: Demonstrates the invalid/error state.
 *
 * Use when:
 * - The entered code is incorrect
 * - Validation fails
 * - Provide feedback alongside error messages
 */
export const Invalid: Story = {
  render: () => (
    <div className="space-y-2">
      <OtpInput
        maxLength={6}
        isInvalid
        value="123456"
      >
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
        </OtpInput.Group>
        <OtpInput.Separator />
        <OtpInput.Group>
          <OtpInput.Slot index={3} />
          <OtpInput.Slot index={4} />
          <OtpInput.Slot index={5} />
        </OtpInput.Group>
      </OtpInput>
      <p className="text-danger-foreground">Invalid verification code. Please try again.</p>
    </div>
  ),
}

/**
 * Variants: Demonstrates different visual variants.
 *
 * Features:
 * - default: Follows the page theme dynamically
 * - light: Fixed light appearance
 * - dark: Fixed dark appearance
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="bg-default-background flex flex-col gap-2 rounded-lg border p-4">
        <Label>Default Variant</Label>
        <OtpInput
          maxLength={4}
          variant="default"
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
          </OtpInput.Group>
        </OtpInput>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border bg-white p-4">
        <Label className="text-gray-900">Light Variant</Label>
        <OtpInput
          maxLength={4}
          variant="light"
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
          </OtpInput.Group>
        </OtpInput>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border bg-gray-800 p-4">
        <Label className="text-white">Dark Variant</Label>
        <OtpInput
          maxLength={4}
          variant="dark"
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
          </OtpInput.Group>
        </OtpInput>
      </div>
    </div>
  ),
}

/**
 * CustomSeparator: Demonstrates custom separator content.
 *
 * You can customize the separator content by passing children.
 */
export const CustomSeparator: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label>Dot separator</Label>
        <OtpInput maxLength={6}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
          </OtpInput.Group>
          <OtpInput.Separator>
            <span className="text-xl">·</span>
          </OtpInput.Separator>
          <OtpInput.Group>
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
      </div>

      <div className="flex flex-col gap-2">
        <Label>No separator</Label>
        <OtpInput maxLength={6}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
      </div>
    </div>
  ),
}

/**
 * WithPattern: Demonstrates using regex pattern for input validation.
 *
 * Use inputMode and pattern to restrict input types:
 * - numeric: Only numbers
 * - text: Allow alphanumeric
 */
export const WithPattern: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label>Numbers only (default)</Label>
        <OtpInput
          maxLength={6}
          inputMode="numeric"
          pattern="[0-9]"
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Alphanumeric</Label>
        <OtpInput
          maxLength={6}
          inputMode="text"
          pattern="[a-zA-Z0-9]"
        >
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
      </div>
    </div>
  ),
}
