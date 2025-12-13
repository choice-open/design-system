import { tcx } from "@choice-ui/shared"
import { ArrowRight } from "@choiceform/icons-react"
import { TextFieldProps } from "@choice-ui/text-field"
import { Locale, differenceInMinutes } from "date-fns"
import { enUS } from "date-fns/locale"
import { useMemo } from "react"
import { TimeInput } from "../time-input"
import type { TimeDataFormat } from "../types"
import { resolveLocale } from "../utils"

interface TimeRangeInputProps extends Omit<
  TextFieldProps,
  "value" | "onChange" | "step" | "defaultValue"
> {
  endDisabled?: boolean
  endPlaceholder?: string
  endSuffixElement?: React.ReactNode
  endValue?: Date | null
  format?: TimeDataFormat
  locale?: Locale | string
  maxTime?: Date
  minTime?: Date
  onEndChange?: (time: Date | null) => void
  onEndFocus?: () => void
  onEnterKeyDown?: () => void
  onStartChange?: (time: Date | null) => void
  onStartFocus?: () => void
  startDisabled?: boolean
  startPlaceholder?: string
  startSuffixElement?: React.ReactNode
  startValue?: Date | null
}

/**
 * Calculate time difference (in minutes)
 */
function calculateTimeDifferenceInMinutes(startTime: Date, endTime: Date): number {
  let timeDiff = differenceInMinutes(endTime, startTime)

  // Handle cross-day cases (e.g., 22:00 to 02:00)
  if (timeDiff < 0) {
    // Assume it is cross-day, add the number of minutes in one day
    timeDiff += 24 * 60
  }

  return timeDiff
}

/**
 * Format time difference display
 */
function formatTimeDuration(minutes: number, locale: Locale): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const localeKey = locale.code || "en-US"

  // Chinese series
  if (localeKey.startsWith("zh")) {
    if (hours === 0) {
      return `${remainingMinutes}分钟`
    } else if (remainingMinutes === 0) {
      return `${hours}小时`
    } else {
      return `${hours}小时${remainingMinutes}分钟`
    }
  }

  // Japanese
  if (localeKey.startsWith("ja")) {
    if (hours === 0) {
      return `${remainingMinutes}分`
    } else if (remainingMinutes === 0) {
      return `${hours}時間`
    } else {
      return `${hours}時間${remainingMinutes}分`
    }
  }

  // Korean
  if (localeKey.startsWith("ko")) {
    if (hours === 0) {
      return `${remainingMinutes}분`
    } else if (remainingMinutes === 0) {
      return `${hours}시간`
    } else {
      return `${hours}시간 ${remainingMinutes}분`
    }
  }

  // English and other languages (default)
  if (hours === 0) {
    return `${remainingMinutes} min${remainingMinutes !== 1 ? "s" : ""}`
  } else if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`
  } else {
    return `${hours}h ${remainingMinutes}m`
  }
}

export const TimeRangeInput = (props: TimeRangeInputProps) => {
  const {
    startValue,
    endValue,
    onStartChange,
    onEndChange,
    format,
    locale: propLocale = enUS,
    startPlaceholder = "Start Time",
    endPlaceholder = "End Time",
    onStartFocus,
    onEndFocus,
    onEnterKeyDown,
    startDisabled,
    endDisabled,
    maxTime,
    minTime,
    startSuffixElement,
    endSuffixElement,
    ...rest
  } = props

  // 🔧 Use common locale to parse
  const locale = resolveLocale(propLocale)

  const rangeDuration = useMemo(() => {
    if (!startValue || !endValue) return ""

    try {
      const minutes = calculateTimeDifferenceInMinutes(startValue, endValue)

      // Prevent negative or extremely large values
      if (minutes < 0 || minutes > 24 * 60) {
        return ""
      }

      return formatTimeDuration(minutes, locale)
    } catch (error) {
      console.warn("Failed to calculate time duration:", error)
      return ""
    }
  }, [startValue, endValue, locale])

  return (
    <>
      <TimeInput
        className="[grid-area:input-1]"
        locale={propLocale}
        format={format}
        placeholder={startPlaceholder}
        onFocus={onStartFocus}
        value={startValue}
        onChange={onStartChange}
        onEnterKeyDown={onEnterKeyDown}
        disabled={startDisabled}
        minTime={minTime}
        suffixElement={startSuffixElement}
        {...rest}
      />

      <TimeInput
        className="[grid-area:input-2]"
        locale={propLocale}
        format={format}
        placeholder={endPlaceholder}
        onFocus={onEndFocus}
        value={endValue}
        onChange={onEndChange}
        onEnterKeyDown={onEnterKeyDown}
        prefixElement={<ArrowRight />}
        suffixElement={endSuffixElement}
        disabled={endDisabled}
        maxTime={maxTime}
        {...rest}
      />
      <span
        className={tcx(
          "col-span-3 col-start-5 row-start-2 truncate select-none",
          rest.variant === "dark" ? "text-gray-400" : "text-secondary-foreground",
        )}
      >
        {rangeDuration}
      </span>
    </>
  )
}
