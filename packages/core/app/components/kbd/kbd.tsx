import { DetailedHTMLProps, HTMLAttributes, useMemo } from "react"
import { tcx } from "~/utils"
import { kbdTv } from "./tv"
import { KbdKey, kbdKeysLabelMap, kbdKeysMap } from "./utils"

export interface KbdProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  keys?: KbdKey | KbdKey[]
  children?: React.ReactNode
}

export const Kbd = (props: KbdProps) => {
  const { className, keys, children, ...rest } = props

  const style = kbdTv()

  const keysContent = useMemo(() => {
    const keysToRender = typeof keys === "string" ? [keys] : Array.isArray(keys) ? keys : []

    return keysToRender.map((key) => (
      <abbr
        key={key}
        className={style.abbr()}
        title={kbdKeysLabelMap[key]}
      >
        {kbdKeysMap[key]}
      </abbr>
    ))
  }, [keys, style])

  return (
    <kbd
      {...rest}
      className={tcx(style.base(), className)}
    >
      {keysContent}
      {children && <span>{children}</span>}
    </kbd>
  )
}
