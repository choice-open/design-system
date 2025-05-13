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
      "relative grid h-6 items-center gap-1",
      // Shape
      "tracking-md leading-md rounded-md",
      // Spacing
      "border border-solid border-transparent px-2",
      // Typography
      "cursor-default",
      // Focus
      "focus-visible:border-selected-boundary",
    ],
    label: [
      // Layout
      "col-start-1 row-start-1",
      // Typography
      "tracking-md",
      // Visibility
      "aria-hidden:invisible aria-hidden:font-medium",
    ],
  },
  variants: {
    active: {
      true: {
        tab: "bg-secondary-background text-default-foreground font-medium",
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
