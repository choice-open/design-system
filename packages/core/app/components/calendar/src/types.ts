/**
 * Date format string
 *
 * Supports all date-fns format strings, common format examples:
 *
 * **Year**：
 * - yyyy: 2025 (4-digit year)
 * - yy: 25 (2-digit year)
 *
 * **Month**：
 * - MMMM: December (full month name)
 * - MMM: Dec (abbreviated month name)
 * - MM: 12 (2-digit month)
 * - M: 12 (1-2 digit month)
 *
 * **Date**：
 * - dd: 31 (2-digit date)
 * - d: 31 (1-2 digit date)
 *
 * **Common combinations**：
 * - "yyyy-MM-dd" → 2025-12-31
 * - "yy-MM-dd" → 25-12-31
 * - "yyyy年MM月dd日" → 2025年12月31日
 * - "yy年M月d日" → 25年12月31日
 * - "MMMM dd, yyyy" → December 31, 2025
 * - "MMM dd, yy" → Dec 31, 25
 * - "MM/dd/yyyy" → 12/31/2025
 * - "dd.MM.yy" → 31.12.25
 *
 * @see https://date-fns.org/v2.29.3/docs/format
 */
export type DateDataFormat = string

/**
 * Time format string
 *
 * Supports all date-fns time format strings, common format examples:
 *
 * **24-hour format**：
 * - "HH:mm" → 09:30, 14:45 (2-digit hour)
 * - "H:mm" → 9:30, 14:45 (1-2 digit hour)
 * - "HH:mm:ss" → 09:30:15 (with seconds)
 * - "HHmm" → 0930, 1445 (compact format)
 *
 * **12-hour format**：
 * - "h:mm a" → 9:30 AM, 2:45 PM
 * - "hh:mm a" → 09:30 AM, 02:45 PM (2-digit hour)
 * - "h:mm aa" → 9:30 A.M., 2:45 P.M. (full AM/PM)
 * - "h:mm:ss a" → 9:30:15 AM (with seconds)
 *
 * @see https://date-fns.org/v2.29.3/docs/format
 */
export type TimeDataFormat = string

// ====== Time related base types ======

import type { Day, Locale, Quarter as Quarters } from "date-fns"

/**
 * Time object (hour and minute)
 */
export interface Time {
  hour: number
  minute: number
}

/**
 * Time layout mode
 */
export type TimeLayout = "single" | "dual"

// ====== Time parsing related types ======

/**
 * Time input parsing result
 */
export interface TimeInputValue {
  /** Parsing error message */
  error: string | null
  /** Formatted display value */
  formatted: string
  /** Original input value */
  input: string
  /** Whether it is a valid time */
  isValid: boolean
  /** Parsed time Date object */
  time: Date | null
}

/**
 * Time parsing options
 */
export interface TimeParserOptions {
  /** Time format */
  format: TimeDataFormat
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Strict mode */
  strict?: boolean
}

// ====== Time component public property interface ======

/**
 * Time component base properties
 */
export interface BaseTimeProps {
  /** Default value */
  defaultValue?: Date | null
  /** Whether it is disabled */
  disabled?: boolean
  /** Time format, supports all date-fns format strings */
  format?: TimeDataFormat
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum time */
  maxTime?: Date
  /** Minimum time */
  minTime?: Date
  /** Time change callback */
  onChange?: (time: Date | null) => void
  /** Whether it is read-only (disable selection but do not change style) */
  readOnly?: boolean
  /** Currently selected time */
  value?: Date | null
}

/**
 * Time step related properties
 */
export interface StepProps {
  /** Meta/Ctrl + key step (minutes), default 60 minutes */
  metaStep?: number
  /** Shift + key step (minutes), default 15 minutes */
  shiftStep?: number
  /** Base step (minutes), default 1 minute */
  step?: number
}

/**
 * Time interaction properties
 */
export interface TimeInteractionProps {
  /** Whether to enable parsing cache */
  enableCache?: boolean
  /** Whether to enable keyboard navigation (default enabled) */
  enableKeyboardNavigation?: boolean
  /** Whether to enable performance analysis */
  enableProfiling?: boolean
  /** Callback when Enter key is pressed */
  onEnterKeyDown?: () => void
}

/**
 * Time option item
 */
export interface TimeOptionItem {
  disabled?: boolean
  label: string
  value: Time
}

export interface SmartInputOptions {
  /** Debounce delay (milliseconds) */
  debounceMs?: number
  /** Whether to enable auto complete */
  enableAutoComplete?: boolean
  /** Whether to enable keyboard navigation */
  enableKeyboardNavigation?: boolean
  /** Whether to enable real-time validation */
  enableLiveValidation?: boolean
  /** Whether to show parse preview */
  showParsePreview?: boolean
}

// ====== Date related base types ======

/**
 * Date range object
 */
export interface DateRange {
  end: Date
  start: Date
}

/**
 * Date of the week starts
 */
export type WeekStartsOn = Day

/**
 * Date comparison mode
 */
export type DateComparisonMode = "exact-time" | "date-only"

/**
 * Calendar selection value type
 */
export type CalendarValue = Date | Date[] | DateRange | null

/**
 * Selection mode
 */
export type SelectionMode = "single" | "multiple" | "range"

// ====== Date parsing related types ======

/**
 * Date input parsing result
 */
export interface DateInputValue {
  /** Parsed date object */
  date: Date | null
  /** Parsing error message */
  error: string | null
  /** Formatted display value */
  formatted: string
  /** Original input value */
  input: string
  /** Whether it is a valid date */
  isValid: boolean
}

/**
 * Date parsing options
 */
export interface DateParserOptions {
  /** Whether to enable natural language parsing */
  enableNaturalLanguage?: boolean
  /** Whether to enable relative date parsing */
  enableRelativeDate?: boolean
  /** Whether to enable smart correction */
  enableSmartCorrection?: boolean
  /** Date format */
  format: DateDataFormat
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum date */
  maxDate?: Date
  /** Minimum date */
  minDate?: Date
  /** Strict mode (not allowed invalid date) */
  strict?: boolean
}

// ====== Natural language related types ======

/**
 * Natural language keyword mapping
 */
export interface NaturalLanguageMap {
  afternoon: string[]
  evening: string[]
  lastMonth: string[]
  lastWeek: string[]
  lastYear: string[]
  morning: string[]
  nextMonth: string[]
  nextWeek: string[]
  nextYear: string[]
  night: string[]
  now: string[]
  thisMonth: string[]
  thisWeek: string[]
  thisYear: string[]
  today: string[]
  tomorrow: string[]
  yesterday: string[]
}

/**
 * Relative date pattern
 */
export interface RelativeDatePattern {
  multiplier: number
  pattern: RegExp
  type: "day" | "week" | "month" | "year"
}

// ====== Date component public property interface ======

/**
 * Date component base properties
 */
export interface BaseDateProps {
  /** Default value */
  defaultValue?: Date | null
  /** Whether it is disabled */
  disabled?: boolean
  /** Date format, supports all date-fns format strings */
  format?: DateDataFormat
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum date */
  maxDate?: Date
  /** Minimum date */
  minDate?: Date
  /** Date change callback */
  onChange?: (date: Date | null) => void
  /** Currently selected date */
  value?: Date | null
}

/**
 * Date interaction properties
 */
export interface DateInteractionProps {
  /** Whether to enable parsing cache */
  enableCache?: boolean
  /** Whether to enable keyboard navigation (default enabled) */
  enableKeyboardNavigation?: boolean
  /** Whether to enable prediction */
  enablePrediction?: boolean
  /** Whether to enable performance analysis */
  enableProfiling?: boolean
  /** Callback when Enter key is pressed */
  onEnterKeyDown?: () => void
}

/**
 * Month calendar component base properties
 */
export interface BaseCalendarProps {
  children?: React.ReactNode
  /** Custom class name */
  className?: string
  /** Currently displayed month */
  currentMonth?: Date
  /** Date comparison mode */
  dateComparisonMode?: DateComparisonMode
  /** Non-controlled mode default value */
  defaultValue?: CalendarValue
  /** Disabled dates array */
  disabledDates?: Date[]
  /** Whether to fix 6 rows display (42 days), default true to ensure height consistency */
  fixedGrid?: boolean
  /** Dates to highlight */
  highlightDates?: Date[]
  /** Whether to highlight today */
  highlightToday?: boolean
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum可选日期 */
  maxDate?: Date
  /** Minimum可选日期 */
  minDate?: Date
  /** Value change callback */
  onChange?: (value: CalendarValue) => void
  /** Month change callback */
  onMonthChange?: (month: Date) => void
  /** Whether it is read-only (disable selection but do not change style) */
  readOnly?: boolean
  /** Selection mode, if not specified, will be automatically inferred based on value type */
  selectionMode?: SelectionMode
  /** Whether to show dates of non-current months */
  showOutsideDays?: boolean
  /** Whether to show week numbers, default false */
  showWeekNumbers?: boolean
  /** Time zone */
  timeZone?: string
  /** Controlled mode value */
  value?: CalendarValue
  /** Week starts on (0=Sunday, 1=Monday) */
  weekStartsOn?: WeekStartsOn
  /** Custom weekday names */
  weekdayNames?: string[]
}

/**
 * Month calendar layout related properties
 */
export interface CalendarLayoutProps {
  /** Direction */
  direction?: "horizontal" | "vertical"
  /** Variant style */
  variant?: "default" | "dark"
}

// ====== Calendar state related types ======

/**
 * Calendar state interface
 */
export interface CalendarState {
  isSingleDay: boolean
  selectedRange: {
    end: Date
    endTime: Time
    start: Date
    startTime: Time
  } | null
}

/**
 * Calendar drag selection state
 */
export interface CalendarDragSelectionState {
  currentDate: Date | null
  isDragging: boolean
  isPreparing: boolean
  startDate: Date | null
}

/**
 * Calendar actions interface
 */
export interface CalendarActions {
  clearSelection(): void
  getSelectedDateRange(): { end: Date; start: Date } | null
  isDateSelected(date: Date): boolean
  selectDate(date: Date): void
  selectRange(start: Date, end: Date): void
}

// ====== Quarter related base types ======

/**
 * Quarter object
 */
export interface Quarter {
  label: string
  months: string[]
  quarter: Quarters // 1, 2, 3, 4
  year: number
}

/**
 * Quarter item state
 */
export interface QuarterItem {
  isCurrent: boolean
  isDisabled: boolean
  isInRange: boolean
  isSelected: boolean
  quarter: Quarter
}

/**
 * Year item state
 */
export interface YearItem {
  isCurrent: boolean
  isDisabled: boolean
  isInRange: boolean
  isSelected: boolean
  year: Date
}

// ====== Quarter component public property interface ======

/**
 * Quarter component base properties
 */
export interface BaseQuarterProps {
  children?: React.ReactNode
  /** Currently displayed year */
  currentYear?: number
  /** Default value */
  defaultValue?: Quarter
  /** Whether it is disabled */
  disabled?: boolean
  /** Disabled quarters array */
  disabledQuarters?: Array<{ quarter: number; year: number }>
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum selectable year */
  maxYear?: number
  /** Minimum selectable year */
  minYear?: number
  /** Quarter change callback */
  onChange?: (quarter: Quarter | null) => void
  /** Whether it is read-only (disable selection but do not change style) */
  readOnly?: boolean
  /** Displayed year */
  startYear?: number
  /** Currently selected quarter */
  value?: Quarter | null
}

/**
 * Quarter navigation related properties
 */
export interface QuarterNavigationProps {
  /** Year range navigation callback */
  onNavigate?: (direction: "prev" | "next", newYear: number) => void
}

/**
 * Quarter layout related properties
 */
export interface QuarterLayoutProps {
  /** Custom class name */
  className?: string
  /** Variant style */
  variant?: "default" | "dark"
}

// ====== Year component public property interface ======

/**
 * Year component base properties
 */
export interface BaseYearProps {
  children?: React.ReactNode
  /** Currently displayed year (for highlighting) */
  currentYear?: Date
  /** Default value */
  defaultValue?: Date
  /** Whether it is disabled */
  disabled?: boolean
  /** Disabled years array */
  disabledYears?: Date[]
  /** Language environment - supports Locale object or string (e.g., "zh-CN", "en-US") */
  locale?: Locale | string
  /** Maximum selectable year */
  maxYear?: Date
  /** Minimum selectable year */
  minYear?: Date
  /** Year change callback */
  onChange?: (year: Date | null) => void
  /** Whether it is read-only (disable selection but do not change style) */
  readOnly?: boolean
  /** Displayed year range start year, default current year - 10 */
  startYear?: Date
  /** Currently selected year */
  value?: Date | null
  /** Displayed year count, default 12 */
  yearCount?: number
}

/**
 * Year navigation related properties
 */
export interface YearNavigationProps {
  /** Year range navigation callback */
  onNavigate?: (direction: "prev" | "next", newStartYear: Date) => void
}

/**
 * Year layout related properties
 */
export interface YearLayoutProps {
  /** Custom class name */
  className?: string
  /** Variant style */
  variant?: "default" | "dark"
}
