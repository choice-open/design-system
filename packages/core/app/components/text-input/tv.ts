import { tv } from "tailwind-variants"

export const inputTv = tv({
  slots: {
    input: [
      "min-w-0 rounded-md",
      "leading-md tracking-md",
      "px-2",
      "appearance-none cursor-default",
      "placeholder:text-secondary",
    ],
  },
  variants: {
    variant: {
      default: {
        input: "bg-secondary-background border border-transparent border-solid",
      },
      transparent: {
        input: "bg-transparent border-transparent",
      },
      menu: {
        input: "border border-transparent bg-gray-700 hover:bg-gray-800",
      },
    },
    selected: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        input: "bg-transparent text-secondary-foreground border-light-100",
      },
      false: "",
    },
    size: {
      default: {
        input: "h-6",
      },
      large: {
        input: "h-8",
      },
    },
  },
  compoundVariants: [
    {
      variant: "default",
      selected: true,
      class: {
        input: "not-focus-within:border-accent/50 focus-within:border-accent bg-body",
      },
    },
    {
      variant: "default",
      selected: false,
      class: {
        input: " hover:not-focus-within:border-light-200",
      },
    },
    {
      variant: ["menu", "default"],
      selected: false,
      class: {
        input: "focus-within:border-accent",
      },
    },
  ],

  defaultVariants: {
    variant: "default",
    selected: false,
    disabled: false,
  },
})
