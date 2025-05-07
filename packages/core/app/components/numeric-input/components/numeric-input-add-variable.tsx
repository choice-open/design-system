import { Dot } from "@choiceform/icons-react"
import { memo } from "react"
import { IconButton } from "~/components/icon-button"
import { useI18nContext } from "~/i18n"
import { tcx } from "~/utils"
import { numericInputVariableTriggerTv } from "../tv"

interface NumericInputAddVariableProps {
  open: boolean
  onMouseDown: () => void
  hasNumberVariable?: boolean
}

export const NumericInputAddVariable = memo(function NumericInputAddVariable(
  props: NumericInputAddVariableProps,
) {
  const { open, onMouseDown, hasNumberVariable } = props

  const { LL } = useI18nContext()

  const styles = numericInputVariableTriggerTv({ open })

  return hasNumberVariable ? (
    <div className={styles.container()}>
      <IconButton
        tooltip={{
          content: LL.numberInput.addVariable(),
        }}
        variant={undefined}
        className={tcx(
          styles.trigger({
            type: "OPEN",
          }),
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
        onMouseDown={(e) => {
          e.stopPropagation()
          onMouseDown()
        }}
      >
        <Dot />
      </IconButton>
    </div>
  ) : null
})

NumericInputAddVariable.displayName = "NumericInputAddVariable"
