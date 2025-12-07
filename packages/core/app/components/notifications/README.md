# Notifications

A versatile toast-style notification system for displaying temporary messages and alerts. Built on the reliable Sonner toast library with enhanced customization and action support.

## Import

```tsx
import { notifications } from "@choice-ui/react"
import { Toaster } from "sonner" // Required for rendering notifications
```

## Features

- **Toast-Style Notifications**: Non-intrusive temporary messages that appear on screen
- **Rich Content Support**: Supports both plain text and HTML content
- **Action Buttons**: Add interactive buttons for user actions and dismissal
- **Automatic Dismissal**: Configurable timeout periods with manual dismissal options
- **Icons Support**: Visual context with custom icons or emoji
- **Position Control**: Flexible positioning options for optimal UX
- **Performance Optimized**: Cached actions to prevent unnecessary re-renders
- **Accessibility**: Screen reader announcements and keyboard navigation
- **State Integration**: Works seamlessly with useEffect and component lifecycle

## Usage

### Setup

First, add the Toaster component to your app root:

```tsx
import { Toaster } from "sonner"

function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster position="bottom-right" />
    </>
  )
}
```

### Basic Notification

```tsx
import { notifications } from "@choice-ui/react"

// Simple text notification
notifications({
  text: "Your changes have been saved successfully.",
})

// With icon
notifications({
  icon: <CheckIcon />,
  text: "Operation completed successfully!",
})

// With emoji icon
notifications({
  icon: "🎉",
  text: "Welcome to the platform!",
})
```

### HTML Content

```tsx
notifications({
  html: "Document <strong>Project Report</strong> has been <em>shared</em> with the team.",
})
```

### Notifications with Actions

```tsx
import { toast } from "sonner"

// Single action
notifications({
  icon: <MailIcon />,
  text: "You have a new message from John Doe.",
  actions: (id) => ({
    action: {
      content: "Reply",
      onClick: () => {
        // Handle the reply action
        openReplyModal()
        toast.dismiss(id)
      },
    },
  }),
})

// Action and dismiss buttons
notifications({
  icon: <TrashIcon />,
  text: "Are you sure you want to delete this item? This action cannot be undone.",
  actions: (id) => ({
    action: {
      content: "Delete",
      onClick: () => {
        performDelete()
        toast.dismiss(id)
      },
    },
    dismiss: {
      content: "Cancel",
      onClick: () => {
        toast.dismiss(id)
      },
    },
  }),
})
```

### Integration with Modals and State

```tsx
function NotificationExample() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleNotificationAction = () => {
    notifications({
      icon: <DocumentIcon />,
      text: "Project duplicated successfully. Would you like to view the new project?",
      actions: (id) => ({
        action: {
          content: "View Project",
          onClick: () => {
            setDialogOpen(true)
            toast.dismiss(id)
          },
        },
        dismiss: {
          content: "Dismiss",
          onClick: () => {
            toast.dismiss(id)
          },
        },
      }),
    })
  }

  return (
    <>
      <Button onClick={handleNotificationAction}>Duplicate Project</Button>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <Dialog.Content>{/* Dialog content */}</Dialog.Content>
      </Dialog>
    </>
  )
}
```

### UseEffect Integration

Perfect for programmatic notifications triggered by state changes:

```tsx
function MonitoringComponent() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [notificationId, setNotificationId] = useState(null)

  // Trigger notification based on state
  useEffect(() => {
    if (!isMonitoring) return

    const timer = setTimeout(() => {
      const id = notifications({
        icon: <AlertTriangleIcon />,
        text: "System detected an issue. Please take action or dismiss this notification.",
        actions: (toastId) => ({
          action: {
            content: "Fix Issue",
            onClick: () => {
              handleFixIssue()
              setIsMonitoring(false)
              toast.dismiss(toastId)
            },
          },
          dismiss: {
            content: "Ignore",
            onClick: () => {
              toast.dismiss(toastId)
            },
          },
        }),
      })

      setNotificationId(id)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isMonitoring])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (notificationId) {
        toast.dismiss(notificationId)
      }
    }
  }, [notificationId])

  return <Button onClick={() => setIsMonitoring(true)}>Start Monitoring</Button>
}
```

### Advanced Action Handling

```tsx
function AdvancedNotification() {
  const [actionCount, setActionCount] = useState(0)

  const showAdvancedNotification = () => {
    notifications({
      icon: "⚙️",
      html: "System maintenance required. <b>Click to schedule</b> or dismiss.",
      actions: (id) => ({
        action: {
          content: `Schedule (${actionCount})`,
          onClick: () => {
            setActionCount((prev) => prev + 1)
            // Handle scheduling logic
            scheduleMaintenence()
            toast.dismiss(id)
          },
        },
        dismiss: {
          content: "Later",
          onClick: () => {
            // Maybe schedule a reminder
            scheduleReminder()
            toast.dismiss(id)
          },
        },
      }),
    })
  }

  return <Button onClick={showAdvancedNotification}>Check System Status</Button>
}
```

## Toaster Configuration

The Toaster component accepts various configuration options:

```tsx
<Toaster
  position="bottom-right" // Position on screen
  toastOptions={{
    duration: 4000, // Default duration (ms)
    style: {
      background: "white", // Custom styling
    },
  }}
  closeButton={true} // Show close button
  richColors={true} // Enable rich colors
  expand={false} // Expand notifications
  visibleToasts={5} // Max visible toasts
/>
```

### Position Options

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## Props

### notifications() Function

```ts
interface NotificationsProps {
  /** Plain text content */
  text?: string

  /** HTML content (alternative to text) */
  html?: string

  /** Icon component or emoji */
  icon?: React.ReactNode

  /** Action buttons configuration */
  actions?: (id: string | number) => {
    action?: {
      content: React.ReactNode
      onClick: () => void
    }
    dismiss?: {
      content: React.ReactNode
      onClick: () => void
    }
  }

  /** Custom CSS class */
  className?: string
}
```

### Return Value

The `notifications()` function returns a toast ID that can be used for manual dismissal:

```tsx
const toastId = notifications({ text: "Hello!" })

// Later, dismiss manually
toast.dismiss(toastId)
```

## Styling

The notifications component uses Tailwind Variants for styling. You can customize appearance through:

```tsx
// Custom styling via className
notifications({
  className: "border-2 border-blue-500",
  text: "Custom styled notification",
})
```

The component structure includes these styleable elements:

- Root container
- Content area (icon + text)
- Icon wrapper
- Text content
- Actions container
- Action buttons

## Best Practices

### Content Guidelines

- Keep messages concise and actionable
- Use clear, action-oriented button labels
- Provide context with appropriate icons
- Consider reading time for timeout duration

### UX Considerations

- Don't overload users with too many notifications
- Use appropriate urgency levels (different variants)
- Always provide a way to dismiss notifications
- Consider screen reader users with meaningful text

### Performance

- Actions are cached using useMemo to prevent re-renders
- Use cleanup in useEffect for programmatic notifications
- Avoid creating notifications in rapid succession

### Accessibility

- Notifications announce to screen readers
- Keyboard accessible action buttons
- Proper contrast ratios for all variants
- Timeout considerations for users who need more reading time

## Integration Patterns

### Form Validation

```tsx
function FormWithNotifications() {
  const handleSubmit = async (data) => {
    try {
      await submitForm(data)
      notifications({
        icon: <CheckCircleIcon />,
        text: "Form submitted successfully!",
      })
    } catch (error) {
      notifications({
        icon: <XCircleIcon />,
        text: "Failed to submit form. Please try again.",
        actions: (id) => ({
          action: {
            content: "Retry",
            onClick: () => {
              handleSubmit(data)
              toast.dismiss(id)
            },
          },
        }),
      })
    }
  }
}
```

### File Operations

```tsx
function FileUpload() {
  const handleUpload = async (file) => {
    const uploadId = notifications({
      icon: <UploadIcon />,
      text: `Uploading ${file.name}...`,
    })

    try {
      await uploadFile(file)
      toast.dismiss(uploadId)

      notifications({
        icon: "✅",
        html: `File <strong>${file.name}</strong> uploaded successfully.`,
        actions: (id) => ({
          action: {
            content: "View File",
            onClick: () => {
              openFileViewer(file)
              toast.dismiss(id)
            },
          },
        }),
      })
    } catch (error) {
      toast.dismiss(uploadId)

      notifications({
        icon: <AlertCircleIcon />,
        text: `Failed to upload ${file.name}`,
        actions: (id) => ({
          action: {
            content: "Retry",
            onClick: () => {
              handleUpload(file)
              toast.dismiss(id)
            },
          },
          dismiss: {
            content: "Cancel",
            onClick: () => toast.dismiss(id),
          },
        }),
      })
    }
  }
}
```

### Real-time Updates

```tsx
function LiveNotifications() {
  useEffect(() => {
    const eventSource = new EventSource("/api/events")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      notifications({
        icon: <BellIcon />,
        text: data.message,
        actions: (id) => ({
          action: {
            content: "View Details",
            onClick: () => {
              navigateToDetails(data.id)
              toast.dismiss(id)
            },
          },
        }),
      })
    }

    return () => eventSource.close()
  }, [])
}
```

## Notes

- Requires the Sonner library as a peer dependency
- Either `text` or `html` prop is required (not both)
- Actions are cached using useMemo for performance
- Toast IDs are automatically generated but can be used for manual dismissal
- HTML content should be sanitized if it comes from user input
- The notification system is designed for non-critical feedback - use modals for critical confirmations
