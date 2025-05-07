import { tv } from "tailwind-variants"

export const NestingTextInputTV = tv({
  slots: {
    root: [
      "h-8",
      "flex items-center",
      "rounded-md bg-secondary-background",
      "border border-transparent border-solid",
    ],
    input: [
      "min-w-0 flex-1",
      "leading-md tracking-md",
      "pl-2",
      "appearance-none cursor-default",
      "placeholder:text-secondary-foreground",
    ],
    nesting: ["px-1 flex items-center gap-2 flex-none"],
  },
  variants: {
    disabled: {
      true: {
        root: "bg-transparent text-secondary-foreground border-default-boundary",
        input: "text-secondary-foreground",
      },
      false: {
        root: "focus-within:border-selected-boundary hover:not-focus-within:border-default-boundary",
      },
    },
    focused: {
      true: {
        root: "border-selected-boundary",
      },
      false: "",
    },
  },
  defaultVariants: {
    disabled: false,
    focused: false,
  },
})
