import { tcv } from "@choice-ui/shared"

export const SeparatorTV = tcv({
  slots: {
    root: "shrink-0",
  },
  variants: {
    orientation: {
      horizontal: { root: "h-px w-full" },
      vertical: { root: "h-full w-px" },
    },
    variant: {
      default: { root: "bg-default-boundary" },
      light: { root: "bg-gray-200" },
      dark: { root: "bg-gray-800" },
      reset: { root: "" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
  },
})
