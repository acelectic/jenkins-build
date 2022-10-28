import { PropTypes } from "@mui/material"
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
} from "@mui/lab"
import { useCallback } from "react"
import styled from "styled-components/macro"
import OldSarabun from "./OldSarabun"

const CustomToggleButton = styled(MuiToggleButton)`
  width: 97px;
  height: 32px;
  color: #1b1c1d;
  .toggle-button-text {
    color: #545556;
  }
  &.Mui-selected {
    border-color: #2c3d92;
    background-color: #2c3d92;
    color: #ffffff;
    &:hover {
      background-color: #202e77;
    }
    .toggle-button-text {
      color: #ffffff;
    }
  }
`

const SarabunToggleButton = styled(OldSarabun)`
  font-weight: 400;
`

type ToggleButtonProps = {
  value: string
  color?: PropTypes.Color
  onChange?: (checked: string) => void
} & Omit<MuiToggleButtonProps, "value">

const ToggleButtonDefault = (props: ToggleButtonProps) => {
  const { onChange, children, value, ...restProps } = props

  const onButtonClick = useCallback(() => {
    onChange && onChange(value)
  }, [onChange, value])

  return (
    <CustomToggleButton value={value} onClick={onButtonClick} {...restProps}>
      <SarabunToggleButton type="XsSubtitle" className={"toggle-button-text"}>
        {children}
      </SarabunToggleButton>
    </CustomToggleButton>
  )
}

export default ToggleButtonDefault
