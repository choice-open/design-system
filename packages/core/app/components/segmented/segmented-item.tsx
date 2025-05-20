import { forwardRef, memo, ReactNode } from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { Tooltip, type TooltipProps } from "../tooltip"
import { useSegmentedContext } from "./context"
import { segmentedControlTv } from "./tv"

export interface SegmentedItemProps {
  className?: string
  value: string
  disabled?: boolean
  tooltip?: TooltipProps
  children: ReactNode
  "aria-label"?: string
}

export const SegmentedItem = memo(
  forwardRef<HTMLLabelElement, SegmentedItemProps>(function SegmentedItem(props, ref) {
    const {
      className,
      children,
      value,
      disabled,
      tooltip,
      "aria-label": ariaLabel,
      ...rest
    } = props

    const { value: selectedValue, onChange, groupId, variant } = useSegmentedContext()
    const isActive = value === selectedValue

    const styles = segmentedControlTv({ active: isActive, disabled, variant })

    const optionId = `${groupId}-${value}`

    const ariaLabelProp = typeof children === "string" ? children : ariaLabel

    const handleChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange(value)
      }
    })

    const optionClassName = tcx(styles.option(), className)

    const inputElement = (
      <input
        className={styles.input()}
        type="radio"
        id={optionId}
        name={groupId}
        disabled={disabled}
        checked={isActive}
        value={value}
        aria-label={ariaLabelProp}
        aria-checked={isActive}
        aria-disabled={disabled}
        onChange={handleChange}
      />
    )

    const contentElement = (
      <div
        className={optionClassName}
        aria-hidden="true"
      >
        {children}
      </div>
    )

    const label = (
      <label
        ref={ref}
        htmlFor={optionId}
        className="pointer-events-none relative"
        aria-disabled={disabled}
        {...rest}
      >
        {inputElement}
        {contentElement}
      </label>
    )

    if (tooltip) {
      return <Tooltip {...tooltip}>{label}</Tooltip>
    }

    return label
  }),
)

SegmentedItem.displayName = "SegmentedItem"
