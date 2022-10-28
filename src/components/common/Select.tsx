import {
  FormControl as MuiFormControl,
  MenuItem,
  Select as MuiSelect,
  InputLabel,
  SelectProps as MuiSelectProps,
} from "@mui/material"
import styled from "styled-components/macro"
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined"
import OldSarabun from "./OldSarabun"

type OptionType = {
  label: string
  value: string | number | string[] | undefined
}

const ArrowIcon = styled(KeyboardArrowDownOutlined)`
  font-size: 26px;
`

const FormControl = styled(MuiFormControl)`
  min-width: 148px;
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

export type SelectProps = {
  value: unknown
  label: string
  multiple?: boolean
  onChange:
    | ((
        event: React.ChangeEvent<{
          name?: string | undefined
          value: unknown
        }>,
        child: React.ReactNode
      ) => void)
    | undefined
  options: OptionType[]
} & MuiSelectProps

const Select = (props: SelectProps) => {
  const {
    value,
    onChange,
    options,
    label,
    multiple = false,
    style,
    ...restProps
  } = props
  return (
    <FormControl variant="outlined" size="small" margin="dense">
      <InputLabel id="demo-simple-select-label">
        <OldSarabun type="XsSubtitle">{label}</OldSarabun>
      </InputLabel>
      <MuiSelect
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label={<OldSarabun type="XsSubtitle">{label}</OldSarabun>}
        value={value}
        multiple={multiple}
        onChange={onChange}
        IconComponent={ArrowIcon}
        style={style}
        {...restProps}
      >
        {options.map((opt) => (
          <MenuItem key={opt.label} value={opt.value}>
            <OldSarabun type="XsSubtitle">{opt.label}</OldSarabun>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
