import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Pagination } from "./pagination"
import type { PaginationRootProps } from "./types"

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

export const BasicPagination: Story = {
  args: {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10,
  },
  render: (args) => <PaginationWrapper {...args} />,
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
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Data Table Example</h3>
          <div className="mb-4 space-y-2">
            {currentItems.map((item) => (
              <div
                key={item}
                className="rounded bg-gray-50 px-3 py-2 dark:bg-gray-800"
              >
                {item}
              </div>
            ))}
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
        <div>
          <h3 className="mb-2 text-sm font-medium">Desktop View (All Features)</h3>
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

        <div>
          <h3 className="mb-2 text-sm font-medium">Mobile View (Compact)</h3>
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
