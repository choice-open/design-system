import { memo, useId } from "react"
import { Select, SelectProps } from "~/components/select"

interface ModalSelectProps extends Omit<SelectProps, "label"> {
  label?: string
  description?: string
}

export const ModalSelect = memo(function ModalSelect(props: ModalSelectProps) {
  const { label, description, ...rest } = props
  const id = useId()

  return (
    <fieldset className="flex flex-col gap-2">
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
