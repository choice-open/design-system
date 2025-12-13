import { Input } from "@choice-ui/input"
import type { InputAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Input Adapter for Form system
 */
export function InputAdapter<T extends string>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  ...props
}: InputAdapterProps<T>) {
  const filteredProps = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      htmlFor={props.name}
    >
      <Input
        id={props.name}
        value={String(value || "")}
        onChange={(inputValue) => onChange?.(inputValue as T)}
        onBlur={onBlur}
        {...filteredProps}
      />
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createInputAdapter = <T extends string>(
  defaultProps?: Partial<InputAdapterProps<T>>,
) => {
  const AdapterComponent = (props: InputAdapterProps<T>) => (
    <InputAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "InputAdapter"

  return AdapterComponent
}
