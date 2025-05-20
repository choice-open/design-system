import { Dot } from "@choiceform/icons-react"
import { forwardRef, HTMLProps, memo, ReactNode, useId } from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { checkboxTv } from "../checkbox/tv"
import { RadioContext } from "./context"
import { RadioLabel } from "./radio-label"

export interface RadioProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  className?: string
  variant?: "default" | "accent" | "outline"
  value: boolean
  focused?: boolean
  onChange: (value: boolean) => void
  children?: ReactNode
}

const RadioBase = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const {
    value,
    onChange,
    disabled,
    name,
    variant = "default",
    className,
    focused,
    children,
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

  const handleChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  })

  return (
    <RadioContext.Provider value={{ id, descriptionId, disabled }}>
      <div className={tcx(styles.root(), className)}>
        <div className="pointer-events-none relative">
          <input
            ref={ref}
            className={styles.input()}
            type="radio"
            id={id}
            name={name}
            checked={value}
            disabled={disabled}
            onChange={handleChange}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby || descriptionId}
            aria-checked={value}
            role="radio"
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                onChange(!value)
              }
            }}
            {...rest}
          />
          <div className={styles.box()}>{value && <Dot />}</div>
        </div>

        {children}
      </div>
    </RadioContext.Provider>
  )
})

const MemoizedRadio = memo(RadioBase) as unknown as RadioType

interface RadioType {
  (props: RadioProps & { ref?: React.Ref<HTMLInputElement> }): JSX.Element
  Label: typeof RadioLabel
  displayName?: string
}

export const Radio = MemoizedRadio as RadioType

Radio.Label = RadioLabel
Radio.displayName = "Radio"
