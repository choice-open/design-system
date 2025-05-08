import { tv } from "tailwind-variants"
import css from "../styles.module.css"

export const CommentItemTv = tv({
  slots: {
    root: `${css["comment-item"]} group/comment-item px-4 py-1 text-lg items-center`,
    avatar: "mr-3 flex-shrink-0 [grid-area:avatar]",
    meta: "flex gap-1 leading-5 cursor-default select-none [grid-area:meta]",
    name: "font-medium tracking-lg",
    date: "text-secondary-foreground",
    actionMenu: "[grid-area:action]",
    content: "flex flex-col [grid-area:content]",
  },
})

export const CommentItemReactionsTv = tv({
  slots: {
    reactionMenu: "[grid-area:reaction]",
    reactions: "[grid-area:reactions] gap-2 mt-2 text-xl flex items-center flex-wrap",
    reactionTooltip: "flex flex-col items-center gap-2 py-1",
    reactionEmoji: "flex size-6 items-center justify-center rounded-md bg-white text-xl",
    reactionUsers: "flex flex-col text-center",
    reactionUser: "text-md whitespace-nowrap",
    reactionButton: [
      "h-8 px-2 gap-1 flex items-center justify-center rounded-md",
      "border border-selected-boundary",
      "hover:bg-selected hover:text-on-accent-foreground",
    ],
    reactionCount: "text-md",
  },
  variants: {
    position: {
      top: {
        reactionMenu: "self-start",
      },
      bottom: {
        reactionMenu: "self-center",
      },
    },
    reactionsPopoverIsOpen: {
      true: {
        reactionMenu: "visible",
      },
      false: {
        reactionMenu: "group-hover/comment-item:visible invisible",
      },
    },
  },
  defaultVariants: {
    position: "top",
    reactionsPopoverIsOpen: false,
  },
})
