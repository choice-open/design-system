import type { ReactNode } from "react"
import { CheckboxProps } from "@choice-ui/checkbox"
import type { ChipsInputProps } from "@choice-ui/chips-input"
import type { InputProps } from "@choice-ui/input"
import { MultiSelectProps } from "@choice-ui/multi-select"
import { NumericInputProps } from "@choice-ui/numeric-input"
import type { RadioGroupProps } from "@choice-ui/radio"
import { RangeProps } from "@choice-ui/range"
import { SegmentedProps } from "@choice-ui/segmented"
import type { SelectProps } from "@choice-ui/select"
import { SwitchProps } from "@choice-ui/switch"
import { TextareaProps } from "@choice-ui/textarea"

/**
 * Form validator type
 */
export type FormValidator<T> = (values: T) => string | void | Promise<string | void>

/**
 * Field validator type
 */
export type FieldValidator<T> = (value: T) => string | void | Promise<string | void>

/**
 * Field validator collection
 */
export interface FieldValidators<T> {
  onBlur?: FieldValidator<T>
  onBlurAsync?: FieldValidator<T>
  onBlurAsyncDebounceMs?: number
  onChange?: FieldValidator<T>
  onChangeAsync?: FieldValidator<T>
  onChangeAsyncDebounceMs?: number
  onSubmit?: FieldValidator<T>
  onSubmitAsync?: FieldValidator<T>
  onSubmitAsyncDebounceMs?: number
}

/**
 * Form configuration
 */
export interface FormConfig<T = Record<string, unknown>> {
  defaultValues?: Partial<T>
  disabled?: boolean
  mode?: "onChange" | "onBlur" | "onSubmit"
  onSubmit?: (values: T) => void | Promise<void>
  validators?: {
    onBlur?: FormValidator<T>
    onBlurAsync?: FormValidator<T>
    onChange?: FormValidator<T>
    onChangeAsync?: FormValidator<T>
    onSubmit?: FormValidator<T>
    onSubmitAsync?: FormValidator<T>
  }
}

/**
 * Field configuration
 */
export interface FieldConfig<T = unknown> {
  component?: React.ComponentType<{
    disabled?: boolean
    error?: string
    errors?: string[]
    onBlur?: () => void
    onChange: (value: T) => void
    placeholder?: string
    required?: boolean
    size?: "default" | "large"
    value: T
    variant?: "default" | "dark"
  }>
  componentProps?: Record<string, unknown>
  description?: string
  disabled?: boolean
  label?: string | ReactNode
  name: string
  placeholder?: string
  required?: boolean
  validators?: FieldValidators<T>
}

/**
 * Form state
 */
export interface FormState<T = Record<string, unknown>> {
  canSubmit: boolean
  errors: Record<string, string[]>
  isDirty: boolean
  isSubmitting: boolean
  isValid: boolean
  touched: Record<string, boolean>
  values: T
}

/**
 * Field state
 */
export interface FieldState<T = unknown> {
  error?: string
  errors: string[]
  isDirty: boolean
  isValid: boolean
  isValidating: boolean
  touched: boolean
  value: T
}

/**
 * Simplified form API type
 */
export interface SimpleFormApi<T = Record<string, unknown>> {
  getFieldValue: (name: keyof T) => T[keyof T]
  handleSubmit: () => void
  reset: () => void
  setFieldValue: (name: keyof T, value: T[keyof T]) => void
  state: FormState<T>
  validateAll: () => void
  validateField: (name: keyof T) => void
}

/**
 * Simplified field API type
 */
export interface SimpleFieldApi<T = unknown> {
  handleBlur: () => void
  handleChange: (value: T) => void
  handleReset: () => void
  state: FieldState<T>
  value: T
}

/**
 * Form context type
 */
export interface FormContextValue<T = Record<string, unknown>> {
  config: FormConfig<T>
  formApi: SimpleFormApi<T>
}

/**
 * Field context type
 */
export interface FieldContextValue<T = unknown> {
  config: FieldConfig<T>
  fieldApi: SimpleFieldApi<T>
  state: FieldState<T>
}

/**
 * Form submit result
 */
export interface FormSubmitResult<T = Record<string, unknown>> {
  errors?: Record<string, string[]>
  success: boolean
  values?: T
}

/**
 * Form component Props
 */
export interface FormProps<T = Record<string, unknown>> extends FormConfig<T> {
  children?: ReactNode
  className?: string
  size?: "default" | "large"
  variant?: "default" | "dark"
}

/**
 * Field component Props
 */
export interface FormFieldProps<T = unknown> extends FieldConfig<T> {
  children?: ReactNode | ((field: SimpleFieldApi<T>) => ReactNode)
  className?: string
  size?: "default" | "large"
  variant?: "default" | "dark"
}

/**
 * Submit button Props
 */
export interface FormSubmitProps {
  children?: ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  size?: "default" | "large"
  variant?: "primary" | "secondary" | "ghost"
}

/**
 * Field error display Props
 */
export interface FormFieldErrorProps {
  className?: string
  error?: string
  errors?: string[]
  variant?: "default" | "dark"
}

/**
 * Field information display Props
 */
export interface FormFieldInfoProps {
  className?: string
  description?: string
  label?: string | ReactNode
  required?: boolean
  variant?: "default" | "dark"
}

/**
 * Form field common properties
 */
export interface FormFieldCommonProps<T = unknown> {
  error?: string
  errors?: string[]
  onBlur?: () => void
  onChange: (value: T) => void
  value: T
}

// ============================================================================
// Adapter base type - Reconstructed type hierarchy
// ============================================================================

/**
 * Form field adapter base properties
 * Contains all form field common properties
 */
export interface FormFieldAdapterProps<T = unknown> {
  /** Field description */
  description?: string | ReactNode
  /** Single error message */
  error?: string | ReactNode
  /** Field label */
  label?: string | ReactNode
  /** Blur callback */
  onBlur?: () => void
  /** Async blur validation */
  onBlurAsync?: () => void
  onBlurAsyncDebounceMs?: number
  /** Value change callback */
  onChange: (value: T) => void
  /** Async value change validation */
  onChangeAsync?: (value: T) => void
  onChangeAsyncDebounceMs?: number
  /** Focus callback */
  onFocus?: () => void
  /** Async focus validation */
  onFocusAsync?: () => void
  onFocusAsyncDebounceMs?: number
  /** Field size */
  size?: "default" | "large"
  /** Field value */
  value: T
}

/**
 * Common adapter property exclusion pattern
 * Define properties to exclude from the original component props
 */
type CommonExcludedProps = "value" | "onChange" | "onBlur" | "onFocus" | "label"
type CommonExcludedPropsWithChildren = CommonExcludedProps | "children"
type CommonExcludedPropsWithSize = CommonExcludedProps | "size"
type CommonExcludedPropsWithChildrenAndSize = CommonExcludedProps | "children" | "size"

/**
 * Select component option type
 */
interface SelectOption<T = string> {
  divider?: boolean
  label?: string | ReactNode
  value?: T
}

/**
 * Segmented component option type
 */
interface SegmentedOption<T = string> {
  content?: string | ReactNode
  value?: T
}

/**
 * Base adapter factory type
 * Used to create standard adapter types
 */
export type BaseAdapterProps<
  TComponent,
  TValue,
  TExcluded extends string = CommonExcludedProps,
> = Omit<TComponent, TExcluded> & FormFieldAdapterProps<TValue>

/**
 * Adapter factory type with size exclusion
 * Used to create adapter types that need to exclude the size property
 */
export type AdapterPropsWithoutSize<
  TComponent,
  TValue,
  TExcluded extends string = CommonExcludedProps,
> = Omit<TComponent, TExcluded> & Omit<FormFieldAdapterProps<TValue>, "size">

/**
 * Select adapter factory type
 * Used to create adapter types that need to exclude the options and placeholder properties
 */
export type SelectAdapterPropsBase<
  TComponent,
  TValue,
  TExcluded extends string = CommonExcludedPropsWithChildrenAndSize,
> = Omit<TComponent, TExcluded> &
  FormFieldAdapterProps<TValue> & {
    name?: string
    options?: SelectOption<TValue>[]
    placeholder?: string
  }

// ============================================================================
// Specific adapter type definitions
// ============================================================================

/**
 * Text input adapter (Input, Textarea)
 */
export type InputAdapterProps<T extends string = string> = BaseAdapterProps<
  InputProps,
  T,
  CommonExcludedPropsWithSize
>

export type TextareaAdapterProps<T extends string = string> = BaseAdapterProps<
  TextareaProps,
  T,
  CommonExcludedPropsWithSize
>

/**
 * Select adapter (Select, MultiSelect)
 */
export type SelectAdapterProps<T extends string = string> = SelectAdapterPropsBase<SelectProps, T>

export type MultiSelectAdapterProps<T extends string = string> = Omit<
  MultiSelectProps,
  CommonExcludedPropsWithChildrenAndSize
> &
  FormFieldAdapterProps<T[]> & {
    name?: string
    options?: SelectOption<T>[]
    placeholder?: string
  }

/**
 * Boolean adapter (Checkbox, Switch)
 */
export interface CheckboxAdapterProps<T extends boolean = boolean>
  extends
    Omit<CheckboxProps, CommonExcludedPropsWithChildrenAndSize>,
    Omit<FormFieldAdapterProps<T>, "value"> {
  value: T | undefined
}

export type SwitchAdapterProps<T extends boolean = boolean> = BaseAdapterProps<
  SwitchProps,
  T,
  CommonExcludedPropsWithChildrenAndSize
>

/**
 * Number adapter (Range, NumericInput)
 */
export type RangeAdapterProps<T extends number = number> = BaseAdapterProps<
  RangeProps,
  T,
  CommonExcludedPropsWithChildrenAndSize
>

export type NumericInputAdapterProps<T extends number = number> = AdapterPropsWithoutSize<
  NumericInputProps,
  T
>

/**
 * Single select adapter (RadioGroup, Segmented)
 */
export type RadioGroupAdapterProps<T extends string = string> = BaseAdapterProps<
  RadioGroupProps,
  T,
  CommonExcludedPropsWithChildrenAndSize
>

export type SegmentedAdapterProps<T extends string = string> = Omit<
  SegmentedProps,
  CommonExcludedPropsWithChildrenAndSize
> &
  FormFieldAdapterProps<T> & {
    options?: SegmentedOption<T>[]
  }

/**
 * Tags input adapter (ChipsInput)
 */
export type ChipsInputAdapterProps<T extends string = string> = Omit<
  ChipsInputProps,
  CommonExcludedPropsWithChildrenAndSize
> &
  FormFieldAdapterProps<T[]> & {
    name?: string
  }
