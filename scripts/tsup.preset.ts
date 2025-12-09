/**
 * 组件 tsup 构建预设配置
 *
 * 用法：
 * ```ts
 * // tsup.config.ts
 * import { createComponentConfig } from "../../../scripts/tsup.preset"
 * export default createComponentConfig()
 * ```
 *
 * 自定义：
 * ```ts
 * export default createComponentConfig({
 *   entry: ["src/index.ts", "src/utils.ts"],
 *   external: ["some-heavy-dep"],
 * })
 * ```
 */

import type { Options } from "tsup"

interface ComponentConfigOptions {
  /** 入口文件，默认 ["src/index.ts"] */
  entry?: string[]
  /** 额外的外部依赖 */
  external?: (string | RegExp)[]
  /** 是否生成 sourcemap，默认 true */
  sourcemap?: boolean
  /** 是否压缩，默认 false */
  minify?: boolean
}

export function createComponentConfig(options: ComponentConfigOptions = {}): Options {
  const { entry = ["src/index.ts"], external = [], sourcemap = true, minify = false } = options

  return {
    entry,
    format: ["cjs", "esm"],
    dts: true,
    sourcemap,
    clean: true,
    minify,
    treeshake: true,
    external: [
      // React 相关
      "react",
      "react-dom",
      "react/jsx-runtime",
      // 内部包 - 作为 peer dependency
      /^@choice-ui\//,
      /^@choiceform\//,
      // 用户提供的额外外部依赖
      ...external,
    ],
    esbuildOptions(options) {
      options.jsx = "automatic"
    },
  }
}

export default createComponentConfig
