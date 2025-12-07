import { tcv } from "@choice-ui/shared"

export const skeletonTv = tcv({
  slots: {
    root: ["will-change-opacity", "animate-pulse"],
  },
  variants: {
    hasChildren: {
      true: {},
      false: {},
    },
    loading: {
      true: {
        root: ["skeleton"],
      },
      false: {},
    },
  },
})
