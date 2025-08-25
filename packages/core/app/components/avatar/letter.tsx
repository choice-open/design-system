import { memo, useId } from "react"

export const InitialLetter = memo(function InitialCharacter({ letter }: { letter: string }) {
  const id = useId()

  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 128 128"
      className="relative"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          width="100%"
          height="100%"
        >
          <text
            className="fill-current text-[4rem] uppercase"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            alignmentBaseline="central"
            textAnchor="middle"
          >
            {letter}
          </text>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        x="0"
        y="0"
        fill={`url(#${id})`}
      ></rect>
    </svg>
  )
})
