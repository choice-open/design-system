import { isBrowser, pick } from "./utils"

const SIZING_STYLE = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
  "wordSpacing",
  "scrollbarGutter",
] as const

type SizingProps = Extract<(typeof SIZING_STYLE)[number], keyof CSSStyleDeclaration>

type SizingStyle = Pick<CSSStyleDeclaration, SizingProps>

export type SizingData = {
  borderSize: number
  paddingSize: number
  sizingStyle: SizingStyle
}

// SSR-safe IE detection
const isIE = isBrowser
  ? !!(document.documentElement as Element & { currentStyle?: unknown }).currentStyle
  : false

// Safe parseFloat with a default fallback
const safeParseFloat = (value: string | null | undefined, defaultValue = 0): number => {
  if (!value) return defaultValue
  const parsed = parseFloat(value)
  return isNaN(parsed) ? defaultValue : parsed
}

const getSizingData = (node: HTMLElement): SizingData | null => {
  // SSR guard
  if (!isBrowser || !window?.getComputedStyle) {
    return null
  }

  try {
    // Ensure the element is connected to the DOM
    if (!node.isConnected) {
      return null
    }

    // Check if the element has a size (avoid measuring in hidden popover/dialog)
    const rect = node.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) {
      // The element may be hidden, but we still try to read computed styles.
      // In some cases it can be display:none while sizing is still needed.
    }

    const style = window.getComputedStyle(node)

    if (!style) {
      return null
    }

    const sizingStyle = pick(
      SIZING_STYLE as unknown as SizingProps[],
      style as unknown as Record<string, unknown>,
    ) as SizingStyle
    const { boxSizing } = sizingStyle

    // probably node is detached from DOM, can't read computed dimensions
    if (!boxSizing || boxSizing === "") {
      return null
    }

    // IE (Edge has already correct behaviour) returns content width as computed width
    // so we need to add manually padding and border widths
    if (isIE && boxSizing === "border-box" && sizingStyle.width) {
      const width = safeParseFloat(sizingStyle.width as string)
      const borderRight = safeParseFloat(sizingStyle.borderRightWidth as string)
      const borderLeft = safeParseFloat(sizingStyle.borderLeftWidth as string)
      const paddingRight = safeParseFloat(sizingStyle.paddingRight as string)
      const paddingLeft = safeParseFloat(sizingStyle.paddingLeft as string)

      sizingStyle.width = `${width + borderRight + borderLeft + paddingRight + paddingLeft}px`
    }

    const paddingSize =
      safeParseFloat(sizingStyle.paddingBottom as string) +
      safeParseFloat(sizingStyle.paddingTop as string)

    const borderSize =
      safeParseFloat(sizingStyle.borderBottomWidth as string) +
      safeParseFloat(sizingStyle.borderTopWidth as string)

    return {
      sizingStyle,
      paddingSize: Math.max(paddingSize, 0),
      borderSize: Math.max(borderSize, 0),
    }
  } catch (error) {
    // Fallback on error
    return null
  }
}

export default getSizingData
