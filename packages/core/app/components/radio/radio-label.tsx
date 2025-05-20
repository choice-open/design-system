import { forwardRef, HTMLProps, memo, ReactNode } from "react"
import { tcx } from "~/utils"
import { checkboxTv } from "../checkbox/tv"
import { useRadioContext } from "./context"

export interface RadioLabelProps
  extends Omit<HTMLProps<HTMLLabelElement>, "htmlFor" | "id" | "disabled"> {
  children: ReactNode
}

export const RadioLabel = memo(
  forwardRef<HTMLLabelElement, RadioLabelProps>(function RadioLabel(props, ref) {
    const { children, className, ...rest } = props
    const { id, descriptionId, disabled } = useRadioContext()
    const styles = checkboxTv({ disabled })

    return (
      <label
        ref={ref}
        id={descriptionId}
        htmlFor={id}
        className={tcx(styles.label(), className)}
        {...rest}
      >
        {children}
      </label>
    )
  }),
)

RadioLabel.displayName = "Radio.Label"
