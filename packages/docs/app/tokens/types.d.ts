// 解决 React 18/19 类型兼容性问题
import "react"

declare module "react" {
  interface DOMAttributes<T> {
    children?: React.ReactNode | undefined
  }
}
