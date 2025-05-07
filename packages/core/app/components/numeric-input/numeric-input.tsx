import React, { forwardRef, HTMLProps, ReactNode, useId, useRef } from "react"
import { Tooltip, type TooltipProps } from "~/components/tooltip"
import { PressMoveProps, useDisableScroll } from "~/hooks"
import { mergeProps, mergeRefs, tcx } from "~/utils"
import { NumericInputElement, NumericInputVariable } from "./components"
import { useNumericInput } from "./hooks"
import { numericInputTv } from "./tv"
import { NumericInputValue } from "./types"
import { dealWithNumericInputValue } from "./utils"

export type NumericChangeDetail = ReturnType<typeof dealWithNumericInputValue>

type ElementType = {
  type: "handler" | "action" | "menu"
  element: ReactNode
}

export interface NumericInputProps
  extends Omit<HTMLProps<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  className?: string
  classNames?: {
    container?: string
    input?: string
  }
  selected?: boolean
  decimal?: number
  defaultValue?: NumericInputValue
  disabled?: boolean
  expression?: string
  isConstrained?: boolean
  isOverridden?: boolean
  max?: number
  min?: number
  readOnly?: boolean
  required?: boolean
  shiftStep?: number
  step?: number
  value?: NumericInputValue
  variableValue?: number | null
  variant?: "transparent" | "default"
  prefixElement?: ReactNode
  suffixElement?: ElementType
  tooltip?: TooltipProps
  onChange?: (value: NumericInputValue, detail: NumericChangeDetail) => void
  onEmpty?: () => void
  onPressEnd?: PressMoveProps["onPressEnd"]
  onPressStart?: PressMoveProps["onPressStart"]
  onVariableClick?: () => void
  onIsEditingChange?: (isEditing: boolean) => void
  triggerRef?: React.RefObject<HTMLLabelElement> | ((el: HTMLLabelElement | null) => void)
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  function NumericInput(props, ref) {
    const {
      className,
      classNames,
      decimal,
      defaultValue,
      disabled,
      expression = "{value}",
      isConstrained,
      isOverridden,
      max,
      min,
      readOnly,
      required,
      shiftStep = 10,
      step = 1,
      value,
      variableValue,
      variant = "default",
      selected = false,
      prefixElement,
      suffixElement,
      tooltip,
      onChange,
      onEmpty,
      onPressEnd,
      onPressStart,
      onVariableClick,
      onIsEditingChange,
      triggerRef,
      // A11y props
      name,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
    } = props

    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    const { handlerPressed, inputProps, handlerProps } = useNumericInput({
      decimal,
      defaultValue,
      disabled,
      expression,
      max,
      min,
      readOnly,
      shiftStep,
      step,
      value: variableValue === value ? undefined : value,
      onChange,
      onEmpty,
      onPressEnd,
      onPressStart,
      ref: mergeRefs(inputRef, ref),
    })

    const { disableScrollProps } = useDisableScroll({ ref: inputRef })

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onIsEditingChange?.(true)
      inputProps.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onIsEditingChange?.(false)
      inputProps.onBlur?.(e)
    }

    const styles = numericInputTv({
      variant,
      selected: selected || handlerPressed,
      disabled,
      isOverridden,
      isConstrained,
      prefixElement: !!prefixElement,
      suffixElement: !!suffixElement,
      suffixElementType: suffixElement?.type,
      variableValue: !!variableValue,
    })

    return (
      <label
        ref={triggerRef}
        className={tcx(styles.container(), classNames?.container, className)}
      >
        {prefixElement && (
          <NumericInputElement
            position="prefix"
            type="handler"
            handlerProps={handlerProps}
            disabled={disabled}
          >
            {prefixElement}
          </NumericInputElement>
        )}

        <input
          {...mergeProps(inputProps, disableScrollProps)}
          id={id}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-1p-ignore
          autoComplete="off"
          spellCheck={false}
          required={required}
          className={tcx("[grid-area:input]", styles.input(), classNames?.input)}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-valuemin={min}
          aria-valuemax={max}
        />

        {variableValue && (
          <NumericInputVariable
            variableValue={variableValue}
            classNames={{
              container: styles.variableContainer(),
              button: styles.variable(),
            }}
            onClick={onVariableClick}
            aria-label="Toggle variable selection"
            disabled={disabled}
          />
        )}

        {suffixElement && (
          <NumericInputElement
            position="suffix"
            type={suffixElement?.type ?? "handler"}
            handlerProps={handlerProps}
            disabled={disabled}
          >
            {suffixElement?.element}
          </NumericInputElement>
        )}

        {tooltip && (
          <Tooltip {...tooltip}>
            <span
              tabIndex={-1}
              className={styles.tooltip()}
              onFocusCapture={() => {
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
            />
          </Tooltip>
        )}
      </label>
    )
  },
)

NumericInput.displayName = "NumericInput"
