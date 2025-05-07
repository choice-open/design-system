import { Dot } from "@choiceform/icons-react"
import { forwardRef, memo } from "react"
import { IconButton } from "~/components/icon-button"
import { useI18nContext } from "~/i18n"
import { numericInputVariableTriggerTv } from "../tv"

interface NumericInputDetachVariableProps {
  open: boolean
  onUnlink: () => void
}

export const NumericInputDetachVariable = memo(
  forwardRef<HTMLButtonElement, NumericInputDetachVariableProps>(
    function NumericInputDetachVariable(props, ref) {
      const { open, onUnlink } = props

      const { LL } = useI18nContext()

      const styles = numericInputVariableTriggerTv({ open })

      return (
        <IconButton
          ref={ref}
          tooltip={{
            content: LL.numberInput.detachVariable(),
          }}
          variant={undefined}
          className={styles.trigger({
            type: "UNLINK",
          })}
          onClick={(e) => {
            e.stopPropagation()
            onUnlink()
          }}
        >
          <Dot />
        </IconButton>
      )
    },
  ),
)

NumericInputDetachVariable.displayName = "NumericInputDetachVariable"
