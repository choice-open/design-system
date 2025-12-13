import { tcx } from "@choice-ui/shared"
import { ArrowRight } from "@choiceform/icons-react"
import { TextFieldProps } from "@choice-ui/text-field"
import { formatDistanceStrict, type Locale } from "date-fns"
import { enUS } from "date-fns/locale"
import { useMemo } from "react"
import { DateInput } from "../date-input"
import type { DateDataFormat } from "../types"
import { resolveLocale } from "../utils"

interface DateRangeInputProps extends Omit<
  TextFieldProps,
  "value" | "onChange" | "step" | "defaultValue"
> {
  endDisabled?: boolean
  endPlaceholder?: string
  endSuffixElement?: React.ReactNode
  endValue?: Date | null
  format?: DateDataFormat
  locale?: Locale | string
  maxDate?: Date
  minDate?: Date
  onEndChange?: (date: Date | null) => void
  onEndFocus?: () => void
  onEnterKeyDown?: () => void
  onStartChange?: (date: Date | null) => void
  onStartFocus?: () => void
  /**
   * Range length display precision, control the minimum unit of range calculation
   * @default 1 - Minimum unit is 1 day
   * @example 0.5 - Minimum unit is 0.5 days (half a day)
   * @example 0.1 - Minimum unit is 0.1 days (2.4 hours)
   * @example 0.25 - Minimum unit is 0.25 days (6 hours)
   */
  rangePrecision?: number
  startDisabled?: boolean
  startPlaceholder?: string
  startSuffixElement?: React.ReactNode
  startValue?: Date | null
}

export const DateRangeInput = (props: DateRangeInputProps) => {
  const {
    startValue,
    endValue,
    onStartChange,
    onEndChange,
    format,
    locale: propLocale = enUS,
    startPlaceholder = "Start Date",
    endPlaceholder = "End Date",
    onStartFocus,
    onEndFocus,
    onEnterKeyDown,
    startDisabled,
    endDisabled,
    maxDate,
    minDate,
    startSuffixElement,
    endSuffixElement,
    ...rest
  } = props

  // 🔧 Use common locale to parse
  const locale = resolveLocale(propLocale)

  const rangeLength = useMemo(() => {
    if (!startValue || !endValue) return ""

    // Special handling: same date displays as 1 day
    if (startValue.getTime() === endValue.getTime()) {
      // Create a 1 day gap to let formatDistanceStrict handle it
      const oneDayLater = new Date(startValue.getTime() + 24 * 60 * 60 * 1000)
      return formatDistanceStrict(startValue, oneDayLater, {
        locale,
        unit: "day",
        addSuffix: false,
      })
    }

    // Other cases use formatDistanceStrict
    return formatDistanceStrict(startValue, endValue, {
      locale,
      unit: "day",
      addSuffix: false,
    })
  }, [startValue, endValue, locale])

  return (
    <>
      <DateInput
        className="[grid-area:input-1]"
        locale={propLocale}
        format={format}
        placeholder={startPlaceholder}
        onFocus={onStartFocus}
        value={startValue}
        onChange={onStartChange}
        onEnterKeyDown={onEnterKeyDown}
        disabled={startDisabled}
        minDate={minDate}
        suffixElement={startSuffixElement}
        {...rest}
      />

      <DateInput
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
        maxDate={maxDate}
        {...rest}
      />
      <span
        className={tcx(
          "col-span-3 col-start-5 row-start-2 truncate select-none",
          rest.variant === "dark" ? "text-gray-400" : "text-secondary-foreground",
        )}
        data-testid="range-length"
      >
        {rangeLength}
      </span>
    </>
  )
}
