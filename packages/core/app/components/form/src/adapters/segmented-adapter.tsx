import { Segmented } from "@choice-ui/segmented"
import type { SegmentedAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Segmented Adapter for Form system
 */
export function SegmentedAdapter<T extends string>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  options,
  ...props
}: SegmentedAdapterProps<T>) {
  const { ref, ...filteredProps } = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      legendMode={true}
    >
      <Segmented
        value={value}
        onChange={(inputValue) => onChange(inputValue as T)}
        onBlur={onBlur}
        onFocus={onFocus}
        {...filteredProps}
      >
        {options?.map((option) => (
          <Segmented.Item
            key={option.value}
            value={option.value as T}
          >
            {option.content}
          </Segmented.Item>
        ))}
      </Segmented>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createSegmentedAdapter = <T extends string>(
  defaultProps?: Partial<SegmentedAdapterProps<T>>,
) => {
  const AdapterComponent = (props: SegmentedAdapterProps<T>) => (
    <SegmentedAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "SegmentedAdapter"

  return AdapterComponent
}
