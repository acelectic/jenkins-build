import styled from "@emotion/styled"
import { keyBy } from "lodash"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_60,
  GRAYSCALE_LIGHTGRAY_10,
  SEMANTIC_SUCCESS_DARK,
  SEMANTIC_SUCCESS_MAIN,
} from "../constants/colors"
import {
  OptionKpiTemplateResponse,
  ISubmitCreateOneYearType,
} from "../services/set-form/set-form-type"
import { AssessmentTemplate } from "../services/entity-typed"
import Icon from "./common/Icon"
import Sarabun from "./common/Sarabun"
import SetScoreLevel from "./common/SetScoreLevel"
import HierarchyView from "./HierarchyView"
import HierarchyFormValuesView from "./HierarchyFormValuesView"
import { IOneYearTemplateFormType } from "../modules/SetForm/CreateForm/OneYearTemplate/OneYearTemplateForm"

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

const GreenDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${SEMANTIC_SUCCESS_MAIN};
  height: 8px;
  width: 8px;
  margin-left: 8px;
`
const RedDot = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${ERROR};
  height: 8px;
  width: 8px;
  margin-left: 8px;
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

type ITemplateDetailOneYearProps = {
  assessmentTemplate?: AssessmentTemplate
  values?: IOneYearTemplateFormType
  isForm: boolean
  options?: OptionKpiTemplateResponse
}

const TemplateDetailOneYear = (props: ITemplateDetailOneYearProps) => {
  const { assessmentTemplate, values, isForm = false, options } = props
  const { t } = useTranslation()
  const optionsHashBehavior = keyBy(options?.behaviorTemplateOptions, (e) => e.id)
  const assessmentTemplateForm: ISubmitCreateOneYearType | undefined = useMemo(() => {
    if (isForm) {
      const params: ISubmitCreateOneYearType = {
        name: values?.name || "",
        descriptionForUser: values?.descriptionForUser || "",
        descriptionForMgr: values?.descriptionForMgr || "",
        scaleForGrade: values?.scaleForGrade!,
        companies: values?.companies || [],
        calBehavior: {
          behaviorTemplateId: values?.jsonCalBehavior.behaviorTemplateId,
          cal: Number(values?.jsonCalBehavior.cal),
          name:
            values?.jsonCalBehavior &&
            values?.jsonCalBehavior.behaviorTemplateId &&
            Number(values?.jsonCalBehavior.cal) > 0
              ? optionsHashBehavior[values?.jsonCalBehavior.behaviorTemplateId].name
              : "",
        },
        timelineForOneYear: {
          mgr1: Number(values?.mgr1),
          mgr2: Number(values?.mgr2) || undefined,
          mgr3: Number(values?.mgr3) || undefined,
          mgr4: Number(values?.mgr4) || undefined,
          feedback: Number(values?.feedback),
          acceptGrade: Number(values?.acceptGrade),
        },
        isActive: values?.isActive ?? true,
        levelApprove: values?.levelApprove || 1,
        defaultMgr: values?.defaultMgr || 1,

        groupSelected: values?.groupSelected,
      }
      return params
    } else {
      return undefined
    }
  }, [isForm, optionsHashBehavior, values])

  const HierarchyData = useMemo(() => {
    return {
      companies: assessmentTemplate?.companies,
      jobFunctions: assessmentTemplate?.jobFunctions,
      divisions: assessmentTemplate?.divisions,
      subDivisions: assessmentTemplate?.subDivisions,
      departments: assessmentTemplate?.departments,
      stores: assessmentTemplate?.stores,

      jobLevels: assessmentTemplate?.jobLevels,
      jobCodes: assessmentTemplate?.jobCodes,
      salaryAdminPlans: assessmentTemplate?.salaryAdminPlans,
      employeeTypes: assessmentTemplate?.jsonEmployeeTypes,
      employeeClassifications: assessmentTemplate?.employeeClassifications,
      positionLevels: assessmentTemplate?.positionLevels,
    }
  }, [
    assessmentTemplate?.companies,
    assessmentTemplate?.departments,
    assessmentTemplate?.divisions,
    assessmentTemplate?.employeeClassifications,
    assessmentTemplate?.jobCodes,
    assessmentTemplate?.jobFunctions,
    assessmentTemplate?.jobLevels,
    assessmentTemplate?.jsonEmployeeTypes,
    assessmentTemplate?.positionLevels,
    assessmentTemplate?.salaryAdminPlans,
    assessmentTemplate?.stores,
    assessmentTemplate?.subDivisions,
  ])

  const HierarchyFormData = useMemo(() => {
    return assessmentTemplateForm?.groupSelected
  }, [assessmentTemplateForm?.groupSelected])

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
          {!isForm ? assessmentTemplate?.name : assessmentTemplateForm?.name}
        </Sarabun>
      </Column>
      <Column>
        <Sarabun type="Body2" style={{ display: "flex" }}>
          {t(`สถานะของแบบฟอร์ม`)}
          <span>
            <Sarabun type="Body2" color={ERROR}>
              *
            </Sarabun>
          </span>
        </Sarabun>
        {!isForm ? (
          assessmentTemplate?.isActive ? (
            <RowGap gap={8}>
              <GreenDot />
              <Sarabun type="Body1" color={`${SEMANTIC_SUCCESS_MAIN}`}>
                {t(`เปิดใช้งาน`)}
              </Sarabun>
            </RowGap>
          ) : (
            <RowGap gap={8}>
              <RedDot />
              <Sarabun type="Body1" color={`${ERROR}`}>
                {t(`ไม่เปิดใช้งาน`)}
              </Sarabun>
            </RowGap>
          )
        ) : assessmentTemplateForm?.isActive ? (
          <RowGap gap={8}>
            <GreenDot />
            <Sarabun type="Body1" color={`${SEMANTIC_SUCCESS_MAIN}`}>
              {t(`เปิดใช้งาน`)}
            </Sarabun>
          </RowGap>
        ) : (
          <RowGap gap={8}>
            <RedDot />
            <Sarabun type="Body1" color={`${ERROR}`}>
              {t(`ไม่เปิดใช้งาน`)}
            </Sarabun>
          </RowGap>
        )}
      </Column>

      <RowGap gap={180}>
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
              ? assessmentTemplate?.defaultMgr === 1
                ? t(`ลำดับที่ 1 (หัวหน้าติดตัว)`)
                : t(`ลำดับที่ 2 `)
              : assessmentTemplateForm?.defaultMgr === 1
              ? t(`ลำดับที่ 1 (หัวหน้าติดตัว)`)
              : t(`ลำดับที่ 2 `)}
          </Sarabun>
        </Column>
        <Column>
          <Sarabun type="Body2" style={{ display: "flex" }}>
            {t(`จำนวนขั้นของการประเมิน`)}
            <span>
              <Sarabun type="Body2" color={ERROR}>
                *
              </Sarabun>
            </span>
          </Sarabun>
          <Sarabun type="Subtitle1">
            {!isForm ? assessmentTemplate?.levelApprove : assessmentTemplateForm?.levelApprove}
          </Sarabun>
        </Column>
      </RowGap>

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
          {(assessmentTemplate?.levelApprove! >= 1 ||
            assessmentTemplateForm?.levelApprove! >= 1) && (
            <RowGap gap={8} padding={4}>
              <SarabunStepUnderline
                type="Subtitle1"
                style={{ width: "280px", minWidth: "fit-content" }}
              >
                {t(`หัวหน้าลำดับที่ 1 ประเมินผลงาน`)}
              </SarabunStepUnderline>
              <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
                {t(`ระยะเวลา`)}
              </SarabunStep>
              <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
                {!isForm
                  ? assessmentTemplate?.jsonTimeline.mgr1
                  : assessmentTemplateForm?.timelineForOneYear?.mgr1}
              </SarabunStep>
              <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
            </RowGap>
          )}
          {(assessmentTemplate?.levelApprove! >= 2 ||
            assessmentTemplateForm?.levelApprove! >= 2) && (
            <RowGap gap={8} padding={4}>
              <SarabunStepUnderline
                type="Subtitle1"
                style={{ width: "280px", minWidth: "fit-content" }}
              >
                {t(`หัวหน้าลำดับที่ 2 ประเมินผลงาน`)}
              </SarabunStepUnderline>
              <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
                {t(`ระยะเวลา`)}
              </SarabunStep>
              <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
                {!isForm
                  ? assessmentTemplate?.jsonTimeline.mgr2
                  : assessmentTemplateForm?.timelineForOneYear?.mgr2}
              </SarabunStep>
              <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
            </RowGap>
          )}
          {(assessmentTemplate?.levelApprove! >= 3 ||
            assessmentTemplateForm?.levelApprove! >= 3) && (
            <RowGap gap={8} padding={4}>
              <SarabunStepUnderline
                type="Subtitle1"
                style={{ width: "280px", minWidth: "fit-content" }}
              >
                {t(`หัวหน้าลำดับที่ 3 ประเมินผลงาน`)}
              </SarabunStepUnderline>
              <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
                {t(`ระยะเวลา`)}
              </SarabunStep>
              <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
                {!isForm
                  ? assessmentTemplate?.jsonTimeline.mgr3
                  : assessmentTemplateForm?.timelineForOneYear?.mgr3}
              </SarabunStep>
              <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
            </RowGap>
          )}
          {(assessmentTemplate?.levelApprove! >= 4 ||
            assessmentTemplateForm?.levelApprove! >= 4) && (
            <RowGap gap={8} padding={4}>
              <SarabunStepUnderline
                type="Subtitle1"
                style={{ width: "280px", minWidth: "fit-content" }}
              >
                {t(`หัวหน้าลำดับที่ 4 ประเมินผลงาน`)}
              </SarabunStepUnderline>
              <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
                {t(`ระยะเวลา`)}
              </SarabunStep>
              <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
                {!isForm
                  ? assessmentTemplate?.jsonTimeline.mgr4
                  : assessmentTemplateForm?.timelineForOneYear?.mgr4}
              </SarabunStep>
              <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
            </RowGap>
          )}
          <RowGap gap={8} padding={4}>
            <SarabunStepUnderline
              type="Subtitle1"
              style={{ width: "280px", minWidth: "fit-content" }}
            >
              {t(`หัวหน้ารับผลและ feedback`)}
            </SarabunStepUnderline>
            <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
              {t(`ระยะเวลา`)}
            </SarabunStep>
            <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
              {!isForm
                ? assessmentTemplate?.jsonTimeline.feedback
                : assessmentTemplateForm?.timelineForOneYear?.feedback}
            </SarabunStep>
            <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
          </RowGap>
          <RowGap gap={8} padding={4}>
            <SarabunStepUnderline
              type="Subtitle1"
              style={{ width: "280px", minWidth: "fit-content" }}
            >
              {t(`ลูกทีมรับทราบผลงาน`)}
            </SarabunStepUnderline>
            <SarabunStep type="Body1" style={{ width: "80px", minWidth: "fit-content" }}>
              {t(`ระยะเวลา`)}
            </SarabunStep>
            <SarabunStep type="Subtitle1" style={{ minWidth: "fit-content" }}>
              {!isForm
                ? assessmentTemplate?.jsonTimeline.acceptGrade
                : assessmentTemplateForm?.timelineForOneYear?.acceptGrade}
            </SarabunStep>
            <SarabunStep type="Body1" style={{ minWidth: "fit-content" }}>{`วัน`}</SarabunStep>
          </RowGap>
        </StepDiv>
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
              ? assessmentTemplate?.descriptionForUser
              : assessmentTemplateForm?.descriptionForUser}
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
              ? assessmentTemplate?.descriptionForMgr
              : assessmentTemplateForm?.descriptionForMgr}
          </Sarabun>
        </Column>
      </RowSpaceBetween>

      <Column gap={16} width100={true}>
        <Column gap={6}>
          <Sarabun type="H6">{t(`กำหนดรายละเอียดของเป้าหมายในแบบฟอร์ม`)}</Sarabun>
          <Sarabun type="Body2">{t(`ผลรวมของการประเมินทั้งหมดต้องรวมได้ 100 %`)}</Sarabun>
        </Column>
        <GoalDetailDiv>
          <GoalDetailCard>
            <RowIcon>
              <Icon iconName="graduationCapCircle" width={56} height={56} />{" "}
              <Sarabun type="Subtitle1">{t(`แบบประเมินพฤติกรรม`)}</Sarabun>
            </RowIcon>
            <GoalBox>
              <Sarabun type="Body2">{t(`เทมเพลตแบบประเมินพฤติกรรม`)}</Sarabun>
              <Sarabun type="Subtitle1">
                {!isForm
                  ? assessmentTemplate?.jsonCalBehavior.jsonBehavior.name
                  : assessmentTemplateForm?.calBehavior.name}
              </Sarabun>
            </GoalBox>
            <PercentBox>
              <TextColumn gap={8}>
                <Sarabun type="Body2">{t(`เปอร์เซ็นต์ของการประเมิน`)}</Sarabun>
                <Sarabun type="Subtitle1">
                  {!isForm
                    ? `${assessmentTemplate?.jsonCalBehavior.cal} %`
                    : `${assessmentTemplateForm?.calBehavior.cal} %`}
                </Sarabun>
              </TextColumn>
            </PercentBox>
            <EmptyBox />
          </GoalDetailCard>

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

      <Column gap={16} width100={true}>
        <SetScoreLevel
          isViewMode={true}
          jsonScaleDetails={
            !isForm
              ? assessmentTemplate?.jsonScaleForGrade?.jsonScaleDetails
              : assessmentTemplateForm?.scaleForGrade?.jsonScaleDetails
          }
        />
      </Column>

      <SelectedContainer>
        <TextRowSpaceBetween>
          <Sarabun type="H6">{t(`กลุ่มพนักงานที่เลือก`)}</Sarabun>
        </TextRowSpaceBetween>
        {isForm ? (
          <HierarchyFormValuesView items={HierarchyFormData || {}} />
        ) : (
          <HierarchyView items={HierarchyData} />
        )}
      </SelectedContainer>
    </>
  )
}

export default TemplateDetailOneYear
