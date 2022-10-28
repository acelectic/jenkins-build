import { useTranslation } from "react-i18next"
import { Divider } from "./common/Divider"
import Sarabun from "./common/Sarabun"
import Tag from "./common/Tag"
import QuarterCardTitle from "./QuarterCardTitle"
import { BLACK, GRAYSCALE_DARKGRAY_40, GRAYSCALE_DARKGRAY_80, WHITE } from "../constants/colors"
import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { format2DecimalNumber } from "../utils/helper"

const CardsRow = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  height: 100%;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px;
  background: ${WHITE};
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  width: 100%;
  height: 100%;
`

const CountUserBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-top: 16px;
`

const NumberArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 4px;
`
const ProbationRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  gap: 4px;
`

type ICountUsersAreaProps = {
  NumberOfUsers?: number
  showSixtyDayTag?: boolean
  showOneHundredDayTag?: boolean
}

const CountUsersArea = (props: ICountUsersAreaProps) => {
  const { NumberOfUsers = 0, showOneHundredDayTag = false, showSixtyDayTag = false } = props
  const { t } = useTranslation()
  return (
    <CountUserBody>
      {showSixtyDayTag ? (
        <Tag text={t("60 วัน")} fontSize={12} />
      ) : showOneHundredDayTag ? (
        <Tag text={t("100 วัน")} fontSize={12} />
      ) : (
        <Box height={24} />
      )}
      <NumberArea>
        <Sarabun type="H1" color={BLACK}>
          {format2DecimalNumber(NumberOfUsers)}
        </Sarabun>
        <Sarabun type="Subtitle1" color={GRAYSCALE_DARKGRAY_80}>
          {t(`คน`)}
        </Sarabun>
      </NumberArea>
    </CountUserBody>
  )
}

export type ICountMyCrewAssessmentProps = {
  totalKpiTransaction?: number
  totalProbationSixtyDay?: number
  totalProbationOneHundredDay?: number
  totalOneYear?: number
}

const CountMyCrewAssessment = (props: ICountMyCrewAssessmentProps) => {
  const {
    totalKpiTransaction,
    totalProbationSixtyDay,
    totalProbationOneHundredDay,
    totalOneYear,
  } = props

  const { t } = useTranslation()

  return (
    <Card style={{ height: "fit-content" }}>
      <QuarterCardTitle
        title={t(`จำนวนพนักงานที่รับผิดชอบดูแลในแต่ละการประเมิน`)}
        leftIconName="clipboard"
        textColor={BLACK}
        typeText="Subtitle2"
      />
      <CardsRow>
        <Card>
          <Sarabun type="Subtitle2" color={BLACK}>
            {t(`ประจำไตรมาส`)}
          </Sarabun>
          <CountUsersArea NumberOfUsers={totalKpiTransaction} />
        </Card>
        <Card>
          <Sarabun type="Subtitle2" color={BLACK}>
            {t(`ทดลองงาน`)}
          </Sarabun>
          <ProbationRow>
            <CountUsersArea NumberOfUsers={totalProbationSixtyDay} showSixtyDayTag />
            <Divider orientation="vertical" />
            <CountUsersArea NumberOfUsers={totalProbationOneHundredDay} showOneHundredDayTag />
          </ProbationRow>
        </Card>
        <Card>
          <Sarabun type="Subtitle2" color={BLACK}>
            {t(`ครบรอบ 1 ปี`)}
          </Sarabun>
          <CountUsersArea NumberOfUsers={totalOneYear} />
        </Card>
      </CardsRow>
    </Card>
  )
}

export default CountMyCrewAssessment
