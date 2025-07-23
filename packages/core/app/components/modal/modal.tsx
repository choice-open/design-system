import { forwardRef, HTMLProps, ReactNode } from "react"
import { tcx } from "~/utils"
import {
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalMultiLineInput,
  ModalSelect,
  ModalTextarea,
} from "./components"
import { ModalTv } from "./tv"

interface ModalProps extends Omit<HTMLProps<HTMLDivElement>, "title"> {
  className?: string
  onClose?: () => void
  title?: ReactNode
}

interface ModalComponent
  extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
  Backdrop: typeof ModalBackdrop
  Content: typeof ModalContent
  Footer: typeof ModalFooter
  Header: typeof ModalHeader
  Input: typeof ModalInput
  MultiLineInput: typeof ModalMultiLineInput
  Select: typeof ModalSelect
  Textarea: typeof ModalTextarea
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
Modal.Input = ModalInput
Modal.MultiLineInput = ModalMultiLineInput
Modal.Select = ModalSelect
Modal.Textarea = ModalTextarea
Modal.Backdrop = ModalBackdrop
export { Modal }
