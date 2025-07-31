import { tv } from "tailwind-variants"

export const commandTv = tv({
  slots: {
    root: "bg-default-background text-default-foreground flex h-full w-full flex-col overflow-hidden",
    inputWrapper: "p-2",

    list: "max-h-[300px] overflow-x-hidden overflow-y-auto",
    empty: "text-muted-foreground py-6 text-center text-sm",
    group: "text-foreground overflow-hidden p-1",
    groupHeading: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
    item: [
      "relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm select-none",
      "hover:bg-accent hover:text-accent-foreground",
      "focus:bg-accent focus:text-accent-foreground",
      "focus:outline-none",
      "aria-selected:bg-accent aria-selected:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    ],
    separator: "bg-border my-1 h-px",
    loading: "flex items-center justify-center p-4",
    overlay: "bg-background/80 fixed inset-0 z-50 backdrop-blur-sm",
    content:
      "fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
    footer: "border-border text-muted-foreground border-t p-2 text-xs",
  },
})

export const commandInputTv = tv({
  slots: {
    root: "p-2",
    input: "w-full rounded-lg",
  },
  variants: {
    size: {
      default: {
        input: "leading-md tracking-md text-md h-8 px-2",
      },
      large: {
        input: "leading-lg tracking-lg h-10 px-4 text-lg",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export const commandListTv = tv({
  slots: {
    root: "px-2 pb-2",
    content: "flex flex-col",
  },
})

export const commandGroupTv = tv({
  slots: {
    root: "flex flex-col gap-1 not-first:mt-4",
    heading: "text-secondary-foreground leading-md tracking-md px-2",
  },
})

export const commandItemTv = tv({
  slots: {
    root: [
      "group/item relative flex items-center rounded-lg px-2 select-none",
      "focus:outline-none",
    ],
    icon: "flex flex-shrink-0 items-center justify-center rounded-md",
    value: "flex-1 truncate",
    shortcut: "text-secondary-foreground ml-2",
  },
  variants: {
    size: {
      default: {
        root: "text-md leading-md tracking-md min-h-8 p-1",
        icon: "size-6",
      },
      large: {
        root: "leading-lg tracking-lg min-h-10 p-2 text-lg",
        icon: "size-6",
      },
    },
    selected: {
      true: {
        root: "bg-secondary-background",
      },
      false: {
        root: "",
      },
    },
    disabled: {
      true: {
        root: "pointer-events-none",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export const commandFooterTv = tv({
  slots: {
    root: "flex h-10 items-center justify-between border-t px-2",
  },
})

export const commandTabsTv = tv({
  slots: {
    root: "",
    tabs: "mb-2 px-2",
  },
})
