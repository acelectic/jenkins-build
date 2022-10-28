import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"
import Icon from "../../../../components/common/Icon"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

type IConfirmEditProp = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmEdit = (props: IConfirmEditProp) => {
  const { isOpen, setIsOpen, onCancel, onConfirm } = props
  const classes = useStyle()

  const { t } = useTranslation()

  const onClickCreateTemplate = useCallback(() => {
    onCancel()
    onConfirm()
  }, [onCancel, onConfirm])
  return (
    <Modal
      visibleUseState={[isOpen, setIsOpen]}
      onCancel={onCancel}
      onOk={onClickCreateTemplate}
      maxWidth={"482px"}
      style={{ textAlign: "center" }}
    >
      <div className={classes.detailTemplateColumn}>
        <Icon iconName="warningOrange" width={64} height={64} />
        <Box height={24} />
        <Sarabun type="H4">{t("คุณยืนยันที่จะแก้ไขเทมเพลตนี้หรือไม่?")}</Sarabun>
        <Box height={24} />
        <Sarabun type={"Body1"}>
          {t(
            "หากเทมเพลตนี้อยู่ในแบบฟอร์มที่พนักงานกำลังใช้งานอยู่ระบบจะยังใช้เทมเพลตที่ยังไม่ได้แก้ไขในการประเมินจนกว่าการประเมินนั้นจะสิ้นสุด",
          )}
        </Sarabun>
        <Box height={24} />
      </div>
    </Modal>
  )
}

export default ConfirmEdit
