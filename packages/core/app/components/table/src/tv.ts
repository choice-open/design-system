import { tcv } from "@choice-ui/shared"

export const tableVariants = tcv({
  slots: {
    // Root container - flex column layout
    root: "relative flex flex-col overflow-hidden",

    // Header wrapper - clips content, fixed at top
    headerWrapper: "group/header relative flex-shrink-0 overflow-hidden border-b",
    // Header inner - can translate for scroll sync, matches body content width
    headerInner: "",
    // Header row - must match body row width for column alignment
    headerRow: "flex w-full items-center bg-default-background",
    // Header cell
    headerCell: [
      "group/cell relative flex h-8 items-center gap-1 px-3",
      "select-none whitespace-nowrap flex-shrink-0",
    ],

    headerCellDraggable: "",
    headerCellCanDrag: "cursor-grab",
    headerCellDragging: "bg-accent-background/10 opacity-60",
    headerCheckbox: "flex h-8 items-center justify-center px-2 flex-shrink-0",

    // Body wrapper - takes remaining space, handles scrolling
    bodyWrapper: "relative flex-1 min-h-0",
    // Body scroll container (ScrollArea for container mode)
    bodyScroll: "h-full w-full",
    // Body content - relative for absolute positioned rows
    body: "relative min-w-max",

    // Row styles - w-full ensures flex children calculate width consistently
    row: "absolute left-0 right-0 flex w-full items-center",
    rowStatic: "relative flex w-full items-center h-[inherit] min-h-8", // For non-virtualized mode
    cell: "flex items-center px-3 flex-shrink-0",
    cellCheckbox: "flex items-center justify-center px-2 flex-shrink-0",

    // Sort icon
    sortIcon: "size-3.5 opacity-60",

    // Empty and loading states
    emptyState: "flex flex-col items-center justify-center py-16 text-secondary-foreground",

    // Column resize styles
    resizer: [
      "absolute -right-1 top-0 h-full w-2 cursor-col-resize z-3",
      "before:absolute before:inset-y-2 before:left-0.75 before:w-0.5 before:content-[''] before:bg-tertiary-background",
      "before:rounded-md before:opacity-0 group-hover/header:before:opacity-100 hover:before:bg-accent-foreground hover:before:inset-y-1",
      "active:before:opacity-0",
    ],
    resizeGuide: ["pointer-events-none absolute top-0 z-50 w-px", "bg-accent-foreground"],

    // Column drag styles
    dragGhost: ["pointer-events-none absolute top-0 z-40", "bg-gray-500/10"],
    dragIndicator: ["pointer-events-none absolute top-0 z-50 w-px", "bg-accent-foreground"],
  },
  variants: {
    selected: {
      true: { row: "bg-selected-background", rowStatic: "bg-selected-background" },
      false: {},
    },
    active: {
      true: { row: "bg-selected-background/70", rowStatic: "bg-selected-background/70" },
      false: {},
    },
    sortable: {
      true: {
        headerCell: [
          "text-secondary-foreground hover:text-default-foreground hover:bg-secondary-background",
          "aria-[sort]:text-default-foreground",
        ],
      },
      false: { headerCell: "text-default-foreground" },
    },
    resizing: {
      true: { root: "pointer-events-none" },
      false: {},
    },
    dragging: {
      true: { resizer: "before:!opacity-0" },
      false: {},
    },
  },
  compoundVariants: [
    {
      selected: true,
      class: {
        rowStatic: "hover:bg-selected-background/50",
      },
    },
    {
      selected: false,
      class: {
        rowStatic: "hover:bg-black/3 dark:hover:bg-white/3 hover:rounded-md",
      },
    },
  ],
  defaultVariants: {
    selected: false,
    active: false,
  },
})

export type TableVariantProps = Parameters<typeof tableVariants>[0]
