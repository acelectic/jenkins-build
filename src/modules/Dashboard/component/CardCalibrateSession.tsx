import styled from "@emotion/styled"
import { Box } from "@mui/material"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import Card from "../../../components/common/Card"
import QuarterDetails from "../../../components/common/QuarterDetails"
import Sarabun from "../../../components/common/Sarabun"
import { PRIMARY_BG, PRIMARY_DARK } from "../../../constants/colors"
import { CalibrateSessions } from "../../../services/dashboard/dashboard-types"
import { CalibrationState } from "../../../services/enum-typed"
import StepAssessmentDaysRemain from "./StepAssessmentDaysRemain"

const StepAssessmentContainer = styled(Box)`
  display: flex;
  background-color: ${PRIMARY_BG};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Description = styled(Sarabun)`
  margin-top: -6px;
`

export type CardCalibrateSessionProps = {
  calibrateSessions?: CalibrateSessions[]
}

const CardCalibrateSession = (props: CardCalibrateSessionProps) => {
  const { calibrateSessions } = props
  const { t } = useTranslation()

  return (
    <Card
      styleCard={{
        flex: 3,
      }}
      styleContent={{
        padding: "8px 16px 16px",
      }}
    >
      {calibrateSessions?.map((calibrateSession, index) => {
        const {
          sessionStartDate,
          sessionEndDate,
          name,
          id,
          calibrationState,
        } = calibrateSession
        return (
          <QuarterDetails
            key={id}
            style={{ margin: "8px 0px" }}
            // title={"ประเมินประจำไตรมาส (Q1/2022)"}
            description={
              <Description type="H4">{t(name || " - ")}</Description>
            }
            stepAssessment={
              calibrationState === CalibrationState.CALIBRATING ? (
                <StepAssessmentDaysRemain
                  stateEndDate={sessionEndDate}
                  label={"ปรับเทียบผลงาน"}
                />
              ) : (
                <StepAssessmentContainer>
                  <Sarabun type="Subtitle2">{"ปรับเทียบผลงาน"}</Sarabun>
                  <Box height={10} />
                  <Sarabun type="Overline" color={PRIMARY_DARK}>
                    {t("ในวันที่")}
                  </Sarabun>
                  <Sarabun type="H6" color={PRIMARY_DARK}>
                    {dayjs(sessionStartDate).format("DD/MM/YYYY")}
                  </Sarabun>
                </StepAssessmentContainer>
              )
            }
          />
        )
      })}
    </Card>
  )
}

export default CardCalibrateSession
