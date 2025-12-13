import {
  mergeRefs,
  PressMoveProps,
  useMergedValue,
  useModifierKeys,
  usePressMove,
} from "@choice-ui/shared"
import { addDays, addMonths, addWeeks, format, isValid } from "date-fns"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import type { BaseDateProps, DateInteractionProps, StepProps } from "../types"
import { parseCache, parseDate, parserConfig, resolveLocale, smartCorrectDate } from "../utils"

interface UseDateInputProps extends BaseDateProps, StepProps, DateInteractionProps {
  onPressEnd?: PressMoveProps["onPressEnd"]
  onPressStart?: PressMoveProps["onPressStart"]
  readOnly?: boolean
  ref?: React.Ref<HTMLInputElement>
}

export function useDateInput(props: UseDateInputProps) {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    readOnly = false,
    minDate,
    maxDate,
    step = 1,
    shiftStep = 7,
    metaStep = 30,
    onPressStart,
    onPressEnd,
    format: dateFormat,
    locale: propLocale,
    enableCache = true,
    enableKeyboardNavigation = true,
    enableProfiling = false,
    onEnterKeyDown,
    ref,
  } = props

  // 🔧 Use common locale to parse
  const locale = resolveLocale(propLocale)

  const innerRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")

  // 🎯 Advanced data flow direction detection
  const dataFlowRef = useRef<{
    direction: "external" | "internal" | "idle"
    handledByEnter: boolean
    lastExternalValue: Date | null
    lastInternalInput: string
  }>({
    direction: "idle",
    lastExternalValue: null,
    lastInternalInput: "",
    handledByEnter: false,
  })

  // Modifier key state
  const { shiftPressed, metaPressed } = useModifierKeys(disabled)

  // Calculate current step
  const getCurrentStep = useCallback(() => {
    if (metaPressed) {
      return metaStep // Ctrl/Cmd: 1 month ≈ 30 days
    }
    if (shiftPressed) {
      return shiftStep // Shift: 7 days
    }
    return step // Default: 1 day
  }, [metaPressed, shiftPressed, step, metaStep, shiftStep])

  // Use useMergedValue to manage inner and outer states
  const [innerValue, setValue] = useMergedValue({
    value,
    defaultValue,
    onChange,
    allowEmpty: true,
  })

  // Check if the date is in range
  const isDateInRange = useCallback(
    (date: Date): boolean => {
      if (!isValid(date)) return false
      if (minDate && date < minDate) return false
      if (maxDate && date > maxDate) return false
      return true
    },
    [minDate, maxDate],
  )

  // 🎯 Clamp the date to the allowed range
  const clampDateToRange = useCallback(
    (date: Date): Date | null => {
      if (!isValid(date)) return null
      if (minDate && date < minDate) return minDate
      if (maxDate && date > maxDate) return maxDate
      return date
    },
    [minDate, maxDate],
  )

  // Sync external value to internal input (external → internal)
  useEffect(() => {
    const flow = dataFlowRef.current

    // Check if it is an external data change (handle undefined)
    const normalizedValue = innerValue ?? null
    const isExternalChange = normalizedValue !== flow.lastExternalValue

    if (isExternalChange) {
      // 🔄 External data flow: pause internal parsing, synchronize display
      flow.direction = "external"
      flow.lastExternalValue = normalizedValue

      if (normalizedValue && isValid(normalizedValue)) {
        try {
          const formatted = format(normalizedValue, dateFormat || "yyyy-MM-dd", { locale })
          setInputValue(formatted)
          flow.lastInternalInput = formatted
        } catch (error) {
          console.warn("Date formatting error:", error)
          // Fallback to default format
          try {
            const formatted = format(normalizedValue, "yyyy-MM-dd", { locale })
            setInputValue(formatted)
            flow.lastInternalInput = formatted
          } catch {
            // Last fallback: don't format, just display ISO string
            const isoString = normalizedValue.toISOString().split("T")[0]
            setInputValue(isoString)
            flow.lastInternalInput = isoString
          }
        }
      } else {
        setInputValue("")
        flow.lastInternalInput = ""
      }

      // Restore internal processing after a short delay
      setTimeout(() => {
        flow.direction = "idle"
      }, 50)
    }
  }, [innerValue, dateFormat, locale])

  // 🔧 Special useEffect for locale/format changes
  useEffect(() => {
    // If there is a value and it is not in the external data flow state, re-format
    if (innerValue && isValid(innerValue) && dataFlowRef.current.direction !== "external") {
      try {
        const formatted = format(innerValue, dateFormat || "yyyy-MM-dd", { locale })
        setInputValue(formatted)
        dataFlowRef.current.lastInternalInput = formatted
      } catch (error) {
        console.warn("Date formatting error:", error)
        // Fallback to default format
        try {
          const formatted = format(innerValue, "yyyy-MM-dd", { locale })
          setInputValue(formatted)
          dataFlowRef.current.lastInternalInput = formatted
        } catch {
          // Last fallback: display ISO string
          const isoString = innerValue.toISOString().split("T")[0]
          setInputValue(isoString)
          dataFlowRef.current.lastInternalInput = isoString
        }
      }
    }
  }, [dateFormat, locale]) // Only depend on dateFormat and locale

  // Function to update the date value - reference numeric-input pattern
  const updateValue = useCallback(
    (updateFn?: (currentDate: Date) => Date) => {
      if (disabled || readOnly) return

      setValue((prev) => {
        let baseDate = prev

        // If there is no current value, smartly select a base date
        if (!baseDate || !isValid(baseDate)) {
          if (minDate && maxDate) {
            // If there is a minimum and maximum date limit, use the middle value as the base
            const minTime = minDate.getTime()
            const maxTime = maxDate.getTime()
            const midTime = Math.floor((minTime + maxTime) / 2)
            baseDate = new Date(midTime)
          } else if (minDate) {
            // Only minimum date limit, use the minimum date as the base
            baseDate = minDate
          } else if (maxDate) {
            // Only maximum date limit, use the maximum date 1 day ago as the base
            baseDate = addDays(maxDate, -1)
          } else {
            // No date limit, use today
            baseDate = new Date()
          }
        }

        // If an update function is provided, apply it
        const newDate = updateFn ? updateFn(baseDate) : baseDate

        // Check range limit
        if (!isDateInRange(newDate)) {
          return prev // Keep the original value
        }

        // Ensure the new date is valid
        if (!isValid(newDate)) {
          return prev // Keep the original value
        }

        return newDate
      })
    },
    [disabled, readOnly, setValue, isDateInRange, minDate, maxDate],
  )

  // 🚀 Optimization: useEventCallback parser function
  const parseWithOptimization = useEventCallback((text: string): Date | null => {
    const startTime = enableProfiling ? Date.now() : 0

    // Check cache
    if (enableCache && parserConfig.cache.enabled) {
      const cacheKey = `${text}-${dateFormat || "yyyy-MM-dd"}-${locale.code || "unknown"}`
      const cached = parseCache.get(cacheKey)
      if (cached !== null) {
        return cached
      }
    }

    // Use the new unified parser
    const result = parseDate(text, {
      format: dateFormat || "yyyy-MM-dd",
      locale,
      enableSmartCorrection: true,
      enableNaturalLanguage: true,
      enableRelativeDate: true,
    })

    // Cache the result
    if (enableCache && parserConfig.cache.enabled) {
      const cacheKey = `${text}-${dateFormat || "yyyy-MM-dd"}-${locale.code || "unknown"}`
      parseCache.set(cacheKey, result)
    }

    // Performance analysis
    if (enableProfiling) {
      const parseTime = Date.now() - startTime
      if (parseTime > parserConfig.performance.maxParseTime) {
        console.warn(`Slow parse detected: ${parseTime}ms for "${text}"`)
      }
    }

    return result
  })

  // Helper function to ensure the date is valid
  const ensureValidDate = useCallback((date: Date): Date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const testDate = new Date(year, month - 1, day)
    if (
      testDate.getFullYear() === year &&
      testDate.getMonth() === month - 1 &&
      testDate.getDate() === day
    ) {
      return date
    }

    const corrected = smartCorrectDate(year, month, day)
    return new Date(corrected.year, corrected.month - 1, corrected.day)
  }, [])

  // 🚀 Optimization: useEventCallback to handle user input changes
  const handleInputChange = useEventCallback((newValue: string) => {
    const flow = dataFlowRef.current

    // If processing an external data flow, ignore internal changes
    if (flow.direction === "external") {
      return
    }

    // 🔄 Internal data flow: record input changes
    flow.direction = "internal"
    flow.lastInternalInput = newValue
    setInputValue(newValue)
  })

  const handleSubmit = useEventCallback(() => {
    const flow = dataFlowRef.current

    // 🚫 Data flow protection: do not process internal submissions during external data flow
    if (flow.direction === "external") {
      return
    }

    const text = inputValue.trim()

    if (!text) {
      setValue(null)
      return
    }

    // Check if it is a repeated input (only for onChange optimization, does not affect onDateSubmit)
    const isRepeatInput = text === flow.lastInternalInput && flow.direction !== "internal"

    try {
      const parsedDate = parseWithOptimization(text)

      if (parsedDate && isValid(parsedDate)) {
        // Final validation: ensure the date is valid
        const validDate = ensureValidDate(parsedDate)

        // 🎯 Check date range constraint
        let finalDate = validDate
        if (!isDateInRange(validDate)) {
          // If the date is not in range, try to adjust to the range
          const clampedDate = clampDateToRange(validDate)
          if (!clampedDate) {
            // If it cannot be adjusted, keep the original input but do not update the value
            return
          }
          // Use the adjusted date
          finalDate = clampedDate
        }

        // Smart deduplication: avoid setting the same date (only affects onChange)
        const currentValue = flow.lastExternalValue
        const isSameDate =
          currentValue &&
          finalDate.getFullYear() === currentValue.getFullYear() &&
          finalDate.getMonth() === currentValue.getMonth() &&
          finalDate.getDate() === currentValue.getDate()

        // Only call setValue if the input is not repeated and the date is different
        if (!isRepeatInput && !isSameDate) {
          // 🔄 Internal → External: trigger update
          setValue(finalDate)
        }

        // Format display
        try {
          const formatted = format(finalDate, dateFormat || "yyyy-MM-dd", { locale })
          if (formatted !== text) {
            setInputValue(formatted)
            flow.lastInternalInput = formatted
          } else if (!isRepeatInput) {
            // Update internal input record, even if the formatted result is the same
            flow.lastInternalInput = text
          }
        } catch (error) {
          console.warn("Date formatting error in handleSubmit:", error)
          // Fallback to default format or keep the original input
          try {
            const formatted = format(finalDate, "yyyy-MM-dd", { locale })
            setInputValue(formatted)
            flow.lastInternalInput = formatted
          } catch {
            // Last fallback: keep the user input
            if (!isRepeatInput) {
              flow.lastInternalInput = text
            }
          }
        }
      }
    } catch (error) {
      console.warn("Date parsing error:", error)
    }

    // Processing complete, reset to idle state
    flow.direction = "idle"
  })

  // Drag interaction processing
  const { isPressed: handlerPressed, pressMoveProps } = usePressMove({
    disabled: disabled || readOnly,
    onPressStart: (e) => {
      onPressStart?.(e as PointerEvent)
    },
    onPressEnd: (e) => {
      onPressEnd?.(e as PointerEvent)
    },
    onPressMoveLeft: (delta) => {
      // Left drag: move to the past (reduce days)
      updateValue((currentDate) => addDays(currentDate, -delta * getCurrentStep()))
    },
    onPressMoveRight: (delta) => {
      // Right drag: move to the future (increase days)
      updateValue((currentDate) => addDays(currentDate, delta * getCurrentStep()))
    },
  })

  // 🚀 Optimization: useEventCallback to handle keyboard events
  const handleKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault()

      // Marked as handled by Enter
      dataFlowRef.current.handledByEnter = true

      handleSubmit()

      // 🎯 Trigger enter key callback (for controlling popover close, etc.)
      onEnterKeyDown?.()

      // Delay blur, avoid race condition with useEffect
      setTimeout(() => {
        const target = event.target as HTMLInputElement
        target.blur()
      }, 0)
    } else if (enableKeyboardNavigation && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault()

      const flow = dataFlowRef.current

      // 🎯 Smart base date selection
      let baseDate: Date

      if (innerValue && isValid(innerValue)) {
        // Use the current valid innerValue first
        baseDate = innerValue
      } else if (inputValue.trim()) {
        // Try to parse the current input
        const parsed = parseWithOptimization(inputValue.trim())
        if (parsed && isValid(parsed)) {
          baseDate = parsed
        } else {
          // Use smart base date selection if parsing fails
          if (minDate && maxDate) {
            const minTime = minDate.getTime()
            const maxTime = maxDate.getTime()
            const midTime = Math.floor((minTime + maxTime) / 2)
            baseDate = new Date(midTime)
          } else if (minDate) {
            baseDate = minDate
          } else if (maxDate) {
            baseDate = addDays(maxDate, -1)
          } else {
            baseDate = new Date()
          }
        }
      } else {
        // Use smart base date selection if there is no input
        if (minDate && maxDate) {
          const minTime = minDate.getTime()
          const maxTime = maxDate.getTime()
          const midTime = Math.floor((minTime + maxTime) / 2)
          baseDate = new Date(midTime)
        } else if (minDate) {
          baseDate = minDate
        } else if (maxDate) {
          baseDate = addDays(maxDate, -1)
        } else {
          baseDate = new Date()
        }
      }

      // 🔄 Calculate the increment and new date
      const isUp = event.key === "ArrowUp"
      const increment = isUp ? -1 : 1 // 🔄 Reverse: up key reduces, down key increases

      let newDate: Date

      if (event.altKey) {
        // Alt + up/down keys: jump to the next month
        newDate = addMonths(baseDate, increment)
      } else if (event.shiftKey) {
        // Shift + up/down keys: jump to the next week
        newDate = addWeeks(baseDate, increment)
      } else {
        // up/down keys: jump to the next day
        newDate = addDays(baseDate, increment)
      }

      // 🎯 Check date range constraint
      if (!isDateInRange(newDate)) {
        // If the new date is out of range, try to adjust to the boundary
        const clampedDate = clampDateToRange(newDate)
        if (!clampedDate || clampedDate.getTime() === baseDate.getTime()) {
          // If it cannot be adjusted or adjusted to the same date as the current date, ignore the operation
          return
        }
        newDate = clampedDate
      }

      // 🔄 Update the state and display
      try {
        const formatted = format(newDate, dateFormat || "yyyy-MM-dd", { locale })

        // 🚀 Critical fix: immediately update the display, delay updating the value to avoid race conditions
        flow.direction = "internal"
        flow.lastInternalInput = formatted
        setInputValue(formatted)

        // Delay updating the value, avoid race condition with useEffect's data flow detection
        setTimeout(() => {
          // Secondary check: ensure the state is still internal operation
          if (flow.direction === "internal") {
            // Update the external value state to prevent useEffect from misjudging it as an external change
            flow.lastExternalValue = newDate
            setValue(newDate)

            // Mark the operation as complete
            flow.direction = "idle"
          }
        }, 10)
      } catch (error) {
        console.warn("Date formatting error during keyboard navigation:", error)
        // Fallback to update the value without formatting
        flow.direction = "internal"
        setValue(newDate)
        flow.lastExternalValue = newDate
        flow.direction = "idle"
      }
    }
  })

  // 🚀 Optimization: useEventCallback to handle blur
  const handleBlur = useEventCallback(() => {
    const flow = dataFlowRef.current

    // If the blur is triggered by the Enter key, do not repeat processing
    if (flow.handledByEnter) {
      flow.handledByEnter = false
      return
    }

    // Do not process blur during external data flow
    if (flow.direction === "external") {
      return
    }

    // Smart delay: give the external component enough time to complete the operation
    setTimeout(() => {
      // Secondary check: ensure it is not during an external data flow
      if (dataFlowRef.current.direction !== "external") {
        handleSubmit()
      }
    }, 100)
  })

  const inputProps = {
    ref: mergeRefs(innerRef, ref),
    disabled,
    readOnly,
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
  }

  const handlerProps = {
    ...pressMoveProps,
    ref: pressMoveProps.ref,
  }

  return {
    handlerPressed,
    inputProps,
    handlerProps,
    updateValue,
    currentValue: innerValue,
  }
}
