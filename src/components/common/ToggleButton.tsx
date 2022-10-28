import { PropTypes } from "@mui/material"
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps,
} from "@mui/lab"
import { useCallback } from "react"
import styled from "styled-components/macro"
import Kanit from "./Kanit"

const CustomToggleButton = styled(MuiToggleButton)`
  border-radius: 100px;
  font-weight: 400;
  min-width: 75px;
  height: 24px;
  border: 1px border;
  .toggle-button-text {
    color: #000000;
  }
  &.Mui-selected {
    border-color: #eaecf4;
    background-color: #eaecf4;
    color: #2c3d92;
    .toggle-button-text {
      color: #334392;
    }
    &:hover {
      background-color: #d1d7f0;
      color: #334392;
    }
  }
`

const KanitToggleButton = styled(Kanit)`
  font-weight: 400;
`

type ToggleButtonProps = {
  isSelected: boolean
  color?: PropTypes.Color
  value: boolean
  name?: any
  onChange?: (checked: boolean) => void
} & Omit<MuiToggleButtonProps, "value">

const ToggleButton = (props: ToggleButtonProps) => {
  const {
    onChange,
    children,
    isSelected,
    value = false,
    name,
    ...restProps
  } = props

  const onButtonClick = useCallback(() => {
    onChange && onChange(!value)
  }, [onChange, value])

  return (
    <CustomToggleButton
      selected={!!value}
      onClick={onButtonClick}
      value={value}
      {...restProps}
    >
      <KanitToggleButton type="XsHeader" className="toggle-button-text">
        {children}
      </KanitToggleButton>
    </CustomToggleButton>
  )
}

export default ToggleButton
