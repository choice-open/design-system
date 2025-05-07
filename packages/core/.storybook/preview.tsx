import { Hide, Show } from "@choiceform/icons-react"
import { useGlobals } from "@storybook/addons"
import type { Decorator } from "@storybook/react"
import { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"
import React, { useCallback, useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"
import { Prism } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Splitter, ToggleButton, TooltipProvider } from "../app/components"
import { Locales } from "../app/i18n"
import TypesafeI18n, { useI18nContext } from "../app/i18n/i18n-react"
import { loadAllLocalesAsync } from "../app/i18n/i18n-util.async"
import "../app/tailwind.css"
import "./global.css"

const SyntaxHighlighter = Prism as unknown as React.ComponentType<any>

await loadAllLocalesAsync()

const LOCALES = [
  { value: "us", label: "🇺🇸 English" },
  { value: "cn", label: "🇨🇳 中文" },
]

const commonTheme = {
  brandTitle: "@choiceform/design-system",
  brandUrl: "https://choiceform.com",
  brandTarget: "_self",
}

declare global {
  interface Window {
    prettier: {
      format: (code: string, options: Record<string, unknown>) => string
    }
    prettierPlugins: {
      html?: unknown
      typescript?: unknown
      babel?: unknown
    }
  }
}

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const withCustomDecorator: Decorator = (StoryFn, context) => {
  const [formattedCode, setFormattedCode] = useState("")
  const [formattedTypes, setFormattedTypes] = useState("")
  const scriptsLoadedRef = useRef(false)

  const loadPrettier = useCallback(async () => {
    if (scriptsLoadedRef.current) return

    try {
      await Promise.all([
        loadScript("https://unpkg.com/prettier@2.8.8/standalone.js"),
        loadScript("https://unpkg.com/prettier@2.8.8/parser-typescript.js"),
        loadScript("https://unpkg.com/prettier@2.8.8/parser-babel.js"),
      ])
      scriptsLoadedRef.current = true
    } catch (error) {
      console.error("Failed to load Prettier:", error)
    }
  }, [])

  const formatCode = useCallback(
    async (code: string) => {
      try {
        await loadPrettier()

        let processedCode = code
        if (code.startsWith("{\n  render:")) {
          processedCode = code
            .replace(/^{\s*render:\s*/, "")
            .replace(/}$/, "")
            .trim()
        }

        if (!window.prettier) return code

        const formatted = window.prettier.format(processedCode, {
          parser: "typescript",
          plugins: [window.prettierPlugins.typescript, window.prettierPlugins.babel],
          semi: true,
          singleQuote: false,
          printWidth: 70,
          tabWidth: 2,
          bracketSpacing: true,
          jsxBracketSameLine: false,
          arrowParens: "avoid",
        })
        return formatted
      } catch (error) {
        console.error("Failed to format code:", error)
        return code
      }
    },
    [loadPrettier],
  )

  useEffect(() => {
    return () => {
      setFormattedCode("")
      setFormattedTypes("")
    }
  }, [])

  useEffect(() => {
    let mounted = true

    if (context.parameters?.docs?.source?.originalSource) {
      formatCode(context.parameters.docs.source.originalSource).then((code) => {
        if (mounted) {
          setFormattedCode(code)
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [context.parameters?.docs?.source?.originalSource, formatCode])

  useEffect(() => {
    let mounted = true

    if (context.argTypes) {
      const typeString = Object.entries(context.argTypes)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => {
          const typeValue = Array.isArray((value.type as any)?.value)
            ? (value.type as any).value.map((v: string) => `"${v}"`).join(" | ")
            : ((value.type as any)?.value ?? value.type?.name)

          // Quote property names that contain hyphens or other special characters
          const propName = /[-\s]/.test(key) ? `"${key}"` : key

          return `${propName}: ${typeValue};`
        })
        .join("\n")

      formatCode(`interface Props {\n${typeString}\n}`).then((code) => {
        if (mounted) {
          setFormattedTypes(code)
        }
      })
    }

    return () => {
      mounted = false
    }
  }, [context.argTypes, formatCode])

  const title = context.title
  const componentName = context.component?.displayName
  const name = context.parameters?.docs?.title ?? context.name
  const type = context.argTypes
  const description =
    context.parameters?.docs?.description?.story || context.parameters?.docs?.description?.component
  const source = context.parameters?.docs?.source?.originalSource

  // Use localStorage to persist the visible state across stories
  const [visible, setVisible] = useState(() => {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("storybook-docs-visible")
      return savedState === null ? true : savedState === "true"
    }
    return true
  })

  // Update localStorage when visible state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("storybook-docs-visible", String(visible))
    }
  }, [visible])

  return (
    <TooltipProvider>
      <div className="app h-screen w-full">
        <ToggleButton
          value={visible}
          onChange={setVisible}
          className="absolute top-2 right-2 z-2"
        >
          {visible ? <Hide /> : <Show />}
        </ToggleButton>
        <Splitter defaultSizes={[1024, 360]}>
          <Splitter.Pane className="bg-default-background flex flex-col items-center justify-center">
            <StoryFn />
          </Splitter.Pane>
          <Splitter.Pane visible={visible}>
            <article className="prose-pre:p-0 prose-pre:text-(--code-text) prose-sm prose-neutral prose dark:prose-invert h-full w-full max-w-none overflow-y-auto border-l px-4 pb-16">
              {name && (
                <div className="bg-default-background sticky top-0 mb-4 flex flex-col border-b py-4">
                  <span className="text-secondary-foreground text-xl">{title}</span>
                  <h3 className="mt-0 mb-0 text-lg">
                    {componentName} / {name}
                  </h3>
                </div>
              )}

              {description && (
                <Markdown
                  children={description}
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props
                      const match = /language-(\w+)/.exec(className || "")
                      return match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={oneLight}
                          customStyle={{
                            fontSize: 11,
                            fontFamily: "var(--font-mono)",
                            backgroundColor: "var(--code-background)",
                            borderRadius: "5px",
                          }}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          {...rest}
                          className={className}
                        >
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              )}

              <hr className="mt-4 mb-4" />

              <p>Types</p>
              {type && (
                <SyntaxHighlighter
                  language="typescript"
                  style={oneLight}
                  customStyle={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    backgroundColor: "var(--code-background)",
                    borderRadius: "5px",
                  }}
                >
                  {formattedTypes || ""}
                </SyntaxHighlighter>
              )}

              <p>Source</p>
              {source && (
                <SyntaxHighlighter
                  language="tsx"
                  style={oneLight}
                  wrapLines={true}
                  wrapLongLines={true}
                  customStyle={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    backgroundColor: "var(--code-background)",
                    borderRadius: "5px",
                  }}
                >
                  {formattedCode || source}
                </SyntaxHighlighter>
              )}
            </article>
          </Splitter.Pane>
        </Splitter>
      </div>
    </TooltipProvider>
  )
}

const I18nInitializer = ({ locale }: { locale: string }) => {
  const { setLocale } = useI18nContext()

  useEffect(() => {
    setLocale((locale as Locales) ?? "us")
  }, [locale])

  return <div></div>
}

const withI18n: Decorator = (Story, context) => {
  const [globals] = useGlobals()
  const locale = globals.locale || "us"

  return (
    <TypesafeI18n locale={locale}>
      <I18nInitializer locale={locale} />
      <Story {...context} />
    </TypesafeI18n>
  )
}

const preview: Preview = {
  decorators: [withCustomDecorator, withI18n, (Story) => <Story />],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    darkMode: {
      classTarget: "html",
      stylePreview: true,
      dark: {
        ...themes.dark,
        ...commonTheme,
        appBg: "#161616",
        barBg: "black",
        background: "black",
        appContentBg: "black",
        appBorderRadius: 14,
      },
      light: {
        ...themes.light,
        ...commonTheme,
        appBorderRadius: 14,
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Language",
      description: "Select language",
      defaultValue: "us",
      toolbar: {
        icon: "globe",
        items: LOCALES.map(({ value, label }) => ({ value, title: label })),
        dynamicTitle: true,
      },
    },
  },
}

export default preview
