/* eslint-env node */
/* eslint-disable @typescript-eslint/no-require-imports, react/display-name */
// 模拟 @choiceform/icons-react 模块

const React = require("react")

// 创建一个通用的图标组件模拟
const createMockIcon = (name) =>
  React.forwardRef((props, ref) =>
    React.createElement("svg", {
      ...props,
      ref,
      "data-testid": `icon-${name.toLowerCase()}`,
      "aria-label": name,
    }),
  )

module.exports = {
  FieldTypeDate: createMockIcon("FieldTypeDate"),
  Check: createMockIcon("Check"),
  Clock: createMockIcon("Clock"),
  // MonthCalendarHeader 需要的图标
  ChevronDownSmall: createMockIcon("ChevronDownSmall"),
  ChevronLeftSmall: createMockIcon("ChevronLeftSmall"),
  ChevronRightSmall: createMockIcon("ChevronRightSmall"),
  ChevronUpSmall: createMockIcon("ChevronUpSmall"),
  Undo: createMockIcon("Undo"),
  ArrowRight: createMockIcon("ArrowRight"),
  // 添加更多图标的模拟
}
