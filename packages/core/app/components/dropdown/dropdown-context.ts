import { createContext, useContext } from "react"

export interface DropdownContextType {
  activeIndex: number | null
  close: () => void
  getItemProps: <T extends React.HTMLProps<HTMLElement>>(userProps?: T) => Record<string, unknown>
  isOpen: boolean
  selection: boolean
  setActiveIndex: (index: number | null) => void
  setHasFocusInside: (value: boolean) => void
}

export const DropdownContext = createContext<DropdownContextType>({
  activeIndex: null,
  setActiveIndex: () => {},
  getItemProps: () => ({}),
  setHasFocusInside: () => {},
  isOpen: false,
  selection: false,
  close: () => {},
})

export const DropdownSelectionContext = createContext<boolean>(false)

export const useDropdownSelection = () => useContext(DropdownSelectionContext)
