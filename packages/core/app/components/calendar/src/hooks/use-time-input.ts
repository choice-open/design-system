import {
  mergeRefs,
  PressMoveProps,
  useMergedValue,
  useModifierKeys,
  usePressMove,
} from "@choice-ui/shared"
import { addMinutes, format, setHours, setMinutes, startOfDay } from "date-fns"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import type { BaseTimeProps, StepProps, TimeInteractionProps } from "../types"
import { resolveLocale, smartParseTimeValue } from "../utils"

interface UseTimeInputProps extends BaseTimeProps, StepProps, TimeInteractionProps {
  onPressEnd?: PressMoveProps["onPressEnd"]
  onPressStart?: PressMoveProps["onPressStart"]
  readOnly?: boolean
  ref?: React.Ref<HTMLInputElement>
}

export function useTimeInput(props: UseTimeInputProps) {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    readOnly = false,
    minTime,
    maxTime,
    step = 1,
    shiftStep = 15,
    metaStep = 60,
    onPressStart,
    onPressEnd,
    format: timeFormat = "HH:mm",
    locale: propLocale,
    enableKeyboardNavigation = true,
    enableProfiling = false,
    onEnterKeyDown,
    ref,
  } = props

  // Parse locale
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
      return metaStep // Ctrl/Cmd: 1 hour = 60 minutes
    }
    if (shiftPressed) {
      return shiftStep // Shift: 15 minutes
    }
    return step // Default: 1 minute
  }, [metaPressed, shiftPressed, step, metaStep, shiftStep])

  // Use useMergedValue to manage inner and outer states
  const [innerValue, setValue] = useMergedValue({
    value,
    defaultValue,
    onChange,
    allowEmpty: true,
  })

  // Check if the time is in range
  const isTimeInRange = useCallback(
    (time: Date): boolean => {
      if (!time) return false
      if (minTime && time < minTime) return false
      if (maxTime && time > maxTime) return false
      return true
    },
    [minTime, maxTime],
  )

  // 🎯 Clamp the time to the allowed range
  const clampTimeToRange = useCallback(
    (time: Date): Date | null => {
      if (!time) return null
      if (minTime && time < minTime) return minTime
      if (maxTime && time > maxTime) return maxTime
      return time
    },
    [minTime, maxTime],
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

      if (normalizedValue) {
        // Format display
        const formatted = format(normalizedValue, timeFormat, { locale })
        setInputValue(formatted)
        flow.lastInternalInput = formatted
      } else {
        setInputValue("")
        flow.lastInternalInput = ""
      }

      // Short delay to resume internal processing
      setTimeout(() => {
        flow.direction = "idle"
      }, 50)
    }
  }, [innerValue, timeFormat, locale])

  // 🔧 UseEffect specifically for locale/format changes
  useEffect(() => {
    // If there is a value and not in external data flow state, reformat
    if (innerValue && dataFlowRef.current.direction !== "external") {
      const formatted = format(innerValue, timeFormat, { locale })
      setInputValue(formatted)
      dataFlowRef.current.lastInternalInput = formatted
    }
  }, [timeFormat, locale, innerValue]) // Add innerValue dependency

  // Function to update the time value
  const updateValue = useCallback(
    (updateFn?: (currentTime: Date) => Date) => {
      if (disabled || readOnly) return

      setValue((prev) => {
        let baseTime = prev

        // If there is no current value, smartly select the base time
        if (!baseTime) {
          if (minTime && maxTime) {
            // If there is a minimum and maximum time limit, use the middle value as the base
            const minTotalMinutes = minTime.getHours() * 60 + minTime.getMinutes()
            let maxTotalMinutes = maxTime.getHours() * 60 + maxTime.getMinutes()

            // Handle cross-day cases
            if (maxTotalMinutes < minTotalMinutes) {
              maxTotalMinutes += 24 * 60
            }

            const midTotalMinutes = Math.floor((minTotalMinutes + maxTotalMinutes) / 2)
            const hours = Math.floor(midTotalMinutes / 60) % 24
            const minutes = midTotalMinutes % 60
            baseTime = setMinutes(setHours(startOfDay(new Date()), hours), minutes)
          } else if (minTime) {
            // Only minimum time limit, use minimum time as base
            baseTime = minTime
          } else if (maxTime) {
            // Only maximum time limit, use maximum time 1 hour ago as base (leave space for dragging)
            baseTime = addMinutes(maxTime, -60)
          } else {
            // No time limit, use current time
            baseTime = new Date()
          }
        }

        // If an update function is provided, apply it
        const newTime = updateFn ? updateFn(baseTime) : baseTime

        // Check range limit
        if (!isTimeInRange(newTime)) {
          return prev // Keep the original value
        }

        return newTime
      })
    },
    [disabled, readOnly, setValue, isTimeInRange, minTime, maxTime],
  )

  // 🚀 Optimization: useEventCallback parser function
  const parseWithOptimization = useEventCallback((text: string): Date | null => {
    const startTime = enableProfiling ? Date.now() : 0

    // Use smart time parsing
    const result = smartParseTimeValue(text, {
      format: timeFormat,
      locale: propLocale,
      strict: false,
    })

    // Performance analysis
    if (enableProfiling) {
      const parseTime = Date.now() - startTime
      if (parseTime > 100) {
        // Time parsing should be faster than date parsing
        console.warn(`Slow time parse detected: ${parseTime}ms for "${text}"`)
      }
    }

    return result.isValid && result.time ? result.time : null
  })

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

    // Check if it is a repeated input (only for onChange optimization, does not affect onTimeSubmit)
    const isRepeatInput = text === flow.lastInternalInput && flow.direction !== "internal"

    try {
      const parsedTime = parseWithOptimization(text)

      if (parsedTime) {
        // 🎯 Check time range constraint
        let finalTime = parsedTime
        if (!isTimeInRange(parsedTime)) {
          // If the time is not in range, try to adjust to the range
          const clampedTime = clampTimeToRange(parsedTime)
          if (!clampedTime) {
            // If it cannot be adjusted, keep the original input but do not update the value
            return
          }
          // Use the adjusted time
          finalTime = clampedTime
        }

        // Smart deduplication: avoid setting the same time
        const currentValue = flow.lastExternalValue
        const isSameTime = currentValue && finalTime.getTime() === currentValue.getTime()

        // Only call setValue if the input is not repeated and the time is different
        if (!isRepeatInput && !isSameTime) {
          // 🔄 Internal → External: trigger update
          setValue(finalTime)
        }

        // Format display
        const formatted = format(finalTime, timeFormat, { locale })
        if (formatted !== text) {
          setInputValue(formatted)
          flow.lastInternalInput = formatted
        } else if (!isRepeatInput) {
          // Update internal input record, even if the formatted result is the same
          flow.lastInternalInput = text
        }
      }
    } catch (error) {
      console.warn("Time parsing error:", error)
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
      // Left drag: reduce time
      updateValue((currentTime) => {
        return addMinutes(currentTime, -delta * getCurrentStep())
      })
    },
    onPressMoveRight: (delta) => {
      // Right drag: increase time
      updateValue((currentTime) => {
        return addMinutes(currentTime, delta * getCurrentStep())
      })
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

      // 🎯 Smart base time selection
      let baseTime: Date

      if (innerValue) {
        // Use the current valid innerValue first
        baseTime = innerValue
      } else if (inputValue.trim()) {
        // Try to parse the current input
        const parsed = parseWithOptimization(inputValue.trim())
        baseTime = parsed || new Date()
      } else {
        // Use current time as default base
        baseTime = new Date()
      }

      // 🔄 Calculate the increment and new time
      const isUp = event.key === "ArrowUp"
      const increment = isUp ? -1 : 1 // Up key reduces time (up list), down key increases time (down list)

      let newDate: Date

      if (event.altKey || event.metaKey) {
        // Alt/Meta + up/down keys: use metaStep (default 60 minutes)
        newDate = addMinutes(baseTime, increment * metaStep)
      } else if (event.shiftKey) {
        // Shift + up/down keys: use shiftStep (configurable, default 15 minutes)
        newDate = addMinutes(baseTime, increment * shiftStep)
      } else {
        // up/down keys: use step (configurable, default 1 minute)
        newDate = addMinutes(baseTime, increment * step)
      }

      // 🎯 Check time range constraint
      if (!isTimeInRange(newDate)) {
        // If the new time is out of range, try to adjust to the boundary
        const clampedTime = clampTimeToRange(newDate)
        if (!clampedTime || clampedTime.getTime() === baseTime.getTime()) {
          // If it cannot be adjusted or adjusted to the same time as the current time, ignore the operation
          return
        }
        newDate = clampedTime
      }

      // 🔄 Update the state and display
      const formatted = format(newDate, timeFormat, { locale })

      // Marked as internal data flow
      flow.direction = "internal"
      flow.lastInternalInput = formatted

      // Update display
      setInputValue(formatted)

      // Trigger external update
      setValue(newDate)

      // After completion, reset the state
      setTimeout(() => {
        flow.direction = "idle"
      }, 0)
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
