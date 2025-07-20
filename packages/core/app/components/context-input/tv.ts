import { tv } from "tailwind-variants"

export const contextInputTv = tv({
  slots: {
    container: [
      "group/context-input leading-md tracking-md text-md flex min-w-0 flex-col overflow-hidden rounded-lg",
    ],
    header: ["flex h-8 flex-shrink-0 items-center justify-between pr-1 pl-2"],
    scrollArea: ["flex min-h-0 flex-col"],
    viewport: ["flex flex-1 flex-col"],
    scrollContainer: ["flex flex-1 flex-col"],
    editor: ["flex-1"],
    placeholder: ["text-secondary-foreground pointer-events-none absolute left-2"],
    mention: ["my-px mr-1 ml-1 inline-flex h-3.5 pl-1"],
    suggestionList: [
      "absolute z-50 max-h-48 w-64",
      "mt-1 p-1",
      "bg-popover border-border rounded-md border shadow-md",
      "overflow-auto",
    ],
    suggestionItem: [
      "flex w-full items-center gap-2 px-2 py-2",
      "rounded-sm text-sm",
      "hover:bg-accent hover:text-accent-foreground",
      "cursor-pointer select-none",
    ],
    avatar: [
      "size-4 rounded-full",
      "bg-muted flex items-center justify-center",
      "text-xs font-medium",
    ],
    loading: ["flex items-center justify-center py-2", "text-muted-foreground text-sm"],
  },
  variants: {
    hasHeader: {
      true: {
        scrollArea: "h-[calc(100%-2rem)]",
        editor: "px-2 pb-2",
        placeholder: "top-0",
      },
      false: {
        editor: "p-2",
        placeholder: "top-2",
      },
    },
    variant: {
      default: {
        container: [
          "bg-secondary-background",
          "placeholder:text-secondary-foreground",
          "focus-within:bg-default-background",
        ],
      },
      dark: {
        container: ["bg-gray-700 text-white", "placeholder:text-white/40"],
      },
      reset: {
        container: "",
      },
    },
    selected: {
      true: {
        suggestionItem: "bg-accent text-accent-foreground",
      },
    },
    disabled: {
      true: {
        container: "cursor-not-allowed opacity-50",
        editor: "cursor-not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      variant: ["default", "dark"],
      class: {
        container: "border border-solid border-transparent",
      },
    },
    {
      variant: "default",
      selected: true,
      disabled: false,
      class: {
        container: [
          "bg-default-background",
          "not-focus-within:border-selected-boundary/50",
          "focus-within:border-selected-boundary",
        ],
      },
    },
    {
      variant: "default",
      selected: false,
      disabled: false,
      class: {
        container: "hover:not-focus-within:border-default-boundary",
      },
    },
    {
      variant: "dark",
      selected: false,
      disabled: false,
      class: {
        container: "hover:not-focus-within:border-gray-600",
      },
    },
    {
      variant: ["dark", "default"],
      selected: false,
      disabled: false,
      class: {
        container: "focus-within:border-selected-boundary",
      },
    },
    {
      variant: "default",
      disabled: true,
      class: {
        container: "text-disabled-foreground border-secondary-background bg-secondary-background",
      },
    },
    {
      variant: "dark",
      disabled: true,
      class: {
        container: "bg-gray-700 text-white/40",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    hasHeader: false,
  },
})
