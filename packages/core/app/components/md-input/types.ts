import { type TextareaProps } from "../textarea"

export interface MdInputProps extends Omit<TextareaProps, "onChange"> {
  disabled?: boolean
  i18n?: {
    preview: string
    write: string
  }
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  showPreview?: boolean
  showToolbar?: boolean
  theme?: "light" | "dark"
  toolbarActions?: string[]
  value?: string
}
