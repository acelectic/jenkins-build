import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import {
  OldDatePickerField,
  DropdownField,
  InputField,
  RadioGroupButtonField,
} from "../../../components/fields"
import { GRAYSCALE_DARKGRAY_40, PRIMARY_MAIN, SECONDARY_BG, WHITE } from "../../../constants/colors"
import ModalExampleOneYear from "../ModalExampleOneYear"

const BoxFieldName = styled.div`
  display: flex;
  column-gap: 24px;
  width: 60%;
`
const BoxFieldYear = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  width: 60%;
`
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
const ContentCard = styled.div`
  background-color: ${WHITE};
  padding: 24px;
`
const ButtonCard = styled.div`
  display: flex;
  justify-content: end;
`

type TimeLineCardProps = {
  name: string
  fieldName: string
}

const TimeLineCard = (props: TimeLineCardProps) => {
  const { name, fieldName: key } = props
  const { t } = useTranslation()
  return (
    <RowGap gap={8} padding={0}>
      <SarabunStepUnderline type="Subtitle1" style={{ width: "280px", minWidth: "fit-content" }}>
        {t(`${name}`)}
      </SarabunStepUnderline>
      <OldDatePickerField name={`${key}StartDate`} />
      <SarabunStep
        type="Subtitle1"
        style={{ width: "20px", minWidth: "fit-content" }}
      >{`ถึง`}</SarabunStep>
      <OldDatePickerField name={`${key}EndDate`} />
      <SarabunStep
        type="Body1"
        style={{ width: "120px", minWidth: "fit-content" }}
      >{`(ระยะเวลา 90 วัน)`}</SarabunStep>
    </RowGap>
  )
}

const KpiPeriodTemplateCreateFrom = () => {
  const { t } = useTranslation()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const optionsDropdown = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
  ]

  const templateRangeOptions = [
    { label: "รายไตรมาส", value: "quarter" },
    { label: "รายครึ่งปี", value: "half_year" },
    { label: "รายปี", value: "one_year" },
    { label: "กำหนดเอง", value: "other" },
  ]

  const quarterOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "4" },
    { label: "4", value: "3" },
  ]

  const halfYearOptions = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
  ]

  const onClickOpenModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  return (
    <>
      <ContentCard>
        <Sarabun type="H4">{t(`ตั้งค่าแบบฟอร์ม`)}</Sarabun>
        <Box height={32} />
        <BoxFieldName>
          <InputField
            name="name"
            label={t(`ชื่อฟอร์ม`)}
            isRequired={true}
            rows={5}
            multiline={true}
            style={{ width: "100%" }}
            placeholder={t(`กรุณากรอกข้อมูล`)}
          />
        </BoxFieldName>
        <Box height={32} />
        <BoxFieldYear>
          <div style={{ width: "100%" }}>
            <DropdownField
              name="templateRange"
              label={t(`รอบการประเมิน`)}
              options={templateRangeOptions}
              placeHolder=""
              isRequired={true}
            />
          </div>
          <div style={{ width: "100%" }}>
            <DropdownField
              name="quarter"
              options={quarterOptions}
              label={t(`ไตรมาสที่`)}
              style={{ width: "100%" }}
              placeHolder=""
              isRequired={true}
            />
          </div>
          <div style={{ width: "100%" }}>
            <DropdownField
              name="year"
              label={t(`ปีที่ทำการประเมิน(ค.ศ.)`)}
              options={optionsDropdown}
              style={{ width: "100%" }}
              placeHolder=""
              isRequired={true}
            />
          </div>
        </BoxFieldYear>
        <Box height={32} />
        <BoxFieldName>
          <InputField
            name="startDate"
            label={t(`วันที่เริ่มการประเมิน`)}
            isRequired={true}
            style={{ width: "31.5%" }}
          />
          <InputField
            name="endDate"
            label={t(`วันที่จบการประเมิน`)}
            isRequired={true}
            style={{ width: "31.5%" }}
          />
        </BoxFieldName>
        <Box height={32} />
        <RadioGroupButtonField
          name={"calibration"}
          isRow={false}
          subLabelSize={12}
          title="การเข้าวงปรับเทียบผลงาน (Calibration)"
          titleSize={12}
          spacingRadio={{ width: "24px" }}
          isRequired={true}
          labelSize={14}
          options={[
            {
              value: "on",
              label: "เข้าวงปรับเทียบผลงาน (Calibration) ",
              subLabel:
                "ขั้นตอนการประเมิน: กำหนดเป้าหมาย >หัวหน้าอนุมัติเป้าหมาย > พนักงานประเมินตนเอง > หัวหน้าประเมินผลงาน > ปรับเทียบผลงาน (Calibration) > หัวหน้ารับผลและ feedback > ลูกทีมรับทราบผลงาน",
            },
            {
              value: "off",
              label: "ไม่เข้าวงปรับเทียบผลงาน (Calibration) ",
              subLabel:
                "ขั้นตอนการประเมิน: หัวหน้าประเมินผลงาน > หัวหน้ารับผลและ feedback > ลูกทีมรับทราบผลงาน",
            },
          ]}
        />
        <Box height={32} />
        <DropdownField
          name="mgrSeq"
          label={t(`เริ่มประเมินที่หัวหน้าลำดับที่`)}
          isRequired={true}
          style={{ width: "18.5%" }}
          options={halfYearOptions}
        />
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
        <TimeLineCard name={"กำหนดเป้าหมาย"} fieldName={"setGoal"} />
        <TimeLineCard name={"หัวหน้าอนุมัติเป้าหมาย"} fieldName={"approveGoal"} />
        <TimeLineCard name={"พนักงานประเมินตนเอง"} fieldName={"selfEvaluation"} />
        <TimeLineCard name={"หัวหน้าประเมินผลงาน"} fieldName={"managerEvaluation"} />
        <TimeLineCard name={"ปรับเทียบผลงาน (Calibration)"} fieldName={"calibration"} />
        <TimeLineCard name={"หัวหน้ารับผลและ feedback"} fieldName={"OneOnOneMeeting"} />
        <TimeLineCard name={"ลูกทีมรับทราบผลงาน"} fieldName={"acceptGrade"} />
        <Box height={32} />
        <RadioGroupButtonField
          name={"underOneYear"}
          isRow={false}
          subLabelSize={8}
          title="การเปิดสิทธิการประเมินให้พนักงานที่อายุงานต่ำกว่า 1 ปี"
          titleSize={12}
          spacingRadio={{ width: "24px" }}
          isRequired={true}
          labelSize={14}
          options={[
            {
              value: "close",
              label: "ไม่เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้",
              subLabel: " ",
            },
            {
              value: "open",
              label: "เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้",
              subLabel: " ",
            },
          ]}
        />
      </ContentCard>
      <Box height={24} />
      <ButtonCard>
        <Button
          buttonType="contained"
          width={268}
          height={48}
          onClick={onClickOpenModal}
          isDisabledButton={false}
          backgroundColor={PRIMARY_MAIN}
        >
          {t(`example`)}
        </Button>
        <Button
          buttonType="contained"
          width={268}
          height={48}
          onClick={() => {}}
          isDisabledButton={false}
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
      <ModalExampleOneYear visibleUseState={[isOpenModal, setIsOpenModal]} />
    </>
  )
}

export default KpiPeriodTemplateCreateFrom
