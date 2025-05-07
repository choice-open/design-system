import { tv } from "tailwind-variants"
import css from "./styles.module.css"

export const CommentsTv = tv({
  slots: {
    root: "",
    inputRoot: "grid gap-2",
    inputAvatar: "flex h-10 items-center justify-center",
    itemsRoot: "group relative mt-2",
  },
  variants: {
    isEmpty: {
      true: {
        root: "p-0",
      },
      false: {
        inputRoot: `${css["comments-input"]} p-4`,
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {
    isEmpty: false,
  },
})
