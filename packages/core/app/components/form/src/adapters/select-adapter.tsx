import { Fragment } from "react"
import { Select } from "@choice-ui/select"
import type { SelectAdapterProps } from "../types"
import { BaseAdapter, filterFormProps } from "./base-adapter"

/**
 * Select Adapter for Form system
 */
export function SelectAdapter<T extends string>({
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
}: SelectAdapterProps<T>) {
  const filteredProps = filterFormProps(props)
  const stringValue = String(value || "")

  return (
    <BaseAdapter
      className={className}
      label={label}
      description={description}
      error={error}
      htmlFor={props.name}
    >
      <Select
        value={stringValue}
        onChange={(selectedValue) => onChange?.(selectedValue as T)}
        {...filteredProps}
      >
        <Select.Trigger
          id={props.name}
          onBlur={onBlur}
        >
          <Select.Value>
            {stringValue
              ? options.find((opt) => String(opt.value) === stringValue)?.label
              : placeholder}
          </Select.Value>
        </Select.Trigger>
        <Select.Content>
          {options.map((option) => (
            <Fragment key={String(option.value)}>
              {option.divider ? (
                <Select.Divider />
              ) : option.value === undefined ? (
                <Select.Label>{option.label}</Select.Label>
              ) : (
                <Select.Item value={String(option.value)}>
                  <Select.Value>{option.label}</Select.Value>
                </Select.Item>
              )}
            </Fragment>
          ))}
        </Select.Content>
      </Select>
    </BaseAdapter>
  )
}

// For convenience, export a factory function to create the adapter
export const createSelectAdapter = <T extends string>(
  defaultProps?: Partial<SelectAdapterProps<T>>,
) => {
  const AdapterComponent = (props: SelectAdapterProps<T>) => (
    <SelectAdapter<T>
      {...defaultProps}
      {...props}
    />
  )

  AdapterComponent.displayName = "SelectAdapter"

  return AdapterComponent
}
