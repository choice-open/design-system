export type DocMetadataArgument = {
  // Function arguments have nested arguments
  args?: DocMetadataArgument[]
  default?: string
  description?: string
  name: string
  optional?: boolean
  type?: string
  variadic?: boolean
}

export type DocMetadataExample = {
  description?: string
  evaluated?: string
  example: string
}

export type DocMetadata = {
  aliases?: string[]
  args?: DocMetadataArgument[]
  description?: string
  docURL?: string
  examples?: DocMetadataExample[]
  hidden?: boolean
  name: string
  returnType: string
  section?: string
}
