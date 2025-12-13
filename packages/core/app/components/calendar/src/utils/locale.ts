import type { Locale } from "date-fns"
import { zhCN, enUS, ja, ko, de, fr, es } from "date-fns/locale"

// 🗺️ String locale to Locale object mapping
export const LOCALE_MAP: Record<string, Locale> = {
  "zh-CN": zhCN,
  "en-US": enUS,
  "ja-JP": ja,
  "ko-KR": ko,
  "de-DE": de,
  "fr-FR": fr,
  "es-ES": es,
}

/**
 * 🔧 Safe locale parsing function
 *
 * Supports the following input formats:
 * - Locale object: return directly
 * - String: automatically map to the corresponding Locale object
 * - Invalid value: return Chinese locale (zhCN)
 *
 * @param locale - Can be a Locale object or string
 * @returns Parsed Locale object
 *
 * @example
 * ```ts
 * resolveLocale("zh-CN") // → zhCN
 * resolveLocale("en-US") // → enUS
 * resolveLocale(enUS) // → enUS
 * resolveLocale("invalid") // → zhCN (with warning)
 * ```
 */
export function resolveLocale(locale: Locale | string | undefined | null): Locale {
  // If it is already a Locale object, return directly
  if (locale && typeof locale === "object" && locale.code) {
    return locale
  }

  // If it is a string, try mapping
  if (typeof locale === "string") {
    const mapped = LOCALE_MAP[locale]
    if (mapped) {
      return mapped
    }
    console.warn(`⚠️ Unknown locale string: ${locale}, falling back to zhCN`)
  }

  // Invalid input, return Chinese as default
  if (locale !== undefined && locale !== null) {
    console.warn(`⚠️ Invalid locale type: ${typeof locale}, falling back to zhCN`)
  }

  return zhCN
}

/**
 * 🔍 Get all supported locale list
 * @returns Supported locale string array
 */
export function getSupportedLocales(): string[] {
  return Object.keys(LOCALE_MAP)
}

/**
 * 🎯 Check if it is a Chinese locale
 * @param locale - Locale object or string
 * @returns Whether it is a Chinese locale
 */
export function isChineseLocale(locale: Locale | string | undefined | null): boolean {
  const resolved = resolveLocale(locale)
  return resolved === zhCN || resolved.code === "zh-CN"
}
