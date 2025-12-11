import type { PaginationRootProps } from "@choice-ui/react"
import { Button, Label, Pagination, ScrollArea } from "@choice-ui/react"
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An advanced pagination component with multiple display options, page size selection, and jump-to-page functionality.",
      },
    },
  },
  tags: ["autodocs", "new"],
}

export default meta
type Story = StoryObj<typeof meta>

// Helper component for controlled stories - using default layout
const PaginationWrapper = (props: Partial<PaginationRootProps> & { totalItems: number }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(props.itemsPerPage || 10)

  return (
    <Pagination
      {...props}
      currentPage={currentPage}
      totalItems={props.totalItems}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    >
      <Pagination.Spinner />
      <Pagination.Navigation />
      <Pagination.ItemsPerPage />
    </Pagination>
  )
}

export const Default: Story = {
  render: () => <PaginationWrapper totalItems={100} />,
}

export const RealWorldExample: Story = {
  render: function Render() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const totalItems = 1337

    // Simulate data for current page
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
    const currentItems = Array.from(
      { length: endIndex - startIndex },
      (_, i) => `Item ${startIndex + i + 1}`,
    )

    return (
      <div className="w-full space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Data Table Example</Label>
          <div className="rounded-lg border">
            <ScrollArea>
              <ScrollArea.Viewport className="h-64 p-4">
                <ScrollArea.Content className="space-y-2">
                  {currentItems.map((item) => (
                    <div
                      key={item}
                      className="bg-secondary-background rounded-md p-2"
                    >
                      {item}
                    </div>
                  ))}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
            </ScrollArea>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          pageSizeOptions={[10, 25, 50, 100]}
        >
          <Pagination.Spinner />
          <Pagination.Navigation />
          <Pagination.ItemsPerPage />
        </Pagination>
      </div>
    )
  },
  parameters: {
    layout: "padded",
  },
}

export const ResponsiveExample: Story = {
  render: function Render() {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    return (
      <div className="w-full space-y-8">
        <div className="flex flex-col gap-2">
          <Label>Desktop View (All Features)</Label>
          <Pagination
            currentPage={currentPage}
            totalItems={500}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            showPageSizeSelector={true}
          >
            <Pagination.Spinner />
            <Pagination.Navigation />
            <Pagination.ItemsPerPage />
          </Pagination>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Mobile View (Compact)</Label>
          <Pagination
            currentPage={currentPage}
            totalItems={500}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            maxPageButtons={5}
          >
            <Pagination.Navigation />
          </Pagination>
        </div>
      </div>
    )
  },
  parameters: {
    layout: "padded",
  },
}

export const LoadingState: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(20)

    const handlePageChange = (page: number) => {
      setIsLoading(true)
      setCurrentPage(page)

      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
      setIsLoading(true)
      setItemsPerPage(newItemsPerPage)
      setCurrentPage(1) // Reset to first page

      // Simulate API delay
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }

    return (
      <div className="w-full space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label className="flex-1 self-center">Loading State Example</Label>
            <Button onClick={() => setIsLoading(!isLoading)}>Toggle Loading</Button>
          </div>

          <div className="rounded-lg border">
            <ScrollArea>
              <ScrollArea.Viewport className="h-64 p-4">
                <ScrollArea.Content className="space-y-2">
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="bg-secondary-background h-8 animate-pulse rounded-md" />
                      <div className="bg-secondary-background h-8 animate-pulse rounded-md" />
                    </div>
                  ) : (
                    Array.from({ length: itemsPerPage }, (_, i) => (
                      <div
                        key={`${currentPage}-${i}`}
                        className="bg-secondary-background rounded-md p-2"
                      >
                        Page {currentPage} - Item {i + 1}
                      </div>
                    ))
                  )}
                </ScrollArea.Content>
              </ScrollArea.Viewport>
            </ScrollArea>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={250}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          loading={isLoading}
          pageSizeOptions={[10, 20, 50, 100]}
        >
          <Pagination.Spinner />
          <Pagination.Navigation />
          <Pagination.ItemsPerPage />
        </Pagination>
      </div>
    )
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Demonstrates pagination in loading state. Click pagination controls to see loading behavior, or use the 'Toggle Loading' button to manually control the loading state.",
      },
    },
  },
}
