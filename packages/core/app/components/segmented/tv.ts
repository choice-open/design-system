import { tv } from "tailwind-variants"

export const segmentedControlTv = tv({
  slots: {
    root: [
      // Layout
      "grid overflow-hidden",
      // Shape
      "rounded-md leading-md tracking-md",
      // Style
      "bg-secondary-background",
    ],
    option: [
      // Layout
      "h-6 min-w-6 relative flex flex-1",
      // Alignment
      "items-center justify-center gap-1",
      // Border
      "border border-solid",
      // Typography
      "tracking-md leading-md",
      // Focus
      "peer-focus-visible:border-selected-boundary",
    ],
    input: "absolute inset-0 appearance-none opacity-0 pointer-events-auto peer",
  },
  variants: {
    active: {
      true: {
        option: "rounded-md border-default-boundary bg-default-background",
      },
      false: {
        option: "border-transparent",
      },
    },
    disabled: {
      true: {
        option: "text-secondary-foreground",
      },
      false: {
        option: [
          "text-default-foreground/70 hover:text-default-foreground",
          "active:text-default-foreground active:bg-default-background active:border-default-boundary",
        ],
      },
    },
  },
  compoundVariants: [
    {
      active: true,
      disabled: true,
      class: {
        option: "text-secondary-foreground",
      },
    },
    {
      active: true,
      disabled: false,
      class: {
        option: "text-default-foreground",
      },
    },
  ],
  defaultVariants: {
    active: false,
    disabled: false,
  },
})
