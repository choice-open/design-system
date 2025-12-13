import { isValid } from "date-fns"
import { parseMonthName } from "./month-names"

// Enhanced English date parsing
export function parseEnglishDate(input: string): Date | null {
  const normalized = input.toLowerCase().trim()
  const now = new Date()
  const currentYear = now.getFullYear()

  // Pattern 1: "may 15, 2024" or "may 15 2024" or "15 may 2024" or "15th may 2024" (contains year, priority matching)
  const fullDatePattern =
    /^(?:([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})|(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+)\s+(\d{4}))$/
  const fullDateMatch = normalized.match(fullDatePattern)

  if (fullDateMatch) {
    const monthName = fullDateMatch[1] || fullDateMatch[5]
    const dayStr = fullDateMatch[2] || fullDateMatch[4]
    const yearStr = fullDateMatch[3] || fullDateMatch[6]

    const month = parseMonthName(monthName)
    const day = parseInt(dayStr, 10)
    const year = parseInt(yearStr, 10)

    if (month && day >= 1 && day <= 31 && year >= 1900 && year <= 2100) {
      const date = new Date(year, month - 1, day)
      if (isValid(date) && date.getDate() === day) {
        return date
      }
    }
  }

  // Pattern 2: "may 15" or "may 15th" or "15 may" or "15th may" (does not contain year)
  const monthDayPattern =
    /^(?:([a-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?|(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+))$/
  const monthDayMatch = normalized.match(monthDayPattern)

  if (monthDayMatch) {
    const monthName = monthDayMatch[1] || monthDayMatch[4]
    const dayStr = monthDayMatch[2] || monthDayMatch[3]

    const month = parseMonthName(monthName)
    const day = parseInt(dayStr, 10)

    if (month && day >= 1 && day <= 31) {
      const date = new Date(currentYear, month - 1, day)
      if (isValid(date) && date.getDate() === day) {
        return date
      }
    }
  }

  // Pattern 3: only input month name "may" → May 1st of the current year
  const monthOnlyPattern = /^[a-z]{3,}$/
  if (monthOnlyPattern.test(normalized)) {
    const month = parseMonthName(normalized)

    if (month) {
      const date = new Date(currentYear, month - 1, 1)

      if (isValid(date)) {
        return date
      }
    }
  }

  return null
}
