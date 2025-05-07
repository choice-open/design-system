import { forwardRef, HTMLProps, useCallback } from "react"
import { tcx } from "~/utils"
import { NestingTextInputTV } from "./tv"

interface NestingTextInputProps extends Omit<HTMLProps<HTMLInputElement>, "value" | "onChange"> {
  children?: React.ReactNode
  classNames?: {
    root?: string
    input?: string
    nesting?: string
  }
  focused?: boolean
  value?: string
  onChange?: (value: string) => void
  onIsEditingChange?: (isEditing: boolean) => void
}

export const NestingTextInput = forwardRef<HTMLInputElement, NestingTextInputProps>(
  (props, ref) => {
    const {
      className,
      children,
      classNames,
      disabled,
      focused,
      value,
      onChange,
      onFocus,
      onBlur,
      onIsEditingChange,
      ...rest
    } = props

    const style = NestingTextInputTV({ disabled, focused })

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
        className: tcx(style.input(), classNames?.input),
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
    }, [
      rest,
      ref,
      value,
      disabled,
      style,
      classNames?.input,
      onChange,
      onFocus,
      onIsEditingChange,
      onBlur,
    ])

    return (
      <div className={tcx(style.root(), classNames?.root, className)}>
        <input {...inputProps()} />
        {children && <div className={tcx(style.nesting(), classNames?.nesting)}>{children}</div>}
      </div>
    )
  },
)

NestingTextInput.displayName = "NestingTextInput"
