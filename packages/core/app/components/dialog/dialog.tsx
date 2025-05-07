import { FloatingOverlay, FloatingPortal } from "@floating-ui/react"
import { Slot } from "@radix-ui/react-slot"
import React, { memo, useId, useMemo, useRef } from "react"
import { findChildByType, tcx } from "~/utils"
import { ModalContent } from "../modal"
import { DialogBackdrop, DialogHeader, DialogTrigger } from "./components"
import { DialogContext } from "./dialog-context"
import { useDrag, useFloatingDialog, useResize } from "./hooks"
import { dragDialogTv } from "./tv"

const PORTAL_ROOT_ID = "floating-modal-root"

export interface DialogProps {
  className?: string
  children?: React.ReactNode
  draggable?: boolean
  resizable?: {
    width?: boolean
    height?: boolean
  }
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  overlay?: boolean
  outsidePress?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  afterOpenChange?: (isOpen: boolean) => void
}

const DialogComponent = memo(function DialogComponent({
  className,
  children,
  draggable = false,
  resizable = { width: false, height: false },
  minWidth = 200,
  maxWidth,
  minHeight = 100,
  maxHeight,
  overlay = false,
  outsidePress = false,
  open: controlledOpen,
  onOpenChange,
  afterOpenChange,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  const {
    state: dragState,
    handleDragStart,
    reset: resetDrag,
  } = useDrag(dialogRef, {
    enabled: draggable,
  })

  const {
    state: resizeState,
    handleResizeStart,
    reset: resetResize,
  } = useResize(dialogRef, {
    enabled: resizable.width || resizable.height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  })

  const floating = useFloatingDialog({
    open: controlledOpen,
    onOpenChange,
    outsidePress,
    draggable,
    resetDragState: resetDrag,
    resetResizeState: resetResize,
    afterOpenChange,
  })

  const triggerContent = useMemo(() => {
    return findChildByType(children, DialogTrigger)
  }, [children])

  const headerContent = useMemo(() => {
    const headerChild = findChildByType(children, DialogHeader)

    if (!headerChild) return null

    return (
      <Slot
        onMouseDown={draggable ? handleDragStart : undefined}
        role={draggable ? "button" : undefined}
        aria-label={draggable ? "Drag to move popover" : undefined}
        tabIndex={draggable ? 0 : undefined}
      >
        {headerChild}
      </Slot>
    )
  }, [children, draggable, handleDragStart])

  const contentContent = useMemo(() => {
    return findChildByType(children, ModalContent)
  }, [children])

  const backdropContent = useMemo(() => {
    return findChildByType(children, DialogBackdrop)
  }, [children])

  const contextValue = useMemo(
    () => ({
      open: floating.innerOpen,
      setOpen: floating.setInnerOpen,
      titleId,
      descriptionId,
      draggable,
      handleDragStart,
      contentRef,
      dialogRef,
      onCloseClick: floating.handleClose,
    }),
    [
      floating.innerOpen,
      floating.setInnerOpen,
      titleId,
      descriptionId,
      draggable,
      handleDragStart,
      floating.handleClose,
    ],
  )

  const style = dragDialogTv({
    resizable: resizable.width || resizable.height,
    overlay,
  })

  return (
    <DialogContext.Provider value={contextValue}>
      {triggerContent}

      {floating.innerOpen && (
        <FloatingPortal id={PORTAL_ROOT_ID}>
          <FloatingOverlay
            lockScroll
            className={tcx(style.overlay())}
          >
            {backdropContent}

            {backdropContent}

            <div
              ref={(node) => {
                if (node) {
                  dialogRef.current = node
                  floating.refs.setFloating(node)
                }
              }}
              style={floating.getStyles(
                dragState.position || null,
                resizeState.size
                  ? {
                      width: resizeState.size.width,
                      height: resizeState.size.height,
                    }
                  : undefined,
              )}
              className={tcx(style.dialog(), className)}
              {...floating.getFloatingProps()}
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              role="dialog"
              aria-modal="true"
              data-state={floating.isReady ? "open" : "opening"}
              data-draggable={draggable ? "true" : undefined}
            >
              {headerContent}
              {contentContent}

              {resizable.width && (
                <div
                  className={style.resizeWidthHandle()}
                  aria-label="Resize dialog width"
                  tabIndex={0}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleResizeStart(e, { width: true, height: false })
                  }}
                />
              )}

              {resizable.height && (
                <div
                  className={style.resizeHeightHandle()}
                  aria-label="Resize dialog height"
                  tabIndex={0}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleResizeStart(e, { width: false, height: true })
                  }}
                />
              )}
            </div>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </DialogContext.Provider>
  )
})

type DialogComponentType = React.FC<DialogProps> & {
  Trigger: typeof DialogTrigger
  Content: typeof ModalContent
  Header: typeof DialogHeader
  Backdrop: typeof DialogBackdrop
}

export const Dialog = Object.assign(DialogComponent, {
  Trigger: DialogTrigger,
  Content: ModalContent,
  Header: DialogHeader,
  Backdrop: DialogBackdrop,
}) as DialogComponentType
