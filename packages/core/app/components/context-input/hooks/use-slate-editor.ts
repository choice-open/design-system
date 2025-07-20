import { useMemo } from "react"
import { createEditor } from "slate"
import { withHistory } from "slate-history"
import { withReact } from "slate-react"
import { withMentions } from "../extensions/with-mentions"

export const useSlateEditor = () => {
  const editor = useMemo(() => withMentions(withHistory(withReact(createEditor()))), [])

  return editor
}
