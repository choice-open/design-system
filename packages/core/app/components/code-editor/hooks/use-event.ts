import { EditorView } from "@codemirror/view"
import { RefObject, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import { closeCompletion } from "@codemirror/autocomplete"
import { closeCursorInfoBox } from "../extensions"

export function useEvent(editorViewRef: RefObject<EditorView | null>) {
  const [dragging, setDragging] = useState(false)

  const blur = useEventCallback(() => {
    const editor = editorViewRef.current
    if (editor) {
      editor.contentDOM.blur()

      closeCompletion(editor)
      closeCursorInfoBox(editor)
    }
  })

  const blurOnClickOutside = useEventCallback((event: MouseEvent) => {
    if (event.target && !dragging && !editorViewRef.current?.dom.contains(event.target as Node)) {
      blur()
    }

    setDragging(false)
  })

  return {
    blur,
    blurOnClickOutside,
  }
}
