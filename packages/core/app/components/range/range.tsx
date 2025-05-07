import { clamp } from "es-toolkit"
import { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import { mergeRefs, tcx } from "~/utils"
import { rangeTv } from "./tv"

interface RangeProps {
  defaultValue?: number
  value?: number
  onChange?: (value: number) => void
  onChangeStart?: () => void
  onChangeEnd?: () => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  trackSize?: {
    width?: number
    height?: number
  }
  thumbSize?: number
}

export const Range = forwardRef<HTMLDivElement, RangeProps>(function Range(props, ref) {
  const {
    defaultValue,
    value,
    onChange,
    onChangeStart,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    className,
    trackSize = {
      width: 256,
      height: 16,
    },
    thumbSize = 14,
  } = props

  // Memoize conversion functions
  const valueToPosition = useCallback((val: number) => (val - min) / (max - min), [min, max])

  const positionToValue = useCallback(
    (position: number) => min + position * (max - min),
    [min, max],
  )

  // Memoize default step value calculation
  const defaultStepValue = useMemo(() => {
    if (!defaultValue) return null
    if (step > 1) {
      const steps = Math.ceil((max - min) / step) + 1
      let closestStep = min
      let minDiff = Math.abs(defaultValue - min)

      for (let i = 0; i < steps; i++) {
        const stepValue = min + i * step
        const diff = Math.abs(defaultValue - stepValue)
        if (diff < minDiff) {
          minDiff = diff
          closestStep = stepValue
        }
      }
      return closestStep
    }
    return defaultValue
  }, [defaultValue, step, min, max])

  const sliderRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isDragging = useRef(false)

  const [internalValue, setInternalValue] = useState(value ?? min)
  const currentStepValue = useMemo(
    () =>
      step > 1 ? Math.round((value ?? internalValue) / step) * step : (value ?? internalValue),
    [value, internalValue, step],
  )

  const [transforms, setTransforms] = useState({
    minTransform: 1,
    maxTransform: 0,
    transformX: 0,
  })
  const [gradientPosition, setGradientPosition] = useState(0)

  // Update computed values
  useEffect(() => {
    const position = valueToPosition(value ?? internalValue)
    const minTransform = 1
    const maxTransform = (trackSize?.width ?? 0) - thumbSize - 1
    const transformX = minTransform + position * (maxTransform - minTransform)

    setTransforms({
      minTransform,
      maxTransform,
      transformX,
    })

    setGradientPosition(((transformX + thumbSize / 2) / (trackSize?.width ?? 1)) * 100)
  }, [value, internalValue, trackSize?.width, thumbSize, valueToPosition])

  // Memoize dots data when using steps
  const dotsData = useMemo(() => {
    if (!step || step <= 1) return null

    return Array.from({ length: Math.ceil((max - min) / step) + 1 }, (_, i) => {
      const dotValue = min + i * step
      const dotPosition = valueToPosition(dotValue)
      return {
        value: dotValue,
        position: dotPosition,
      }
    })
  }, [step, min, max, valueToPosition])

  // Memoize default value dot position
  const defaultDotPosition = useMemo(() => {
    if (!defaultValue || step > 1) return null
    return valueToPosition(defaultValue)
  }, [defaultValue, step, valueToPosition])

  // Handle position update
  const updatePosition = useEventCallback((clientX: number, isEnd?: boolean) => {
    const rect = sliderRef.current?.getBoundingClientRect()
    if (!rect) return

    const newPosition = clamp((clientX - rect.left) / rect.width, 0, 1)
    const newValue = Math.round(positionToValue(newPosition) / step) * step
    let clampedValue = clamp(newValue, min, max)

    // Add snap effect when near default value (if no step is set)
    if (defaultValue && step === 1) {
      const snapThreshold = (max - min) * 0.05 // 5% of the range
      const distanceToDefault = Math.abs(clampedValue - defaultValue)

      if (distanceToDefault <= snapThreshold) {
        clampedValue = defaultValue
      }
    }

    if (isEnd) {
      isDragging.current = false
    }

    if (value === undefined) {
      setInternalValue(clampedValue)
    }
    onChange?.(clampedValue)
  })

  // Sync external value to internal state
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  // Handle pointer events
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      e.preventDefault()
      e.stopPropagation()

      const thumb = thumbRef.current
      if (!thumb) return

      // 确保在所有数据变动之前调用 onChangeStart
      onChangeStart?.()

      isDragging.current = true
      thumb.setPointerCapture(e.pointerId)
      updatePosition(e.clientX)
      inputRef.current?.focus()

      const handleMove = (e: PointerEvent) => {
        if (!isDragging.current) return
        e.preventDefault()
        updatePosition(e.clientX)
      }

      const handleUp = (e: PointerEvent) => {
        if (!isDragging.current) return
        e.preventDefault()

        if (thumb.hasPointerCapture(e.pointerId)) {
          thumb.releasePointerCapture(e.pointerId)
        }

        updatePosition(e.clientX, true)
        isDragging.current = false

        // 确保调用 onChangeEnd 后不再发生任何的数据变动
        onChangeEnd?.()

        window.removeEventListener("pointermove", handleMove)
        window.removeEventListener("pointerup", handleUp)
        window.removeEventListener("pointercancel", handleUp)
      }

      window.addEventListener("pointermove", handleMove)
      window.addEventListener("pointerup", handleUp)
      window.addEventListener("pointercancel", handleUp)
    },
    [disabled, onChangeEnd, onChangeStart, updatePosition],
  )

  const handleSliderPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || e.target === thumbRef.current) return
      handlePointerDown(e)
    },
    [disabled, handlePointerDown],
  )

  const handleKeyDown = useEventCallback((e: React.KeyboardEvent) => {
    if (disabled) return

    const stepValue = e.shiftKey ? step * 10 : step
    let newValue = value ?? internalValue

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault()
        newValue = clamp(newValue - stepValue, min, max)
        break
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault()
        newValue = clamp(newValue + stepValue, min, max)
        break
      default:
        return
    }

    if (newValue !== value) {
      onChange?.(newValue)
    }
  })

  // Remove focus when disabled
  useEffect(() => {
    if (disabled && document.activeElement === inputRef.current) {
      inputRef.current?.blur()
    }
  }, [disabled])

  // Memoize styles
  const styles = useMemo(
    () =>
      rangeTv({
        currentDefaultValue: defaultStepValue === currentStepValue,
        hasStepOrDefault: step > 1 || defaultValue !== undefined,
        disabled,
      }),
    [defaultStepValue, currentStepValue, step, defaultValue, disabled],
  )

  return (
    <div
      ref={mergeRefs(sliderRef, ref)}
      onPointerDown={handleSliderPointerDown}
      className={tcx(styles.container(), className)}
      style={
        {
          height: trackSize?.height,
          width: trackSize?.width,
          "--active-color": disabled
            ? "var(--color-selected-background)"
            : "var(--color-accent-background)",
        } as CSSProperties
      }
    >
      <div
        className={styles.trackGradient()}
        style={{
          background: `linear-gradient(to right, var(--active-color) ${gradientPosition}%, transparent ${gradientPosition}%)`,
        }}
      />

      {(step > 1 || defaultValue) && (
        <div className={styles.dotContainer()}>
          {dotsData ? (
            dotsData.map(({ value: dotValue, position: dotPosition }) => {
              const { minTransform, maxTransform } = transforms
              const dotTransform = minTransform + dotPosition * (maxTransform - minTransform)
              const { dot } = rangeTv({
                defaultStepValue: defaultStepValue === dotValue,
                overStepValue: dotValue <= (value ?? internalValue),
              })
              return (
                <div
                  key={dotValue}
                  className={dot()}
                  style={{
                    left: dotTransform + thumbSize / 2,
                  }}
                />
              )
            })
          ) : defaultDotPosition ? (
            <div
              className={rangeTv({ defaultStepValue: true }).dot()}
              style={{
                left:
                  transforms.minTransform +
                  defaultDotPosition * (transforms.maxTransform - transforms.minTransform) +
                  thumbSize / 2,
              }}
            />
          ) : null}
        </div>
      )}

      <div
        ref={thumbRef}
        onPointerDown={handlePointerDown}
        className={styles.thumb()}
        style={{
          width: thumbSize,
          height: thumbSize,
          transform: `translate(${transforms.transformX}px, -50%)`,
          willChange: isDragging.current ? "transform" : "auto",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleKeyDown}
          className={styles.input()}
          tabIndex={disabled ? -1 : 0}
          readOnly
        />
      </div>
    </div>
  )
})

Range.displayName = "Range"
