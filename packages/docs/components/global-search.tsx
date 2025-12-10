"use client"

import { Command, Dialog, Kbd, Badge } from "@choice-ui/react"
import { SearchSmall, File, Folder, ColorTypeSolid } from "@choiceform/icons-react"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import indexData from "@/generated/index.json"

interface SearchItem {
  id: string
  title: string
  href: string
  category: "component" | "guide" | "token"
  keywords?: string[]
  tags?: string[]
}

// 静态页面数据
const GUIDE_PAGES: SearchItem[] = [
  {
    id: "guide-introduction",
    title: "Introduction",
    href: "/docs/guide/introduction",
    category: "guide",
    keywords: ["getting started", "overview", "intro"],
  },
  {
    id: "guide-installation",
    title: "Installation",
    href: "/docs/guide/installation",
    category: "guide",
    keywords: ["setup", "install", "npm", "pnpm"],
  },
  {
    id: "guide-tailwind-v4",
    title: "Tailwind CSS v4",
    href: "/docs/guide/tailwind-v4",
    category: "guide",
    keywords: ["tailwind", "css", "v4", "styles"],
  },
]

const TOKEN_PAGES: SearchItem[] = [
  {
    id: "tokens-home",
    title: "Design Tokens",
    href: "/docs/tokens",
    category: "token",
    keywords: ["tokens", "design", "variables"],
  },
  {
    id: "tokens-colors",
    title: "Colors",
    href: "/docs/tokens/colors",
    category: "token",
    keywords: ["color", "palette", "theme"],
  },
  {
    id: "tokens-typography",
    title: "Typography",
    href: "/docs/tokens/typography",
    category: "token",
    keywords: ["font", "text", "heading"],
  },
  {
    id: "tokens-spacing",
    title: "Spacing",
    href: "/docs/tokens/spacing",
    category: "token",
    keywords: ["space", "padding", "margin", "gap"],
  },
  {
    id: "tokens-shadows",
    title: "Shadows",
    href: "/docs/tokens/shadows",
    category: "token",
    keywords: ["shadow", "elevation", "depth"],
  },
  {
    id: "tokens-breakpoints",
    title: "Breakpoints",
    href: "/docs/tokens/breakpoints",
    category: "token",
    keywords: ["responsive", "media", "screen"],
  },
]

// 从 index.json 生成组件搜索项
const COMPONENT_ITEMS: SearchItem[] = indexData.components.map((comp) => ({
  id: `component-${comp.slug}`,
  title: comp.title,
  href: `/docs/components/${comp.slug}`,
  category: "component" as const,
  keywords: [comp.name, comp.slug.split("/").pop() ?? ""],
  tags: comp.tags,
}))

const ALL_SEARCH_ITEMS: SearchItem[] = [...GUIDE_PAGES, ...TOKEN_PAGES, ...COMPONENT_ITEMS]

const CATEGORY_LABELS = {
  guide: "Guide",
  token: "Tokens",
  component: "Components",
} as const

const CATEGORY_ICONS = {
  guide: Folder,
  token: ColorTypeSolid,
  component: File,
} as const

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // 监听 meta + k 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 打开时聚焦输入框（延迟确保 Command items 完全注册）
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // 选择项时导航
  const handleSelect = useCallback(
    (item: SearchItem) => {
      setOpen(false)
      router.push(item.href)
    },
    [router],
  )

  // 分组搜索结果
  const groupedItems = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {
      guide: [],
      token: [],
      component: [],
    }

    ALL_SEARCH_ITEMS.forEach((item) => {
      groups[item.category].push(item)
    })

    return groups
  }, [])

  return (
    <>
      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-default-boundary text-secondary-foreground hover:bg-subtle-background flex h-9 w-64 items-center gap-2 rounded-lg border px-3 text-sm transition-colors"
      >
        <SearchSmall className="size-4" />
        <span className="flex-1 text-left">Search...</span>
        <Kbd keys="command">K</Kbd>
      </button>

      {/* 搜索对话框 */}
      <Dialog
        open={open}
        onOpenChange={setOpen}
        outsidePress
        className="overflow-hidden"
        transitionStylesProps={{ duration: 150 }}
      >
        <Dialog.Content className="w-xl overflow-hidden p-0">
          <Command
            loop
            size="large"
          >
            <Command.Input
              ref={inputRef}
              placeholder="Search components, guides, tokens..."
              variant="reset"
              className="mx-0 mb-0 rounded-none border-b"
            />
            <Command.List className="h-80">
              <Command.Empty>
                <div className="flex flex-col items-center justify-center py-12">
                  <SearchSmall className="text-secondary-foreground mb-2 size-8" />
                  <p className="text-secondary-foreground">No results found</p>
                </div>
              </Command.Empty>

              {/* Components 分组 */}
              {groupedItems.component.length > 0 && (
                <Command.Group heading={CATEGORY_LABELS.component}>
                  {groupedItems.component.map((item) => {
                    const Icon = CATEGORY_ICONS[item.category]
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.title}
                        keywords={item.keywords}
                        onSelect={() => handleSelect(item)}
                        prefixElement={
                          <div className="flex size-6 items-center justify-center rounded-md bg-green-100 text-green-600">
                            <Icon className="size-4" />
                          </div>
                        }
                        suffixElement={
                          item.tags?.length ? (
                            <div className="flex gap-1">
                              {item.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                              ))}
                            </div>
                          ) : undefined
                        }
                      >
                        <Command.Value>{item.title}</Command.Value>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
              )}

              {/* Tokens 分组 */}
              {groupedItems.token.length > 0 && (
                <Command.Group heading={CATEGORY_LABELS.token}>
                  {groupedItems.token.map((item) => {
                    const Icon = CATEGORY_ICONS[item.category]
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.title}
                        keywords={item.keywords}
                        onSelect={() => handleSelect(item)}
                        prefixElement={
                          <div className="flex size-6 items-center justify-center rounded-md bg-purple-100 text-purple-600">
                            <Icon className="size-4" />
                          </div>
                        }
                      >
                        <Command.Value>{item.title}</Command.Value>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
              )}

              {/* Guide 分组 */}
              {groupedItems.guide.length > 0 && (
                <Command.Group heading={CATEGORY_LABELS.guide}>
                  {groupedItems.guide.map((item) => {
                    const Icon = CATEGORY_ICONS[item.category]
                    return (
                      <Command.Item
                        key={item.id}
                        value={item.title}
                        keywords={item.keywords}
                        onSelect={() => handleSelect(item)}
                        prefixElement={
                          <div className="flex size-6 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                            <Icon className="size-4" />
                          </div>
                        }
                      >
                        <Command.Value>{item.title}</Command.Value>
                      </Command.Item>
                    )
                  })}
                </Command.Group>
              )}
            </Command.List>

            <Command.Footer>
              <div className="text-secondary-foreground flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Kbd keys="enter" />
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-1">
                  <Kbd keys="up" />
                  <Kbd keys="down" />
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <Kbd keys="escape" />
                  <span>to close</span>
                </div>
              </div>
            </Command.Footer>
          </Command>
        </Dialog.Content>
      </Dialog>
    </>
  )
}
