# Form

A comprehensive form state management system built on **@tanstack/react-form** with pre-built component adapters. Provides powerful validation with Zod schema support, error handling, and seamless integration with the design system components.

## Import

```tsx
import { useForm } from "@choiceform/design-system"
// Or import TanStack Form directly
import { TanstackReactForm } from "@choiceform/design-system"
```

## Features

- **Built on TanStack React Form** - Leverages the power of `@tanstack/react-form` for robust state management
- **Zod Schema Integration** - Built-in support for Zod schema validation
- **Pre-built Adapters** - Ready-to-use adapters for all design system components
- **Field-Level Validation** - Comprehensive validation with onChange, onBlur, and onSubmit lifecycle events
- **Schema-Level Validation** - Use Zod schemas for entire form validation
- **Error Handling** - Automatic error display and state management with proper error formatting
- **Type Safety** - Complete TypeScript support with proper type inference from schemas
- **Performance** - Optimized re-rendering and efficient form state management
- **Easy Integration** - Seamless integration with existing design system components

## Usage

### Basic Form

```tsx
import { useForm } from "@choiceform/design-system"

function LoginForm() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      role: "admin",
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="username">
        {(field) => (
          <form.Input
            name={field.name}
            label="Username"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Enter username"
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <form.Input
            name={field.name}
            label="Email"
            type="email"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Enter email address"
          />
        )}
      </form.Field>

      <form.Field name="role">
        {(field) => (
          <form.Select
            name={field.name}
            label="Role"
            value={field.state.value as string}
            onChange={field.handleChange}
            options={[
              { label: "Select Role" },
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Guest", value: "guest" },
            ]}
          />
        )}
      </form.Field>

      <form.Button type="submit">Submit Form</form.Button>
    </form>
  )
}
```

### With Validation

```tsx
function ValidatedForm() {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
      age: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Valid form data:", value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => {
            if ((value as string).length < 6) {
              return "Password must be at least 6 characters"
            }
          },
        }}
      >
        {(field) => (
          <form.Input
            label="Password"
            name={field.name}
            type="password"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.errors.join(", ")}
            placeholder="Enter password"
          />
        )}
      </form.Field>

      <form.Field
        name="confirmPassword"
        validators={{
          onChange: ({ value }) => {
            if (value !== form.state.values.password) {
              return "Passwords do not match"
            }
          },
        }}
      >
        {(field) => (
          <form.Input
            label="Confirm Password"
            name={field.name}
            type="password"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            error={field.state.meta.errors.join(", ")}
            placeholder="Confirm password"
          />
        )}
      </form.Field>

      <form.Button type="submit">Create Account</form.Button>
    </form>
  )
}
```

### With Zod Schema Validation

```tsx
import { z } from "zod"

function SchemaValidatedForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Define Zod schema
  const userSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .refine((value) => value.length > 0, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    age: z.number().min(18, "Must be at least 18 years old").max(100, "Age must be less than 100"),
    website: z.string().url("Please enter a valid website").optional().or(z.literal("")),
    bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
  })

  // Helper function to format error messages
  const formatErrors = (errors: unknown[]): string[] => {
    return errors.map((error) => {
      if (typeof error === "string") return error
      return String(error)
    })
  }

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      website: "",
      bio: "",
    },
    validators: {
      // Use Zod schema for form-level validation
      onChange: userSchema,
      onBlur: userSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        // Validate with Zod before submitting
        const validatedData = userSchema.parse(value)
        console.log("Validated data:", validatedData)

        // Submit to API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Form submitted successfully!")
      } catch (error) {
        console.error("Validation failed:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="name">
        {(field) => (
          <form.Input
            label="Name"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Enter name"
            error={formatErrors(field.state.meta.errors).join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <form.Input
            label="Email"
            name={field.name}
            type="email"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Enter email address"
            error={formatErrors(field.state.meta.errors).join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="age">
        {(field) => (
          <form.Input
            label="Age"
            name={field.name}
            type="number"
            value={String(field.state.value)}
            onChange={(value) => field.handleChange(parseInt(value) || 0)}
            onBlur={field.handleBlur}
            placeholder="Enter age"
            error={formatErrors(field.state.meta.errors).join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="website">
        {(field) => (
          <form.Input
            label="Website (Optional)"
            name={field.name}
            type="url"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="https://example.com"
            error={formatErrors(field.state.meta.errors).join(", ")}
          />
        )}
      </form.Field>

      <form.Field name="bio">
        {(field) => (
          <form.Textarea
            label="Bio (Optional)"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Tell us about yourself"
            error={formatErrors(field.state.meta.errors).join(", ")}
            description={`${(field.state.value as string).length}/200 characters`}
          />
        )}
      </form.Field>

      <form.Button
        type="submit"
        disabled={isSubmitting || !form.state.canSubmit}
      >
        {isSubmitting ? "Submitting..." : "Submit Form"}
      </form.Button>
    </form>
  )
}
```

### With Descriptions

```tsx
function FormWithDescriptions() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Form data:", value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="username">
        {(field) => (
          <form.Input
            name={field.name}
            label="Username"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            description="Username must be unique"
            placeholder="Enter username"
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <form.Input
            name={field.name}
            label="Email"
            type="email"
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            description={
              <>
                Email is required <LinkButton>Learn more</LinkButton>
              </>
            }
            placeholder="Enter email"
          />
        )}
      </form.Field>

      <form.Button type="submit">Submit</form.Button>
    </form>
  )
}
```

### Multiple Component Types

```tsx
function ComprehensiveForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      bio: "",
      role: "",
      age: 25,
      notifications: false,
      interests: [],
      theme: "light",
      terms: false,
    },
    onSubmit: async ({ value }) => {
      console.log("Form data:", value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {/* Text Input */}
      <form.Field name="name">
        {(field) => (
          <form.Input
            label="Full Name"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
          />
        )}
      </form.Field>

      {/* Textarea */}
      <form.Field name="bio">
        {(field) => (
          <form.Textarea
            label="Bio"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            onBlur={field.handleBlur}
            placeholder="Tell us about yourself"
          />
        )}
      </form.Field>

      {/* Select */}
      <form.Field name="role">
        {(field) => (
          <form.Select
            label="Role"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            options={[
              { label: "Select Role" },
              { label: "Developer", value: "developer" },
              { label: "Designer", value: "designer" },
              { label: "Manager", value: "manager" },
            ]}
          />
        )}
      </form.Field>

      {/* Numeric Input */}
      <form.Field name="age">
        {(field) => (
          <form.NumericInput
            label="Age"
            name={field.name}
            value={field.state.value as number}
            onChange={field.handleChange}
            min={18}
            max={100}
          />
        )}
      </form.Field>

      {/* Switch */}
      <form.Field name="notifications">
        {(field) => (
          <form.Switch
            label="Enable notifications"
            name={field.name}
            value={field.state.value as boolean}
            onChange={field.handleChange}
          />
        )}
      </form.Field>

      {/* Multi Select */}
      <form.Field name="interests">
        {(field) => (
          <form.MultiSelect
            label="Interests"
            name={field.name}
            value={field.state.value as string[]}
            onChange={field.handleChange}
            options={[
              { label: "Technology", value: "tech" },
              { label: "Design", value: "design" },
              { label: "Sports", value: "sports" },
              { label: "Music", value: "music" },
            ]}
          />
        )}
      </form.Field>

      {/* Segmented Control */}
      <form.Field name="theme">
        {(field) => (
          <form.Segmented
            label="Theme"
            name={field.name}
            value={field.state.value as string}
            onChange={field.handleChange}
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "Auto", value: "auto" },
            ]}
          />
        )}
      </form.Field>

      {/* Checkbox */}
      <form.Field name="terms">
        {(field) => (
          <form.Checkbox
            label="I agree to the terms and conditions"
            name={field.name}
            value={field.state.value as boolean}
            onChange={field.handleChange}
          />
        )}
      </form.Field>

      <form.Button type="submit">Submit Form</form.Button>
    </form>
  )
}
```

## API Reference

### useForm Hook

The `useForm` hook is an enhanced version of TanStack React Form's `useForm` hook with integrated component adapters.

```ts
function useForm(options: FormOptions): EnhancedForm

interface FormOptions {
  defaultValues?: Record<string, unknown>
  onSubmit?: (formApi: { value: unknown }) => void | Promise<void>
  validators?: FormValidators
  [key: string]: unknown // Additional TanStack Form options
}
```

The hook returns a TanStack Form instance enhanced with adapter components and all original TanStack Form features.

### TanStack React Form Integration

Access the full TanStack React Form API:

```tsx
import { TanstackReactForm } from "@choiceform/design-system"

// Access all TanStack Form utilities
const { useForm: useTanStackForm, useField } = TanstackReactForm
```

### Field Validation

Support for both manual validators and Zod schema validation:

```ts
// Manual field validation
interface FieldValidators<T> {
  onChange?: (props: { value: T }) => string | undefined
  onBlur?: (props: { value: T }) => string | undefined
  onSubmit?: (props: { value: T }) => string | undefined
}

// Schema validation (Zod)
interface FormValidators {
  onChange?: ZodSchema
  onBlur?: ZodSchema
  onSubmit?: ZodSchema
}
```

### Zod Schema Integration

Use Zod schemas for powerful type-safe validation:

```tsx
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18 or older"),
  name: z.string().min(1, "Name is required"),
})

const form = useForm({
  validators: {
    onChange: schema, // Validate on every change
    onBlur: schema, // Validate when field loses focus
  },
})
```

### Error Formatting

When using Zod schemas, errors may need formatting:

```tsx
const formatErrors = (errors: unknown[]): string[] => {
  return errors.map((error) => {
    if (typeof error === "string") return error
    if (error && typeof error === "object" && "message" in error) {
      return String((error as { message: string }).message)
    }
    return String(error)
  })
}

// Usage in field
error={formatErrors(field.state.meta.errors).join(", ")}
```

### Available Adapters

The form object includes these pre-built adapter components:

- **form.Input** - Text input adapter (`InputAdapter`)
- **form.Select** - Select dropdown adapter (`SelectAdapter`)
- **form.Textarea** - Multi-line text adapter (`TextareaAdapter`)
- **form.Checkbox** - Checkbox adapter (`CheckboxAdapter`)
- **form.RadioGroup** - Radio button group adapter (`RadioGroupAdapter`)
- **form.Switch** - Toggle switch adapter (`SwitchAdapter`)
- **form.Range** - Range slider adapter (`RangeAdapter`)
- **form.NumericInput** - Numeric input adapter (`NumericInputAdapter`)
- **form.MultiSelect** - Multi-selection adapter (`MultiSelectAdapter`)
- **form.Segmented** - Segmented control adapter (`SegmentedAdapter`)
- **form.Button** - Form button (standard `Button` component)

## Common Patterns

### Field Pattern

All form fields follow this pattern:

```tsx
<form.Field
  name="fieldName"
  validators={validationRules}
>
  {(field) => (
    <form.ComponentType
      name={field.name}
      label="Field Label"
      value={field.state.value}
      onChange={field.handleChange}
      onBlur={field.handleBlur}
      error={field.state.meta.errors.join(", ")}
    />
  )}
</form.Field>
```

### Error Handling

```tsx
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      if (!value.includes("@")) {
        return "Please enter a valid email address"
      }
    },
  }}
>
  {(field) => (
    <form.Input
      // ... other props
      error={field.state.meta.errors.join(", ")}
    />
  )}
</form.Field>
```

### Cross-Field Validation

```tsx
<form.Field
  name="confirmPassword"
  validators={{
    onChange: ({ value }) => {
      if (value !== form.state.values.password) {
        return "Passwords do not match"
      }
    },
  }}
>
  {/* field render */}
</form.Field>
```

## Styling

- Form adapters use the styling from their corresponding design system components
- Error states are automatically styled through the component's error prop
- All components support the standard `className` prop for custom styling
- Form layout and spacing should be handled at the container level

## Best Practices

### Form Handling

- Always use `preventDefault()` and `stopPropagation()` in form submit handlers
- Handle form submission asynchronously with proper loading states
- Use `form.state.canSubmit` to control submit button state
- Access form state through `form.state.values` for cross-field validation

### Validation Strategy

- **Use Zod schemas** for complex validation rules and type safety
- **Field-level validation**: Use for simple validation rules and immediate feedback
- **Form-level validation**: Use Zod schemas in the form's `validators` option for comprehensive validation
- **Validation timing**:
  - `onChange`: For immediate feedback (can be expensive with complex schemas)
  - `onBlur`: For validation when field loses focus (recommended for most cases)
  - `onSubmit`: For final validation before submission

### Error Handling

- Create a `formatErrors` helper function when using Zod schemas
- Join multiple errors with meaningful separators
- Provide clear, actionable error messages
- Use field descriptions for additional context and character counts

### TypeScript Integration

- Define TypeScript interfaces that match your Zod schemas
- Use `z.infer<typeof schema>` to extract types from Zod schemas
- Ensure form default values match the schema shape

### Performance

- Consider validation timing to balance UX and performance
- Use `onBlur` validation for complex schemas to reduce computation
- Memoize expensive validation functions
- Use appropriate TanStack Form options for optimization

## Accessibility

- All form adapters inherit accessibility features from their base components
- Proper association between labels and form controls
- Error messages are announced to screen readers
- Keyboard navigation works seamlessly across all form elements
- Focus management is handled automatically

## Notes

### TanStack React Form Integration

- Built on **@tanstack/react-form** v0.x for robust state management
- All TanStack Form features and APIs are available through the enhanced form object
- Access the full TanStack React Form API via `TanstackReactForm` export
- Compatible with TanStack Form ecosystem and patterns

### Component Integration

- Adapters automatically handle the integration between form state and design system components
- All design system component features (variants, sizes, etc.) work seamlessly with form adapters
- Error display is handled automatically by the adapter components
- Form styling follows the design system's visual patterns

### Validation System

- Supports both manual field validation and Zod schema validation
- Form validation runs at appropriate lifecycle events (onChange, onBlur, onSubmit)
- Zod integration provides type safety and complex validation rules
- Error formatting utilities help handle different error types

### Performance Considerations

- Optimized re-rendering ensures good performance with complex forms
- Field-level validation reduces unnecessary computations
- TanStack Form's efficient state management minimizes re-renders
- Validation can be tuned for optimal user experience vs. performance balance
