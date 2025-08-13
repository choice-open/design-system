# CodeEditor

A powerful code editor component built on CodeMirror 6. Provides syntax highlighting, advanced editing features, and extensible functionality for code editing within React applications.

## Import

```tsx
import { CodeEditor } from "@choiceform/design-system"
```

## Features

- **CodeMirror 6 Foundation**: Built on the latest CodeMirror for performance and extensibility
- **Syntax Highlighting**: Support for multiple programming languages
- **Auto-completion**: Intelligent code completion and suggestions
- **Customizable Extensions**: Add custom CodeMirror extensions for specific needs
- **Read-only Mode**: Disable editing for code display purposes
- **Auto-focus**: Automatic focus on mount
- **Format Support**: Integration with code formatting tools
- **Event Handling**: Comprehensive change and update event handling
- **Accessible**: Keyboard navigation and screen reader support
- **Performance Optimized**: Efficient rendering and updating

## Usage

### Basic Editor

```tsx
import { useState } from "react"

function BasicCodeEditor() {
  const [code, setCode] = useState("")

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      className="h-64 rounded-md border"
    />
  )
}
```

### Read-only Display

```tsx
function CodeDisplay() {
  const exampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`

  return (
    <CodeEditor
      value={exampleCode}
      readonly={true}
      className="h-48 rounded-md border bg-gray-50"
    />
  )
}
```

### With Auto-focus

```tsx
function FocusedEditor() {
  const [code, setCode] = useState("")

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      autoFocus={true}
      placeholder="Start typing your code here..."
      className="h-64 rounded-md border"
    />
  )
}
```

### With Custom Extensions

```tsx
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

function CustomEditor() {
  const [code, setCode] = useState("")

  const extensions = [
    javascript(), // JavaScript syntax highlighting
    oneDark,      // Dark theme
  ]

  return (
    <CodeEditor
      value={code}
      onChange={setCode}
      customExtensions={extensions}
      className="h-64 rounded-md border"
    />
  )
}
```

### With Event Handlers

```tsx
function AdvancedEditor() {
  const [code, setCode] = useState("")
  const [diagnostics, setDiagnostics] = useState([])

  const handleEditorUpdate = (update) => {
    console.log("Editor updated:", update)
    
    // Example: Track cursor position
    const cursor = update.state.selection.main.head
    console.log("Cursor position:", cursor)
  }

  const handleFormat = (formattedCode) => {
    console.log("Code formatted:", formattedCode)
    setCode(formattedCode)
  }

  return (
    <div>
      <CodeEditor
        value={code}
        onChange={setCode}
        onEditorUpdate={handleEditorUpdate}
        onFormat={handleFormat}
        className="h-64 rounded-md border"
      />
      
      {diagnostics.length > 0 && (
        <div className="mt-2 text-sm text-red-600">
          Issues found: {diagnostics.length}
        </div>
      )}
    </div>
  )
}
```

### Language-specific Editor

```tsx
import { python } from "@codemirror/lang-python"
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"

function PythonEditor() {
  const [pythonCode, setPythonCode] = useState(`def hello_world():
    print("Hello, World!")
    
hello_world()`)

  return (
    <CodeEditor
      value={pythonCode}
      onChange={setPythonCode}
      customExtensions={[
        python(),
        syntaxHighlighting(defaultHighlightStyle)
      ]}
      placeholder="Write your Python code here..."
      className="h-64 rounded-md border font-mono"
    />
  )
}
```

### Multi-file Editor

```tsx
function MultiFileEditor() {
  const [activeFile, setActiveFile] = useState("index.js")
  const [files, setFiles] = useState({
    "index.js": "// Main application file\nconsole.log('Hello World');",
    "utils.js": "// Utility functions\nexport const add = (a, b) => a + b;",
    "styles.css": "/* Styles */\nbody { margin: 0; }"
  })

  const getLanguageExtension = (filename) => {
    if (filename.endsWith('.js')) return javascript()
    if (filename.endsWith('.py')) return python()
    if (filename.endsWith('.css')) return css()
    return []
  }

  return (
    <div>
      {/* File tabs */}
      <div className="border-b border-gray-200 bg-gray-50">
        {Object.keys(files).map(filename => (
          <button
            key={filename}
            onClick={() => setActiveFile(filename)}
            className={`px-4 py-2 text-sm ${
              activeFile === filename 
                ? "bg-white border-b-2 border-blue-500" 
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {filename}
          </button>
        ))}
      </div>

      {/* Editor */}
      <CodeEditor
        key={activeFile} // Force re-render when file changes
        value={files[activeFile]}
        onChange={(newCode) => {
          setFiles(prev => ({
            ...prev,
            [activeFile]: newCode
          }))
        }}
        customExtensions={getLanguageExtension(activeFile)}
        className="h-96 border"
      />
    </div>
  )
}
```

### With Toolbar Integration

```tsx
function EditorWithToolbar() {
  const [code, setCode] = useState("")
  const editorRef = useRef(null)

  const insertSnippet = (snippet) => {
    // Get current editor instance
    const editor = editorRef.current?.getEditor()
    if (editor) {
      const cursor = editor.state.selection.main.head
      editor.dispatch({
        changes: { from: cursor, insert: snippet },
        selection: { anchor: cursor + snippet.length }
      })
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2">
        <button 
          onClick={() => insertSnippet("console.log('')")}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded mr-2"
        >
          Console.log
        </button>
        <button 
          onClick={() => insertSnippet("function name() {\n  \n}")}
          className="px-3 py-1 text-sm bg-green-500 text-white rounded"
        >
          Function
        </button>
      </div>

      <CodeEditor
        ref={editorRef}
        value={code}
        onChange={setCode}
        className="h-64 border"
      />
    </div>
  )
}
```

## Props

```ts
interface CodeEditorProps {
  /** Whether to auto-focus the editor on mount */
  autoFocus?: boolean
  
  /** Additional CSS class names */
  className?: string
  
  /** Custom CodeMirror extensions */
  customExtensions?: Extension[]
  
  /** Value change handler */
  onChange?: (value: string, viewUpdate: ViewUpdate) => void
  
  /** Editor update handler (for all editor changes) */
  onEditorUpdate?: (update: ViewUpdate) => void
  
  /** Code format handler */
  onFormat?: (formattedCode: string) => void
  
  /** Placeholder text when editor is empty */
  placeholder?: string | HTMLElement
  
  /** Whether the editor is read-only */
  readonly?: boolean
  
  /** Current code value */
  value?: string
}

interface CodeEditorRef {
  /** Get the underlying CodeMirror EditorView instance */
  getEditor: () => EditorView | null
}
```

## Default Extensions

The CodeEditor comes with sensible default extensions:

- **Basic Setup**: Essential CodeMirror functionality
- **Line Numbers**: Show line numbers in gutter
- **Bracket Matching**: Highlight matching brackets
- **Auto-completion**: Basic completion functionality
- **Search**: Find and replace functionality
- **Multiple Selections**: Multiple cursor support

## Advanced Usage

### Custom Theme

```tsx
import { EditorView } from "@codemirror/view"

const customTheme = EditorView.theme({
  "&": {
    color: "#333",
    backgroundColor: "#f8f9fa"
  },
  ".cm-content": {
    padding: "16px",
    fontSize: "14px",
    fontFamily: "'JetBrains Mono', monospace"
  },
  ".cm-focused": {
    outline: "2px solid #007acc"
  }
})

function ThemedEditor() {
  return (
    <CodeEditor
      customExtensions={[customTheme]}
      value={code}
      onChange={setCode}
    />
  )
}
```

### Lint Integration

```tsx
import { linter, lintGutter } from "@codemirror/lint"

function LintedEditor() {
  const jsLinter = linter(view => {
    const diagnostics = []
    const text = view.state.doc.toString()
    
    // Simple linting example
    if (text.includes("var ")) {
      const pos = text.indexOf("var ")
      diagnostics.push({
        from: pos,
        to: pos + 3,
        severity: "warning",
        message: "Consider using 'let' or 'const' instead of 'var'"
      })
    }
    
    return diagnostics
  })

  return (
    <CodeEditor
      customExtensions={[jsLinter, lintGutter()]}
      value={code}
      onChange={setCode}
    />
  )
}
```

### Collaborative Editing

```tsx
import { collab, getSyncedVersion, sendableUpdates, receiveUpdates } from "@codemirror/collab"

function CollaborativeEditor() {
  const [version, setVersion] = useState(0)
  
  const collabExtension = collab({
    version,
    getSyncedVersion: () => getSyncedVersion(editorState),
    sendableUpdates: (state) => sendableUpdates(state),
    receiveUpdates: (updates) => receiveUpdates(editorView, updates)
  })

  return (
    <CodeEditor
      customExtensions={[collabExtension]}
      value={code}
      onChange={setCode}
      onEditorUpdate={(update) => {
        // Handle collaborative updates
        handleCollaborativeUpdate(update)
      }}
    />
  )
}
```

## Styling

The CodeEditor can be styled using CSS classes:

```css
.code-editor {
  /* Container styling */
  border-radius: 8px;
  overflow: hidden;
}

.code-editor .cm-editor {
  /* Editor-specific styling */
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

.code-editor .cm-scroller {
  /* Scrollable area styling */
  padding: 16px;
}
```

## Language Support

Popular language extensions from CodeMirror:

```tsx
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { json } from "@codemirror/lang-json"
import { markdown } from "@codemirror/lang-markdown"
import { sql } from "@codemirror/lang-sql"
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support for code editing
- **Screen Reader**: Proper ARIA labels and announcements
- **High Contrast**: Support for high contrast modes  
- **Focus Management**: Clear focus indicators and management

## Performance Considerations

- **Efficient Updates**: Only necessary DOM updates are performed
- **Large Files**: Optimized for handling large code files
- **Memory Usage**: Efficient memory management for long editing sessions
- **Virtual Scrolling**: Built-in virtual scrolling for very long documents

## Best Practices

### State Management
- Use controlled components with `value` and `onChange`
- Debounce onChange for performance if needed
- Consider using `useMemo` for expensive extensions

### Extensions
- Load language extensions dynamically for better performance
- Cache extension instances to avoid recreation
- Use extension precedence for proper ordering

### Error Handling
- Implement proper error boundaries around the editor
- Handle extension loading failures gracefully
- Validate custom extensions before applying

## Browser Support

- **Modern Browsers**: Full support in Chrome, Firefox, Safari, Edge
- **Mobile**: Basic touch support (consider mobile-specific adaptations)
- **Performance**: Hardware acceleration where available

## Migration Notes

When upgrading from other editors:

- **Monaco Editor**: Similar API, but different extension system
- **Ace Editor**: Different event handling and configuration
- **CodeMirror 5**: Extension system completely changed in v6

## Common Issues

### Performance with Large Files
```tsx
// Use memo for large files
const editor = useMemo(() => (
  <CodeEditor
    value={largeCode}
    onChange={setLargeCode}
    customExtensions={extensions}
  />
), [largeCode, extensions])
```

### Extension Conflicts
```tsx
// Order extensions properly
const extensions = [
  // Language support first
  javascript(),
  // Theme extensions
  oneDark,
  // Feature extensions last
  lintGutter()
]
```