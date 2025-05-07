import { SetStateAction, useEffect, useRef } from "react"
import { useMemoizedFn, useUpdate } from "ahooks"

type Options<T> = {
  value?: T
  defaultValue?: T
  defaultStateValue?: T | (() => T)
  onChange?: (v: T) => void
  onUnchange?: () => void
}

function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined
}

function getInitialValue<T>(options: Options<T>): T {
  const { value, defaultValue, defaultStateValue } = options

  if (!isUndefined(value)) {
    return value
  }

  if (!isUndefined(defaultValue)) {
    return defaultValue
  }

  if (typeof defaultStateValue === "function") {
    return (defaultStateValue as () => T)()
  }

  return defaultStateValue as T
}

export function useMergedValue<T>(options: Options<T>) {
  const { value, onChange, onUnchange } = options
  const update = useUpdate()

  // Store the current value in a ref to avoid re-renders
  const stateRef = useRef<T>(getInitialValue(options))

  // Track previous value to detect changes
  const prevValueRef = useRef(value)

  // Sync with external value when in controlled mode
  useEffect(() => {
    const isControlled = !isUndefined(value)

    if (isControlled) {
      // Only update if the value has actually changed
      if (value !== stateRef.current) {
        stateRef.current = value
        update()
      }
    } else if (prevValueRef.current !== value) {
      // Handle the case when switching from controlled to uncontrolled
      // Only update if we're switching modes
      stateRef.current = value as T
    }

    prevValueRef.current = value
  }, [value, update])

  // Memoize setState to ensure stable reference
  const setState = useMemoizedFn((v: SetStateAction<T>, forceTrigger = false) => {
    const nextValue = typeof v === "function" ? (v as (prevState: T) => T)(stateRef.current) : v

    // Skip update if value hasn't changed and not forcing update
    if (!forceTrigger && nextValue === stateRef.current) {
      onUnchange?.()
      return
    }

    stateRef.current = nextValue
    update()
    onChange?.(nextValue)
  })

  return [stateRef.current, setState] as const
}
