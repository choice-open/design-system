import { tv } from "tailwind-variants"

export const textareaTv = tv({
  base: [
    "min-w-0",
    "leading-md tracking-md",
    "px-1.75 py-1",
    "appearance-none cursor-default",
    "placeholder:text-secondary-foreground",
  ],
  variants: {
    variant: {
      default: [
        "rounded-md bg-secondary-background",
        "border border-transparent border-solid",
        "focus-within:border-selected-boundary hover:not-focus-within:border-default-boundary",
      ],
      transparent: "bg-transparent border-transparent",
    },
    disabled: {
      true: "bg-transparent text-secondary-foreground border-default-boundary",
      false: "",
    },
    size: {
      default: "min-h-6",
      large: "min-h-8",
    },
    resizeHandle: {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    },
  },

  defaultVariants: {
    variant: "default",
    disabled: false,
    size: "default",
    resizeHandle: "none",
  },
})
