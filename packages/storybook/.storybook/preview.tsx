import { ChoiceUiProvider } from "@choice-ui/react"
import { Preview } from "@storybook/react-vite"
import "../styles/tailwind.css"
import "./global.css"
import { sharedParameters } from "./shared-parameters"

const preview: Preview = {
  decorators: [
    (Story) => (
      <ChoiceUiProvider>
        <Story />
      </ChoiceUiProvider>
    ),
  ],
  parameters: sharedParameters,
}

export default preview
