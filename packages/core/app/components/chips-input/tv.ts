import { tv } from "tailwind-variants"

export const chipsInputTv = tv({
  slots: {
    root: [
      "flex flex-wrap min-w-0 max-w-full",
      "rounded-md bg-secondary-background",
      "border border-transparent border-solid",
    ],
    input: [
      "max-w-full flex-1",
      "leading-md tracking-md",
      "appearance-none cursor-default",
      "placeholder:text-secondary-foreground",
    ],
    nesting: ["px-1 flex items-center gap-2 flex-none"],
    chip: "",
    closeButton: "",
    text: "",
  },
  variants: {
    size: {
      default: {
        root: "min-h-4 p-1 gap-1",
        closeButton: "w-4 h-4",
      },
      large: {
        root: "min-h-6",
        closeButton: "w-6 h-6",
      },
    },
    disabled: {
      true: {
        root: "bg-transparent text-secondary-foreground border-default-boundary",
        input: "text-secondary-foreground",
      },
      false: {
        root: "focus-within:border-selected-boundary hover:not-focus-within:border-default-boundary",
      },
    },
    hasValue: {
      true: {},
      false: {
        input: "pl-1",
      },
    },
  },
  defaultVariants: {
    size: "default",
    disabled: false,
    hasValue: false,
  },
})

export const chipTv = tv({
  slots: {
    root: "pr-0 max-w-full",
    closeButton: "",
    text: "max-w-full truncate",
  },
})
