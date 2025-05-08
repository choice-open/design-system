import { forwardRef, HTMLProps, ReactNode } from "react"
import { tcx } from "~/utils"
import {
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalMultiLineInput,
  ModalSelect,
} from "./components"
import { ModalTv } from "./tv"

interface ModalProps extends Omit<HTMLProps<HTMLDivElement>, "title"> {
  className?: string
  title?: ReactNode
  onClose?: () => void
}

interface ModalComponent
  extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof ModalHeader
  Content: typeof ModalContent
  Footer: typeof ModalFooter
  MultiLineInput: typeof ModalMultiLineInput
  Select: typeof ModalSelect
}

const ModalBase = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const { className, title, onClose, ...rest } = props
  const styles = ModalTv()

  return (
    <div
      ref={ref}
      className={tcx(styles.root(), className)}
      {...rest}
    />
  )
})

ModalBase.displayName = "Modal"

const Modal = ModalBase as ModalComponent
Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter
Modal.MultiLineInput = ModalMultiLineInput
Modal.Select = ModalSelect
export { Modal }
