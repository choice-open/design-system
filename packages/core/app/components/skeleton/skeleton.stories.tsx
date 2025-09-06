import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Avatar } from "../avatar"
import { Skeleton } from "./skeleton"

const meta = {
  title: "components/skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: "select",
      options: ["pulse", "wave", false],
    },
    variant: {
      control: "select",
      options: ["text", "rectangular", "rounded", "circular"],
    },
    width: {
      control: "text",
    },
    height: {
      control: "text",
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
}

export const Text: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">
          <Skeleton variant="text" />
        </h1>
      </div>
      <div>
        <p className="text-base">
          <Skeleton variant="text" />
        </p>
      </div>
      <div>
        <span className="text-sm">
          <Skeleton variant="text" />
        </span>
      </div>
    </div>
  ),
}

export const TextMultiline: Story = {
  render: () => (
    <div className="space-y-2">
      <Skeleton
        variant="text"
        width="100%"
      />
      <Skeleton
        variant="text"
        width="100%"
      />
      <Skeleton
        variant="text"
        width="60%"
      />
    </div>
  ),
}

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: 200,
    height: 100,
  },
}

export const Rounded: Story = {
  args: {
    variant: "rounded",
    width: 200,
    height: 100,
  },
}

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 40,
    height: 40,
  },
}

export const PulseAnimation: Story = {
  args: {
    animation: "pulse",
    variant: "rectangular",
    width: 200,
    height: 100,
  },
}

export const WaveAnimation: Story = {
  args: {
    animation: "wave",
    variant: "rectangular",
    width: 200,
    height: 100,
  },
}

export const NoAnimation: Story = {
  args: {
    animation: false,
    variant: "rectangular",
    width: 200,
    height: 100,
  },
}

export const WithChildren: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Skeleton variant="circular">
        <Avatar
          className="h-10 w-10"
          name="John Doe"
        />
      </Skeleton>
      <div className="space-y-2">
        <Skeleton variant="text">
          <h3 className="text-lg font-semibold">Loading Title</h3>
        </Skeleton>
        <Skeleton variant="text">
          <p className="text-sm text-gray-500">Loading subtitle text here</p>
        </Skeleton>
      </div>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="w-64 rounded-lg border p-4 shadow-sm">
      <div className="mb-4">
        <Skeleton
          variant="rounded"
          height={150}
        />
      </div>
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton
          variant="text"
          width="60%"
        />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Skeleton
          variant="circular"
          width={24}
          height={24}
        />
        <Skeleton
          variant="text"
          width={100}
        />
      </div>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3"
        >
          <Skeleton
            variant="circular"
            width={40}
            height={40}
          />
          <div className="flex-1 space-y-2">
            <Skeleton
              variant="text"
              width="70%"
            />
            <Skeleton
              variant="text"
              width="50%"
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Form: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Skeleton
          variant="text"
          width={60}
          height={14}
          className="mb-1"
        />
        <Skeleton
          variant="rounded"
          height={32}
        />
      </div>
      <div>
        <Skeleton
          variant="text"
          width={80}
          height={14}
          className="mb-1"
        />
        <Skeleton
          variant="rounded"
          height={80}
        />
      </div>
      <div className="flex gap-2">
        <Skeleton
          variant="rounded"
          height={32}
          width={80}
        />
        <Skeleton
          variant="rounded"
          height={32}
          width={80}
        />
      </div>
    </div>
  ),
}

export const DataTable: Story = {
  render: () => (
    <div className="w-full">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">
              <Skeleton
                variant="text"
                width={80}
              />
            </th>
            <th className="p-2 text-left">
              <Skeleton
                variant="text"
                width={100}
              />
            </th>
            <th className="p-2 text-left">
              <Skeleton
                variant="text"
                width={60}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr
              key={i}
              className="border-b"
            >
              <td className="p-2">
                <Skeleton
                  variant="text"
                  width="90%"
                />
              </td>
              <td className="p-2">
                <Skeleton
                  variant="text"
                  width="70%"
                />
              </td>
              <td className="p-2">
                <Skeleton
                  variant="text"
                  width="80%"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
