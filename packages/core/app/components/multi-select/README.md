# MultiSelect

A powerful multiple selection component that allows users to choose multiple options from a dropdown list, with advanced features like selection limits, exclusive options, custom chip rendering, and comprehensive validation.

## Import

```tsx
import { MultiSelect } from "@choiceform/design-system"
```

## Features

- **Multiple Selection**: Select multiple options with chip-based display
- **Selection Limits**: Configurable minimum and maximum selection constraints
- **Exclusive Options**: Support for mutually exclusive option groups
- **Custom Chip Rendering**: Flexible chip appearance and behavior
- **Validation Messages**: Built-in constraint validation with custom messaging
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys and typeahead
- **Individual Item Removal**: Remove selections via chip close buttons
- **Custom Actions**: Support for non-selection menu actions
- **Size Variants**: Default and large size options
- **Disabled States**: Global and individual item disable support
- **Close Behavior Control**: Configurable menu close behavior after selection

## Usage

### Basic MultiSelect

```tsx
function BasicExample() {
  const [values, setValues] = useState(["option-2", "option-4"])
  
  const options = [
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" },
    { value: "option-3", label: "Option 3" },
    { value: "option-4", label: "Option 4" },
  ]
  
  const getDisplayValue = (value) => 
    options.find(opt => opt.value === value)?.label || value
  
  return (
    <MultiSelect values={values} onChange={setValues}>
      <MultiSelect.Trigger
        placeholder="Select options..."
        getDisplayValue={getDisplayValue}
        className="w-80"
      />
      <MultiSelect.Content>
        <MultiSelect.Label>Available Options</MultiSelect.Label>
        {options.map((option) => (
          <MultiSelect.Item key={option.value} value={option.value}>
            {option.label}
          </MultiSelect.Item>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### With Selection Limits

```tsx
function LimitsExample() {
  const [values, setValues] = useState(["option-2"])
  
  return (
    <MultiSelect
      values={values}
      onChange={setValues}
      maxSelection={3}
      minSelection={1}
    >
      <MultiSelect.Trigger
        placeholder="Select 1-3 options..."
        getDisplayValue={getDisplayValue}
        className="w-80"
      />
      <MultiSelect.Content>
        {options.map((option) => (
          <MultiSelect.Item key={option.value} value={option.value}>
            {option.label}
          </MultiSelect.Item>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### With Icons

```tsx
function IconExample() {
  const [values, setValues] = useState(["attachment", "count"])
  
  const options = [
    { value: "attachment", label: "Attachment Field", icon: <FieldTypeAttachment /> },
    { value: "checkbox", label: "Checkbox Field", icon: <FieldTypeCheckbox /> },
    { value: "count", label: "Count Field", icon: <FieldTypeCount /> },
    { value: "settings", label: "Settings Field", icon: <Settings /> },
  ]
  
  return (
    <MultiSelect
      values={values}
      onChange={setValues}
      maxSelection={3}
    >
      <MultiSelect.Trigger
        placeholder="Select field types..."
        getDisplayValue={getDisplayValue}
        className="w-80"
      />
      <MultiSelect.Content>
        <MultiSelect.Label>Field Types</MultiSelect.Label>
        {options.map((option) => (
          <MultiSelect.Item key={option.value} value={option.value}>
            {option.icon}
            {option.label}
          </MultiSelect.Item>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### With Dividers and Labels

```tsx
function OrganizedExample() {
  const [values, setValues] = useState(["basic-1", "premium-1"])
  
  return (
    <MultiSelect values={values} onChange={setValues}>
      <MultiSelect.Trigger
        placeholder="Select plans..."
        getDisplayValue={getDisplayValue}
        className="w-80"
      />
      <MultiSelect.Content>
        <MultiSelect.Label>Basic Plans</MultiSelect.Label>
        <MultiSelect.Item value="basic-1">Basic - Starter</MultiSelect.Item>
        <MultiSelect.Item value="basic-2">Basic - Professional</MultiSelect.Item>
        
        <MultiSelect.Divider />
        
        <MultiSelect.Label>Premium Plans</MultiSelect.Label>
        <MultiSelect.Item value="premium-1">Premium - Business</MultiSelect.Item>
        <MultiSelect.Item value="premium-2">Premium - Enterprise</MultiSelect.Item>
        
        <MultiSelect.Divider />
        
        <MultiSelect.Label>Custom Solutions</MultiSelect.Label>
        <MultiSelect.Item value="custom-1">Custom - Tailored</MultiSelect.Item>
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### Disabled States

```tsx
{/* Disabled component */}
<MultiSelect values={values} disabled>
  <MultiSelect.Trigger
    placeholder="Select options..."
    getDisplayValue={getDisplayValue}
    className="w-80"
  />
  <MultiSelect.Content>
    {options.map((option) => (
      <MultiSelect.Item key={option.value} value={option.value}>
        {option.label}
      </MultiSelect.Item>
    ))}
  </MultiSelect.Content>
</MultiSelect>

{/* Individual disabled items */}
<MultiSelect values={values} onChange={setValues}>
  <MultiSelect.Trigger
    placeholder="Select options..."
    getDisplayValue={getDisplayValue}
    className="w-80"
  />
  <MultiSelect.Content>
    <MultiSelect.Item value="option-1">Option 1</MultiSelect.Item>
    <MultiSelect.Item value="option-2" disabled>Option 2 (Disabled)</MultiSelect.Item>
    <MultiSelect.Item value="option-3">Option 3</MultiSelect.Item>
  </MultiSelect.Content>
</MultiSelect>
```

### Large Size

```tsx
<MultiSelect
  values={values}
  onChange={setValues}
  size="large"
>
  <MultiSelect.Trigger
    placeholder="Select options..."
    getDisplayValue={getDisplayValue}
    className="w-80"
  />
  <MultiSelect.Content>
    <MultiSelect.Label>Available Options</MultiSelect.Label>
    {options.map((option) => (
      <MultiSelect.Item key={option.value} value={option.value}>
        {option.label}
      </MultiSelect.Item>
    ))}
  </MultiSelect.Content>
</MultiSelect>
```

## Advanced Features

### Exclusive Options

Configure mutually exclusive option groups:

```tsx
function ExclusiveExample() {
  const [values, setValues] = useState([])
  
  return (
    <MultiSelect values={values} onChange={setValues}>
      <MultiSelect.Trigger
        placeholder="Select options..."
        getDisplayValue={getDisplayValue}
        className="w-80"
      />
      <MultiSelect.Content>
        <MultiSelect.Label>Group 1</MultiSelect.Label>
        <MultiSelect.Item value="a" exclusiveIndex={1}>
          Option A (Group 1)
        </MultiSelect.Item>
        <MultiSelect.Item value="b" exclusiveIndex={1}>
          Option B (Group 1)
        </MultiSelect.Item>
        
        <MultiSelect.Divider />
        
        <MultiSelect.Label>Group 2</MultiSelect.Label>
        <MultiSelect.Item value="d" exclusiveIndex={2}>
          Option D (Group 2)
        </MultiSelect.Item>
        <MultiSelect.Item value="e" exclusiveIndex={2}>
          Option E (Group 2)
        </MultiSelect.Item>
        
        <MultiSelect.Divider />
        
        <MultiSelect.Item value="g" exclusiveIndex={-1}>
          Global Exclusive Option
        </MultiSelect.Item>
        
        <MultiSelect.Item value="h">
          No Constraint Option
        </MultiSelect.Item>
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

**Exclusive Options Rules:**
- `exclusiveIndex > 0`: Group exclusive (multiple within group allowed, groups mutually exclusive)
- `exclusiveIndex = -1`: Global exclusive (clears all other options when selected)
- `exclusiveIndex = undefined`: No constraints (but cleared when selecting constrained options)

### Close on Select Behavior

```tsx
{/* Menu stays open after selection (default) */}
<MultiSelect
  values={values}
  onChange={setValues}
  closeOnSelect={false}
>
  {/* Content */}
</MultiSelect>

{/* Menu closes after each selection */}
<MultiSelect
  values={values}
  onChange={setValues}
  closeOnSelect={true}
>
  {/* Content */}
</MultiSelect>
```

### Validation Messages

```tsx
function ValidationExample() {
  const [values, setValues] = useState([])
  
  return (
    <MultiSelect
      values={values}
      onChange={setValues}
      maxSelection={3}
      minSelection={1}
      i18n={{
        maxSelectionMessage: (max) => `You can select up to ${max} options`,
        minSelectionMessage: (min) => `You must select at least ${min} options`,
      }}
      showValidationMessage={true}
    >
      <MultiSelect.Trigger getDisplayValue={getDisplayValue} />
      <MultiSelect.Content>
        {options.map((option) => (
          <MultiSelect.Item key={option.value} value={option.value}>
            {option.label}
          </MultiSelect.Item>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### Max Chips Display

Limit the number of chips shown in the trigger:

```tsx
<MultiSelect
  values={values}
  onChange={setValues}
  maxChips={3}
  placeholder="Select options..."
>
  <MultiSelect.Trigger className="w-80" />
  <MultiSelect.Content>
    {options.map((option) => (
      <MultiSelect.Item key={option.value} value={option.value}>
        {option.label}
      </MultiSelect.Item>
    ))}
  </MultiSelect.Content>
</MultiSelect>
```

### Custom Chip Variants

```tsx
<MultiSelect
  values={values}
  onChange={setValues}
  variant="accent" // "default" | "accent" | "success"
>
  <MultiSelect.Trigger className="w-80" />
  <MultiSelect.Content>
    {options.map((option) => (
      <MultiSelect.Item key={option.value} value={option.value}>
        {option.label}
      </MultiSelect.Item>
    ))}
  </MultiSelect.Content>
</MultiSelect>
```

### Custom Chip Rendering

```tsx
function CustomChipExample() {
  const [values, setValues] = useState(["apple", "banana"])
  
  const renderCustomChip = useCallback(({
    value,
    index,
    displayValue,
    onRemove,
    disabled,
  }) => {
    const colors = [
      "bg-red-100 text-red-800 border-red-500",
      "bg-blue-100 text-blue-800 border-blue-500",
      "bg-green-100 text-green-800 border-green-500",
    ]
    
    return (
      <div className={`inline-flex h-4 items-center gap-1 rounded-md border pl-1 ${colors[index % colors.length]}`}>
        <span>🍎</span>
        <span>{displayValue}</span>
        {onRemove && !disabled && (
          <button
            type="button"
            className="size-4 opacity-50 hover:opacity-100"
            onClick={onRemove}
            data-remove-button
          >
            <RemoveTiny />
          </button>
        )}
      </div>
    )
  }, [])
  
  return (
    <MultiSelect
      values={values}
      onChange={setValues}
      renderChip={renderCustomChip}
      placeholder="Select fruits with custom chips"
    >
      <MultiSelect.Trigger className="w-80" />
      <MultiSelect.Content>
        <MultiSelect.Item value="apple">Apple</MultiSelect.Item>
        <MultiSelect.Item value="banana">Banana</MultiSelect.Item>
        <MultiSelect.Item value="orange">Orange</MultiSelect.Item>
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

## Props

### MultiSelect Props

```ts
interface MultiSelectProps {
  /** Child components (MultiSelect.Trigger and MultiSelect.Content required) */
  children?: React.ReactNode
  
  /** Additional CSS class names */
  className?: string
  
  /** Whether menu closes after selecting an option */
  closeOnSelect?: boolean
  
  /** Whether the multiselect is disabled */
  disabled?: boolean
  
  /** Floating focus manager configuration */
  focusManagerProps?: FloatingFocusManagerProps
  
  /** Function to get display text for selected values */
  getDisplayValue?: (value: string) => string
  
  /** Custom validation messages */
  i18n?: {
    maxSelectionMessage?: (maxSelection: number) => string
    minSelectionMessage?: (minSelection: number) => string
  }
  
  /** Whether dropdown should match trigger width */
  matchTriggerWidth?: boolean
  
  /** Maximum number of chips to display in trigger */
  maxChips?: number
  
  /** Maximum number of options that can be selected */
  maxSelection?: number
  
  /** Minimum number of options that must be selected */
  minSelection?: number
  
  /** Callback fired when selection changes */
  onChange?: (values: string[]) => void
  
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void
  
  /** Controlled open state */
  open?: boolean
  
  /** Placeholder text when no options are selected */
  placeholder?: string
  
  /** Dropdown placement relative to trigger */
  placement?: Placement
  
  /** Portal container ID for rendering dropdown */
  portalId?: string
  
  /** Custom chip rendering function */
  renderChip?: (props: {
    value: string
    index: number
    displayValue: string
    onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
  }) => React.ReactNode
  
  /** Whether to show validation messages */
  showValidationMessage?: boolean
  
  /** Size variant affecting trigger and items */
  size?: "default" | "large"
  
  /** Currently selected values */
  values?: string[]
  
  /** Chip variant for styling */
  variant?: ChipProps["variant"]
}
```

- Defaults:
  - `closeOnSelect`: false
  - `disabled`: false
  - `matchTriggerWidth`: false
  - `placement`: "bottom-start"
  - `portalId`: "floating-menu-root"
  - `showValidationMessage`: true
  - `size`: "default"
  - `values`: []
  - `variant`: "default"

## Sub-components

- **MultiSelect.Trigger**: Custom trigger component with chip display
- **MultiSelect.Content**: Container for dropdown content with built-in scrolling
- **MultiSelect.Item**: Individual selectable option with exclusive support
- **MultiSelect.Label**: Non-selectable label for grouping options
- **MultiSelect.Divider**: Visual separator between option groups
- **MultiSelect.Value**: Text content for options (inherited from MenuValue)

## Styling

- Uses Tailwind CSS via `tailwind-variants` in `tv.ts`
- Inherits styling from MenuContext and Chip systems
- Customize using `className` prop on individual components
- Chip styling controlled via `variant` prop or custom `renderChip`
- Supports responsive design patterns

## Accessibility

- **ARIA Compliance**: Full ARIA listbox implementation with multi-select support
- **Keyboard Navigation**: Arrow keys, Home/End, typeahead search
- **Screen Reader Support**: Proper announcement of selection changes
- **Focus Management**: Logical focus flow and chip removal
- **Disabled State Handling**: Proper disabled state communication

### Keyboard Shortcuts

- **Arrow Keys**: Navigate through options
- **Space/Enter**: Toggle option selection
- **Escape**: Close dropdown
- **Tab**: Navigate between chips and trigger
- **Backspace**: Remove last chip when trigger is focused
- **Delete**: Remove chips during chip focus

## Best Practices

### Selection Strategy
- Use selection limits to prevent overwhelming users
- Provide clear feedback about selection constraints
- Consider the cognitive load of too many selections

### Content Organization
- Group related options with labels and dividers
- Use icons consistently for visual recognition
- Keep option text concise and descriptive

### Validation
- Show helpful validation messages for constraint violations
- Use custom i18n messages for better user experience
- Consider the timing of validation feedback

### Performance
- Use `useMemo` for expensive display value computations
- Avoid recreating option arrays on each render
- Consider virtualization for very long lists (100+ items)

## Examples

### Tag Selection System

```tsx
function TagSelector() {
  const [selectedTags, setSelectedTags] = useState([])
  
  const tagCategories = {
    technology: ["react", "typescript", "nodejs", "python"],
    design: ["ui", "ux", "figma", "sketch"],
    business: ["marketing", "sales", "strategy", "analytics"]
  }
  
  return (
    <MultiSelect
      values={selectedTags}
      onChange={setSelectedTags}
      maxSelection={10}
      placeholder="Select relevant tags..."
      variant="accent"
    >
      <MultiSelect.Trigger className="w-full" />
      <MultiSelect.Content>
        {Object.entries(tagCategories).map(([category, tags]) => (
          <React.Fragment key={category}>
            <MultiSelect.Label>{category.charAt(0).toUpperCase() + category.slice(1)}</MultiSelect.Label>
            {tags.map(tag => (
              <MultiSelect.Item key={tag} value={tag}>
                #{tag}
              </MultiSelect.Item>
            ))}
            <MultiSelect.Divider />
          </React.Fragment>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

### Team Member Assignment

```tsx
function TeamAssignment() {
  const [assignedMembers, setAssignedMembers] = useState([])
  
  return (
    <MultiSelect
      values={assignedMembers}
      onChange={setAssignedMembers}
      maxSelection={5}
      minSelection={1}
      i18n={{
        maxSelectionMessage: (max) => `Maximum ${max} team members can be assigned`,
        minSelectionMessage: (min) => `At least ${min} team member must be assigned`
      }}
    >
      <MultiSelect.Trigger 
        placeholder="Assign team members..."
        className="w-full"
      />
      <MultiSelect.Content>
        <MultiSelect.Label>Available Team Members</MultiSelect.Label>
        {teamMembers.map(member => (
          <MultiSelect.Item key={member.id} value={member.id}>
            <img src={member.avatar} className="w-6 h-6 rounded-full" />
            <div className="flex flex-col">
              <span>{member.name}</span>
              <span className="text-xs text-gray-500">{member.role}</span>
            </div>
          </MultiSelect.Item>
        ))}
      </MultiSelect.Content>
    </MultiSelect>
  )
}
```

## Notes

- The component supports both controlled and uncontrolled usage patterns
- Exclusive options provide powerful constraint management
- Custom chip rendering allows for complete visual customization
- Validation messages automatically dismiss after 3 seconds
- The component integrates with the existing MenuContext system for consistency
- Touch devices receive optimized interaction patterns