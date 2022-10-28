import {
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  SelectChangeEvent,
  Box,
  InputAdornment,
} from "@mui/material"

import { ReactNode, useCallback, useState } from "react"
//import { ERROR, SECONDARY, TEXT_DARK, TEXT_LIGHT } from '../../constant/colors'
import styled from "@emotion/styled"
import Sarabun from "./Sarabun"
import Icon from "./Icon"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { makeStyles } from "@mui/styles"
import {
  BLACK,
  ERROR,
  GRAYSCALE_DARKGRAY_60,
  TEXT_DARK,
} from "../../constants/colors"

const ArrowDown = styled(KeyboardArrowDownIcon)`
  margin-right: 8px;
`
const EmptyArrow = styled(Box)``

const useStyle = makeStyles((theme) => ({
  dropdown: {
    borderRadius: "8px",
    overflow: "hidden",
    // minWidth: "224px",
    minWidth: "135px",
    width: "100%",
    maxHeight: "48px",
    // maxWidth: '384px',
  },
  dropdownViewMode: {
    borderRadius: "8px",
    minWidth: "132px",
    height: "24px",
    width: "fit-content",
    // maxWidth: '384px',
    "& .MuiSelect-select.MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "unset",
    },
  },

  selectAdornment: {
    "& .MuiButtonBase-root ": {
      position: "absolute",
      padding: 0,
      right: "32px",
      top: "calc(50% - 14px)",
      marginRight: "8px",
    },
  },
}))

export type DropdownProps<
  V extends BaseOptionType["value"] = BaseOptionType["value"]
> = {
  options: BaseOptionType[] | undefined
  value?: V
  label?: string | ReactNode
  subLabel?: string
  placeHolder?: string
  viewMode?: boolean
  isError?: boolean
  disabled?: boolean
  isRequired?: boolean
  testText?: string
  onChange?: (value?: V) => void
  isSpacialOption?: boolean
  isShowClearButton?: boolean
} & Omit<MuiSelectProps<V>, "onChange">

const Dropdown = (props: DropdownProps) => {
  const {
    value,
    onChange,
    options,
    testText,
    label,
    className = "",
    isRequired = false,
    isError = false,
    viewMode = false,
    disabled = false,
    subLabel,
    placeHolder,
    isSpacialOption = false,
    isShowClearButton = false,
    ...restProps
  } = props

  const classes = useStyle()
  const [currentValue, setCurrentValue] = useState<string | number | undefined>(
    value && value
  )

  const returnValue = useCallback(
    (event: SelectChangeEvent<BaseOptionType["value"]>) => {
      setCurrentValue(event.target.value)
      onChange?.(event.target.value)
    },
    [onChange]
  )

  const onClearValue = useCallback(() => {
    onChange?.(undefined)
    setCurrentValue(undefined)
  }, [onChange])

  return (
    <>
      <Sarabun size={14} weight={500} color={BLACK}>
        {label}
        {isRequired ? <span style={{ color: `${ERROR}` }}>{"*"}</span> : ""}
      </Sarabun>
      {label ? <div style={{ height: "8px" }}></div> : ""}
      {subLabel ? (
        <Sarabun size={12} weight={400} color={TEXT_DARK}>
          {subLabel}
        </Sarabun>
      ) : null}
      {subLabel ? <div style={{ height: "8px" }}></div> : <div></div>}

      {viewMode ? (
        <MuiSelect
          className={`${classes.dropdownViewMode} ${className}`}
          value={value}
          variant="standard"
          disableUnderline={true}
          disabled
          IconComponent={EmptyArrow}
          {...restProps}
        >
          {options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              <Sarabun type="Subtitle1" color={BLACK}>
                {opt.label}
              </Sarabun>
            </MenuItem>
          ))}
        </MuiSelect>
      ) : (
        <MuiSelect
          className={`${classes.dropdown} ${className}`}
          value={value}
          onChange={returnValue}
          // disableUnderline={true}
          disabled={disabled}
          error={isError}
          displayEmpty
          IconComponent={ArrowDown}
          endAdornment={
            <InputAdornment
              position="start"
              className={classes.selectAdornment}
              style={{ visibility: !currentValue ? "hidden" : "visible" }}
            >
              {isShowClearButton && (
                <Icon
                  onClick={onClearValue}
                  iconName="close"
                  width={28}
                  height={28}
                  style={{ padding: "4px" }}
                />
              )}
            </InputAdornment>
          }
          {...restProps}
        >
          {placeHolder !== undefined ? (
            <MenuItem disabled value="">
              <Sarabun type="Body1" color={GRAYSCALE_DARKGRAY_60}>
                {placeHolder}
              </Sarabun>
            </MenuItem>
          ) : null}
          {options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {!isSpacialOption && (
                <Sarabun type="Body1" color={BLACK}>
                  {opt.label}
                </Sarabun>
              )}

              {isSpacialOption && (
                <>
                  <Sarabun
                    type="H4"
                    color={BLACK}
                    style={{ display: "inline-block", marginRight: 5 }}
                  >
                    {`${opt.label.split("-")[0]}`}
                  </Sarabun>
                  <Sarabun
                    type="Body1"
                    color={BLACK}
                    style={{ display: "inline" }}
                  >
                    {opt.label.split("-")[1]}
                  </Sarabun>
                </>
              )}
            </MenuItem>
          ))}
        </MuiSelect>
      )}
    </>
  )
}

export default Dropdown
