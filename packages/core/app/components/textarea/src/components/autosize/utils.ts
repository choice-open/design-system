// SSR-safe environment detection
export const isBrowser = typeof window !== "undefined" && typeof document !== "undefined"

export const noop = () => {}

// Improved pick helper with better type safety
export const pick = <Obj extends Record<string, unknown>, Key extends keyof Obj>(
  props: readonly Key[],
  obj: Obj,
): Pick<Obj, Key> =>
  props.reduce(
    (acc, prop) => {
      if (prop in obj) {
        acc[prop] = obj[prop]
      }
      return acc
    },
    {} as Pick<Obj, Key>,
  )
