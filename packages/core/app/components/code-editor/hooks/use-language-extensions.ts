import { useCallback } from "react"
import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useTypescript } from "./use-typescript"
import { javascript } from "@codemirror/lang-javascript"

type Props = {
  editorView: EditorView | null
  id: string
}

export function useLanguageExtensions(props: Props) {
  const { editorView, id } = props

  const { createWorker: createTsWorker } = useTypescript({
    editorView,
    id,
  })

  const getFullLanguageExtensions = useCallback(async (): Promise<Extension[]> => {
    const langExtensions: Extension[] = []
    langExtensions.push(
      javascript({
        jsx: true,
        typescript: true,
      }),
    )

    // 异步加载 TypeScript 扩展
    const tsExtension = await createTsWorker()
    langExtensions.push(tsExtension)

    return langExtensions
  }, [createTsWorker])

  return {
    getFullLanguageExtensions,
  }
}
