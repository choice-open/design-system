import { tv } from "tailwind-variants"

export const insertMentionsButtonTv = tv({
  slots: {
    button: [
      "transition-colors",
      "hover:bg-accent/10",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
    ],
    icon: ["h-4 w-4", "text-muted-foreground", "transition-colors", "group-hover:text-foreground"],
  },
  variants: {
    disabled: {
      true: {
        button: "cursor-not-allowed opacity-50",
        icon: "text-muted-foreground/50",
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
})
