import React, { ReactElement, ReactNode } from "react"

/**
 * 处理菜单组件的子元素，分类为触发器和内容元素
 * @param children 子元素
 * @param TriggerComponent 触发器组件
 * @param ContentComponent 内容组件
 * @returns 处理后的元素对象
 */
export function processMenuChildren(
  children: ReactNode,
  TriggerComponent: React.ComponentType<any>,
  ContentComponent: React.ComponentType<any>,
) {
  let triggerElement: ReactElement | null = null
  let contentElement: ReactElement | null = null

  // 获取组件的显示名称，用于比较
  const triggerDisplayName = TriggerComponent.displayName || ""
  const contentDisplayName = ContentComponent.displayName || ""

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return

    // 检查是否是触发器组件
    if (
      child.type === TriggerComponent ||
      (child.type as any)?.displayName === triggerDisplayName
    ) {
      triggerElement = child
    }
    // 检查是否是内容组件
    else if (
      child.type === ContentComponent ||
      (child.type as any)?.displayName === contentDisplayName
    ) {
      contentElement = child
    }
  })

  return {
    triggerElement,
    contentElement,
  }
}
