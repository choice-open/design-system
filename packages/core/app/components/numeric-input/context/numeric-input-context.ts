import { createContext, useContext } from "react"
import { PressMoveProps } from "~/hooks"
import { NumericInputValue } from "../types"
import { NumericChangeDetail } from "../numeric-input"

export interface NumericInputContextValue {
  variant?: "default" | "dark" | "reset"
  // 状态
  value?: NumericInputValue
  defaultValue?: NumericInputValue
  disabled?: boolean
  readOnly?: boolean
  selected?: boolean
  focused?: boolean
  handlerPressed?: boolean

  // 配置
  min?: number
  max?: number
  step?: number
  shiftStep?: number
  decimal?: number
  expression?: string

  // 事件处理方法
  onChange?: (value: NumericInputValue, detail: NumericChangeDetail) => void
  onEmpty?: () => void
  onPressStart?: PressMoveProps["onPressStart"]
  onPressEnd?: PressMoveProps["onPressEnd"]
  onIsEditingChange?: (isEditing: boolean) => void

  // 处理程序
  handlerProps?: Record<string, any>
}

export const NumericInputContext = createContext<NumericInputContextValue | undefined>(undefined)

export function useNumericInputContext(): NumericInputContextValue {
  const context = useContext(NumericInputContext)

  if (!context) {
    throw new Error("useNumericInputContext must be used within a NumericInput component")
  }

  return context
}
