/**
 * Unified numeric parsing tool functions
 * Used to eliminate duplicate code in parsers
 */

import { smartCorrectDate } from "./validators"

/** Extract pure numeric string */
export function extractDigits(input: string): string {
  return input.replace(/[^\d]/g, "")
}

/** Numeric segment extractor */
export class DigitExtractor {
  constructor(private digits: string) {}

  /** Extract number at specified position */
  extract(start: number, length: number): number {
    return parseInt(this.digits.substring(start, start + length), 10)
  }

  /** Extract year (first 2 digits) */
  getYear2(): number {
    return this.extract(0, 2)
  }

  /** Extract year (first 4 digits) */
  getYear4(): number {
    return this.extract(0, 4)
  }

  /** Extract month (first 2 digits) */
  getMonth(): number {
    return this.extract(0, 2)
  }

  /** Extract date (3-4th digits) */
  getDay(): number {
    return this.extract(2, 2)
  }

  /** Extract each part of 6 digits (YYMMDD format) */
  getYYMMDD(): { day: number; month: number; year: number } {
    return {
      year: this.extract(0, 2),
      month: this.extract(2, 2),
      day: this.extract(4, 2),
    }
  }

  /** Extract each part of 8 digits (YYYYMMDD format) */
  getYYYYMMDD(): { day: number; month: number; year: number } {
    return {
      year: this.extract(0, 4),
      month: this.extract(4, 2),
      day: this.extract(6, 2),
    }
  }

  /** Extract each part of 3 digits */
  get3DigitParts(): { first: number; lastTwo: number } {
    return {
      first: this.extract(0, 1),
      lastTwo: this.extract(1, 2),
    }
  }
}

/** Year conversion tool */
export function convertTwoDigitYear(year: number): number {
  return year < 50 ? 2000 + year : 1900 + year
}

/** Check if it is a valid month and day combination */
export function isValidMonthDay(month: number, day: number): boolean {
  return month >= 1 && month <= 12 && day >= 1 && day <= 31
}

/** Check if 3 digits can be interpreted as month and day */
export function canBeMonthDay(firstDigit: number, lastTwoDigits: number): boolean {
  return firstDigit >= 1 && firstDigit <= 12 && lastTwoDigits >= 1 && lastTwoDigits <= 31
}

/** Check if it is a reasonable year */
export function isReasonableYear(year: number): boolean {
  return year >= 1950 && year <= 2100
}

/** Numeric parsing result */
export interface NumericParseResult {
  day: number
  formatted: string
  month: number
  year: number
}

/** General 6-digit parser (YYMMDD) */
export function parseYYMMDD(digits: string, targetFormat: string): NumericParseResult | null {
  const extractor = new DigitExtractor(digits)
  const { year: yy, month, day } = extractor.getYYMMDD()

  if (!isValidMonthDay(month, day)) {
    return null
  }

  const fullYear = convertTwoDigitYear(yy)
  const corrected = smartCorrectDate(fullYear, month, day)

  let formatted: string
  if (targetFormat === "yyyy-MM-dd") {
    formatted = `${corrected.year}-${corrected.month.toString().padStart(2, "0")}-${corrected.day.toString().padStart(2, "0")}`
  } else if (targetFormat === "MM/dd/yyyy") {
    formatted = `${corrected.month.toString().padStart(2, "0")}/${corrected.day.toString().padStart(2, "0")}/${corrected.year}`
  } else {
    return null
  }

  return {
    year: corrected.year,
    month: corrected.month,
    day: corrected.day,
    formatted,
  }
}

/** General 8-digit parser (YYYYMMDD) */
export function parseYYYYMMDD(digits: string, targetFormat: string): NumericParseResult | null {
  const extractor = new DigitExtractor(digits)
  const { year, month, day } = extractor.getYYYYMMDD()

  if (!isReasonableYear(year)) {
    return null
  }

  const corrected = smartCorrectDate(year, month, day)

  let formatted: string
  if (targetFormat === "yyyy-MM-dd") {
    formatted = `${corrected.year}-${corrected.month.toString().padStart(2, "0")}-${corrected.day.toString().padStart(2, "0")}`
  } else if (targetFormat === "MM/dd/yyyy") {
    formatted = `${corrected.month.toString().padStart(2, "0")}/${corrected.day.toString().padStart(2, "0")}/${corrected.year}`
  } else {
    return null
  }

  return {
    year: corrected.year,
    month: corrected.month,
    day: corrected.day,
    formatted,
  }
}

/** Intelligent 3-digit parser */
export function parse3Digits(
  digits: string,
  currentYear: number,
  targetFormat: string,
): NumericParseResult | null {
  const extractor = new DigitExtractor(digits)
  const { first, lastTwo } = extractor.get3DigitParts()

  if (canBeMonthDay(first, lastTwo)) {
    // Interpret as month and day, e.g., 315 → March 15th
    const corrected = smartCorrectDate(currentYear, first, lastTwo)

    let formatted: string
    if (targetFormat === "yyyy-MM-dd") {
      formatted = `${corrected.year}-${corrected.month.toString().padStart(2, "0")}-${corrected.day.toString().padStart(2, "0")}`
    } else if (targetFormat === "MM/dd/yyyy") {
      formatted = `${corrected.month.toString().padStart(2, "0")}/${corrected.day.toString().padStart(2, "0")}/${corrected.year}`
    } else {
      return null
    }

    return {
      year: corrected.year,
      month: corrected.month,
      day: corrected.day,
      formatted,
    }
  }

  return null
}
