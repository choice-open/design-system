import { File } from "@choiceform/icons-react"

export function getFileIcon(file: File) {
  const type = file.type
  const extension = file.name.split(".").pop()?.toLowerCase() ?? ""

  if (type.startsWith("video/")) {
    return <File />
  }

  if (type.startsWith("audio/")) {
    return <File />
  }

  if (type.startsWith("text/") || ["txt", "md", "rtf", "pdf"].includes(extension)) {
    return <File />
  }

  if (
    [
      "html",
      "css",
      "js",
      "jsx",
      "ts",
      "tsx",
      "json",
      "xml",
      "php",
      "py",
      "rb",
      "java",
      "c",
      "cpp",
      "cs",
    ].includes(extension)
  ) {
    return <File />
  }

  if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(extension)) {
    return <File />
  }

  if (
    ["exe", "msi", "app", "apk", "deb", "rpm"].includes(extension) ||
    type.startsWith("application/")
  ) {
    return <File />
  }

  return <File />
}