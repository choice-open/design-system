import { Range } from "@choice-ui/range"
import type { RangeAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Range Adapter for Form system
 */
export function RangeAdapter<T extends number>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  onFocus,
  ...props
}: RangeAdapterProps<T>) {
  const { ...filteredProps } = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      legendMode={true}
    >
      <div className="flex items-center gap-2">
        <Range
          value={value}
          onChange={(inputValue) => onChange(inputValue as T)}
          {...filteredProps}
        />
        <div className="flex-1 text-right">{value}</div>
      </div>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createRangeAdapter = <T extends number>(
  defaultProps?: Partial<RangeAdapterProps<T>>,
) => {
  const AdapterComponent = (props: RangeAdapterProps<T>) => (
    <RangeAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "RangeAdapter"

  return AdapterComponent
}
