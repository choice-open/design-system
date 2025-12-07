"use client"
import { memo } from "react"
import styles from "./panel-header.module.css"

interface PanelHeaderProps {
  children: React.ReactNode
}

export const PanelHeader = memo(function PanelHeader(props: PanelHeaderProps) {
  const { children } = props

  return <div className={styles.header}>{children}</div>
})

PanelHeader.displayName = "PanelHeader"
