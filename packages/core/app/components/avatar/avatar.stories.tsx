import { faker } from "@faker-js/faker"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import { useMemo } from "react"
import { Avatar } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Basic: Story = {
  render: function BasicStory() {
    const colors = useMemo(() => {
      return Array.from({ length: 4 }, () => {
        const color = faker.color.rgb()
        const name = faker.person.firstName()
        return {
          name,
          color,
        }
      })
    }, [])

    return (
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="flex flex-col items-center gap-2"
          >
            <Avatar
              name={color.name}
              color={color.color}
            />
            <p>{color.name}</p>
          </div>
        ))}
      </div>
    )
  },
}

export const Photo: Story = {
  render: function PhotoStory() {
    const photos = useMemo(() => {
      return Array.from({ length: 4 }, () => {
        const photo = faker.image.avatar()
        const name = faker.person.firstName()
        return {
          name,
          photo,
        }
      })
    }, [])

    return (
      <div className="grid grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.name}
            className="flex flex-col items-center gap-2"
          >
            <Avatar
              name={photo.name}
              photo={photo.photo}
            />
            <p>{photo.name}</p>
          </div>
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  render: function SizesStory() {
    enum Sizes {
      Small = "small",
      Medium = "medium",
      Large = "large",
    }

    return (
      <div className="grid grid-cols-4 gap-4">
        {Object.values(Sizes).map((size) => (
          <div
            className="flex flex-col items-center gap-2"
            key={size}
          >
            <Avatar
              name={size}
              size={size}
              color={faker.color.rgb()}
            />
            <p>{size}</p>
          </div>
        ))}
      </div>
    )
  },
}

export const States: Story = {
  render: function StatesStory() {
    enum States {
      Default = "default",
      Dash = "dash",
      Design = "design",
      Spotlight = "spotlight",
    }

    return (
      <div className="grid grid-cols-4 gap-4">
        {Object.values(States).map((state) => (
          <div
            className="flex flex-col items-center gap-2"
            key={state}
          >
            <Avatar
              name={state}
              states={state}
            />
            <p>{state}</p>
          </div>
        ))}
      </div>
    )
  },
}
