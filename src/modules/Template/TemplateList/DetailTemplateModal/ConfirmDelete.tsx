import Box from "@mui/material/Box"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import { makeStyles } from "@mui/styles"
import Icon from "../../../../components/common/Icon"
import { useTranslation } from "react-i18next"
import { useDeleteTemplate } from "../../../../services/kpi-template/kpi-template-query"
import { useCallback } from "react"
import { BehaviorTemplate, JsonScale } from "../../../../services/kpi-template/kpi-template-type"
import { EnumTemplateType } from "../../CreateTemplate/SettingTemplateState"

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
  behaviorTemplate?: BehaviorTemplate
  scale?: JsonScale
}

const ConfirmDelete = (props: IConfirmDeleteProp) => {
  const { isOpen, setIsOpen, onCancel, onConfirm, behaviorTemplate, scale } = props
  const classes = useStyle()
  const { t } = useTranslation()

  const { mutate: deleteTemplate } = useDeleteTemplate()

  const onClickConfirmDelete = useCallback(() => {
    if (behaviorTemplate) {
      deleteTemplate(
        {
          templateId: behaviorTemplate.id,
          templateType: EnumTemplateType.BEHAVIOR,
        },
        {
          // onCancel ปิด modal ยืนยันการลบ
          // onConfirm ปิด modal รายละเอียดเทมเพลต
          onSuccess: () => {
            onCancel()
            onConfirm()
          },
        },
      )
    } else {
      deleteTemplate(
        {
          templateId: scale!.id,
          templateType: EnumTemplateType.SCALE,
        },
        {
          // onCancel ปิด modal ยืนยันการลบ
          // onConfirm ปิด modal รายละเอียดเทมเพลต
          onSuccess: () => {
            onCancel()
            onConfirm()
          },
        },
      )
    }
  }, [behaviorTemplate, deleteTemplate, onCancel, onConfirm, scale])

  return (
    <Modal
      visibleUseState={[isOpen, setIsOpen]}
      onCancel={onCancel}
      onOk={onClickConfirmDelete}
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
