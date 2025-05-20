import { createContext, useContext } from "react"

export interface CheckboxContextValue {
  value?: boolean
  disabled?: boolean
  id: string
  descriptionId?: string
  onChange: (value: boolean) => void
  variant?: "default" | "accent" | "outline"
  mixed?: boolean
}

export const CheckboxContext = createContext<CheckboxContextValue | null>(null)

export function useCheckboxContext() {
  const context = useContext(CheckboxContext)
  if (!context) {
    throw new Error("Checkbox components must be used within a Checkbox component")
  }
  return context
}
