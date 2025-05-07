import { forwardRef, memo, useCallback } from "react"
import { useI18nContext } from "~/i18n"
import { tcx } from "~/utils"
import { Button } from "../../button"
import { SearchInput, type SearchInputProps } from "../../search-input"
import { MenuSearchEmptyTv, MenuSearchTv } from "../tv"

export const MenuSearch = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const { className, onKeyDown, ...rest } = props
  const styles = MenuSearchTv()

  // 阻止键盘事件冒泡，防止被 useTypeahead 截获
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)

      e.stopPropagation()
    },
    [onKeyDown],
  )

  return (
    <SearchInput
      {...rest}
      ref={ref}
      autoFocus
      onKeyDown={handleKeyDown}
      classNames={{
        container: styles.container(),
        icon: styles.icon(),
        action: styles.action(),
      }}
    />
  )
})

MenuSearch.displayName = "MenuSearch"

interface MenuSearchEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  onClear?: () => void
  children?: React.ReactNode
}

export const MenuSearchEmpty = memo(function MenuSearchEmpty(props: MenuSearchEmptyProps) {
  const { onClear, className, children, ...rest } = props
  const { LL } = useI18nContext()
  const styles = MenuSearchEmptyTv()

  return (
    <div
      {...rest}
      className={tcx(styles.root(), className)}
    >
      {children}
      <span className={styles.text()}>{LL.menus.searchEmpty()}</span>
      <Button
        variant="link"
        onClick={onClear}
      >
        {LL.menus.searchEmptyButton()}
      </Button>
    </div>
  )
})

MenuSearchEmpty.displayName = "MenuSearchEmpty"
