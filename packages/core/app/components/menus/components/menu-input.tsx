import { forwardRef, useCallback } from "react"
import { type SearchInputProps } from "../../search-input"
import { Input } from "../../input"

export const MenuInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { className, onKeyDown, ...rest } = props

  // 阻止键盘事件冒泡，防止被 useTypeahead 截获
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)

      e.stopPropagation()
    },
    [onKeyDown],
  )

  return (
    <Input
      {...rest}
      ref={ref}
      autoFocus
      onKeyDown={handleKeyDown}
      variant="dark"
    />
  )
})

MenuInput.displayName = "MenuInput"
