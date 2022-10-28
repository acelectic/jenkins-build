import { CSSProperties, useCallback, useMemo } from "react"
import BaseAsyncSelect, { AsyncProps } from "react-select/async"

import { makeStyles } from "@mui/styles"
import { breakpoints } from "../../utils/responsive-helper"
import { NamedProps, components } from "react-select"
import SearchIcon from "@mui/icons-material/Search"

const useStyles = makeStyles({
  root: {
    fontFamily: "Sarabun-Light",
    fontSize: "14px",
    '& [class$="control"]': {
      boxShadow: "unset",
      minHeight: "2.9rem",
      // height: '2.5rem',

      "&:focus": {
        borderWidth: "0.063rem",
      },
      "&:hover": {
        boxShadow: "unset",
      },
    },
    '& [class$="indicatorContainer"]': {
      padding: "0.5rem",
      "& svg": {
        width: "1.25rem",
        height: "1.25rem",
      },
    },
    '& [class$="indicatorSeparator"]': {
      display: "none",
    },
    '& [class$="placeholder"]': {
      fontFamily: "Sarabun-Light",
      fontSize: "14px",
      fontWeight: "18.75rem",

      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    '& [class$="ValueContainer"]': {
      padding: "0px 0.5rem",
      [breakpoints.down("sm")]: {
        padding: "1.125px 0.5rem",
      },
    },
  },
})

export type AsyncSelectProps<T extends BaseOptionType = BaseOptionType> = {
  options: T[]
  loadOptions: (v: string) => Promise<T[]>
  value?: T["value"] | null
  onChange?: (value: T["value"] | null) => void
  className?: string
  style?: CSSProperties
  disabled?: boolean
} & Omit<
  NamedProps<T, false>,
  "onChange" | "loadOptions" | "options" | "value"
> &
  AsyncProps<T>

const DropdownIndicator = (props: any) => {
  // props should have type: type ElementConfig<typeof components.DropdownIndicator>
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    )
  )
}

const AsyncSelect = <T extends BaseOptionType>(props: AsyncSelectProps<T>) => {
  const {
    options,
    loadOptions,
    value,
    onChange,
    className,
    style,
    onInputChange,
    disabled,
    ...restProps
  } = props
  const classes = useStyles()

  const handleChange = useCallback(
    (option: T | null) => {
      //  onChange?.(option?.value || null)
      onChange && onChange(option?.value || null)
    },

    [onChange]
  )
  const tmpValue = useMemo(() => {
    return options && value
      ? options.find((opt: any) => opt.value === value)
      : null
  }, [options, value])

  return (
    <div
      className={`${classes.root} ${className}`}
      style={style}
      title={tmpValue ? tmpValue.label : undefined}
    >
      <BaseAsyncSelect
        isClearable
        isSearchable
        cacheOptions
        defaultOptions
        value={tmpValue}
        loadOptions={loadOptions}
        onChange={handleChange}
        onInputChange={onInputChange}
        components={{ DropdownIndicator }}
        isDisabled={disabled}
        menuPortalTarget={document.body}
        {...restProps}
      />
    </div>
  )
}

export default AsyncSelect
