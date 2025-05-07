import { toast as sonnerToast, ToasterProps } from "sonner"
import { NotificationsTv } from "./tv"

interface NotificationsProps extends ToasterProps {
  className?: string
  id: string | number
  icon: React.ReactNode
  text: string
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
}

const Toast = (props: NotificationsProps) => {
  const { className, icon, text, actions, id } = props

  const styles = NotificationsTv({ actions: !!actions })

  return (
    <div className={styles.root({ className })}>
      <div className={styles.content()}>
        <div className={styles.icon()}>{icon}</div>
        <div className={styles.text()}>{text}</div>
      </div>

      {actions && (
        <div className={styles.actions()}>
          <button
            className={styles.button()}
            onClick={() => {
              actions(id).action?.onClick()
            }}
          >
            {actions(id).action?.content}
          </button>

          {actions(id).dismiss && (
            <button
              className={styles.button()}
              onClick={() => {
                actions(id).dismiss?.onClick()
              }}
            >
              {actions(id).dismiss?.content}
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
      icon={toast.icon}
      text={toast.text}
      actions={toast.actions}
    />
  ))
}
