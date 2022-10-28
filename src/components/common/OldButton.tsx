import { Button as MuiButton } from "@mui/material"
import { ButtonProps } from "@mui/material"
import Kanit from "./Kanit"
import { PropsWithChildren, useMemo } from "react"
import { ThemeColors } from "../../theme/variants"
import { useTheme } from "@mui/material/styles"
import { debounce } from "lodash"
import { MouseEvent } from "react"

type ButtonTextType = {
  textType?: TextType
  textColor?: ButtonTextColor
  color?: ThemeColors
  buttonType?: "icon" | "text"
}

type ButtonType = PropsWithChildren<Omit<ButtonProps, "color">> & ButtonTextType

const OldButton = (props: ButtonType) => {
  const theme = useTheme()
  const {
    children,
    color,
    textColor = "#ffffff",
    textType = "XsTitle",
    buttonType = "text",
    onClick,
    ...restProp
  } = props

  const buttonTextColor = useMemo(() => {
    switch (textColor) {
      case "white":
        return "#ffffff"
      case "black":
        return "#1B1C1D"
      default:
        return textColor
    }
  }, [textColor])

  const themeColor = useMemo(() => {
    switch (color) {
      case "primary":
        return theme.palette.primary.main
      case "secondary":
        return theme.palette.secondary.main
      case "success":
        return theme.palette.success.main
      case "error":
        return theme.palette.error.main
      case "warning":
        return theme.palette.warning.main
    }
  }, [
    color,
    theme.palette.error.main,
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ])

  const onButtonClick = useMemo(
    () =>
      debounce((event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
      }, 300),
    [onClick]
  )

  return (
    <MuiButton
      style={{
        backgroundColor: themeColor,
        minWidth: buttonType === "icon" ? "36px" : undefined,
      }}
      onClick={onButtonClick}
      {...restProp}
    >
      <Kanit type={textType} color={buttonTextColor}>
        {children}
      </Kanit>
    </MuiButton>
  )
}

export default OldButton
