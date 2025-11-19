import { memo, useMemo } from "react"
import { tcx } from "~/utils"
import { toolbarTv } from "./tv"
import { ToolbarButton } from "./toolbar-button"
import { TOOLBAR_ACTIONS } from "./toolbar-actions"
import { useEventCallback } from "usehooks-ts"

interface ToolbarProps {
  className?: string
  disabled?: boolean
  onAction: (action: string) => void
  visible?: boolean
  visibleActions?: string[]
}

export const Toolbar = memo(function Toolbar({
  onAction,
  disabled,
  className,
  visible = true,
  visibleActions,
}: ToolbarProps) {
  const tv = toolbarTv({ visible })

  const handleAction = useEventCallback((action?: string) => {
    if (!action || disabled) return
    onAction(action)
  })

  const filteredActions = useMemo(() => {
    if (!visibleActions) {
      return TOOLBAR_ACTIONS
    }

    const visibleSet = new Set(visibleActions)
    const filtered: typeof TOOLBAR_ACTIONS = []

    for (let i = 0; i < TOOLBAR_ACTIONS.length; i++) {
      const action = TOOLBAR_ACTIONS[i]

      if (action.divider) {
        const hasVisibleBefore = filtered.length > 0
        const hasVisibleAfter = TOOLBAR_ACTIONS.slice(i + 1).some(
          (a) => !a.divider && visibleSet.has(a.id),
        )

        if (hasVisibleBefore && hasVisibleAfter) {
          filtered.push(action)
        }
      } else if (visibleSet.has(action.id)) {
        filtered.push(action)
      }
    }

    return filtered
  }, [visibleActions])

  return (
    <div className={tcx(tv.root(), className)}>
      {filteredActions.map((action) =>
        action.divider ? (
          <div
            key={action.id}
            className={tcx(tv.divider())}
          />
        ) : (
          <ToolbarButton
            key={action.id}
            label={action.label}
            icon={action.icon}
            onClick={() => handleAction(action.id)}
            disabled={disabled}
          />
        ),
      )}
    </div>
  )
})
