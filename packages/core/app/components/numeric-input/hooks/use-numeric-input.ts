import React, { HTMLProps, useEffect, useMemo, useRef } from "react"
import { useEventCallback } from "usehooks-ts"
import { PressMoveProps, useMergedValue, usePressMove } from "~/hooks"
import { mergeRefs } from "~/utils"
import { NumberResult, NumericInputValue } from "../types"
import { dealWithNumericInputValue, dealWithNumericValueCatch } from "../utils"

interface UseNumericInputProps<T extends NumericInputValue>
  extends Omit<HTMLProps<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onWheel"> {
  disabled?: boolean
  readOnly?: boolean
  value?: T
  defaultValue?: T
  onChange?: (value: T, obj: NumberResult) => void
  expression?: string
  max?: number
  min?: number
  onEmpty?: () => void
  decimal?: number
  shiftStep?: number
  step?: number
  ref?: React.Ref<HTMLInputElement>
  containerRef?: React.RefObject<HTMLElement>
  onPressStart?: PressMoveProps["onPressStart"]
  onPressEnd?: PressMoveProps["onPressEnd"]
}

export function useNumericInput<T extends NumericInputValue>(props: UseNumericInputProps<T>) {
  const {
    decimal,
    defaultValue,
    disabled,
    expression = "{value}",
    max,
    min,
    readOnly,
    ref,
    shiftStep = 10,
    step = 1,
    value,
    onChange,
    onEmpty,
    onPressEnd,
    onPressStart,
  } = props

  const innerRef = useRef<HTMLInputElement>(null)
  const handlerRef = useRef<HTMLElement | null>(null)
  const shiftRef = useRef(false)
  const metaRef = useRef(false)
  const isFocused = useRef(false)
  const realValue = useRef("")
  const initialValueRef = useRef<string>("")
  const expressionRef = useRef(expression)
  expressionRef.current = expression

  // Process default value
  const defaultValuePre = useMemo(
    () =>
      defaultValue !== undefined && defaultValue !== null && defaultValue !== ""
        ? dealWithNumericValueCatch({
            input: defaultValue,
            pattern: expression,
            min,
            max,
            decimal,
          })
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Process current value
  const valuePre = useMemo(
    () =>
      value !== undefined && value !== null && value !== ""
        ? dealWithNumericValueCatch({
            input: value,
            pattern: expression,
            min,
            max,
            decimal,
          })
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  )

  const [innerValue, setValue] = useMergedValue({
    value: valuePre,
    defaultValue: defaultValuePre,
  })

  // Handle expression changes
  useEffect(() => {
    if (!innerValue) {
      if (innerRef.current) {
        innerRef.current.value = ""
      }
      return
    }

    const valuePre = dealWithNumericInputValue({
      input: innerValue.object,
      pattern: expression,
      max,
      min,
      decimal,
    })
    setValue(valuePre)
    if (innerRef.current) {
      innerRef.current.value = valuePre.string
    }
  }, [expression])

  const onKeyDown = useEventCallback((e: KeyboardEvent) => {
    if (e.key === "Shift" && !shiftRef.current) {
      shiftRef.current = true
    }
    if ((e.metaKey || e.altKey) && !metaRef.current) {
      metaRef.current = true
    }
  })

  const onKeyUp = useEventCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      shiftRef.current = false
    }
    if (!e.metaKey && !e.altKey) {
      metaRef.current = false
    }
  })

  // Handle modifier keys
  useEffect(() => {
    if (disabled) return

    document.body.addEventListener("keydown", onKeyDown)
    document.body.addEventListener("keyup", onKeyUp)
    return () => {
      document.body.removeEventListener("keydown", onKeyDown)
      document.body.removeEventListener("keyup", onKeyUp)
    }
  }, [disabled])

  const getCurrentStep = () => {
    if (shiftRef.current) return shiftStep
    if (metaRef.current) return 1
    return step
  }

  const updateValue = (updateFn?: (value: number) => number) => {
    if (disabled || readOnly) return

    setValue((prev) => {
      const valuePre = dealWithNumericInputValue({
        input: prev ? prev.object : 0,
        pattern: expressionRef.current,
        call: updateFn,
        max,
        min,
        decimal,
      })

      if (JSON.stringify(valuePre.object) !== JSON.stringify(prev?.object)) {
        onChange?.(
          (typeof value === "string"
            ? valuePre.string
            : typeof value === "number"
              ? valuePre.array[0]
              : Array.isArray(value)
                ? valuePre.array
                : valuePre.object) as T,
          valuePre,
        )
      }
      return valuePre
    })
  }

  // Handle press and move interactions
  const { isPressed: handlerPressed, pressMoveProps } = usePressMove({
    disabled,
    onPressStart: (e) => {
      // 保存当前 focus 状态
      const wasFocused = isFocused.current
      if (onPressStart && "nativeEvent" in e) {
        onPressStart(e.nativeEvent as PointerEvent)
      }

      // 如果之前是 focused，在 requestPointerLock 后重新聚焦并选中
      if (wasFocused && innerRef.current) {
        requestAnimationFrame(() => {
          innerRef.current?.focus()
          innerRef.current?.select()
        })
      }

      onPressStart?.(e as PointerEvent)
    },
    onPressEnd: (e) => {
      // 如果之前是 focused，在 exitPointerLock 后重新聚焦并选中
      if (isFocused.current && innerRef.current) {
        requestAnimationFrame(() => {
          innerRef.current?.focus()
          innerRef.current?.select()
        })
      }
      if (onPressEnd && "nativeEvent" in e) {
        onPressEnd(e.nativeEvent as PointerEvent)
      }

      onPressEnd?.(e as PointerEvent)
    },
    onPressMoveLeft: (delta) => {
      updateValue((value) => value - delta * getCurrentStep())
    },
    onPressMoveRight: (delta) => {
      updateValue((value) => value + delta * getCurrentStep())
    },
  })

  // Sync input value with internal state
  useEffect(() => {
    if (innerRef.current) {
      const newValue = innerValue?.string ?? ""
      innerRef.current.value = newValue
      realValue.current = newValue
    }
  }, [innerValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    realValue.current = e.target.value
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    initialValueRef.current = e.target.value
    realValue.current = e.target.value
    isFocused.current = true
    e.target.select()
  }

  const handleInputBlur = () => {
    isFocused.current = false
    if (disabled || readOnly) return

    try {
      const valuePre = dealWithNumericInputValue({
        input: realValue.current,
        pattern: expression,
        max,
        min,
        decimal,
      })

      // 比较字符串形式和计算结果值是否相同
      // 1. 如果字符串形式完全相同，则不触发 onChange
      // 2. 如果计算结果（array[0]）和当前值的计算结果相同，也不触发 onChange
      if (
        valuePre.string === innerValue?.string ||
        (innerValue?.array[0] !== undefined &&
          valuePre.array[0] !== undefined &&
          valuePre.array[0] === innerValue.array[0])
      ) {
        // 无论是否触发 onChange，都应该更新输入框显示值为计算结果
        if (innerRef.current) {
          innerRef.current.value = valuePre.string
          setValue(valuePre)
        }
        return
      }

      setValue(valuePre)
      onChange?.(
        (typeof value === "string"
          ? valuePre.string
          : typeof value === "number"
            ? valuePre.array[0]
            : Array.isArray(value)
              ? valuePre.array
              : valuePre.object) as T,
        valuePre,
      )

      if (innerRef.current) {
        innerRef.current.value = valuePre.string
      }
    } catch (_error) {
      if (innerRef.current?.value === "") {
        onEmpty?.()
      }
      if (initialValueRef.current && innerRef.current) {
        innerRef.current.value = initialValueRef.current
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === "Enter") {
      e.stopPropagation()
      innerRef.current?.blur()
    }
    if (e.key === "ArrowUp") {
      e.stopPropagation()
      updateValue((value) => value + getCurrentStep())
    }
    if (e.key === "ArrowDown") {
      e.stopPropagation()
      updateValue((value) => value - getCurrentStep())
    }
  }

  const inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, "ref"> & {
    ref: typeof ref
  } = {
    ref: mergeRefs(innerRef, ref),
    disabled,
    readOnly,
    onChange: handleInputChange,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onKeyDown: handleKeyDown,
  }

  const handlerProps = {
    ...pressMoveProps,
    ref: (el: HTMLElement | null) => {
      handlerRef.current = el
      if (typeof pressMoveProps.ref === "function") {
        pressMoveProps.ref(el)
      }
    },
  }

  return {
    handlerPressed,
    inputProps,
    handlerProps,
  }
}
