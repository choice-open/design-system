import { tcv } from "~/utils"

export const searchInputTv = tcv({
  slots: {
    icon: "",
    action: "",
  },
  variants: {
    variant: {
      default: {},
      dark: {},
      reset: {},
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      disabled: false,
      variant: "default",
      class: {
        icon: [
          "text-secondary-foreground",
          "group-hover/text-field:text-default-foreground",
          "group-focus-within/text-field:text-default-foreground",
        ],
      },
    },
    {
      disabled: true,
      variant: "default",
      class: {
        icon: "text-disabled-foreground",
      },
    },
    {
      disabled: false,
      variant: "dark",
      class: {
        icon: [
          "text-white/40",
          "group-hover/text-field:text-white",
          "group-focus-within/text-field:text-white",
        ],
        action: "text-white/40 hover:text-white",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    disabled: false,
  },
})
