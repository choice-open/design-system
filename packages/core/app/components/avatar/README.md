# Avatar

A flexible user avatar component that displays profile photos, initial letters, or a fallback icon. It includes automatic color contrast detection and multiple visual states.

## Import

```tsx
import { Avatar } from "@choice-ui/react"
```

## Features

- Three display modes: photo, initial letter, or default icon
- Automatic color contrast detection for text
- Image loading states with skeleton animation
- Progressive enhancement with graceful fallbacks
- Multiple sizes and visual state variants
- Performance optimized with memoization
- Accessible with proper alt text support

## Usage

### Basic

```tsx
// With photo
<Avatar photo="/user-photo.jpg" name="John Doe" />

// With initial letter (no photo)
<Avatar name="John Doe" />

// Default icon (no photo or name)
<Avatar />
```

### Sizes

```tsx
<Avatar size="small" name="Jane" />
<Avatar size="medium" name="Jane" />  // default
<Avatar size="large" name="Jane" />
```

### Custom Colors

```tsx
<Avatar name="John" color="#6B46C1" />
<Avatar name="Jane" color="#DC2626" />
<Avatar name="Alex" color="#059669" />
```

### Visual States

```tsx
// Default state
<Avatar name="John" states="default" />

// With dash indicator
<Avatar name="John" states="dash" />

// With solid border ring
<Avatar name="John" states="design" />

// With dashed border ring
<Avatar name="John" states="spotlight" />
```

### With Children

```tsx
<Avatar
  photo="/user.jpg"
  name="John"
>
  <span className="status-indicator" />
</Avatar>
```

## Props

```ts
interface AvatarProps extends Omit<HTMLProps<HTMLDivElement>, "size"> {
  /** Additional content to render inside avatar */
  children?: React.ReactNode

  /** Background color for letter avatars (default: "#d3d3d3") */
  color?: string

  /** User's name (used for initial letter fallback) */
  name?: string

  /** URL to user's photo */
  photo?: string

  /** Avatar size variant */
  size?: "small" | "medium" | "large"

  /** Visual state variant */
  states?: "default" | "dash" | "design" | "spotlight"
}
```

- Defaults:
  - `size`: "medium"
  - `color`: "#d3d3d3"
  - `states`: "default"

## Styling

- Component uses Tailwind Variants for consistent styling
- Size dimensions:
  - small: 16x16 pixels
  - medium: 24x24 pixels
  - large: 32x32 pixels
- Automatically adjusts text color based on background color brightness
- Custom background colors work with the initial letter display

## Best Practices

- Always provide `name` for better fallback experience
- Use consistent avatar sizes within the same context
- Consider using the `states` prop to indicate user status or roles
- Provide meaningful alt text through the `name` prop
- Use web-optimized images for better performance

## Examples

### User List

```tsx
const users = [
  { id: 1, name: "Alice Johnson", photo: "/alice.jpg" },
  { id: 2, name: "Bob Smith", photo: "/bob.jpg" },
  { id: 3, name: "Charlie Brown" }, // No photo
]

<div className="flex gap-2">
  {users.map(user => (
    <Avatar
      key={user.id}
      name={user.name}
      photo={user.photo}
      size="medium"
    />
  ))}
</div>
```

### Team Member with Status

```tsx
<div className="flex items-center gap-2">
  <Avatar
    photo="/team-member.jpg"
    name="Sarah Connor"
    states="design"
    size="large"
  />
  <div>
    <div className="font-strong">Sarah Connor</div>
    <div className="text-body-small text-gray-500">Designer</div>
  </div>
</div>
```

### Avatar Group

```tsx
<div className="flex -space-x-2">
  <Avatar
    name="User 1"
    color="#EF4444"
  />
  <Avatar
    name="User 2"
    color="#3B82F6"
  />
  <Avatar
    name="User 3"
    color="#10B981"
  />
  <Avatar
    name="User 4"
    color="#8B5CF6"
  />
</div>
```

## Notes

- The component automatically extracts the first letter from the `name` prop
- Text color (white or black) is determined automatically based on background brightness
- Images are lazy-loaded with a smooth skeleton animation
- Failed image loads gracefully fall back to initial letter display
- The component is wrapped in `React.memo()` for performance optimization
