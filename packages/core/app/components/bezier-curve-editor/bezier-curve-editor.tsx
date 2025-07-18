import { useCallback, useMemo, useRef } from "react"
import {
  BezierCurveEditorCurve,
  BezierCurveEditorEndPoints,
  BezierCurveEditorPlane,
} from "./components"
import { useHandleState } from "./hooks"
import { BezierCurveEditorTv } from "./tv"
import type { BezierCurveExpandedValueType, BezierCurveValueType } from "./types"
import { bezierCurveParamsFromSizeAndValue } from "./utils"
import { tcx } from "~/utils"
import { useEventCallback } from "usehooks-ts"

export interface Point {
  x: number
  y: number
}

interface BezierCurveEditorBaseProps {
  className?: string
  delay?: number
  disabledPoints?: [boolean, boolean]
  duration?: number
  enablePreview?: boolean
  handleSize?: number
  outerAreaSize?: number
  showPlane?: boolean
  size?: number
  strokeWidth?: number
}

interface BezierCurveEditorEditNodeProps {
  allowNodeEditing: true
  onChange?: (value: BezierCurveExpandedValueType) => void
  value?: BezierCurveExpandedValueType
}
interface BezierCurveEditorFixedNodeProps {
  allowNodeEditing?: false
  onChange?: (value: BezierCurveValueType) => void
  value?: BezierCurveValueType
}

export type BezierCurveEditorProps = BezierCurveEditorBaseProps &
  (BezierCurveEditorEditNodeProps | BezierCurveEditorFixedNodeProps)

// 将 TV 实例移到组件外部，避免每次渲染都重新创建
const tv = BezierCurveEditorTv()

export const BezierCurveEditor = (props: BezierCurveEditorProps) => {
  const {
    className,
    duration = 2,
    delay = 0,
    enablePreview,
    handleSize = 8,
    outerAreaSize = 64,
    size = 192,
    strokeWidth = 1,
    value: valueProp = [0.4, 0, 1, 0.6],
    disabledPoints = [false, false],
    showPlane = true,
  } = props

  const initialValueRef = useRef<BezierCurveExpandedValueType>(
    valueProp.length === 4 ? [0, 0, ...valueProp, 1, 1] : valueProp,
  )

  // 缓存扩展值的计算
  const value = useMemo((): BezierCurveExpandedValueType => {
    return valueProp.length === 4 ? [0, 0, ...valueProp, 1, 1] : valueProp
  }, [valueProp])

  const updateValueRef = useCallback(() => {
    // 从 props 重新计算当前值，确保获取最新状态
    const currentValue: BezierCurveExpandedValueType =
      valueProp.length === 4
        ? ([0, 0, ...valueProp, 1, 1] as BezierCurveExpandedValueType)
        : valueProp
    initialValueRef.current = [...currentValue] as BezierCurveExpandedValueType
  }, [valueProp])

  // 缓存坐标计算结果
  const coordinateParams = useMemo(
    () => bezierCurveParamsFromSizeAndValue(size, value),
    [size, value],
  )

  const moveStartHandle = useEventCallback((start: Point, movement: Point) => {
    const nextValue = moveHandle(initialValueRef.current, size, [2, 3], start, movement)
    const clampedValue = clampValue(outerAreaSize, size, nextValue)
    if (props.onChange && props.allowNodeEditing) props.onChange(clampedValue)
    if (props.onChange && props.allowNodeEditing !== true)
      props.onChange(clampedValue.slice(2, 6) as BezierCurveValueType)
  })

  const [
    movingStartHandle,
    {
      handlePointerLeaveOrUp: handleStartHandlePointerLeaveOrUp,
      handlePointerMove: handleStartHandlePointerMove,
      handlePointerStartMoving: handleStartHandleStartMoving,
    },
  ] = useHandleState(moveStartHandle, updateValueRef)

  const moveEndHandle = useEventCallback((start: Point, movement: Point) => {
    const nextValue = moveHandle(initialValueRef.current, size, [4, 5], start, movement)
    const clampedValue = clampValue(outerAreaSize, size, nextValue)
    if (props.onChange && props.allowNodeEditing) props.onChange(clampedValue)
    if (props.onChange && props.allowNodeEditing !== true)
      props.onChange(clampedValue.slice(2, 6) as BezierCurveValueType)
  })

  const [
    movingEndHandle,
    {
      handlePointerLeaveOrUp: handleEndHandlePointerLeaveOrUp,
      handlePointerMove: handleEndHandlePointerMove,
      handlePointerStartMoving: handleEndHandleStartMoving,
    },
  ] = useHandleState(moveEndHandle, updateValueRef)

  const moveStartPoint = useEventCallback((start: Point, movement: Point) => {
    const nextValue = moveHandle(initialValueRef.current, size, [0, 1], start, movement)
    const clampedValue = clampValue(outerAreaSize, size, nextValue)
    if (props.onChange && props.allowNodeEditing) props.onChange(clampedValue)
    if (props.onChange && props.allowNodeEditing !== true)
      props.onChange(clampedValue.slice(2, 6) as BezierCurveValueType)
  })

  const [
    movingStartPoint,
    {
      handlePointerLeaveOrUp: handleStartPointPointerLeaveOrUp,
      handlePointerMove: handleStartPointPointerMove,
      handlePointerStartMoving: handleStartPointStartMoving,
    },
  ] = useHandleState(moveStartPoint, updateValueRef)

  const moveEndPoint = useEventCallback((start: Point, movement: Point) => {
    const nextValue = moveHandle(initialValueRef.current, size, [6, 7], start, movement)
    const clampedValue = clampValue(outerAreaSize, size, nextValue)
    if (props.onChange && props.allowNodeEditing) props.onChange(clampedValue)
    if (props.onChange && props.allowNodeEditing !== true)
      props.onChange(clampedValue.slice(2, 6) as BezierCurveValueType)
  })

  const [
    movingEndPoint,
    {
      handlePointerLeaveOrUp: handleEndPointPointerLeaveOrUp,
      handlePointerMove: handleEndPointPointerMove,
      handlePointerStartMoving: handleEndPointStartMoving,
    },
  ] = useHandleState(moveEndPoint, updateValueRef)

  // 缓存预览状态计算
  const previewState = useMemo(() => {
    if (!enablePreview) return "hidden"
    return movingStartHandle || movingEndHandle ? "paused" : "running"
  }, [enablePreview, movingStartHandle, movingEndHandle])

  // 缓存内联样式对象
  const presentationStyle = useMemo(
    () => ({
      left: strokeWidth,
      width: size,
    }),
    [strokeWidth, size],
  )

  const startHandleStyle = useMemo(
    () => ({
      top: coordinateParams.startBezierHandle[1] + outerAreaSize + strokeWidth,
      left: coordinateParams.startBezierHandle[0] + strokeWidth,
      width: handleSize,
      height: handleSize,
    }),
    [coordinateParams.startBezierHandle, outerAreaSize, strokeWidth, handleSize],
  )

  const endHandleStyle = useMemo(
    () => ({
      top: coordinateParams.endBezierHandle[1] + outerAreaSize + strokeWidth,
      left: coordinateParams.endBezierHandle[0] + strokeWidth,
      width: handleSize,
      height: handleSize,
    }),
    [coordinateParams.endBezierHandle, outerAreaSize, strokeWidth, handleSize],
  )

  return (
    <div
      data-slot="base"
      className={tcx(tv.base(), className)}
    >
      <div
        data-slot="wrappr"
        className={tv.wrappr()}
      >
        <div
          data-slot="presentation"
          role="presentation"
          className={tv.presentation()}
          style={presentationStyle}
        />

        {showPlane && (
          <BezierCurveEditorPlane
            size={size}
            outerAreaSize={outerAreaSize}
            strokeWidth={strokeWidth}
            innerAreaColor="none"
          />
        )}

        <BezierCurveEditorCurve
          disabledPoints={disabledPoints}
          value={value}
          size={size}
          strokeWidth={strokeWidth}
          outerAreaSize={outerAreaSize}
          duration={duration}
          delay={delay}
          previewState={previewState}
        />

        <BezierCurveEditorEndPoints
          disabledPoints={disabledPoints}
          size={size}
          value={value}
          outerAreaSize={outerAreaSize}
          strokeWidth={strokeWidth}
          handleSize={handleSize}
          isEditable={props.allowNodeEditing}
          movingEndPoint={movingEndPoint}
          movingStartPoint={movingStartPoint}
          handleStartPointStartMoving={handleStartPointStartMoving}
          handleStartPointPointerMove={handleStartPointPointerMove}
          handleStartPointPointerLeaveOrUp={handleStartPointPointerLeaveOrUp}
          handleEndPointStartMoving={handleEndPointStartMoving}
          handleEndPointPointerMove={handleEndPointPointerMove}
          handleEndPointPointerLeaveOrUp={handleEndPointPointerLeaveOrUp}
        />

        {disabledPoints[0] ? null : (
          <button
            data-slot="handle"
            data-state="start"
            data-active={movingStartHandle}
            type="button"
            className={tv.handle()}
            style={startHandleStyle}
            onPointerDown={handleStartHandleStartMoving}
            onPointerMove={handleStartHandlePointerMove}
            onPointerUp={handleStartHandlePointerLeaveOrUp}
            onPointerCancel={handleStartHandlePointerLeaveOrUp}
          />
        )}
        {disabledPoints[1] ? null : (
          <button
            data-slot="handle"
            data-state="end"
            data-active={movingEndHandle}
            type="button"
            className={tv.handle()}
            style={endHandleStyle}
            onPointerDown={handleEndHandleStartMoving}
            onPointerMove={handleEndHandlePointerMove}
            onPointerUp={handleEndHandlePointerLeaveOrUp}
            onPointerCancel={handleEndHandlePointerLeaveOrUp}
          />
        )}
      </div>
    </div>
  )
}

function clampValue(
  outerAreaSize: number,
  size: number,
  value: BezierCurveExpandedValueType,
): BezierCurveExpandedValueType {
  const nextValue = [...value] satisfies BezierCurveExpandedValueType
  const allowedOuterValue = outerAreaSize / size
  nextValue[0] = Math.max(0, Math.min(1, nextValue[0]))
  nextValue[1] = Math.max(0, Math.min(1, nextValue[1]))
  nextValue[2] = Math.max(0, Math.min(1, nextValue[2]))
  nextValue[4] = Math.max(0, Math.min(1, nextValue[4]))
  nextValue[6] = Math.max(0, Math.min(1, nextValue[6]))
  nextValue[7] = Math.max(0, Math.min(1, nextValue[7]))
  nextValue[3] = Math.max(-allowedOuterValue, Math.min(1 + allowedOuterValue, nextValue[3]))
  nextValue[5] = Math.max(-allowedOuterValue, Math.min(1 + allowedOuterValue, nextValue[5]))
  return nextValue
}

function moveHandle(
  value: BezierCurveExpandedValueType,
  size: number,
  targetIndices: [number, number],
  start: Point,
  { x, y }: Point,
): BezierCurveExpandedValueType {
  const nextValue = [...value] satisfies BezierCurveExpandedValueType
  const [xIndex, yIndex] = targetIndices

  const relXMoved = (x - start.x) / size
  const relYMoved = (y - start.y) / size

  nextValue[xIndex] = nextValue[xIndex] + relXMoved
  nextValue[yIndex] = nextValue[yIndex] - relYMoved

  return nextValue
}
