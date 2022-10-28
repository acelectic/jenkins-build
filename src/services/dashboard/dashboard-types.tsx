import { BaseEntity } from "../entity-typed"
import { CalibrationState } from "../enum-typed"

export type IDashboardResponse = {
  assessmentTransaction: CountAssessmentTransaction
  calibrateSessions?: CalibrateSessions[]
  kpiTransaction: CountKpiTransaction
}

export type CountAssessmentTransaction = {
  totalOneYear: string
  totalProbationOneHundredDay: string
  totalProbationSixtyDay: string
}

export type CountKpiTransaction = {
  total: string
  totalAcceptGrade: string
  totalApprove: string
  totalCalibration: string
  totalMgrReview: string
  totalNew: string
  totalOneOnOneMeeting: string
  totalSent: string
}

export type CalibrateSessions = BaseEntity & {
  name: string
  calibrateSessionFinalId?: string
  sessionStartDate: string
  sessionEndDate: string
  calibrateType: string
  calibrationState: CalibrationState
  description: string
  calibratedUsers: CalibratedUser[]
  calibrators: Calibrator[]
  calibrateSessionFilters: CalibrateSessionFilter[]
  isEditable: boolean
}

export type CalibratedUser = BaseEntity & {
  calibrateSessionId: string
  kpiTransactionId: string
  userId: string
}

export type Calibrator = BaseEntity & {
  calibrateSessionId: string
  userId: string
  calibratorType: string
}

export type CalibrateSessionFilter = BaseEntity & {
  calibrateSessionId: string
  calibratorType: string
  companies: Company[]
  jobLevelIds: string[]
  jobCodeIds: string
  salaryAdminPlanIds: string
  employeeTypes: any
  employeeClassificationIds: string
  positionLevelIds: string
}

export type Company = {
  storeIds: string[]
  companyId: string
  divisionIds: string[]
  departmentIds: string[]
  jobFunctionIds: string[]
}
