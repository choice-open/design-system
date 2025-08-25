import { ComponentProps } from "react"
import { tcx } from "~/utils"

type Props = {
  label: string
} & Omit<ComponentProps<"div">, "label">

export const PanelRowLabel = (props: Props) => {
  const { className, label, ...rest } = props
  return (
    <div
      className={tcx(
        "text-secondary-foreground cursor-default truncate select-none [grid-area:label]",
        className,
      )}
      {...rest}
    >
      {label}
    </div>
  )
}
