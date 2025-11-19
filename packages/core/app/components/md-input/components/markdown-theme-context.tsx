import { createContext, useContext } from "react"

interface MarkdownThemeContextValue {
  theme: "light" | "dark"
}

const MarkdownThemeContext = createContext<MarkdownThemeContextValue | null>(null)

export function useMarkdownTheme() {
  const context = useContext(MarkdownThemeContext)
  return context?.theme ?? "light"
}

export interface MarkdownThemeProviderProps {
  children: React.ReactNode
  theme?: "light" | "dark"
}

export function MarkdownThemeProvider(props: MarkdownThemeProviderProps) {
  const { theme = "light", children } = props

  return <MarkdownThemeContext.Provider value={{ theme }}>{children}</MarkdownThemeContext.Provider>
}
