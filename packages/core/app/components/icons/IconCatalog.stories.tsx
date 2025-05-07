import type { Meta, StoryObj } from "@storybook/react"
import * as Icons from "@choiceform/icons-react"
import { iconMetadata } from "@choiceform/icons-react"

const meta = {
  title: "Foundation/Icons", // Title in Storybook sidebar
  parameters: {
    layout: "padded",
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface IconMetadata {
  name: string
  filename: string
  category: string
  tags: string[]
}

// Group icons using the imported metadata
// Correct initialization: declare empty object first
const groupedIcons: Record<string, Array<[string, React.FC<any>, string]>> = {}

// Then iterate over the metadata
;(iconMetadata as IconMetadata[]).forEach(
  ({ name, category, tags: _tags, filename }: IconMetadata) => {
    // Check if the name exists as a property in the imported Icons object
    // AND ensure it's actually a function (React component)
    // AND explicitly exclude the 'iconMetadata' export itself
    if (
      Object.prototype.hasOwnProperty.call(Icons, name) &&
      typeof (Icons as any)[name] === "function" &&
      name !== "iconMetadata"
    ) {
      const component = (Icons as any)[name] as React.FC<any> // Type assertion after checks
      const categoryKey = category === "." ? "General" : category.replace(/^\.?\/?/, "")
      if (!groupedIcons[categoryKey]) {
        groupedIcons[categoryKey] = []
      }
      groupedIcons[categoryKey].push([name, component, filename])
    }
  },
)

// Sort categories (keeping General first)
const sortedCategories = Object.keys(groupedIcons).sort((a, b) => {
  if (a === "General") return -1 // Keep General first
  if (b === "General") return 1
  return a.localeCompare(b)
})

export const Catalog: Story = {
  render: () => (
    <div className="absolute inset-0 p-4 md:p-6">
      {/* Add padding */}
      <h1 className="mb-4 text-xl font-semibold">Icon Catalog</h1>
      <p className="mb-6 text-sm text-gray-600">
        Found {Object.values(groupedIcons).flat().length} icons in
        @choiceform/interface-icon-system.
      </p>
      {/* Render grouped list */}
      {sortedCategories.map((category) => (
        <section
          key={category}
          className="mb-8"
        >
          <h2 className="mb-4 border-b pb-2 text-lg font-semibold capitalize">
            {category === "General"
              ? category
              : category
                  .split("/")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(" / ")}
          </h2>
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            }}
          >
            {groupedIcons[category]
              .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
              .map(([name, IconComponent, filename]) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 rounded border p-3 text-center"
                >
                  <IconComponent />
                  <span className="text-secondary">{filename.replace(".svg", "")}</span>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  ),
}
