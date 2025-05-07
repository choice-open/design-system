import { DealWithNumericValueOptions, NumberResult, Operation } from "./types"

export const dealWithNumericValueCatch = (
  options: DealWithNumericValueOptions,
): NumberResult | undefined => {
  try {
    return dealWithNumericInputValue(options)
  } catch (_error) {
    return undefined
  }
}

// Constants and utility functions
const precedence: Record<Operation, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "(": 0,
  ")": 0,
}

const applyOperation = (op: Operation, b: number, a: number): number => {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "*":
      return a * b
    case "/":
      return a / b
    default:
      throw new Error(`Invalid operation: ${op}`)
  }
}

const evaluate = (expression: string): number => {
  const ops: Operation[] = []
  const nums: number[] = []
  let num = ""

  const precedenceOf = (op: Operation): number => precedence[op]

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i]
    if (char === " ") continue

    if ((char >= "0" && char <= "9") || char === "." || (char === "-" && i === 0)) {
      num += char
    } else {
      if (num) {
        nums.push(parseFloat(num))
        num = ""
      }

      if (char === "(") {
        ops.push(char)
      } else if (char === ")") {
        while (ops.length && ops[ops.length - 1] !== "(") {
          const op = ops.pop()!
          const b = nums.pop()!
          const a = nums.pop()!
          nums.push(applyOperation(op, b, a))
        }
        ops.pop() // Remove "("
      } else {
        while (ops.length && precedenceOf(ops[ops.length - 1]) >= precedenceOf(char as Operation)) {
          const op = ops.pop()!
          const b = nums.pop()!
          const a = nums.pop()!
          nums.push(applyOperation(op, b, a))
        }
        ops.push(char as Operation)
      }
    }
  }

  if (num) {
    nums.push(parseFloat(num))
  }

  while (ops.length) {
    const op = ops.pop()!
    const b = nums.pop()!
    const a = nums.pop()!
    nums.push(applyOperation(op, b, a))
  }

  const result = nums.pop()
  if (result === undefined) {
    throw new Error(`Invalid expression: ${expression}`)
  }
  return result
}

export const dealWithNumericInputValue = ({
  input,
  pattern,
  call,
  max = Infinity,
  min = -Infinity,
  decimal = 2,
}: DealWithNumericValueOptions): NumberResult => {
  let canBeNumbers: number[] = []
  let isInputNumber = false
  let isObjectNumber = false

  try {
    if (typeof input === "string" || typeof input === "number") {
      canBeNumbers = String(input)
        .split(",")
        .map((char) => evaluate(char))
      isInputNumber = canBeNumbers.length > 0
    } else if (Array.isArray(input)) {
      canBeNumbers = input.map((item) => evaluate(String(item)))
      isInputNumber = canBeNumbers.length > 0
    } else if (typeof input === "object") {
      isObjectNumber = true
    }
  } catch (_error) {
    // Ignore evaluation errors
  }

  const keys: string[] = []
  const regexPattern = pattern.replace(/[\s]*\{([\w|,]+)\}[\s]*/g, (_match, key) => {
    const keyArr = key.split(",")
    keys.push(keyArr[0])
    return "(.+)"
  })

  const regex = new RegExp(`^${regexPattern}$`)
  const result: Record<string, number> = {}

  if (typeof input === "string" && input.match(regex) && !isInputNumber && !isObjectNumber) {
    const match = input.match(regex)!
    keys.forEach((key, index) => {
      const value = evaluate(match[index + 1] ?? match[1])
      result[key] = call ? call(value) : value
    })
  } else {
    if (isInputNumber) {
      keys.forEach((key, index) => {
        const value = canBeNumbers[index] ?? canBeNumbers[0]
        result[key] = call ? call(value) : value
      })
    } else if (isObjectNumber) {
      keys.forEach((key) => {
        const value = (input as Record<string, number>)[key] ?? 0
        result[key] = call ? call(value) : value
      })
    } else {
      throw new Error(`Invalid input: ${input}`)
    }
  }

  // Apply constraints
  for (const key in result) {
    const value = parseFloat(result[key].toFixed(decimal))
    result[key] = Math.min(Math.max(value, min), max)
  }

  const resStr = pattern.replace(/\{([\w|,]+)\}/g, (_match, key) => {
    const keyArr = key.split(",")
    return keyArr[1] === "hidden" ? "" : String(result[keyArr[0]])
  })

  return {
    array: Object.values(result),
    string: resStr,
    object: result,
  }
}
