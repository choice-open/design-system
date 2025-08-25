import { AlertDialogProvider, TooltipProvider } from "@choiceform/design-system"
import "@choiceform/storybook-config/global.css"
import { sharedParameters } from "@choiceform/storybook-config/preview"
import { Preview } from "@storybook/react-vite"
import React from "react"
import "../app/tailwind.css"

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
        </AlertDialogProvider>
      </TooltipProvider>
    ),
  ],
  parameters: sharedParameters,
}

export default preview
