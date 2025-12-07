# Dialog

A flexible, accessible modal dialog component with advanced positioning, dragging, and resizing capabilities. It provides a compound component pattern for building complex modal interfaces with headers, content, and footers.

## Import

```tsx
import { Dialog } from "@choice-ui/react"
```

## Features

- Compound component pattern for flexible dialog composition
- Draggable and resizable dialog windows
- Multiple positioning modes (center, corners, custom coordinates)
- Focus management with proper accessibility support
- Keyboard navigation (ESC to close, tab trapping)
- Outside click and backdrop interaction controls
- Position and size memory between sessions
- Portal-based rendering for proper z-index layering
- Integration with Modal components for consistent styling

## Usage

### Basic Dialog

```tsx
<Dialog>
  <Dialog.Trigger>
    <button>Open Dialog</button>
  </Dialog.Trigger>

  <Dialog.Header title="Dialog Title" />

  <Dialog.Content>
    <p>This is the dialog content.</p>
  </Dialog.Content>

  <Dialog.Footer>
    <button>Cancel</button>
    <button>Save</button>
  </Dialog.Footer>
</Dialog>
```

### Controlled Dialog

```tsx
const [isOpen, setIsOpen] = useState(false)

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Content>
    <p>Controlled dialog content</p>
  </Dialog.Content>
</Dialog>
```

### Draggable Dialog

```tsx
<Dialog
  draggable
  rememberPosition
>
  <Dialog.Header title="Draggable Dialog" />
  <Dialog.Content>
    <p>Drag the header to move this dialog</p>
  </Dialog.Content>
</Dialog>
```

### Resizable Dialog

```tsx
<Dialog
  resizable={{ width: true, height: true }}
  defaultWidth={600}
  defaultHeight={400}
  rememberSize
>
  <Dialog.Header title="Resizable Dialog" />
  <Dialog.Content>
    <p>Resize using the handles on the edges</p>
  </Dialog.Content>
</Dialog>
```

### Positioned Dialog

```tsx
<Dialog
  initialPosition="right-top"
  positionPadding={16}
>
  <Dialog.Header title="Top Right Dialog" />
  <Dialog.Content>
    <p>This dialog appears in the top-right corner</p>
  </Dialog.Content>
</Dialog>
```

### With Custom Backdrop

```tsx
<Dialog overlay={true}>
  <Dialog.Trigger>
    <button>Open Dialog</button>
  </Dialog.Trigger>

  <Dialog.Backdrop />

  <Dialog.Header title="Dialog with Backdrop" />
  <Dialog.Content>
    <p>Click outside to close</p>
  </Dialog.Content>
</Dialog>
```

## Props

```ts
interface DialogProps {
  /** Callback after open state changes */
  afterOpenChange?: (isOpen: boolean) => void

  /** Dialog content and components */
  children?: React.ReactNode

  /** Additional CSS class names */
  className?: string

  /** Whether ESC key closes the dialog */
  closeOnEscape?: boolean

  /** Default height for resizable dialogs */
  defaultHeight?: number

  /** Default width for resizable dialogs */
  defaultWidth?: number

  /** Whether the dialog can be dragged by its header */
  draggable?: boolean

  /** Focus manager configuration */
  focusManagerProps?: Partial<FloatingFocusManagerProps>

  /** Initial position when dialog opens */
  initialPosition?: DialogPosition

  /** Maximum height constraint */
  maxHeight?: number

  /** Maximum width constraint */
  maxWidth?: number

  /** Minimum height constraint */
  minHeight?: number

  /** Minimum width constraint */
  minWidth?: number

  /** Controlled open state change handler */
  onOpenChange?: (open: boolean) => void

  /** Controlled open state */
  open?: boolean

  /** Whether clicking outside closes the dialog */
  outsidePress?: boolean

  /** Whether to show overlay/backdrop */
  overlay?: boolean

  /** Padding from viewport edges for positioning */
  positionPadding?: number

  /** Remember position between sessions */
  rememberPosition?: boolean

  /** Remember size between sessions */
  rememberSize?: boolean

  /** Resize configuration */
  resizable?: {
    height?: boolean
    width?: boolean
  }

  /** Transition animation configuration */
  transitionStylesProps?: UseTransitionStylesProps
}

type DialogPosition =
  | "left-top"
  | "center-top"
  | "right-top"
  | "left-center"
  | "center"
  | "right-center"
  | "left-bottom"
  | "center-bottom"
  | "right-bottom"
```

- Defaults:
  - `closeOnEscape`: `true`
  - `draggable`: `false`
  - `initialPosition`: `"center"`
  - `positionPadding`: `32`
  - `resizable`: `{ width: false, height: false }`
  - `defaultWidth`: `512`
  - `defaultHeight`: `384`
  - `minWidth`: `320`
  - `minHeight`: `240`
  - `overlay`: `false`
  - `outsidePress`: `false`
  - `rememberPosition`: `false`
  - `rememberSize`: `false`
  - `focusManagerProps`: `{ initialFocus: 1 }`

- Accessibility:
  - Proper `role="dialog"` and `aria-modal="true"`
  - Focus trapping within dialog
  - ESC key support for closing
  - Screen reader announcements via `aria-labelledby` and `aria-describedby`

## Compound Components

### Dialog.Trigger

Renders trigger element that opens the dialog when clicked.

### Dialog.Header

Renders dialog header with optional title and close button. Acts as drag handle when `draggable` is enabled.

### Dialog.Content

Main content area of the dialog with proper scrolling and styling.

### Dialog.Footer

Optional footer section for action buttons.

### Dialog.Backdrop

Optional backdrop/overlay element for visual separation and click-outside handling.

## Styling

- Uses Tailwind CSS via `tailwind-variants` in `tv.ts` for component styling
- Integrates with Modal component styles for consistent theming
- Supports drag and resize visual states via data attributes:
  - `data-draggable`: Present when dialog is draggable
  - `data-dragging`: Present during drag operations
  - `data-resizable`: Present when dialog is resizable
  - `data-state`: "open" | "opening" | "closing" for transition states

## Best Practices

- Use draggable dialogs for tools and utilities that users may want to reposition
- Enable size memory (`rememberSize`) for dialogs with variable content
- Provide clear visual hierarchy in dialog content
- Use appropriate positioning for context-dependent dialogs
- Consider viewport size when setting default dimensions
- Use backdrop for modal dialogs that require user attention

## Examples

### Settings Dialog

```tsx
<Dialog
  draggable
  resizable={{ width: true, height: true }}
  defaultWidth={800}
  defaultHeight={600}
  rememberSize
  rememberPosition
>
  <Dialog.Trigger>
    <button>Settings</button>
  </Dialog.Trigger>

  <Dialog.Header title="Application Settings" />

  <Dialog.Content>
    <div className="space-y-6">
      <SettingsSection title="General">
        <SettingsItem />
      </SettingsSection>
    </div>
  </Dialog.Content>

  <Dialog.Footer>
    <button>Cancel</button>
    <button>Apply</button>
  </Dialog.Footer>
</Dialog>
```

### Confirmation Dialog

```tsx
<Dialog
  initialPosition="center"
  overlay
>
  <Dialog.Backdrop />

  <Dialog.Header title="Confirm Action" />

  <Dialog.Content>
    <p>Are you sure you want to delete this item?</p>
  </Dialog.Content>

  <Dialog.Footer>
    <button variant="secondary">Cancel</button>
    <button variant="destructive">Delete</button>
  </Dialog.Footer>
</Dialog>
```

## Notes

- Dialog uses FloatingUI for precise positioning and collision detection
- Drag and resize operations are optimized for performance
- Position and size persistence uses browser localStorage
- Portal rendering ensures proper stacking context
- Focus management integrates with screen readers and keyboard navigation
- The component context enables communication between compound components
