import * as React from "react"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers/DatePicker"
import styled from "styled-components/macro"
import dayjs, { Dayjs } from "dayjs"

const CustomDatePicker = styled(MuiDatePicker)`
  margin: 0;
  width: 100%;
  height: 100%;

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

type DatePickerProps = {
  value?: Dayjs | null
  onChange?: (value: Dayjs | null) => void
} & Omit<MuiDatePickerProps, "renderInput" | "onChange" | "value">

const OldDatePicker = (props: DatePickerProps) => {
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomDatePicker
        value={value}
        inputFormat="dd/MM/yyyy"
        onChange={handleChange}
        {...restProps}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={params?.inputProps?.placeholder}
            variant="outlined"
            margin="normal"
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default OldDatePicker
