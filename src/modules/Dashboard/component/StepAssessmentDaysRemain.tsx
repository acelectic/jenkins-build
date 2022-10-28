import { Box } from "@mui/material"
import styled from "@emotion/styled"
import {
  PRIMARY_BG,
  PRIMARY_DARK,
  SEMANTIC_BG_RED,
  SEMANTIC_ERROR_SECOND,
} from "../../../constants/colors"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import dayjs, { Dayjs } from "dayjs"
import Sarabun from "../../../components/common/Sarabun"

const StepAssessmentContainer = styled(Box)<{ isPassed?: boolean }>`
  display: flex;
  background-color: ${({ isPassed }) =>
    isPassed ? SEMANTIC_BG_RED : PRIMARY_BG};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`

interface StepAssessmentDaysRemainProps {
  label: string
  stateEndDate: Dayjs | string
}
const StepAssessmentDaysRemain = (props: StepAssessmentDaysRemainProps) => {
  const { label, stateEndDate: rawStateEndDate } = props
  const { t } = useTranslation()

  const today = useMemo(() => {
    return dayjs().endOf("day")
  }, [])

  const stateEndDate = useMemo(() => {
    return dayjs(rawStateEndDate).endOf("day")
  }, [rawStateEndDate])

  const daysToEndState = useMemo(() => {
    return stateEndDate.diff(today, "days")
  }, [stateEndDate, today])

  const isPassed = useMemo(() => {
    return daysToEndState < 0
  }, [daysToEndState])

  const daysToEndStateNormalize = useMemo(() => {
    return Math.abs(daysToEndState)
  }, [daysToEndState])

  const isShortlyPassed = useMemo(() => {
    return daysToEndStateNormalize <= 5
  }, [daysToEndStateNormalize])

  return (
    <StepAssessmentContainer isPassed={isPassed}>
      <Sarabun
        type="Subtitle2"
        color={isPassed ? SEMANTIC_ERROR_SECOND : PRIMARY_DARK}
      >
        {label}
      </Sarabun>
      <Box height={10} />
      <Sarabun
        type="Overline"
        color={isPassed ? SEMANTIC_ERROR_SECOND : PRIMARY_DARK}
      >
        {isPassed ? t("เกินเวลามาแล้ว") : t("ภายในอีก")}
      </Sarabun>
      <Sarabun
        type="H6"
        color={
          isShortlyPassed || isPassed ? SEMANTIC_ERROR_SECOND : PRIMARY_DARK
        }
      >
        {`${daysToEndStateNormalize ?? "-"}`}
        <Box
          component="span"
          fontSize={"8px"}
          marginLeft={"4px"}
          fontWeight={"600"}
        >
          {t("วัน")}
        </Box>
      </Sarabun>
    </StepAssessmentContainer>
  )
}

export default StepAssessmentDaysRemain
