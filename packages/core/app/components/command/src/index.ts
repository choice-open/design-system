export { Command as CommandRoot, defaultFilter } from "./command"

import { Command as CommandRoot } from "./command"
import { TabItem } from "@choice-ui/tabs"
import {
  CommandDivider,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandTabs,
  CommandValue,
} from "./components"

export const Command = Object.assign(CommandRoot, {
  Empty: CommandEmpty,
  Footer: CommandFooter,
  Group: CommandGroup,
  Input: CommandInput,
  Item: CommandItem,
  List: CommandList,
  Loading: CommandLoading,
  Divider: CommandDivider,
  Value: CommandValue,
  Tabs: CommandTabs,
  TabItem: TabItem,
})

export { useCommandState, useCommand, useValue } from "./hooks"
export { commandScore } from "./utils"

export type { CommandProps } from "./types"
export type { CommandGroupProps } from "./components/command-group"
export type { CommandItemProps } from "./components/command-item"
export type { CommandListProps } from "./components/command-list"
export type { CommandLoadingProps } from "./components/command-loading"
export type { CommandDividerProps } from "./components/command-divider"
export type { CommandInputProps } from "./components/command-input"
