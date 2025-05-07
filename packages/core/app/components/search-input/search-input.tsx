import { RemoveSmall, SearchSmall } from "@choiceform/icons-react"
import { forwardRef } from "react"
import { useEventCallback } from "usehooks-ts"
import { tcx } from "~/utils"
import { IconButton } from "../icon-button"
import { TextInput, type TextInputProps } from "../text-input"
import { searchInputTv } from "./tv"

export interface SearchInputProps extends TextInputProps {
  className?: string
  classNames?: {
    container?: string
    input?: string
    icon?: string
    action?: string
  }
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  const {
    className,
    classNames,
    placeholder = "Search ...",
    value,
    onChange,
    size,
    ...rest
  } = props

  const styles = searchInputTv({ size })

  const handleClear = useEventCallback(() => {
    onChange?.("")
  })

  return (
    <div className={tcx(styles.container(), classNames?.container, className)}>
      <div className={tcx(styles.icon(), classNames?.icon)}>
        <SearchSmall />
      </div>

      <TextInput
        ref={ref}
        type="text"
        variant="transparent"
        size={size}
        className={tcx(styles.input(), classNames?.input)}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {value && (
        <IconButton
          className={tcx(styles.action(), classNames?.action)}
          variant="ghost"
          tooltip={{ content: "Clear" }}
          onClick={handleClear}
        >
          <RemoveSmall />
        </IconButton>
      )}
    </div>
  )
})

SearchInput.displayName = "SearchInput"
