import { EditorView, hoverTooltip } from "@codemirror/view"
import { useCallback, useRef } from "react"
import { useEffect } from "react"
import { LanguageServiceWorker, RemoteLanguageServiceWorkerInit } from "../typescript/types"
import * as Comlink from "comlink"
import { Text, type Extension } from "@codemirror/state"
import {
  typescriptHoverTooltips,
  typescriptLintSource,
  typescriptWorkerFacet,
} from "../typescript/client"
import { LanguageSupport } from "@codemirror/language"
import { javascriptLanguage } from "@codemirror/lang-javascript"
import { typescriptCompletionSource } from "../typescript/client/completions"
import { autocompletion } from "@codemirror/autocomplete"
import { linter } from "@codemirror/lint"
import { forceParse } from "../extensions"

type Props = {
  editorView: EditorView | null
  id: string
}

export function useTypescript(props: Props) {
  const { id, editorView } = props

  const workerRef = useRef<Comlink.Remote<LanguageServiceWorker>>()
  const webWorkerRef = useRef<Worker>()

  const createWorker = useCallback(async (): Promise<Extension> => {
    webWorkerRef.current = new Worker(
      new URL("../typescript/worker/typescript-worker.ts", import.meta.url),
      {
        type: "module",
      },
    )

    const { init } = Comlink.wrap<RemoteLanguageServiceWorkerInit>(webWorkerRef.current)

    const workerInstance = await init({
      id,
      content: Comlink.proxy((editorView?.state.doc ?? Text.empty).toJSON()),
    })

    workerRef.current = workerInstance

    if (editorView) {
      forceParse(editorView)
    }

    return [
      typescriptWorkerFacet.of({ worker: workerInstance }),
      new LanguageSupport(javascriptLanguage, [
        javascriptLanguage.data.of({ autocomplete: typescriptCompletionSource }),
      ]),
      autocompletion({ icons: false, aboveCursor: true }),
      linter(typescriptLintSource),
      hoverTooltip(typescriptHoverTooltips, {
        hideOnChange: true,
        hoverTime: 500,
      }),
      EditorView.updateListener.of(async (update) => {
        if (update.docChanged) {
          void workerInstance?.updateFile(update.changes.toJSON())
        }
      }),
    ]
  }, [id, editorView])

  useEffect(() => {
    return () => {
      if (webWorkerRef.current) {
        webWorkerRef.current.terminate()
      }
      workerRef.current = undefined
    }
  }, [])

  return {
    createWorker,
  }
}
