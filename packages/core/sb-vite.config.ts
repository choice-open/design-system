import tailwindcss from "@tailwindcss/vite"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  process.env = { ...process.env, ...env }
  return {
    plugins: [
      tsconfigPaths(),
      tailwindcss(),
      {
        name: "fix-storybook-modules",
        enforce: "pre",
        resolveId(id) {
          // 处理 addons 模块
          if (id.includes("@storybook/addons")) {
            return "\0virtual:@storybook/addons"
          }
          return null
        },
        load(id) {
          if (id === "\0virtual:@storybook/addons") {
            // 更精确的模拟，包括 getGlobals 方法
            return `
              export const types = { ADDON: 'ADDON', PANEL: 'PANEL', TOOL: 'TOOL', TAB: 'TAB', PREVIEW: 'PREVIEW', NOTES: 'NOTES' };
              
              const channel = {
                emit: () => {},
                on: () => {},
                off: () => {},
                removeListener: () => {},
                addListener: () => {},
              };
              
              const store = {
                getState: () => ({ globals: { locale: 'us' } }),
                setState: () => {},
                subscribe: () => () => {},
              };
              
              export const addons = { 
                getChannel: () => channel,
                getGlobals: () => ({ locale: 'us' }),
                getState: () => ({ globals: { locale: 'us' } }),
              };
              
              export const mockChannel = () => channel;
              export const HooksContext = { channel };
              
              export const applyHooks = () => {};
              export const makeDecorator = () => () => {};
              
              export function useArgs() {
                return [{}, () => {}];
              }
              
              export function useCallback(cb) {
                return cb;
              }
              
              export function useChannel() {
                return () => {};
              }
              
              export function useEffect(cb) {
                typeof cb === 'function' && cb();
                return;
              }
              
              export function useGlobals() {
                return [{ locale: 'us' }, () => {}];
              }
              
              export function useMemo(cb) {
                return typeof cb === 'function' ? cb() : undefined;
              }
              
              export function useParameter() {
                return null;
              }
              
              export function useReducer(reducer, initial) {
                return [initial, () => {}];
              }
              
              export function useState(initial) {
                return [initial, () => {}];
              }
              
              export function useRef(initial) {
                return { current: initial };
              }
              
              export function useStoryContext() {
                return { globals: { locale: 'us' } };
              }
            `
          }
          return null
        },
      },
    ],
    build: {
      target: ["esnext"], // 设置为 esnext 以支持顶层 await
      rollupOptions: {
        // 忽略 eval 警告
        onwarn(warning, warn) {
          if (warning.code === "EVAL" || warning.message?.includes("Use of eval")) {
            return
          }
          warn(warning)
        },
      },
    },
    resolve: {
      alias: {
        "@storybook/addons": "@storybook/manager-api",
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext", // 设置 esbuild 目标也为 esnext
        loader: {
          ".mjs": "js",
        },
      },
    },
  }
})
