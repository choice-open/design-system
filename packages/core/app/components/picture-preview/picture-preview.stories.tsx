import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { PicturePreview } from "./picture-preview"

// Sample image URLs
const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1745750747234-5df61f67a7bc?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileName: "koi-fish-lotus.jpg",
  },
  {
    src: "https://images.unsplash.com/photo-1745659601865-1af86dec8bcd?q=80&w=3183&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    fileName: "IMG_0658.jpg",
  },
]

const meta: Meta<typeof PicturePreview> = {
  title: "PicturePreview",
  component: PicturePreview,
  decorators: [
    (Story) => (
      <div className="w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta

/**
 * PicturePreview is a component that displays a preview of an image.
 * - `src`: The source of the image
 * - `fileName`: The name of the image
 */
export const Default = {
  render: function DefaultStory() {
    return (
      <PicturePreview
        src={sampleImages[0].src}
        fileName={sampleImages[0].fileName}
      />
    )
  },
}
