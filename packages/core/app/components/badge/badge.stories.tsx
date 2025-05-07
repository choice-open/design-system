import { Dot, SearchSmall } from "@choiceform/icons-react"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import React, { Fragment, useState } from "react"
import { Select } from "../select"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
}

export default meta

type Story = StoryObj<typeof Badge>

/**
 * Badges are used to call attention to status, and come in a strong “filled” and light “outline” form.
 * We typically use them to call attention to things like “New” or “Beta” features, descriptions like “Added”, “Removed”, and labels for individuals, like “Admin”.
 */

export const Basic: Story = {
  render: function BasicStory() {
    enum Variant {
      Default = "default",
      Brand = "brand",
      Inverted = "inverted",
      Component = "component",
      Success = "success",
      Warning = "warning",
      Error = "error",
    }

    enum Strong {
      True = "true",
      False = "false",
    }

    return (
      <div className="flex flex-col items-start gap-4">
        <div className="grid grid-cols-4 place-items-start gap-4 capitalize">
          {Object.values(Variant).map((variant) => (
            <Fragment key={variant}>
              {Object.values(Strong).map((strong) => (
                <Fragment key={strong}>
                  <Badge
                    variant={variant}
                    strong={strong === Strong.True}
                  >
                    {variant}
                  </Badge>
                  <Badge
                    variant={variant}
                    strong={strong === Strong.True}
                  >
                    <Dot />
                    {variant}
                  </Badge>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    )
  },
}
