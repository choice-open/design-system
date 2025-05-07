import React, { ReactElement, ReactNode } from "react"

/**
 * 处理菜单组件的子元素，分类为触发器、内容和其他元素
 * @param children 子元素
 * @param TriggerComponent 触发器组件
 * @param ContentComponent 内容组件
 * @param contentProps 内容组件的属性
 * @returns 处理后的元素对象
 */
export function processMenuChildren<T extends Record<string, any>>(
  children: ReactNode,
  TriggerComponent: React.ComponentType<any>,
  ContentComponent: React.ComponentType<any>,
  contentProps?: T,
) {
  let triggerElement: ReactElement | null = null
  let contentElement: ReactElement | null = null
  const otherElements: ReactElement[] = []

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
    // 其他组件
    else {
      otherElements.push(child)
    }
  })

  // 如果没有显式的内容组件，但有其他元素，则创建一个内容组件包装它们
  let finalContent: ReactElement | null = null
  if (contentElement) {
    finalContent = contentElement
  } else if (otherElements.length > 0) {
    finalContent = React.createElement(ContentComponent, contentProps, otherElements)
  }

  return {
    triggerElement,
    contentElement: finalContent,
    otherElements,
  }
}
