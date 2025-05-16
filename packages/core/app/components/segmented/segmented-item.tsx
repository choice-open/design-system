import { forwardRef, memo, ReactNode, useId } from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { Tooltip, type TooltipProps } from "../tooltip"
import { segmentedControlTv } from "./tv"

export interface SegmentedItemProps {
  className?: string
  value: string
  disabled?: boolean
  variant?: "default" | "dark"
  tooltip?: TooltipProps
  children: ReactNode
  "aria-label"?: string
}

export type SegmentedItemInternalProps = SegmentedItemProps & {
  isActive?: boolean
  groupId?: string
  onChange?: (value: string) => void
}

export const SegmentedItem = memo(
  forwardRef<HTMLLabelElement, SegmentedItemInternalProps>(function SegmentedItem(props, ref) {
    const {
      className,
      children,
      value,
      disabled,
      variant,
      tooltip,
      isActive = false,
      groupId: externalGroupId,
      "aria-label": ariaLabel,
      onChange,
      ...rest
    } = props

    const internalId = useId()
    const groupId = externalGroupId || internalId

    const styles = segmentedControlTv({ active: isActive, disabled, variant })

    const optionId = `${groupId}-${value}`

    const ariaLabelProp = typeof children === "string" ? children : ariaLabel

    const handleChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        onChange?.(value)
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
