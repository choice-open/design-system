import { memo, useId } from "react"
import { Select, SelectProps } from "~/components/select"
import { tcx } from "~/utils"

interface ModalSelectProps extends Omit<SelectProps, "label"> {
  className?: string
  description?: string
  label?: string
}

export const ModalSelect = memo(function ModalSelect(props: ModalSelectProps) {
  const { label, description, className, ...rest } = props
  const id = useId()

  return (
    <fieldset className={tcx("flex w-full min-w-0 flex-col gap-2", className)}>
      {label && (
        <label
          className="leading-md tracking-md cursor-default font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <Select
        matchTriggerWidth
        {...rest}
      />
      {description && <p className="text-secondary-foreground">{description}</p>}
    </fieldset>
  )
})

ModalSelect.displayName = "ModalSelect"
