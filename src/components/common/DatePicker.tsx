import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker"
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import Input from "../common/Input"

import { useCallback, useMemo, useState } from "react"
import dayjs, { Dayjs } from "dayjs"

export type DateProps = {
  isRequired?: boolean
  value?: Dayjs
  minDate?: Date
  onChange?: (value: Dayjs | null) => void
} & Omit<DatePickerProps<Date>, "renderInput" | "value" | "onChange">

const CustomDatePicker = (props: DateProps) => {
  const {
    disabled = false,
    isRequired,
    value,
    onChange,
    minDate,
    ...restProps
  } = props
  const [open, setOpen] = useState(false)
  const _value = useMemo(() => {
    return value && dayjs(value).isValid() ? dayjs(value).toDate() : null
  }, [value])

  const handleChange = useCallback(
    (date: Date | null, keyboardInputValue?: string | undefined) => {
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
      <DatePicker<Date>
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={_value}
        disabled={disabled}
        minDate={minDate}
        defaultCalendarMonth={minDate}
        inputFormat={"dd/MM/yyyy"}
        renderInput={(params) => (
          <Input
            isRequired={isRequired}
            onKeyDown={(event) => {
              event.preventDefault()
            }}
            {...params}
            onClick={(e) => {
              disabled ? setOpen(false) : setOpen(true)
            }}
          />
        )}
        onChange={handleChange}
        allowSameDateSelection
        {...restProps}
      />
    </LocalizationProvider>
  )
}

export default CustomDatePicker
