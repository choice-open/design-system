import {
  Children,
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLProps,
  isValidElement,
  ReactElement,
  ReactNode,
  useId,
  useMemo,
} from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { type TooltipProps } from "../tooltip"
import { SegmentedItem, type SegmentedItemInternalProps } from "./segmented-item"
import { segmentedControlTv } from "./tv"

export interface SegmentedProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  className?: string
  value?: string
  tooltip?: TooltipProps
  children?: ReactNode
  onChange?: (value: string) => void
  variant?: "default" | "dark"
}

const createGridTemplateStyles = (itemCount: number) => ({
  gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
})

const SegmentedBase = forwardRef<HTMLDivElement, SegmentedProps>(
  function SegmentedBase(props, ref) {
    const {
      value: valueProp,
      onChange,
      variant,
      className,
      tooltip,
      children,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      ...rest
    } = props

    const id = useId()
    const descriptionId = useId()

    const handleChange = useEventCallback((value: string) => {
      onChange?.(value)
    })

    const validChildren = useMemo(() => {
      return Children.toArray(children).filter(
        (child): child is ReactElement<SegmentedItemInternalProps> =>
          isValidElement(child) && child.type === SegmentedItem,
      )
    }, [children])

    const itemCount = validChildren.length

    const gridStyles = createGridTemplateStyles(itemCount)

    const renderOptions = useMemo(() => {
      return validChildren.map((child) => {
        const childElement = child as ReactElement<SegmentedItemInternalProps>
        const { value } = childElement.props
        const isActive = value === valueProp

        return cloneElement(childElement, {
          key: value,
          isActive,
          groupId: id,
          variant,
          onChange: handleChange,
        })
      })
    }, [validChildren, valueProp, id, handleChange, tooltip, variant])

    const styles = segmentedControlTv({
      variant,
    })

    const ariaProps = {
      "aria-label": ariaLabel || "Options",
      "aria-describedby": ariaDescribedby || descriptionId,
    }

    return (
      <div
        ref={ref}
        className={tcx(styles.root(), className)}
        style={gridStyles}
        role="radiogroup"
        {...ariaProps}
        {...rest}
      >
        <span
          id={descriptionId}
          className="sr-only"
        >
          Use arrow keys to navigate between options
        </span>

        {renderOptions}
      </div>
    )
  },
)

SegmentedBase.displayName = "SegmentedBase"

function SegmentedWithRef(props: SegmentedProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <SegmentedBase
      {...props}
      ref={ref}
    />
  )
}

const SegmentedForwardRef = forwardRef(SegmentedWithRef)
SegmentedForwardRef.displayName = "Segmented"

export const Segmented = Object.assign(SegmentedForwardRef, {
  Item: SegmentedItem,
})
