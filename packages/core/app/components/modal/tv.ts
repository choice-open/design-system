import { tv } from "tailwind-variants"

export const ModalTv = tv({
  slots: {
    root: "rounded-lg relative flex flex-col bg-body shadow-xl max-w-fit z-modals pointer-events-auto",
  },
})

export const ModalHeaderTv = tv({
  slots: {
    root: "h-10 border-b border-default-boundary flex flex-none items-center gap-2 justify-between w-full",
    title: "p-2 font-medium leading-md tracking-md flex items-center gap-2",
    close: "p-2",
  },
  variants: {
    validElement: {
      true: {
        title: "",
      },
      false: {
        title: "ml-2",
      },
    },
  },
  defaultVariants: {
    validElement: false,
  },
})

export const ModalContentTv = tv({
  slots: {
    root: "flex-1",
  },
})

export const ModalFooterTv = tv({
  slots: {
    root: "h-10 border-t border-default-boundary flex flex-none items-center gap-2 justify-between p-2",
  },
})
