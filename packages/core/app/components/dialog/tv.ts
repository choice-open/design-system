import { tv } from "tailwind-variants"

export const dragDialogTv = tv({
  slots: {
    overlay: "z-modals cursor-default overflow-hidden",
    dialog: "",
    resizeWidthHandle: "absolute top-0 -right-1 h-full w-2 cursor-ew-resize",
    resizeHeightHandle: "absolute -bottom-1 left-0 h-2 w-full cursor-ns-resize",
  },
  variants: {
    resizable: {
      true: {
        dialog: "resize-handle",
      },
    },
    overlay: {
      true: {},
      false: {
        overlay: "pointer-events-none",
        dialog: "pointer-events-auto",
      },
    },
  },
  defaultVariants: {
    resizable: false,
    overlay: true,
  },
})
