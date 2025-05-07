import { forwardRef } from "react"
import { IconButton } from "~/components/icon-button"
import { numericInputVariableTriggerTv } from "../tv"
import { Dot } from "@choiceform/icons-react"

interface NumericInputVariableTriggerProps {
  variableValue: number | null | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
  onVariableChange?: (value: number | null) => void
  onUnlink?: () => void
}

export const NumericInputVariableTrigger = forwardRef<
  HTMLButtonElement,
  NumericInputVariableTriggerProps
>((props, ref) => {
  const { variableValue, open, onOpenChange, onVariableChange, onUnlink } = props

  const styles = numericInputVariableTriggerTv({ open })

  return (
    <div className={styles.container()}>
      {variableValue ? (
        <IconButton
          tooltip={{
            content: "Detach variable",
          }}
          variant={undefined}
          className={styles.trigger({
            type: "UNLINK",
          })}
          onClick={(e) => {
            e.stopPropagation()
            onUnlink?.()
            onVariableChange?.(null)
            onOpenChange(false)
          }}
        >
          <Dot />
        </IconButton>
      ) : (
        <IconButton
          tooltip={{
            content: "Apply variable",
          }}
          ref={ref}
          variant={undefined}
          className={styles.trigger({
            type: "OPEN",
          })}
          onClick={(e) => {
            e.stopPropagation()
            onOpenChange(!open)
          }}
        >
          <Dot />
        </IconButton>
      )}
    </div>
  )
})

NumericInputVariableTrigger.displayName = "NumericInputVariableTrigger"
