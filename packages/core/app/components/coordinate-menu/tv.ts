import { tv } from "tailwind-variants"

export const coordinateMenuVariants = tv({
  slots: {
    menu: [
      "bg-white dark:bg-gray-800",
      "border border-gray-200 dark:border-gray-600",
      "rounded-md shadow-lg",
      "p-1",
      "min-w-[120px]",
    ],
    item: [
      "px-2 py-1.5",
      "text-sm text-gray-900 dark:text-gray-100",
      "hover:bg-gray-100 dark:hover:bg-gray-700",
      "rounded-sm",
      "cursor-pointer",
      "transition-colors",
    ],
  },
  variants: {},
  defaultVariants: {},
})

export type CoordinateMenuVariants = ReturnType<typeof coordinateMenuVariants>
