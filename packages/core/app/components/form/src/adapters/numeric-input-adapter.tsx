import { NumericInput } from "@choice-ui/numeric-input"
import type { NumericInputAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * NumericInput Adapter for Form system
 */
export function NumericInputAdapter<T extends number>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  children,
  ...props
}: NumericInputAdapterProps<T>) {
  const filteredProps = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      htmlFor={props.name}
    >
      <NumericInput
        id={props.name}
        value={value}
        onChange={(inputValue) => onChange?.(inputValue as T)}
        onBlur={onBlur}
        {...filteredProps}
      >
        {children}
      </NumericInput>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createNumericInputAdapter = <T extends number>(
  defaultProps?: Partial<NumericInputAdapterProps<T>>,
) => {
  const AdapterComponent = (props: NumericInputAdapterProps<T>) => (
    <NumericInputAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "NumericInputAdapter"

  return AdapterComponent
}
