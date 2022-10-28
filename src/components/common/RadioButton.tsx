import styled from "@emotion/styled"
import { Radio, RadioProps } from "@mui/material"

import { CSSProperties, useCallback } from "react"
import { IRadioSize } from "./RadioGroupButton"

import Sarabun from "./Sarabun"

const RadioButtonBox = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`

const Label = styled(Sarabun)`
  word-break: unset;
  /* white-space: nowrap; */
  width: 100%;
`

export type IRadioButtonProps = {
  value: string
  label: string
  subLabel?: string
  buttonSize?: IRadioSize
  buttonColor?: string
  subLabelSize?: number
  subLabelColor?: string
  labelColor?: string
  labelSize?: number
  spacingRadio?: CSSProperties
  isRequired?: boolean
  onChange?: (value: string) => void
} & Omit<RadioProps, "value">

const RadioButton = (props: IRadioButtonProps) => {
  const {
    value,
    onChange,
    buttonSize,
    buttonColor,
    label,
    subLabel,
    subLabelSize,
    subLabelColor,
    labelSize,
    labelColor,
    spacingRadio,
    disabled = false,
    ...restProps
  } = props

  const onRadioButtonClick = useCallback(() => {
    onChange && onChange(value)
  }, [onChange, value])

  return (
    <RadioButtonBox>
      <Radio
        onClick={onRadioButtonClick}
        value={value}
        inputProps={{ "aria-label": value }}
        sx={{
          color: `${buttonColor}`,
          "&.Mui-checked": {
            color: `${buttonColor}`,
          },
        }}
        disabled={disabled}
        size={buttonSize}
        {...restProps}
      />
      <Label size={labelSize} color={disabled ? "#c4c4c4" : labelColor}>
        {label}
        <Sarabun size={subLabelSize} color={disabled ? "#c4c4c4" : labelColor}>
          {subLabel}
        </Sarabun>
      </Label>
      <div style={spacingRadio} />
    </RadioButtonBox>
  )
}

export default RadioButton
