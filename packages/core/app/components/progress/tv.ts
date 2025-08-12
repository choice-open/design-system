import { tv, type VariantProps } from "tailwind-variants"

export const progressBarTv = tv({
  slots: {
    root: ["flex w-full max-w-full flex-col", "min-w-0 gap-2"],
    labelWrapper: "flex w-full items-center justify-between gap-1",
    label: "flex w-full items-center justify-between",
    value: "leading-md tracking-md text-md tabular-nums",
    track: "bg-secondary-background w-full overflow-hidden rounded-full",
    connects: [
      "h-full w-full rounded-[inherit] transition-transform duration-500 will-change-transform",
    ],
  },
  variants: {
    size: {
      small: { track: "h-1" },
      default: { track: "h-2" },
      large: { track: "h-4" },
    },
    variant: {
      accent: { connects: "bg-accent-background" },
      default: { connects: "bg-default-foreground" },
      "based-on-value": {},
      reset: {},
    },
    indeterminate: {
      true: { connects: "animate-indeterminate-bar" },
      false: {},
    },
    striped: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    size: "default",
    variant: "accent",
    indeterminate: false,
    striped: false,
  },
})

export const progressCircleTv = tv({
  slots: {
    root: "relative inline-flex shrink-0 align-middle",
    svg: "text-accent-background block",
    track: "stroke-secondary-background",
    fill: "stroke-current transition-all duration-500 ease-in-out",
    value: "leading-md tracking-md text-md fill-current text-center",
  },
  variants: {
    variant: {
      accent: { svg: "text-accent-background" },
      default: { svg: "text-default-foreground" },
      "based-on-value": {},
      reset: {},
    },
  },
  defaultVariants: {
    variant: "accent",
  },
})

export type ProgressBarVariantProps = VariantProps<typeof progressBarTv>
export type ProgressCircleVariantProps = VariantProps<typeof progressCircleTv>
