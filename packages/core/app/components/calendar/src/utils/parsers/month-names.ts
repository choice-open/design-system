import { format, type Locale } from "date-fns"
import { enUS, zhCN } from "date-fns/locale"

// Dynamically generate month mapping
function generateMonthMapping(locale: Locale, patterns: string[]): Record<string, number> {
  const mapping: Record<string, number> = {}

  for (let month = 0; month < 12; month++) {
    const date = new Date(2024, month, 1) // Use fixed year

    for (const pattern of patterns) {
      const monthName = format(date, pattern, { locale }).toLowerCase()
      mapping[monthName] = month + 1
    }
  }

  return mapping
}

// Cache generated mapping
let englishMonthsCache: Record<string, number> | null = null
let chineseMonthsCache: Record<string, number> | null = null

// Get English month mapping
function getEnglishMonths(): Record<string, number> {
  if (!englishMonthsCache) {
    englishMonthsCache = {
      ...generateMonthMapping(enUS, ["MMMM", "MMM", "MMM."]), // Full name, abbreviation, dot abbreviation
      // Common variations
      sept: 9,
      "sept.": 9,
    }
  }
  return englishMonthsCache
}

// Get Chinese month mapping
function getChineseMonths(): Record<string, number> {
  if (!chineseMonthsCache) {
    chineseMonthsCache = {
      ...generateMonthMapping(zhCN, ["MMMM", "M月"]), // Chinese month name and number month
    }
  }
  return chineseMonthsCache
}

// Intelligent month recognition
export function parseMonthName(input: string, locale?: string): number | null {
  const normalized = input.toLowerCase().trim()

  // Select mapping table based on locale
  const isChineseLocale = locale === "zh-CN" || /[\u4e00-\u9fff]/.test(input)

  if (isChineseLocale) {
    const chineseMonths = getChineseMonths()

    if (chineseMonths[normalized]) {
      return chineseMonths[normalized]
    }
  }

  // English month check
  const englishMonths = getEnglishMonths()

  if (englishMonths[normalized]) {
    return englishMonths[normalized]
  }

  // Fuzzy matching English month (at least 2 characters)
  if (normalized.length >= 2) {
    for (const [monthName, monthNum] of Object.entries(englishMonths)) {
      if (monthName.startsWith(normalized) && monthName.length >= normalized.length) {
        return monthNum
      }
    }
  }

  return null
}

// Export compatible interface (backward compatibility)
export const englishMonths = new Proxy(
  {},
  {
    get: () => getEnglishMonths(),
  },
) as Record<string, number>

export const chineseMonths = new Proxy(
  {},
  {
    get: () => getChineseMonths(),
  },
) as Record<string, number>
