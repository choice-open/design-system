import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingOverlay,
  FloatingPortal,
  FloatingTree,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
  type FloatingFocusManagerProps,
  type Placement,
} from "@floating-ui/react"
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import {
  MenuButton,
  MenuContext,
  MenuContextContent,
  MenuContextItem,
  MenuContextLabel,
  MenuContextSubTrigger,
  MenuDivider,
  MenuInput,
  MenuScrollArrow,
  MenuSearch,
  MenuTrigger,
  MenuValue,
  useMenuScroll,
} from "../menus"

const PORTAL_ROOT_ID = "floating-menu-root"
const DEFAULT_OFFSET = 4

export interface CoordinateMenuPosition {
  x: number
  y: number
}

export interface CoordinateMenuProps {
  children?: React.ReactNode
  focusManagerProps?: FloatingFocusManagerProps
  isOpen: boolean
  matchTriggerWidth?: boolean
  offset?: number
  onClose: () => void
  placement?: Placement
  portalId?: string
  position: CoordinateMenuPosition | null
  selection?: boolean
}

interface CoordinateMenuComponentType
  extends React.ForwardRefExoticComponent<
    CoordinateMenuProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: typeof MenuButton
  Content: typeof MenuContextContent
  Divider: typeof MenuDivider
  Input: typeof MenuInput
  Item: typeof MenuContextItem
  Label: typeof MenuContextLabel
  Search: typeof MenuSearch
  SubTrigger: typeof MenuContextSubTrigger
  Trigger: typeof MenuTrigger
  Value: typeof MenuValue
}

/**
 * CoordinateMenu - 基于坐标位置的菜单组件
 *
 * 核心特性：
 * - 基于坐标位置显示，无需 trigger
 * - 支持完整的菜单功能和组件
 * - 使用 MenuContext 统一组件
 * - 完整的键盘导航支持
 */
const CoordinateMenuComponent = memo(
  forwardRef<HTMLDivElement, CoordinateMenuProps>(function CoordinateMenuComponent(props, ref) {
    const {
      children,
      isOpen,
      onClose,
      position,
      offset: offsetDistance = DEFAULT_OFFSET,
      placement = "bottom-start",
      portalId = PORTAL_ROOT_ID,
      selection = false,
      matchTriggerWidth = false,
      focusManagerProps = {
        modal: true,
        returnFocus: false,
      },
    } = props

    // References
    const scrollRef = useRef<HTMLDivElement>(null)
    const selectTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
    const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])

    // 状态管理
    const [hasFocusInside, setHasFocusInside] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [touch, setTouch] = useState(false)

    // 生成唯一 ID
    const baseId = useId()
    const menuId = `menu-${baseId}`

    // 上下文和 hooks
    const tree = useFloatingTree()
    const nodeId = useFloatingNodeId()
    const parentId = useFloatingParentNodeId()

    // 同步设置虚拟位置引用 - 避免异步造成的闪烁
    const setVirtualPosition = useEventCallback((pos: CoordinateMenuPosition) => {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            x: pos.x,
            y: pos.y,
            width: 0,
            height: 0,
            left: pos.x,
            right: pos.x,
            top: pos.y,
            bottom: pos.y,
          }
        },
        contextElement: document.body,
      })
    })

    // 处理开关状态变化
    const handleOpenChange = useEventCallback((newOpen: boolean) => {
      if (!newOpen) {
        onClose()
      }
    })

    // Floating UI 配置
    const { refs, floatingStyles, context, isPositioned } = useFloating({
      nodeId,
      open: isOpen,
      onOpenChange: handleOpenChange,
      placement,
      middleware: [
        offset({ mainAxis: offsetDistance, alignmentAxis: 0 }),
        flip(),
        shift(),
        size({
          padding: 4,
          apply(args) {
            const { elements, availableHeight, rects } = args
            Object.assign(elements.floating.style, {
              height: `${Math.min(elements.floating.clientHeight, availableHeight)}px`,
            })
            if (matchTriggerWidth) {
              elements.floating.style.width = `${rects.reference.width}px`
            }
          },
        }),
      ],
      whileElementsMounted: autoUpdate,
    })

    // 使用 ref 避免重复设置，并在 useLayoutEffect 中同步设置
    const lastPositionRef = useRef<CoordinateMenuPosition | null>(null)

    useLayoutEffect(() => {
      if (
        position &&
        isOpen &&
        (!lastPositionRef.current ||
          lastPositionRef.current.x !== position.x ||
          lastPositionRef.current.y !== position.y)
      ) {
        setVirtualPosition(position)
        lastPositionRef.current = position
      }
    }, [position, isOpen, setVirtualPosition])

    // 交互处理器配置
    const hover = useHover(context, {
      enabled: false, // coordinate menu 不需要 hover
    })

    const click = useClick(context, {
      event: "mousedown",
      toggle: false, // coordinate menu 通过外部状态控制
      enabled: false, // 不启用点击切换，通过外部控制
    })

    const role = useRole(context, { role: "menu" })
    const dismiss = useDismiss(context, {
      bubbles: true,
      escapeKey: true,
    })

    const listNavigation = useListNavigation(context, {
      listRef: elementsRef,
      activeIndex,
      nested: false,
      onNavigate: setActiveIndex,
      loop: true,
    })

    const typeahead = useTypeahead(context, {
      listRef: labelsRef,
      onMatch: isOpen ? setActiveIndex : undefined,
      activeIndex,
    })

    const { getFloatingProps, getItemProps } = useInteractions([
      hover,
      click,
      role,
      dismiss,
      listNavigation,
      typeahead,
    ])

    // Tree 事件处理
    useEffect(() => {
      if (!tree) return

      const handleTreeClick = () => {
        handleOpenChange(false)
      }

      tree.events.on("click", handleTreeClick)

      return () => {
        tree.events.off("click", handleTreeClick)
      }
    }, [tree, handleOpenChange])

    // 发送菜单打开事件
    useEffect(() => {
      if (isOpen && tree) {
        tree.events.emit("menuopen", { parentId, nodeId })
      }
    }, [tree, isOpen, nodeId, parentId])

    // 菜单打开时自动激活第一个选项
    useEffect(() => {
      if (isOpen && activeIndex === null) {
        setActiveIndex(0)
      }
    }, [isOpen, activeIndex])

    // 菜单关闭时重置 activeIndex
    useEffect(() => {
      if (!isOpen) {
        setActiveIndex(null)
      }
    }, [isOpen])

    // 使用共享的滚动逻辑
    const { handleArrowScroll, handleArrowHide, getScrollProps } = useMenuScroll({
      scrollRef,
      selectTimeoutRef,
      scrollTop,
      setScrollTop,
      touch,
      isSelect: false,
      fallback: false,
      setInnerOffset: undefined,
    })

    // 触摸处理
    const handleTouchStart = useEventCallback(() => {
      setTouch(true)
    })

    const handlePointerMove = useEventCallback(({ pointerType }: React.PointerEvent) => {
      if (pointerType !== "touch") {
        setTouch(false)
      }
    })

    // 创建关闭方法
    const handleClose = useEventCallback(() => {
      handleOpenChange(false)
    })

    // 处理子元素
    const { contentElement } = useMemo(() => {
      const childrenArray = Children.toArray(children)

      // 找到内容包装元素
      const content = childrenArray.find(
        (child) => isValidElement(child) && child.type === MenuContextContent,
      ) as React.ReactElement | null

      return {
        contentElement: content,
      }
    }, [children])

    // 创建 MenuContext 值
    const contextValue = useMemo(
      () => ({
        activeIndex,
        setActiveIndex,
        getItemProps,
        setHasFocusInside,
        isOpen: isOpen,
        selection,
        close: handleClose,
      }),
      [activeIndex, getItemProps, handleClose, isOpen, selection],
    )

    return (
      <FloatingNode id={nodeId}>
        <FloatingList
          elementsRef={elementsRef}
          labelsRef={labelsRef}
        >
          <FloatingPortal id={portalId}>
            {isOpen && position && (
              <FloatingOverlay
                lockScroll={!touch}
                className={tcx("z-50", focusManagerProps.modal ? "" : "pointer-events-none")}
              >
                <FloatingFocusManager
                  context={context}
                  initialFocus={0}
                  {...focusManagerProps}
                >
                  <div
                    id={menuId}
                    style={floatingStyles}
                    ref={refs.setFloating}
                    onTouchStart={handleTouchStart}
                    onPointerMove={handlePointerMove}
                    {...getFloatingProps({
                      ...getScrollProps(),
                      onContextMenu(e: React.MouseEvent) {
                        e.preventDefault()
                      },
                    })}
                  >
                    <MenuContext.Provider value={contextValue}>
                      {contentElement &&
                        cloneElement(contentElement, {
                          ref: scrollRef,
                          matchTriggerWidth: matchTriggerWidth,
                        })}
                    </MenuContext.Provider>

                    {/* 滚动箭头 */}
                    {["up", "down"].map((dir) => (
                      <MenuScrollArrow
                        key={dir}
                        dir={dir as "up" | "down"}
                        scrollTop={scrollTop}
                        scrollRef={scrollRef}
                        innerOffset={0}
                        isPositioned={isPositioned}
                        onScroll={handleArrowScroll}
                        onHide={handleArrowHide}
                      />
                    ))}
                  </div>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </FloatingPortal>
        </FloatingList>
      </FloatingNode>
    )
  }),
)

// 基础组件
const BaseCoordinateMenu = memo(function CoordinateMenu(props: CoordinateMenuProps) {
  const { children, ...rest } = props
  const parentId = useFloatingParentNodeId()

  if (parentId === null) {
    return (
      <FloatingTree>
        <CoordinateMenuComponent {...rest}>{children}</CoordinateMenuComponent>
      </FloatingTree>
    )
  }

  return <CoordinateMenuComponent {...props}>{children}</CoordinateMenuComponent>
})

// 导出带有静态属性的组件
export const CoordinateMenu = Object.assign(BaseCoordinateMenu, {
  displayName: "CoordinateMenu",
  Trigger: MenuTrigger,
  Item: MenuContextItem,
  SubTrigger: MenuContextSubTrigger,
  Divider: MenuDivider,
  Label: MenuContextLabel,
  Search: MenuSearch,
  Button: MenuButton,
  Input: MenuInput,
  Content: MenuContextContent,
  Value: MenuValue,
}) as unknown as CoordinateMenuComponentType
