import { createContext, useContext } from "react"

export interface DropdownContextType {
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
  getItemProps: <T extends React.HTMLProps<HTMLElement>>(userProps?: T) => Record<string, unknown>
  setHasFocusInside: (value: boolean) => void
  isOpen: boolean
  selection: boolean
  close: () => void
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
