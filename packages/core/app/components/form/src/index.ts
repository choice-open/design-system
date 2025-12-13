// Export adapters
export {
  CheckboxAdapter,
  ChipsInputAdapter,
  InputAdapter,
  MultiSelectAdapter,
  NumericInputAdapter,
  RadioGroupAdapter,
  RangeAdapter,
  SegmentedAdapter,
  SelectAdapter,
  SwitchAdapter,
  TextareaAdapter,
} from "./adapters"

// Export types
export type * from "./types"

// Import TanStack Form
import { useForm as useTanStackForm } from "@tanstack/react-form"
export * as TanstackReactForm from "@tanstack/react-form"
import { Button } from "@choice-ui/button"
// Import adapters directly from their individual files to avoid circular dependency
import { CheckboxAdapter } from "./adapters/checkbox-adapter"
import { ChipsInputAdapter } from "./adapters/chips-input-adapter"
import { InputAdapter } from "./adapters/input-adapter"
import { MultiSelectAdapter } from "./adapters/multi-select-adapter"
import { NumericInputAdapter } from "./adapters/numeric-input-adapter"
import { RadioGroupAdapter } from "./adapters/raido-group-adapter"
import { RangeAdapter } from "./adapters/range-adapter"
import { SegmentedAdapter } from "./adapters/segmented-adapter"
import { SelectAdapter } from "./adapters/select-adapter"
import { SwitchAdapter } from "./adapters/switch-adapter"
import { TextareaAdapter } from "./adapters/textarea-adapter"

/**
 * Enhanced useForm hook
 * Add adapter components to the TanStack Form
 */
export function useForm(options: {
  [key: string]: unknown
  defaultValues?: Record<string, unknown>
  onSubmit?: (formApi: { value: unknown }) => void | Promise<void>
}) {
  const form = useTanStackForm(options)

  // Add adapter components to the form object
  const enhancedForm = Object.assign(form, {
    Button: Button,
    Checkbox: CheckboxAdapter,
    ChipsInput: ChipsInputAdapter,
    Input: InputAdapter,
    MultiSelect: MultiSelectAdapter,
    NumericInput: NumericInputAdapter,
    RadioGroup: RadioGroupAdapter,
    Range: RangeAdapter,
    Segmented: SegmentedAdapter,
    Select: SelectAdapter,
    Switch: SwitchAdapter,
    Textarea: TextareaAdapter,
  })

  return enhancedForm
}
