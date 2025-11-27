import { memo, useEffect, useMemo, useRef } from "react"

const SIZE_MAP = {
  small: 16,
  medium: 24,
  large: 32,
} as const

interface InitialLetterProps {
  letter: string
  size?: "small" | "medium" | "large"
}

export const InitialLetter = memo(function InitialLetter({
  letter,
  size = "medium",
}: InitialLetterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasSize = useMemo(() => SIZE_MAP[size] * 2, [size])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvasSize
    canvas.height = canvasSize

    ctx.clearRect(0, 0, canvasSize, canvasSize)

    const fontSize = canvasSize * 0.5
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "currentColor"

    const upperLetter = letter.toUpperCase()
    ctx.fillText(upperLetter, canvasSize / 2, canvasSize / 2)
  }, [letter, canvasSize])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="relative h-full w-full"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  )
})
