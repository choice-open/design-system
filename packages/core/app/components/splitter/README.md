# Splitter Component

A resizable split view component that allows content areas to be resized by users. Built on top of the Allotment library, providing smooth resizing interactions and flexible layout management.

## Overview

The Splitter component creates resizable panels that users can adjust by dragging split handles. It supports both horizontal and vertical orientations, nested layouts, size constraints, and programmatic control.

## Usage

### Basic Horizontal Splitter

```tsx
import { Splitter } from "~/components/splitter"

export function BasicExample() {
  return (
    <div className="h-screen">
      <Splitter defaultSizes={[200, 400]}>
        <div className="bg-gray-100 p-4">Left Panel</div>
        <div className="bg-gray-200 p-4">Right Panel</div>
      </Splitter>
    </div>
  )
}
```

### Vertical Splitter

```tsx
export function VerticalExample() {
  return (
    <div className="h-screen">
      <Splitter
        direction="vertical"
        defaultSizes={[300, 200]}
      >
        <div className="bg-blue-100 p-4">Top Panel</div>
        <div className="bg-blue-200 p-4">Bottom Panel</div>
      </Splitter>
    </div>
  )
}
```

### Using Splitter.Pane for Advanced Control

```tsx
import { Splitter } from "~/components/splitter"

export function AdvancedExample() {
  return (
    <div className="h-screen">
      <Splitter>
        <Splitter.Pane
          minSize={200}
          maxSize={500}
        >
          <div className="h-full bg-green-100 p-4">Sidebar (200px - 500px)</div>
        </Splitter.Pane>

        <Splitter.Pane>
          <div className="h-full bg-green-200 p-4">Main Content (flexible)</div>
        </Splitter.Pane>

        <Splitter.Pane
          minSize={150}
          snap
        >
          <div className="h-full bg-green-300 p-4">Right Panel (collapsible)</div>
        </Splitter.Pane>
      </Splitter>
    </div>
  )
}
```

## Props

### Splitter Props

| Prop           | Type                         | Default        | Description                                             |
| -------------- | ---------------------------- | -------------- | ------------------------------------------------------- |
| `children`     | `ReactNode`                  | -              | **Required.** Panel content or Splitter.Pane components |
| `direction`    | `"horizontal" \| "vertical"` | `"horizontal"` | Split direction                                         |
| `defaultSizes` | `number[]`                   | -              | Initial sizes for each pane                             |
| `sizes`        | `number[]`                   | -              | Controlled sizes for each pane                          |
| `onChangeSize` | `function`                   | -              | Callback when sizes change                              |
| `minSize`      | `number`                     | `30`           | Minimum size for all panes                              |
| `maxSize`      | `number`                     | `Infinity`     | Maximum size for all panes                              |
| `snap`         | `boolean`                    | `false`        | Enable snap-to-zero behavior                            |
| `split`        | `boolean`                    | `true`         | Whether splitting is enabled                            |
| `resizerStyle` | `CSSProperties`              | -              | Custom resizer handle styles                            |
| `className`    | `string`                     | -              | Additional CSS classes                                  |

### Splitter.Pane Props

| Prop       | Type             | Default    | Description                       |
| ---------- | ---------------- | ---------- | --------------------------------- |
| `children` | `ReactNode`      | -          | **Required.** Pane content        |
| `minSize`  | `number`         | `30`       | Minimum size for this pane        |
| `maxSize`  | `number`         | `Infinity` | Maximum size for this pane        |
| `size`     | `number`         | -          | Fixed size for this pane          |
| `snap`     | `boolean`        | `false`    | Enable snap-to-zero for this pane |
| `visible`  | `boolean`        | `true`     | Whether this pane is visible      |
| `priority` | `"min" \| "max"` | -          | Resize priority                   |

## Features

### Size Constraints

```tsx
<Splitter>
  <Splitter.Pane
    minSize={200}
    maxSize={600}
  >
    <SidebarContent />
  </Splitter.Pane>
  <Splitter.Pane minSize={300}>
    <MainContent />
  </Splitter.Pane>
</Splitter>
```

### Snap-to-Zero (Collapsible Panels)

```tsx
<Splitter>
  <Splitter.Pane snap>
    <CollapsibleSidebar />
  </Splitter.Pane>
  <Splitter.Pane>
    <MainContent />
  </Splitter.Pane>
</Splitter>
```

### Nested Splitters

```tsx
<Splitter
  direction="vertical"
  className="h-screen"
>
  <Splitter.Pane>
    <Header />
  </Splitter.Pane>

  <Splitter.Pane>
    <Splitter direction="horizontal">
      <Splitter.Pane
        minSize={200}
        snap
      >
        <Sidebar />
      </Splitter.Pane>
      <Splitter.Pane>
        <MainContent />
      </Splitter.Pane>
      <Splitter.Pane minSize={150}>
        <RightPanel />
      </Splitter.Pane>
    </Splitter>
  </Splitter.Pane>
</Splitter>
```

### Programmatic Control

```tsx
import { useRef } from "react"
import { Splitter, type SplitterHandle } from "~/components/splitter"

export function ProgrammaticExample() {
  const splitterRef = useRef<SplitterHandle>(null)

  const resetLayout = () => {
    splitterRef.current?.reset()
  }

  const setSizes = () => {
    splitterRef.current?.setSizes([300, 400, 200])
  }

  return (
    <div>
      <div className="space-x-2 p-4">
        <button onClick={resetLayout}>Reset Layout</button>
        <button onClick={setSizes}>Set Custom Sizes</button>
      </div>

      <div className="h-96">
        <Splitter
          ref={splitterRef}
          defaultSizes={[200, 400, 200]}
        >
          <div>Panel 1</div>
          <div>Panel 2</div>
          <div>Panel 3</div>
        </Splitter>
      </div>
    </div>
  )
}
```

## Advanced Examples

### Dynamic Panel Management

```tsx
import { useState } from "react"

export function DynamicPanelsExample() {
  const [panels, setPanels] = useState([
    { id: 1, title: "Panel 1" },
    { id: 2, title: "Panel 2" },
    { id: 3, title: "Panel 3" },
  ])

  const addPanel = () => {
    const newId = Math.max(...panels.map((p) => p.id)) + 1
    setPanels([...panels, { id: newId, title: `Panel ${newId}` }])
  }

  const removePanel = (id: number) => {
    setPanels(panels.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="p-4">
        <button onClick={addPanel}>Add Panel</button>
      </div>

      <div className="h-96">
        <Splitter>
          {panels.map((panel) => (
            <Splitter.Pane
              key={panel.id}
              minSize={150}
            >
              <div className="h-full bg-gray-100 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3>{panel.title}</h3>
                  <button
                    onClick={() => removePanel(panel.id)}
                    className="text-red-500"
                  >
                    ×
                  </button>
                </div>
                <div>Content for {panel.title}</div>
              </div>
            </Splitter.Pane>
          ))}
        </Splitter>
      </div>
    </div>
  )
}
```

### IDE-Style Layout

```tsx
export function IDELayoutExample() {
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [bottomVisible, setBottomVisible] = useState(true)

  return (
    <div className="h-screen">
      <Splitter direction="vertical">
        {/* Header */}
        <Splitter.Pane size={60}>
          <div className="flex h-full items-center justify-between bg-gray-800 p-4 text-white">
            <h1>IDE Title</h1>
            <div className="space-x-2">
              <button onClick={() => setSidebarVisible(!sidebarVisible)}>Toggle Sidebar</button>
              <button onClick={() => setBottomVisible(!bottomVisible)}>Toggle Bottom</button>
            </div>
          </div>
        </Splitter.Pane>

        {/* Main Area */}
        <Splitter.Pane>
          <Splitter direction="vertical">
            {/* Content Area */}
            <Splitter.Pane>
              <Splitter direction="horizontal">
                {/* Sidebar */}
                <Splitter.Pane
                  visible={sidebarVisible}
                  minSize={200}
                  maxSize={400}
                  snap
                >
                  <div className="h-full bg-blue-50 p-4">
                    <h3>Explorer</h3>
                    <div>File tree...</div>
                  </div>
                </Splitter.Pane>

                {/* Editor */}
                <Splitter.Pane>
                  <div className="h-full bg-white p-4">
                    <h3>Editor</h3>
                    <textarea
                      className="h-full w-full resize-none border-none"
                      placeholder="Write code here..."
                    />
                  </div>
                </Splitter.Pane>
              </Splitter>
            </Splitter.Pane>

            {/* Bottom Panel */}
            <Splitter.Pane
              visible={bottomVisible}
              minSize={150}
              size={200}
              snap
            >
              <div className="h-full bg-gray-100 p-4">
                <h3>Terminal</h3>
                <div className="font-mono text-sm">$ npm run dev</div>
              </div>
            </Splitter.Pane>
          </Splitter>
        </Splitter.Pane>
      </Splitter>
    </div>
  )
}
```

## Accessibility

### Keyboard Navigation

- **Arrow keys**: Navigate between splitter handles
- **Enter/Space**: Activate splitter handle for keyboard resizing
- **Arrow keys (while active)**: Resize panels incrementally
- **Escape**: Cancel keyboard resize operation

### Screen Reader Support

- Proper ARIA labels for splitter handles
- Size announcements during resize operations
- Panel content remains accessible during resize

### Focus Management

- Clear focus indicators on splitter handles
- Logical tab order through panels
- Focus restoration after resize operations

## Performance Considerations

### Optimization Tips

1. **Container Sizing**: Always provide explicit container dimensions
2. **Minimize Rerenders**: Use `defaultSizes` instead of controlled `sizes` when possible
3. **Debounce Updates**: Use debounced callbacks for expensive operations
4. **Virtualization**: Consider virtual scrolling for panels with large content

### Best Practices

1. **Minimum Sizes**: Set appropriate `minSize` values to prevent unusable panels
2. **Snap Behavior**: Use `snap` for panels that can be completely hidden
3. **Nested Layouts**: Limit nesting depth to maintain performance
4. **Responsive Design**: Test layouts at different screen sizes

## Styling

The component inherits styles from the Allotment library and can be customized via:

- CSS classes through `className` prop
- Custom resizer styles via `resizerStyle` prop
- CSS custom properties for theming
- Tailwind utilities for panel content

## Browser Compatibility

- Modern browsers with CSS Grid support
- Touch device support for mobile interactions
- Proper fallbacks for older browsers
- High DPI display optimization
