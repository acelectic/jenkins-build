import { Avatar as MuiAvatar } from "@mui/material"
import { CSSProperties } from "react"

type AvatarProps = {
  alt?: string
  src?: string
  width?: number
  height?: number
  style?: CSSProperties
  variant?: "square" | "rounded" | "circular" | undefined
}

const Avatar = (props: AvatarProps) => {
  const {
    alt = "default",
    src,
    width = 40,
    height = 40,
    variant = "circular",
    style,
  } = props
  return (
    <MuiAvatar
      style={{ ...style, width: `${width}px`, height: `${height}px` }}
      src={src}
      alt={alt}
      variant={variant}
    />
  )
}

export default Avatar
