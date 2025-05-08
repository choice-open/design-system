import { tv } from "tailwind-variants"

export const TextareaTv = tv({
  base: [
    "min-w-0 rounded-md",
    "leading-md tracking-md text-md",
    "px-1.75 py-1",
    "cursor-default appearance-none",
  ],
  variants: {
    variant: {
      default: ["bg-secondary-background", "placeholder:text-secondary-foreground"],
      dark: ["bg-gray-700 text-white", "placeholder:text-white/40"],
      reset: "",
    },
    selected: {
      true: "",
      false: "",
    },
    disabled: {
      true: "",
      false: "",
    },
    readOnly: {
      true: "",
      false: "",
    },
    resizeHandle: {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    },
  },
  compoundVariants: [
    {
      variant: ["default", "dark"],
      class: "border border-solid border-transparent",
    },
    {
      variant: "default",
      selected: true,
      disabled: false,
      class: [
        "bg-default-background",
        "not-focus-within:border-selected-boundary/50",
        "focus-within:border-selected-boundary",
      ],
    },
    {
      variant: "default",
      selected: false,
      disabled: false,
      class: "hover:not-focus-within:border-default-boundary",
    },
    {
      variant: "dark",
      selected: false,
      disabled: false,
      class: ["hover:not-focus-within:border-gray-600"],
    },
    {
      variant: ["dark", "default"],
      selected: false,
      disabled: false,
      class: "focus-within:border-selected-boundary",
    },
    {
      variant: "default",
      disabled: true,
      class: "text-secondary-foreground border-secondary-background bg-secondary-background",
    },
    {
      variant: "dark",
      disabled: true,
      class: "bg-gray-700 text-white/40",
    },
  ],
  defaultVariants: {
    variant: "default",
    disabled: false,
    resizeHandle: "none",
    selected: false,
    readOnly: false,
  },
})
