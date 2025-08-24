import { AlertDialogProvider, TooltipProvider } from "@choiceform/design-system"
import { Preview } from "@storybook/react-vite"
import { sharedParameters } from "@choiceform/storybook-config/preview"
import React from "react"
import "../app/tailwind.css"
import "@choiceform/storybook-config/global.css"
import { Toaster } from "sonner"

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider
        delay={{
          open: 400,
          close: 200,
        }}
      >
        <AlertDialogProvider>
          <Story />
          <Toaster position="bottom-right" />
        </AlertDialogProvider>
      </TooltipProvider>
    ),
  ],
  parameters: sharedParameters,
}

export default preview
