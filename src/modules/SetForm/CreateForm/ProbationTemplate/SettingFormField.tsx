import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { Dispatch, useCallback } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Sarabun from "../../../../components/common/Sarabun"
import { DropdownField, InputField, SwitchField } from "../../../../components/fields"
import {
  GRAYSCALE_DARKGRAY_40,
  PRIMARY_MAIN,
  SECONDARY_BG,
  WHITE,
} from "../../../../constants/colors"
import { TemplateCreateState } from "../../../../services/enum-typed"
import { normalizeNumber } from "../../../../utils/helper"
import { IProbationTemplateFormType } from "./ProbationTemplateForm"

const Body = styled.div`
  background-color: ${WHITE};
  padding: 8px;
`

const Container = styled.div`
  background-color: ${WHITE};
  flex: 1;
  padding: 16px;
  align-self: stretch;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const BoxFieldName = styled.div`
  display: flex;
  column-gap: 24px;
  width: 60%;
`
const BoxFieldMgr = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  width: 60%;
`
const ButtonCard = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 24px;
`

type ITimeLineCardProps = {
  name: string
  fieldName: string
}

const SarabunStepUnderline = styled(Sarabun)`
  padding: 8px;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`
const RowGap = styled.div<{
  gap?: number
  padding?: number
}>`
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => `${gap}px`};
  padding: ${({ padding }) => `${padding}px`};
  width: 100%;
  align-items: center;
  background-color: ${SECONDARY_BG};
`
const SarabunStep = styled(Sarabun)`
  padding: 8px;
`

const TimeLineCard = (props: ITimeLineCardProps) => {
  const { name, fieldName } = props
  const { t } = useTranslation()
  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])
  return (
    <RowGap gap={8} padding={0}>
      <SarabunStepUnderline type="Subtitle1" style={{ width: "280px", minWidth: "fit-content" }}>
        {t(`${name}`)}
      </SarabunStepUnderline>
      <SarabunStep
        type="Subtitle1"
        style={{ width: "20px", minWidth: "fit-content" }}
      >{`ระยะเวลา`}</SarabunStep>
      <InputField
        name={`${fieldName}`}
        placeholder={t("จำนวน")}
        endUnit={true}
        unitText="วัน"
        style={{ paddingTop: "8px", marginBottom: "8px" }}
        parse={normalizeNumber}
        inputProps={{ maxLength: 2 }}
        validate={required}
      />
    </RowGap>
  )
}

type ISettingFormFieldProbationProps = {
  values: IProbationTemplateFormType
  invalid: boolean
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
}

const SettingFormField = (props: ISettingFormFieldProbationProps) => {
  const { t } = useTranslation()
  const { values, invalid, setCurrentState } = props

  const optionsDropdowns = [
    { label: "ลำดับที่ 1 (หัวหน้าติดตัว)", value: 1 },
    { label: "ลำดับที่ 2", value: 2 },
  ]

  const approveLevelDropdowns = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(TemplateCreateState.SET_TARGET)
  }, [setCurrentState])

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  return (
    <Body>
      <Container>
        <Sarabun type="H4">{t(`ตั้งค่าแบบฟอร์ม`)}</Sarabun>
        <Box height={32} />
        <BoxFieldName>
          <InputField
            name="name"
            label={t(`ชื่อฟอร์ม`)}
            isRequired={true}
            rows={4}
            multiline={true}
            placeholder={t(`กรุณากรอกข้อมูล`)}
            style={{ width: "100%" }}
            validate={required}
          />
        </BoxFieldName>
        <Box height={32} />
        <SwitchField name="isActive" label={"สถานะของแบบฟอร์ม"} type="checkbox" />
        <Box height={32} />
        <BoxFieldMgr>
          <DropdownField
            name="defaultMgr"
            options={optionsDropdowns}
            label={t(`เริ่มประเมินที่หัวหน้าลำดับที่`)}
            isRequired={true}
            style={{ width: "247px" }}
            placeHolder=""
            validate={required}
          />
          <DropdownField
            name="levelApprove"
            options={approveLevelDropdowns}
            label={t(`จำนวนขั้นของการประเมิน`)}
            isRequired={true}
            style={{ width: "247px", minWidth: "200px" }}
            validate={required}
          />
        </BoxFieldMgr>
        <Box height={32} />
        <InputField
          name="timeLine"
          label={t(`ขั้นตอนการประเมิน และระยะเวลาของแต่ละขั้นตอน`)}
          subLabel={t(
            `กำหนดวันที่ควรจะเป็นของแต่ละขั้นตอน เพื่อเป็นแนวทางบอกพนักงานว่าควรประเมินถึงขั้นตอนใดแล้ว`,
          )}
          isRequired={true}
          viewMode={true}
        />
        <TimeLineCard name="หัวหน้าลำดับ 1 ประเมิน 60 วัน" fieldName="mgr1_60" />
        {values.levelApprove === 2 && (
          <TimeLineCard name="หัวหน้าลำดับ 2 ประเมิน 60 วัน" fieldName="mgr2_60" />
        )}
        <TimeLineCard name="หัวหน้าลำดับ 1 ประเมิน 100 วัน" fieldName="mgr1_100" />
        {values.levelApprove === 2 && (
          <TimeLineCard name="หัวหน้าลำดับ 2 ประเมิน 100 วัน" fieldName="mgr2_100" />
        )}

        <TimeLineCard name="ลูกทีมรับทราบผลงาน" fieldName="acceptGrade" />

        <Box height={24} />
      </Container>
      <ButtonCard>
        <Button
          buttonType="contained"
          width={268}
          height={48}
          onClick={onClickChangeNextState}
          isDisabledButton={invalid}
          backgroundColor={PRIMARY_MAIN}
          endIcon={
            <Icon
              iconName="vector"
              width={7.5}
              height={15}
              stroke={WHITE}
              style={{ marginLeft: "16px" }}
            />
          }
        >
          {t(`ไปกำหนดเนื้อหาของแบบฟอร์ม`)}
        </Button>
      </ButtonCard>
    </Body>
  )
}

export default SettingFormField
