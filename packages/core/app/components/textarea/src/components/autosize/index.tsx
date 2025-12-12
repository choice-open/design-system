import React, { forwardRef, useMemo, useRef } from "react"
import { isBrowser, noop } from "./utils"
import calculateNodeHeight from "./calculate-node-height"
import getSizingData, { type SizingData } from "./get-sizing-data"
import {
  useComposedRef,
  useWindowResizeListener,
  useFontsLoadedListener,
  useFormResetListener,
} from "./hooks"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

type Style = Omit<NonNullable<TextareaProps["style"]>, "maxHeight" | "minHeight"> & {
  height?: number
  /**
   * To keep SSR/CSR consistent and stabilize the first paint, allow minHeight to be estimated internally.
   * Note: the final height is still controlled by the autosize logic via `height`.
   */
  minHeight?: string | number
}

export type TextareaHeightChangeMeta = {
  rowHeight: number
}

export interface TextareaAutosizeProps extends Omit<TextareaProps, "style"> {
  cacheMeasurements?: boolean
  /** Debounce delay (ms). Defaults to 0 (no debounce). */
  debounceMs?: number
  maxRows?: number
  minRows?: number
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void
  style?: Style
}

function parsePx(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (!trimmed.endsWith("px")) return undefined
  const num = Number(trimmed.slice(0, -2))
  return Number.isFinite(num) ? num : undefined
}

function estimateMinHeightPx(style: Style | undefined, minRows: number): number {
  const row = parsePx(style?.lineHeight) ?? 20

  const padding = parsePx(style?.padding)
  if (padding !== undefined) {
    return Math.max(0, Math.ceil(row * minRows + padding * 2))
  }

  const pt = parsePx(style?.paddingTop) ?? 0
  const pb = parsePx(style?.paddingBottom) ?? 0
  return Math.max(0, Math.ceil(row * minRows + pt + pb))
}

// Debounce hook
function useDebounce<T extends (...args: unknown[]) => void>(func: T, delay: number): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const funcRef = useRef(func)

  // Keep the function reference updated
  useIsomorphicLayoutEffect(() => {
    funcRef.current = func
  })

  // Use useMemo to create the debounced function
  const debouncedFn = useMemo(() => {
    return ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args)
      }, delay)
    }) as T
  }, [delay])

  return debouncedFn
}

export const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  function TextareaAutosize(
    {
      cacheMeasurements = true,
      maxRows,
      minRows = 1,
      onChange = noop,
      onHeightChange = noop,
      style,
      debounceMs = 0,
      ...props
    },
    userRef,
  ) {
    const isControlled = props.value !== undefined
    const libRef = React.useRef<HTMLTextAreaElement | null>(null)
    const ref = useComposedRef(libRef, userRef)
    const heightRef = React.useRef(0)
    const measurementsCacheRef = React.useRef<SizingData>()
    const lastValueRef = React.useRef("")

    // Normalize inputs
    const normalizedMinRows = Math.max(minRows, 1)
    const normalizedMaxRows = maxRows && maxRows >= normalizedMinRows ? maxRows : undefined

    const resizeTextarea = React.useCallback(() => {
      const node = libRef.current
      if (!node || !isBrowser) return

      const currentValue = node.value || node.placeholder || ""

      try {
        // Always get fresh sizing data when resizing to account for style changes
        const nodeSizingData = getSizingData(node)

        if (!nodeSizingData) {
          // If sizing data is not available, the element may not be fully rendered yet.
          // Retry on the next frame.
          requestAnimationFrame(() => {
            const retryData = getSizingData(node)
            if (!retryData) return

            if (cacheMeasurements) {
              measurementsCacheRef.current = retryData
              lastValueRef.current = currentValue
            }

            const [height, rowHeight] = calculateNodeHeight(
              retryData,
              currentValue,
              normalizedMinRows,
              normalizedMaxRows,
            )

            if (heightRef.current !== height) {
              heightRef.current = height
              node.style.setProperty("height", `${height}px`, "important")
              onHeightChange(height, { rowHeight })
            }
          })
          return
        }

        if (cacheMeasurements) {
          measurementsCacheRef.current = nodeSizingData
          lastValueRef.current = currentValue
        }

        const [height, rowHeight] = calculateNodeHeight(
          nodeSizingData,
          currentValue,
          normalizedMinRows,
          normalizedMaxRows,
        )

        if (heightRef.current !== height) {
          heightRef.current = height
          node.style.setProperty("height", `${height}px`, "important")
          onHeightChange(height, { rowHeight })
        }
      } catch (error) {
        // Silently ignore errors
      }
    }, [cacheMeasurements, normalizedMinRows, normalizedMaxRows, onHeightChange])

    // Apply debounce
    const debouncedResize = useDebounce(resizeTextarea, debounceMs)

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          if (debounceMs > 0) {
            debouncedResize()
          } else {
            resizeTextarea()
          }
        }
        onChange(event)
      },
      [isControlled, debounceMs, debouncedResize, resizeTextarea, onChange],
    )

    // Form reset listener callback
    const formResetCallback = React.useCallback(() => {
      if (!isControlled) {
        const currentValue = libRef.current?.value || ""
        requestAnimationFrame(() => {
          const node = libRef.current
          if (node && currentValue !== node.value) {
            resizeTextarea()
          }
        })
      }
    }, [isControlled, resizeTextarea])

    // All hooks must be called unconditionally
    useIsomorphicLayoutEffect(resizeTextarea)
    useFormResetListener(libRef, formResetCallback)
    useWindowResizeListener(resizeTextarea)
    useFontsLoadedListener(resizeTextarea)

    // Track element visibility changes (useful for popover/dialog)
    React.useEffect(() => {
      const node = libRef.current
      if (!node || !isBrowser || typeof IntersectionObserver === "undefined") {
        return
      }

      // Use IntersectionObserver to detect when it becomes visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // When it becomes visible, wait one frame to ensure layout is ready
              requestAnimationFrame(() => {
                resizeTextarea()
              })
            }
          })
        },
        { threshold: 0 },
      )

      observer.observe(node)

      return () => {
        observer.disconnect()
      }
    }, [resizeTextarea])

    // When style changes, trigger resize to recalculate with new line height / padding
    React.useEffect(() => {
      resizeTextarea()
    }, [style?.lineHeight, style?.padding, resizeTextarea])

    // Merge styles
    const mergedStyle = useMemo(() => {
      const minHeightPx = estimateMinHeightPx(style, normalizedMinRows)
      const nextStyle: React.CSSProperties = {
        ...(style ?? {}),
        minHeight: `${minHeightPx}px`,
      }

      // Avoid hydration warnings caused by different CSS shorthand serialization between SSR/CSR.
      if (nextStyle.padding !== undefined) {
        const { padding, ...rest } = nextStyle
        return {
          ...rest,
          paddingTop: padding,
          paddingRight: padding,
          paddingBottom: padding,
          paddingLeft: padding,
        }
      }

      return nextStyle
    }, [style, normalizedMinRows])

    return (
      <textarea
        {...props}
        style={mergedStyle}
        onChange={isBrowser ? handleChange : onChange}
        ref={ref}
      />
    )
  },
)

TextareaAutosize.displayName = "TextareaAutosize"
