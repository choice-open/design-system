import { tv } from "tailwind-variants"

export const PicturePreviewTv = tv({
  slots: {
    root: ["relative flex flex-col overflow-hidden", "w-full h-full", "touch-none select-none"],
    loading: ["absolute inset-0 flex items-center justify-center z-10 text-default-background"],
    content: [
      "relative flex-1 overflow-hidden",
      "flex items-center justify-center",
      "bg-gray-100 dark:bg-gray-900",
    ],
    canvas: [
      "relative h-full w-full",
      "transform-gpu will-change-transform",
      "cursor-grab active:cursor-grabbing",
    ],
    image: ["pointer-events-none", "h-full w-full object-contain"],

    controlGroup: [
      "overflow-hidden",
      "absolute bottom-2 right-2 flex items-center",
      "bg-default-background",
      "rounded-md",
      "shadow-md",
    ],
  },
  variants: {
    isLoading: {
      true: {
        image: "opacity-0 transition-opacity duration-300",
      },
      false: {},
    },
  },
  defaultVariants: {
    isLoading: false,
  },
})
