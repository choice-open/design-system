"use client"
import styles from "./share.module.css"

export const Container = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => <div className={`${styles.container} ${className || ""}`}>{children}</div>

export const SpacingGrid = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => <div className={`${styles.spacingGrid} ${className || ""}`}>{children}</div>

export const SpacingBar = ({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) => (
  <div
    className={`${styles.spacingBar} ${className || ""}`}
    style={style}
  />
)

export const SpacingValue = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => <span className={`${styles.spacingValue} ${className || ""}`}>{children}</span>

export const SpacingLabel = ({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) => <span className={`${styles.spacingLabel} ${className || ""}`}>{children}</span>

export const SpacingDivider = ({ className }: { className?: string }) => (
  <div className={`${styles.spacingDivider} ${className || ""}`} />
)
