import { AlertDialogProvider, TooltipProvider } from "@choice-ui/react"
import { Preview } from "@storybook/react-vite"
import "../styles/tailwind.css"
import "./global.css"
import { sharedParameters } from "./shared-parameters"

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
