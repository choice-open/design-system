import { memo } from "react"
import { useEventCallback } from "usehooks-ts"
import { IconButton } from "~/components"

interface ToolbarButtonProps {
  disabled?: boolean
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
}

export const ToolbarButton = memo(function ToolbarButton({
  label,
  icon,
  onClick,
  disabled,
}: ToolbarButtonProps) {
  const handleClick = useEventCallback(() => {
    if (!disabled) {
      onClick?.()
    }
  })

  return (
    <IconButton
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      tooltip={{ content: label }}
    >
      {icon}
    </IconButton>
  )
})
