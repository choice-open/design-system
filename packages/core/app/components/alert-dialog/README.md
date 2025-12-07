# Alert Dialog

A global dialog system that provides alert, confirm, and custom dialog functionality with promise-based API. It handles dialog queuing, keyboard interactions, and focus management automatically.

## Import

```tsx
import { AlertDialogProvider, useAlertDialog } from "@choice-ui/react"
```

## Features

- Promise-based API for async/await usage
- Three dialog types: alert, confirm, and custom show
- Automatic dialog queue management
- Keyboard support (ESC to close, Enter to confirm)
- Focus trapping and restoration
- Multiple visual variants (default, danger, success, warning)
- Customizable buttons and content
- TypeScript support with full type safety
- Accessible with proper ARIA attributes

## Setup

Wrap your app with the provider:

```tsx
import { AlertDialogProvider } from "@choice-ui/react"

function App() {
  return <AlertDialogProvider>{/* Your app content */}</AlertDialogProvider>
}
```

## Usage

### Basic Alert

```tsx
const { alert } = useAlertDialog()

// Simple string message
await alert("Operation completed successfully")

// With title and description
await alert({
  title: "Success",
  description: "Your changes have been saved",
})
```

### Confirmation Dialog

```tsx
const { confirm } = useAlertDialog()

const isConfirmed = await confirm({
  title: "Delete Item",
  description: "Are you sure you want to delete this item? This action cannot be undone.",
  variant: "danger",
  confirmText: "Delete",
  cancelText: "Cancel",
})

if (isConfirmed) {
  // Perform delete action
}
```

### Custom Dialog

```tsx
const { show } = useAlertDialog()

const result = await show({
  title: "Save Changes",
  content: <div>You have unsaved changes. What would you like to do?</div>,
  buttons: [
    { text: "Don't Save", value: "cancel", variant: "secondary" },
    { text: "Save", value: "save", variant: "primary", autoFocus: true },
  ],
})

switch (result) {
  case "save":
    // Save changes
    break
  case "cancel":
    // Discard changes
    break
}
```

### With Custom Content

```tsx
await alert({
  title: "Welcome",
  content: (
    <div className="space-y-4">
      <p>Welcome to our application!</p>
      <ul className="list-disc pl-4">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
      </ul>
    </div>
  ),
})
```

### Variants

```tsx
// Default variant
await alert({ title: "Information", variant: "default" })

// Danger variant
await alert({ title: "Error", variant: "danger" })

// Success variant
await alert({ title: "Success", variant: "success" })

// Warning variant
await alert({ title: "Warning", variant: "warning" })
```

## Provider Props

```ts
interface AlertDialogProviderProps {
  /** Component tree to wrap */
  children: ReactNode

  /** Additional CSS class names */
  className?: string

  /** Allow closing by clicking outside (default: true) */
  outsidePress?: boolean

  /** Show overlay backdrop (default: true) */
  overlay?: boolean

  /** Custom portal root element ID */
  portalId?: string
}
```

## Dialog Configuration

```ts
interface AlertDialogConfig {
  /** Dialog title */
  title?: string

  /** Dialog content (string or ReactNode) */
  content?: ReactNode
  description?: ReactNode // alias for content

  /** Visual variant */
  variant?: "default" | "danger" | "success" | "warning"

  /** Dialog size */
  size?: "small" | "default" | "large"

  /** Allow ESC key to close (default: true) */
  closeOnEscape?: boolean

  /** Allow clicking overlay to close (default: true) */
  closeOnOverlayClick?: boolean

  /** Show close button in header (default: false) */
  showCloseButton?: boolean

  /** Additional CSS classes */
  className?: string

  // For confirm dialogs
  confirmText?: string
  cancelText?: string
  confirmVariant?: ButtonVariant
  cancelVariant?: ButtonVariant

  // For custom dialogs
  buttons?: Array<{
    text: string
    value: string
    variant?: ButtonVariant
    disabled?: boolean
    autoFocus?: boolean
  }>
}
```

## Best Practices

- Use `alert()` for informational messages that only need acknowledgment
- Use `confirm()` for binary choices requiring user decision
- Use `show()` for complex dialogs with multiple options
- Always handle the promise result for confirm and show dialogs
- Keep dialog content concise and action-oriented
- Use appropriate variants to convey meaning (danger for destructive actions)
- Provide clear button labels that describe the action

## Examples

### Delete Confirmation

```tsx
async function handleDelete(id: string) {
  const confirmed = await confirm({
    title: "Delete Item",
    description: "This will permanently delete the item and cannot be undone.",
    variant: "danger",
    confirmText: "Delete",
    confirmVariant: "destructive",
    cancelText: "Keep Item",
  })

  if (confirmed) {
    await deleteItem(id)
    await alert({
      title: "Item Deleted",
      variant: "success",
    })
  }
}
```

### Unsaved Changes

```tsx
async function handleNavigation() {
  if (hasUnsavedChanges) {
    const action = await show({
      title: "Unsaved Changes",
      content: "You have unsaved changes that will be lost.",
      buttons: [
        { text: "Cancel", value: "cancel", variant: "ghost" },
        { text: "Discard", value: "discard", variant: "secondary" },
        { text: "Save", value: "save", variant: "primary", autoFocus: true },
      ],
    })

    switch (action) {
      case "save":
        await saveChanges()
        navigate()
        break
      case "discard":
        navigate()
        break
      // "cancel" or null - do nothing
    }
  }
}
```

## Notes

- Dialogs are rendered in a portal to ensure proper stacking
- Only one dialog is shown at a time; additional calls are queued
- The provider must be mounted before using the hook
- All methods return promises that resolve when the dialog is dismissed
- Clicking outside or pressing ESC returns `null` for custom dialogs
