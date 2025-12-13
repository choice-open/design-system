import { isDate, isValid } from "date-fns"

export const yearUtils = {
  extractYear(input: Date | number | undefined): number | undefined {
    if (isDate(input) && isValid(input)) {
      return input.getFullYear()
    }
    if (typeof input === "number" && Number.isFinite(input)) {
      return input
    }
    return undefined
  },

  /** Create year start date */
  createYearDate(year: number): Date {
    return new Date(year, 0, 1)
  },

  /** Get current year */
  getCurrentYear(): number {
    return new Date().getFullYear()
  },

  /** Validate if year is in valid range */
  isYearInRange(year: number, minYear?: number, maxYear?: number): boolean {
    const minValid = minYear === undefined || year >= minYear
    const maxValid = maxYear === undefined || year <= maxYear
    return minValid && maxValid
  },
}
