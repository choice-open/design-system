import { tv } from "tailwind-variants"

export const rangeTv = tv({
  slots: {
    container: [
      "relative touch-none select-none",
      "bg-secondary-background rounded-full shadow-inset-border",
    ],
    trackGradient: "pointer-events-none absolute inset-0 rounded-full",
    thumb: [
      "absolute top-1/2 box-border origin-center rounded-full",
      "border-2 border-white shadow-range-thumb",
      "bg-white",
    ],
    dotContainer: "pointer-events-none absolute inset-0",
    dot: ["size-1 rounded-full", "absolute top-1/2", "-translate-x-1/2 -translate-y-1/2"],
    input: "absolute inset-0 cursor-default opacity-0",
  },
  variants: {
    overStepValue: {
      true: {
        dot: "bg-black/20",
      },
      false: {
        dot: "bg-black/10",
      },
    },
    defaultStepValue: {
      true: {
        dot: "bg-black",
      },
    },
    hasStepOrDefault: {
      true: {},
      false: {},
    },
    currentDefaultValue: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        thumb: "bg-secondary-background",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      defaultStepValue: true,
      overStepValue: true,
      class: {
        dot: "bg-black",
      },
    },
    {
      hasStepOrDefault: true,
      currentDefaultValue: true,
      disabled: false,
      class: {
        thumb: "bg-white",
      },
    },
    {
      hasStepOrDefault: true,
      currentDefaultValue: false,
      disabled: false,
      class: {
        thumb: "bg-accent-background",
      },
    },
  ],
  defaultVariants: {
    defaultStepValue: false,
    overStepValue: false,
    hasStepOrDefault: false,
    currentDefaultValue: false,
    disabled: false,
  },
})
