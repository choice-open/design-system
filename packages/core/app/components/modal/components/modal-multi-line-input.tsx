import { memo, useId, useRef } from "react"
import { MultiLineTextInput, MultiLineTextInputProps } from "~/components/multi-line-text-input"

interface ModalMultiLineInputProps extends Omit<MultiLineTextInputProps, "children"> {
  description?: string
  label?: string
}

export const ModalMultiLineInput = memo(function ModalMultiLineInput(
  props: ModalMultiLineInputProps,
) {
  const { label, description, ...rest } = props
  const id = useId()
  const inputRef = useRef<HTMLDivElement>(null)

  return (
    <fieldset className="flex flex-col gap-2">
      {label && (
        <label
          className="leading-md tracking-md cursor-default font-medium"
          htmlFor={id}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </label>
      )}
      <MultiLineTextInput
        ref={inputRef}
        {...rest}
      />
      {description && <p className="text-secondary-foreground">{description}</p>}
    </fieldset>
  )
})

ModalMultiLineInput.displayName = "ModalMultiLineInput"
