import { tcx } from "@choice-ui/shared"
import { memo } from "react"
import { MenuEmptyTv } from "../tv"

export interface MenuEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const MenuEmpty = memo(function MenuEmpty(props: MenuEmptyProps) {
  const { children, className, ...rest } = props

  const tv = MenuEmptyTv()

  return (
    <div
      {...rest}
      className={tcx(tv.root(), className)}
    >
      {children}
    </div>
  )
})

MenuEmpty.displayName = "MenuEmpty"
