import { tv } from "tailwind-variants"

export const tabsTv = tv({
  slots: {
    root: [
      // Layout
      "flex gap-1",
      // Typography
      "select-none",
    ],
    tab: [
      // Layout
      "h-6 relative grid items-center gap-1",
      // Shape
      "rounded-md tracking-md leading-md",
      // Spacing
      "px-2 border border-solid border-transparent",
      // Typography
      "cursor-default",
      // Focus
      "focus-visible:border-selected-boundary",
    ],
    label: [
      // Layout
      "row-start-1 col-start-1",
      // Typography
      "tracking-md",
      // Visibility
      "aria-hidden:font-strong aria-hidden:invisible",
    ],
  },
  variants: {
    active: {
      true: {
        tab: "bg-secondary-background font-strong text-default-foreground",
      },
      false: {
        tab: "text-secondary-foreground",
      },
    },
    disabled: {
      true: {
        tab: "text-secondary-foreground",
      },
      false: {
        tab: "hover:bg-secondary-background hover:text-default-foreground",
      },
    },
  },
  defaultVariants: {
    active: false,
    disabled: false,
  },
})
