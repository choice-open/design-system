import { tv } from "tailwind-variants"

export const FormTv = tv({
  slots: {
    field: ["flex min-w-0 flex-col gap-2"],
    error: [
      "leading-md tracking-md",
      "px-0.5",
      "break-words whitespace-pre-wrap",
      "text-danger-foreground",
    ],
    description: [
      "leading-md tracking-md",
      "px-0.5",
      "break-words whitespace-pre-wrap",
      "text-secondary-foreground",
    ],
  },
})
