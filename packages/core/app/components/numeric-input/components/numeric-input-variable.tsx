import { forwardRef } from "react"
import { tcx } from "~/utils"

interface NumericInputVariableProps {
  variableValue: number | null | undefined
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  classNames?: {
    container?: string
    button?: string
  }
  disabled?: boolean
}

export const NumericInputVariable = forwardRef<HTMLButtonElement, NumericInputVariableProps>(
  (props, ref) => {
    const { variableValue, onClick, className, classNames, disabled } = props

    return (
      <div className={tcx("[grid-area:variable]", classNames?.container, className)}>
        <button
          ref={ref}
          className={classNames?.button}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.(e)
          }}
          disabled={disabled}
        >
          {String(variableValue)}
        </button>
      </div>
    )
  },
)

NumericInputVariable.displayName = "NumericInputVariable"
