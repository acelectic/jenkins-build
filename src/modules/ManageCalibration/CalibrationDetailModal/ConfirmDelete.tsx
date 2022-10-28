import Box from "@mui/material/Box"
import Sarabun from "../../../components/common/Sarabun"
import { makeStyles } from "@mui/styles"
import Icon from "../../../components/common/Icon"
import { useTranslation } from "react-i18next"
import { BehaviorTemplate, JsonScale } from "../../../services/kpi-template/kpi-template-type"
import Modal from "../../../components/common/Modal"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

type ConfirmDeleteProp = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel: () => void
  onConfirm: () => void
  behaviorTemplate?: BehaviorTemplate
  scale?: JsonScale
}

const ConfirmDelete = (props: ConfirmDeleteProp) => {
  const { isOpen, setIsOpen, onCancel } = props
  const classes = useStyle()
  const { t } = useTranslation()

  // const onClickConfirmDelete = useCallback(() => {
  //   if (behaviorTemplate) {
  //     deleteTemplate(
  //       {
  //         templateId: behaviorTemplate.id,
  //         templateType: TemplateType.BEHAVIOR,
  //       },
  //       {
  //         // onCancel ปิด modal ยืนยันการลบ
  //         // onConfirm ปิด modal รายละเอียดเทมเพลต
  //         onSuccess: () => {
  //           onCancel()
  //           onConfirm()
  //         },
  //       }
  //     )
  //   } else {
  //     deleteTemplate(
  //       {
  //         templateId: scale!.id,
  //         templateType: TemplateType.SCALE,
  //       },
  //       {
  //         // onCancel ปิด modal ยืนยันการลบ
  //         // onConfirm ปิด modal รายละเอียดเทมเพลต
  //         onSuccess: () => {
  //           onCancel()
  //           onConfirm()
  //         },
  //       }
  //     )
  //   }
  // }, [behaviorTemplate, deleteTemplate, onCancel, onConfirm, scale])

  return (
    <Modal
      visibleUseState={[isOpen, setIsOpen]}
      onCancel={onCancel}
      // onOk={onClickConfirmDelete}
      //childrenMargin={40}
      maxWidth={"482px"}
      style={{ textAlign: "center" }}
    >
      <div className={classes.detailTemplateColumn}>
        <Icon iconName="warningOrange" width={64} height={64} />
        <Box height={24} />
        <Sarabun type="H4">{t("คุณยืนยันที่จะลบเทมเพลตนี้หรือไม่?")}</Sarabun>
        <Box height={24} />
        <Sarabun type="Body1">
          {t(
            "หากเทมเพลตนี้อยู่ในแบบฟอร์มที่พนักงานกำลังใช้งานอยู่ระบบจะยังใช้เทมเพลตนี้ในการประเมินจนกว่าการประเมินนั้นจะสิ้นสุด",
          )}
        </Sarabun>
        <Box height={24} />
      </div>
    </Modal>
  )
}

export default ConfirmDelete
