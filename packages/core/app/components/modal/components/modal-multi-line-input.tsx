import { memo, useId } from "react"
import { MultiLineTextInput, MultiLineTextInputProps } from "~/components/multi-line-text-input"

interface ModalMultiLineInputProps extends MultiLineTextInputProps {
  label: string
  placeholder?: string
  minRows?: number
  description?: string
}

export const ModalMultiLineInput = memo(function ModalMultiLineInput(
  props: ModalMultiLineInputProps,
) {
  const { label, placeholder, minRows = 10, description, ...rest } = props
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
      <MultiLineTextInput
        id={id}
        placeholder={placeholder}
        minRows={minRows}
        {...rest}
      />
      {description && <p className="text-secondary-foreground">{description}</p>}
    </fieldset>
  )
})

ModalMultiLineInput.displayName = "ModalMultiLineInput"
