import { format } from "date-fns"
import type { DateDataFormat } from "../../types"
import { parseDate } from "./parsers"

// Prediction result type
export interface PredictionResult {
  /** Confidence (0-1) */
  confidence: number
  /** Description */
  description: string
  /** Predicted date string */
  prediction: string
  /** Prediction type */
  type: "numeric" | "shortcut" | "relative" | "parsed"
}

/**
 * Enhanced intelligent prediction function
 * Directly use parseDate function, ensure prediction result is 100% consistent with actual formatting
 */
export function getEnhancedPrediction(
  input: string,
  targetFormat: DateDataFormat = "yyyy-MM-dd",
): PredictionResult | null {
  if (!input.trim()) return null

  const trimmedInput = input.trim()

  // Directly use the real parser!
  try {
    const parsed = parseDate(trimmedInput, {
      format: targetFormat,
      enableSmartCorrection: true,
      enableNaturalLanguage: true,
      enableRelativeDate: true,
    })

    if (parsed && !isNaN(parsed.getTime())) {
      // Successfully parsed, generate prediction result
      const formatted = format(parsed, targetFormat)

      // Generate intelligent description
      const description = generateDescription(trimmedInput, parsed)

      // Calculate confidence
      const confidence = calculateConfidence(trimmedInput, parsed)

      // Determine prediction type
      const type = determineType(trimmedInput)

      return {
        prediction: formatted,
        description,
        confidence,
        type,
      }
    }
  } catch {
    // Parsing failed, return null
  }

  return null
}

/**
 * Generate intelligent description
 */
function generateDescription(input: string, parsedDate: Date): string {
  const trimmedInput = input.trim().toLowerCase()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const parsed = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

  // Shortcut description
  const shortcuts: Record<string, string> = {
    t: "今天",
    today: "今天",
    今: "今天",
    今天: "今天",
    y: "昨天",
    yesterday: "昨天",
    昨: "昨天",
    tm: "明天",
    tomorrow: "明天",
    明: "明天",
  }

  if (shortcuts[trimmedInput]) {
    return shortcuts[trimmedInput]
  }

  // Calculate date difference
  const dayDiff = Math.round((parsed.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  // Relative date description
  if (dayDiff === 0) {
    return "今天"
  } else if (dayDiff === 1) {
    return "明天"
  } else if (dayDiff === -1) {
    return "昨天"
  } else if (dayDiff > 0 && dayDiff <= 7) {
    return `${dayDiff}天后`
  } else if (dayDiff < 0 && dayDiff >= -7) {
    return `${Math.abs(dayDiff)}天前`
  }

  // Year month day description
  const year = parsedDate.getFullYear()
  const month = parsedDate.getMonth() + 1
  const day = parsedDate.getDate()
  const currentYear = now.getFullYear()

  if (year === currentYear) {
    return `当年${month}月${day}日`
  } else {
    return `${year}年${month}月${day}日`
  }
}

/**
 * Calculate confidence
 */
function calculateConfidence(input: string, parsedDate: Date): number {
  const trimmedInput = input.trim().toLowerCase()

  // Shortcuts: highest confidence
  const shortcuts = ["t", "today", "今", "今天", "y", "yesterday", "昨", "tm", "tomorrow", "明"]
  if (shortcuts.includes(trimmedInput)) {
    return 1.0
  }

  // Pure numeric: determine confidence based on length
  if (/^\d+$/.test(trimmedInput)) {
    const length = trimmedInput.length
    if (length === 8) return 0.95 // YYYYMMDD: very reliable
    if (length === 6) return 0.9 // YYMMDD: very reliable
    if (length === 4) return 0.85 // MMDD or year: relatively reliable
    if (length === 3) return 0.8 // Month and day: medium reliable
    if (length === 2) return 0.75 // Date or year: medium reliable
    if (length === 1) return 0.6 // Year last digit: low reliable
    return 0.7 // Other lengths
  }

  // Complex input with text
  if (trimmedInput.includes("年") || trimmedInput.includes("月") || trimmedInput.includes("日")) {
    return 0.85
  }

  if (trimmedInput.includes("-") || trimmedInput.includes("/")) {
    return 0.8
  }

  // Default confidence
  return 0.7
}

/**
 * Determine prediction type
 */
function determineType(input: string): PredictionResult["type"] {
  const trimmedInput = input.trim().toLowerCase()

  // Shortcuts
  const shortcuts = ["t", "today", "今", "今天", "y", "yesterday", "昨", "tm", "tomorrow", "明"]
  if (shortcuts.includes(trimmedInput)) {
    return "shortcut"
  }

  // Pure numeric
  if (/^\d+$/.test(trimmedInput)) {
    return "numeric"
  }

  // Relative date
  if (
    trimmedInput.includes("天前") ||
    trimmedInput.includes("天后") ||
    trimmedInput.includes("周") ||
    trimmedInput.includes("月") ||
    trimmedInput.includes("ago") ||
    trimmedInput.includes("later")
  ) {
    return "relative"
  }

  // Other parsed results
  return "parsed"
}

/**
 * Backward compatible getPredictionInfo function
 */
export function getPredictionInfo(
  input: string,
  targetFormat: DateDataFormat,
): {
  description: string
  prediction: string
} | null {
  const result = getEnhancedPrediction(input, targetFormat)
  if (!result) return null

  return {
    prediction: result.prediction,
    description: result.description,
  }
}
