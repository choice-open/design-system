import { tv } from "tailwind-variants"

export const switchTv = tv({
  slots: {
    root: [
      // Layout
      "flex items-center gap-2",
      // Typography
      "select-none",
    ],
    track: [
      // Layout
      "relative",
      // Shape
      "rounded-full",
      // Border
      "border border-solid",
      // Size
      "w-(--switch-width) h-(--switch-height)",
      // Transition
      "transition-colors",
    ],
    thumb: [
      // Layout
      "absolute",
      // Shape
      "rounded-full",
      // Size
      "w-(--thumb-size) h-(--thumb-size)",
      // Position
      "top-(--thumb-margin) left-(--thumb-margin)",
      // Focus
      "peer-focus-visible:ring-1 peer-focus-visible:ring-accent/50",
    ],
    input: [
      "peer appearance-none pointer-events-auto",
      "absolute inset-0 opacity-0 cursor-default",
    ],
  },
  variants: {
    size: {
      small: {},
      medium: {},
    },
    variant: {
      default: {
        track: "border-transparent",
      },
      accent: {
        track: "border-transparent",
      },
      outline: {
        track: "border-default-boundary bg-transparent",
      },
    },
    checked: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        root: "text-secondary-foreground",
        track: "bg-secondary-background border-transparent",
        thumb: "bg-white",
      },
      false: {
        root: "text-default-foreground",
      },
    },
  },
  compoundVariants: [
    // 未选中状态
    {
      checked: false,
      disabled: false,
      variant: ["default", "accent"],
      class: {
        track: "bg-secondary-background",
        thumb: "shadow-small bg-white",
      },
    },
    // 选中状态 - default
    {
      variant: "default",
      checked: true,
      disabled: false,
      class: {
        track: "bg-default-foreground",
        thumb: "shadow-small bg-white",
      },
    },
    // 选中状态 - accent
    {
      variant: "accent",
      checked: true,
      disabled: false,
      class: {
        track: "bg-accent-background",
        thumb: "shadow-small bg-white",
      },
    },
    // 选中状态 - outline
    {
      variant: "outline",
      checked: true,
      disabled: false,
      class: {
        track: "border-default-boundary-foreground bg-transparent",
        thumb: "bg-default-foreground shadow-none",
      },
    },
    // 未选中状态 - outline
    {
      variant: "outline",
      checked: false,
      disabled: false,
      class: {
        track: "border-default-boundary bg-transparent",
        thumb: "bg-secondary-background shadow-none",
      },
    },
    // hover 状态 - default & accent
    {
      variant: ["default", "accent"],
      checked: false,
      disabled: false,
      class: {
        track: "hover:bg-secondary-activ-background",
      },
    },
    // hover 状态 - outline
    {
      variant: "outline",
      checked: false,
      disabled: false,
      class: {
        track: "hover:border-secondary-activ-background",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "default",
    checked: false,
    disabled: false,
  },
})
