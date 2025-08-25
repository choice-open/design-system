# Modal

A versatile overlay component for displaying focused content and gathering user input. Provides structured layout with header, content, and footer sections, along with specialized input components for modal contexts.

## Import

```tsx
import { Modal } from "@choiceform/design-system"
```

## Features

- Structured layout with header, content, and footer sections
- Flexible header with support for custom elements (tabs, selects, navigation)
- Customizable sizing and positioning
- Specialized input components for modal contexts
- Footer with action buttons
- Proper focus management and accessibility
- Support for complex header layouts and interactions

## Usage

### Basic Modal

```tsx
<Modal className="w-md">
  <Modal.Header
    title="Modal Title"
    onClose={() => setOpen(false)}
  />
  <Modal.Content>
    <div className="p-4">Your modal content goes here</div>
  </Modal.Content>
  <Modal.Footer className="justify-end">
    <Button variant="secondary">Cancel</Button>
    <Button>Confirm</Button>
  </Modal.Footer>
</Modal>
```

### Header Variations

```tsx
{
  /* Basic header with close button */
}
;<Modal.Header
  title="Modal Title"
  onClose={() => setOpen(false)}
/>

{
  /* Header with search input */
}
;<Modal.Header
  title="Modal Title"
  onClose={() => setOpen(false)}
>
  <div className="px-2 pb-2 [grid-area:input]">
    <SearchInput />
  </div>
</Modal.Header>

{
  /* Header with navigation */
}
;<Modal.Header
  title={
    <div className="flex items-center gap-2">
      <IconButton>
        <ChevronLeft />
      </IconButton>
      Modal Title
    </div>
  }
/>

{
  /* Header with tabs */
}
;<Modal.Header
  title={
    <Tabs
      value={tab}
      onChange={setTab}
    >
      <Tabs.Item value="tab-1">Tab 1</Tabs.Item>
      <Tabs.Item value="tab-2">Tab 2</Tabs.Item>
      <Tabs.Item value="tab-3">Tab 3</Tabs.Item>
    </Tabs>
  }
/>

{
  /* Header with select */
}
;<Modal.Header
  title={
    <Select
      matchTriggerWidth
      value={select}
      onChange={setSelect}
    >
      <Select.Trigger prefixElement={<ThemeSunBright />}>{select || "Select"}</Select.Trigger>
      <Select.Content>
        <Select.Item value="option-1">Option 1</Select.Item>
        <Select.Item value="option-2">Option 2</Select.Item>
      </Select.Content>
    </Select>
  }
/>

{
  /* Header with action link */
}
;<Modal.Header
  title="Title"
  onClose={() => setOpen(false)}
>
  <div className="flex items-center justify-end">
    <LinkButton>
      <LockAspectRatio />
      Link
    </LinkButton>
  </div>
</Modal.Header>
```

### Specialized Form Elements

```tsx
<Modal>
  <Modal.Header title="Form Modal" />
  <Modal.Content className="flex w-md flex-col gap-4 p-4">
    {/* Modal Input */}
    <Modal.Input
      size="large"
      label="Name"
      placeholder="Enter your name"
      description="This field is required"
      value={input}
      onChange={setInput}
    />

    {/* Modal Textarea */}
    <Modal.Textarea
      label="Description"
      placeholder="Enter description"
      description="Optional field"
      value={textarea}
      onChange={setTextarea}
    />

    {/* Modal Multi-line Input */}
    <Modal.MultiLineInput
      label="Multi-line input"
      placeholder="Enter multi-line text"
      description="Supports multiple lines"
      value={multiLineInput}
      onChange={setMultiLineInput}
    />

    {/* Modal Select */}
    <Modal.Select
      label="Select Option"
      size="large"
      value={select}
      onChange={setSelect}
    >
      <Select.Trigger
        size="large"
        className="gap-2"
      >
        <Avatar
          photo="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
          name="User Name"
          size="small"
        />
        <span className="flex-1 truncate">{select || "Select"}</span>
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="option-1">Option 1</Select.Item>
        <Select.Item value="option-2">Option 2</Select.Item>
      </Select.Content>
    </Modal.Select>

    {/* Complex input with embedded select */}
    <div className="flex w-full items-center gap-2">
      <TextField
        className="flex-1 rounded-lg"
        size="large"
        placeholder="Enter text"
        value={search}
        onChange={setSearch}
      >
        <TextField.Suffix className="px-1">
          <Select
            value={dropdown}
            onChange={setDropdown}
          >
            <Select.Trigger>
              <Select.Value>{dropdown}</Select.Value>
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="option-1">Option 1</Select.Item>
              <Select.Item value="option-2">Option 2</Select.Item>
            </Select.Content>
          </Select>
        </TextField.Suffix>
      </TextField>
      <Button
        className="font-strong rounded-lg px-4"
        size="large"
      >
        Share
      </Button>
    </div>
  </Modal.Content>
</Modal>
```

## Components

### Modal

The root modal container component.

```tsx
interface ModalProps extends Omit<HTMLProps<HTMLDivElement>, "title"> {
  className?: string
  onClose?: () => void
  title?: ReactNode
}
```

### Modal.Header

Header section with title and optional close button.

```tsx
interface ModalHeaderProps {
  title?: ReactNode
  onClose?: () => void
  children?: ReactNode
}
```

### Modal.Content

Main content area of the modal.

```tsx
interface ModalContentProps extends HTMLProps<HTMLDivElement> {
  className?: string
}
```

### Modal.Footer

Footer section for action buttons.

```tsx
interface ModalFooterProps extends HTMLProps<HTMLDivElement> {
  className?: string
}
```

### Modal.Input

Specialized input component for modals.

```tsx
interface ModalInputProps {
  label?: string
  placeholder?: string
  description?: string
  size?: "default" | "large"
  value: string
  onChange: (value: string) => void
}
```

### Modal.Textarea

Specialized textarea component for modals.

```tsx
interface ModalTextareaProps {
  label?: string
  placeholder?: string
  description?: string
  value: string
  onChange: (value: string) => void
}
```

### Modal.MultiLineInput

Specialized multi-line input component for modals.

```tsx
interface ModalMultiLineInputProps {
  label?: string
  placeholder?: string
  description?: string
  value: string
  onChange: (value: string) => void
}
```

### Modal.Select

Specialized select wrapper for modals.

```tsx
interface ModalSelectProps {
  label?: string
  size?: "default" | "large"
  value: string
  onChange: (value: string) => void
  children: ReactNode
}
```

## Styling

- Uses Tailwind CSS via `tailwind-variants` for consistent styling
- Customizable with `className` prop
- Responsive design with proper spacing and typography
- Dark mode support through CSS variables

## Best Practices

### Usage Guidelines

- Use for important interactions that require focused attention
- Structure content with clear headers and organized body content
- Include appropriate action buttons in the footer
- Consider responsive behavior for different screen sizes
- Limit the number of interactive elements to maintain focus

### Header Design

- Use simple titles for basic modals
- Integrate tabs for content organization
- Include navigation elements when needed
- Add action buttons or links in the header area when appropriate

### Form Integration

- Use Modal.Input, Modal.Textarea, and Modal.MultiLineInput for consistent styling
- Provide clear labels and helpful descriptions
- Group related form elements logically
- Include proper validation feedback

### Accessibility

- Manages focus properly when opened and closed
- Traps focus within the modal when open
- Supports keyboard navigation and dismissal
- Provides appropriate ARIA roles and attributes
- Ensures adequate contrast for all elements

## Examples

### Confirmation Modal

```tsx
<Modal className="w-sm">
  <Modal.Header
    title="Confirm Action"
    onClose={() => setOpen(false)}
  />
  <Modal.Content>
    <div className="p-4">
      Are you sure you want to delete this item? This action cannot be undone.
    </div>
  </Modal.Content>
  <Modal.Footer className="justify-end">
    <Button
      variant="secondary"
      onClick={() => setOpen(false)}
    >
      Cancel
    </Button>
    <Button
      variant="destructive"
      onClick={handleDelete}
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>
```

### Settings Modal with Tabs

```tsx
<Modal className="w-lg">
  <Modal.Header
    title={
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.Item value="general">General</Tabs.Item>
        <Tabs.Item value="privacy">Privacy</Tabs.Item>
        <Tabs.Item value="security">Security</Tabs.Item>
      </Tabs>
    }
  />
  <Modal.Content>
    <div className="p-4">{/* Tab content based on activeTab */}</div>
  </Modal.Content>
</Modal>
```

## Notes

- Modal components are designed to work together as a cohesive system
- Header can contain complex UI elements like tabs, selects, and navigation
- Specialized form components maintain consistent styling within modals
- Focus management ensures proper accessibility behavior
- Flexible layout system accommodates various modal sizes and content types
