import { useCallback, useMemo } from "react"
import type { ConsecutiveStyle, InternalRow, RowKey } from "../types"

/**
 * Hook to determine rounded corner style for consecutive selected rows.
 *
 * Returns a function that takes an index and returns the appropriate rounded style:
 * - Single selected: "rounded-md"
 * - First of consecutive: "rounded-t-md"
 * - Last of consecutive: "rounded-b-md"
 * - Middle of consecutive: "rounded-none"
 * - Not selected: ""
 */
export function useConsecutiveSelectionStyle<T>(
  rows: InternalRow<T>[],
  selectedKeys: Set<RowKey>,
): (index: number) => ConsecutiveStyle {
  // Create a set of selected indices for O(1) lookup
  const selectedIndices = useMemo(() => {
    const indices = new Set<number>()
    rows.forEach((row, index) => {
      if (selectedKeys.has(row.key)) {
        indices.add(index)
      }
    })
    return indices
  }, [rows, selectedKeys])

  return useCallback(
    (index: number): ConsecutiveStyle => {
      // Edge case: negative index or empty selection
      if (index < 0 || selectedIndices.size === 0) return ""
      if (!selectedIndices.has(index)) return ""

      const hasPrev = index > 0 && selectedIndices.has(index - 1)
      const hasNext = selectedIndices.has(index + 1)

      if (!hasPrev && !hasNext) return "rounded-md"
      if (!hasPrev && hasNext) return "rounded-t-md"
      if (hasPrev && !hasNext) return "rounded-b-md"
      return "rounded-none"
    },
    [selectedIndices],
  )
}
