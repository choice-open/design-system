import { FloatingDelayGroup } from "@floating-ui/react"
import type { ReactNode } from "react"
import { AlertDialogProvider } from "../components/alert-dialog"
import type { AlertDialogProps } from "../components/alert-dialog"

export interface ChoiceUiProviderProps {
  children: ReactNode
  /**
   * AlertDialog configuration
   */
  alertDialog?: Omit<AlertDialogProps, "children">
  /**
   * Tooltip delay configuration
   * @default { open: 400, close: 200 }
   */
  tooltipDelay?: {
    open?: number
    close?: number
  }
}

const DEFAULT_TOOLTIP_DELAY = {
  open: 400,
  close: 200,
}

/**
 * Unified provider for Choice UI components.
 * Combines TooltipProvider and AlertDialogProvider for convenience.
 *
 * @example
 * ```tsx
 * import { ChoiceUiProvider } from "@choice-ui/react"
 *
 * function App() {
 *   return (
 *     <ChoiceUiProvider>
 *       <YourApp />
 *     </ChoiceUiProvider>
 *   )
 * }
 * ```
 */
export function ChoiceUiProvider(props: ChoiceUiProviderProps) {
  const { children, alertDialog, tooltipDelay = DEFAULT_TOOLTIP_DELAY } = props

  return (
    <FloatingDelayGroup delay={tooltipDelay}>
      <AlertDialogProvider {...alertDialog}>{children}</AlertDialogProvider>
    </FloatingDelayGroup>
  )
}
