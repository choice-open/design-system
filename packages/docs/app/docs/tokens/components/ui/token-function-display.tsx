"use client"
import { memo } from "react"
import styles from "./token-function-display.module.css"

export interface TokenFunctionDisplayProps {
  functionName: string
  value: string | number
  withQuotes?: boolean
}

export const TokenFunctionDisplay = memo((props: TokenFunctionDisplayProps) => {
  const { functionName, value, withQuotes = true } = props

  return (
    <div>
      {"${"}
      {functionName}(
      <span className={styles.assistiveText}>
        {withQuotes && '"'}
        {value}
        {withQuotes && '"'}
      </span>
      ){"}"}
    </div>
  )
})

TokenFunctionDisplay.displayName = "TokenFunctionDisplay"
