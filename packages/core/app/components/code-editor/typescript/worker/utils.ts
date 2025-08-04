import { ChangeSet } from "@codemirror/state"

export function wrapInFunction(script: string): string {
  // Wrap the script in a function to provide proper scope and avoid global namespace pollution
  return `(function() {\n${script}\n})();`
}

const MAX_CHANGE_BUFFER_CHAR_SIZE = 10_000_000
const MIN_CHANGE_BUFFER_WINDOW_MS = 50
const MAX_CHANGE_BUFFER_WINDOW_MS = 500

// Longer buffer window for large code
function calculateBufferWindowMs(docSize: number, minDelay: number, maxDelay: number): number {
  const clampedSize = Math.min(docSize, MAX_CHANGE_BUFFER_CHAR_SIZE)
  const normalizedSize = clampedSize / MAX_CHANGE_BUFFER_CHAR_SIZE

  return Math.ceil(minDelay + (maxDelay - minDelay) * normalizedSize)
}

// Create a buffer function to accumulate and compose changesets
export function bufferChangeSets(fn: (changeset: ChangeSet) => void) {
  let changeSet = ChangeSet.empty(0)
  let timeoutId: NodeJS.Timeout | null = null

  return async (changes: ChangeSet) => {
    changeSet = changeSet.compose(changes)

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    return await new Promise<void>((resolve) => {
      timeoutId = setTimeout(
        () => {
          fn(changeSet)
          resolve()
          changeSet = ChangeSet.empty(0)
        },
        calculateBufferWindowMs(
          changeSet.length,
          MIN_CHANGE_BUFFER_WINDOW_MS,
          MAX_CHANGE_BUFFER_WINDOW_MS,
        ),
      )
    })
  }
}
