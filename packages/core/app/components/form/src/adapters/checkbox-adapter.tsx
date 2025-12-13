import { Checkbox } from "@choice-ui/checkbox"
import type { CheckboxAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Checkbox Adapter for Form system
 */
export function CheckboxAdapter<T extends boolean>({
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
}: CheckboxAdapterProps<T>) {
  const { ref, ...filteredProps } = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      description={description}
      error={error}
      legendMode={true}
    >
      <Checkbox
        value={Boolean(value)}
        onChange={(inputValue) => onChange(inputValue as T)}
        onBlur={onBlur}
        onFocus={onFocus}
        {...filteredProps}
      >
        {label && <Checkbox.Label>{label}</Checkbox.Label>}
      </Checkbox>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createCheckboxAdapter = <T extends boolean>(
  defaultProps?: Partial<CheckboxAdapterProps<T>>,
) => {
  const AdapterComponent = (props: CheckboxAdapterProps<T>) => (
    <CheckboxAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "CheckboxAdapter"

  return AdapterComponent
}
