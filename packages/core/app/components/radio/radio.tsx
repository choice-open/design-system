import { Dot } from "@choiceform/icons-react"
import { forwardRef, HTMLProps, useId } from "react"
import { tcx } from "~/utils"
import { checkboxTv } from "../checkbox/tv"

interface RadioProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  className?: string
  classNames?: {
    container?: string
    label?: string
  }
  variant?: "default" | "accent" | "outline"
  value: boolean
  focused?: boolean
  onChange: (value: boolean) => void
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const {
    value,
    onChange,
    label,
    disabled,
    name,
    variant = "default",
    classNames,
    className,
    focused,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props
  const id = useId()
  const descriptionId = useId()

  const styles = checkboxTv({
    type: "radio",
    variant,
    disabled,
    checked: value,
    focused,
  })

  return (
    <div className={tcx(styles.root(), classNames?.container, className)}>
      <div className="pointer-events-none relative">
        <input
          ref={ref}
          className={styles.input()}
          type="radio"
          id={id}
          name={name}
          checked={value}
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.checked)
          }}
          aria-label={ariaLabel || label?.toString()}
          aria-describedby={ariaDescribedby || (label ? descriptionId : undefined)}
          {...rest}
        />
        <div className={styles.box()}>{value && <Dot />}</div>
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

Radio.displayName = "Radio"
