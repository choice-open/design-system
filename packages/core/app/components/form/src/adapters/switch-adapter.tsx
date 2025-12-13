import { Switch } from "@choice-ui/switch"
import type { SwitchAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Switch Adapter for Form system
 */
export function SwitchAdapter<T extends boolean>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  ...props
}: SwitchAdapterProps<T>) {
  const { ref, ...filteredProps } = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      legendMode={true}
    >
      <Switch
        value={Boolean(value)}
        onChange={(inputValue) => onChange(inputValue as T)}
        onBlur={onBlur}
        onFocus={onFocus}
        label={name}
        {...filteredProps}
      />
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createSwitchAdapter = <T extends boolean>(
  defaultProps?: Partial<SwitchAdapterProps<T>>,
) => {
  const AdapterComponent = (props: SwitchAdapterProps<T>) => (
    <SwitchAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "SwitchAdapter"

  return AdapterComponent
}
