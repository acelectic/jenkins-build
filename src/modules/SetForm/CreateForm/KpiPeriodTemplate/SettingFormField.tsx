import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { Dispatch, useCallback, useMemo } from "react"
import { Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import dayjs from "dayjs"
import { useForm } from "react-final-form"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Sarabun from "../../../../components/common/Sarabun"
import {
  DropdownField,
  InputField,
  RadioGroupButtonField,
  DatePickerField,
} from "../../../../components/fields"
import {
  GRAYSCALE_DARKGRAY_40,
  PRIMARY_MAIN,
  SECONDARY_BG,
  WHITE,
} from "../../../../constants/colors"
import { QuarterType, TemplateCreateState } from "../../../../services/enum-typed"
import { OnChange } from "react-final-form-listeners"
import { normalizeNumber, normalizeYear } from "../../../../utils/helper"
import { IKpiPeriodTemplateForm } from "./KpiTemplateForm"

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
const BoxFieldYear = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  width: 60%;
`
const ButtonCard = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
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
  min-width: 700px;
`
const SarabunStep = styled(Sarabun)`
  padding: 8px;
`

type ITimeLineCardProps = {
  fieldName: string
  index: number
  values: IKpiPeriodTemplateForm
}

type ISettingFormFieldKpiProps = {
  values: IKpiPeriodTemplateForm
  invalid: boolean
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
}

const TimeLineCard = (props: ITimeLineCardProps) => {
  const { fieldName, index, values } = props
  const form = useForm()

  const onChangeNextTime = useCallback(
    (value: string | dayjs.Dayjs | null) => {
      form.change(`kpiTemplateTimelines[${index}].endDate`, dayjs(value).add(15, "days"))

      //row2
      if (index < 6) {
        form.change(`kpiTemplateTimelines[${index + 1}].startDate`, dayjs(value).add(16, "days"))
        form.change(`kpiTemplateTimelines[${index + 1}].endDate`, dayjs(value).add(31, "days"))
      }

      //row3
      if (index < 5) {
        form.change(`kpiTemplateTimelines[${index + 2}].startDate`, dayjs(value).add(32, "days"))
        form.change(`kpiTemplateTimelines[${index + 2}].endDate`, dayjs(value).add(47, "days"))
      }

      //row4
      if (index < 4) {
        form.change(`kpiTemplateTimelines[${index + 3}].startDate`, dayjs(value).add(48, "days"))
        form.change(`kpiTemplateTimelines[${index + 3}].endDate`, dayjs(value).add(63, "days"))
      }

      //row4
      if (index < 3) {
        form.change(`kpiTemplateTimelines[${index + 4}].startDate`, dayjs(value).add(64, "days"))
        form.change(`kpiTemplateTimelines[${index + 4}].endDate`, dayjs(value).add(79, "days"))
      }

      //row5
      if (index < 2) {
        form.change(`kpiTemplateTimelines[${index + 5}].startDate`, dayjs(value).add(80, "days"))
        form.change(`kpiTemplateTimelines[${index + 5}].endDate`, dayjs(value).add(95, "days"))
      }

      //row6
      if (index < 1) {
        form.change(`kpiTemplateTimelines[${index + 6}].startDate`, dayjs(value).add(96, "days"))
        form.change(`kpiTemplateTimelines[${index + 6}].endDate`, dayjs(value).add(111, "days"))
      }

      if (index >= 1) {
        form.change(`kpiTemplateTimelines[${index - 1}].endDate`, dayjs(value).subtract(1, "days"))
      }
    },
    [form, index],
  )

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  const startDate = useMemo(() => {
    return dayjs(values.kpiTemplateTimelines[index].startDate)
  }, [index, values])

  const endDate = useMemo(() => {
    return dayjs(values.kpiTemplateTimelines[index].endDate)
  }, [index, values])

  return (
    <RowGap gap={8} padding={8}>
      <Field name={`${fieldName}.name`} validate={required}>
        {({ input }) => {
          return (
            <SarabunStepUnderline
              type="Subtitle1"
              style={{ width: "280px", minWidth: "fit-content" }}
            >
              {input.value}
            </SarabunStepUnderline>
          )
        }}
      </Field>
      <Field name={`startDate`}>
        {({ input }) => {
          return (
            <DatePickerField
              name={`${fieldName}.startDate`}
              minDate={
                index >= 1
                  ? dayjs(input.value).toDate() &&
                    dayjs(values.kpiTemplateTimelines[index - 1].startDate)
                      .add(2, "days")
                      .toDate()
                  : dayjs(input.value).toDate()
              }
              onChange={(value) => {
                onChangeNextTime(value)
              }}
              validate={required}
            />
          )
        }}
      </Field>

      <SarabunStep
        type="Subtitle1"
        style={{ width: "20px", minWidth: "fit-content" }}
      >{`ถึง`}</SarabunStep>
      <DatePickerField
        name={`${fieldName}.endDate`}
        disabled={index === 6 ? false : true}
        validate={required}
      />
      {startDate.isValid() && endDate.isValid() && (
        <SarabunStep
          type="Body1"
          style={{ width: "120px", minWidth: "fit-content" }}
        >{`(ระยะเวลา ${dayjs(endDate).diff(startDate, "day")} วัน)`}</SarabunStep>
      )}
    </RowGap>
  )
}

const SettingFormField = (props: ISettingFormFieldKpiProps) => {
  const { values, invalid, setCurrentState } = props

  const { t } = useTranslation()
  const form = useForm()
  const periodDropdownList = [
    { label: "รายไตรมาส", value: "quarter" },
    { label: "รายครึ่งปี", value: "half_year" },
    { label: "รายปี", value: "year" },
    { label: "กำหนดเอง", value: "other" },
  ]
  const quarterDropdownList = [
    { label: "1", value: QuarterType.QUARTET_ONE },
    { label: "2", value: QuarterType.QUARTET_TWO },
    { label: "3", value: QuarterType.QUARTET_THREE },
    { label: "4", value: QuarterType.QUARTET_FOUR },
  ]
  const halfYearDropdownList = [
    { label: "ครึ่งปีแรก", value: QuarterType.FIRST_HALF },
    { label: "ครึ่งปีหลัง", value: QuarterType.SECOND_HALF },
  ]

  const optionsDropdownList = [
    { label: "ลำดับที่ 1 (หัวหน้าติดตัว)", value: 1 },
    { label: "ลำดับที่ 2", value: 2 },
  ]

  const levelApproveDropdownList = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ]

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(TemplateCreateState.SET_TARGET)
  }, [setCurrentState])

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  const onYearChange = useCallback(
    (value: string) => {
      const formType = values.formType
      const quarter = values.quarter
      const year = values.year
      if (year && year.length) {
        if (formType === "quarter") {
          //example form.change(`startDate`,dayjs(`${year}-04-01`).locale("th").format("DD MMMM YYYY"))
          if (quarter === "Q1") {
            form.change(`startDate`, dayjs(`${year}-01-01`))
            form.change(`endDate`, dayjs(`${year}-03-31`))
          } else if (quarter === "Q2") {
            form.change(`startDate`, dayjs(`${year}-04-01`))
            form.change(`endDate`, dayjs(`${year}-06-30`))
          } else if (quarter === "Q3") {
            form.change(`startDate`, dayjs(`${year}-07-01`))
            form.change(`endDate`, dayjs(`${year}-09-30`))
          } else if (quarter === "Q4") {
            form.change(`startDate`, dayjs(`${year}-10-01`))
            form.change(`endDate`, dayjs(`${year}-12-31`))
          }
        } else if (formType === "half_year") {
          if (quarter === "first_half") {
            form.change(`startDate`, dayjs(`${year}-01-01`))
            form.change(`endDate`, dayjs(`${year}-06-30`))
          } else if (quarter === "second_half") {
            form.change(`startDate`, dayjs(`${year}-07-01`))
            form.change(`endDate`, dayjs(`${year}-12-31`))
          }
        } else if (formType === "year") {
          form.change(`startDate`, dayjs(`${year}-01-01`))
          form.change(`endDate`, dayjs(`${year}-12-31`))
        }
      }
    },
    [form, values.formType, values.quarter, values.year],
  )
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
            rows={5}
            multiline={true}
            style={{ width: "100%" }}
            validate={required}
          />
        </BoxFieldName>
        <Box height={32} />
        <BoxFieldYear>
          <div style={{ width: "31.5%", minWidth: "150px" }}>
            <DropdownField
              name="formType"
              label={t(`รอบการประเมิน`)}
              options={periodDropdownList}
              placeHolder=""
              isRequired={true}
              validate={required}
            />
            <OnChange name={"formType"}>
              {(value) => {
                form.change("quarter", undefined)
                form.change("year", "")
                onYearChange(value)
              }}
            </OnChange>
          </div>
          {values.formType && values.formType !== "other" ? (
            <>
              {values.formType && values.formType !== "year" ? (
                <div style={{ width: "31.5%", minWidth: "150px" }}>
                  <DropdownField
                    name="quarter"
                    options={
                      values.formType && values.formType === "quarter"
                        ? quarterDropdownList
                        : halfYearDropdownList
                    }
                    label={t(`ไตรมาสที่`)}
                    style={{ width: "100%" }}
                    placeHolder=""
                    isRequired={true}
                    validate={required}
                  />
                  <OnChange name={"quarter"}>
                    {(value) => {
                      onYearChange(value)
                    }}
                  </OnChange>
                </div>
              ) : (
                <></>
              )}
              <div style={{ width: "31.5%", minWidth: "150px" }}>
                <InputField
                  name="year"
                  label={t(`ปีที่ทำการประเมิน(ค.ศ.)`)}
                  style={{ width: "100%" }}
                  placeHolder=""
                  isRequired={true}
                  inputProps={{ maxlength: 4 }}
                  validate={required}
                  format={normalizeYear}
                  parse={normalizeNumber}
                />
                <OnChange name={"year"}>
                  {(value: string) => {
                    value.length === 4 && onYearChange(value)
                  }}
                </OnChange>
              </div>
            </>
          ) : (
            <></>
          )}
        </BoxFieldYear>
        {values.formType === "other" ? (
          <>
            <Box height={32} />
            <BoxFieldName>
              <DatePickerField
                name="startDate"
                label={t(`วันที่เริ่มการประเมิน`)}
                isRequired={true}
                style={{ width: "31.5%", minWidth: "150px" }}
                validate={required}
              />
              <DatePickerField
                name="endDate"
                label={t(`วันที่จบการประเมิน`)}
                isRequired={true}
                style={{ width: "31.5%", minWidth: "150px" }}
                validate={required}
              />
            </BoxFieldName>
          </>
        ) : (
          <>
            {values.formType === "year" && values.year && (
              <>
                <Box height={32} />
                <BoxFieldName>
                  <DatePickerField
                    name="startDate"
                    label={t(`วันที่เริ่มการประเมิน`)}
                    isRequired={true}
                    style={{ width: "31.5%", minWidth: "150px" }}
                    validate={required}
                    disabled={true}
                  />
                  <DatePickerField
                    name="endDate"
                    label={t(`วันที่จบการประเมิน`)}
                    isRequired={true}
                    style={{ width: "31.5%", minWidth: "150px" }}
                    validate={required}
                    disabled={true}
                  />
                </BoxFieldName>
              </>
            )}
            {values.formType !== "year" && values.quarter && values.year && (
              <>
                <Box height={32} />
                <BoxFieldName>
                  <DatePickerField
                    name="startDate"
                    label={t(`วันที่เริ่มการประเมิน`)}
                    isRequired={true}
                    style={{ width: "31.5%", minWidth: "150px" }}
                    validate={required}
                    disabled={true}
                  />
                  <DatePickerField
                    name="endDate"
                    label={t(`วันที่จบการประเมิน`)}
                    isRequired={true}
                    style={{ width: "31.5%", minWidth: "150px" }}
                    validate={required}
                    disabled={true}
                  />
                </BoxFieldName>
              </>
            )}
          </>
        )}

        <Box height={32} />
        <RadioGroupButtonField
          name={"isCalibrated"}
          isRow={false}
          subLabelSize={12}
          title="การเข้าวงปรับเทียบผลงาน (Calibration)"
          titleSize={12}
          spacingRadio={{ width: "24px" }}
          isRequired={true}
          labelSize={14}
          options={[
            {
              value: "true",
              label: "เข้าวงปรับเทียบผลงาน (Calibration) ",
              subLabel:
                "ขั้นตอนการประเมิน: กำหนดเป้าหมาย > หัวหน้าอนุมัติเป้าหมาย > พนักงานประเมินตนเอง > หัวหน้าประเมินผลงาน > ปรับเทียบผลงาน (Calibration) > หัวหน้ารับผลและ feedback > ลูกทีมรับทราบผลงาน",
            },
            {
              value: "false",
              label: "ไม่เข้าวงปรับเทียบผลงาน (Calibration) ",
              subLabel:
                "ขั้นตอนการประเมิน: หัวหน้าประเมินผลงาน > หัวหน้ารับผลและ feedback > ลูกทีมรับทราบผลงาน",
            },
          ]}
          validate={required}
        />
        <Box height={32} />
        <BoxFieldYear>
          <div style={{ width: "31.5%", minWidth: "200px" }}>
            <DropdownField
              name="defaultMgr"
              label={t(`เริ่มประเมินที่หัวหน้าลำดับที่`)}
              options={optionsDropdownList}
              placeHolder=""
              isRequired={true}
              validate={required}
            />
          </div>
          {values.isCalibrated && values.isCalibrated === "false" ? (
            <>
              <div style={{ width: "31.5%", minWidth: "150px" }}>
                <DropdownField
                  name="levelApprove"
                  options={levelApproveDropdownList}
                  label={t(`จำนวนขั้นของการประเมิน`)}
                  style={{ width: "100%" }}
                  placeHolder=""
                  isRequired={true}
                  validate={required}
                />
              </div>
              <div style={{ width: "31.5%", minWidth: "150px" }}>
                <DropdownField
                  name="quotaGrade"
                  options={levelApproveDropdownList}
                  label={t(`จำกัดโควต้าเกรดที่ผู้ประเมินลำดับที่`)}
                  style={{ width: "100%" }}
                  placeHolder=""
                  isRequired={true}
                  validate={required}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </BoxFieldYear>

        <Field name={`startDate`}>
          {({ input }) => {
            return input.value ? (
              <>
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
                <FieldArray name={`kpiTemplateTimelines`}>
                  {({ fields }) => {
                    return fields.map((fieldName, index) => {
                      return (
                        <TimeLineCard
                          fieldName={fieldName}
                          key={fieldName}
                          index={index}
                          values={values}
                        />
                      )
                    })
                  }}
                </FieldArray>
              </>
            ) : null
          }}
        </Field>

        <Box height={32} />
        <RadioGroupButtonField
          name={"reqOneYear"}
          isRow={false}
          subLabelSize={8}
          title="การเปิดสิทธิการประเมินให้พนักงานที่อายุงานต่ำกว่า 1 ปี"
          titleSize={12}
          spacingRadio={{ width: "24px" }}
          isRequired={true}
          labelSize={14}
          options={[
            {
              value: "true",
              label: "ไม่เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้",
              subLabel: " ",
            },
            {
              value: "false",
              label: "เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้",
              subLabel: " ",
            },
          ]}
          validate={required}
        />
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
