import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const getSystemTheme = (): "light" | "dark" => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

// 从 localStorage 获取存储的主题，如果没有则默认为 light
const getStoredTheme = (): Theme => {
  try {
    const storedTheme = localStorage.getItem("icon-system-theme") as Theme
    return storedTheme ? storedTheme : "light"
  } catch (e) {
    return "light"
  }
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement

  root.classList.remove("light", "dark")
  root.classList.add(theme)

  root.setAttribute("data-theme", theme)
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getStoredTheme())

  const setThemeWithStorage = (newTheme: Theme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem("icon-system-theme", newTheme)
    } catch (e) {
      console.error("Failed to save theme to localStorage:", e)
    }
  }

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setThemeWithStorage(nextTheme)
  }

  const setSpecificTheme = (newTheme: Theme) => {
    setThemeWithStorage(newTheme)
  }

  // 监听系统主题变化 - 移除theme依赖避免重复绑定
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      // 只在用户没有手动设置主题时才跟随系统主题
      const storedTheme = localStorage.getItem("icon-system-theme")
      if (!storedTheme) {
        const systemTheme = getSystemTheme()
        setTheme(systemTheme) // 正确更新React状态
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, []) // 移除theme依赖

  // 应用主题到DOM
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
  }
}
