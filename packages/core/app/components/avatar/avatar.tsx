import { Use } from "@choiceform/icons-react"
import { forwardRef, memo, useMemo, useState, type HTMLProps } from "react"
import tinycolor from "tinycolor2"
import { tcx } from "~/utils"
import { InitialLetter } from "./letter"
import { avatarTv } from "./tv"

interface AvatarProps extends Omit<HTMLProps<HTMLDivElement>, "size"> {
  children?: React.ReactNode
  color?: string
  name?: string
  photo?: string
  size?: "small" | "medium" | "large"
  states?: "default" | "dash" | "design" | "spotlight"
}

export const Avatar = memo(
  forwardRef<HTMLDivElement, AvatarProps>(function Avatar(props, ref) {
    const {
      children,
      className,
      color = "#d3d3d3",
      name,
      photo,
      size = "medium",
      states = "default",
      ...rest
    } = props
    const [isLoading, setIsLoading] = useState(!!photo)
    const [imageLoadedError, setImageLoadedError] = useState(false)

    const styles = avatarTv({ size, states, isLoading })

    const fallback = useMemo(() => {
      return photo && !imageLoadedError ? (
        <img
          data-slot="image"
          src={photo}
          alt={name}
          className={styles.image()}
          onLoad={() => {
            setIsLoading(false)
            setImageLoadedError(false)
          }}
          onError={() => {
            setIsLoading(false)
            setImageLoadedError(true)
          }}
        />
      ) : name ? (
        <InitialLetter letter={name?.[0] ?? ""} />
      ) : (
        <Use className="text-black/40" />
      )
    }, [photo, imageLoadedError, name, styles])

    const textColor = useMemo(() => {
      return tinycolor(color).isDark() ? "white" : "black"
    }, [color])

    return (
      <div
        ref={ref}
        tabIndex={-1}
        className={tcx(styles.root(), className)}
        style={{ backgroundColor: color, color: textColor }}
        {...rest}
      >
        {fallback}
        {children}
      </div>
    )
  }),
)

Avatar.displayName = "Avatar"
