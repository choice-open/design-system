import ts from "typescript"

export const TS_COMPLETE_BLOCKLIST: ts.ScriptElementKind[] = [ts.ScriptElementKind.warning]
export const COMPILER_OPTIONS: ts.CompilerOptions = {
  allowJs: true,
  checkJs: true,
  target: ts.ScriptTarget.ESNext,
  lib: ["es2023"],
  module: ts.ModuleKind.ESNext,
  strict: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  importHelpers: false,
  skipDefaultLibCheck: true,
  noEmit: true,
}
export const TYPESCRIPT_AUTOCOMPLETE_THRESHOLD = "15"
export const TYPESCRIPT_FILES = {
  GLOBAL_TYPES: "globals.d.ts",
}
export const LUXON_VERSION = "3.2.0"
