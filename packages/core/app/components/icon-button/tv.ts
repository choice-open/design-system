import { tv } from "tailwind-variants"

export const iconButtonTv = tv({
  slots: {
    button: [
      "text-default-foreground",
      "flex-none",
      "rounded-md border border-solid border-transparent",
      "flex items-center justify-center",
      "cursor-default",
      "focus-visible:border-selected-boundary",
    ],
  },
  variants: {
    size: {
      default: { button: "h-6 w-6" },
      large: { button: "h-8 w-8" },
      reset: "",
    },
    variant: {
      default: {},
      secondary: { button: "bg-default-background border-default-boundary" },
      solid: { button: "bg-secondary-background text-default-foreground" },
      highlight: {},
      ghost: {},
      reset: {},
    },
    active: {
      true: {},
      false: {},
    },
    disabled: {
      true: { button: "text-secondary-foreground" },
      false: {},
    },
    focused: {
      true: { button: "border-selected-boundary" },
      false: {},
    },
    loading: {
      true: { button: "text-secondary-foreground pointer-events-none" },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: ["default", "highlight"],
      active: false,
      disabled: false,
      class: { button: "hover:bg-secondary-background active:bg-secondary-activ-background" },
    },
    {
      variant: "default",
      active: true,
      disabled: false,
      class: { button: "bg-secondary-activ-background" },
    },
    {
      variant: "secondary",
      active: false,
      disabled: false,
      class: { button: "hover:bg-secondary-background active:bg-secondary-activ-background" },
    },
    {
      variant: "secondary",
      active: true,
      disabled: false,
      class: { button: "bg-secondary-background" },
    },
    {
      variant: "solid",
      active: false,
      disabled: false,
      class: { button: "hover:bg-secondary-activ-background active:bg-secondary-activ-background" },
    },
    {
      variant: "solid",
      active: true,
      disabled: false,
      class: { button: "bg-secondary-activ-background" },
    },
    {
      variant: "highlight",
      active: true,
      disabled: false,
      class: { button: "bg-accent-background/10 text-accent-background" },
    },
    {
      variant: "ghost",
      active: false,
      disabled: false,
      class: {
        button:
          "text-default-foreground/50 hover:text-default-foreground active:text-default-foreground",
      },
    },
    {
      variant: "ghost",
      active: true,
      disabled: false,
      class: { button: "text-default-foreground" },
    },
  ],
  defaultVariants: {
    size: "default",
    variant: "default",
    active: false,
    disabled: false,
  },
})

export const iconButtonGroupTv = tv({
  slots: {
    container: "grid gap-x-px grid-cols-(--columns)",
    button: ["flex-1", "first:rounded-l-md last:rounded-r-md rounded-none", "min-w-6 w-full"],
  },
})
