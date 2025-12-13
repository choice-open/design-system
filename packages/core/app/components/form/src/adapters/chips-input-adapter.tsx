import { ChipsInput } from "@choice-ui/chips-input"
import type { ChipsInputAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * ChipsInput Adapter for Form system
 */
export function ChipsInputAdapter<T extends string>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  ...props
}: ChipsInputAdapterProps<T>) {
  const filteredProps = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      htmlFor={props.name}
    >
      <ChipsInput
        id={props.name}
        value={value}
        onChange={(chips: string[]) => onChange?.(chips as T[])}
        onBlur={onBlur}
        {...filteredProps}
      />
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createChipsInputAdapter = <T extends string>(
  defaultProps?: Partial<ChipsInputAdapterProps<T>>,
) => {
  const AdapterComponent = (props: ChipsInputAdapterProps<T>) => (
    <ChipsInputAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "ChipsInputAdapter"

  return AdapterComponent
}
