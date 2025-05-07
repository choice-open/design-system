import { memo, useId } from "react"
import { TextInput, TextInputProps } from "~/components/text-input"

interface ModalInputProps extends TextInputProps {
  label: string
  placeholder?: string
  description?: string
  value?: string
  onChange?: (value: string) => void
}

export const ModalInput = memo(function ModalInput(props: ModalInputProps) {
  const { label, placeholder, description, value, onChange, ...rest } = props
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
      <TextInput
        size="large"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {description && <p className="text-secondary-foreground">{description}</p>}
    </fieldset>
  )
})

ModalInput.displayName = "ModalInput"
