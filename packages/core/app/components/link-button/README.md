# LinkButton Component

A versatile component that renders as either a semantic HTML link (`<a>`) or button (`<button>`) based on the presence of an `href` prop. This component provides consistent styling and behavior while maintaining proper accessibility and security practices.

## Overview

The LinkButton component automatically determines its rendered element type based on props:

- **With `href`**: Renders as an `<a>` element with automatic security enhancements for external links
- **Without `href`**: Renders as a `<button>` element with standard button behavior

## Usage

### As a Button

```tsx
import { LinkButton } from "~/components/link-button"

export function ButtonExample() {
  return <LinkButton onClick={() => alert("Button clicked!")}>Click me</LinkButton>
}
```

### As an Internal Link

```tsx
import { LinkButton } from "~/components/link-button"

export function InternalLinkExample() {
  return <LinkButton href="/dashboard">Go to Dashboard</LinkButton>
}
```

### As an External Link

```tsx
import { LinkButton } from "~/components/link-button"

export function ExternalLinkExample() {
  return <LinkButton href="https://github.com">Visit GitHub</LinkButton>
}
```

## Props

| Prop        | Type                    | Default     | Description                                                     |
| ----------- | ----------------------- | ----------- | --------------------------------------------------------------- |
| `children`  | `ReactNode`             | -           | The content to display inside the link/button                   |
| `href`      | `string`                | -           | URL for link navigation. When present, renders as `<a>` element |
| `variant`   | `"default" \| "subtle"` | `"default"` | Visual style variant                                            |
| `disabled`  | `boolean`               | `false`     | Whether the component is disabled                               |
| `className` | `string`                | -           | Additional CSS classes                                          |
| `onClick`   | `function`              | -           | Click handler (button mode only)                                |
| `target`    | `string`                | -           | Link target (auto-set to `_blank` for external links)           |
| `rel`       | `string`                | -           | Link relationship (auto-enhanced for external links)            |

### Additional Props

- **Button mode**: Accepts all standard `ButtonHTMLAttributes`
- **Link mode**: Accepts all standard `AnchorHTMLAttributes`

## Variants

### Default

Standard accent color styling with hover underline effect.

```tsx
<LinkButton
  href="/example"
  variant="default"
>
  Default Style
</LinkButton>
```

### Subtle

Muted styling with underline and hover color change.

```tsx
<LinkButton
  href="/example"
  variant="subtle"
>
  Subtle Style
</LinkButton>
```

## Security Features

The LinkButton component automatically enhances security for external links:

### Automatic Security Attributes

- **External links**: Automatically receive `target="_blank"` and `rel="noopener noreferrer"`
- **Protocol-relative links**: Links starting with `//` also get security attributes
- **Internal links**: No additional attributes added

```tsx
// Internal link - no security attributes needed
<LinkButton href="/internal-page">Internal Navigation</LinkButton>

// External link - automatically secured
<LinkButton href="https://external-site.com">External Site</LinkButton>
// Renders: <a href="https://external-site.com" target="_blank" rel="noopener noreferrer">

// Protocol-relative link - also secured
<LinkButton href="//cdn.example.com">CDN Resource</LinkButton>
```

## Accessibility Features

### Keyboard Navigation

- Both links and buttons are focusable via keyboard
- Proper focus ring styling with `focus-visible`
- Focus order follows DOM structure

### Disabled State Handling

```tsx
// Disabled link - removes href and prevents focus
<LinkButton disabled href="/example">Disabled Link</LinkButton>

// Disabled button - standard disabled attribute
<LinkButton disabled onClick={() => {}}>Disabled Button</LinkButton>
```

### ARIA Attributes

- Disabled state communicated via `aria-disabled`
- Proper semantic roles maintained (`<a>` vs `<button>`)
- Focus management for disabled states

## Examples

### With Icons

```tsx
import { Settings } from "@choiceform/icons-react"
import { LinkButton } from "~/components/link-button"

export function IconExample() {
  return (
    <div className="flex flex-col gap-3">
      <LinkButton
        href="/home"
        className="gap-1"
      >
        <Settings
          width={16}
          height={16}
        />
        Home
      </LinkButton>

      <LinkButton
        href="/settings"
        variant="subtle"
        className="gap-1"
      >
        <Settings
          width={16}
          height={16}
        />
        Settings
      </LinkButton>
    </div>
  )
}
```

### Navigation Menu

```tsx
export function NavigationExample() {
  return (
    <nav className="flex gap-4">
      <LinkButton
        href="/dashboard"
        variant="default"
      >
        Dashboard
      </LinkButton>
      <LinkButton
        href="/projects"
        variant="subtle"
      >
        Projects
      </LinkButton>
      <LinkButton
        href="/settings"
        variant="subtle"
      >
        Settings
      </LinkButton>
    </nav>
  )
}
```

### Disabled States

```tsx
export function DisabledExample() {
  return (
    <div className="flex gap-4">
      <LinkButton
        disabled
        href="/example"
      >
        Disabled Link
      </LinkButton>
      <LinkButton
        disabled
        onClick={() => alert("Won't fire")}
      >
        Disabled Button
      </LinkButton>
    </div>
  )
}
```

## Best Practices

### When to Use

- **Navigation**: Use with `href` for page navigation
- **Actions**: Use without `href` for triggering JavaScript functions
- **External resources**: Automatic security for external links
- **Consistent styling**: When you need button-like styling for both links and buttons

### Styling Guidelines

- **Default variant**: Use for primary navigation or important actions
- **Subtle variant**: Use for secondary actions or footer links
- **Icons**: Include relevant icons to improve visual hierarchy
- **Spacing**: Use consistent gap classes when combining with icons

### Accessibility Considerations

1. Always provide descriptive text content
2. Use semantic HTML advantages (crawlable links vs action buttons)
3. Test keyboard navigation flow
4. Ensure sufficient color contrast for both variants
5. Consider screen reader announcements for external links

### Performance

- Lightweight component with minimal JavaScript
- Efficient conditional rendering
- No unnecessary re-renders
- Tree-shakable imports
