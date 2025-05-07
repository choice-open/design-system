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
  classNames?: {
    container?: string
    option?: string
  }
  value?: string
  tooltip?: Omit<TooltipProps, "content">
  children?: ReactNode
  onChange?: (value: string) => void
}

const createGridTemplateStyles = (itemCount: number) => ({
  gridTemplateColumns: `repeat(${itemCount}, 1fr)`,
})

const SegmentedBase = forwardRef<HTMLDivElement, SegmentedProps>(
  function SegmentedBase(props, ref) {
    const {
      value: valueProp,
      onChange,
      classNames,
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
          onChange: handleChange,
          tooltipProps: tooltip,
        })
      })
    }, [validChildren, valueProp, id, handleChange, tooltip])

    const containerClassName = tcx(segmentedControlTv().root(), classNames?.container, className)

    const ariaProps = {
      "aria-label": ariaLabel || "Options",
      "aria-describedby": ariaDescribedby || descriptionId,
    }

    return (
      <div
        ref={ref}
        className={containerClassName}
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
