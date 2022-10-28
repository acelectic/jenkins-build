import { Modal as MuiModal, Theme } from "@mui/material"
import { CSSProperties, ReactNode, useCallback } from "react"
import NewButton from "./Button"

import { makeStyles } from "@mui/styles"
import { PRIMARY_MAIN, WHITE } from "../../constants/colors"
import { useScreen } from "../../utils/responsive-helper"
import Icon from "./Icon"
import LoadingLayout from "./LoadingLayout"
import { StandardLonghandProperties } from "csstype"

type ExtraStyles = Pick<StandardLonghandProperties, "maxWidth"> & {
  fitMaxWidth?: boolean
}

export const useAppModalStyles = makeStyles<Theme, ExtraStyles>(() => ({
  appModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  layout: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-start",
    background: WHITE,
    width: ({ fitMaxWidth }) => (fitMaxWidth ? "100%" : undefined),
    minWidth: "300px",
    maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : undefined),
    overflowY: "hidden",
    maxHeight: "100%",
    boxSizing: "border-box",
    borderRadius: "8px",
    //backgroundColor: 'green',
    padding: "16px 16px 24px 16px",
    marginTop: "auto",
    marginBottom: "auto",
    // overflow: 'auto',
  },
  layoutMobile: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    background: WHITE,
    width: "100%",
    minHeight: "100%",
    padding: "16px 16px 24px 16px",
    marginTop: "auto",
    marginBottom: "auto",
    boxSizing: "border-box",
  },
  closeIcon: {
    display: "flex",
    justifyContent: "flex-end",
    width: "auto",
    //backgroundColor: '#8ef7ff',
  },
  body: {
    display: "flex",
    justifyContent: "center",
    // backgroundColor: '#ffaef4',
    width: "100%",
    height: "100%",
    overflow: "auto",
    padding: "0px 16px",
    boxSizing: "border-box",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "16px",
    //backgroundColor: '#ffd78e',
    "& :only-child": {
      margin: "0 auto",
    },
  },
}))

export type ModalProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  children: ReactNode
  onOk?: Function
  onOkText?: string
  onCancel?: () => void
  onClose?: () => void
  showCloseIcon?: boolean
  showCancelButton?: boolean
  showOkButton?: boolean
  onCancelText?: string
  closeOnClickOutside?: boolean
  style?: CSSProperties
  closeIcon?: boolean
  isLoading?: boolean
} & ExtraStyles

const Modal = (props: ModalProps) => {
  const {
    visibleUseState,
    children,
    onOk,
    onOkText = "ยืนยัน",
    onCancel,
    onClose,
    showCloseIcon = true,
    showCancelButton = true,
    showOkButton = true,
    onCancelText = "ยกเลิก",
    closeOnClickOutside = true,
    style,
    isLoading = false,
    // TODO: ต้องมาไล่จัดการ chidren ให้ width ตามตัว modal
    maxWidth = "680px",
    fitMaxWidth = false,
  } = props

  const classes = useAppModalStyles({ maxWidth, fitMaxWidth })

  const screen = useScreen()
  const { isMobile } = screen

  const [open, setOpen] = visibleUseState

  const clickCloseIcon = useCallback(() => {
    onClose ? onClose() : setOpen(!open)
  }, [onClose, open, setOpen])

  const handleCloseOnClickOutside = useCallback(() => {
    if (closeOnClickOutside) {
      onClose ? onClose() : setOpen(!open)
    }
  }, [closeOnClickOutside, onClose, open, setOpen])

  const clickCancelButton = useCallback(() => {
    onCancel ? onCancel() : setOpen(!open)
  }, [onCancel, open, setOpen])

  const clickOkButton = useCallback(() => {
    onOk?.()
  }, [onOk])

  return (
    <MuiModal
      open={open}
      onClose={handleCloseOnClickOutside}
      className={`${classes.appModal}`}
      aria-labelledby="app-modal-title"
      aria-describedby="app-modal-description"
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      style={!isMobile ? { margin: "18.5px" } : {}}
    >
      <div
        className={isMobile ? `content ${classes.layoutMobile}` : `content ${classes.layout}`}
        style={{
          ...style,
        }}
      >
        {
          <div className={classes.closeIcon}>
            {showCloseIcon && (
              <Icon onClick={clickCloseIcon} width={24} height={24} iconName={"close"} />
            )}
          </div>
        }
        <div className={classes.body}>
          <LoadingLayout isLoading={isLoading}>{children}</LoadingLayout>
        </div>
        {showCancelButton || showOkButton ? (
          <div
            className={classes.footer}
            style={isMobile ? { flexWrap: "wrap" } : { flexWrap: "nowrap" }}
          >
            {showCancelButton && (
              <NewButton
                buttonType="outlined"
                width={209}
                height={46}
                onClick={clickCancelButton}
                isDisabledButton={isLoading}
              >
                {onCancelText}
              </NewButton>
            )}
            {showOkButton && (
              <NewButton
                buttonType="contained"
                width={209}
                height={46}
                onClick={clickOkButton}
                isDisabledButton={isLoading}
                backgroundColor={PRIMARY_MAIN}
              >
                {onOkText}
              </NewButton>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </MuiModal>
  )
}

export default Modal
