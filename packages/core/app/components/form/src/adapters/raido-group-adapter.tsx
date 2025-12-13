import { RadioGroup } from "@choice-ui/radio"
import type { RadioGroupAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * RadioGroup Adapter for Form system
 */
export function RadioGroupAdapter<T extends string>({
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
}: RadioGroupAdapterProps<T>) {
  const { ref, ...filteredProps } = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      legendMode={true}
    >
      <RadioGroup
        value={value}
        onChange={(inputValue) => onChange(inputValue as T)}
        onBlur={onBlur}
        onFocus={onFocus}
        {...filteredProps}
      />
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createRadioGroupAdapter = <T extends string>(
  defaultProps?: Partial<RadioGroupAdapterProps<T>>,
) => {
  const AdapterComponent = (props: RadioGroupAdapterProps<T>) => (
    <RadioGroupAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "RadioGroupAdapter"

  return AdapterComponent
}
