import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"
import CardProbation from "../../components/CardProbation"
import QuarterCard from "../../components/common/QuarterCard"

import Sarabun from "../../components/common/Sarabun"
import CountMyCrewAssessment from "../../components/CountMyCrewAssessment"
import ReportGraph from "../../components/ReportGraph"
import StepAssessment from "../../components/StepAssessment"
import { PRIMARY_DARK, PRIMARY_MAIN, SECONDARY_MAIN, WHITE } from "../../constants/colors"
import styled from "@emotion/styled"
import { useGetReports } from "../../services/report/report-query"
import { keyBy } from "lodash"
import { useMemo } from "react"
import Loading from "../../components/common/Loading"
import CardDownload from "./component/CardDownload"

const Body = styled.div`
  background-color: ${PRIMARY_DARK};
`

const DisplayFlex = styled.div`
  display: flex;
`

const AssessmentReport = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`

const SarabunPaddingBottom = styled(Sarabun)`
  padding-bottom: 24px;
`

const Reports = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
`

const CurrentQuarter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100%;
  gap: 28px;
`

const Report = () => {
  const { data: reportsData, isLoading } = useGetReports()
  const { t } = useTranslation()

  const assessmentTransactionsHashByTitle = useMemo(() => {
    const assessmentTransactions = reportsData?.assessmentTransaction.assessmentTransaction || []
    return keyBy(assessmentTransactions, (e) => e.title)
  }, [reportsData?.assessmentTransaction.assessmentTransaction])

  const assessmentTransactionsSummaryList = useMemo(() => {
    return reportsData?.assessmentTransaction.assessmentTransactionsSummary
  }, [reportsData?.assessmentTransaction.assessmentTransactionsSummary])

  return (
    <Body>
      <SarabunPaddingBottom type="H2" color={WHITE}>
        {t("ดูรายงานผลการประเมิน")}
      </SarabunPaddingBottom>
      <Loading isLoading={isLoading}>
        <Reports>
          {reportsData?.kpiTransaction.map((transaction, index) => {
            const totalAssessment = assessmentTransactionsHashByTitle[transaction.title]

            return (
              <QuarterCard
                key={transaction.title}
                titleComponent={
                  <Sarabun color={WHITE} type="H4">
                    {t(`รายงานผลการประเมิน ${transaction.title || "-"}`)}
                  </Sarabun>
                }
                bodyStyle={{
                  padding: "24px",
                  border: `1px solid ${SECONDARY_MAIN}`,
                  backgroundColor: PRIMARY_MAIN,
                  gap: 28,
                }}
              >
                <DisplayFlex>
                  <CurrentQuarter>
                    <CountMyCrewAssessment
                      totalKpiTransaction={transaction.total}
                      totalProbationSixtyDay={totalAssessment?.probationSixtyDay}
                      totalProbationOneHundredDay={totalAssessment?.probationOneHundredDay}
                      totalOneYear={totalAssessment?.oneYear}
                    />
                    <CardDownload />
                  </CurrentQuarter>
                </DisplayFlex>
                {index === 0 && <StepAssessment kpiTransaction={transaction} />}
              </QuarterCard>
            )
          })}
          <QuarterCard
            bodyStyle={{
              padding: "24px",
              border: `1px solid ${SECONDARY_MAIN}`,
              backgroundColor: PRIMARY_MAIN,
            }}
          >
            <DisplayFlex>
              <AssessmentReport>
                <Box height={24} />
                <ReportGraph reportKpiTransactions={reportsData?.kpiTransaction} />
                <Box height={24} />
                <CardProbation assessmentTransactionsSummary={assessmentTransactionsSummaryList} />
              </AssessmentReport>
              {/* <CardDownload /> */}
            </DisplayFlex>

            <Box height={16} />
          </QuarterCard>
        </Reports>
      </Loading>
    </Body>
  )
}

export default Report
