import styled from "@emotion/styled"
import {
  Box,
  FormControlLabel,
  styled as styledMui,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { GRAYSCALE_DARKGRAY_60, PRIMARY } from "../../constants/colors"
import Sarabun from "./Sarabun"

const CustomSwitch = styledMui((props: MuiSwitchProps) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(23px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: `${PRIMARY}`,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: `${GRAYSCALE_DARKGRAY_60}`,
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}))

const LabelArea = styled("div")({
  paddingLeft: "12px",
  display: "flex",
  minWidth: 100,
  width: "fit-content",
  maxHeight: 26,
})

export type SwitchProps = {
  label?: string
  isChecked?: boolean
  isRequired?: boolean
  textOn?: string
  textOff?: string
} & MuiSwitchProps

const Switch = (props: SwitchProps) => {
  const {
    label,
    isRequired = false,
    checked = false,
    textOn = "เปิดใช้งาน",
    textOff = "ปิดใช้งาน",
    ...resProps
  } = props
  const { t } = useTranslation()
  const [valueText, setValueText] = useState(textOn)
  useEffect(() => {
    if (checked) {
      setValueText(textOn)
    } else if (!checked) {
      setValueText(textOff)
    }
  }, [checked, t, textOff, textOn])

  return (
    <>
      {isRequired ? (
        <Sarabun type={"Body2"}>
          {label}
          <span style={{ color: "red" }}>{"*"}</span>
        </Sarabun>
      ) : (
        <Sarabun type={"Body2"}>{label}</Sarabun>
      )}
      {label && <Box height={8} />}
      <LabelArea>
        <FormControlLabel
          control={<CustomSwitch {...resProps} />}
          label=""
          checked={checked}
        />
        <Sarabun>{valueText}</Sarabun>
      </LabelArea>
    </>
  )
}

export default Switch
