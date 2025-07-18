import { tv } from "tailwind-variants"

export const fileUploadStyles = tv({
  slots: {
    root: "relative flex flex-col gap-2",
    dropzone: [
      "hover:bg-accent/30 focus-visible:border-ring/50",
      "data-[dragging]:border-primary data-[invalid]:border-destructive",
      "data-[invalid]:ring-destructive/20",
      "relative flex flex-col items-center justify-center gap-2",
      "rounded-lg border-2 border-dashed p-6 transition-colors",
      "outline-none select-none data-[disabled]:pointer-events-none"
    ],
    trigger: "",
    list: [
      "data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0",
      "data-[state=inactive]:slide-out-to-top-2 data-[state=active]:slide-in-from-top-2",
      "data-[state=active]:animate-in data-[state=inactive]:animate-out",
      "flex flex-col gap-2"
    ],
    item: [
      "relative flex items-center gap-2.5 rounded-md border p-3",
      "has-[_[data-slot=file-upload-progress]]:flex-col",
      "has-[_[data-slot=file-upload-progress]]:items-start"
    ],
    itemPreview: "relative flex size-10 shrink-0 items-center justify-center rounded-md",
    itemPreviewImage: "object-cover",
    itemPreviewIcon: "bg-accent/50 [&>svg]:size-7",
    itemMetadata: "flex min-w-0 flex-1 flex-col",
    itemName: "truncate text-sm font-medium",
    itemSize: "text-muted-foreground text-xs",
    itemError: "text-destructive text-xs",
    itemProgress: "bg-primary/20 relative h-1.5 w-full overflow-hidden rounded-full",
    itemProgressBar: "bg-primary h-full w-full flex-1 transition-all",
    itemProgressCircular: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    itemDelete: "",
    clear: "",
    input: "sr-only",
    label: "sr-only",
    statusText: "sr-only"
  },
  variants: {
    orientation: {
      horizontal: {
        list: "flex-row overflow-x-auto p-1.5"
      },
      vertical: {
        list: "flex-col"
      }
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
})