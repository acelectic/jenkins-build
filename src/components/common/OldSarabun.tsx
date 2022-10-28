import {
  CSSProperties,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  useMemo,
} from "react"
import styled from "@emotion/styled"

const StyledText = styled.div<{
  family: string
  size: number
  color: string
  weight?: number
  style?: CSSProperties
}>`
  font-family: ${({ family }) => `Sarabun${family}`};
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
  word-break: break-word;
`

export interface TextProps {
  onClick?: MouseEventHandler
  className?: string
  children: ReactNode
  size?: number
  weight?: number
  type?: TextType
  color?: string
  style?: CSSProperties
}
const OldSarabun = forwardRef((props: TextProps, ref: any) => {
  const {
    children,
    type,
    weight,
    size,
    color = "#000000",
    style,
    className,
    ...restProps
  } = props
  const family = useMemo(() => {
    switch (type) {
      case "LTitle":
        return `-Medium`
      case "LSubtitle":
        return `-ExtraLight`
      case "MTitle":
        return `-Medium`
      case "MSubtitle":
        return `-ExtraLight`
      case "SmTitle":
        return `-Medium`
      case "SmSubtitle":
        return `-ExtraLight`
      case "XsTitle":
        return `-Regular`
      case "XsCardTitle":
        return `-Medium`
      case "XsSubtitle":
        return `-Regular`
      case "XsHeader":
        return `-Regular`
      case "ParagraphBold":
        return `-Bold`
      case "Paragraph":
        return `-Light`
      case "Placeholder":
        return `-Italic`
      case "HintBold":
        return `-Bold`
      case "Hint":
        return `-Regular`
      default:
        return "-Regular"
    }
  }, [type])
  const textSize = useMemo(() => {
    switch (type) {
      case "LTitle":
        return 56
      case "LSubtitle":
        return 44
      case "MTitle":
        return 32
      case "MSubtitle":
        return 24
      case "SmTitle":
        return 20
      case "SmSubtitle":
        return 16
      case "XsTitle":
        return 16
      case "XsCardTitle":
        return 14
      case "XsSubtitle":
        return 14
      case "XsHeader":
        return 13
      case "ParagraphBold":
        return 14
      case "Paragraph":
        return 14
      case "Placeholder":
        return 13
      case "HintBold":
        return 11
      case "Hint":
        return 11
      default:
        return 16
    }
  }, [type])

  return (
    <StyledText
      ref={ref}
      family={family}
      size={size ? size : textSize}
      color={color}
      style={style}
      weight={weight}
      className={className}
      {...restProps}
    >
      {children}
    </StyledText>
  )
})

export default OldSarabun
