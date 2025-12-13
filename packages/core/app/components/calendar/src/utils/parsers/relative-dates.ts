import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  subDays,
  subWeeks,
  subMonths,
  subYears,
} from "date-fns"
import { relativeDatePatterns } from "../constants"

// Parse relative date
export function parseRelativeDate(input: string): Date | null {
  const now = new Date()

  for (const pattern of relativeDatePatterns) {
    const match = pattern.pattern.exec(input)
    if (match) {
      const amount = parseInt(match[1], 10)
      const isAgo = input.includes("前") || input.includes("ago")
      const actualAmount = isAgo ? -amount : amount

      switch (pattern.type) {
        case "day":
          return addDays(now, actualAmount)
        case "week":
          return addWeeks(now, actualAmount)
        case "month":
          return addMonths(now, actualAmount)
        case "year":
          return addYears(now, actualAmount)
      }
    }
  }

  return null
}

// Extended relative date processing
export function parseExtendedRelativeDate(input: string): Date | null {
  const now = new Date()
  const patterns = [
    // +number (days)
    {
      regex: /^\+(\d+)$/,
      handler: (match: RegExpMatchArray) => addDays(now, parseInt(match[1], 10)),
    },
    // -number (days)
    {
      regex: /^-(\d+)$/,
      handler: (match: RegExpMatchArray) => subDays(now, parseInt(match[1], 10)),
    },

    // w+number (weeks)
    {
      regex: /^w\+(\d+)$/i,
      handler: (match: RegExpMatchArray) => addWeeks(now, parseInt(match[1], 10)),
    },
    {
      regex: /^w-(\d+)$/i,
      handler: (match: RegExpMatchArray) => subWeeks(now, parseInt(match[1], 10)),
    },

    // m+number (months)
    {
      regex: /^m\+(\d+)$/i,
      handler: (match: RegExpMatchArray) => addMonths(now, parseInt(match[1], 10)),
    },
    {
      regex: /^m-(\d+)$/i,
      handler: (match: RegExpMatchArray) => subMonths(now, parseInt(match[1], 10)),
    },

    // y+number (years)
    {
      regex: /^y\+(\d+)$/i,
      handler: (match: RegExpMatchArray) => addYears(now, parseInt(match[1], 10)),
    },
    {
      regex: /^y-(\d+)$/i,
      handler: (match: RegExpMatchArray) => subYears(now, parseInt(match[1], 10)),
    },

    // Chinese relative expression
    {
      regex: /^(\d+)天后$/,
      handler: (match: RegExpMatchArray) => addDays(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)天前$/,
      handler: (match: RegExpMatchArray) => subDays(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)周后$/,
      handler: (match: RegExpMatchArray) => addWeeks(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)周前$/,
      handler: (match: RegExpMatchArray) => subWeeks(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)月后$/,
      handler: (match: RegExpMatchArray) => addMonths(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)月前$/,
      handler: (match: RegExpMatchArray) => subMonths(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)年后$/,
      handler: (match: RegExpMatchArray) => addYears(now, parseInt(match[1], 10)),
    },
    {
      regex: /^(\d+)年前$/,
      handler: (match: RegExpMatchArray) => subYears(now, parseInt(match[1], 10)),
    },
  ]

  for (const pattern of patterns) {
    const match = input.trim().match(pattern.regex)
    if (match) {
      return pattern.handler(match)
    }
  }

  return null
}
