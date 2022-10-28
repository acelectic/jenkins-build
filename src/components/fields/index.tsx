import { makeField } from "./tools"
import Input, { InputProps } from "../common/Input"
import Select from "../common/Select"
import OldDatePicker from "../common/OldDatePicker"
import TimePicker from "../common/TimePicker"
import InputBirthDate from "../common/InputBirthDate"
import AsyncSelect from "../common/AsyncSelect"
import ToggleButton from "../common/ToggleButton"
import ToggleButtonDefault from "../common/ToggleButtonDefault"
import SwitchButton from "../common/SwitchButton"
import Dropdown, { DropdownProps } from "../common/Dropdown"
import RadioButton, { IRadioButtonProps } from "../common/RadioButton"
import RadioGroupButton, { IRadioGroupButtonProps } from "../common/RadioGroupButton"
import Switch, { SwitchProps } from "../common/Switch"

import Checkbox from "../common/Checkbox"
import CustomDatePicker, { DateProps } from "../common/DatePicker"
import { Field } from "react-final-form"
import { ReactNode } from "react"

export const InputField = makeField<InputProps>(Input)

export const CheckboxField = makeField(Checkbox)

export const OldDatePickerField = makeField(OldDatePicker)

export const SelectField = makeField(Select)

export const TimePickerField = makeField(TimePicker)

export const InputBirthDateField = makeField(InputBirthDate)

export const AutoCompleteField = makeField(AsyncSelect)

export const ToggleButtonField = makeField(ToggleButton)

export const ToggleButtonDefaultField = makeField(ToggleButtonDefault)

export const SwitchButtonField = makeField(SwitchButton)

export const DropdownField = makeField<DropdownProps>(Dropdown)

export const RadioButtonField = makeField<IRadioButtonProps>(RadioButton)

export const RadioGroupButtonField = makeField<IRadioGroupButtonProps>(RadioGroupButton)

export const SwitchField = makeField<SwitchProps>(Switch)

export const DatePickerField = makeField<DateProps>(CustomDatePicker)

type IWatchValueFieldProps<V> = {
  name: string
  children: (value: V) => ReactNode
}

export const WatchValueField = <V extends any = any>(props: IWatchValueFieldProps<V>) => {
  return (
    <Field name={props.name} subscription={{ value: true, initial: true }}>
      {({ input }) => {
        return props.children(input.value)
      }}
    </Field>
  )
}
