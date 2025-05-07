import { isFunction } from "./assertion"

interface Props {
  [key: string]: any
}

type PropsArg = Props | null | undefined

// Type helpers for proper TypeScript inference
type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
  ? NullToObject<V>
  : never
type NullToObject<T> = T extends null | undefined ? {} : T
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

/**
 * Chains multiple event handlers together
 */
function chain(...callbacks: (Function | undefined)[]): Function {
  return (...args: any[]) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args)
      }
    }
  }
}

/**
 * Merges class names together
 */
function mergeClassNames(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(" ")
}

/**
 * Merges multiple IDs together by combining them with a space
 */
function mergeIds(a: string, b: string): string {
  if (a === b) return a
  return `${a} ${b}`
}

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps<T extends PropsArg[]>(...args: T): UnionToIntersection<TupleTypes<T>> {
  // Start with a base clone of the first argument
  let result: Props = { ...args[0] }

  for (let i = 1; i < args.length; i++) {
    let props = args[i]
    if (!props) continue

    for (let key in props) {
      let a = result[key]
      let b = props[key]

      // Chain events (onX functions where X is uppercase)
      if (
        isFunction(a) &&
        isFunction(b) &&
        key[0] === "o" &&
        key[1] === "n" &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = chain(a, b)
        // Merge classnames
      } else if (
        (key === "className" || key === "class") &&
        typeof a === "string" &&
        typeof b === "string"
      ) {
        result[key] = mergeClassNames(a, b)
        // Merge ids
      } else if (key === "id" && a && b) {
        result.id = mergeIds(a, b)
        // Override others
      } else {
        result[key] = b !== undefined ? b : a
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>
}
