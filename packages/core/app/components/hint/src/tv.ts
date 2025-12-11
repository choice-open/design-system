import { tcv } from "@choice-ui/shared"

export const hintVariants = tcv({
  slots: {
    content: ["rounded-md", "flex", "leading-md shadow-md", "max-w-xs"],
    text: "my-1",
    trigger: [
      "inline-flex items-center justify-center",
      "h-6 w-6",
      "rounded-full",
      "text-default-foreground",
    ],
    icon: ["h-6 w-6", "flex shrink-0 items-center justify-center"],
  },
  variants: {
    variant: {
      default: {
        content: "bg-default-background text-default-foreground",
      },
      dark: {
        content: "bg-menu-background text-white",
      },
      accent: {
        content: "bg-accent-background text-on-accent-foreground",
      },
    },
    placement: {
      "left-start": {
        content: "flex-row-reverse pl-2",
      },
      "right-start": {
        content: "flex-row pr-2",
      },
      "left-end": {
        content: "flex-row-reverse pl-2",
        icon: "self-end",
      },
      "right-end": {
        content: "flex-row pr-2",
        icon: "self-end",
      },
    },
    disabled: {
      true: {
        trigger: "text-disabled-foreground",
      },
    },
  },
  defaultVariants: {
    disabled: false,
    placement: "right-start",
    variant: "default",
  },
})
