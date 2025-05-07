import { tv } from "tailwind-variants"

export const numericInputTv = tv({
  slots: {
    container: "h-6 group/input grid input-number",
    input: [
      "peer",
      "h-6 w-full",
      "cursor-default appearance-none truncate",
      "disabled:bg-transparent disabled:text-secondary",
      "placeholder:text-secondary",
    ],
    variableContainer: "flex flex-1 items-center pr-1",
    variable: [
      "flex h-5 items-center rounded-xs border px-1",
      "shadow-small border-transparent bg-body",
      "dark:border-white/20",
      "select-none z-2",
    ],
    tooltip: "h-6 col-span-3 col-start-1 row-start-1",
  },
  variants: {
    variant: {
      default: {
        container: "",
        input: "bg-light-100",
      },
      transparent: {
        container: "",
      },
    },
    prefixElement: {
      true: {},
      false: {
        variableContainer: "pl-0.5 rounded-l-md",
      },
    },
    suffixElement: {
      true: {},
      false: {},
    },
    suffixElementType: {
      handler: {},
      action: {},
      menu: {},
    },
    variableValue: {
      true: {},
      false: {},
    },
    selected: {
      true: {
        variable: "pointer-events-none",
      },
      false: {},
    },
    isOverridden: {
      true: {},
      false: {},
    },
    isConstrained: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        container: "before:border-light-200",
        variableContainer: "text-secondary",
      },
      false: {
        variableContainer: "peer-focus:[&>button]:border-accent peer-focus:[&>button]:bg-accent/20",
      },
    },
  },
  compoundSlots: [
    // 基础输入框样式
    {
      slots: ["input"],
      variableValue: false,
      prefixElement: false,
      class: "px-1.75",
    },
    // 无前缀时的圆角
    {
      slots: ["input"],
      variableValue: false,
      prefixElement: false,
      class: "rounded-l-md",
    },
    // 无后缀时的圆角
    {
      slots: ["input"],
      suffixElement: false,
      class: "rounded-r-md",
    },
  ],
  compoundVariants: [
    // 默认变体的状态样式
    {
      variant: "default",
      selected: true,
      class: {
        container: "before:border-accent/50",
      },
    },
    {
      variant: "default",
      selected: false,
      class: {
        container: [
          "focus-within:before:border-accent",
          "not-focus-within:hover:before:border-light-200",
        ],
      },
    },
    {
      variant: "default",
      disabled: false,
      class: {
        variableContainer: "bg-light-100",
      },
    },
    {
      selected: false,
      disabled: false,
      class: {
        variable: "cursor-pointer group-hover/input:bg-light-200",
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    selected: false,
    isFocused: false,
    isOverridden: false,
    disabled: false,
  },
})

export const numericInputMenuTriggerTv = tv({
  base: "rounded-r-md flex-none rounded-l-none [grid-area:action]",
  variants: {
    disabled: {
      true: "",
    },
    type: {
      menu: "",
      action: "",
    },
  },
  compoundVariants: [
    {
      disabled: false,
      type: "menu",
      class: "ml-px",
    },
    {
      disabled: false,
      type: "action",
      class: "bg-light-100",
    },
  ],
  defaultVariants: {
    disabled: false,
    type: "menu",
  },
})

export const numericInputVariableTv = tv({
  base: ["mr-1 cursor-pointer", "flex h-5 items-center rounded-sm border px-1"],
  variants: {
    isFocused: {
      true: "border-accent bg-accent/10",
      false: "shadow-small group-hover/input:bg-light-200 border-transparent bg-white",
    },
  },
  defaultVariants: {
    isFocused: false,
  },
})

export const numericInputVariableTriggerTv = tv({
  slots: {
    container: "[grid-area:action] rounded-r-md bg-light-100",
    trigger: "text-secondary-foreground hover:text-primary",
  },
  variants: {
    type: {
      OPEN: {},
      UNLINK: {
        trigger: "invisible",
      },
    },
    open: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      type: "OPEN",
      open: false,
      class: {
        trigger: "invisible group-hover/input:visible",
      },
    },
    {
      type: "OPEN",
      open: true,
      class: {
        trigger: "text-primary visible",
      },
    },
    {
      type: "UNLINK",
      open: false,
      class: {
        trigger: "group-hover/input:visible selected:bg-transparent",
      },
    },
  ],
  defaultVariants: {
    type: "OPEN",
    open: false,
  },
})

export const numericInputElementTv = tv({
  base: [
    "text-secondary-foreground select-none",
    "h-6 w-6 z-2",
    "flex flex-none items-center justify-center",
  ],
  variants: {
    type: {
      handler: "select-none",
      action: "[grid-area:action]",
      menu: "[grid-area:action]",
    },
    position: {
      prefix: "rounded-l-md",
      suffix: "rounded-r-md",
    },
    disabled: {
      true: "",
      false: "bg-light-100",
    },
  },
  compoundVariants: [
    {
      type: "handler",
      position: "prefix",
      class: "[grid-area:prefix-handler]",
    },
    {
      type: "handler",
      position: "suffix",
      class: "[grid-area:suffix-handler]",
    },
    {
      type: "handler",
      disabled: false,
      class: "cursor-ew-resize",
    },
  ],
  defaultVariants: {
    disabled: false,
  },
})

export const numericInputMenuActionPromptTv = tv({
  base: [
    "[grid-area:action]",
    "pr-2 pl-1",
    "flex items-center justify-center",
    "rounded-r-md",
    "pointer-events-none z-2",
  ],
  variants: {
    disabled: {
      true: "text-secondary-foreground bg-default-background",
      false: "bg-light-100 group-focus-within/input:hidden group-hover/input:hidden",
    },
  },
  defaultVariants: {
    disabled: false,
  },
})
