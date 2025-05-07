import { forwardRef, HTMLProps, useId, useMemo } from "react"
import { tcx } from "~/utils"
import { Radio } from "./radio"

interface RadioGroupProps extends Omit<HTMLProps<HTMLDivElement>, "value" | "onChange"> {
  options: {
    value: string
    label: string
  }[]
  value: string
  onChange: (value: string) => void
  variant?: "default" | "accent" | "outline"
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(props, ref) {
    const { className, options, value, onChange, disabled, variant = "default", ...rest } = props
    const id = useId()

    const radioOptions = useMemo(
      () =>
        options.map((option) => ({
          value: option.value,
          label: option.label,
          checked: value === option.value,
        })),
      [options, value],
    )

    return (
      <div
        className={tcx("flex flex-col gap-2", className)}
        ref={ref}
        {...rest}
      >
        {radioOptions.map((option) => (
          <Radio
            key={option.value}
            name={id}
            value={option.checked}
            label={option.label}
            disabled={disabled}
            variant={variant}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>
    )
  },
)

RadioGroup.displayName = "RadioGroup"
