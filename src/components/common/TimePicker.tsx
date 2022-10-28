import {
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from "@mui/x-date-pickers/TimePicker"
import styled from "styled-components/macro"
import TextField from "@mui/material/TextField"
import React from "react"
import dayjs, { Dayjs } from "dayjs"

const CustomTimePicker = styled(MuiTimePicker)`
  margin: 0;
  width: 100%;
  .MuiOutlinedInput-input {
    font-family: Sarabun-Regular;
    font-size: 14px;
    font-weight: 400;
  }
  .MuiFormLabel-root {
    font-family: Sarabun-Regular;
    font-size: 14px;
    font-weight: 400;
  }

  .MuiFormLabel-root.Mui-disabled {
    color: #777777;
  }

  .MuiInputBase-input.Mui-disabled {
    color: #777777;
  }
`

type TimePickerProps = {
  value?: Dayjs | null
  onChange?: (value: Dayjs | null) => void
} & Omit<MuiTimePickerProps, "renderInput" | "onChange" | "value">

const TimePicker = (props: TimePickerProps) => {
  const { value, onChange, ...restProps } = props
  const handleChange = React.useCallback(
    (date: any, keyboardInputValue?: string) => {
      if (date) {
        onChange?.(dayjs(date))
      } else {
        onChange?.(null)
      }
    },
    [onChange]
  )
  return (
    <CustomTimePicker
      value={value || null}
      onChange={handleChange}
      {...restProps}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" margin="normal" />
      )}
    />
  )
}

export default TimePicker
