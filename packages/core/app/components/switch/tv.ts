import { tcv } from "~/utils"

export const switchTv = tcv({
  slots: {
    root: ["relative flex items-center gap-2", "select-none"],
    track: [
      "relative",
      "rounded-full",
      "border border-solid border-transparent",
      "h-(--switch-height) w-(--switch-width)",
      "transition-colors",
    ],
    thumb: [
      "absolute",
      "rounded-full",
      "h-(--thumb-size) w-(--thumb-size)",
      "top-(--thumb-margin) left-(--thumb-margin)",
    ],
    input: [
      "peer pointer-events-auto appearance-none",
      "absolute inset-0 cursor-default opacity-0",
    ],
  },
  variants: {
    size: {
      small: {},
      medium: {},
    },
    variant: {
      default: {},
      accent: {},
      outline: {},
    },
    checked: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        root: "text-secondary-foreground",
        track: "bg-disabled-background border-transparent",
        thumb: "bg-white",
      },
      false: {
        root: "text-default-foreground",
      },
    },
    focused: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    // 未选中状态
    {
      checked: false,
      disabled: false,
      variant: ["default", "accent"],
      class: {
        track: "bg-tertiary-background",
        thumb: "shadow-small bg-white",
      },
    },
    // 选中状态 - default
    {
      variant: ["default", "outline"],
      checked: true,
      disabled: false,
      class: {
        track: "bg-default-foreground",
        thumb: "shadow-small bg-default-background",
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
    // 未选中状态 - outline
    {
      variant: "outline",
      checked: false,
      disabled: false,
      class: {
        track: "border-default-foreground bg-transparent",
        thumb: "bg-default-foreground shadow-none",
      },
    },
    // hover 状态 - default & accent
    {
      variant: ["default", "accent"],
      checked: false,
      disabled: false,
      class: {
        track: "hover:bg-tertiary-background",
      },
    },
    // hover 状态 - outline
    {
      variant: "outline",
      checked: false,
      disabled: false,
      class: {
        track: "hover:bg-secondary-background",
      },
    },
    {
      focused: true,
      checked: false,
      disabled: false,
      variant: ["default", "accent", "outline"],
      class: {
        track: "border-selected-boundary",
        thumb: "shadow-none",
      },
    },
    {
      focused: true,
      checked: true,
      disabled: false,
      variant: ["default", "outline"],
      class: {
        track: "border-selected-boundary shadow-switch-focused",
        thumb: "shadow-border-white",
      },
    },
    {
      focused: true,
      checked: true,
      disabled: false,
      variant: "accent",
      class: {
        track: "border-selected-boundary shadow-checked-focused",
        thumb: "shadow-border-white",
      },
    },
    {
      focused: false,
      checked: false,
      disabled: false,
      variant: ["default", "accent", "outline"],
      class: {
        track: "peer-focus-visible:border-selected-boundary",
        thumb: "peer-focus-visible:shadow-border-white",
      },
    },
    {
      focused: false,
      checked: true,
      disabled: false,
      variant: ["default", "outline"],
      class: {
        track: [
          "peer-focus-visible:border-selected-boundary",
          "peer-focus-visible:shadow-switch-focused",
        ],
        thumb: "peer-focus-visible:shadow-border-white",
      },
    },
    {
      focused: true,
      checked: true,
      disabled: false,
      variant: "accent",
      class: {
        track: [
          "peer-focus-visible:border-selected-boundary",
          "peer-focus-visible:shadow-checked-focused",
        ],
        thumb: "peer-focus-visible:shadow-border-white",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "default",
    checked: false,
    disabled: false,
    focused: false,
  },
})
