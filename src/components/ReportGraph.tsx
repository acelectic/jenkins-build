import Card from "./common/Card"
import { WHITE } from "../constants/colors"
import ReportGraph from "./common/ReportGraph"
import { IKpiTransactionReport } from "../services/report/report-types"
import { useMemo } from "react"
import { map } from "lodash"

const quarterColors = ["#6BA808", "#FFC700", "#FF6A16", "#D20F03"]

type IReportGraphProps = {
  reportKpiTransactions?: IKpiTransactionReport[]
}

const ReportGraphComponent = (props: IReportGraphProps) => {
  const { reportKpiTransactions } = props
  const quarters = useMemo(() => {
    return map(reportKpiTransactions || [], (transaction, index) => {
      return {
        name: transaction.title || "-",
        datasets: [
          transaction.totalGrade1 || 0,
          transaction.totalGrade2 || 0,
          transaction.totalGrade3 || 0,
          transaction.totalGrade4 || 0,
          transaction.totalGrade5 || 0,
          transaction.totalGrade6 || 0,
        ],
        color: quarterColors[index],
      }
    })
  }, [reportKpiTransactions])

  return (
    <Card style={{ width: "100%", backgroundColor: WHITE }}>
      <ReportGraph quarters={quarters} />
    </Card>
  )
}

export default ReportGraphComponent
