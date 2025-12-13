import { IconButton } from "@choice-ui/icon-button"
import { memo } from "react"

interface ToolbarButtonProps {
  disabled?: boolean
  icon?: React.ReactNode
  label?: string
  onClick?: () => void
}

/** Toolbar button with icon and tooltip (IconButton handles disabled state internally) */
export const ToolbarButton = memo(function ToolbarButton({
  label,
  icon,
  onClick,
  disabled,
}: ToolbarButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      tooltip={{ content: label }}
    >
      {icon}
    </IconButton>
  )
})
