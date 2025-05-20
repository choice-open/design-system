import { createContext, useContext } from "react"

export interface SegmentedContextValue {
  value?: string
  onChange: (value: string) => void
  groupId: string
  variant?: "default" | "dark"
}

export const SegmentedContext = createContext<SegmentedContextValue | null>(null)

export function useSegmentedContext() {
  const context = useContext(SegmentedContext)
  if (!context) {
    throw new Error("SegmentedItem must be used within a Segmented component")
  }
  return context
}
