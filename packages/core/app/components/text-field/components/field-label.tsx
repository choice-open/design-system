import { forwardRef, HTMLProps, memo } from "react"

export const FieldLabel = memo(
  forwardRef<HTMLLabelElement, HTMLProps<HTMLLabelElement>>(function FieldLabel(props, ref) {
    return (
      <label
        ref={ref}
        {...props}
      />
    )
  }),
)

FieldLabel.displayName = "FieldLabel"
