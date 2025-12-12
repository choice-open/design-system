import forceHiddenStyles from "./force-hidden-styles"
import { isBrowser } from "./utils"
import type { SizingData } from "./get-sizing-data"

export type CalculatedNodeHeights = [height: number, rowHeight: number]

// Use WeakMap to cache hidden elements and avoid memory leaks
const hiddenTextareaCache = new WeakMap<Document, HTMLTextAreaElement>()

const getOrCreateHiddenTextarea = (): HTMLTextAreaElement | null => {
  if (!isBrowser || !document?.createElement) {
    return null
  }

  let hiddenTextarea = hiddenTextareaCache.get(document)

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea")
    hiddenTextarea.setAttribute("tabindex", "-1")
    hiddenTextarea.setAttribute("aria-hidden", "true")
    forceHiddenStyles(hiddenTextarea)
    hiddenTextareaCache.set(document, hiddenTextarea)
  }

  return hiddenTextarea
}

const getHeight = (node: HTMLElement, sizingData: SizingData): number => {
  const height = node.scrollHeight

  if (sizingData.sizingStyle.boxSizing === "border-box") {
    // border-box: add border, since height = content + padding + border
    return height + sizingData.borderSize
  }

  // remove padding, since height = content
  return height - sizingData.paddingSize
}

export default function calculateNodeHeight(
  sizingData: SizingData,
  value: string,
  minRows = 1,
  maxRows = Infinity,
): CalculatedNodeHeights {
  // SSR guard: return an estimated value on the server
  if (!isBrowser || !document?.createElement) {
    const estimatedRowHeight = 20
    const estimatedHeight = Math.max(estimatedRowHeight * minRows, estimatedRowHeight)
    return [estimatedHeight, estimatedRowHeight]
  }

  // Clamp inputs
  if (minRows < 1) minRows = 1
  if (maxRows < minRows) maxRows = minRows

  const hiddenTextarea = getOrCreateHiddenTextarea()
  if (!hiddenTextarea) {
    // Fallback
    const fallbackRowHeight = 16
    return [fallbackRowHeight * minRows, fallbackRowHeight]
  }

  // Ensure the element is attached to the DOM
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea)
  }

  const { paddingSize, borderSize, sizingStyle } = sizingData
  const { boxSizing } = sizingStyle

  try {
    // Apply sizing styles
    Object.keys(sizingStyle).forEach((_key) => {
      const key = _key as keyof typeof sizingStyle
      const value = sizingStyle[key]
      if (value != null) {
        hiddenTextarea.style[key] = String(value)
      }
    })

    forceHiddenStyles(hiddenTextarea)

    // Set value and measure
    hiddenTextarea.value = value || "x"
    let height = getHeight(hiddenTextarea, sizingData)

    // Firefox bug workaround: set twice
    hiddenTextarea.value = value || "x"
    height = getHeight(hiddenTextarea, sizingData)

    // Measure single row height
    hiddenTextarea.value = "x"
    const rowHeight = Math.max(hiddenTextarea.scrollHeight - paddingSize, 1)

    // Compute min height
    let minHeight = rowHeight * minRows
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)

    // Compute max height
    if (maxRows !== Infinity) {
      let maxHeight = rowHeight * maxRows
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize
      }
      height = Math.min(maxHeight, height)
    }

    return [Math.max(height, 1), Math.max(rowHeight, 1)]
  } catch (error) {
    // Fallback on error
    const fallbackRowHeight = 16
    return [fallbackRowHeight * minRows, fallbackRowHeight]
  }
}

// Cleanup helper (for tests or special cases)
export const cleanupHiddenTextarea = (): void => {
  if (!isBrowser) return

  const hiddenTextarea = hiddenTextareaCache.get(document)
  if (hiddenTextarea?.parentNode) {
    hiddenTextarea.parentNode.removeChild(hiddenTextarea)
  }
  hiddenTextareaCache.delete(document)
}
