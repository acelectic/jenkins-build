import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useTranslation } from "react-i18next"
import Icon from "../../../../components/common/Icon"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

type IConfirmDeleteProp = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmDeleteModal = (props: IConfirmDeleteProp) => {
  const { isOpen, setIsOpen, onCancel, onConfirm } = props
  const classes = useStyle()
  const { t } = useTranslation()

  return (
    <Modal
      visibleUseState={[isOpen, setIsOpen]}
      onCancel={onCancel}
      onOk={onConfirm}
      maxWidth={"482px"}
      style={{ textAlign: "center" }}
    >
      <div className={classes.detailTemplateColumn}>
        <Icon iconName="warningOrange" width={64} height={64} />
        <Box height={24} />
        <Sarabun type="H4">{t("คุณยืนยันที่จะลบเป้าหมายนี้หรือไม่?")}</Sarabun>
        <Box height={24} />
        <Sarabun type="Body1">{t("คุณยืนยันที่จะลบเป้าหมายนี้หรือไม่")}</Sarabun>
        <Box height={24} />
      </div>
    </Modal>
  )
}

export default ConfirmDeleteModal
