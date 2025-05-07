import { Check, Indeterminate } from "@choiceform/icons-react"
import { forwardRef, HTMLProps, useEffect, useId } from "react"
import { tcx } from "~/utils"
import { checkboxTv } from "./tv"

interface CheckboxProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  className?: string
  classNames?: {
    container?: string
    label?: string
  }
  variant?: "default" | "accent" | "outline"
  value?: boolean
  focused?: boolean
  mixed?: boolean
  onChange?: (value: boolean) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const {
    value,
    onChange,
    label,
    disabled,
    variant = "default",
    classNames,
    className,
    focused,
    mixed,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props
  const id = useId()
  const descriptionId = useId()

  const styles = checkboxTv({
    type: "checkbox",
    variant,
    disabled,
    checked: value,
    focused: focused,
  })

  return (
    <div className={tcx(styles.root(), classNames?.container, className)}>
      <div className="pointer-events-none relative">
        <input
          ref={ref}
          className={styles.input()}
          type="checkbox"
          id={id}
          checked={value}
          disabled={disabled}
          onChange={(e) => {
            onChange?.(e.target.checked)
          }}
          aria-label={ariaLabel || label?.toString()}
          aria-describedby={ariaDescribedby || (label ? descriptionId : undefined)}
          {...rest}
        />

        <div className={styles.box()}>{value && (mixed ? <Indeterminate /> : <Check />)}</div>
      </div>

      {label && (
        <label
          id={descriptionId}
          htmlFor={id}
          className={tcx(styles.label(), classNames?.label)}
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"
