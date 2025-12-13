import { format, isDate, isValid, type Locale, Quarter as Quarters } from "date-fns"
import { zhCN } from "date-fns/locale"
import type { Quarter } from "../types"
import { resolveLocale, isChineseLocale } from "./locale"

// Quarter processing utility functions
export const quarterUtils = {
  /** Safely extract year number from various inputs */
  extractYear(input: Date | number | undefined): number | undefined {
    if (isDate(input) && isValid(input)) {
      return input.getFullYear()
    }
    if (typeof input === "number" && Number.isFinite(input)) {
      return input
    }
    return undefined
  },

  /** Get current year */
  getCurrentYear(): number {
    return new Date().getFullYear()
  },

  /** Get current quarter number (1-4) */
  getCurrentQuarterNumber(): Quarters {
    const currentMonth = new Date().getMonth() + 1 // 1-12
    return Math.ceil(currentMonth / 3) as Quarters
  },

  /** Validate if year is in valid range */
  isYearInRange(year: number, minYear?: number, maxYear?: number): boolean {
    const minValid = minYear === undefined || year >= minYear
    const maxValid = maxYear === undefined || year <= maxYear
    return minValid && maxValid
  },

  /** Create quarter start date */
  createQuarterStartDate(quarter: number, year: number): Date {
    const startMonth = (quarter - 1) * 3
    return new Date(year, startMonth, 1)
  },

  /** Create quarter end date */
  createQuarterEndDate(quarter: number, year: number): Date {
    const endMonth = (quarter - 1) * 3 + 2
    return new Date(year, endMonth + 1, 0) // Next month 0th day = last day of this month
  },
}

/** Get quarter month names */
export function getQuarterMonths(quarter: number, locale: Locale | string = zhCN): string[] {
  const safeLocale = resolveLocale(locale)
  const quarterStartMonth = (quarter - 1) * 3 // 0, 3, 6, 9

  const months: string[] = []
  for (let i = 0; i < 3; i++) {
    const monthIndex = quarterStartMonth + i
    // Create the first day of the month
    const date = new Date(2024, monthIndex, 1) // Year is not important, only used to format month name

    // Format month name based on language environment
    const monthFormat = isChineseLocale(safeLocale) ? "MMMM" : "MMM"
    const monthName = format(date, monthFormat, { locale: safeLocale })
    months.push(monthName)
  }

  return months
}

/** Create quarter object */
export function createQuarter(
  quarter: Quarters,
  year: number,
  locale: Locale | string = zhCN,
): Quarter {
  const safeLocale = resolveLocale(locale)

  // Dynamically generate quarter labels
  const quarterLabels: Record<string, (q: number) => string> = {
    "zh-CN": (q: number) => `${["一", "二", "三", "四"][q - 1]}季度`,
    "en-US": (q: number) => `Q${q}`,
    "ja-JP": (q: number) => `第${q}四半期`,
    "ko-KR": (q: number) => `${q}분기`,
    "fr-FR": (q: number) => `T${q}`,
    "de-DE": (q: number) => `Q${q}`,
    "es-ES": (q: number) => `T${q}`,
  }

  const localeCode = safeLocale.code || "en-US"
  const labelGenerator = quarterLabels[localeCode] || quarterLabels["en-US"]
  const label = labelGenerator(quarter)
  const months = getQuarterMonths(quarter, locale)

  return {
    quarter,
    year,
    label,
    months,
  }
}

/** Get current quarter */
export function getCurrentQuarter(year?: number, locale: Locale | string = zhCN): Quarter {
  const currentYear = year ?? quarterUtils.getCurrentYear()
  const currentQuarter = quarterUtils.getCurrentQuarterNumber()

  return createQuarter(currentQuarter, currentYear, locale)
}

/** Get all quarters of a year */
export function getYearQuarters(year: number, locale: Locale | string = zhCN): Quarter[] {
  return [1, 2, 3, 4].map((quarter) => createQuarter(quarter as Quarters, year, locale))
}

/** Check if two quarters are equal */
export function isQuarterEqual(quarter1: Quarter, quarter2: Quarter): boolean {
  return quarter1.quarter === quarter2.quarter && quarter1.year === quarter2.year
}

/** Format quarter display */
export function formatQuarter(quarter: Quarter): string {
  return `${quarter.year}年 ${quarter.label}`
}

/** Get quarter date range */
export function getQuarterDateRange(quarter: Quarter): { end: Date; start: Date } {
  const start = quarterUtils.createQuarterStartDate(quarter.quarter, quarter.year)
  const end = quarterUtils.createQuarterEndDate(quarter.quarter, quarter.year)

  return { start, end }
}
