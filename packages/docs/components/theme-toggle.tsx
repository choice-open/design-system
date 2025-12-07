"use client"

import { ThemeMoonDark, ThemeSunBright } from "@choiceform/icons-react"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import { useEventCallback } from "usehooks-ts"
import { IconButton } from "~/components"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const icon = useMemo(() => {
    if (theme === "dark") {
      return <ThemeMoonDark />
    }
    return <ThemeSunBright />
  }, [theme])

  const toggleTheme = useEventCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  })

  return (
    <IconButton onClick={toggleTheme}>
      {icon}
      <span className="sr-only">Toggle theme</span>
    </IconButton>
  )
}
