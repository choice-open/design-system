import { tcv } from "@choice-ui/shared"

export const menubarTv = tcv({
  slots: {
    root: ["flex", "gap-1"],
  },
  variants: {
    disabled: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const MenubarTriggerTv = tcv({
  slots: {
    root: "justify-start text-left",
    icon: "flex size-6 flex-none items-center justify-center",
  },
  variants: {
    hasPrefix: {
      false: {},
      true: { root: "gap-0" },
    },
    hasSuffix: {
      false: {},
      true: { root: "gap-0" },
    },

    size: {
      default: {},
      large: {},
    },
  },
  compoundVariants: [
    {
      size: "default",
      hasPrefix: true,
      class: { root: "pl-0" },
    },
    {
      size: "large",
      hasPrefix: true,
      class: { root: "pl-1" },
    },
    {
      size: "default",
      hasSuffix: true,
      class: { root: "pr-0" },
    },
    {
      size: "large",
      hasSuffix: true,
      class: { root: "pr-0" },
    },
  ],
  defaultVariants: {
    hasPrefix: false,
    hasSuffix: false,
    size: "default",
  },
})

export const MenubarDividerTv = tcv({
  slots: {
    root: "mx-1 h-4 w-px shrink-0 self-center bg-default-boundary",
  },
})
