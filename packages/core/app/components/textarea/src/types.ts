import type { HTMLProps, ReactNode, TextareaHTMLAttributes } from "react"

export interface TextareaProps extends Omit<
  HTMLProps<HTMLTextAreaElement>,
  "value" | "onChange" | "size"
> {
  /** Whether to allow newline characters when pressing Enter.
   * @default true
   */
  allowNewline?: boolean
  children?: ReactNode
  className?: string
  contentRef?: React.RefObject<HTMLDivElement>
  /** Focus selection mode.
   * @default "all"
   */
  focusSelection?: "all" | "end" | "none"
  /** Line height in pixels for calculating textarea height.
   * @default 16
   */
  lineHeight?: number
  /** Maximum number of rows.
   * @default undefined (no maximum)
   */
  maxRows?: number
  /** Minimum number of rows.
   * @default 3
   */
  minRows?: number
  onChange?: (value: string) => void
  onIsEditingChange?: (isEditing: boolean) => void
  /** Padding in pixels (top/bottom) for calculating textarea height.
   * @default 4 (py-1)
   */
  padding?: number
  /** Resize behavior mode.
   * @default "auto"
   */
  resize?: "auto" | "handle" | false
  scrollRef?: React.RefObject<HTMLDivElement>
  selected?: boolean
  value?: string
  /** Visual style variant of the textarea.
   * @default "default"
   */
  variant?: "default" | "light" | "dark" | "reset"
}

export interface TextareaContentProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "style"
> {
  className?: string
  /** Debounce delay (ms).
   * @default 0 (no debounce)
   */
  debounceMs?: number
  /** Maximum number of rows.
   * @default undefined (no maximum)
   */
  maxRows?: number
  /** Minimum number of rows.
   * @default 3
   */
  minRows?: number
  onChange?: (value: string) => void
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void
  style?: Omit<
    NonNullable<TextareaHTMLAttributes<HTMLTextAreaElement>["style"]>,
    "maxHeight" | "minHeight"
  > & {
    height?: number
  }
  value?: string
}
