import { tcv } from "~/utils"

export const segmentedControlTv = tcv({
  slots: {
    root: [
      // Layout
      "grid overflow-hidden",
      // Shape
      "text-body-medium rounded-md",
    ],
    option: [
      // Layout
      "relative flex h-6 min-w-6 flex-1",
      // Alignment
      "items-center justify-center gap-1",
      // Border
      "border border-solid",
      // Typography
      "text-body-medium",
      // Focus
      "peer-focus-visible:border-selected-boundary",
    ],
    input: "peer pointer-events-auto absolute inset-0 appearance-none opacity-0",
  },
  variants: {
    active: {
      true: {
        option: "rounded-md",
      },
      false: {
        option: "border-transparent",
      },
    },
    variant: {
      default: {
        root: "bg-secondary-background",
      },
      dark: {
        root: "bg-gray-700",
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      active: true,
      variant: "default",
      class: {
        option: "border-default-boundary bg-default-background",
      },
    },
    {
      active: false,
      variant: "default",
      disabled: false,
      class: {
        option: "text-secondary-foreground",
      },
    },
    {
      active: true,
      variant: "default",
      disabled: false,
      class: {
        option: "text-default-foreground",
      },
    },
    {
      disabled: true,
      active: false,
      variant: "default",
      class: {
        option: "text-disabled-foreground",
      },
    },
    {
      disabled: true,
      active: true,
      variant: "default",
      class: {
        option: "text-secondary-foreground",
      },
    },
    // Dark variant
    {
      active: true,
      variant: "dark",
      class: {
        option: "border-gray-600 bg-gray-800",
      },
    },
    {
      active: false,
      variant: "dark",
      disabled: false,
      class: {
        option: "text-gray-400",
      },
    },
    {
      active: true,
      variant: "dark",
      disabled: false,
      class: {
        option: "text-white",
      },
    },
    {
      disabled: true,
      active: false,
      variant: "dark",
      class: {
        option: "text-gray-500",
      },
    },
    {
      disabled: true,
      active: true,
      variant: "dark",
      class: {
        option: "text-gray-400",
      },
    },
  ],
  defaultVariants: {
    active: false,
    disabled: false,
    variant: "default",
  },
})
