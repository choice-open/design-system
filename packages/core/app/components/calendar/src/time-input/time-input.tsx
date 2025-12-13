import { tcx } from "@choice-ui/shared"
import { Clock } from "@choiceform/icons-react"
import { TextField, TextFieldProps } from "@choice-ui/text-field"
import { enUS } from "date-fns/locale"
import React, { forwardRef } from "react"
import { useTimeInput } from "../hooks/use-time-input"
import type { BaseTimeProps, StepProps, TimeInteractionProps } from "../types"
import { resolveLocale } from "../utils"

interface TimeInputProps
  extends
    Omit<TextFieldProps, "value" | "onChange" | "format" | "defaultValue" | "step">,
    BaseTimeProps,
    StepProps,
    TimeInteractionProps {
  prefixElement?: React.ReactNode
  suffixElement?: React.ReactNode
}

/**
 * Advanced time input component
 *
 * Features:
 * - 🎯 Intelligent time parsing: support multiple formats and natural language
 * - ⌨️ Keyboard navigation: up key decreases, down key increases (符合列表导航逻辑)
 * - 🔄 Race protection: smartly detect data flow direction, avoid loop updates
 * - 🚀 Performance optimization: use useEventCallback and caching mechanism
 * - 🛡️ Type safety: complete TypeScript support
 * - 🌍 Internationalization support: configurable language region
 * - 📱 Drag interaction: support dragging adjustment through prefix icon
 */
export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>((props, ref) => {
  const {
    // Time related properties
    defaultValue,
    value,
    onChange,
    format: propFormat = "HH:mm",
    locale: propLocale = enUS,
    minTime,
    maxTime,
    step = 1,
    shiftStep = 15,
    metaStep = 60,

    // Interaction related properties
    enableCache = true,
    enableKeyboardNavigation = true,
    enableProfiling = false,
    onEnterKeyDown,

    // UI related properties
    placeholder = "Enter time...",
    prefixElement = <Clock />,
    suffixElement,

    // TextField properties
    ...rest
  } = props

  // 🔧 Use common locale to parse
  const locale = resolveLocale(propLocale)

  const { inputProps, handlerProps } = useTimeInput({
    value,
    defaultValue,
    onChange,
    disabled: rest.disabled,
    readOnly: rest.readOnly,
    minTime,
    maxTime,
    step,
    shiftStep,
    metaStep,
    format: propFormat,
    locale,
    enableCache,
    enableKeyboardNavigation,
    enableProfiling,
    onEnterKeyDown,
    ref,
  })

  return (
    <TextField
      {...inputProps}
      placeholder={placeholder}
      {...rest}
    >
      {prefixElement && (
        <TextField.Prefix>
          <div
            {...handlerProps}
            className={tcx(
              "cursor-ew-resize",
              rest.disabled ? "text-disabled-foreground" : "text-secondary-foreground",
              rest.variant === "dark" ? "text-white/50" : undefined,
            )}
          >
            {prefixElement}
          </div>
        </TextField.Prefix>
      )}
      {suffixElement && (
        <TextField.Suffix className="text-secondary-foreground w-full min-w-0 px-2">
          {suffixElement}
        </TextField.Suffix>
      )}
    </TextField>
  )
})

TimeInput.displayName = "TimeInput"
