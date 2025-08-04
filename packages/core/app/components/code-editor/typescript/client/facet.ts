import { Facet, combineConfig } from "@codemirror/state"
import type * as Comlink from "comlink"
import type { LanguageServiceWorker } from "../types"

export const typescriptWorkerFacet = Facet.define<
  { worker: Comlink.Remote<LanguageServiceWorker> },
  { worker: Comlink.Remote<LanguageServiceWorker> }
>({
  combine(configs) {
    return combineConfig(configs, {})
  },
})
