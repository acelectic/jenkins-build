import {
  ToggleButtonGroupProps as MuiToggleButtonGroupProps,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/lab"
import { useCallback } from "react"
import styled from "styled-components/macro"
import ToggleButtonDefault from "./ToggleButtonDefault"

const ToggleButtonGroup = styled(MuiToggleButtonGroup)``

type ToggleButtonGroupProps = {
  value: string
  options: string[]
  onChange?: (newValue: string) => void
} & Omit<MuiToggleButtonGroupProps, "onChange" | "value">

const SwitchButton = (props: ToggleButtonGroupProps) => {
  const { value, options, onChange, ...restProps } = props
  const onButtonClick = useCallback(
    (value: string) => {
      onChange && onChange(value)
    },
    [onChange]
  )
  return (
    <ToggleButtonGroup value={value} exclusive {...restProps}>
      {options.map((option, index) => {
        return (
          <ToggleButtonDefault
            key={index}
            onClick={() => {
              onButtonClick(option)
            }}
            value={option}
          >
            {option}
          </ToggleButtonDefault>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default SwitchButton
