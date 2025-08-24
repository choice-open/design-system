# Tooltip

A lightweight floating component for displaying helpful information on hover or focus. Supports multiple positioning options, keyboard shortcuts display, and delay groups for smooth user experience.

## Import

```tsx
import { Tooltip, TooltipProvider } from "@choiceform/design-system"
```

## Features

- Two API styles: simple prop-based and compound component
- Multiple positioning options (12 placements)
- Visual variants (default and light)
- Keyboard shortcut display support
- Delay groups for smooth multi-tooltip experiences
- Configurable offset and arrow display
- Proper accessibility with ARIA support
- Optimized hover behavior to prevent flickering

## Usage

### Simple API (Recommended)

The simple API uses the `content` prop for quick tooltip implementation:

```tsx
{
  /* Basic tooltip */
}
;<Tooltip content="Basic tooltip">
  <Button>Basic Tooltip</Button>
</Tooltip>

{
  /* With keyboard shortcut */
}
;<Tooltip
  content="Save file"
  shortcut={{
    modifier: ["command"],
    keys: "S",
  }}
>
  <Button>Save</Button>
</Tooltip>

{
  /* Without arrow */
}
;<Tooltip
  content="Tooltip without arrow"
  withArrow={false}
>
  <Button>No Arrow</Button>
</Tooltip>

{
  /* Disabled tooltip */
}
;<Tooltip
  content="This tooltip is disabled"
  disabled={true}
>
  <Button>Disabled</Button>
</Tooltip>
```

### Compound Component API

For more control over tooltip structure:

```tsx
<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>This is a tooltip</TooltipContent>
</Tooltip>
```

### Variants

```tsx
{
  /* Default variant (dark) */
}
;<Tooltip
  content="Default style"
  variant="default"
>
  <Button>Default</Button>
</Tooltip>

{
  /* Light variant */
}
;<Tooltip
  content="Light style"
  variant="light"
>
  <Button>Light</Button>
</Tooltip>
```

### Custom Offset

```tsx
{
  /* Large offset */
}
;<Tooltip
  content="Large offset"
  offset={20}
>
  <Button>Large Offset</Button>
</Tooltip>

{
  /* Small offset */
}
;<Tooltip
  content="Small offset"
  offset={2}
>
  <Button>Small Offset</Button>
</Tooltip>
```

### Placements

All 12 Floating UI placements are supported:

```tsx
{/* Top placements */}
<Tooltip placement="top-start">
  <TooltipTrigger><Button>Top Start</Button></TooltipTrigger>
  <TooltipContent>Top start placement</TooltipContent>
</Tooltip>

<Tooltip placement="top">
  <TooltipTrigger><Button>Top</Button></TooltipTrigger>
  <TooltipContent>Top placement</TooltipContent>
</Tooltip>

<Tooltip placement="top-end">
  <TooltipTrigger><Button>Top End</Button></TooltipTrigger>
  <TooltipContent>Top end placement</TooltipContent>
</Tooltip>

{/* Bottom placements */}
<Tooltip placement="bottom-start">
  <TooltipTrigger><Button>Bottom Start</Button></TooltipTrigger>
  <TooltipContent>Bottom start placement</TooltipContent>
</Tooltip>

<Tooltip placement="bottom">
  <TooltipTrigger><Button>Bottom</Button></TooltipTrigger>
  <TooltipContent>Bottom placement</TooltipContent>
</Tooltip>

<Tooltip placement="bottom-end">
  <TooltipTrigger><Button>Bottom End</Button></TooltipTrigger>
  <TooltipContent>Bottom end placement</TooltipContent>
</Tooltip>

{/* Left placements */}
<Tooltip placement="left-start">
  <TooltipTrigger><Button>Left Start</Button></TooltipTrigger>
  <TooltipContent>Left start placement</TooltipContent>
</Tooltip>

<Tooltip placement="left">
  <TooltipTrigger><Button>Left</Button></TooltipTrigger>
  <TooltipContent>Left placement</TooltipContent>
</Tooltip>

<Tooltip placement="left-end">
  <TooltipTrigger><Button>Left End</Button></TooltipTrigger>
  <TooltipContent>Left end placement</TooltipContent>
</Tooltip>

{/* Right placements */}
<Tooltip placement="right-start">
  <TooltipTrigger><Button>Right Start</Button></TooltipTrigger>
  <TooltipContent>Right start placement</TooltipContent>
</Tooltip>

<Tooltip placement="right">
  <TooltipTrigger><Button>Right</Button></TooltipTrigger>
  <TooltipContent>Right placement</TooltipContent>
</Tooltip>

<Tooltip placement="right-end">
  <TooltipTrigger><Button>Right End</Button></TooltipTrigger>
  <TooltipContent>Right end placement</TooltipContent>
</Tooltip>
```

### Delay Groups

Use `TooltipProvider` to create smooth tooltip experiences across multiple elements:

```tsx
<TooltipProvider
  delay={{
    open: 400,
    close: 200,
  }}
>
  <div className="flex gap-4">
    <Tooltip>
      <TooltipTrigger>
        <Button>First</Button>
      </TooltipTrigger>
      <TooltipContent>First tooltip - 400ms delay initially</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>
        <Button>Second</Button>
      </TooltipTrigger>
      <TooltipContent>Second tooltip - instant when moving from first</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>
        <Button>Third</Button>
      </TooltipTrigger>
      <TooltipContent>Third tooltip - instant when moving from others</TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
```

### Keyboard Shortcuts

Display keyboard shortcuts in tooltips:

```tsx
{
  /* Command + K */
}
;<Tooltip
  content="Save file"
  shortcut={{ modifier: ["command"], keys: "K" }}
>
  <Button>Command + K</Button>
</Tooltip>

{
  /* Ctrl + A */
}
;<Tooltip
  content="Select all"
  shortcut={{ modifier: ["ctrl"], keys: "A" }}
>
  <Button>Ctrl + A</Button>
</Tooltip>

{
  /* Shift + A */
}
;<Tooltip
  content="Shift shortcut"
  shortcut={{ modifier: ["shift"], keys: "A" }}
>
  <Button>Shift + A</Button>
</Tooltip>
```

### All Variants with Placements

```tsx
<TooltipProvider delay={{ open: 400, close: 200 }}>
  <div className="grid grid-cols-4 gap-4">
    {["default", "light"].map((variant) =>
      ["right", "left", "top", "bottom"].map((placement) => (
        <Tooltip
          key={`${placement}-${variant}`}
          placement={placement as Placement}
        >
          <TooltipTrigger>
            <Button variant="secondary">
              {placement} / {variant}
            </Button>
          </TooltipTrigger>
          <TooltipContent variant={variant as "default" | "light"}>
            {placement} / {variant}
          </TooltipContent>
        </Tooltip>
      )),
    )}
  </div>
</TooltipProvider>
```

## Props

### Tooltip (Simple API)

```tsx
interface TooltipProps {
  /** Child elements (typically the trigger) */
  children?: React.ReactNode

  /** Additional CSS classes */
  className?: string

  /** Tooltip content (enables simple API) */
  content?: React.ReactNode

  /** Disable the tooltip */
  disabled?: boolean

  /** Distance from trigger element */
  offset?: number

  /** Open state change callback */
  onOpenChange?: (open: boolean) => void

  /** Controlled open state */
  open?: boolean

  /** Tooltip placement */
  placement?: Placement

  /** Portal container ID */
  portalId?: string

  /** Keyboard shortcut display */
  shortcut?: {
    keys?: ReactNode
    modifier?: KbdKey[]
  }

  /** Visual variant */
  variant?: "default" | "light"

  /** Show/hide arrow */
  withArrow?: boolean
}
```

- Defaults:
  - `disabled`: `false`
  - `offset`: `8`
  - `variant`: `"default"`
  - `withArrow`: `true`
  - `portalId`: `"floating-tooltip-root"`

### TooltipProvider

```tsx
interface TooltipProviderProps {
  children: React.ReactNode
  delay?: {
    open?: number
    close?: number
  }
}
```

### TooltipTrigger

Compound component trigger - accepts any React element as children.

### TooltipContent

```tsx
interface TooltipContentProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "light"
  withArrow?: boolean
  portalId?: string
}
```

## Components

### Tooltip

The main tooltip component that supports both simple and compound APIs.

### TooltipProvider

Wraps multiple tooltips to enable delay groups and smooth transitions.

### TooltipTrigger

The trigger element for compound component usage.

### TooltipContent

The content container for compound component usage.

## Styling

- Uses Tailwind CSS via `tailwind-variants`
- Two variants: `default` (dark) and `light`
- Customizable with `className` prop
- Arrow styling matches content variant
- Smooth fade transitions
- Responsive positioning

## Best Practices

### Usage Guidelines

- Use for helpful, non-essential information
- Keep content concise and scannable
- Don't use for critical information users must see
- Consider delay groups for multiple related tooltips
- Include keyboard shortcuts when relevant

### Content Guidelines

- Write clear, helpful descriptions
- Use sentence case for consistency
- Keep text brief (ideally under 10 words)
- Don't repeat information already visible on screen

### Accessibility

- Tooltips appear on both hover and focus
- Proper ARIA attributes for screen readers
- Keyboard navigation support (ESC to close)
- Content is announced to assistive technologies
- Focus remains on trigger element

### Performance

- Optimized hover behavior prevents flickering
- Lazy loading of tooltip content
- Efficient positioning calculations
- Memory management for delay groups

## Examples

### Icon Button with Tooltip

```tsx
<Tooltip content="Delete item">
  <IconButton variant="destructive">
    <TrashIcon />
  </IconButton>
</Tooltip>
```

### Action Button with Shortcut

```tsx
<Tooltip
  content="Create new document"
  shortcut={{ modifier: ["command"], keys: "N" }}
>
  <Button>
    <PlusIcon />
    New
  </Button>
</Tooltip>
```

### Disabled Button with Explanation

```tsx
<Tooltip
  content="Save is disabled until all required fields are completed"
  variant="light"
>
  <Button disabled>Save</Button>
</Tooltip>
```

### Complex Tooltip with Compound API

```tsx
<Tooltip placement="bottom">
  <TooltipTrigger>
    <div className="rounded border p-2">Complex trigger element</div>
  </TooltipTrigger>
  <TooltipContent
    variant="light"
    className="max-w-xs"
  >
    <div className="space-y-1">
      <div className="font-strong">Complex Content</div>
      <div className="text-body-small">
        This tooltip contains multiple lines and rich formatting.
      </div>
    </div>
  </TooltipContent>
</Tooltip>
```

### Toolbar with Delay Group

```tsx
<TooltipProvider delay={{ open: 500, close: 100 }}>
  <div className="flex items-center gap-1 rounded border p-2">
    <Tooltip content="Bold">
      <IconButton>
        <BoldIcon />
      </IconButton>
    </Tooltip>
    <Tooltip content="Italic">
      <IconButton>
        <ItalicIcon />
      </IconButton>
    </Tooltip>
    <Tooltip content="Underline">
      <IconButton>
        <UnderlineIcon />
      </IconButton>
    </Tooltip>
  </div>
</TooltipProvider>
```

## Notes

- Simple API (with `content` prop) is recommended for most use cases
- Compound API provides more control over tooltip structure
- Delay groups create smooth experiences when users move between tooltips quickly
- Keyboard shortcuts are automatically formatted using the `Kbd` component
- Tooltips are portal-rendered to avoid z-index issues
- Both APIs support the same positioning and styling options
- TooltipProvider manages timing and prevents tooltip flicker during rapid movements
