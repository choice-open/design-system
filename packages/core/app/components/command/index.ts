// Individual exports for external usage
export { Command as CommandRoot } from "./command"
export { useCommandState } from "./hooks"
export { defaultFilter } from "./command"

// Compound component for Storybook and internal usage
import { Command as CommandRoot } from "./command"
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandSeparator,
  CommandIcon,
  CommandValue,
  CommandTabs,
} from "./components"

export const Command = Object.assign(CommandRoot, {
  Dialog: CommandDialog,
  Empty: CommandEmpty,
  Footer: CommandFooter,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Loading: CommandLoading,
  Separator: CommandSeparator,
  Icon: CommandIcon,
  Value: CommandValue,
  Tabs: CommandTabs,
})
