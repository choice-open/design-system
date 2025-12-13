import { createContext, useContext } from "react"
import type {
  ColumnOrderState,
  ColumnWidthsState,
  ConsecutiveStyle,
  RowKey,
  ScrollMode,
  SelectionMode,
  SortDirection,
  SortingState,
  TableColumnDef,
  TableInstance,
} from "./types"
import type { RefObject } from "react"

/**
 * Static context - rarely changes
 * Contains: columns, config, refs, and stable handlers
 */
export interface TableStaticContextValue<T = unknown> {
  // Data accessors (stable functions that read from refs)
  getData: () => T[]
  getRowKey: (row: T, index: number) => RowKey
  columns: TableColumnDef<T>[]
  registerColumn: (column: TableColumnDef<T>) => void
  unregisterColumn: (id: string) => void

  // Config
  selectable: boolean
  selectionMode: SelectionMode
  sortable: boolean
  resizable: boolean
  reorderable: boolean
  virtualized: boolean
  /** Fixed row height in pixels */
  rowHeight: number
  overscan: number
  scrollMode: ScrollMode
  /** External scroll container ref (for external scroll mode) */
  scrollRef?: RefObject<HTMLElement>
  tableRef: RefObject<HTMLDivElement>

  // Stable handlers
  toggleSort: (columnId: string) => void
  getSortDirection: (columnId: string) => SortDirection | null
  onRowClick?: (row: T, event: React.MouseEvent) => void
  onScroll?: (event: { scrollTop: number; scrollHeight: number; clientHeight: number }) => void

  // Instance
  tableInstance: TableInstance<T>
}

/**
 * Scroll sync context - for header/body horizontal scroll synchronization
 * Uses refs for direct DOM manipulation to avoid React re-renders during scroll
 */
export interface TableScrollContextValue {
  /** Header inner element ref for direct DOM transform */
  headerInnerRef: RefObject<HTMLDivElement>
  /** Sync scroll position directly to header (bypasses React state) */
  syncScrollLeft: (value: number) => void
  /** Body scroll container ref (for virtualization) */
  bodyScrollRef: RefObject<HTMLDivElement> | null
  /** Set body scroll container ref */
  setBodyScrollRef: (ref: RefObject<HTMLDivElement>) => void
}

/**
 * Selection context - changes when selection changes
 */
export interface TableSelectionContextValue {
  selectedKeys: Set<RowKey>
  isRowSelected: (key: RowKey) => boolean
  toggleRowSelection: (key: RowKey, index?: number) => void
  handleCheckboxClick: (key: RowKey, index: number, event: React.MouseEvent) => void
  isAllSelected: () => boolean
  isSomeSelected: () => boolean
  selectAll: () => void
  deselectAll: () => void
  getConsecutiveStyle: (index: number) => ConsecutiveStyle
  activeRowKey: RowKey | null
}

/**
 * Column state context - changes during resize/reorder
 */
export interface TableColumnStateContextValue {
  columnWidths: ColumnWidthsState
  columnOrder: ColumnOrderState
  sorting: SortingState[]
  getColumnWidth: (columnId: string) => number | undefined
}

/**
 * Drag/Resize context - changes very frequently during interactions
 */
export interface TableDragResizeContextValue {
  // Resize
  resizeState: { columnId: string; startX: number; startWidth: number; currentX: number } | null
  startResize: (columnId: string, startX: number, startWidth: number) => void
  updateResize: (currentX: number) => void
  endResize: () => void

  // Drag
  dragState: {
    columnId: string
    targetIndex: number
    mouseX: number
    sourceLeft: number
    sourceWidth: number
  } | null
  startDrag: (columnId: string, mouseX: number, sourceLeft: number, sourceWidth: number) => void
  updateDragTarget: (targetIndex: number) => void
  updateDragPosition: (mouseX: number) => void
  endDrag: () => void
  cancelDrag: () => void
}

/**
 * Row data context - contains rows array
 */
export interface TableRowsContextValue<T = unknown> {
  rows: Array<{ key: RowKey; data: T; index: number }>
}

// Create contexts
export const TableStaticContext = createContext<TableStaticContextValue | null>(null)
export const TableScrollContext = createContext<TableScrollContextValue | null>(null)
export const TableSelectionContext = createContext<TableSelectionContextValue | null>(null)
export const TableColumnStateContext = createContext<TableColumnStateContextValue | null>(null)
export const TableDragResizeContext = createContext<TableDragResizeContextValue | null>(null)
export const TableRowsContext = createContext<TableRowsContextValue | null>(null)

// Hooks
export function useTableStatic<T = unknown>(): TableStaticContextValue<T> {
  const context = useContext(TableStaticContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context as TableStaticContextValue<T>
}

export function useTableScroll(): TableScrollContextValue {
  const context = useContext(TableScrollContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context
}

export function useTableSelection(): TableSelectionContextValue {
  const context = useContext(TableSelectionContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context
}

export function useTableColumnState(): TableColumnStateContextValue {
  const context = useContext(TableColumnStateContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context
}

export function useTableDragResize(): TableDragResizeContextValue {
  const context = useContext(TableDragResizeContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context
}

export function useTableRows<T = unknown>(): TableRowsContextValue<T> {
  const context = useContext(TableRowsContext)
  if (!context) {
    throw new Error("Table components must be used within a Table")
  }
  return context as TableRowsContextValue<T>
}
