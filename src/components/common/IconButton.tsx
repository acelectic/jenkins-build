import {
  SvgIcon as MuiSvgIcon,
  SvgIconProps as MuiSvgIconProps,
} from "@mui/material"
import styled from "styled-components/macro"

const CustomIconButton = styled(MuiSvgIcon)`
  font-size: 36px;

  &.MuiSvgIcon-fontSizeSmall {
    font-size: 32px;
  }
  &.MuiSvgIcon-fontSizeLarge {
    font-size: 40px;
  }
  &:hover {
    cursor: pointer;
  }
`

type IconButtonProps = {
  icon: React.ReactNode
  iconSize?: "inherit" | "large" | "medium" | "small"
  onClick?: () => void
} & MuiSvgIconProps

const IconButton = (props: IconButtonProps) => {
  const { icon, onClick, iconSize = "small", ...restProps } = props
  return (
    <div onClick={onClick}>
      <CustomIconButton children={icon} fontSize={iconSize} {...restProps} />
    </div>
  )
}

export default IconButton
