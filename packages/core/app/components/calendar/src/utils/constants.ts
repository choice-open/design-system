import { enUS, zhCN, type Locale } from "date-fns/locale"
import type { CalendarValue, NaturalLanguageMap, RelativeDatePattern } from "../types"

// Default language environment mapping
export const defaultLocaleMap: Record<string, Locale> = {
  "zh-CN": zhCN,
  "en-US": enUS,
}

// Natural language keyword mapping
export const naturalLanguageMap: Record<string, NaturalLanguageMap> = {
  "zh-CN": {
    today: ["今天", "今日", "现在"],
    tomorrow: ["明天", "明日"],
    yesterday: ["昨天", "昨日"],
    thisWeek: ["本周", "这周", "这个星期", "本星期"],
    nextWeek: ["下周", "下个星期"],
    lastWeek: ["上周", "上个星期"],
    thisMonth: ["本月", "这个月"],
    nextMonth: ["下月", "下个月"],
    lastMonth: ["上月", "上个月"],
    thisYear: ["今年", "本年"],
    nextYear: ["明年", "下年"],
    lastYear: ["去年", "上年"],
    now: ["现在", "此刻"],
    morning: ["早上", "上午", "晨"],
    afternoon: ["下午", "午后"],
    evening: ["晚上", "傍晚"],
    night: ["深夜", "夜里", "夜间", "午夜"],
  },
  "en-US": {
    today: ["today", "now"],
    tomorrow: ["tomorrow", "tmr"],
    yesterday: ["yesterday"],
    thisWeek: ["this week"],
    nextWeek: ["next week"],
    lastWeek: ["last week"],
    thisMonth: ["this month"],
    nextMonth: ["next month"],
    lastMonth: ["last month"],
    thisYear: ["this year"],
    nextYear: ["next year"],
    lastYear: ["last year"],
    now: ["now"],
    morning: ["morning", "am"],
    afternoon: ["afternoon", "pm"],
    evening: ["evening"],
    night: ["night"],
  },
}

// Relative date pattern
export const relativeDatePatterns: RelativeDatePattern[] = [
  // Number + day/day
  { pattern: /(\d+)\s*天[后前]?/g, type: "day", multiplier: 1 },
  { pattern: /(\d+)\s*日[后前]?/g, type: "day", multiplier: 1 },
  { pattern: /(\d+)\s*days?\s*(later|ago)?/gi, type: "day", multiplier: 1 },

  // Number + week/week
  { pattern: /(\d+)\s*周[后前]?/g, type: "week", multiplier: 1 },
  { pattern: /(\d+)\s*星期[后前]?/g, type: "week", multiplier: 1 },
  { pattern: /(\d+)\s*weeks?\s*(later|ago)?/gi, type: "week", multiplier: 1 },

  // Number + month
  { pattern: /(\d+)\s*个?月[后前]?/g, type: "month", multiplier: 1 },
  { pattern: /(\d+)\s*months?\s*(later|ago)?/gi, type: "month", multiplier: 1 },

  // Number + year
  { pattern: /(\d+)\s*年[后前]?/g, type: "year", multiplier: 1 },
  { pattern: /(\d+)\s*years?\s*(later|ago)?/gi, type: "year", multiplier: 1 },
]

// Common date formats - optimized for performance by usage frequency
export const commonDateFormats = [
  "yyyy-MM-dd", // Most commonly used ISO format
  "MM/dd/yyyy", // American format
  "dd/MM/yyyy", // European format
  "yyyy/MM/dd", // Japanese format
  "yyyyMMdd", // Compact format
  "yyyy-M-d", // Loose format
  "yyyy/M/d",
  "M/d/yyyy",
  "d/M/yyyy", // German format
  "dd.MM.yyyy", // German format
  "yyyy.MM.dd",
]

// Common time formats - optimized for performance by usage frequency
export const commonTimeFormats = [
  "HH:mm", // 24 hour format (most commonly used)
  "H:mm", // 24 hour format without zero padding
  "HH:mm:ss", // With seconds
  "h:mm a", // 12 hour format without zero padding
  "hh:mm a", // 12 hour format with zero padding
  "h:mm aa",
  "HHmm", // Compact format
  "Hmm",
]

// Parser performance configuration
export const parserConfig = {
  // Parser priority (number越小优先级越高）
  priority: {
    digits: 1, // Pure numeric parsing (fastest)
    shortcuts: 2, // Shortcut parsing
    standardFormat: 3, // Standard format parsing
    naturalLanguage: 4, // Natural language parsing
    relativeDate: 5, // Relative date parsing
    englishDate: 6, // English date parsing
    fuzzyMatch: 7, // Fuzzy matching (slowest)
  },

  // Cache configuration
  cache: {
    enabled: true,
    maxSize: 100, // Maximum cache entries
    ttl: 60000, // Cache time (ms)
  },

  // Performance threshold
  performance: {
    maxParseTime: 50, // Maximum parse time (ms)
    enableProfiling: false, // Whether to enable performance analysis
  },
}

// Simple LRU cache implementation
class SimpleCache<T> {
  private cache = new Map<string, { timestamp: number; value: T }>()
  private maxSize: number
  private ttl: number

  constructor(maxSize: number = 100, ttl: number = 60000) {
    this.maxSize = maxSize
    this.ttl = ttl
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = Array.from(this.cache.keys())[0]
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() })
  }

  clear(): void {
    this.cache.clear()
  }
}

// Global parse cache
export const parseCache = new SimpleCache<Date | null>(
  parserConfig.cache.maxSize,
  parserConfig.cache.ttl,
)
