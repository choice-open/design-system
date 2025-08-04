import { EditorSelection, Facet } from "@codemirror/state"
import type { EditorView } from "@codemirror/view"
import { formatWithCursor, type BuiltInParserName } from "prettier"
import babelPlugin from "prettier/plugins/babel"
import estreePlugin from "prettier/plugins/estree"

export function formatDocument(view: EditorView) {
  function format(parser: BuiltInParserName) {
    void formatWithCursor(view.state.doc.toString(), {
      cursorOffset: view.state.selection.main.anchor,
      parser,
      plugins: [babelPlugin, estreePlugin],
    }).then(({ formatted, cursorOffset }) => {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: formatted,
        },
        selection: EditorSelection.single(cursorOffset),
      })
    })
  }

  format("babel")
  return true
}
