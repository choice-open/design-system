import { Button, Hint, Input, Label, LinkButton } from "@choice-ui/react"
import { CircleInfoLargeSolid } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

const meta: Meta<typeof Hint> = {
  title: "Feedback/Hint",
  component: Hint,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "upgrade"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * `Hint` is a tooltip component that displays helpful information when users hover over or focus on an element.
 *
 * Features:
 * - Hover and focus interactions for accessibility
 * - Flexible placement options (left-start, right-start)
 * - Customizable icons and content
 * - Dark and default variants
 * - Controlled and uncontrolled modes
 * - Delay configuration for better UX
 * - Portal rendering for proper z-index handling
 * - Disabled state support
 * - Smooth animations and transitions
 *
 * Usage Guidelines:
 * - Use for providing additional context or help text
 * - Place hints near form labels or complex UI elements
 * - Keep content concise and actionable
 * - Use appropriate placement based on available space
 * - Consider delay for frequently hovered elements
 *
 * Accessibility:
 * - Keyboard accessible (focus triggers tooltip)
 * - Proper ARIA roles and attributes
 * - Screen reader friendly
 * - Respects disabled state
 */

/**
 * Basic: Demonstrates the simplest usage of Hint component.
 *
 * Features:
 * - Default right-start placement
 * - Standard info icon
 * - Simple text content
 * - Hover/focus to show tooltip
 *
 * This is the foundation for all other Hint variations.
 */
export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="font-strong">Reason</span>
      <Hint>
        <Hint.Content>Optional reason</Hint.Content>
      </Hint>
    </div>
  ),
}

/**
 * Placements: Demonstrates different tooltip positioning options.
 *
 * Features:
 * - left-start: Tooltip appears on the left side
 * - right-start: Tooltip appears on the right side (default)
 * - Automatic fallback when space is insufficient
 * - Consistent behavior across different alignments
 *
 * Placement Guidelines:
 * - Use right-start when hint is after a label
 * - Use left-start when hint is before a label
 * - Component automatically flips if there's not enough space
 */
export const Placements: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <Hint placement="left-start">
          <Hint.Content>Information tooltip displayed on the left</Hint.Content>
        </Hint>
        <span>Left placement</span>
      </div>

      <div className="flex items-center gap-2">
        <span>Right placement</span>
        <Hint placement="right-start">
          <Hint.Content>Information tooltip displayed on the right</Hint.Content>
        </Hint>
      </div>
    </div>
  ),
}

/**
 * CustomIcon: Demonstrates how to use custom icons in hint tooltips.
 *
 * Features:
 * - Replace default info icon with any React element
 * - Maintains consistent tooltip behavior
 * - Flexible icon system integration
 * - Icon appears both in trigger and tooltip content
 *
 * Use Cases:
 * - Brand-specific icons
 * - Contextual icons (warning, help, etc.)
 * - Custom design system icons
 */
export const CustomIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="font-strong">Reason</span>
      <Hint>
        <Hint.Trigger>
          <CircleInfoLargeSolid />
        </Hint.Trigger>
        <Hint.Content>Optional reason</Hint.Content>
      </Hint>
    </div>
  ),
}

/**
 * Variants: Demonstrates different visual variants of the Hint component.
 *
 * Features:
 * - default: Light background with dark text (follows theme)
 * - dark: Dark background with light text
 * - Consistent behavior across variants
 *
 * Usage Guidelines:
 * - Use default variant in light themes
 * - Use dark variant in dark themes or for contrast
 * - Use accent variant in accent areas
 * - Match variant to surrounding UI context
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-end gap-4">
      <div className="flex items-center gap-2">
        <span>Default variant</span>
        <Hint>
          <Hint.Content variant="default">Default variant tooltip content</Hint.Content>
        </Hint>
      </div>

      <div className="flex items-center gap-2">
        <span>Dark variant</span>
        <Hint>
          <Hint.Content variant="dark">Dark variant tooltip content</Hint.Content>
        </Hint>
      </div>

      <div className="flex items-center gap-2">
        <span>Accent variant</span>
        <Hint>
          <Hint.Content variant="accent">Accent variant tooltip content</Hint.Content>
        </Hint>
      </div>
    </div>
  ),
}

/**
 * Disabled: Shows hint component in disabled state.
 *
 * Features:
 * - Disabled interaction state
 * - Visual indication of unavailable tooltip
 * - Maintains layout consistency when disabled
 * - Prevents hover/focus activation
 * - Tooltip will not appear even on hover
 *
 * Use Cases:
 * - Conditional help text
 * - Feature flags
 * - Progressive disclosure
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Disabled field</span>
      <Hint disabled>
        <Hint.Content>This information tooltip is disabled</Hint.Content>
      </Hint>
    </div>
  ),
}

/**
 * Delay: Demonstrates delayed tooltip display for better UX.
 *
 * Features:
 * - Configurable delay before showing tooltip
 * - Prevents accidental triggers
 * - Improves user experience for frequently hovered elements
 * - Delay only applies to opening, closing is immediate
 *
 * Use Cases:
 * - Dense UI where hints might be accidentally triggered
 * - Reducing visual noise in complex interfaces
 * - Better UX for power users
 */
export const Delay: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-center gap-2">
        <span>No delay (default)</span>
        <Hint delay={0}>
          <Hint.Content>Tooltip appears immediately on hover</Hint.Content>
        </Hint>
      </div>

      <div className="flex items-center gap-2">
        <span>With delay (1000ms)</span>
        <Hint delay={1000}>
          <Hint.Content>Tooltip appears after 1 second delay</Hint.Content>
        </Hint>
      </div>
    </div>
  ),
}

/**
 * Controlled: Demonstrates controlled mode for programmatic control.
 *
 * Features:
 * - External control of tooltip visibility
 * - onOpenChange callback for state synchronization
 * - Useful for complex interactions
 * - Can be combined with other UI logic
 *
 * Use Cases:
 * - Integration with form validation
 * - Custom interaction patterns
 * - Programmatic show/hide logic
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <span>Controlled hint</span>
          <Hint
            open={open}
            onOpenChange={setOpen}
          >
            <Hint.Content>This tooltip is controlled externally</Hint.Content>
          </Hint>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              if (open) return
              return setOpen(true)
            }}
          >
            Show Tooltip
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="secondary"
          >
            Hide Tooltip
          </Button>
        </div>
      </div>
    )
  },
}

/**
 * LongContent: Tests hint behavior with extensive text content.
 *
 * Features:
 * - Automatic text wrapping for long content
 * - Maintains optimal width for readability
 * - Preserves tooltip positioning with larger content
 * - Responsive design adaptation
 *
 * Best Practices:
 * - Keep content concise when possible
 * - Break long content into multiple lines naturally
 * - Consider using links or actions in long tooltips
 */
export const LongContent: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Complex field</span>
      <Hint placement="right-start">
        <Hint.Content>
          This is a very long information tooltip content used to demonstrate the display effect
          when there is more content. The component will automatically wrap and maintain appropriate
          width to ensure content readability and aesthetics.
        </Hint.Content>
      </Hint>
    </div>
  ),
}

/**
 * RealWorldExamples: Demonstrates practical usage scenarios.
 *
 * Features:
 * - Form label hints
 * - Settings explanations
 * - Feature descriptions
 * - Help text in various contexts
 *
 * These examples show how Hint integrates into real applications.
 */
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <Label
          action={
            <Hint placement="right-start">
              <Hint.Content>We'll never share your email with anyone else</Hint.Content>
            </Hint>
          }
        >
          Email Address
        </Label>

        <Input
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          action={
            <Hint placement="right-end">
              <Hint.Trigger className="text-secondary-foreground">
                <CircleInfoLargeSolid />
              </Hint.Trigger>
              <Hint.Content className="text-secondary-foreground p-4">
                <span>Enable dark mode to reduce eye strain in low-light environments</span>
                <LinkButton className="ml-2">Learn more</LinkButton>
              </Hint.Content>
            </Hint>
          }
        >
          Dark Mode
        </Label>

        <Input />
      </div>
    </div>
  ),
}
