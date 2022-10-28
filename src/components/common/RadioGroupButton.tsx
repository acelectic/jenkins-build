import styled from "@emotion/styled"
import { FormControl, RadioGroup, RadioGroupProps } from "@mui/material"
import { CSSProperties, useCallback } from "react"
import Sarabun from "./Sarabun"
import RadioButton from "./RadioButton"
import { BLACK, PRIMARY_MAIN, SEMANTIC_ERROR_MAIN } from "../../constants/colors"

export type IRadioSize = "medium" | "small" | undefined
const CustomRadioGroupButton = styled(RadioGroup)<{
  color: string
}>`
  box-sizing: border-box;
`

export type IRadioGroupButtonProps = {
  title?: string
  titleSize?: number
  titleColor?: string
  labelColor?: string
  labelSize?: number
  isRow?: boolean
  color?: string
  value?: string
  isRequired?: boolean
  titleWeight?: number
  options: {
    value: string
    label: string
    subLabel?: string
    disabled?: boolean
  }[]
  disabled?: boolean
  subLabelSize?: number
  subLabelColor?: string
  style?: CSSProperties
  spacingRadio?: CSSProperties
  buttonColor?: string
  buttonSize?: IRadioSize
  onChange?: (value: string) => void
  checked?: string
} & Omit<RadioGroupProps, "value">

const RadioGroupButton = (props: IRadioGroupButtonProps) => {
  const {
    title,
    color = "#8fc9f9",
    value,
    onChange,
    titleSize = 16,
    titleColor = BLACK,
    labelColor = BLACK,
    labelSize = 16,
    buttonSize = "small",
    isRow = false,
    disabled = false,
    isRequired = false,
    titleWeight = 500,
    buttonColor = PRIMARY_MAIN,
    style,
    subLabelSize,
    subLabelColor,
    spacingRadio,
    options,

    ...restProps
  } = props

  const onRadioGroupButtonClick = useCallback(
    (value: string) => {
      onChange && onChange(value)
    },
    [onChange],
  )

  return (
    <FormControl>
      {!title ? null : (
        <Sarabun size={titleSize} color={titleColor} weight={titleWeight}>
          {title}
          {isRequired ? <span style={{ color: SEMANTIC_ERROR_MAIN }}>{"*"}</span> : <></>}
        </Sarabun>
      )}
      <CustomRadioGroupButton row={isRow} value={value} color={color} style={style} {...restProps}>
        {options.map((option, optionIndex) => {
          return (
            <RadioButton
              key={`${option.value}-${option.label}`}
              value={option.value}
              label={option.label}
              subLabel={option.subLabel}
              subLabelSize={subLabelSize}
              subLabelColor={subLabelColor}
              buttonColor={buttonColor}
              labelColor={labelColor}
              labelSize={labelSize}
              spacingRadio={spacingRadio}
              buttonSize={buttonSize}
              disabled={disabled ? disabled : option.disabled}
              onClick={onRadioGroupButtonClick.bind(null, option.value)}
              style={{ marginBottom: !isRow ? "16px" : "" }}
            />
          )
        })}
      </CustomRadioGroupButton>
    </FormControl>
  )
}

export default RadioGroupButton
