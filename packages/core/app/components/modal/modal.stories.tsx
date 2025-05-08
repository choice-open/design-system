import { ChevronLeft, ThemeSunBright } from "@choiceform/icons-react"
import { Story } from "@storybook/blocks"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Button } from "../button"
import { IconButton } from "../icon-button"
import { Select } from "../select"
import { Tabs } from "../tabs"
import { Modal } from "./modal"
import { Avatar } from "../avatar"
import { faker } from "@faker-js/faker"
import { TextField } from "../text-field"

const meta: Meta<typeof Modal> = {
  title: "Overlays/Modal",
  component: Modal,
}

export default meta

type Story = StoryObj<typeof Modal>

export const Basic: Story = {
  render: function BasicStory() {
    const [tab, setTab] = useState("tab-1")
    const [select, setSelect] = useState("option-1")
    return (
      <Modal className="w-md">
        <Modal.Header title="Modal" />
        <Modal.Header
          title={
            <>
              <IconButton>
                <ChevronLeft />
              </IconButton>
              Modal
            </>
          }
        />
        <Modal.Header
          title={
            <Tabs
              value={tab}
              onChange={setTab}
            >
              <Tabs.Item value="tab-1">Tab 1</Tabs.Item>
              <Tabs.Item value="tab-2">Tab 2</Tabs.Item>
              <Tabs.Item value="tab-3">Tab 3</Tabs.Item>
            </Tabs>
          }
        />
        <Modal.Header
          title={
            <Select
              matchTriggerWidth
              value={select}
              onChange={setSelect}
            >
              <Select.Trigger prefixElement={<ThemeSunBright />}>
                {select || "Select"}
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="option-1">Option 1</Select.Item>
                <Select.Item value="option-2">Option 2</Select.Item>
                <Select.Item value="option-3">Option 3</Select.Item>
              </Select.Content>
            </Select>
          }
        />

        <Modal.Content>
          <div className="p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </Modal.Content>
        <Modal.Footer className="justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button>Action</Button>
        </Modal.Footer>
      </Modal>
    )
  },
}

export const ModalContent: Story = {
  render: function ModalContentStory() {
    const [select, setSelect] = useState("option-1")
    return (
      <Modal>
        <Modal.Header title="Modal" />
        <Modal.Content className="flex w-md flex-col gap-4 p-4">
          <TextField
            size="large"
            className="w-full"
          >
            <TextField.Label>Name</TextField.Label>
          </TextField>
          <Modal.MultiLineInput
            label="Multi-line input"
            placeholder="Please enter your multi-line input"
            description="This is a description"
          />
          <Modal.Select
            label="Select"
            value={select}
            onChange={setSelect}
          >
            <Select.Trigger
              size="large"
              className="gap-2"
            >
              <Avatar
                photo={faker.image.avatar()}
                name={faker.name.fullName()}
                size="small"
              />
              <span className="flex-1 truncate">{select || "Select"}</span>
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="option-1">Option 1</Select.Item>
              <Select.Item value="option-2">Option 2</Select.Item>
              <Select.Item value="option-3">Option 3</Select.Item>
            </Select.Content>
          </Modal.Select>
        </Modal.Content>
      </Modal>
    )
  },
}
