import { tcv } from "@choice-ui/shared"

export const toggleButtonTv = tcv({
  slots: {
    root: ["relative rounded-md"],
    input: ["absolute inset-0 h-full w-full", "peer pointer-events-auto appearance-none opacity-0"],
    label: [
      "absolute inset-0 flex h-full w-full rounded-[inherit]",
      "items-center justify-center select-none",
      "border border-solid border-transparent",
      "peer-focus-visible:border-selected-boundary",
    ],
  },
  variants: {
    variant: {
      default: {},
      secondary: {},
      highlight: {},
      reset: {},
    },
    size: {
      default: { root: "h-6 w-6" },
      large: { root: "h-8 w-8" },
    },
    checked: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        root: "text-secondary-foreground",
      },
      false: {},
    },
    active: {
      true: {},
      false: {},
    },
    focused: {
      true: { label: "border-selected-boundary" },
      false: {},
    },
    event: {
      click: {},
      mousedown: {},
    },
  },
  compoundVariants: [
    {
      variant: ["default", "highlight"],
      active: false,
      disabled: false,
      class: {
        root: "hover:bg-secondary-background",
      },
    },
    {
      variant: "default",
      active: false,
      event: "click",
      disabled: false,
      class: {
        root: "active:bg-tertiary-background",
      },
    },
    {
      variant: ["highlight", "secondary"],
      active: false,
      checked: false,
      disabled: false,
      event: "click",
      class: {
        root: "active:bg-tertiary-background",
      },
    },
    {
      variant: ["highlight", "secondary"],
      active: false,
      checked: true,
      disabled: false,
      event: "click",
      class: {
        root: "active:bg-accent-background/10",
      },
    },
    {
      variant: ["default", "highlight"],
      active: true,
      disabled: false,
      class: {
        root: "bg-tertiary-background",
      },
    },
    {
      variant: "secondary",
      checked: false,
      focused: false,
      disabled: false,
      class: {
        label: "border-default-boundary hover:bg-secondary-background",
      },
    },
    {
      variant: "secondary",
      active: true,
      disabled: false,
      checked: false,
      class: {
        root: "bg-secondary-background",
      },
    },
    {
      variant: ["highlight", "secondary"],
      active: true,
      disabled: false,
      checked: true,
      class: {
        root: "bg-accent-background/10 text-accent-foreground",
      },
    },
    {
      variant: ["highlight", "secondary"],
      checked: true,
      disabled: false,
      active: false,
      class: {
        root: "bg-accent-background/10 text-accent-foreground hover:bg-accent-background/5",
      },
    },
    {
      variant: ["highlight", "secondary"],
      checked: true,
      disabled: true,
      class: {
        root: "bg-tertiary-background",
      },
    },
  ],
  defaultVariants: {
    checked: false,
    disabled: false,
    variant: "default",
    size: "default",
    event: "click",
    active: false,
    focused: false,
  },
})

export const toggleGroupTv = tcv({
  slots: {
    root: ["flex gap-1"],
  },
  variants: {
    orientation: {
      horizontal: {
        root: "flex-row",
      },
      vertical: {
        root: "flex-col",
      },
    },
    disabled: {
      true: {
        root: "opacity-50 pointer-events-none",
      },
      false: {},
    },
    multiple: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    disabled: false,
    multiple: false,
  },
})
