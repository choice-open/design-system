import type { Placement } from "@floating-ui/react"
import {
  flip,
  autoUpdate as floatingAutoUpdate,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMergedValue } from "~/hooks"

interface UseFloatingPopoverParams {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: Placement
  offset?: number
  interactions?: "hover" | "click" | "focus" | "none"
  outsidePressIgnore?: string
  delay?: { open?: number; close?: number }
  autoUpdate?: boolean
  draggable: boolean
  nodeId: string
  resetDragState: () => void
}

export function useFloatingPopover({
  open,
  defaultOpen,
  onOpenChange,
  placement = "bottom",
  offset: offsetDistance = 8,
  interactions = "click",
  outsidePressIgnore,
  delay,
  autoUpdate = true,
  draggable,
  nodeId,
  resetDragState,
}: UseFloatingPopoverParams) {
  const [positionReady, setPositionReady] = useState(false)

  const positionRef = useRef({ x: 0, y: 0 })

  const triggerRefs = useRef({
    last: null as HTMLElement | null,
  })

  const [innerOpen, setInnerOpen] = useMergedValue({
    value: open,
    defaultValue: defaultOpen,
    onChange: (isOpen) => {
      onOpenChange?.(isOpen)
    },
  })

  const middleware = [
    offset(offsetDistance),
    flip({ padding: 8 }),
    shift({ mainAxis: true, crossAxis: true }),
    size({
      apply({ availableWidth, availableHeight, elements }) {
        const maxWidth = Math.min(availableWidth, 400)
        Object.assign(elements.floating.style, {
          maxWidth: `${maxWidth}px`,
          maxHeight: `${availableHeight}px`,
        })
      },
      padding: 8,
    }),
  ]

  const { refs, floatingStyles, context, x, y } = useFloating({
    nodeId,
    open: innerOpen,
    onOpenChange: (open) => {
      if (!open) {
        resetDragState()
        setPositionReady(false)
      }
      setInnerOpen(open)
    },
    placement,
    middleware,
    whileElementsMounted: autoUpdate ? floatingAutoUpdate : undefined,
  })

  // 打开时重置就绪状态
  useEffect(() => {
    if (innerOpen) {
      setPositionReady(false)
    }
  }, [innerOpen])

  // 位置计算完成后设置就绪状态
  useEffect(() => {
    if (innerOpen && x !== null && y !== null) {
      // 保存位置信息
      positionRef.current = { x, y }

      // 使用RAF设置就绪状态
      const frameId = requestAnimationFrame(() => {
        setPositionReady(true)
      })

      return () => cancelAnimationFrame(frameId)
    }
  }, [innerOpen, x, y])

  const hover = useHover(context, {
    handleClose: safePolygon({ blockPointerEvents: true, buffer: 1 }),
    enabled: interactions === "hover",
    delay,
  })

  const click = useClick(context, {
    enabled: interactions === "click",
  })

  const focus = useFocus(context, {
    enabled: interactions === "focus",
  })

  const outsidePressHandler = useCallback(
    (event: MouseEvent) => {
      let checkingNode = event.target
      while (checkingNode instanceof Element) {
        if (outsidePressIgnore && checkingNode.classList.contains(outsidePressIgnore)) {
          return false
        }
        checkingNode = checkingNode.parentElement
      }
      return true
    },
    [outsidePressIgnore],
  )

  const dismiss = useDismiss(context, {
    enabled: interactions !== "none",
    escapeKey: true,
    outsidePress: outsidePressHandler,
  })

  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    focus,
    dismiss,
    role,
  ])

  const getStyles = useCallback(
    (dragPosition: { x: number; y: number } | null, isDragging: boolean) => {
      const transform = dragPosition
        ? `translate(${dragPosition.x}px, ${dragPosition.y}px)`
        : `translate(${x}px, ${y}px)`

      return {
        ...floatingStyles,
        transform,
      } as React.CSSProperties
    },
    [floatingStyles, x, y, positionReady],
  )

  const handleClose = useCallback(() => {
    setInnerOpen(false)
    resetDragState()
  }, [setInnerOpen, resetDragState])

  const handleTriggerRef = useCallback(
    (triggerRef: React.RefObject<HTMLElement>) => {
      if (triggerRef?.current && triggerRef.current !== triggerRefs.current.last) {
        triggerRefs.current.last = triggerRef.current
        refs.setReference(triggerRef.current)
      }
    },
    [refs],
  )

  return {
    refs,
    triggerRefs,
    context,
    positionReady,
    innerOpen,
    setInnerOpen,
    x,
    y,
    getReferenceProps,
    getFloatingProps,
    getStyles,
    handleClose,
    handleTriggerRef,
  }
}
