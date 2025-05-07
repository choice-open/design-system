import { tv } from "tailwind-variants"

export const searchInputTv = tv({
  slots: {
    container: [
      "group/search",
      "input-search bg-secondary-background rounded-md",
      "focus-within:before:border-selected-boundary",
    ],
    input: "[grid-area:input] pl-0",
    icon: [
      "[grid-area:icon] flex items-center justify-center text-secondary-foreground",
      "group-hover/search:text-default-foreground group-focus-within/search:text-default-foreground",
    ],
    action: "[grid-area:action]",
  },
  variants: {
    size: {
      default: {
        container: "h-6",
      },
      large: {
        container: "h-8",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
})
