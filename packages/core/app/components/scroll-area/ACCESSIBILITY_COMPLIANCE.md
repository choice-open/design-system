# ScrollArea 组件可访问性合规性

## 概述

ScrollArea 组件已完全遵循 WAI-ARIA 规范，提供了完整的可访问性支持，确保所有用户都能有效使用该组件。

## WAI-ARIA 合规性检查表

### ✅ 已实现的 ARIA 属性

| 属性                 | 元素           | 描述                       | 状态 |
| -------------------- | -------------- | -------------------------- | ---- |
| `role="application"` | Root           | 指示这是一个交互式应用区域 | ✅   |
| `role="region"`      | Viewport       | 标识可滚动区域             | ✅   |
| `role="scrollbar"`   | Scrollbar      | 标识滚动条控件             | ✅   |
| `aria-controls`      | Scrollbar      | 链接滚动条到控制的视口     | ✅   |
| `aria-valuenow`      | Scrollbar      | 当前滚动位置 (0-100)       | ✅   |
| `aria-valuemin`      | Scrollbar      | 最小值 (0)                 | ✅   |
| `aria-valuemax`      | Scrollbar      | 最大值 (100)               | ✅   |
| `aria-valuetext`     | Scrollbar      | 人类可读的滚动位置         | ✅   |
| `aria-orientation`   | Scrollbar      | 滚动方向                   | ✅   |
| `aria-label`         | Root/Scrollbar | 可访问名称                 | ✅   |
| `aria-labelledby`    | Root           | 引用标签元素               | ✅   |
| `aria-describedby`   | Root           | 引用描述元素               | ✅   |
| `aria-live`          | Viewport       | 动态内容更新通知           | ✅   |
| `aria-atomic`        | Viewport       | 控制 live region 行为      | ✅   |
| `aria-hidden`        | Thumb/Corner   | 隐藏装饰性元素             | ✅   |
| `tabindex`           | Viewport       | 启用键盘焦点               | ✅   |

### ✅ 键盘导航支持

| 按键          | 功能                     | 状态 |
| ------------- | ------------------------ | ---- |
| `ArrowUp`     | 向上滚动 20px            | ✅   |
| `ArrowDown`   | 向下滚动 20px            | ✅   |
| `ArrowLeft`   | 向左滚动 20px (水平模式) | ✅   |
| `ArrowRight`  | 向右滚动 20px (水平模式) | ✅   |
| `PageUp`      | 向上滚动 80% 视口高度    | ✅   |
| `PageDown`    | 向下滚动 80% 视口高度    | ✅   |
| `Home`        | 跳到内容开始             | ✅   |
| `End`         | 跳到内容结束             | ✅   |
| `Space`       | 向下滚动一页             | ✅   |
| `Shift+Space` | 向上滚动一页             | ✅   |
| `Tab`         | 进入/离开滚动区域        | ✅   |

### ✅ 屏幕阅读器支持

| 特性         | 描述                                     | 状态 |
| ------------ | ---------------------------------------- | ---- |
| 可访问名称   | 通过 `aria-label` 或 `aria-labelledby`   | ✅   |
| 滚动位置通知 | 通过 `aria-valuetext` 提供位置信息       | ✅   |
| 使用说明     | 通过隐藏描述元素提供键盘导航说明         | ✅   |
| 动态更新     | 通过 `aria-live` 通知内容变化            | ✅   |
| 角色识别     | 正确的 ARIA 角色让屏幕阅读器理解组件功能 | ✅   |

## 实施详情

### 1. 根容器 (Root)

```tsx
<div
  role="application"
  aria-label="Scrollable content"
  aria-labelledby="external-label-id"
  aria-describedby="viewport-desc"
  onKeyDown={handleKeyDown}
>
```

### 2. 视口 (Viewport)

```tsx
<div
  role="region"
  aria-live="polite"
  aria-atomic="false"
  tabIndex={0}
  id="viewport-id"
>
```

### 3. 滚动条 (Scrollbar)

```tsx
<div
  role="scrollbar"
  aria-controls="viewport-id"
  aria-orientation="vertical"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={currentPosition}
  aria-valuetext="25% scrolled vertically"
  aria-label="vertical scrollbar"
>
```

### 4. 使用说明元素

```tsx
<div
  id="viewport-desc"
  className="sr-only"
>
  Use arrow keys to scroll, Page Up/Down for larger steps, Home/End for start/end
</div>
```

## 测试建议

### 自动化测试

1. 使用 `@testing-library/react` 验证 ARIA 属性
2. 使用 `axe-core` 进行无障碍性自动化测试
3. 验证键盘事件处理

### 手动测试

1. **键盘导航测试**
   - 使用 Tab 键导航到滚动区域
   - 使用所有支持的键盘快捷键
   - 验证焦点指示器的可见性

2. **屏幕阅读器测试**
   - 使用 NVDA/JAWS (Windows)
   - 使用 VoiceOver (macOS)
   - 使用 Orca (Linux)
   - 验证所有元素的可访问名称
   - 验证滚动位置通知

3. **浏览器兼容性**
   - Chrome + ChromeVox
   - Firefox + NVDA
   - Safari + VoiceOver
   - Edge + JAWS

## 代码示例

### 基本使用

```tsx
<ScrollArea
  aria-label="Product list"
  orientation="vertical"
  className="h-96 w-full"
>
  <ScrollArea.Viewport>
    <ScrollArea.Content>{/* 内容 */}</ScrollArea.Content>
  </ScrollArea.Viewport>
</ScrollArea>
```

### 带外部标签

```tsx
<h2 id="list-title">Product Catalog</h2>
<ScrollArea
  aria-labelledby="list-title"
  orientation="vertical"
  className="h-96 w-full"
>
  <ScrollArea.Viewport>
    <ScrollArea.Content>
      {/* 内容 */}
    </ScrollArea.Content>
  </ScrollArea.Viewport>
</ScrollArea>
```

## 符合的标准

- [WAI-ARIA 1.1 Specification](https://www.w3.org/TR/wai-aria-1.1/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Section 508 Standards](https://www.section508.gov/)

## 更新历史

- \*\*2025-07-08: 初始实现 WAI-ARIA 支持
- \*\*2025-07-08: 添加完整的键盘导航
- \*\*2025-07-08: 增强屏幕阅读器支持
- \*\*2025-07-08: 添加可访问性测试 story

---

_本文档记录了 ScrollArea 组件的完整可访问性实现，确保符合现代 Web 无障碍标准。_
