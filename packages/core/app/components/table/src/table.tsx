"use client"

import {
  TableBody,
  TableCell,
  TableColumn,
  TableEmpty,
  type TableEmptyProps,
  TableFooter,
  TableHeader,
  TableRoot,
  TableRow,
  TableValue,
} from "./components"
import type {
  TableBodyProps,
  TableCellProps,
  TableColumnProps,
  TableFooterProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableValueProps,
} from "./types"

/**
 * Table component with compound components pattern.
 *
 * Supports:
 * - Row selection (single/multiple)
 * - Consecutive selection rounded corners
 * - Virtualization for large datasets
 * - Two scroll modes: "container" (internal ScrollArea) or "window" (window scroll)
 *
 * @example
 * // Container scroll (default) - Table has its own scroll area
 * <Table
 *   data={users}
 *   getRowKey={(user) => user.id}
 *   selectable
 *   height={400}
 * >
 *   <Table.Header>
 *     <Table.Column id="name" width={200}>Name</Table.Column>
 *     <Table.Column id="email">Email</Table.Column>
 *   </Table.Header>
 *   <Table.Body>
 *     {(user, index) => (
 *       <Table.Row rowKey={user.id} index={index}>
 *         <Table.Cell columnId="name">{user.name}</Table.Cell>
 *         <Table.Cell columnId="email">{user.email}</Table.Cell>
 *       </Table.Row>
 *     )}
 *   </Table.Body>
 * </Table>
 *
 * @example
 * // Window scroll - Table uses window scroll for virtualization
 * <Table
 *   data={users}
 *   getRowKey={(user) => user.id}
 *   selectable
 *   scrollMode="window"
 * >
 *   <Table.Header>
 *     <Table.Column id="name">Name</Table.Column>
 *     <Table.Column id="email">Email</Table.Column>
 *   </Table.Header>
 *   <Table.Body>
 *     {(user, index) => (
 *       <Table.Row rowKey={user.id} index={index}>
 *         <Table.Cell columnId="name">{user.name}</Table.Cell>
 *         <Table.Cell columnId="email">{user.email}</Table.Cell>
 *       </Table.Row>
 *     )}
 *   </Table.Body>
 * </Table>
 *
 * @example
 * // Custom scroll container - Provide your own ScrollArea
 * const scrollRef = useRef<HTMLDivElement>(null)
 * const containerRef = useRef<HTMLDivElement>(null)
 *
 * <ScrollArea>
 *   <ScrollArea.Viewport ref={scrollRef}>
 *     <ScrollArea.Content ref={containerRef}>
 *       <Table
 *         data={users}
 *         getRowKey={(user) => user.id}
 *         scrollRef={scrollRef}
 *         containerRef={containerRef}
 *       >
 *         ...
 *       </Table>
 *     </ScrollArea.Content>
 *   </ScrollArea.Viewport>
 * </ScrollArea>
 */
function Table<T>(props: TableProps<T>) {
  return <TableRoot {...props} />
}

// Attach compound components
Table.Header = TableHeader as (props: TableHeaderProps) => React.ReactNode
Table.Column = TableColumn as (props: TableColumnProps) => React.ReactNode
Table.Body = TableBody as <T>(props: TableBodyProps<T>) => React.ReactNode
Table.Row = TableRow as (props: TableRowProps) => React.ReactNode
Table.Cell = TableCell as (props: TableCellProps) => React.ReactNode
Table.Value = TableValue as (props: TableValueProps) => React.ReactNode
Table.Empty = TableEmpty as (props: TableEmptyProps) => React.ReactNode
Table.Footer = TableFooter as (props: TableFooterProps) => React.ReactNode

export { Table }
export type {
  TableBodyProps,
  TableCellProps,
  TableColumnProps,
  TableEmptyProps,
  TableFooterProps,
  TableHeaderProps,
  TableProps,
  TableRowProps,
  TableValueProps,
}
