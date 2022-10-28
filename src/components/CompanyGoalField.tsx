import QuarterCard from "./common/QuarterCard"
import styled from "@emotion/styled"
import KPIReportCard from "./KPIReportCard"
import QuarterCardTitleComponent from "./QuarterCardTitle"
import { useMemo } from "react"

import { GRAYSCALE_LIGHTGRAY_10 } from "../constants/colors"
import { removeDecimalWhenZero } from "../utils/helper"
import { KpiTransaction } from "../services/entity-typed"

const CompanyGoalContainer = styled.div`
  margin-top: 24px;
`

const KpiCardContainer = styled.div`
  margin-bottom: 21px;
`

type CompanyGoalProps = {
  viewMode?: boolean
  currentKpiTransaction?: KpiTransaction | undefined
  weight?: string
}

const CompanyGoalField = (props: CompanyGoalProps) => {
  const { viewMode = false, weight } = props

  // mock
  const renderKpiReportCard = useMemo(() => {
    return (
      <KpiCardContainer>
        <KPIReportCard backGroundColorOtherMode={"#052c36"} isEdit={!viewMode} />
      </KpiCardContainer>
    )
  }, [viewMode])

  return (
    <CompanyGoalContainer style={{ display: weight !== "0.00" ? "inherit" : "none" }}>
      <QuarterCard
        style={{ backgroundColor: GRAYSCALE_LIGHTGRAY_10 }}
        titleComponent={
          <QuarterCardTitleComponent
            leftIconName="buildingWhite"
            title={`เป้าหมายจากองค์กร ${removeDecimalWhenZero(`${weight}`)}%`}
            tooltipText={"เป้าหมายจากองค์กร"}
          />
        }
      >
        {renderKpiReportCard}
      </QuarterCard>
    </CompanyGoalContainer>
  )
}

export default CompanyGoalField
