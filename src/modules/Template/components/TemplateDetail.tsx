import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import { useMemo } from "react"
import { useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import { InputField } from "../../../components/fields"
import { ERROR } from "../../../constants/colors"
import { IConfirmTemplateType } from "../CreateTemplate/ConfirmTemplateState"
import ConfirmTemplateBehavior from "../CreateTemplate/ConfirmTemplateState/ConfirmTemplateBehavior"
import ConfirmTemplateLeadership from "../CreateTemplate/ConfirmTemplateState/ConfirmTemplateLeadership"
import ConfirmTemplateOpenEnded from "../CreateTemplate/ConfirmTemplateState/ConfirmTemplateOpenEnded"
import ConfirmTemplateScale from "../CreateTemplate/ConfirmTemplateState/ConfirmTemplateScale"
import { EnumTemplateType } from "../CreateTemplate/SettingTemplateState"

const BodyStyled = styled.div({
  display: "flex",
  flexDirection: "column",
  minWidth: "820px",
  marginTop: 32,
})

const TemplateDetail = () => {
  const formState = useFormState<IConfirmTemplateType>()
  const { values } = formState
  const { templateType } = values

  const { t } = useTranslation()

  const TemplateTypeRender = useMemo(() => {
    switch (templateType) {
      case EnumTemplateType.LEADERSHIP_DNA:
        return (
          <>
            <Sarabun type="Subtitle1">{t("แบบประเมิน 5 Leadership DNA")}</Sarabun>
            <Sarabun type="Overline">
              {t("เป็นเทมเพลตที่มีการกำหนดหัวข้อใหญ่และหัวข้อย่อยของการประเมิน")}
            </Sarabun>
          </>
        )
      case EnumTemplateType.BEHAVIOR:
        return (
          <>
            <Sarabun type="Subtitle1">{t("เทมเพลตแบบกำหนดหัวข้อให้")}</Sarabun>
            <Sarabun type="Overline">
              {t(
                "เป็นเทมเพลตที่คุณสามารถสร้างหัวข้อการประเมินให้พนักงานไว้เลยโดยไม่ให้พนักงานสามารถสร้างเทมเพลตเองได้",
              )}
            </Sarabun>
          </>
        )
      case EnumTemplateType.OPEN_ENDED:
        return (
          <>
            <Sarabun type="Subtitle1">{t("แบบประเมินคำถามปลายเปิด")}</Sarabun>
            <Sarabun type="Overline">
              {t(
                "เป็นเทมเพลตที่มีการกำหนดหัวข้อการประเมิน ที่เปิดโอกาสให้ผู้ประเมินได้แสดงความคิดเห็น",
              )}
            </Sarabun>
          </>
        )
      case EnumTemplateType.SCALE:
        return (
          <>
            <Sarabun type="Subtitle1">{t("เทมเพลตเปล่าที่ให้พนักงานสร้างหัวข้อเอง")}</Sarabun>
            <Sarabun type="Overline">
              {t(
                "เป็นเทมเพลตที่คุณสามารถกำหนดจำนวนข้อที่สามารถสร้างหัวข้อการประเมินได้แต่ไม่ได้สร้างหัวข้อการประเมินไว้ให้กับพนักงาน",
              )}
            </Sarabun>
          </>
        )
      default:
        return <></>
    }
  }, [t, templateType])

  return (
    <div>
      <InputField name="nameTemplate" viewMode label="ชื่อเทมเพลต" isRequired />
      <Box height={32} />
      <Sarabun type="Body2">
        {t("ประเภทของเทมเพลต")} <span style={{ color: ERROR }}>*</span>
      </Sarabun>
      <Box height={8} />
      <>{TemplateTypeRender}</>
      <BodyStyled>
        {templateType === EnumTemplateType.BEHAVIOR && <ConfirmTemplateBehavior />}
        {templateType === EnumTemplateType.SCALE && <ConfirmTemplateScale />}
        {templateType === EnumTemplateType.OPEN_ENDED && <ConfirmTemplateOpenEnded />}
        {templateType === EnumTemplateType.LEADERSHIP_DNA && <ConfirmTemplateLeadership />}
      </BodyStyled>
    </div>
  )
}

export default TemplateDetail
