import { useTranslation } from "react-i18next"
import Card from "./common/Card"
import Sarabun from "./common/Sarabun"
import State from "./common/State"
import QuarterCardTitle from "./QuarterCardTitle"
import { BLACK, GRAYSCALE_DARKGRAY_40 } from "../constants/colors"
import { KpiStatus, StateComponentType } from "../services/enum-typed"
import { useMemo } from "react"
import { format2DecimalNumber } from "../utils/helper"

export type IKpiTransaction = {
  total: number
  totalAcceptGrade: number
  totalApprove: number
  totalCalibration: number
  totalMgrReview: number
  totalNew: number
  totalOneOnOneMeeting: number
  totalSent: number
}

type IStepAssessmentProps = {
  kpiTransaction?: IKpiTransaction
}

const StepAssessment = (props: IStepAssessmentProps) => {
  const { kpiTransaction } = props
  const { t } = useTranslation()

  const total = useMemo(() => {
    return kpiTransaction?.total
  }, [kpiTransaction?.total])

  const totalAcceptGrade = useMemo(() => {
    return kpiTransaction?.totalAcceptGrade
  }, [kpiTransaction?.totalAcceptGrade])

  const countUsers = useMemo(() => {
    const {
      totalNew,
      totalSent,
      totalApprove,
      totalMgrReview,
      totalCalibration,
      totalOneOnOneMeeting,
      totalAcceptGrade: totalAccept_grade,
    } = kpiTransaction || {}

    return [
      totalNew || 0,
      totalSent || 0,
      totalApprove || 0,
      totalMgrReview || 0,
      totalCalibration || 0,
      totalOneOnOneMeeting || 0,
      totalAccept_grade || 0,
    ]
  }, [kpiTransaction])

  return (
    <Card
      styleCard={{
        border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
        flex: 3,
      }}
    >
      <QuarterCardTitle
        title={t(`การประเมินประจำไตรมาสของพนักงานที่รับผิดชอบดูแลอยู่`)}
        leftIconName="clipboard"
        textColor={BLACK}
        typeText="Subtitle2"
        rightComponent={
          <Sarabun type="Subtitle2" style={{ marginTop: 4 }}>
            {`ประเมินเสร็จสิ้นแล้ว ${format2DecimalNumber(
              totalAcceptGrade || 0,
            )}/${format2DecimalNumber(total || 0)} คน`}
          </Sarabun>
        }
      />
      <div style={{ display: "flex", paddingTop: 16 }}>
        <Card
          styleCard={{
            border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
            flex: 3,
          }}
        >
          <State
            currentState={KpiStatus.NEW}
            stateComponentType={StateComponentType.OTHER_SELF_EVALUATION}
            isShowUserList={true}
            countUsers={countUsers}
          />
        </Card>
      </div>
    </Card>
  )
}

export default StepAssessment
