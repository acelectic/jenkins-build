import Tooltip from "../../components/common/Tooltip"
import { TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip"
import { CSSProperties, PropsWithChildren, useState } from "react"
import CustomIcon, { IconNameKeys } from "./Icon"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import styled from "@emotion/styled"

type InformationProps = {
  title?: MuiTooltipProps["title"]
  placement?: MuiTooltipProps["placement"]
  style?: CSSProperties
  arrow?: MuiTooltipProps["arrow"]
  isToggle?: boolean
  iconName?: IconNameKeys
  iconWidth?: number
  iconHeight?: number
}

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ecf1fd;
  padding: 32px 18px 26px 18px;
  gap: 16px;
  border-radius: 8px;
`

const Information = (props: PropsWithChildren<InformationProps>) => {
  const {
    title = "No Title",
    placement = "bottom-start",
    arrow = true,
    style = { width: "40px" },
    isToggle = false,
    iconName = "add",
    iconWidth = 24,
    iconHeight = 24,
  } = props

  const [open, setOpen] = useState(false)

  const handleTooltipOpen = () => {
    setOpen(!open)
  }

  const handleTooltipClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {isToggle ? (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            isToggle={true}
            open={open}
            title={<TitleDiv>{title}</TitleDiv>}
            placement={placement}
            arrow={arrow}
            style={style}
            onClose={handleTooltipClose}
          >
            <CustomIcon
              iconName={iconName}
              width={iconWidth}
              height={iconHeight}
              onClick={handleTooltipOpen}
            />
          </Tooltip>
        </ClickAwayListener>
      ) : (
        <Tooltip isToggle={false} title={title} placement={placement} arrow={arrow} style={style}>
          <CustomIcon iconName="add" width={24} height={24} onClick={handleTooltipOpen} />
        </Tooltip>
      )}
    </div>
  )
}

export default Information
