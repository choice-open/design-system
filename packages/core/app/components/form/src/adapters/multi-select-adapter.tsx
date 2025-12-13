import { MultiSelect } from "@choice-ui/multi-select"
import { Fragment } from "react"
import type { MultiSelectAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * MultiSelect Adapter for Form system
 */
export function MultiSelectAdapter<T extends string>({
  className,
  label,
  description,
  error,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder,
  ...props
}: MultiSelectAdapterProps<T>) {
  const filteredProps = filterFormProps(props)

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      htmlFor={props.name}
    >
      <MultiSelect
        values={value}
        onChange={(value) => onChange?.(value as T[])}
        {...filteredProps}
      >
        <MultiSelect.Trigger
          placeholder={placeholder}
          getDisplayValue={(displayValue) => {
            const option = options.find((opt) => String(opt.value) === displayValue)
            return option?.label ? String(option.label) : displayValue
          }}
        />

        <MultiSelect.Content>
          {options.map((option) => (
            <Fragment key={String(option.value)}>
              {option.divider ? (
                <MultiSelect.Divider />
              ) : option.value === undefined ? (
                <MultiSelect.Label>{option.label}</MultiSelect.Label>
              ) : (
                <MultiSelect.Item value={String(option.value)}>
                  <MultiSelect.Value>{option.label}</MultiSelect.Value>
                </MultiSelect.Item>
              )}
            </Fragment>
          ))}
        </MultiSelect.Content>
      </MultiSelect>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createMultiSelectAdapter = <T extends string>(
  defaultProps?: Partial<MultiSelectAdapterProps<T>>,
) => {
  const AdapterComponent = (props: MultiSelectAdapterProps<T>) => (
    <MultiSelectAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "MultiSelectAdapter"

  return AdapterComponent
}
