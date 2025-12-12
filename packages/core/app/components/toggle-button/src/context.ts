import { createContext, useContext } from "react"

export interface ToggleGroupContextType {
  disabled?: boolean
  multiple?: boolean
  orientation?: "horizontal" | "vertical"
  loopFocus?: boolean
  value: string[]
  onChange: (value: string[]) => void
  readOnly?: boolean
}

export const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null)

export function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext)
  if (!context) {
    throw new Error("ToggleButton must be used within a ToggleGroup")
  }
  return context
}
