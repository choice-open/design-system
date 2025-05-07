import {
  autoUpdate as floatingAutoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react"
import { useCallback, useEffect, useState } from "react"
import { useMergedValue } from "~/hooks"

interface UseFloatingDialogParams {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  outsidePress?: boolean
  autoUpdate?: boolean
  draggable?: boolean
  resetDragState: () => void
  resetResizeState: () => void
  afterOpenChange?: (isOpen: boolean) => void
}

export function useFloatingDialog({
  open,
  defaultOpen,
  onOpenChange,
  outsidePress = false,
  autoUpdate = true,
  draggable,
  resetDragState,
  resetResizeState,
  afterOpenChange,
}: UseFloatingDialogParams) {
  const [isReady, setIsReady] = useState(false)

  const [innerOpen, setInnerOpen] = useMergedValue({
    value: open,
    defaultValue: defaultOpen,
    onChange: (isOpen) => {
      onOpenChange?.(isOpen)
    },
  })

  const { refs, context, floatingStyles } = useFloating({
    open: innerOpen,
    onOpenChange: (open) => {
      if (!open) {
        resetDragState()
        resetResizeState()
        setIsReady(false)
      }
      setInnerOpen(open)
    },
    whileElementsMounted: autoUpdate ? floatingAutoUpdate : undefined,
  })

  useEffect(() => {
    if (innerOpen) {
      setIsReady(false)
      const frameId = requestAnimationFrame(() => {
        setIsReady(true)
        if (afterOpenChange) {
          afterOpenChange(innerOpen)
        }
      })
      return () => cancelAnimationFrame(frameId)
    } else if (afterOpenChange) {
      afterOpenChange(innerOpen)
    }
  }, [innerOpen, afterOpenChange])

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePress,
    escapeKey: true,
  })
  const role = useRole(context)

  const { getFloatingProps } = useInteractions([click, dismiss, role])

  const getStyles = useCallback(
    (
      dragPosition: { x: number; y: number } | null,
      resizeSize?: { width: number; height: number },
    ) => {
      if (!dragPosition) {
        const baseStyles = {
          ...floatingStyles,
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        } as React.CSSProperties

        if (resizeSize) {
          baseStyles.width = `${resizeSize.width}px`
          baseStyles.height = `${resizeSize.height}px`
        }

        return baseStyles
      }

      const dragStyles = {
        ...floatingStyles,
        position: "fixed",
        top: `${dragPosition.y}px`,
        left: `${dragPosition.x}px`,
        transform: "none",
      } as React.CSSProperties

      if (resizeSize) {
        dragStyles.width = `${resizeSize.width}px`
        dragStyles.height = `${resizeSize.height}px`
      }

      return dragStyles
    },
    [floatingStyles, isReady],
  )

  const handleClose = useCallback(() => {
    setInnerOpen(false)
    resetDragState()
    resetResizeState()
  }, [setInnerOpen, resetDragState, resetResizeState])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && innerOpen) {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [innerOpen, handleClose])

  return {
    refs,
    context,
    isReady,
    innerOpen,
    setInnerOpen,
    getFloatingProps,
    getStyles,
    handleClose,
  }
}
