# Kbd

A keyboard shortcut display component that renders keyboard key combinations using platform-appropriate symbols and proper semantic markup.

## Import

```tsx
import { Kbd } from "@choiceform/design-system"
```

## Features

- Platform-appropriate key symbols (⌘, ⇧, ⌃, ⌥, etc.)
- Support for single keys or key combinations
- Semantic `kbd` element for proper accessibility
- Automatic key symbol mapping with descriptive tooltips
- Flexible key input (string or array)
- Consistent typography and spacing

## Usage

### Single key

```tsx
<Kbd keys="command">K</Kbd>
```

### Multiple key combinations

```tsx
<Kbd keys={["command", "shift"]}>K</Kbd>
<Kbd keys={["command", "shift", "option"]}>K</Kbd>
<Kbd keys={["command", "shift", "option", "ctrl"]}>K</Kbd>
```

### Common shortcuts

```tsx
<Kbd keys="command">S</Kbd>          {/* Save */}
<Kbd keys={["command", "shift"]}>S</Kbd>    {/* Save As */}
<Kbd keys="escape">Cancel</Kbd>              {/* Cancel */}
<Kbd keys="enter">Submit</Kbd>               {/* Submit */}
<Kbd keys={["ctrl", "c"]}>Copy</Kbd>         {/* Copy */}
```

### Arrow keys

```tsx
<Kbd keys="up" />
<Kbd keys="down" />
<Kbd keys="left" />
<Kbd keys="right" />
```

### Function and special keys

```tsx
<Kbd keys="delete">Delete</Kbd>
<Kbd keys="backspace">Backspace</Kbd>
<Kbd keys="tab">Tab</Kbd>
<Kbd keys="space">Space</Kbd>
<Kbd keys="capslock">Caps Lock</Kbd>
```

### Page navigation

```tsx
<Kbd keys="pageup">Page Up</Kbd>
<Kbd keys="pagedown">Page Down</Kbd>
<Kbd keys="home">Home</Kbd>
<Kbd keys="end">End</Kbd>
```

## Available Keys

The component supports the following keys with their corresponding symbols:

| Key         | Symbol | Description                    |
| ----------- | ------ | ------------------------------ |
| `command`   | ⌘      | Command key (macOS)            |
| `windows`   | ⊞      | Windows key                    |
| `shift`     | ⇧      | Shift key                      |
| `ctrl`      | ⌃      | Control key                    |
| `option`    | ⌥      | Option key (macOS)             |
| `alt`       | ⌥      | Alt key (same as option)       |
| `enter`     | ↵      | Enter/Return key               |
| `delete`    | ⌫      | Delete key                     |
| `backspace` | ⌫      | Backspace key (same as delete) |
| `escape`    | ⎋      | Escape key                     |
| `tab`       | ⇥      | Tab key                        |
| `capslock`  | ⇪      | Caps Lock key                  |
| `up`        | ↑      | Up arrow                       |
| `right`     | →      | Right arrow                    |
| `down`      | ↓      | Down arrow                     |
| `left`      | ←      | Left arrow                     |
| `pageup`    | ⇞      | Page Up key                    |
| `pagedown`  | ⇟      | Page Down key                  |
| `home`      | ↖     | Home key                       |
| `end`       | ↘     | End key                        |
| `help`      | ?      | Help key                       |
| `space`     | ␣      | Space bar                      |

## Props

```ts
interface KbdProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Text content to display after the key symbols */
  children?: React.ReactNode

  /** Additional CSS class names */
  className?: string

  /** Key or array of keys to display */
  keys?: KbdKey | KbdKey[]
}

type KbdKey =
  | "command"
  | "windows"
  | "shift"
  | "ctrl"
  | "option"
  | "alt"
  | "enter"
  | "delete"
  | "backspace"
  | "escape"
  | "tab"
  | "capslock"
  | "up"
  | "right"
  | "down"
  | "left"
  | "pageup"
  | "pagedown"
  | "home"
  | "end"
  | "help"
  | "space"
```

- Defaults:
  - No default keys; component can be used with just children for plain text
  - Keys render as symbols with descriptive tooltips

- Accessibility:
  - Uses semantic `kbd` element
  - Key symbols have `abbr` elements with full key names as titles
  - Screen readers announce the full key names, not just symbols

## Styling

- This component uses Tailwind CSS via `tailwind-variants` in `tv.ts` to create consistent styling.
- Customize using the `className` prop; classes are merged with the component's internal classes.
- Slots available in `tv.ts`: `base`, `abbr`.

## Best practices

- Use platform-appropriate key combinations (Command on macOS, Ctrl on Windows/Linux)
- Keep keyboard shortcuts intuitive and follow common conventions
- Provide clear labels when the action isn't obvious from the keys alone
- Group related shortcuts together in documentation or help text
- Consider offering alternatives for users who can't use certain key combinations

## Examples

### Menu shortcuts

```tsx
<div className="space-y-2">
  <div className="flex justify-between">
    <span>Save</span>
    <Kbd keys="command">S</Kbd>
  </div>
  <div className="flex justify-between">
    <span>Save As...</span>
    <Kbd keys={["command", "shift"]}>S</Kbd>
  </div>
  <div className="flex justify-between">
    <span>Open</span>
    <Kbd keys="command">O</Kbd>
  </div>
  <div className="flex justify-between">
    <span>Find</span>
    <Kbd keys="command">F</Kbd>
  </div>
</div>
```

### Text editor shortcuts

```tsx
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <span>Bold:</span>
    <Kbd keys="command">B</Kbd>
  </div>
  <div className="flex items-center gap-2">
    <span>Italic:</span>
    <Kbd keys="command">I</Kbd>
  </div>
  <div className="flex items-center gap-2">
    <span>Undo:</span>
    <Kbd keys="command">Z</Kbd>
  </div>
  <div className="flex items-center gap-2">
    <span>Redo:</span>
    <Kbd keys={["command", "shift"]}>Z</Kbd>
  </div>
</div>
```

### Navigation help

```tsx
<div className="space-y-1 text-sm">
  <p>Use arrow keys to navigate:</p>
  <div className="flex gap-2">
    <Kbd keys="up" />
    <Kbd keys="down" />
    <Kbd keys="left" />
    <Kbd keys="right" />
  </div>
  <p>
    Press <Kbd keys="enter">Enter</Kbd> to select or <Kbd keys="escape">Escape</Kbd> to cancel
  </p>
</div>
```

### Cross-platform shortcuts

```tsx
// Show different shortcuts based on platform
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

<div className="flex items-center gap-2">
  <span>Copy:</span>
  <Kbd keys={isMac ? "command" : "ctrl"}>C</Kbd>
</div>
```

## Notes

- Key symbols are designed to be universally recognizable across different platforms
- The component automatically handles spacing between multiple keys
- Tooltips on key symbols provide full key names for accessibility
- Keys are rendered in the order provided in the array
- Children content appears after all key symbols
