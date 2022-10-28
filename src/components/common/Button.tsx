import styled from "@emotion/styled"
import { ButtonTypeMap } from "@mui/material"
import { CSSProperties, MouseEvent, ReactNode, useMemo } from "react"
import { PRIMARY_MAIN, WHITE } from "../../constants/colors"
import LoadingButton from "@mui/lab/LoadingButton"
import Sarabun from "./Sarabun"

const ButtonStyled = styled(LoadingButton)`
  border-width: 2px;
  text-transform: none;
  :hover {
    border-width: 2px;
  }
`

export type IButtonProps = {
  buttonType?: ButtonTypeMap["props"]["variant"] | "extended" | "iconOnly"
  onClick?: (event: MouseEvent) => void
  outlineColor?: string
  backgroundColor?: string
  size?: ButtonTypeMap["props"]["size"]
  width?: number
  height?: number
  textSize?: number
  textColor?: string
  isDisabledButton?: boolean
  children?: ReactNode
  style?: CSSProperties
  textStyle?: CSSProperties
  startIcon?: ButtonTypeMap["props"]["startIcon"]
  endIcon?: ButtonTypeMap["props"]["endIcon"]
  className?: string
  type?: "button" | "submit" | "reset" | undefined
  minWidth?: number
  isLoading?: boolean
}

const Button = (props: IButtonProps) => {
  const {
    buttonType = "contained",
    onClick,
    outlineColor = PRIMARY_MAIN,
    backgroundColor,
    size = "large",
    width,
    height,
    textSize = 14,
    textColor,
    isDisabledButton = false,
    children,
    style,
    textStyle,
    startIcon,
    endIcon,
    className,
    type,
    minWidth,
    isLoading,
  } = props

  const isDisabled = useMemo(() => isDisabledButton || isLoading, [isDisabledButton, isLoading])

  const buttonColor = useMemo(() => {
    if (isDisabled) {
      return buttonType === "outlined" ? "none" : "#e0e0e0"
    } else {
      if (buttonType === "contained") {
        return PRIMARY_MAIN
      } else {
        return backgroundColor
      }
    }
  }, [backgroundColor, buttonType, isDisabled])

  return (
    <ButtonStyled
      className={`${className}`}
      loading={isLoading}
      loadingPosition="start"
      variant={buttonType === "extended" || buttonType === "iconOnly" ? "contained" : buttonType}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        backgroundColor: `${buttonColor}`,
        width: `${width}px`,
        height: `${height}px`,
        minHeight: `${
          buttonType === "extended"
            ? size === "large"
              ? 48
              : 36
            : buttonType === "iconOnly"
            ? size === "large"
              ? 56
              : 40
            : size === "large"
            ? 46
            : 34
        }px`,
        minWidth: minWidth
          ? minWidth
          : `${buttonType === "iconOnly" ?? size === "large" ? 56 : 40}px`,
        borderColor: `${isDisabled ? "#e0e0e0" : outlineColor}`,
        borderRadius: `${
          buttonType === "extended"
            ? 24
            : buttonType === "iconOnly"
            ? size === "large"
              ? 28
              : 20
            : 8
        }px`,
        ...style,
      }}
      startIcon={startIcon}
      endIcon={endIcon}
      type={type}
    >
      <Sarabun
        color={
          isDisabled
            ? "#8F8F8F"
            : textColor
            ? textColor
            : buttonType === "contained"
            ? WHITE
            : PRIMARY_MAIN
        }
        size={textSize}
        style={{ marginLeft: isLoading ? "4px" : "", ...textStyle }}
      >
        {children}
      </Sarabun>
    </ButtonStyled>
  )
}

export default Button
