import { FontAlignTopSmall, RemoveSmall } from "@choiceform/icons-react"
import type { Meta, StoryObj } from "@storybook/react"
import React, { useCallback, useState } from "react"
import { toast } from "sonner"
import { Button } from "../button"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "./file-upload"

const meta: Meta = {
  title: "Forms/FileUpload",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([])

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    })
  }, [])

  return (
    <FileUpload
      maxFiles={2}
      maxSize={5 * 1024 * 1024}
      value={files}
      onValueChange={setFiles}
      onFileReject={onFileReject}
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <FontAlignTopSmall className="text-muted-foreground size-6" />
          </div>
          <p className="text-sm font-medium">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files, up to 5MB each)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button
            variant="secondary"
            className="mt-2 w-fit"
          >
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem
            key={index}
            value={file}
          >
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button
                variant="ghost"
                className="size-7"
              >
                <RemoveSmall />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  )
}
