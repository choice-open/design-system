"use client"

import { ComponentPreview } from "@/components/component-preview"
import { Installation } from "@/components/installation"
import { Button } from "@/components/ui"
import indexData from "@/generated/index.json"
import { storyRegistry } from "@/generated/registry"
import { Github } from "@choiceform/icons-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { use, useEffect, useState } from "react"
import { MdRender } from "~/components/md-render"

type StoryExport = { render?: () => ReactNode } | ((props?: Record<string, unknown>) => ReactNode)

type PropsGroup = {
  displayName?: string
  description?: string
  props?: {
    name: string
    type: string
    required: boolean
    defaultValue?: string
    description?: string
  }[]
}

type StoryItem = {
  id: string
  name: string
  exportName: string
  description: string
  source?: string
}

type IndexItem = {
  slug: string
  name: string
  title: string
  description: string
  version: string
}

type ComponentDetail = {
  slug: string
  title: string
  package: {
    name: string
    version: string
    description: string
    dependencies: Record<string, string>
    peerDependencies?: Record<string, string>
  }
  exports: string[]
  props: PropsGroup[]
  stories: StoryItem[]
}

function slugifyPart(part: string): string {
  return part
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
}

function cleanDescription(text?: string): string {
  if (!text) return ""
  const withoutCode = text.replace(/```[\s\S]*?```/g, "")
  const withoutExample = withoutCode.replace(/@example[\s\S]*/gi, "")
  const firstLine = withoutExample
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)[0]
  return firstLine ?? ""
}

function StoryRenderer({
  moduleExports,
  exportName,
}: {
  moduleExports: Record<string, unknown> | undefined
  exportName: string
}) {
  const emptyMessage = (
    <span className="text-muted-foreground text-sm">该 story 暂无可渲染内容。</span>
  )

  if (!moduleExports) return emptyMessage

  const storyExport = moduleExports[exportName] as StoryExport | undefined
  if (!storyExport) return emptyMessage

  if (typeof storyExport === "function") {
    const Component = storyExport
    return <Component />
  }

  if (
    typeof storyExport === "object" &&
    storyExport !== null &&
    "render" in storyExport &&
    typeof storyExport.render === "function"
  ) {
    const Component = storyExport.render
    return <Component />
  }

  return emptyMessage
}

function getStoryCode(source?: string): string {
  return source?.trim() || ""
}

function formatDescription(description: string) {
  if (!description) return null
  return description.split("\n").map((line, idx) => (
    <p
      key={idx}
      className="md-p"
    >
      {line}
    </p>
  ))
}

export default function DocsCatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug ?? []
  const slugKey = slug.map(slugifyPart).join("/")

  // 查找索引项
  const indexItem = (indexData.components as IndexItem[]).find((item) => item.slug === slugKey)
  const storyModule = storyRegistry[slugKey] as Record<string, unknown> | undefined

  // 动态加载组件详情
  const [detail, setDetail] = useState<ComponentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!indexItem) {
      setLoading(false)
      return
    }

    const fileName = slugKey.replace(/\//g, "-") + ".json"
    import(`@/generated/components/${fileName}`)
      .then((mod) => {
        setDetail(mod.default as ComponentDetail)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [slugKey, indexItem])

  if (!indexItem) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">未找到组件</h1>
        <p className="text-muted-foreground text-sm">请检查路径或选择侧栏中的组件。</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-96 animate-pulse rounded bg-gray-200" />
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">加载失败</h1>
        <p className="text-muted-foreground text-sm">无法加载组件详情。</p>
      </div>
    )
  }

  return (
    <>
      <div className="min-w-0 space-y-8">
        <div className="md space-y-2">
          <h1 className="md-h1">{detail.title}</h1>
          {formatDescription(detail.package.description)}

          <div className="mt-4 flex gap-4">
            <Button
              asChild
              variant="solid"
              size="large"
            >
              <Link
                href={`http://storybook.choice-ui.com/components/${detail.package.name.replace("@choice-ui/", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  focusable="false"
                  height="1em"
                  viewBox="0 0 512 512"
                  width="1em"
                  className="text-lg text-[#ff4785]"
                >
                  <g>
                    <path
                      d="M356.5,5.2L353.9,63c-0.1,3.2,3.7,5.2,6.3,3.2l22.6-17.1L401.9,64c2.5,1.7,5.8,0,6-3l-2.2-58.8l28.4-2.2   c14.7-1,27.3,10.8,27.3,25.6v460.8c0,14.7-12.3,26.3-26.9,25.6L91.1,496.6c-13.3-0.6-24.1-11.3-24.5-24.7l-16-422.3   c-0.8-14.2,9.9-26.3,24.1-27.1L356.2,4.7L356.5,5.2z M291,198.4c0,10,67.4,5.1,76.6-1.7c0-68.2-36.7-104.3-103.6-104.3   c-67.2,0-104.5,36.8-104.5,91.6c0,94.9,128,96.6,128,148.4c0,15-6.8,23.5-22.4,23.5c-20.5,0-28.8-10.4-27.7-46.1   c0-7.7-77.8-10.3-80.4,0c-5.7,86,47.6,110.9,108.7,110.9c59.6,0,106.1-31.7,106.1-89.1c0-101.7-130.1-99-130.1-149.3   c0-20.7,15.4-23.4,24.1-23.4c9.7,0,26.7,1.5,25.4,39.8L291,198.4z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
                Storybook
              </Link>
            </Button>
            <Button
              asChild
              variant="solid"
              size="large"
            >
              <Link
                href={`https://github.com/choice-open/choice-ui/tree/main/packages/core/app/components/${detail.package.name.replace("@choice-ui/", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  focusable="false"
                  height="1em"
                  stroke="currentColor"
                  stroke-width="0"
                  viewBox="0 0 576 512"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-xl text-[#E53E3E]"
                >
                  <path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"></path>
                </svg>
                {detail.package.name}
              </Link>
            </Button>
            <Button
              asChild
              variant="solid"
              size="large"
            >
              <Link
                href={`https://github.com/choice-open/choice-ui/tree/main/packages/core/app/components/${detail.package.name.replace("@choice-ui/", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                View Source
              </Link>
            </Button>
          </div>
        </div>

        <div>
          <Installation
            packageName={detail.package.name}
            components={detail.exports}
          />
        </div>

        <div className="space-y-10">
          {detail.stories.map((story) => {
            const code = getStoryCode(story.source)
            const anchor = slugifyPart(story.name || story.id)

            return (
              <section
                key={story.id}
                id={anchor}
                className="space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-medium">{story.name}</h2>
                </div>

                {story.description ? <MdRender content={story.description} /> : null}

                <ComponentPreview
                  code={code}
                  language="tsx"
                >
                  <StoryRenderer
                    moduleExports={storyModule}
                    exportName={story.exportName}
                  />
                </ComponentPreview>
              </section>
            )
          })}

          {detail.props && detail.props.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">API</h2>
              {detail.props.map((group, idx) => (
                <div
                  key={`${group.displayName ?? idx}-${idx}`}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{group.displayName || detail.title}</p>
                    {cleanDescription(group.description) ? (
                      <span className="text-muted-foreground">
                        {cleanDescription(group.description)}
                      </span>
                    ) : null}
                  </div>
                  <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-left">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="w-1/5 px-4 py-2 font-semibold">Prop</th>
                          <th className="w-2/5 px-4 py-2 font-semibold">Type</th>
                          <th className="w-1/5 px-4 py-2 font-semibold">Default</th>
                          <th className="w-1/5 px-4 py-2 font-semibold">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(group.props ?? []).map((prop) => (
                          <tr
                            key={prop.name}
                            className="border-t"
                          >
                            <td className="px-4 py-2 font-mono">{prop.name}</td>
                            <td className="px-4 py-2 font-mono whitespace-pre-wrap">{prop.type}</td>
                            <td className="text-muted-foreground px-4 py-2 font-mono">
                              {prop.defaultValue ?? "—"}
                            </td>
                            <td className="text-muted-foreground px-4 py-2">
                              {cleanDescription(prop.description) || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </section>
          ) : null}
        </div>
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-24 space-y-3">
          <div className="text-xs font-semibold">On this page</div>
          <div className="space-y-2">
            {detail.stories.map((story) => {
              const anchor = slugifyPart(story.name || story.id)
              return (
                <a
                  key={story.id}
                  href={`#${anchor}`}
                  className="block text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  {story.name}
                </a>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
