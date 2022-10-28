export type IReportResponse = {
  assessmentTransaction: {
    assessmentTransaction: IAssessmentTransactionReport[]
    assessmentTransactionsSummary: IAssessmentTransactionsSummaryReport
  }
  kpiTransaction: IKpiTransactionReport[]
}

export type IAssessmentTransactionReport = {
  title: string
  oneYear: number
  probationOneHundredDay: number
  probationSixtyDay: number
}

export type IAssessmentTransactionsSummaryReport = {
  totalProbationOneHundredDay: string
  totalProbationOneHundredDayNotPassed: string
  totalProbationOneHundredDayPassed: string
  totalProbationSixtyDay: string
  totalProbationSixtyDayNotPassed: string
  totalProbationSixtyDayPassed: string
}

export type IKpiTransactionReport = {
  title: string
  total: number
  totalAcceptGrade: number
  totalApprove: number
  totalCalibration: number
  totalGrade1: number
  totalGrade2: number
  totalGrade3: number
  totalGrade4: number
  totalGrade5: number
  totalGrade6: number
  totalMgrReview: number
  totalNew: number
  totalOneOnOneMeeting: number
  totalSent: number
}
