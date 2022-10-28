import Box from "@mui/material/Box"
import { ITemplateBehaviorDetail } from ".."
import Card from "../../../../components/common/Card"
import Sarabun from "../../../../components/common/Sarabun"
import { ScaleDetail } from "../../../../services/entity-typed"
import TemplateDetail from "../../components/TemplateDetail"
import { EnumTemplateType } from "../SettingTemplateState"
import { useTranslation } from "react-i18next"

export type IConfirmTemplateType = {
  nameTemplate: string
  templateBehaviors: ITemplateBehaviorDetail[]
  jsonScaleDetails: ScaleDetail[]
  templateType: EnumTemplateType
}

const ConfirmTemplateState = () => {
  const { t } = useTranslation()

  return (
    <Card elevation={5}>
      <Sarabun type="H4">{t("ตรวจสอบและยืนยัน")}</Sarabun>
      <Box height={32} />
      <TemplateDetail />
    </Card>
  )
}

export default ConfirmTemplateState
