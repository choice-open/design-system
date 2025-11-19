import { CheckboxBtn, CheckboxBtnChecked } from "@choiceform/icons-react"
import { Children } from "react"
import { Components } from "react-markdown"
import { extractLanguage } from "../utils"
import { CodeBlock } from "./code-block"
import { mdTv } from "./tv"

export const createMarkdownComponents = (tv: ReturnType<typeof mdTv>): Partial<Components> => ({
  p: ({ children }) => <p className={tv.paragraph()}>{children}</p>,
  h1: ({ children }) => <h1 className={tv.h1()}>{children}</h1>,
  h2: ({ children }) => <h2 className={tv.h2()}>{children}</h2>,
  h3: ({ children }) => <h3 className={tv.h3()}>{children}</h3>,
  h4: ({ children }) => <h4 className={tv.h4()}>{children}</h4>,
  h5: ({ children }) => <h5 className={tv.h5()}>{children}</h5>,
  h6: ({ children }) => <h6 className={tv.h6()}>{children}</h6>,

  ul: ({ children }) => <ul className={tv.ul()}>{children}</ul>,
  ol: ({ children }) => <ol className={tv.ol()}>{children}</ol>,
  li: function LiComponent({ children, node, ...props }) {
    const childrenArray = Children.toArray(children)
    const hasCheckbox = childrenArray.some(
      (child) =>
        typeof child === "object" &&
        child !== null &&
        "props" in child &&
        child.props?.type === "checkbox",
    )

    return (
      <li
        className={tv.li({ hasCheckbox })}
        {...props}
      >
        {children}
      </li>
    )
  },

  blockquote: ({ children }) => <blockquote className={tv.blockquote()}>{children}</blockquote>,

  hr: () => <hr className={tv.hr()} />,

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={tv.a()}
    >
      {children}
    </a>
  ),

  code: function CodeComponent({ className, children, node, ...props }) {
    const isInline =
      !node?.position?.start?.line || node?.position?.start?.line === node?.position?.end?.line

    if (isInline) {
      return (
        <code
          className={tv.code()}
          {...props}
        >
          {children}
        </code>
      )
    }

    const language = extractLanguage(className)

    return (
      <CodeBlock
        code={children as string}
        language={language}
      />
    )
  },

  pre: function PreComponent({ children }) {
    return <pre className={tv.pre()}>{children}</pre>
  },

  table: ({ children }) => (
    <div className={tv.tableWrapper()}>
      <table className={tv.table()}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className={tv.thead()}>{children}</thead>,
  tbody: ({ children }) => <tbody className={tv.tbody()}>{children}</tbody>,
  tr: ({ children }) => <tr className={tv.tr()}>{children}</tr>,
  th: ({ children }) => <th className={tv.th()}>{children}</th>,
  td: ({ children }) => <td className={tv.td()}>{children}</td>,

  strong: ({ children }) => <strong className={tv.strong()}>{children}</strong>,
  em: ({ children }) => <em className={tv.em()}>{children}</em>,
  del: ({ children }) => <del className={tv.del()}>{children}</del>,

  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className={tv.img()}
    />
  ),

  input: ({ type, checked, node, ...props }) => {
    if (type === "checkbox") {
      return (
        <div className={tv.checkbox()}>
          {checked ? (
            <CheckboxBtnChecked className="text-secondary-foreground" />
          ) : (
            <CheckboxBtn className="text-disabled-icon" />
          )}
        </div>
      )
    }
    return (
      <input
        type={type}
        {...props}
      />
    )
  },
})
