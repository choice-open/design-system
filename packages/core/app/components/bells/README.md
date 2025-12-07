# Bells

A customizable notification component built on top of Sonner, featuring progress indicators, multiple variants, and flexible action support. Perfect for displaying toast-style notifications with enhanced visual feedback.

## Import

```tsx
import { bells, Bell } from "@choice-ui/react"
```

## Features

- Multiple visual variants for different notification types (default, accent, success, warning, danger, assistive)
- Optional progress bar with pause-on-hover functionality
- Support for custom actions and close buttons
- HTML content support for rich notifications
- Customizable duration with support for persistent notifications
- Icon support for visual enhancement
- Compound slots for granular style customization
- Smooth animations powered by Framer Motion

## Usage

### Basic

```tsx
bells({
  text: "Your changes have been saved",
})
```

### With icon and variant

```tsx
import { CheckCircleFilled } from "@choiceform/icons-react"

bells({
  text: "Task completed successfully",
  icon: <CheckCircleFilled />,
  variant: "success",
})
```

### With progress indicator

```tsx
bells({
  text: "Upload in progress...",
  progress: true,
  duration: 5000,
})
```

### With custom action

```tsx
bells({
  text: "New message received",
  action: (id) => (
    <Button
      size="small"
      variant="ghost"
      onClick={() => console.log("View", id)}
    >
      View
    </Button>
  ),
})
```

### Persistent notification

```tsx
bells({
  text: "System update available",
  duration: Infinity,
  onClose: (id) => {
    console.log("Closed notification", id)
    toast.dismiss(id)
  },
})
```

### With HTML content

```tsx
bells({
  html: "Task <strong>deployment</strong> completed",
  variant: "success",
})
```

## Props

```ts
interface BellsProps extends Omit<ToasterProps, "id"> {
  /** Custom action renderer function */
  action?: (id: string | number) => React.ReactNode

  /** Additional CSS class name */
  className?: string

  /** Object of class names for each slot */
  classNames?: {
    button?: string
    close?: string
    content?: string
    icon?: string
    progress?: string
    root?: string
    text?: string
  }

  /** HTML content (alternative to text) */
  html?: string

  /** Icon element to display */
  icon?: React.ReactNode

  /** Unique notification identifier */
  id: string | number

  /** Callback when notification is closed */
  onClose?: (id: string | number) => void

  /** Whether to show progress indicator */
  progress?: boolean

  /** Plain text content */
  text?: string

  /** Visual style variant */
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "assistive" | "reset"
}
```

- Defaults:
  - `duration`: 4000 (ms)
  - `variant`: "default"
  - `progress`: `false`

- Notes:
  - Either `text` or `html` prop is required
  - Use `duration: Infinity` for persistent notifications
  - Progress bar automatically pauses on hover

## Styling

- Uses Tailwind CSS via `tailwind-variants` with multiple customizable slots
- Slots available: `root`, `content`, `icon`, `text`, `close`, `button`, `progress`
- Each variant has distinct color schemes matching semantic meaning
- Dark mode compatible with appropriate contrast ratios

## Best practices

- Choose variants that match the notification's semantic meaning
- Keep messages concise and actionable
- Use progress indicators for long-running operations
- Provide clear actions when user interaction is needed
- Consider using icons to enhance visual recognition
- Set appropriate durations based on content complexity

## Examples

### Error notification with action

```tsx
bells({
  text: "Failed to save changes",
  variant: "danger",
  action: (id) => (
    <Button
      size="small"
      variant="ghost"
      onClick={() => {
        retryOperation()
        toast.dismiss(id)
      }}
    >
      Retry
    </Button>
  ),
})
```

### Upload progress

```tsx
bells({
  text: "Uploading file...",
  progress: true,
  duration: 10000,
  icon: <Upload />,
  variant: "accent",
})
```

### Warning with custom close handler

```tsx
bells({
  text: "Your session will expire in 5 minutes",
  variant: "warning",
  onClose: (id) => {
    trackEvent("warning_dismissed")
    toast.dismiss(id)
  },
})
```

## Notes

- The component uses Sonner under the hood for toast management
- Progress bars pause on hover to give users time to read/interact
- Custom actions are memoized to prevent unnecessary re-renders
- The notification system supports queueing and positioning through Sonner's API
- Use the `bells()` function for programmatic notifications, or `<Bell>` component for custom implementations
