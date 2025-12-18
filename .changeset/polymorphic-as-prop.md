---
"@choice-ui/modal": minor
"@choice-ui/dialog": minor
"@choice-ui/popover": minor
"@choice-ui/list": minor
"@choice-ui/scroll-area": minor
---

feat: add polymorphic `as` prop support to multiple components

- **Modal**: Add `as` prop to render as different element types
- **Dialog**: Add `as` prop for form integration (e.g., `as="form"` with `onSubmit`)
- **Popover**: Add `as` prop for form integration
- **List**: Add `as` prop to List root, List.Content, and List.Item components
  - List.Content: Use `as="ul"` for semantic unordered lists
  - List.Item: Use `as="li"` for list items, or `as="a"` for links (with `href`, `target`, `rel` props)
- **ScrollArea.Content**: Add `as` prop support

This enables better semantic HTML structure and native form functionality without needing to wrap components in intermediate elements.
