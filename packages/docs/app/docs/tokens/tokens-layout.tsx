"use client"

import { typography } from "@choice-ui/design-tokens"
import Choiceform from "@choiceform/icons-react/Choiceform"
import ThemeMoonDark from "@choiceform/icons-react/ThemeMoonDark"
import ThemeSunBright from "@choiceform/icons-react/ThemeSunBright"
import Github from "@choiceform/icons-react/Github"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { ThemeContext } from "./context"
import { useTheme } from "./hooks"
import styles from "./tokens-layout.module.css"

// 主题切换组件
function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  const icon = useMemo(() => {
    if (theme === "dark") {
      return <ThemeMoonDark />
    }
    return <ThemeSunBright />
  }, [theme])

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
    >
      {icon}
      <span>{theme.toUpperCase()}</span>
    </button>
  )
}

// 导航组件
function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { path: "/docs/tokens", label: "Home" },
    { path: "/docs/tokens/colors", label: "Colors" },
    { path: "/docs/tokens/spacing", label: "Spacing" },
    { path: "/docs/tokens/shadows", label: "Shadows" },
    { path: "/docs/tokens/breakpoints", label: "Breakpoints" },
    { path: "/docs/tokens/typography", label: "Typography" },
  ]

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={styles.navLink}
              data-active={pathname === item.path}
            >
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface TokensLayoutProps {
  children: React.ReactNode
}

export function TokensLayout({ children }: TokensLayoutProps) {
  const { theme, setTheme } = useTheme()
  const bodyTypography = typography("body.medium")
  const headingTypography = typography("heading.medium")

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={styles.appContainer}
        data-theme={theme}
        style={{
          fontFamily: bodyTypography.fontFamily,
          fontSize: bodyTypography.fontSize,
          fontWeight: bodyTypography.fontWeight,
          lineHeight: bodyTypography.lineHeight,
          letterSpacing: bodyTypography.letterSpacing,
        }}
      >
        <main>{children}</main>
      </div>
    </ThemeContext.Provider>
  )
}
