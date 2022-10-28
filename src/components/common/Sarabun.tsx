import { CSSProperties, MouseEventHandler, ReactNode, useMemo } from "react"
import styled from "@emotion/styled"
import { Link } from "@mui/material"

export type SarabunTypes =
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H5"
  | "H6"
  | "Subtitle1"
  | "Subtitle2"
  | "Body1"
  | "Body2"
  | "Button"
  | "Caption"
  | "Overline"

const CustomLink = styled(Link)<{
  family: string
  size: number
  weight: number
  color: string
  lineHeight: string
  wordSpace: string
  style?: CSSProperties
}>`
  font-family: ${({ family }) => `Sarabun`};
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  line-height: ${({ lineHeight }) => `${lineHeight}px`};
  word-break: break-word;
  cursor: pointer;
`

const StyledText = styled.div<{
  family: string
  size: number
  weight: number
  color: string
  lineHeight: string
  wordSpace: string
  style?: CSSProperties
  clickable?: boolean
}>`
  font-family: ${({ family }) =>
    `Sarabun`}; // TODO: ถ้าใส่ suffix แล้ว font จะยาว ๆ
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color};
  font-weight: ${({ weight }) => weight};
  line-height: ${({ lineHeight }) => `${lineHeight}px`};
  word-break: break-word;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "inherit")};
`

export interface TextProps {
  onClick?: MouseEventHandler
  className?: string
  children: ReactNode
  size?: number
  type?: SarabunTypes
  weight?: number
  color?: string
  style?: CSSProperties
  lineHeight?: string
  lineHeightNumber?: number
  wordSpace?: string
  isLink?: boolean
  url?: string
}
const Sarabun = (props: TextProps) => {
  const {
    children,
    type,
    size,
    color = `#000000`,
    weight,
    isLink = false,
    onClick,
    style,
    lineHeight = "normal",
    lineHeightNumber,
    wordSpace = "normal",
    className,
  } = props

  const familyType = useMemo(() => {
    switch (type) {
      default:
        return "-Regular"
    }
  }, [type])

  const textSize = useMemo(() => {
    switch (type) {
      case "H1":
        return 32
      case "H2":
        return 28
      case "H3":
        return 24
      case "H4":
        return 22
      case "H5":
        return 18
      case "H6":
        return 16
      case "Subtitle1":
        return 14
      case "Subtitle2":
        return 12
      case "Body1":
        return 14
      case "Body2":
        return 12
      case "Button":
        return 14
      case "Caption":
        return 10
      case "Overline":
        return 8
      default:
        return 14
    }
  }, [type])

  const textWeight = useMemo(() => {
    switch (type) {
      case "H1":
        return 800
      case "H2":
        return 800
      case "H3":
        return 600
      case "H4":
        return 700
      case "H5":
        return 700
      case "H6":
        return 700
      case "Subtitle1":
        return 600
      case "Subtitle2":
        return 600
      case "Body1":
        return 400
      case "Body2":
        return 400
      case "Button":
        return 700
      case "Caption":
        return 400
      case "Overline":
        return 600
      default:
        return 600
    }
  }, [type])

  return (
    <StyledText
      family={familyType}
      size={!size ? textSize : size}
      weight={!weight ? textWeight : weight}
      color={color}
      style={{ lineHeight: `${lineHeightNumber}px`, ...style }}
      className={className}
      lineHeight={lineHeight}
      wordSpace={wordSpace}
      onClick={onClick}
      clickable={!!onClick}
    >
      {isLink ? (
        <CustomLink
          family={familyType}
          size={!size ? textSize : size}
          weight={!weight ? textWeight : weight}
          color={color}
          style={{ lineHeight: `${lineHeightNumber}px`, ...style }}
          className={className}
          lineHeight={lineHeight}
          wordSpace={wordSpace}
        >
          {children}
        </CustomLink>
      ) : (
        <>{children}</>
      )}
    </StyledText>
  )
}

export default Sarabun
