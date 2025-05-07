import { tv } from "tailwind-variants"

export const avatarTv = tv({
  slots: {
    root: ["rounded-full", "relative flex items-center justify-center shrink-0 align-middle"],
    image: [
      "rounded-full overflow-hidden",
      "w-full h-full absolute inset-0",
      "object-cover pointer-events-none",
    ],
  },
  variants: {
    size: {
      small: {
        root: "w-4 h-4",
      },
      medium: {
        root: "w-6 h-6",
      },
      large: {
        root: "w-8 h-8",
      },
    },
    states: {
      default: {},
      dash: {},
      design: {},
      spotlight: {},
    },
    isLoading: {
      true: {
        root: "animate-pulse",
      },
    },
  },
  compoundVariants: [
    {
      states: ["dash", "design", "spotlight"],
      class: {
        root: "before:absolute ",
      },
    },
    {
      states: ["dash"],
      class: {
        root: "before:h-0.5 before:-top-1 before:inset-x-1 before:rounded-full before:bg-yellow-600",
      },
    },
    {
      states: ["design", "spotlight"],
      class: {
        root: "before:-inset-1 before:border-yellow-600 before:border-2 before:rounded-full",
      },
    },
    {
      states: ["spotlight"],
      class: {
        root: "before:border-dashed",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    states: "default",
  },
})
