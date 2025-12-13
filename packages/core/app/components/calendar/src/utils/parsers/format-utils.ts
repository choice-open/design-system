import { type Locale } from "date-fns"
import { enUS } from "date-fns/locale"
import type { DateDataFormat } from "../../types"
import { defaultLocaleMap } from "../constants"

// Get language environment
export function getLocale(localeKey?: string): Locale {
  if (!localeKey) return enUS
  return defaultLocaleMap[localeKey] || enUS
}

// Format automatic recognition
export function detectDateFormat(input: string): DateDataFormat {
  if (input.includes("年") && input.includes("月") && input.includes("日")) {
    return "yyyy年MM月dd日"
  }
  if (input.includes("/")) {
    // Check if it is American or European
    const parts = input.split("/")
    if (parts.length >= 2) {
      const first = parseInt(parts[0], 10)
      if (first > 12) return "dd/MM/yyyy" // European
      return "MM/dd/yyyy" // American
    }
  }
  if (input.includes("-")) return "yyyy-MM-dd"
  if (input.includes(".")) return "dd.MM.yyyy"
  return "yyyy-MM-dd" // Default
}
