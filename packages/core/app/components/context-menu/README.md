# ContextMenu

A right-click context menu component that provides contextual actions for any element. Built on @floating-ui/react, it shares the same menu components as Dropdown for consistency and code reuse. Supports nested menus, keyboard navigation, and custom positioning.

## Import

```tsx
import { ContextMenu } from "@choiceform/design-system"
```

## Features

- Right-click triggered menus with virtual cursor positioning
- Shares menu components with Dropdown (write once, use everywhere)
- Nested submenus with hover activation
- Full keyboard navigation (arrow keys, Enter, Escape)
- Automatic viewport boundary detection and repositioning
- Selection mode for indicating active states
- Accessible with proper ARIA attributes
- TypeScript support with full type safety

## Usage

### Basic

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <div>Right click me</div>
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Item>
      <ContextMenu.Value>Copy</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item>
      <ContextMenu.Value>Paste</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item>
      <ContextMenu.Value>Delete</ContextMenu.Value>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

### With sections

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <div className="file-item">Document.pdf</div>
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Label>File Operations</ContextMenu.Label>
    <ContextMenu.Item>
      <ContextMenu.Value>Open</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item>
      <ContextMenu.Value>Rename</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item variant="danger">
      <ContextMenu.Value>Delete</ContextMenu.Value>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

### Nested menus

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <div>Right click for nested menu</div>
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Item>
      <ContextMenu.Value>Cut</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item>
      <ContextMenu.Value>Copy</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu>
      <ContextMenu.SubTrigger>
        <ContextMenu.Value>Share</ContextMenu.Value>
      </ContextMenu.SubTrigger>
      <ContextMenu.Content>
        <ContextMenu.Item>
          <ContextMenu.Value>Email</ContextMenu.Value>
        </ContextMenu.Item>
        <ContextMenu.Item>
          <ContextMenu.Value>Messages</ContextMenu.Value>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  </ContextMenu.Content>
</ContextMenu>
```

### Shared menu content with Dropdown

```tsx
// Define menu content once
const fileMenu = (
  <Dropdown.Content>
    <Dropdown.Label>File</Dropdown.Label>
    <Dropdown.Item>
      <Dropdown.Value>New</Dropdown.Value>
    </Dropdown.Item>
    <Dropdown.Item>
      <Dropdown.Value>Open</Dropdown.Value>
    </Dropdown.Item>
    <Dropdown.Item>
      <Dropdown.Value>Save</Dropdown.Value>
    </Dropdown.Item>
  </Dropdown.Content>
)

// Use in Dropdown
<Dropdown>
  <Dropdown.Trigger>
    <Dropdown.Value>File</Dropdown.Value>
  </Dropdown.Trigger>
  {fileMenu}
</Dropdown>

// Use in ContextMenu
<ContextMenu>
  <ContextMenu.Target>
    <div>Workspace area</div>
  </ContextMenu.Target>
  {fileMenu}
</ContextMenu>
```

### Selection mode

```tsx
const [theme, setTheme] = useState("light")

<ContextMenu selection>
  <ContextMenu.Target>
    <div>Right click to change theme</div>
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Label>Theme</ContextMenu.Label>
    <ContextMenu.Item
      selected={theme === "light"}
      onMouseUp={() => setTheme("light")}
    >
      <ContextMenu.Value>Light</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item
      selected={theme === "dark"}
      onMouseUp={() => setTheme("dark")}
    >
      <ContextMenu.Value>Dark</ContextMenu.Value>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

### With icons and shortcuts

```tsx
import { Copy, Paste, Delete } from "@choiceform/icons-react"
;<ContextMenu>
  <ContextMenu.Target>
    <div>Right click for actions</div>
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Item>
      <Copy />
      <ContextMenu.Value>Copy</ContextMenu.Value>
      <Kbd keys="cmd">C</Kbd>
    </ContextMenu.Item>
    <ContextMenu.Item>
      <Paste />
      <ContextMenu.Value>Paste</ContextMenu.Value>
      <Kbd keys="cmd">V</Kbd>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item variant="danger">
      <Delete />
      <ContextMenu.Value>Delete</ContextMenu.Value>
      <Kbd>Delete</Kbd>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

## Props

```ts
interface ContextMenuProps {
  /** Child components (Target and Content) */
  children?: ReactNode

  /** Distance from cursor position */
  offset?: number

  /** Callback when menu open state changes */
  onOpenChange?: (open: boolean) => void

  /** Controlled open state */
  open?: boolean

  /** Fallback placement for nested menus */
  placement?: Placement

  /** ID of portal container element */
  portalId?: string

  /** Enable selection indicators */
  selection?: boolean
}
```

- Defaults:
  - `offset`: 4
  - `placement`: "right-start" (for submenus)
  - `selection`: false
  - `portalId`: "floating-menu-root"

- The menu appears at the exact cursor position on right-click
- Submenus open on hover with a slight delay
- All menu items support the same props as Dropdown items

## Styling

- Reuses the same menu component styles as Dropdown
- Content has backdrop blur and shadow for better visibility
- Dark variant available for dark backgrounds
- Customize individual items with `className` prop

## Best practices

- Use semantic Target elements that clearly indicate right-click availability
- Group related actions with labels and dividers
- Place destructive actions at the bottom with danger variant
- Share menu content between Dropdown and ContextMenu when possible
- Keep menu depth to 2-3 levels maximum for usability
- Provide keyboard shortcuts for common actions

## Accessibility

- Proper ARIA roles and attributes
- Full keyboard navigation support
- Focus management when opening/closing
- Screen reader announcements for menu state
- Escape key closes the menu
- Tab key moves focus out of menu

## Keyboard shortcuts

- **Arrow keys** - Navigate between items
- **Enter** - Activate selected item
- **Right Arrow** - Open submenu
- **Left Arrow** - Close submenu
- **Escape** - Close menu
- **Tab** - Close menu and continue tabbing

## Examples

### File explorer context menu

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <FileItem name="Report.pdf" />
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Item onMouseUp={() => openFile()}>
      <ContextMenu.Value>Open</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item onMouseUp={() => openWith()}>
      <ContextMenu.Value>Open With...</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item onMouseUp={() => cutFile()}>
      <ContextMenu.Value>Cut</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item onMouseUp={() => copyFile()}>
      <ContextMenu.Value>Copy</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item onMouseUp={() => renameFile()}>
      <ContextMenu.Value>Rename</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item
      variant="danger"
      onMouseUp={() => deleteFile()}
    >
      <ContextMenu.Value>Delete</ContextMenu.Value>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

### Text editor context menu

```tsx
<ContextMenu>
  <ContextMenu.Target>
    <TextEditor content={content} />
  </ContextMenu.Target>
  <ContextMenu.Content>
    <ContextMenu.Item
      disabled={!hasSelection}
      onMouseUp={() => document.execCommand("cut")}
    >
      <ContextMenu.Value>Cut</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item
      disabled={!hasSelection}
      onMouseUp={() => document.execCommand("copy")}
    >
      <ContextMenu.Value>Copy</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Item
      disabled={!canPaste}
      onMouseUp={() => document.execCommand("paste")}
    >
      <ContextMenu.Value>Paste</ContextMenu.Value>
    </ContextMenu.Item>
    <ContextMenu.Divider />
    <ContextMenu.Item onMouseUp={() => selectAll()}>
      <ContextMenu.Value>Select All</ContextMenu.Value>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>
```

## Notes

- Built on @floating-ui/react for advanced positioning
- Uses FloatingTree for managing nested menu hierarchies
- Virtual positioning ensures menu appears at cursor location
- Safe polygon detection enables smooth mouse movement to submenus
- Component sharing with Dropdown reduces bundle size and maintenance
