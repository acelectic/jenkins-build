import styled from "@emotion/styled"
import dayjs, { Dayjs } from "dayjs"
import { keyBy } from "lodash"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_10,
  PRIMARY_DARK,
  SEMANTIC_SUCCESS_DARK,
} from "../constants/colors"

import {
  EmployeeForKpiTemplate,
  OptionKpiTemplateResponse,
  ISubmitCreateKpiType,
} from "../services/set-form/set-form-type"
import { KpiPeriodTemplate, Paging } from "../services/entity-typed"
import { FormType, QuarterType, StateKpiType } from "../services/enum-typed"
import { format2DecimalNumber, normalizeDateTH } from "../utils/helper"
import Icon from "./common/Icon"

import Sarabun from "./common/Sarabun"
import SetScoreLevel from "./common/SetScoreLevel"

import HierarchyView from "./HierarchyView"

import HierarchyFormValuesView from "./HierarchyFormValuesView"
import ModalViewEmployeesKpi from "./ModalViewEmployeesKpi"
import {
  IKpiPeriodTemplateForm,
  ITimelinesKpiTemplate,
} from "../modules/SetForm/CreateForm/KpiPeriodTemplate/KpiTemplateForm"
import { Field } from "react-final-form"
import { EnumSelectHierarchyGroupField } from "./SelectHierarchyGroup/helper"
import { EnumSelectedEmployeeType } from "./fields/ChooseSelectGroupComponent"

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
`

const RowIcon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  height: 100%;
  margin: 0 16px;
  min-width: 200px;
  width: 38%;
`

const RowSpaceBetween = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  gap: 32px;
`

const AssessmentRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Column = styled.div<{
  gap?: number
  marginBottom?: number
  isCenter?: boolean
  minWidth?: number
  minHeight?: number
  padding?: string
  bgColor?: string
  width100?: boolean
}>`
  display: flex;
  flex-direction: column;
  width: ${({ width100 }) => (width100 ? `100%` : "")};
  min-width: ${({ minWidth }) => `${minWidth}px`};
  min-height: ${({ minHeight }) => `${minHeight}px`};
  padding: ${({ padding }) => padding};
  gap: ${({ gap }) => (gap ? `${gap}px` : "8px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : "")};
  justify-content: ${({ isCenter }) => (isCenter ? `center` : "")};
  align-items: ${({ isCenter }) => (isCenter ? `center` : "")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "")};
  height: 100%;
  box-sizing: border-box;
`

const StepDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px;
  align-items: baseline;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  margin-top: 12px;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  width: 100%;
`

const SarabunStep = styled(Sarabun)`
  padding: 8px;
`

const SarabunStepUnderline = styled(Sarabun)`
  padding: 8px;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const TextRow = styled.div`
  display: flex;
  text-align: end;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`

const TextColumn = styled.div<{
  margin?: string
  gap?: number
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? `${gap}px` : "8px")};
  margin: ${({ margin }) => (margin ? margin : "")};
`

const GoalDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const GoalDetailCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  box-sizing: border-box;
  height: 100px;
  align-items: center;
  overflow: hidden;
`

const GoalBox = styled.div`
  display: flex;
  min-width: 260px;
  flex-direction: column;
  gap: 8px;
  width: 36%;
`

const PercentBox = styled.div`
  display: flex;
  gap: 8px;
  min-width: 200px;
  width: 16%;
  padding: 0 16px;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  height: 100%;
  align-items: center;
`

const EmptyBox = styled.div`
  display: flex;
  width: 10%;
`

const GoalDetailResult = styled.div`
  display: flex;
  flex-direction: row;
  height: 100px;
  box-sizing: border-box;
  width: 100%;
`

const SelectedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  width: 100%;
`

const TextRowSpaceBetween = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`

const SarabunOnClick = styled(Sarabun)`
  border-bottom: 1px solid ${PRIMARY_DARK};
  :hover {
    cursor: pointer;
  }
`

type ITimeLineCardProps = {
  name: string
  startDate?: string | Dayjs
  endDate?: string | Dayjs
}

type ITemplateDetailProps = {
  kpiPeriodTemplate?: KpiPeriodTemplate
  values?: IKpiPeriodTemplateForm
  isForm?: boolean
  options?: OptionKpiTemplateResponse
  employeeList?: EmployeeForKpiTemplate[]
  pagingResponse?: Paging
  pageStates: [number, React.Dispatch<React.SetStateAction<number>>]
  pageSizeStates: [number, React.Dispatch<React.SetStateAction<number>>]
  isLoading: boolean
}

const TimeLineCard = (props: ITimeLineCardProps) => {
  const { name, startDate, endDate } = props
  const countDay: number = dayjs(endDate).diff(startDate, "day")
  return (
    <RowGap gap={8} padding={4}>
      <SarabunStepUnderline type="Subtitle1" style={{ width: "280px", minWidth: "fit-content" }}>
        {name}
      </SarabunStepUnderline>
      <SarabunStep type="Subtitle1" style={{ width: "150px", minWidth: "fit-content" }}>
        {normalizeDateTH(startDate || "")}
      </SarabunStep>
      <SarabunStep
        type="Subtitle1"
        style={{ width: "20px", minWidth: "fit-content" }}
      >{`ถึง`}</SarabunStep>
      <SarabunStep type="Subtitle1" style={{ width: "150px", minWidth: "fit-content" }}>
        {normalizeDateTH(endDate || "")}
      </SarabunStep>
      <SarabunStep
        type="Body1"
        style={{ width: "120px", minWidth: "fit-content" }}
      >{`(ระยะเวลา ${countDay} วัน)`}</SarabunStep>
    </RowGap>
  )
}

const TemplateDetail = (props: ITemplateDetailProps) => {
  const {
    kpiPeriodTemplate,
    values,
    isForm = false,
    options,
    employeeList,
    pagingResponse,
    pageStates,
    pageSizeStates,
    isLoading,
  } = props
  const { t } = useTranslation()
  const optionsHashScale = keyBy(options?.scaleOptions, (e) => e.id)
  const optionsHashBehavior = keyBy(options?.behaviorTemplateOptions, (e) => e.id)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const kpiPeriodTemplateForm: ISubmitCreateKpiType | undefined = useMemo(() => {
    if (isForm) {
      const params: ISubmitCreateKpiType = {
        name: values?.name || "",
        descriptionForUser: values?.descriptionForUser || "",
        descriptionForMgr: values?.descriptionForMgr || "",
        formType: values?.formType || "",
        quarter: values?.quarter || "",
        year: values?.year || "",
        startDate: values?.startDate || "",
        endDate: values?.endDate || "",
        companies: values?.companies || [],
        scaleForGrade: values?.scaleForGrade!,

        calKpi: {
          scaleId:
            values?.jsonCalKpi && values?.jsonCalKpi.scaleId
              ? values?.jsonCalKpi.scaleId
              : undefined,
          cal: values?.jsonCalKpi && values?.jsonCalKpi.cal ? Number(values?.jsonCalKpi.cal) : 0,
          name:
            values?.jsonCalKpi && values?.jsonCalKpi.scaleId && Number(values?.jsonCalKpi.cal) > 0
              ? optionsHashScale[values?.jsonCalKpi.scaleId].name
              : "",
        },

        calKpiCompany: {
          scaleId:
            values?.jsonCalKpiCompany && values?.jsonCalKpiCompany.scaleId
              ? values?.jsonCalKpiCompany.scaleId
              : undefined,
          cal:
            values?.jsonCalKpiCompany && values?.jsonCalKpiCompany.cal
              ? Number(values?.jsonCalKpiCompany.cal)
              : 0,
          name:
            values?.jsonCalKpiCompany &&
            values?.jsonCalKpiCompany.scaleId &&
            Number(values?.jsonCalKpiCompany.cal) > 0
              ? optionsHashScale[values?.jsonCalKpiCompany.scaleId].name
              : "",
        },
        calKpiOther: {
          scaleId:
            values?.jsonCalKpiOther && values?.jsonCalKpiOther.scaleId
              ? values?.jsonCalKpiOther.scaleId
              : undefined,
          cal:
            values?.jsonCalKpiOther && values?.jsonCalKpiOther.cal
              ? Number(values?.jsonCalKpiOther.cal)
              : 0,
          name:
            values?.jsonCalKpiOther &&
            values?.jsonCalKpiOther.scaleId &&
            Number(values?.jsonCalKpiOther.cal) > 0
              ? optionsHashScale[values?.jsonCalKpiOther.scaleId].name
              : "",
        },
        calBehavior: {
          behaviorTemplateId:
            values?.jsonCalBehavior && values?.jsonCalBehavior.behaviorTemplateId
              ? values?.jsonCalBehavior.behaviorTemplateId
              : undefined,
          cal:
            values?.jsonCalBehavior && values?.jsonCalBehavior.cal
              ? Number(values?.jsonCalBehavior.cal)
              : 0,
          name:
            values?.jsonCalBehavior &&
            values?.jsonCalBehavior.behaviorTemplateId &&
            Number(values?.jsonCalBehavior.cal) > 0
              ? optionsHashBehavior[values?.jsonCalBehavior.behaviorTemplateId].name
              : "",
        },
        kpiTemplateTimelines: [
          {
            stateKpi: StateKpiType.SET_GOAL,
            startDate: dayjs(values?.kpiTemplateTimelines[0].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[0].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.APPROVE_GOAL,
            startDate: dayjs(values?.kpiTemplateTimelines[1].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[1].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.SELF_EVALUATION,
            startDate: dayjs(values?.kpiTemplateTimelines[2].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[2].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.MANAGER_EVALUATION,
            startDate: dayjs(values?.kpiTemplateTimelines[3].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[3].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.CALIBRATION,
            startDate: dayjs(values?.kpiTemplateTimelines[4].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[4].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.MEETING,
            startDate: dayjs(values?.kpiTemplateTimelines[5].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[5].endDate).format("YYYY-MM-DD").toString(),
          },
          {
            stateKpi: StateKpiType.ACCEPT_GRADE,
            startDate: dayjs(values?.kpiTemplateTimelines[6].startDate)
              .format("YYYY-MM-DD")
              .toString(),
            endDate: dayjs(values?.kpiTemplateTimelines[6].endDate).format("YYYY-MM-DD").toString(),
          },
        ],
        reqOneYear: values?.reqOneYear === "true" ? true : false,
        isCalibrated: values?.isCalibrated === "true" ? true : false,
        levelApprove: values?.levelApprove || 1,
        defaultMgr: values?.defaultMgr || 1,

        groupSelected: values?.groupSelected,
        isOrganize: values?.selectEmployeeType === EnumSelectedEmployeeType.HIERARCHY,
      }
      return params
    } else {
      return undefined
    }
  }, [isForm, optionsHashBehavior, optionsHashScale, values])

  const timelines: Partial<ITimelinesKpiTemplate>[] = useMemo(() => {
    if (!isForm) {
      return kpiPeriodTemplate?.kpiTemplateTimelines || []
    } else {
      return kpiPeriodTemplateForm?.kpiTemplateTimelines || []
    }
  }, [isForm, kpiPeriodTemplate?.kpiTemplateTimelines, kpiPeriodTemplateForm?.kpiTemplateTimelines])

  const onClickOpenModal = useCallback(() => {
    setIsOpenModal(true)
  }, [])

  const hierarchyData = useMemo(() => {
    return {
      companies: kpiPeriodTemplate?.companies,
      jobFunctions: kpiPeriodTemplate?.jobFunctions,
      divisions: kpiPeriodTemplate?.divisions,
      subDivisions: kpiPeriodTemplate?.subDivisions,
      departments: kpiPeriodTemplate?.departments,
      stores: kpiPeriodTemplate?.stores,

      jobLevels: kpiPeriodTemplate?.jobLevels,
      jobCodes: kpiPeriodTemplate?.jobCode,
      salaryAdminPlans: kpiPeriodTemplate?.salaryAdminPlans,
      employeeTypes: kpiPeriodTemplate?.jsonEmployeeTypes,
      employeeClassifications: kpiPeriodTemplate?.employeeClassifications,
      positionLevels: kpiPeriodTemplate?.positionLevels,
    }
  }, [
    kpiPeriodTemplate?.companies,
    kpiPeriodTemplate?.departments,
    kpiPeriodTemplate?.divisions,
    kpiPeriodTemplate?.employeeClassifications,
    kpiPeriodTemplate?.jobCode,
    kpiPeriodTemplate?.jobFunctions,
    kpiPeriodTemplate?.jobLevels,
    kpiPeriodTemplate?.jsonEmployeeTypes,
    kpiPeriodTemplate?.positionLevels,
    kpiPeriodTemplate?.salaryAdminPlans,
    kpiPeriodTemplate?.stores,
    kpiPeriodTemplate?.subDivisions,
  ])

  const hierarchyFormItems = useMemo(() => {
    return kpiPeriodTemplateForm?.groupSelected
  }, [kpiPeriodTemplateForm?.groupSelected])

  const renderTotalUser = useMemo(() => {
    if (isForm) {
      switch (values?.selectEmployeeType) {
        case EnumSelectedEmployeeType.EMPLOYEE:
          return (
            <Field<number> name={EnumSelectHierarchyGroupField.COUNT_SELECT_USER}>
              {({ input }) => {
                return (
                  <Sarabun type="H6">
                    {t(
                      `กลุ่มพนักงานที่เลือกแบบรายชื่อ - ${format2DecimalNumber(
                        input.value || 0,
                      )} คน`,
                    )}
                  </Sarabun>
                )
              }}
            </Field>
          )
        case EnumSelectedEmployeeType.HIERARCHY:
        default:
          return (
            <Field<number> name={EnumSelectHierarchyGroupField.COUNT_USER}>
              {({ input }) => {
                return (
                  <Sarabun type="H6">
                    {t(
                      `กลุ่มพนักงานที่เลือกแบบโครงสร้าง - ${format2DecimalNumber(
                        input.value || 0,
                      )} คน`,
                    )}
                  </Sarabun>
                )
              }}
            </Field>
          )
      }
    }
    switch (values?.selectEmployeeType) {
      case EnumSelectedEmployeeType.EMPLOYEE:
        return (
          <Sarabun type="H6">
            {t(
              `กลุ่มพนักงานที่เลือกแบบรายชื่อ - ${format2DecimalNumber(
                pagingResponse?.totalRecords || 0,
              )} คน`,
            )}
          </Sarabun>
        )
      case EnumSelectedEmployeeType.HIERARCHY:
      default:
        return (
          <Sarabun type="H6">
            {t(
              `กลุ่มพนักงานที่เลือกแบบโครงสร้าง - ${format2DecimalNumber(
                pagingResponse?.totalRecords || 0,
              )} คน`,
            )}
          </Sarabun>
        )
    }
  }, [isForm, pagingResponse?.totalRecords, t, values?.selectEmployeeType])

  return (
    <>
      <Column>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`ชื่อฟอร์ม`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>

        <Sarabun type="Subtitle1">
          {!isForm ? kpiPeriodTemplate?.name : kpiPeriodTemplateForm?.name}
        </Sarabun>
      </Column>
      <RowGap gap={200}>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`รอบการประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? kpiPeriodTemplate?.formType === FormType.QUARTER
                ? t("รายไตรมาส")
                : kpiPeriodTemplate?.formType === FormType.HALF_YEAR
                ? t("รายครึ่งปี")
                : kpiPeriodTemplate?.formType === FormType.YEAR
                ? t("รายปี")
                : t("กำหนดเอง")
              : kpiPeriodTemplateForm?.formType === FormType.QUARTER
              ? t("รายไตรมาส")
              : kpiPeriodTemplateForm?.formType === FormType.HALF_YEAR
              ? t("รายครึ่งปี")
              : kpiPeriodTemplateForm?.formType === FormType.YEAR
              ? t("รายปี")
              : t("กำหนดเอง")}
          </Sarabun>
        </Column>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`ไตรมาสที่`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? kpiPeriodTemplate?.quarter === QuarterType.QUARTET_ONE
                ? t("1")
                : kpiPeriodTemplate?.quarter === QuarterType.QUARTET_TWO
                ? t("2")
                : kpiPeriodTemplate?.quarter === QuarterType.QUARTET_THREE
                ? t("3")
                : kpiPeriodTemplate?.quarter === QuarterType.QUARTET_FOUR
                ? t("4")
                : kpiPeriodTemplate?.quarter === QuarterType.FIRST_HALF
                ? t("ครึ่งปีแรก")
                : kpiPeriodTemplate?.quarter === QuarterType.SECOND_HALF
                ? t("ครึ่งปีหลัง")
                : "-"
              : kpiPeriodTemplateForm?.quarter === QuarterType.QUARTET_ONE
              ? t("1")
              : kpiPeriodTemplateForm?.quarter === QuarterType.QUARTET_TWO
              ? t("2")
              : kpiPeriodTemplateForm?.quarter === QuarterType.QUARTET_THREE
              ? t("3")
              : kpiPeriodTemplateForm?.quarter === QuarterType.QUARTET_FOUR
              ? t("4")
              : kpiPeriodTemplateForm?.quarter === QuarterType.FIRST_HALF
              ? t("ครึ่งปีแรก")
              : kpiPeriodTemplateForm?.quarter === QuarterType.SECOND_HALF
              ? t("ครึ่งปีหลัง")
              : "-"}
          </Sarabun>
        </Column>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`ปีที่ทำการประเมิน(ค.ศ.)`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm ? kpiPeriodTemplate?.year : kpiPeriodTemplateForm?.year}
          </Sarabun>
        </Column>
      </RowGap>
      <RowGap gap={180}>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`วันที่เริ่มการประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? normalizeDateTH(kpiPeriodTemplate?.startDate || "")
              : normalizeDateTH(kpiPeriodTemplateForm?.startDate || "")}
          </Sarabun>
        </Column>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`วันที่จบการประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? normalizeDateTH(kpiPeriodTemplate?.endDate || "")
              : normalizeDateTH(kpiPeriodTemplateForm?.endDate || "")}
          </Sarabun>
        </Column>
      </RowGap>
      <Column gap={16}>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`การเข้าวงปรับเทียบผลงาน (Calibration)`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>
        <Column gap={2}>
          <Sarabun type="Subtitle1">
            {!isForm
              ? kpiPeriodTemplate?.isCalibrated
                ? t(`เข้าวงปรับเทียบผลงาน (Calibration) `)
                : t(`ไม่เข้าวงปรับเทียบผลงาน (Calibration) `)
              : kpiPeriodTemplateForm?.isCalibrated
              ? t(`เข้าวงปรับเทียบผลงาน (Calibration) `)
              : t(`ไม่เข้าวงปรับเทียบผลงาน (Calibration) `)}
          </Sarabun>
          <Sarabun type="Overline">
            {t(
              `ขั้นตอนการประเมิน: กำหนดเป้าหมาย >หัวหน้าอนุมัติเป้าหมาย > พนักงานประเมินตนเอง > หัวหน้าประเมินผลงาน > ปรับเทียบผลงาน (Calibration) > หัวหน้ารับผลและ feedback > ลูกทีมรับทราบผลงาน`,
            )}
          </Sarabun>
        </Column>
      </Column>
      <Column>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`เริ่มประเมินที่หัวหน้าลำดับที่`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>
        <Sarabun type="Subtitle1">
          {!isForm
            ? kpiPeriodTemplate?.defaultMgr === 1
              ? t(`ลำดับที่ 1 (หัวหน้าติดตัว)`)
              : t(`ลำดับที่ 2 `)
            : kpiPeriodTemplateForm?.defaultMgr === 1
            ? t(`ลำดับที่ 1 (หัวหน้าติดตัว)`)
            : t(`ลำดับที่ 2 `)}
        </Sarabun>
      </Column>
      <Column gap={4} width100={true}>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`ขั้นตอนการประเมิน และระยะเวลาของแต่ละขั้นตอน`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>
        <Sarabun type="Overline" color={`${GRAYSCALE_DARKGRAY_60}`}>
          {t(
            `กำหนดวันที่ควรจะเป็นของแต่ละขั้นตอน เพื่อเป็นแนวทางบอกพนักงานว่าควรประเมินถึงขั้นตอนใดแล้ว`,
          )}
        </Sarabun>
        <StepDiv>
          <TimeLineCard
            name={t(`กำหนดเป้าหมาย`)}
            startDate={timelines[0].startDate}
            endDate={timelines[0].endDate}
          />
          <TimeLineCard
            name={t(`หัวหน้าอนุมัติเป้าหมาย`)}
            startDate={timelines[1].startDate}
            endDate={timelines[1].endDate}
          />
          <TimeLineCard
            name={t(`พนักงานประเมินตนเอง`)}
            startDate={timelines[2].startDate}
            endDate={timelines[2].endDate}
          />
          <TimeLineCard
            name={t(`หัวหน้าประเมินผลงาน`)}
            startDate={timelines[3].startDate}
            endDate={timelines[3].endDate}
          />
          <TimeLineCard
            name={t(`ปรับเทียบผลงาน (Calibration)`)}
            startDate={timelines[4].startDate}
            endDate={timelines[4].endDate}
          />
          <TimeLineCard
            name={t(`หัวหน้ารับผลและ feedback`)}
            startDate={timelines[5].startDate}
            endDate={timelines[5].endDate}
          />
          <TimeLineCard
            name={t(`ลูกทีมรับทราบผลงาน`)}
            startDate={timelines[6].startDate}
            endDate={timelines[6].endDate}
          />
        </StepDiv>
      </Column>
      <Column gap={16}>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`การเปิดสิทธิการประเมินให้พนักงานที่อายุงานต่ำกว่า 1 ปี`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>
        <Sarabun type="Subtitle1">
          {!isForm
            ? kpiPeriodTemplate?.reqOneYear
              ? t(`ไม่เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้`)
              : t(`เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้`)
            : kpiPeriodTemplateForm?.reqOneYear
            ? t(`ไม่เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้`)
            : t(`เปิดให้พนักงานที่อายุงานต่ำกว่า 1 ปีประเมินได้`)}
        </Sarabun>
      </Column>
      <RowSpaceBetween>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`ข้อความที่ต้องการสื่อสารกับผู้ถูกประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? kpiPeriodTemplate?.descriptionForUser
              : kpiPeriodTemplateForm?.descriptionForUser}
          </Sarabun>
        </Column>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`ข้อความที่ต้องการสื่อสารกับผู้ประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm
              ? kpiPeriodTemplate?.descriptionForMgr
              : kpiPeriodTemplateForm?.descriptionForMgr}
          </Sarabun>
        </Column>
      </RowSpaceBetween>

      <Column gap={16} width100={true}>
        <Column gap={6}>
          <Sarabun type="H6">{t(`กำหนดรายละเอียดของเป้าหมายในแบบฟอร์ม`)}</Sarabun>
          <Sarabun type="Body2">{t(`ผลรวมของการประเมินทั้งหมดต้องรวมได้ 100 %`)}</Sarabun>
        </Column>
        <GoalDetailDiv>
          {kpiPeriodTemplate?.jsonCalKpi !== null || kpiPeriodTemplateForm?.calKpi !== undefined ? (
            <GoalDetailCard>
              <RowIcon>
                <Icon iconName="graduationCapCircle" width={56} height={56} />{" "}
                <Sarabun type="Subtitle1">{t(`เป้าหมาย KPI`)}</Sarabun>
              </RowIcon>
              <GoalBox>
                <Sarabun type="Body2">{t(`เทมเพลตแบบประเมิน KPI`)}</Sarabun>
                <Sarabun type="Subtitle1">
                  {!isForm
                    ? kpiPeriodTemplate?.jsonCalKpi?.jsonScale.name
                    : kpiPeriodTemplateForm?.calKpi?.name}
                </Sarabun>
              </GoalBox>
              <PercentBox>
                <TextColumn gap={8}>
                  <Sarabun type="Body2">{t(`เปอร์เซ็นต์ของการประเมิน`)}</Sarabun>
                  <Sarabun type="Subtitle1">
                    {!isForm
                      ? t(`${kpiPeriodTemplate?.jsonCalKpi?.cal} %`)
                      : t(`${kpiPeriodTemplateForm?.calKpi?.cal || 0} %`)}
                  </Sarabun>
                </TextColumn>
              </PercentBox>
              <EmptyBox />
            </GoalDetailCard>
          ) : (
            <></>
          )}

          {kpiPeriodTemplate?.jsonCalKpiCompany !== null ||
          kpiPeriodTemplateForm?.calKpiCompany !== undefined ? (
            <GoalDetailCard>
              <RowIcon>
                <Icon iconName="graduationCapCircle" width={56} height={56} />{" "}
                <Sarabun type="Subtitle1">{t(`เป้าหมายองค์กร`)}</Sarabun>
              </RowIcon>
              <GoalBox>
                <Sarabun type="Body2">{t(`เทมเพลตแบบประเมินองค์กร`)}</Sarabun>
                <Sarabun type="Subtitle1">
                  {!isForm
                    ? kpiPeriodTemplate?.jsonCalKpiCompany?.jsonScale.name
                    : kpiPeriodTemplateForm?.calKpiCompany?.name}
                </Sarabun>
              </GoalBox>
              <PercentBox>
                <TextColumn gap={8}>
                  <Sarabun type="Body2">{t(`เปอร์เซ็นต์ของการประเมิน`)}</Sarabun>
                  <Sarabun type="Subtitle1">
                    {!isForm
                      ? `${kpiPeriodTemplate?.jsonCalKpiCompany?.cal} %`
                      : `${kpiPeriodTemplateForm?.calKpiCompany?.cal} %`}
                  </Sarabun>
                </TextColumn>
              </PercentBox>
              <EmptyBox />
            </GoalDetailCard>
          ) : (
            <></>
          )}

          {kpiPeriodTemplate?.jsonCalKpiOther !== null ||
          kpiPeriodTemplateForm?.calKpiOther !== undefined ? (
            <GoalDetailCard>
              <RowIcon>
                <Icon iconName="graduationCapCircle" width={56} height={56} />{" "}
                <Sarabun type="Subtitle1">{t(`เป้าหมายอื่น ๆ`)}</Sarabun>
              </RowIcon>
              <GoalBox>
                <Sarabun type="Body2">{t(`เทมเพลตแบบประเมินอื่น ๆ`)}</Sarabun>
                <Sarabun type="Subtitle1">
                  {!isForm
                    ? kpiPeriodTemplate?.jsonCalKpiOther?.jsonScale.name
                    : kpiPeriodTemplateForm?.calKpiOther?.name}
                </Sarabun>
              </GoalBox>
              <PercentBox>
                <TextColumn gap={8}>
                  <Sarabun type="Body2">{t(`เปอร์เซ็นต์ของการประเมิน`)}</Sarabun>
                  <Sarabun type="Subtitle1">
                    {!isForm
                      ? t(`${kpiPeriodTemplate?.jsonCalKpiOther?.cal} %`)
                      : t(`${kpiPeriodTemplateForm?.calKpiOther?.cal || 0} %`)}
                  </Sarabun>
                </TextColumn>
              </PercentBox>
              <EmptyBox />
            </GoalDetailCard>
          ) : (
            <></>
          )}

          {kpiPeriodTemplate?.jsonCalBehavior !== undefined ||
          kpiPeriodTemplateForm?.calBehavior !== undefined ? (
            <GoalDetailCard>
              <RowIcon>
                <Icon iconName="graduationCapCircle" width={56} height={56} />{" "}
                <Sarabun type="Subtitle1">{t(`แบบประเมินพฤติกรรม`)}</Sarabun>
              </RowIcon>
              <GoalBox>
                <Sarabun type="Body2">{t(`เทมเพลตแบบประเมินพฤติกรรม`)}</Sarabun>
                <Sarabun type="Subtitle1">
                  {!isForm
                    ? kpiPeriodTemplate?.jsonCalBehavior?.jsonBehavior.name
                    : kpiPeriodTemplateForm?.calBehavior?.name}
                </Sarabun>
              </GoalBox>
              <PercentBox>
                <TextColumn gap={8}>
                  <Sarabun type="Body2">{t(`เปอร์เซ็นต์ของการประเมิน`)}</Sarabun>
                  <Sarabun type="Subtitle1">
                    {!isForm
                      ? t(`${kpiPeriodTemplate?.jsonCalBehavior?.cal} %`)
                      : t(`${kpiPeriodTemplateForm?.calBehavior?.cal || 0} %`)}
                  </Sarabun>
                </TextColumn>
              </PercentBox>
              <EmptyBox />
            </GoalDetailCard>
          ) : (
            <></>
          )}

          <GoalDetailResult>
            <div style={{ paddingRight: "16px", width: "76%" }}>
              <TextRow>
                <TextColumn>
                  <Sarabun type={"H5"}>{t(`รวม`)}</Sarabun>
                  <Sarabun type={"Body2"}>{t(`ผลรวมต้องรวมได้ 100 %`)}</Sarabun>
                </TextColumn>
              </TextRow>
            </div>

            <PercentBox>
              <AssessmentRow>
                <RowGap gap={8}>
                  <Icon iconName="checkCircle" width={24} height={24} />
                  <Sarabun type={"H6"} color={`${SEMANTIC_SUCCESS_DARK}`}>
                    {t(`100`)}
                  </Sarabun>
                </RowGap>
                <Sarabun type="H6">{t(`%`)}</Sarabun>
              </AssessmentRow>
            </PercentBox>
            <EmptyBox />
          </GoalDetailResult>
        </GoalDetailDiv>
      </Column>

      <SetScoreLevel
        isViewMode
        jsonScaleDetails={
          !isForm
            ? kpiPeriodTemplate?.jsonScaleForGrade.jsonScaleDetails
            : kpiPeriodTemplateForm?.scaleForGrade.jsonScaleDetails
        }
      />

      <SelectedContainer>
        <TextRowSpaceBetween>
          {renderTotalUser}
          <SarabunOnClick type="Subtitle1" color={`${PRIMARY_DARK}`} onClick={onClickOpenModal}>
            {t(`ดูรายชื่อพนักงาน`)}
          </SarabunOnClick>
        </TextRowSpaceBetween>
        {isForm ? (
          <HierarchyFormValuesView items={hierarchyFormItems || {}} />
        ) : (
          <HierarchyView items={hierarchyData} />
        )}
      </SelectedContainer>
      <ModalViewEmployeesKpi
        visibleUseState={[isOpenModal, setIsOpenModal]}
        employeeResponse={employeeList}
        pagingResponse={pagingResponse}
        pageState={pageStates}
        pageSizeState={pageSizeStates}
        isLoading={isLoading}
      />
    </>
  )
}

export default TemplateDetail
