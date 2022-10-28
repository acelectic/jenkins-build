import {
  ClickAwayListener,
  styled,
  Theme,
  Tooltip as MuiTooltip,
} from "@mui/material"
import {
  TooltipProps as MuiTooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip"
import { makeStyles } from "@mui/styles"
import { useCallback } from "react"
import { CSSProperties, PropsWithChildren } from "react"

type StyleToolTip = {
  arrowColor: string
}

const MyTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} arrow />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: "0",
    maxWidth: "750px",
    backgroundColor: "rgba(255, 0, 0, 0)",
    zIndex: "10",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ecf1fd",
  },
}))

const useStyle = makeStyles<Theme, StyleToolTip>({
  arrow: {
    [`& .${tooltipClasses.arrow}`]: {
      color: ({ arrowColor }) => arrowColor,
    },
  },
})

type ToolTipProps = {
  title?: MuiTooltipProps["title"]
  placement?: MuiTooltipProps["placement"]
  style?: CSSProperties
  className?: string
  arrow?: MuiTooltipProps["arrow"]
  open?: boolean
  isToggle?: boolean
  arrowColor?: string
  onClose?: () => void
}

const Tooltip = (props: PropsWithChildren<ToolTipProps>) => {
  const {
    children,
    isToggle = true,
    title = "",
    placement = "bottom-end",
    arrow = true,
    style,
    open,
    onClose,
    arrowColor = "#ecf1fd",
  } = props
  const classes = useStyle({ arrowColor })

  const handleTooltipClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div style={{ ...style }}>
        {isToggle ? (
          <MyTooltip
            open={open}
            title={title}
            arrow={arrow}
            placement={placement}
            disableHoverListener
            className={classes.arrow}
            onClose={onClose}
          >
            <div>{children}</div>
          </MyTooltip>
        ) : (
          <MyTooltip title={title} arrow={arrow} placement={placement}>
            <div>{children}</div>
          </MyTooltip>
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Tooltip
