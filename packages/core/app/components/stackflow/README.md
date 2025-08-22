# Stackflow Component

A powerful navigation component that manages a stack-based flow of views with history tracking, back navigation, and animated transitions. Perfect for creating wizard-like interfaces, modal flows, and hierarchical navigation.

## Overview

Stackflow provides a stack-based navigation system where views can be pushed and popped from a navigation stack. It maintains history, supports back navigation, and provides smooth transitions between views.

## Usage

### Basic Stackflow

```tsx
import { Stackflow, useStackflowContext } from "~/components/stackflow"

// Define your views
const views = {
  home: () => <HomePage />,
  about: () => <AboutPage />,
  contact: () => <ContactPage />,
  settings: () => <SettingsPage />,
}

export function BasicExample() {
  return (
    <Stackflow
      initialView="home"
      views={views}
      className="h-96 rounded border"
    />
  )
}
```

### Navigation Controls

```tsx
function NavigationControls() {
  const { push, back, clearHistory, canGoBack, current } = useStackflowContext()

  return (
    <div className="flex gap-2 border-b p-4">
      <button onClick={() => push("home")}>Home</button>
      <button onClick={() => push("about")}>About</button>
      <button onClick={() => push("contact")}>Contact</button>
      <button
        onClick={back}
        disabled={!canGoBack}
      >
        Back
      </button>
      <button onClick={clearHistory}>Clear History</button>

      <span className="ml-auto">Current: {current}</span>
    </div>
  )
}

export function WithNavigationExample() {
  const views = {
    home: () => (
      <div className="p-4">
        <NavigationControls />
        <h1>Home Page</h1>
        <p>Welcome to the home page</p>
      </div>
    ),
    about: () => (
      <div className="p-4">
        <NavigationControls />
        <h1>About Page</h1>
        <p>Learn more about us</p>
      </div>
    ),
    contact: () => (
      <div className="p-4">
        <NavigationControls />
        <h1>Contact Page</h1>
        <p>Get in touch</p>
      </div>
    ),
  }

  return (
    <Stackflow
      initialView="home"
      views={views}
      className="h-96 rounded border"
    />
  )
}
```

## Props

### Stackflow Props

| Prop           | Type                              | Default | Description                                           |
| -------------- | --------------------------------- | ------- | ----------------------------------------------------- |
| `views`        | `Record<string, () => ReactNode>` | -       | **Required.** Object mapping view names to components |
| `initialView`  | `string`                          | -       | **Required.** Initial view to display                 |
| `onViewChange` | `(view: string) => void`          | -       | Callback when active view changes                     |
| `transition`   | `object`                          | -       | Animation transition configuration                    |
| `className`    | `string`                          | -       | Additional CSS classes                                |

## Context API

### useStackflowContext Hook

```tsx
const {
  // Current state
  current, // string: current view name
  history, // string[]: navigation history
  canGoBack, // boolean: whether back navigation is possible

  // Navigation methods
  push, // (view: string) => void
  back, // () => void
  replace, // (view: string) => void
  clearHistory, // () => void
} = useStackflowContext()
```

## Advanced Examples

### Wizard Flow

```tsx
import { useState } from "react"

export function WizardExample() {
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  })

  const { push, back, canGoBack } = useStackflowContext()

  const views = {
    step1: () => (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">Step 1: Basic Information</h2>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full rounded border px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              disabled
              className="rounded bg-gray-300 px-4 py-2"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => push("step2")}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    ),

    step2: () => (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">Step 2: Preferences</h2>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Theme</label>
            <select className="w-full rounded border px-3 py-2">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              Enable notifications
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={back}
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => push("step3")}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    ),

    step3: () => (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">Step 3: Review & Submit</h2>
        <div className="space-y-4">
          <div className="rounded bg-gray-50 p-4">
            <h3 className="font-medium">Summary</h3>
            <p>Review your information before submitting...</p>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={back}
              className="rounded bg-gray-500 px-4 py-2 text-white"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="mx-auto max-w-md">
      <Stackflow
        initialView="step1"
        views={views}
        className="rounded-lg border shadow-lg"
      />
    </div>
  )
}
```

### Modal Navigation Flow

```tsx
export function ModalFlowExample() {
  const [isOpen, setIsOpen] = useState(false)

  const modalViews = {
    main: () => (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold">Settings</h2>
        <div className="space-y-2">
          <button
            onClick={() => push("profile")}
            className="block w-full rounded p-2 text-left hover:bg-gray-100"
          >
            Profile Settings
          </button>
          <button
            onClick={() => push("privacy")}
            className="block w-full rounded p-2 text-left hover:bg-gray-100"
          >
            Privacy Settings
          </button>
          <button
            onClick={() => push("advanced")}
            className="block w-full rounded p-2 text-left hover:bg-gray-100"
          >
            Advanced Settings
          </button>
        </div>
      </div>
    ),

    profile: () => {
      const { back } = useStackflowContext()
      return (
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={back}
              className="text-blue-500"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Display Name</label>
              <input
                type="text"
                className="w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <textarea
                className="w-full rounded border px-3 py-2"
                rows={3}
              />
            </div>
          </div>
        </div>
      )
    },

    privacy: () => {
      const { back } = useStackflowContext()
      return (
        <div className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={back}
              className="text-blue-500"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              Make profile public
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
              />
              Allow direct messages
            </label>
          </div>
        </div>
      )
    },
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Open Settings
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="max-h-[500px] w-96 overflow-hidden rounded-lg bg-white">
            <Stackflow
              initialView="main"
              views={modalViews}
            />
            <div className="border-t p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded bg-gray-500 px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

### Search and Navigation

```tsx
export function SearchNavigationExample() {
  const [searchQuery, setSearchQuery] = useState("")

  const views = {
    search: () => {
      const { push } = useStackflowContext()

      const results = [
        { id: 1, title: "React Hooks Guide" },
        { id: 2, title: "TypeScript Best Practices" },
        { id: 3, title: "CSS Grid Layout" },
      ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

      return (
        <div className="p-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search articles..."
            className="mb-4"
          />

          <div className="space-y-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => push(`article-${result.id}`)}
                className="block w-full rounded border p-3 text-left hover:bg-gray-50"
              >
                {result.title}
              </button>
            ))}
          </div>
        </div>
      )
    },

    "article-1": () => {
      const { back } = useStackflowContext()
      return (
        <div className="p-4">
          <button
            onClick={back}
            className="mb-4 text-blue-500"
          >
            ← Back to search
          </button>
          <h1 className="mb-4 text-2xl font-bold">React Hooks Guide</h1>
          <p>Complete guide to React Hooks...</p>
        </div>
      )
    },

    // Add more article views as needed
  }

  return (
    <Stackflow
      initialView="search"
      views={views}
      className="h-96 rounded border"
    />
  )
}
```

## Animation and Transitions

### Custom Transitions

```tsx
export function AnimatedStackflowExample() {
  const views = {
    // Your views here
  }

  return (
    <Stackflow
      initialView="home"
      views={views}
      transition={{
        type: "slide",
        duration: 300,
        easing: "ease-in-out",
      }}
      className="h-96 overflow-hidden rounded border"
    />
  )
}
```

## Best Practices

### State Management

1. **Pass data between views**: Use context or props drilling for shared state
2. **Cleanup on unmount**: Clear any subscriptions or timers in view components
3. **Handle back navigation**: Always provide clear back navigation options
4. **Validate navigation**: Ensure required data exists before allowing navigation

### UX Guidelines

1. **Clear navigation paths**: Users should understand how to go back
2. **Progress indicators**: Show progress in multi-step flows
3. **Consistent layout**: Maintain consistent header/footer across views
4. **Loading states**: Handle async operations gracefully

### Performance Tips

1. **Lazy load views**: Consider lazy loading for complex views
2. **Memoize expensive calculations**: Use React.memo for heavy components
3. **Limit history depth**: Clear history when appropriate to prevent memory leaks

## Accessibility

- Proper focus management between views
- Screen reader announcements for view changes
- Keyboard navigation support
- ARIA labels for navigation controls

## Common Patterns

### Conditional Navigation

```tsx
const { push, current, history } = useStackflowContext()

// Only allow access to step 2 if step 1 is complete
const canAccessStep2 = formData.step1.isComplete

if (!canAccessStep2 && current === "step2") {
  push("step1")
}
```

### Dynamic View Registration

```tsx
const [views, setViews] = useState(initialViews)

// Add views dynamically
const addView = (name: string, component: () => ReactNode) => {
  setViews((prev) => ({ ...prev, [name]: component }))
}
```
