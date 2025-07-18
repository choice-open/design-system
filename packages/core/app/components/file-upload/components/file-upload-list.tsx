import { forwardRef, ComponentPropsWithoutRef } from "react"
import { Slot } from "../../slot"
import { tcx } from "~/utils"
import { useFileUploadContext, useStore } from "../hooks"
import { fileUploadStyles } from "../tv"
import { LIST_NAME } from "../constants"

export interface FileUploadListProps extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean
  forceMount?: boolean
  orientation?: "horizontal" | "vertical"
}

export const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>((props, forwardedRef) => {
  const { className, orientation = "vertical", asChild, forceMount, ...listProps } = props

  const context = useFileUploadContext(LIST_NAME)
  const filesCount = useStore((state) => state.files.size)
  const shouldRender = forceMount || filesCount > 0

  const { list } = fileUploadStyles({ orientation })

  if (!shouldRender) return null

  const ListPrimitive = asChild ? Slot : "div"

  return (
    <ListPrimitive
      role="list"
      id={context.listId}
      aria-orientation={orientation}
      data-orientation={orientation}
      data-slot="file-upload-list"
      data-state={shouldRender ? "active" : "inactive"}
      dir={context.dir}
      {...listProps}
      ref={forwardedRef}
      className={tcx(list(), className)}
    />
  )
})

FileUploadList.displayName = LIST_NAME