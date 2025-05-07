import { forwardRef, HTMLProps, useCallback } from "react"
import { useUnmount } from "usehooks-ts"
import { tcx } from "~/utils"
import { inputTv } from "./tv"

export interface TextInputProps
  extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange" | "size"> {
  className?: string
  selected?: boolean
  variant?: "transparent" | "default" | "menu"
  size?: "default" | "large"
  value?: string
  onChange?: (value: string) => void
  onIsEditingChange?: (isEditing: boolean) => void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    const {
      className,
      disabled,
      selected,
      value,
      variant = "default",
      size = "default",
      onBlur,
      onChange,
      onFocus,
      onIsEditingChange,
      ...rest
    } = props

    useUnmount(() => {
      onIsEditingChange?.(false)
    })

    const style = inputTv({ variant, selected, disabled, size })

    const inputProps = useCallback(() => {
      return {
        ...rest,
        "data-1p-ignore": true,
        ref,
        spellCheck: false,
        autoComplete: "false",
        type: "text",
        value,
        disabled,
        className: tcx(style.input(), className),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(e.target.value)
        },
        onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
          e.target.select()
          onFocus?.(e)
          onIsEditingChange?.(true)
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
          onBlur?.(e)
          onIsEditingChange?.(false)
        },
      }
    }, [rest, ref, value, disabled, style, className, onChange, onFocus, onIsEditingChange, onBlur])

    return <input {...inputProps()} />
  },
)

TextInput.displayName = "TextInput"
