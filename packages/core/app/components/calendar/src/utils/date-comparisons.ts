import { tz, TZDate } from "@date-fns/tz"
import {
  isSameDay,
  isSameMonth,
  isSameYear,
  isSameWeek,
  isToday,
  isWithinInterval,
  startOfDay,
  endOfDay,
  isValid,
} from "date-fns"

// === Export type definitions ===

/**
 * Date comparison precision mode
 * - 'exact-time': Exact time comparison (includes hours, minutes, seconds, milliseconds)
 * - 'date-only': Date only comparison (ignores time part, compares year, month, day)
 */
export type DateComparisonMode = "exact-time" | "date-only"

/**
 * Time zone aware date parts
 */
export interface DateParts {
  /** Day (1-31) */
  day: number
  /** Month (0-11) */
  month: number
  /** Weekday (0-6, 0 is Sunday) */
  weekday: number
  /** Year */
  year: number
}

// === Internal utility functions ===

/**
 * LRU cache, avoid duplicate creation of TZDate
 */
class TimeZoneCache {
  private cache = new Map<string, TZDate>()
  private maxSize = 100

  get(key: string): TZDate | undefined {
    const value = this.cache.get(key)
    if (value) {
      // LRU: reset to update access order
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: string, value: TZDate): void {
    if (this.cache.size >= this.maxSize) {
      // Delete oldest entry
      const firstKey = this.cache.keys().next().value
      if (firstKey) this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }

  clear(): void {
    this.cache.clear()
  }
}

const tzDateCache = new TimeZoneCache()

/**
 * Create time zone aware date object (with cache)
 */
function createTZDateCached(date: Date, timeZone: string): TZDate {
  if (!isValid(date)) {
    throw new Error(`Invalid date: ${date}`)
  }

  try {
    const cacheKey = `${date.getTime()}-${timeZone}`
    let tzDate = tzDateCache.get(cacheKey)

    if (!tzDate) {
      tzDate = tz(timeZone)(date) as TZDate
      tzDateCache.set(cacheKey, tzDate)
    }

    return tzDate
  } catch (error) {
    console.warn(`Invalid timezone: ${timeZone}, falling back to local timezone`)
    return date as TZDate
  }
}

/**
 * Create time zone context options (for date-fns 4.0+)
 */
export function createTimeZoneContext(timeZone?: string) {
  if (!timeZone) return undefined

  try {
    return { in: tz(timeZone) }
  } catch (error) {
    console.warn(`Invalid timezone: ${timeZone}, using default context`)
    return undefined
  }
}

// === Core comparison functions ===

/**
 * Time zone aware date comparison (only compares date part)
 *
 * @param date1 First date
 * @param date2 Second date
 * @param timeZone Time zone (optional, default uses local timezone)
 * @returns Whether they are the same day
 *
 * @example
 * ```typescript
 * const date1 = new Date('2025-01-15T23:30:00Z')    // UTC
 * const date2 = new Date('2025-01-16T08:30:00+09:00') // JST (same day)
 * isSameDayInTimeZone(date1, date2, 'Asia/Tokyo') // true
 * ```
 */
export function isSameDayInTimeZone(date1: Date, date2: Date, timeZone?: string): boolean {
  if (!isValid(date1) || !isValid(date2)) return false
  if (!timeZone) return isSameDay(date1, date2)

  try {
    const tz1 = createTZDateCached(date1, timeZone)
    const tz2 = createTZDateCached(date2, timeZone)
    return isSameDay(tz1, tz2)
  } catch (error) {
    console.warn("Date comparison failed, falling back to local timezone:", error)
    return isSameDay(date1, date2)
  }
}

/**
 * Time zone aware month comparison
 */
export function isSameMonthInTimeZone(date1: Date, date2: Date, timeZone?: string): boolean {
  if (!isValid(date1) || !isValid(date2)) return false
  if (!timeZone) return isSameMonth(date1, date2)

  try {
    const tz1 = createTZDateCached(date1, timeZone)
    const tz2 = createTZDateCached(date2, timeZone)
    return isSameMonth(tz1, tz2)
  } catch (error) {
    console.warn("Month comparison failed, falling back to local timezone:", error)
    return isSameMonth(date1, date2)
  }
}

/**
 * Time zone aware year comparison
 */
export function isSameYearInTimeZone(date1: Date, date2: Date, timeZone?: string): boolean {
  if (!isValid(date1) || !isValid(date2)) return false
  if (!timeZone) return isSameYear(date1, date2)

  try {
    const tz1 = createTZDateCached(date1, timeZone)
    const tz2 = createTZDateCached(date2, timeZone)
    return isSameYear(tz1, tz2)
  } catch (error) {
    console.warn("Year comparison failed, falling back to local timezone:", error)
    return isSameYear(date1, date2)
  }
}

/**
 * Time zone aware week comparison
 */
export function isSameWeekInTimeZone(date1: Date, date2: Date, timeZone?: string): boolean {
  if (!isValid(date1) || !isValid(date2)) return false
  if (!timeZone) return isSameWeek(date1, date2)

  try {
    const tz1 = createTZDateCached(date1, timeZone)
    const tz2 = createTZDateCached(date2, timeZone)
    return isSameWeek(tz1, tz2)
  } catch (error) {
    console.warn("Week comparison failed, falling back to local timezone:", error)
    return isSameWeek(date1, date2)
  }
}

/**
 * Time zone aware today check
 */
export function isTodayInTimeZone(date: Date, timeZone?: string): boolean {
  if (!isValid(date)) return false

  const contextOptions = createTimeZoneContext(timeZone)
  return isToday(date, contextOptions)
}

/**
 * Check if date is within specified range (supports time zone and comparison mode)
 *
 * @param date Date to check
 * @param rangeStart Range start date
 * @param rangeEnd Range end date
 * @param timeZone Time zone (optional)
 * @param mode Comparison mode (default is date-only)
 * @returns Whether it is within the range
 *
 * @example
 * ```typescript
 * const date = new Date('2025-01-15T14:30:00')
 * const start = new Date('2025-01-10T00:00:00')
 * const end = new Date('2025-01-20T23:59:59')
 *
 * isWithinRange(date, start, end, 'Asia/Shanghai', 'date-only') // true
 * ```
 */
export function isWithinRange(
  date: Date,
  rangeStart: Date,
  rangeEnd: Date,
  timeZone?: string,
  mode: DateComparisonMode = "date-only",
): boolean {
  if (!isValid(date) || !isValid(rangeStart) || !isValid(rangeEnd)) return false

  const contextOptions = createTimeZoneContext(timeZone)

  try {
    if (mode === "exact-time") {
      // Exact time comparison
      const interval = { start: rangeStart, end: rangeEnd }
      return isWithinInterval(date, interval, contextOptions)
    } else {
      // Date only comparison: convert all dates to start and end of the day
      const dateStart = startOfDay(date, contextOptions)
      const rangeStartDay = startOfDay(rangeStart, contextOptions)
      const rangeEndDay = endOfDay(rangeEnd, contextOptions)

      const interval = { start: rangeStartDay, end: rangeEndDay }
      return isWithinInterval(dateStart, interval, contextOptions)
    }
  } catch (error) {
    console.warn("Range comparison failed:", error)
    return false
  }
}

// === Utility functions ===

/**
 * Get time zone aware detailed date parts
 */
export function getDateParts(date: Date, timeZone?: string): DateParts {
  if (!isValid(date)) {
    throw new Error(`Invalid date: ${date}`)
  }

  if (!timeZone) {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      weekday: date.getDay(),
    }
  }

  try {
    const tzDate = createTZDateCached(date, timeZone)
    return {
      year: tzDate.getFullYear(),
      month: tzDate.getMonth(),
      day: tzDate.getDate(),
      weekday: tzDate.getDay(),
    }
  } catch (error) {
    console.warn("Failed to get date parts with timezone, using local timezone:", error)
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      weekday: date.getDay(),
    }
  }
}

/**
 * Get the unique key of the date (for Map/Set etc. data structures)
 *
 * @param date Date object
 * @param timeZone Time zone (optional)
 * @param includeTime Whether to include time part (default is false)
 * @returns Formatted date key
 *
 * @example
 * ```typescript
 * getDateKey(new Date('2025-01-15'), 'Asia/Shanghai') // "2025-01-15"
 * getDateKey(new Date('2025-01-15T14:30:00'), 'Asia/Shanghai', true) // "2025-01-15T14:30:00"
 * ```
 */
export function getDateKey(date: Date, timeZone?: string, includeTime = false): string {
  if (!isValid(date)) {
    throw new Error(`Invalid date: ${date}`)
  }

  const { year, month, day } = getDateParts(date, timeZone)
  const dateKey = `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`

  if (!includeTime) return dateKey

  // Include time part
  const timeKey = timeZone
    ? createTZDateCached(date, timeZone).toISOString().split("T")[1]
    : date.toISOString().split("T")[1]

  return `${dateKey}T${timeKey}`
}

/**
 * Batch compare date arrays for equality (time zone aware)
 */
export function areDatesEqual(
  dates1: Date[],
  dates2: Date[],
  timeZone?: string,
  mode: DateComparisonMode = "date-only",
): boolean {
  if (dates1.length !== dates2.length) return false

  return dates1.every((date1, index) => {
    const date2 = dates2[index]
    if (!isValid(date1) || !isValid(date2)) return false

    if (mode === "date-only") {
      return isSameDayInTimeZone(date1, date2, timeZone)
    } else {
      // exact-time comparison
      return getDateKey(date1, timeZone, true) === getDateKey(date2, timeZone, true)
    }
  })
}

/**
 * Clear time zone date cache (for testing or memory management)
 */
export function clearTimeZoneCache(): void {
  tzDateCache.clear()
}
