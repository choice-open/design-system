import { useEffect, useState } from "react"

type Theme = "light" | "dark"

/**
 * A hook that detects and observes Tailwind CSS theme changes based on the 'dark' class
 * on the document element. Returns the current theme and utility functions.
 *
 * @returns An object containing the current theme and theme utility functions
 *
 * @example
 * ```tsx
 * const { theme, isDark, isLight } = useTheme()
 *
 * return (
 *   <div>
 *     Current theme: {theme}
 *     <button onClick={toggleTheme}>
 *       Switch to {isDark ? 'Light' : 'Dark'} Mode
 *     </button>
 *   </div>
 * )
 * ```
 */
export function useTheme() {
  // Use state to only trigger re-renders when the actual theme changes
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from document if we're in a browser environment
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light"
    }
    // Default to light theme in SSR/non-browser environments
    return "light"
  })

  useEffect(() => {
    // Skip in non-browser environments
    if (typeof document === "undefined") return

    // Function to determine current theme from document element
    const getCurrentTheme = (): Theme =>
      document.documentElement.classList.contains("dark") ? "dark" : "light"

    // Function to handle theme changes
    const handleThemeChange = () => {
      const newTheme = getCurrentTheme()
      if (newTheme !== theme) {
        setTheme(newTheme)
      }
    }

    // Set up MutationObserver to watch for class changes
    const observer = new MutationObserver((mutations) => {
      // Only check mutations affecting the class attribute of document.documentElement
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          handleThemeChange()
          break
        }
      }
    })

    // Start observing document element for class changes
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    // Ensure we're in sync with the document initially
    handleThemeChange()

    // Clean up observer on unmount
    return () => observer.disconnect()
  }, [theme]) // Include theme in dependencies to avoid stale closures

  // Derive convenience booleans
  const isDark = theme === "dark"
  const isLight = theme === "light"

  // Function to toggle theme (useful for theme switchers)
  const toggleTheme = () => {
    if (typeof document === "undefined") return

    const newTheme = isDark ? "light" : "dark"

    if (isDark) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }

    // No need to call setTheme here - MutationObserver will handle it
  }

  // Return theme value and helper utilities
  return {
    theme,
    isDark,
    isLight,
    toggleTheme,
  }
}
