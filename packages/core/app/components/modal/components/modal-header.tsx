import { Remove } from "@choiceform/icons-react"
import { forwardRef, HTMLProps, isValidElement, ReactNode, useMemo } from "react"
import { tcx } from "~/utils"
import { IconButton } from "../../icon-button"
import { ModalHeaderTv } from "../tv"

export interface ModalHeaderProps extends Omit<HTMLProps<HTMLDivElement>, "title"> {
  title?: ReactNode
  onClose?: () => void
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>((props, ref) => {
  const { className, children, title, onClose, ...rest } = props

  const validElement = useMemo(() => {
    return isValidElement(title)
  }, [title])

  const styles = ModalHeaderTv({ validElement })

  return (
    <div
      ref={ref}
      className={tcx(styles.root(), className)}
      {...rest}
    >
      {title && <div className={styles.title()}>{title}</div>}

      {children}

      {onClose && (
        <div className={styles.close()}>
          <IconButton onClick={onClose}>
            <Remove />
          </IconButton>
        </div>
      )}
    </div>
  )
})

ModalHeader.displayName = "ModalHeader"
