import { getDaysInMonth, isValid } from "date-fns"

// Validate date range
export function validateDateRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return false
  if (maxDate && date > maxDate) return false
  return true
}

// Validate time range
export function validateTimeRange(time: string, minTime?: string, maxTime?: string): boolean {
  if (!time) return false

  const [hours, minutes] = time.split(":").map(Number)
  const timeMinutes = hours * 60 + minutes

  if (minTime) {
    const [minHours, minMinutes] = minTime.split(":").map(Number)
    const minTimeMinutes = minHours * 60 + minMinutes
    if (timeMinutes < minTimeMinutes) return false
  }

  if (maxTime) {
    const [maxHours, maxMinutes] = maxTime.split(":").map(Number)
    const maxTimeMinutes = maxHours * 60 + maxMinutes
    if (timeMinutes > maxTimeMinutes) return false
  }

  return true
}

// Validate date existence - using date-fns optimization
export function isValidDateExists(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12) return false
  if (day < 1) return false

  // Using date-fns to check the number of days in the month
  const testDate = new Date(year, month - 1, 1)
  const daysInMonth = getDaysInMonth(testDate)

  return day <= daysInMonth
}

// Get the last day of the month - using date-fns optimization
export function getLastDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month - 1, 1)
  return getDaysInMonth(date)
}

// Intelligent date correction - correct invalid dates to reasonable dates
export function smartCorrectDate(
  year: number,
  month: number,
  day: number,
): { day: number; month: number; year: number } {
  // Correct year
  const correctedYear = smartCorrectYear(year)

  // Correct month
  let correctedMonth = month
  if (month < 1) {
    correctedMonth = 1
  } else if (month > 12) {
    correctedMonth = 12
  }

  // Correct date - using date-fns to get the accurate number of days
  let correctedDay = day
  if (day < 1) {
    correctedDay = 1
  } else {
    const lastDay = getLastDayOfMonth(correctedYear, correctedMonth)
    if (day > lastDay) {
      correctedDay = lastDay
    }
  }

  return {
    year: correctedYear,
    month: correctedMonth,
    day: correctedDay,
  }
}

// Intelligent year correction
export function smartCorrectYear(year: number): number {
  if (year < 1950) {
    // 1111 → 2011, 1234 → 2024, 999 → 2999, 23 → 2023
    if (year < 100) {
      return year < 50 ? 2000 + year : 1900 + year
    } else if (year < 1000) {
      return 2000 + year
    } else {
      // 1000-1949 → 2000+ (last two digits)
      return 2000 + (year % 100)
    }
  } else if (year > 2100) {
    // Too distant years adjusted to reasonable range 9999 → 2024 + 9 = 2033
    return 2024 + (year % 10)
  }
  return year
}

// Quick date validation - using date-fns's isValid
export function quickValidateDate(date: Date): boolean {
  return isValid(date)
}
