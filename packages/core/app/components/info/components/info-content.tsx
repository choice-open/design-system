import { FloatingPortal, useMergeRefs, useTransitionStyles } from "@floating-ui/react"
import { forwardRef, HTMLProps, ReactNode, useMemo } from "react"
import { tcx } from "~/utils"
import { useInfoState } from "../info"
import { infoContentVariants } from "../tv"

interface InfoContentProps extends HTMLProps<HTMLDivElement> {
  icon?: ReactNode
  portalId?: string
}

export const InfoContent = forwardRef<HTMLDivElement, InfoContentProps>(
  function InfoContent(props, propRef) {
    const { className, children, icon, portalId, ...rest } = props
    const state = useInfoState()
    const ref = useMergeRefs([state.refs.setFloating, propRef])

    const { isMounted, styles } = useTransitionStyles(state.context, {
      duration: 150,
      initial: {
        opacity: 0,
      },
      // 使用 common 选项设置正确的 transformOrigin
      common: ({ side }) => ({
        transformOrigin: side === "left" ? "right center" : "left center",
      }),
    })

    // 缓存样式变体计算
    const tv = useMemo(
      () => infoContentVariants({ placement: state.placement as "left-start" | "right-start" }),
      [state.placement],
    )

    // 如果被禁用或未挂载，不渲染
    if (state.disabled || !isMounted) return null

    return (
      <FloatingPortal id={portalId}>
        <div
          ref={ref}
          className="pointer-events-none"
          style={state.floatingStyles}
          {...state.getFloatingProps(rest)}
        >
          <div
            className={tcx(tv.content({ className }))}
            data-state={state.open ? "open" : "closed"}
            style={styles}
          >
            <div className={tv.icon()}>{icon}</div>

            <div className={tv.text()}>{children}</div>
          </div>
        </div>
      </FloatingPortal>
    )
  },
)
