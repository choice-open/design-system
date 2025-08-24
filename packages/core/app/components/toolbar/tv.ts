import { tcv } from "~/utils"

export const ToolbarTv = tcv({
  slots: {
    root: "bg-default-background pointer-events-auto flex items-center gap-2 rounded-xl px-3 shadow-lg",
  },
  variants: {
    size: {
      small: {
        root: "h-10",
      },
      default: {
        root: "h-12",
      },
    },
  },
})
