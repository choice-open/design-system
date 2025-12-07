"use client"
import { memo } from "react"
import styles from "./page-container.module.css"

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = memo(function PageContainer(props: PageContainerProps) {
  const { children } = props

  return <div className={styles.pageContainer}>{children}</div>
})

PageContainer.displayName = "PageContainer"
