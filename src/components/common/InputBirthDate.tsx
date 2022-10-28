import { useMemo } from "react"
import styled from "styled-components/macro"
import { TextField, TextFieldProps } from "@mui/material"
import dayjs from "dayjs"

const InputBirthDateStyle = styled(TextField)`
  /* min-width: 148px; */
  width: 100%;
  .MuiFormLabel-root.Mui-disabled {
    color: #777777;
  }

  .MuiInputBase-input.Mui-disabled {
    color: #777777;
  }
`

type InputProps = Omit<TextFieldProps, "onChange" | "onBlur"> & {
  onChange: (value: any) => void
  onBlur: (value: any) => void
  prevValue: string
}

const InputBirthDate = (props: InputProps) => {
  const { value, onChange, onBlur, ...restProps } = props

  const customProps = useMemo(() => {
    return {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        let actuallyValue = ""
        const values = event.target.value.split("/")
        const value = event.target.value.replaceAll("/", "")
        const valuesLength = values.length
        const valueLength = value.length
        const regOnlyNumber = /^[0-9\b]+$/
        if (regOnlyNumber.test(value) || value === "") {
          const isEmpty = valueLength === 0
          if (isEmpty) {
            actuallyValue = ""
          } else {
            const day = values[0]
            const dayLength = day.length
            const isOneValueLength = dayLength === 1
            const isDayOver = Number(day[0]) > 3
            const isDayEqualThree = Number(day[0]) === 3
            const isHaveMonth = valuesLength > 1
            const isHaveYear = valuesLength === 3
            if (isOneValueLength) {
              if (isDayOver) {
                actuallyValue = `0${day[0]}/`
              } else {
                if (isHaveMonth) {
                  actuallyValue = day[0] + "/"
                } else {
                  actuallyValue = day[0]
                }
              }
            } else {
              if (isDayEqualThree) {
                const isLastDayOver = Number(day[1]) > 1
                if (isLastDayOver) {
                  actuallyValue = `0${day[1]}/`
                } else {
                  actuallyValue = `${day[0]}${day[1]}/`
                }
              } else {
                const isDayEmpty = dayLength === 0
                if (!isDayEmpty) {
                  actuallyValue = `${day[0]}${day[1]}/`
                } else {
                  if (isDayEmpty) {
                    actuallyValue += "/"
                  }
                }
              }
            }

            if (values[1]) {
              const month = values[1]
              const monthLength = month.length

              const isMonthOver = Number(month[0]) > 1
              if (isMonthOver) {
                actuallyValue += `0${month[0]}/`
              } else {
                const isMonthOne = Number(month[0]) === 1
                const isCompleteMonth = monthLength === 2

                if (isCompleteMonth) {
                  if (isMonthOne) {
                    const isLastMonthOver = Number(month[1]) > 2
                    if (isLastMonthOver) {
                      actuallyValue += `0${month[1]}/`
                    } else {
                      actuallyValue += `1${month[1]}/`
                    }
                  } else {
                    actuallyValue += `${month[0]}${month[1]}/`
                  }
                } else {
                  const isOneMonthLength = monthLength === 1
                  if (isOneMonthLength) {
                    actuallyValue += `${month[0]}`
                    console.debug(isHaveYear)
                    if (isHaveYear) {
                      actuallyValue += "/"
                    }
                  } else {
                    const isMonthEmpty = monthLength === 0
                    if (!isMonthEmpty) {
                      actuallyValue += `${month[0]}${month[1]}/`
                    }
                  }
                }
              }
            } else {
              if (isHaveYear) {
                actuallyValue += "/"
              }
            }

            if (values[2]) {
              const year = values[2]
              actuallyValue += year.substring(0, 4)
            }
          }

          onChange(actuallyValue)
        }
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
        let actuallyValue = ""

        const value = event.target.value
        const values = event.target.value.split("/")
        const countSlash = values.length

        const currentDate = dayjs()
        const currentDay = currentDate.format("DD").toString()
        const currentMonth = currentDate.format("MM").toString()
        const currentYear = currentDate.format("YYYY").toString()

        const day = values[0]
        const month = values[1]
        const year = values[2]

        const regOnlyNumber = /^[0-9\b]+$/
        if (regOnlyNumber.test(value) || value === "" || countSlash > 0) {
          if (!value || value === "") {
            actuallyValue = dayjs().set("date", 1).set("month", 0).format("DD/MM/YYYY")
          } else {
            if (day) {
              if (day === "0" || day === "00") {
                actuallyValue = currentDay + "/"
              } else if (day.length === 1) {
                actuallyValue = `0${day[0]}/`
              } else {
                actuallyValue = `${day}/`
              }
            } else {
              actuallyValue = currentDay + "/"
            }

            if (month) {
              if (month === "0" || month === "00") {
                actuallyValue += currentMonth + "/"
              } else if (month.length === 1) {
                actuallyValue += `0${month[0]}/`
              } else {
                actuallyValue += `${month}/`
              }
            } else {
              actuallyValue += currentDate.format("MM").toString() + "/"
            }

            if (year) {
              if (month === "0" || month === "00") {
                actuallyValue += currentYear + "/"
              } else if (year.length === 4) {
                actuallyValue += `${year}`
              } else {
                actuallyValue += `${currentYear.substring(0, 4 - year.length)}${year}`
              }
            } else {
              actuallyValue += currentYear
            }
          }

          const tempSplitActuallyValue = actuallyValue.split("/")
          const tempDate = `${tempSplitActuallyValue[2]}-${tempSplitActuallyValue[1]}-02`
          const correctDay = dayjs(tempDate).endOf("month").format("DD").toString()

          const isCorrectDay = correctDay < tempSplitActuallyValue[0]
          if (isCorrectDay) {
            actuallyValue = `${correctDay}/${tempSplitActuallyValue[1]}/${tempSplitActuallyValue[2]}`
          }

          onChange(actuallyValue)
        }
      },
      ...restProps,
    }
  }, [onChange, restProps, value])

  return <InputBirthDateStyle {...customProps} />
}

export default InputBirthDate
