import TextField, { TextFieldProps } from "@mui/material/TextField"
import styled from "@emotion/styled"
import {
  BLACK,
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  TEXT,
  TEXT_DARK,
  TEXT_LIGHT,
} from "../../constants/colors"
import Sarabun from "./Sarabun"
import { InputAdornment } from "@mui/material"
import CustomIcon, { IconNameKeys } from "./Icon"
import { normalizeEnter } from "../../utils/helper"
import Icon from "./Icon"
import { CSSProperties } from "styled-components"

const StyledInput = styled(TextField)<{
  disabled: boolean
}>`
  width: 100%;
  font-family: "Sarabun";
  background-color: white;
  border-radius: 8px;
  .MuiOutlinedInput-root {
    color: ${BLACK};
    font-family: "Sarabun";
    font-size: 14px;
    min-height: 48px;
    padding: 8px 8px 8px 8px;
    border-radius: 8px;
  }
  .MuiOutlinedInput-input {
    padding: 0px;
    line-height: 30px;
    height: 2em;
  }
`

export type InputProps = {
  isRequired?: boolean
  isError?: boolean
  subLabel?: string
  startUnit?: boolean
  endUnit?: boolean
  unitText?: string
  startIcon?: boolean
  endIcon?: boolean
  IconName?: IconNameKeys
  fieldPassword?: boolean
  descriptionText?: string
  showDescription?: boolean
  viewMode?: boolean
  inputColor?: string
  style?: CSSProperties
} & TextFieldProps

export const Input = (props: InputProps) => {
  const {
    disabled = false,
    label,
    isRequired = false,
    isError = false,
    value,
    multiline,
    placeholder,
    rows,
    subLabel,
    startUnit = false,
    endUnit = false,
    unitText,
    startIcon = false,
    endIcon = false,
    IconName = "add",
    fieldPassword,
    viewMode = false,
    style,
    ...restProps
  } = props
  return (
    <>
      <Sarabun type="Body2" size={14} color={disabled ? `${TEXT_LIGHT}` : `${TEXT}`}>
        {label} {isRequired && <span style={{ color: `${ERROR}` }}>*</span>}
      </Sarabun>
      {subLabel != null ? (
        <>
          <div style={{ height: "4px" }}></div>
          <Sarabun type="Caption" size={12} color={disabled ? `${TEXT_LIGHT}` : `${TEXT_DARK}`}>
            {subLabel}
          </Sarabun>
        </>
      ) : null}
      {label != null ? <div style={{ height: "8px" }}></div> : null}
      <>
        {viewMode ? (
          <Sarabun type="H6" color={BLACK}>
            {`${value}`}
          </Sarabun>
        ) : (
          <StyledInput
            disabled={disabled}
            value={multiline ? normalizeEnter(value) : value}
            error={isError}
            placeholder={placeholder}
            variant="outlined"
            multiline={multiline}
            size="medium"
            rows={rows}
            autoComplete="off"
            style={style}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {startUnit ? (
                    <>
                      <Sarabun
                        type="Body1"
                        color={disabled ? `${GRAYSCALE_DARKGRAY_40}` : `${BLACK}`}
                        style={{ padding: "0px 0px 0px 4px" }}
                      >
                        {unitText}
                      </Sarabun>
                      <Sarabun
                        style={{ paddingLeft: "10px" }}
                        color={disabled ? `${GRAYSCALE_DARKGRAY_40}` : ""}
                      >
                        |
                      </Sarabun>
                    </>
                  ) : null}
                  {startIcon ? <Icon iconName={IconName} style={{ padding: "4px" }} /> : null}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {endUnit ? (
                    <>
                      <Sarabun
                        style={{ paddingRight: "10px" }}
                        color={disabled ? `${GRAYSCALE_DARKGRAY_40}` : ""}
                      >
                        |
                      </Sarabun>
                      <Sarabun
                        type="Body1"
                        color={disabled ? `${GRAYSCALE_DARKGRAY_40}` : `${BLACK}`}
                        style={{ padding: "0px 4px 0px 0px" }}
                      >
                        {unitText}
                      </Sarabun>
                    </>
                  ) : null}
                  {endIcon ? <CustomIcon iconName={IconName} style={{ padding: "4px" }} /> : null}
                </InputAdornment>
              ),
            }}
            {...restProps}
          />
        )}
      </>
    </>
  )
}

export default Input
