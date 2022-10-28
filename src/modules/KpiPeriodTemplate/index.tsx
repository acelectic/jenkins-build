import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useState } from "react"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import Sarabun from "../../components/common/Sarabun"
import State from "../../components/common/State"
import { SECONDARY_BG } from "../../constants/colors"
import { StateComponentType, TemplateCreateState } from "../../services/enum-typed"
import KpiPeriodTemplateCreateFrom from "./KpiPeriodTemplateCreateForm"

const Body = styled.div`
  background-color: ${SECONDARY_BG};
  width: 100%;
  height: 100%;
  padding: 20px;
`
const StateCard = styled.div`
  margin-top: 24px;
`

type KpiPeriodTemplateFormType = {
  name: string
  templateRange: string
  quarter: string
  year: string
  startDate: string
  endDate: string
  calibration: string
  mgrSeq: string

  setGoalStartDate: string
  approveGoalStartDate: string
  selfEvaluationStartDate: string
  managerEvaluationStartDate: string
  calibrationStartDate: string
  OneOnOneMeetingStartDate: string
  acceptGradeStartDate: string

  setGoalEndDate: string
  approveGoalEndDate: string
  selfEvaluationEndDate: string
  managerEvaluationEndDate: string
  calibrationEndDate: string
  OneOnOneMeetingEndDate: string
  acceptGradeEndDate: string

  underOneYear: string
  grade?: string
}

const KpiPeriodTemplate = () => {
  const { t } = useTranslation()
  const [currentState /* setCurrentState */] = useState(TemplateCreateState.SETTING_TEMPLATE)
  const initialValues = {
    grade: "5",
  }

  return (
    <Body>
      <Sarabun type="H2">{t(`แบบฟอร์มประจำไตรมาส `)}</Sarabun>
      <StateCard>
        <State
          currentState={currentState}
          stateComponentType={StateComponentType.TEMPLATE_CREATE}
          // onStateClick={(state: AssessmentProbationStates) => setCurrentState(state)}
        />
      </StateCard>
      <Box height={24} />
      <Form<KpiPeriodTemplateFormType> onSubmit={() => {}} initialValues={initialValues}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              {currentState === TemplateCreateState.SETTING_TEMPLATE && (
                <KpiPeriodTemplateCreateFrom />
              )}
            </form>
          )
        }}
      </Form>
    </Body>
  )
}

export default KpiPeriodTemplate
