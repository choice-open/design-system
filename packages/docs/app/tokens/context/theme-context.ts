import { createContext, useContext } from "react"

interface ThemeContextType {
  setTheme: (theme: "light" | "dark") => void
  theme: "light" | "dark"
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useThemeContext must be used within ThemeContext.Provider")
  return ctx
}
