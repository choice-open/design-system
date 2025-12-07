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
    { path: "/tokens", label: "Home" },
    { path: "/tokens/colors", label: "Colors" },
    { path: "/tokens/spacing", label: "Spacing" },
    { path: "/tokens/shadows", label: "Shadows" },
    { path: "/tokens/breakpoints", label: "Breakpoints" },
    { path: "/tokens/typography", label: "Typography" },
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
        <header className={styles.header}>
          <div className={`${styles.container} ${styles.headerContainer}`}>
            <Link
              href="/tokens"
              className={styles.logo}
              style={{
                fontFamily: headingTypography.fontFamily,
                fontSize: headingTypography.fontSize,
                fontWeight: headingTypography.fontWeight,
                lineHeight: headingTypography.lineHeight,
                letterSpacing: headingTypography.letterSpacing,
              }}
            >
              <Choiceform
                width={32}
                height={32}
              />
              <span>@choice-ui/design-tokens</span>
            </Link>
            <Navigation />

            <div className={styles.rightContainer}>
              <ThemeToggle />
              <a
                href="https://github.com/choice-form/design-tokens"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.button}>
                  <Github />
                </button>
              </a>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </ThemeContext.Provider>
  )
}
