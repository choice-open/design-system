import { forwardRef, useEffect } from "react"
import { Input, InputProps } from "~/components"
import { tcx } from "~/utils"
import { useCommand, useCommandState } from "../hooks"
import { commandInputTv } from "../tv"

export interface CommandInputProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  onValueChange?: (search: string) => void
  value?: string
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, onValueChange, value, ...props }, ref) => {
    const isControlled = value != null
    const store = useCommand().store
    const search = useCommandState((state) => state.search)
    const selectedItemId = useCommandState((state) => state.selectedItemId)
    const context = useCommand()

    useEffect(() => {
      if (value != null) {
        store.setState("search", value)
      }
    }, [value, store])

    const tv = commandInputTv({ size: context.size })

    return (
      <div className={tcx(tv.root({ className }))}>
        <Input
          ref={ref}
          {...props}
          className={tcx(tv.input())}
          data-command-input=""
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-autocomplete="list"
          role="combobox"
          aria-expanded={true}
          aria-controls={context.listId}
          aria-labelledby={context.labelId}
          aria-activedescendant={selectedItemId}
          id={context.inputId}
          type="text"
          value={isControlled ? value : search}
          onChange={(value) => {
            if (!isControlled) {
              store.setState("search", value)
            }
            onValueChange?.(value)
          }}
        />
      </div>
    )
  },
)

CommandInput.displayName = "CommandInput"
