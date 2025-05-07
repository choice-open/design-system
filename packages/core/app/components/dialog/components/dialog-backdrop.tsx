import { motion } from "framer-motion"
import { forwardRef, memo } from "react"
import { tcx } from "~/utils"

interface DialogBackdropProps {
  className?: string
  initial?: Record<string, any>
  animate?: Record<string, any>
  transition?: Record<string, any>
}

export const DialogBackdrop = memo(
  forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
    const {
      className,
      initial = { opacity: 0 },
      animate = { opacity: 1 },
      transition = { duration: 0.2 },
      ...rest
    } = props

    return (
      <motion.div
        ref={ref}
        className={tcx("fixed inset-0 bg-black/20", className)}
        aria-hidden="true"
        initial={initial}
        animate={animate}
        transition={transition}
        {...rest}
      />
    )
  }),
)

DialogBackdrop.displayName = "DialogBackdrop"
