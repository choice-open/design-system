import { tcv } from "~/utils"

export const toolbarTv = tcv({
  slots: {
    root: "flex items-center gap-1",
    divider: "w-px h-4 bg-default-boundary mx-1",
  },
  variants: {
    visible: {
      true: {
        root: "visible",
      },
      false: {
        root: "invisible pointer-events-none",
      },
    },
  },
})

export const mdTv = tcv({
  slots: {
    root: "md",
    paragraph: "md-p",
    h1: "md-h1",
    h2: "md-h2",
    h3: "md-h3",
    h4: "md-h4",
    h5: "md-h5",
    h6: "md-h6",
    ul: "md-ul",
    ol: "md-ol",
    li: "md-li",
    blockquote: "md-blockquote",
    hr: "md-hr",
    a: "md-a",
    code: "md-code",
    pre: "md-pre",
    table: "md-table",
    th: "md-th",
    td: "md-td",
    tr: "md-tr",
    thead: "md-thead",
    tbody: "md-tbody",
    tableWrapper: "md-table-wrapper",
    strong: "md-strong",
    em: "md-em",
    del: "md-del",
    img: "md-img",
    checkbox: "md-checkbox",
  },
  variants: {
    mode: {
      default: {},
      compact: {
        root: "md-compact",
      },
    },
    hasCheckbox: {
      true: {
        li: "md-li-task",
      },
      false: {},
    },
  },
  defaultVariants: {
    mode: "default",
    hasCheckbox: false,
  },
})
