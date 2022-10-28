import styled from "@emotion/styled"
import { useMemo, useState } from "react"
import { Form } from "react-final-form"
import { PRIMARY_LIGHT, WHITE } from "../constants/colors"
import { EnumTemplateType } from "../modules/Template/CreateTemplate/SettingTemplateState"
import { KpiStatus, StateComponentType } from "../services/enum-typed"
import { useGetTemplateDetail } from "../services/kpi-template/kpi-template-query"
import BehaviorAssessmentField from "./BehaviorAssessmentField"
import ChangeQuarter from "./ChangeQuarter"
import Modal from "./common/Modal"
import Sarabun from "./common/Sarabun"
import State from "./common/State"
import CompanyGoalField from "./CompanyGoalField"
import DevelopmentGuidelines from "./DevelopmentGuidelines"
import FeedbackField from "./FeedbackField"
import OtherGoalField from "./OtherGoalField"
import SelfAndTeamGoalField from "./SelfAndTeamGoalField"
import Avatar from "./common/Avatar"
import { useTranslation } from "react-i18next"

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
  background: #dbdbdb;
  border-radius: 8px;
  margin-top: 20px;
`

const TitleCard = styled.div`
  display: flex;
  align-items: center;
`
const StateCard = styled.div`
  margin-top: 24px;
`
const QuarterSelectDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-left: 24px;
`
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  gap: 24px;
  border-radius: 8px;
  background-color: ${PRIMARY_LIGHT};
  height: 100px;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export type CalKpiPercent = {
  calKpi?: number
  calCompany?: number
  calOther?: number
  calBehavior?: number
}

type ModalExampleProps = {
  visibleUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  data?: CalKpiPercent
  behaviorTemplateDetails?: any
  year?: string
  quarter?: string
  startDate?: string
  endDate?: string
  behaviorTemplateId?: string
  descriptionForUser?: string
}

const ModalKpiTemplateExample = (props: ModalExampleProps) => {
  const {
    visibleUseState,
    data,
    behaviorTemplateDetails,
    year,
    quarter,
    startDate,
    endDate,
    behaviorTemplateId,
    descriptionForUser,
  } = props
  const [isOpenModal, setIsOpenModal] = visibleUseState
  const { t } = useTranslation()

  const [currentState /* setCurrentState */] = useState(KpiStatus.MGR_REVIEW)

  const { data: templateDetailResponse, isLoading } = useGetTemplateDetail({
    templateType: EnumTemplateType.BEHAVIOR,
    templateId: behaviorTemplateId || "",
  })

  const behaviorTemplateDetailsData: any = useMemo(() => {
    return (
      templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails || behaviorTemplateDetails
    )
  }, [behaviorTemplateDetails, templateDetailResponse?.behaviorTemplate?.behaviorTemplateDetails])

  return (
    <Modal
      visibleUseState={[isOpenModal, setIsOpenModal]}
      closeOnClickOutside={false}
      showOkButton={false}
      showCancelButton={false}
      showCloseIcon={true}
      maxWidth={"1100px"}
      isLoading={isLoading}
    >
      <Form onSubmit={() => {}}>
        {() => {
          return (
            <div style={{ width: "1100px" }}>
              <TitleCard>
                <Sarabun type="H2">{`ประเมินผลงานประจำไตรมาส `}</Sarabun>
                <QuarterSelectDiv>
                  <ChangeQuarter
                    year={year}
                    quarter={quarter}
                    startDate={startDate}
                    endDate={endDate}
                  />
                </QuarterSelectDiv>
              </TitleCard>
              <Profile>
                <Avatar height={64} width={64} />
                <Column>
                  <Sarabun color={`${WHITE}`} type="H5">
                    {t(`นายทดลอง ปรองดอง`)}
                  </Sarabun>
                  <Sarabun color={`${WHITE}`} type="Caption">
                    {`Junior Marketing / Center of Excellence | ผู้ประเมิน: นายทดลอง ปรองดอง`}
                  </Sarabun>
                </Column>
              </Profile>
              <StateCard>
                <State
                  currentState={currentState}
                  stateComponentType={StateComponentType.OTHER_SELF_EVALUATION}
                />
              </StateCard>
              <TextBox>
                <Sarabun>{`${descriptionForUser}`}</Sarabun>
              </TextBox>
              {data?.calCompany && data.calCompany > 0 ? (
                <CompanyGoalField viewMode={true} weight={`${data.calCompany}`} />
              ) : null}
              {data?.calOther && data.calOther > 0 ? (
                <OtherGoalField viewMode={true} weight={`${data.calOther}`} />
              ) : null}
              {data?.calKpi && data.calKpi > 0 ? (
                <SelfAndTeamGoalField
                  viewMode={false}
                  showEditKpi={true}
                  weight={`${data.calKpi}`}
                />
              ) : null}
              {data?.calBehavior &&
              data.calBehavior > 0 &&
              behaviorTemplateDetailsData.length > 0 ? (
                <BehaviorAssessmentField
                  viewMode={true}
                  isManagerEvaluate={true}
                  weight={`${data.calBehavior}`}
                  behaviorTemplateDetails={behaviorTemplateDetailsData}
                />
              ) : null}
              <FeedbackField viewMode={true} />
              <DevelopmentGuidelines isViewMode={true} data={data} />
            </div>
          )
        }}
      </Form>
    </Modal>
  )
}

export default ModalKpiTemplateExample
