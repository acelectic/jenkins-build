import {
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material"

import { RefObject } from "react"
import * as Icon from "react-feather"
import styled, { CSSProperties } from "styled-components/macro"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import Kanit from "./Kanit"
import OldSarabun from "./OldSarabun"
import OldButton from "./OldButton"
import { useTranslation } from "react-i18next"

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`
const IconDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 10px;
`

export type ModalProps = {
  isOpen: boolean
  title?: string
  children?: React.ReactNode
  childrenMargin?: number
  childrenPadding?: number
  titleMargin?: number
  titlePadding?: number
  fullWidth?: boolean
  maxWidth?: DialogProps["maxWidth"]
  onConfirm?: () => void
  onCancel: () => void
  modalRef?: RefObject<HTMLDivElement>
  style?: CSSProperties
  type?: "success" | "warning" | "error" | "info" | "danger" | "delete"
}

const OldModal = (props: ModalProps) => {
  const { t } = useTranslation()
  const {
    isOpen = false,
    title,
    children,
    onConfirm,
    onCancel,
    fullWidth = false,
    childrenMargin,
    childrenPadding,
    titlePadding,
    titleMargin,
    maxWidth = "sm",
    modalRef,
    type = "info",
    ...rest
  } = props
  return (
    <CardContent>
      <Dialog
        className="custom-dialog-class"
        ref={modalRef}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        {...rest}
      >
        <DialogTitle
          style={{ marginLeft: titleMargin, padding: titlePadding }}
          // id="alert-dialog-title"
        >
          <RowDiv>
            {type === "success" ? (
              <IconDiv style={{ backgroundColor: "#EFFAF1" }}>
                <Icon.Check style={{ color: "#2ECC71" }} />
              </IconDiv>
            ) : null}
            {type === "warning" ? (
              <IconDiv style={{ backgroundColor: "#F0F1D6" }}>
                <PriorityHighIcon style={{ color: "#FFE000" }} />
              </IconDiv>
            ) : null}
            {type === "error" || type === "danger" ? (
              <IconDiv style={{ backgroundColor: "#FCE9EF" }}>
                <Icon.X style={{ color: "#E0255F" }} />
              </IconDiv>
            ) : null}
            {type === "delete" ? (
              <IconDiv style={{ backgroundColor: "#FCE9EF" }}>
                <Icon.X style={{ color: "#E0255F" }} />
              </IconDiv>
            ) : null}
            <Kanit type="SmTitle">{title}</Kanit>
          </RowDiv>
        </DialogTitle>
        <DialogContent
          className="DialogContent"
          style={{
            marginInlineStart: childrenMargin,
            marginInlineEnd: childrenMargin,
            padding: childrenPadding,
            marginLeft: "40px",
          }}
        >
          <OldSarabun type="XsSubtitle">{children}</OldSarabun>
        </DialogContent>
        <DialogActions>
          {type === "success" || type === "warning" || type === "info" ? (
            <>
              <OldButton
                variant="outlined"
                onClick={onCancel}
                textType="XsSubtitle"
                textColor="#000000"
              >
                {t("modal.buttonClose")}
              </OldButton>
              <OldButton
                color="primary"
                variant="contained"
                onClick={onConfirm}
                textType="XsSubtitle"
              >
                {t("modal.buttonConfirm")}
              </OldButton>
            </>
          ) : null}
          {type === "danger" ? (
            <>
              <OldButton
                variant="outlined"
                onClick={onCancel}
                textType="XsSubtitle"
                textColor="#000000"
              >
                {t("modal.buttonClose")}
              </OldButton>
              <OldButton
                variant="contained"
                onClick={onConfirm}
                textType="XsSubtitle"
                color="error"
              >
                {t("modal.buttonCancel")}
              </OldButton>
            </>
          ) : null}
          {type === "error" ? (
            <>
              <OldButton
                variant="outlined"
                onClick={onCancel}
                textType="XsSubtitle"
                textColor="#000000"
              >
                {t("modal.buttonClose")}
              </OldButton>
            </>
          ) : null}
          {type === "delete" ? (
            <>
              <OldButton
                variant="outlined"
                onClick={onCancel}
                textType="XsSubtitle"
                textColor="#000000"
              >
                {t("modal.buttonClose")}
              </OldButton>
              <OldButton
                variant="contained"
                onClick={onConfirm}
                textType="XsSubtitle"
                color="error"
              >
                {t("modal.buttonDelete")}
              </OldButton>
            </>
          ) : null}
        </DialogActions>
      </Dialog>
    </CardContent>
  )
}

export default OldModal
