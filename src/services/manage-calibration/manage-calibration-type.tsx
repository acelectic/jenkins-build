import { AssessmentTemplateOrder, ICompany } from "../set-form/set-form-type"
import { BaseEntity, KpiTransaction, User } from "../entity-typed"
import {
  CalibratorType,
  CalibrationState,
  CalibrateType,
  EmployeeType,
  FormType,
} from "../enum-typed"
import { CompaniesParamsDto, IGetHierarchyOption } from "../group-employee/group-employee-type"

export type ICalibrator = BaseEntity & {
  calibrateSessionId: string
  userId: string
  calibratorType: CalibratorType
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
}

export type ICalibrateSessionFilter = BaseEntity & {
  calibrateSessionId: string
  calibratorType: CalibratorType
  companies: CompaniesParamsDto[]
  jobLevelIds: string | null
  jobCodeIds: string | null
  salaryAdminPlanIds: string | null
  employeeTypes: EmployeeType | null
  employeeClassificationIds: string | null
  positionLevelIds: string | null
}

export interface ICalibrateOwner extends Omit<ICalibrateCopyAndEditType, "users"> {
  user: ICalibrator
}

export type IFinalCalibrateSession = BaseEntity & {
  name: string
  calibrateSessionFinalId: string | null
  sessionStartDate: string | null
  sessionEndDate: string
  calibrateType: CalibrateType
  calibrationState: CalibrationState
  description: string
  formType: FormType
  quarter: string
  year: string
  startDate: string
  endDate: string
  calibrators: ICalibrator[]
  calibratedUsers: ICalibratedUser[]
  calibrateSessionFilters: ICalibrateSessionFilter[]
  quarterEndDate?: string
  quarterStartDate?: string
  committee?: ICalibrateCopyAndEditType
  subject?: ICalibrateCopyAndEditType
  hr?: ICalibrateCopyAndEditType
  owner?: ICalibrateOwner
}

export type ICalibratedUser = BaseEntity & {
  calibrateSessionId: string
  kpiTransactionId: string
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  user?: User
  currentKpiTransaction?: KpiTransaction
  oldKpiTransactions?: KpiTransaction[]
}

export type ICalibrateSession = BaseEntity & {
  finalCalibrateSession: IFinalCalibrateSession
  subCalibrateSessions: IFinalCalibrateSession[]
}

export type ICalibrateSessionPaging = {
  totalPages: number
  totalRecords: number
  currentPage: number
  hasMorePages: boolean
}

export type ICalibrateSessionResponse = {
  paging: ICalibrateSessionPaging
  calibrateSessions: ICalibrateSession[]
}

export type ICalibrateSessionBodyParams = {
  q?: string
  orderBy?: AssessmentTemplateOrder
  limit?: number
  page?: number
  isCompleteState?: boolean
}

export type CreateCalibrateSessionParams = {
  removeCalibratedUserIds?: string[]
  finalCalibrateSession: CreateCalibrateSessionBody
  subCalibrateSessions: CreateCalibrateSessionBody[]
  idemKey?: string
}

export type CreateCalibrateSessionBody = {
  name: string
  formType: string
  quarter?: string
  year?: string
  quarterStartDate: string
  quarterEndDate: string
  description?: string
  sessionStartDate?: string
  owner: IOwnerCreateCalibrateSession
  committee?: IUsersCreateCalibrateSession
  hr: IUsersCreateCalibrateSession
  subject: IUsersCreateCalibrateSession
  id?: string
  calibrationState?: string
}

export type ICalibrateSessionFilterUser = {
  companies?: ICompany[]

  // new params
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption

  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: string[] | EmployeeType[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
}

export type IUsersCreateCalibrateSession = ICalibrateSessionFilterUser & {
  userIds: string[]
}

export type IOwnerCreateCalibrateSession = ICalibrateSessionFilterUser & {
  userId: string
}

export type ICreateCalibrateSessionResponse = {
  duplicateUsers: ICalibrateSessionDuplicateUser[]
  finalCalibrateSession: IFinalCalibrateSession
  subCalibrateSessions: IFinalCalibrateSession[]
}

export type ICalibrateSessionDuplicateUser = {
  calibratedUserIds: string[]
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  avatar: string
}

export type ICalibrateSessionDetailResponse = {
  calibrateSession: {
    finalCalibrateSessionWithUser: IFinalCalibrateSession
    subCalibrateSessionsWithUser: IFinalCalibrateSession[]
  }
}

export type ICalibrateSessionCopyAndEditResponse = {
  finalCalibrateSession: IFinalCalibrateSession
  subCalibrateSessions: IFinalCalibrateSession[]
  idemKey?: string
}

export type ICalibrateCopyAndEditType = ICalibrateSessionFilterUser & {
  users: ICalibrator[]
}

export type JobLevelOption = {
  value: string
  label: string
}

export type ScaleOption = {
  value: string
  label: string
}

export type OverviewItem = {
  grade: string
  quotaPercent: number
  quotaPerson: number
}

export type CalibrationOverview = {
  guideline: OverviewItem[]
  beforeCalibration: OverviewItem[]
}

export type CalibrationTransaction = {
  kpiTransaction: KpiTransaction
  user: User
}

export type CalibratorUser = {
  id: string
  calibrateSessionId: string
  userId: string
  calibratorType: string
  user: User
}

export type RequestUserCalibrator = {
  calibrateSessionId: string
  calibratorType: string
  createdAt: string
  id: string
  updatedAt: string
  userId: string
}

export type Calibration = BaseEntity & {
  name: string
  calibrateSessionFinalId?: string
  sessionStartDate: string
  sessionEndDate: string
  calibrateType: string
  calibrationState: string
  calibratedUsers: ICalibratedUser[]
  calibrators: CalibratorUser[]
  requestUserCalibrator: RequestUserCalibrator
  isEditable: boolean
  description: string
}

export type GetCalibrationResponse = {
  options: {
    jobLevels: JobLevelOption[]
    scales: ScaleOption[]
  }
  calibrateSession: Calibration
  transaction: CalibrationTransaction
  overview: CalibrationOverview
}
