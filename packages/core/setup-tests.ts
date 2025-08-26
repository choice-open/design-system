import { expect, vi } from "vitest"
import * as matchers from "@testing-library/jest-dom/matchers"

// 扩展 Vitest 的断言功能
expect.extend(matchers)

// 模拟 window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// 自定义匹配器：检查下拉菜单选项
expect.extend({
  toBeRenderedWithOptions(element, options) {
    if (!element) {
      return {
        pass: false,
        message: () => `Expected element to exist, but it was not found`,
      }
    }

    const container = element.parentElement
    const menuItems = container?.querySelectorAll('[role="menuitem"]') || []
    // Convert NodeList to array and extract text content
    const menuItemTexts: (string | null)[] = []
    menuItems.forEach((item) => menuItemTexts.push(item.textContent))

    const pass = options.every((option) => menuItemTexts.includes(option))

    return {
      pass,
      message: () =>
        pass
          ? `Expected dropdown not to have options: ${options.join(", ")}`
          : `Expected dropdown to have options: ${options.join(", ")}, but found: ${menuItemTexts.join(", ")}`,
    }
  },
})
