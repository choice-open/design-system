import { ButtonHTMLAttributes, forwardRef, memo, ReactNode } from "react"

export interface TabItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string
  disabled?: boolean
  children: ReactNode
}

export const TabItem = memo(
  forwardRef<HTMLButtonElement, TabItemProps>(function TabItem({ children, ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }),
)

TabItem.displayName = "TabItem"
