import { useEffect, useRef } from "react"
import { PressProps, usePress } from "./use-press"

export type PressMoveProps = PressProps & {
  onPressMove?: (e: PointerEvent) => void
  onPressMoveLeft?: (delta: number) => void
  onPressMoveRight?: (delta: number) => void
  onPressMoveTop?: (delta: number) => void
  onPressMoveBottom?: (delta: number) => void
  onPressStart?: (e: PointerEvent) => void
  onPressEnd?: (e: PointerEvent) => void
  disabled?: boolean
}

const cursorStyle = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='24' fill='none'%3E%3Cg filter='url(%23a)'%3E%3Cpath fill='%23fff' d='M5.41 12 9 8.41V11h16V8.42L28.58 12 25 15.59V13H9v2.59L5.41 12ZM4 12l6 6v-4h14v4l6-6-6-6v4H10V6l-6 6Z'/%3E%3Cpath fill='%23202125' d='M12.5 13h12.52v2.59L28.58 12l-3.56-3.58v2.6H9v-2.6L5.41 12 9 15.59V13h3.5Z'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='a' width='29.6' height='15.6' x='2.2' y='5.2' color-interpolation-filters='sRGB' filterUnits='userSpaceOnUse'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'/%3E%3CfeOffset dy='1'/%3E%3CfeGaussianBlur stdDeviation='.9'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0'/%3E%3CfeBlend in2='BackgroundImageFix' result='effect1_dropShadow_504_477'/%3E%3CfeBlend in='SourceGraphic' in2='effect1_dropShadow_504_477' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E")`

export interface PressMoveResult {
  isPressed: boolean
  pressMoveProps: {
    ref: (el: HTMLElement | null) => void
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => void
    style?: React.CSSProperties
  }
}

export const usePressMove = ({
  onPressMove,
  onPressMoveLeft,
  onPressMoveRight,
  onPressMoveTop,
  onPressMoveBottom,
  onPressStart,
  onPressEnd,
  ...rest
}: PressMoveProps): PressMoveResult => {
  const targetRef = useRef<HTMLElement | null>(null)
  const isPressedRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const distanceThreshold = 5
  const movementRef = useRef({ x: 0, y: 0 })
  const virtualPositionRef = useRef({ x: 0, y: 0 })

  const { isPressed, pressProps } = usePress({
    ...rest,
    onPressStart: (e) => {
      if (!rest.disabled && "clientX" in e && "clientY" in e && targetRef.current) {
        // 延迟创建 overlay 和锁定指针，避免立即触发重绘
        requestAnimationFrame(() => {
          createOverlay()
          virtualPositionRef.current = { x: e.clientX, y: e.clientY }
          updateVirtualCursor()
          document.documentElement.requestPointerLock()
          document.addEventListener("pointermove", handlePointerMove)
          document.addEventListener("pointerup", handlePointerUp, { once: true })
        })

        // 调用原始的 onPressStart
        if (onPressStart && "nativeEvent" in e) {
          onPressStart(e.nativeEvent as PointerEvent)
        }
      }
    },
  })

  isPressedRef.current = isPressed

  const createOverlay = () => {
    if (!overlayRef.current) {
      const virtualCursor = document.createElement("div")
      virtualCursor.style.position = "fixed"
      virtualCursor.style.width = "34px"
      virtualCursor.style.height = "24px"
      virtualCursor.style.transform = "translate(-50%, -50%)"
      virtualCursor.style.pointerEvents = "none"
      virtualCursor.style.zIndex = "10000001"
      virtualCursor.style.backgroundImage = cursorStyle
      virtualCursor.style.backgroundSize = "contain"
      virtualCursor.style.backgroundRepeat = "no-repeat"
      document.body.appendChild(virtualCursor)
      cursorRef.current = virtualCursor
    }
  }

  const removeOverlay = () => {
    if (overlayRef.current) {
      document.body.removeChild(overlayRef.current)
      overlayRef.current = null
    }
    if (cursorRef.current) {
      document.body.removeChild(cursorRef.current)
      cursorRef.current = null
    }
    // 退出指针锁定
    if (document.pointerLockElement === document.documentElement) {
      document.exitPointerLock()
    }
    // 移除事件监听
    document.removeEventListener("pointermove", handlePointerMove)
  }

  const updateVirtualCursor = () => {
    if (!cursorRef.current) return

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const cursorWidth = 34 // 鼠标图标宽度
    const cursorHeight = 24 // 鼠标图标高度
    const halfCursorWidth = cursorWidth / 2
    const halfCursorHeight = cursorHeight / 2

    // 处理水平循环
    if (virtualPositionRef.current.x < -halfCursorWidth) {
      virtualPositionRef.current.x = screenWidth + halfCursorWidth
    } else if (virtualPositionRef.current.x > screenWidth + halfCursorWidth) {
      virtualPositionRef.current.x = -halfCursorWidth
    }

    // 处理垂直循环
    if (virtualPositionRef.current.y < -halfCursorHeight) {
      virtualPositionRef.current.y = screenHeight + halfCursorHeight
    } else if (virtualPositionRef.current.y > screenHeight + halfCursorHeight) {
      virtualPositionRef.current.y = -halfCursorHeight
    }

    cursorRef.current.style.left = `${virtualPositionRef.current.x}px`
    cursorRef.current.style.top = `${virtualPositionRef.current.y}px`
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (isPressedRef.current && !rest.disabled && targetRef.current) {
      onPressMove?.(e)

      // 累积移动距离
      movementRef.current.x += e.movementX
      movementRef.current.y += e.movementY
      virtualPositionRef.current.x += e.movementX
      virtualPositionRef.current.y += e.movementY

      // 更新虚拟鼠标位置
      updateVirtualCursor()

      // 处理水平方向的数值变化
      const movementX = Math.abs(movementRef.current.x)
      if (movementX >= distanceThreshold) {
        if (movementRef.current.x < 0 && onPressMoveLeft) {
          onPressMoveLeft(Math.floor(movementX / distanceThreshold))
        } else if (movementRef.current.x > 0 && onPressMoveRight) {
          onPressMoveRight(Math.floor(movementX / distanceThreshold))
        }
        // 保留余数部分的移动距离
        movementRef.current.x = movementRef.current.x % distanceThreshold
      }

      // 处理垂直方向的数值变化
      const movementY = Math.abs(movementRef.current.y)
      if (movementY >= distanceThreshold) {
        if (movementRef.current.y < 0 && onPressMoveTop) {
          onPressMoveTop(Math.floor(movementY / distanceThreshold))
        } else if (movementRef.current.y > 0 && onPressMoveBottom) {
          onPressMoveBottom(Math.floor(movementY / distanceThreshold))
        }
        // 保留余数部分的移动距离
        movementRef.current.y = movementRef.current.y % distanceThreshold
      }
    }
  }

  const handlePointerUp = (e: PointerEvent) => {
    removeOverlay()
    movementRef.current = { x: 0, y: 0 }
    onPressEnd?.(e)
  }

  // 清理函数
  useEffect(() => {
    return () => {
      removeOverlay()
    }
  }, [])

  return {
    isPressed,
    pressMoveProps: {
      ...pressProps,
      ref: (el: HTMLElement | null) => {
        targetRef.current = el
      },
    },
  }
}
