import { useMemo } from "react"
import { toast as sonnerToast, ToasterProps } from "sonner"
import { NotificationsTv } from "./tv"

interface NotificationsProps extends ToasterProps {
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
  className?: string
  icon: React.ReactNode
  id: string | number
  text: string
}

const Toast = (props: NotificationsProps) => {
  const { className, icon, text, actions, id } = props

  const styles = NotificationsTv({ actions: !!actions })

  // 🔧 缓存 actions 结果，避免重复调用
  const actionButtons = useMemo(() => {
    if (!actions) return null
    return actions(id)
  }, [actions, id])

  return (
    <div className={styles.root({ className })}>
      <div className={styles.content()}>
        <div className={styles.icon()}>{icon}</div>
        <div className={styles.text()}>{text}</div>
      </div>

      {actionButtons && (
        <div className={styles.actions()}>
          {actionButtons.action && (
            <button
              className={styles.button()}
              onClick={() => {
                actionButtons.action?.onClick()
              }}
            >
              {actionButtons.action.content}
            </button>
          )}

          {actionButtons.dismiss && (
            <button
              className={styles.button()}
              onClick={() => {
                actionButtons.dismiss?.onClick()
              }}
            >
              {actionButtons.dismiss.content}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function notifications(toast: Omit<NotificationsProps, "id">) {
  return sonnerToast.custom((id) => (
    <Toast
      id={id}
      className={toast.className}
      icon={toast.icon}
      text={toast.text}
      actions={toast.actions}
    />
  ))
}
