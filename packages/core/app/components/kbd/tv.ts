import { tv } from "tailwind-variants"

export const kbdTv = tv({
  slots: {
    base: "inline-flex items-center gap-0.25 text-center font-sans font-normal",
    abbr: "no-underline",
  },
})
