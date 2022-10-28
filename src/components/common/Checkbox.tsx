import styled from "@emotion/styled"
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { PRIMARY_DARK, PRIMARY_MAIN, TEXT_DARK, TEXT_LIGHT } from "../../constants/colors"
import { IndeterminateCheckBox } from "@mui/icons-material"
import { useCallback, useMemo } from "react"
import { Box } from "@mui/system"
import Sarabun from "./Sarabun"

const Layout = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  > label {
    margin: 0;
  }
  cursor: pointer;
`

const useStyle = makeStyles((theme) => ({
  checkbox: {
    "& .MuiSvgIcon-root": {
      width: "24px",
      height: "24px",
    },
    "&.MuiCheckbox-indeterminate": {
      padding: "5px",
      "& svg.MuiSvgIcon-root": {
        width: "24px ",
        height: "24px",
      },
    },
  },
}))

const BorderIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: `0 0 0 1px ${TEXT_DARK}`,

  ".Mui-checked &": {
    boxShadow: `0 0 0 1px ${PRIMARY_MAIN}`,
  },
  "input:disabled ~ &": {
    boxShadow: `0 0 0 1px ${TEXT_LIGHT}`,
  },
}))

const CheckedIcon = styled(BorderIcon)({
  backgroundColor: PRIMARY_MAIN,
  "input:disabled ~ &": {
    backgroundColor: TEXT_LIGHT,
  },
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: PRIMARY_DARK,
  },
})

const IndeterminateCheckBoxStyled = styled(IndeterminateCheckBox)({
  "input:disabled ~ &": {
    backgroundColor: TEXT_LIGHT,
  },
  "input:hover ~ &": {
    backgroundColor: PRIMARY_DARK,
  },
})

export type ICheckboxProps = {
  label: string | number | JSX.Element
  checked?: boolean
  onChange?: (checked: boolean) => void
} & Omit<MuiCheckboxProps, "onChange">

const Checkbox = (props: ICheckboxProps) => {
  const classes = useStyle()
  const {
    checked = false,
    onChange,
    label,
    className = "",
    value = false,
    disabled,
    ...restProps
  } = props

  const handleClick = useCallback(() => {
    if (!disabled) onChange?.(!value)
  }, [disabled, onChange, value])

  const renderLabel = useMemo(() => {
    if (typeof label === "string") {
      return <Sarabun>{label}</Sarabun>
    } else {
      return label
    }
  }, [label])

  return (
    <Layout onClick={handleClick}>
      <MuiCheckbox
        className={`${classes.checkbox} ${className}`}
        checkedIcon={<CheckedIcon />}
        icon={<BorderIcon />}
        indeterminateIcon={<IndeterminateCheckBoxStyled />}
        {...restProps}
        checked={!!value || !!checked}
        defaultChecked={!!value}
        disabled={disabled}
      />
      {renderLabel}
    </Layout>
  )
}

export default Checkbox
