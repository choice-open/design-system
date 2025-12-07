import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
    h5: ({ children }) => <h5 className="md-h5">{children}</h5>,
    h6: ({ children }) => <h6 className="md-h6">{children}</h6>,
    ul: ({ children }) => <ul className="md-ul">{children}</ul>,
    ol: ({ children }) => <ol className="md-ol">{children}</ol>,
    li: ({ children }) => <li className="md-li">{children}</li>,
    blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
    hr: () => <hr className="md-hr" />,
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="md-a"
      >
        {children}
      </a>
    ),
    code: ({ children }) => <code className="md-code">{children}</code>,
    pre: ({ children }) => <pre className="md-pre">{children}</pre>,
    table: ({ children }) => <table className="md-table">{children}</table>,
    th: ({ children }) => <th className="md-th">{children}</th>,
    td: ({ children }) => <td className="md-td">{children}</td>,
    tr: ({ children }) => <tr className="md-tr">{children}</tr>,
    thead: ({ children }) => <thead className="md-thead">{children}</thead>,
    tbody: ({ children }) => <tbody className="md-tbody">{children}</tbody>,
    tableWrapper: ({ children }) => <div className="md-table-wrapper">{children}</div>,
    strong: ({ children }) => <strong className="md-strong">{children}</strong>,
    em: ({ children }) => <em className="md-em">{children}</em>,
    p: ({ children }) => <p className="md-p">{children}</p>,
    ...components,
  }
}
