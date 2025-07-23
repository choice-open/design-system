import { forwardRef, memo, useId } from "react"
import { Label, Textarea, TextareaProps } from "~/components"
import { tcx } from "~/utils"

interface ModalTextareaProps extends Omit<TextareaProps, "children" | "label"> {
  description?: string
  label?: React.ReactNode
}

export const ModalTextarea = memo(
  forwardRef<HTMLTextAreaElement, ModalTextareaProps>((props, ref) => {
    const { className, label, description, ...rest } = props
    const id = useId()

    return (
      <fieldset className={tcx("flex w-full min-w-0 flex-col gap-2", className)}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <Textarea
          id={id}
          ref={ref}
          {...rest}
        />
        {description && <p className="text-secondary-foreground">{description}</p>}
      </fieldset>
    )
  }),
)

ModalTextarea.displayName = "ModalTextarea"
