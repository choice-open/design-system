import { forwardRef, useState } from "react"
import AutoSize, { type TextareaAutosizeProps } from "react-textarea-autosize"
import { tcx } from "~/utils"
import { textareaTv } from "./tv"

export interface MultiLineTextInputProps extends Omit<TextareaAutosizeProps, "style" | "onChange"> {
  resizeHandle?: "none" | "both" | "horizontal" | "vertical"
  variant?: "default" | "transparent"
  size?: "default" | "large"
  value?: string
  onChange?: (value: string) => void
}

type TextareaHeightChangeMeta = {
  rowHeight: number
}

export const MultiLineTextInput = forwardRef<HTMLTextAreaElement, MultiLineTextInputProps>(
  (props, ref) => {
    const {
      className,
      minRows = 3,
      maxRows = 8,
      cacheMeasurements,
      resizeHandle = "none",
      variant = "default",
      size = "default",
      disabled,
      value,
      onChange,
      onHeightChange,
      ...rest
    } = props

    const [hasMultipleRows, setIsHasMultipleRows] = useState(minRows > 1)
    const [isLimitReached, setIsLimitReached] = useState(false)

    const style = textareaTv({ variant, size, disabled, resizeHandle })

    const handleHeightChange = (height: number, meta: TextareaHeightChangeMeta) => {
      if (minRows === 1) {
        setIsHasMultipleRows(height >= meta.rowHeight * 2)
      }
      if (maxRows > minRows) {
        const limitReached = height >= maxRows * meta.rowHeight
        setIsLimitReached(limitReached)
      }
      onHeightChange?.(height, meta)
    }

    return (
      <AutoSize
        {...rest}
        ref={ref}
        data-1p-ignore
        data-hide-scroll={!isLimitReached}
        cacheMeasurements={cacheMeasurements}
        maxRows={maxRows}
        minRows={minRows}
        onHeightChange={handleHeightChange}
        data-has-multiple-rows={hasMultipleRows}
        className={tcx(style, className)}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    )
  },
)

MultiLineTextInput.displayName = "MultiLineTextInput"
