import { InfoCircle } from "@choiceform/icons-react"
import { createContext, ReactNode, useContext } from "react"
import { InfoContent } from "./components/info-content"
import { InfoTrigger } from "./components/info-trigger"
import { useInfo } from "./hooks/use-info"

type InfoPlacement = "left-start" | "right-start"

const InfoContext = createContext<ReturnType<typeof useInfo> | null>(null)

const PORTAL_ROOT_ID = "floating-tooltip-root"

export function useInfoState() {
  const context = useContext(InfoContext)
  if (context == null) {
    throw new Error("Info components must be wrapped in <Info />")
  }
  return context
}

interface InfoProps {
  children?: ReactNode
  className?: string
  content: ReactNode
  disabled?: boolean
  icon?: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: InfoPlacement
  portalId?: string
}

export function Info({
  children,
  content,
  disabled = false,
  onOpenChange,
  open,
  placement = "right-start",
  className,
  icon = <InfoCircle />,
  portalId = PORTAL_ROOT_ID,
}: InfoProps) {
  const info = useInfo({
    disabled,
    onOpenChange,
    open,
    placement,
  })

  return (
    <InfoContext.Provider value={info}>
      <InfoTrigger
        className={className}
        icon={icon}
      >
        {children}
      </InfoTrigger>
      <InfoContent
        icon={icon}
        portalId={portalId}
      >
        {content}
      </InfoContent>
    </InfoContext.Provider>
  )
}
