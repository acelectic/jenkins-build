import {
  EmployeeType,
  FormType,
  GoalCategoryType,
  KpiStatus,
  KpiType,
  QuarterType,
  ScoreType,
  StateKpiType,
  UnitType,
} from "./enum-typed"
import { RoleType } from "./user/user-type"

import { BehaviorTemplate, JsonScale } from "./kpi-template/kpi-template-type"

export type BaseEntity = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  creatorId: string
  updaterId: string
  tenantId: string
}

export type ScaleDetail = {
  value: number
  color: string
  scaleName: string
  description: string
}

export type Scale = BaseEntity & {
  name: string
  maxKpi: number
  minKpi: number
  jsonScaleDetails: ScaleDetail[]
  positionTarget: string
  scaleDetails: ScaleDetail[]
}

export type JsonBehavior = BaseEntity & {
  name: string
  unitType: UnitType
  jsonScale: Scale
  scoreType: string
  description: string
  behaviorTemplateDetails?: BehaviorTemplateDetail[]
}

export type PositionLevel = BaseEntity & {
  code: string
  description: string
}

export type Position = BaseEntity & {
  code: string
  name: string
  storeId: string
}

export type Store = BaseEntity & {
  name: string
  code: string
  hierarchyLevelId: string
}

export type JobLevel = BaseEntity & {
  name: string
  sequence: string
}

export type SalaryAdminPlan = BaseEntity & {
  code: string
  description: string
}

export type Company = BaseEntity & {
  name: string
  shortName: string
  code: string
  nameTh: string
}

export type JobFunction = BaseEntity & {
  name: string
  code: string
  companyId: string
}

export type Division = BaseEntity & {
  name: string
  code: string
  jobFunctionId: string
  companyId: string
}

export type SubDivision = BaseEntity & {
  name: string
  code: string
  divisionId: string
  jobFunctionId: string
  companyId: string
}

export type Segment = BaseEntity & {
  name: string
  code: string
  subDivisionId: string
  divisionId: string
  jobFunctionId: string
  companyId: string
}

export type Department = BaseEntity & {
  name: string
  code: string
  segmentId: string
  subDivisionId: string
  divisionId: string
  jobFunctionId: string
  companyId: string
}

export type Section = BaseEntity & {
  name: string
  code: string
  departmentId: string
  segmentId: string
  subDivisionId: string
  divisionId: string
  jobFunctionId: string
  companyId: string
}

export type FieldControl = BaseEntity & {
  name: string
  code: string
  sectionId: string
  departmentId: string
  segmentId: string
  subDivisionId: string
  divisionId: string
  jobFunctionId: string
  companyId: string
}

export type EmployeeClassification = BaseEntity & {
  code: string
  description: string
}

export type JobCode = BaseEntity & {
  code: string
  description: string
}

export type UserCareerHistory = BaseEntity & {
  companyId: string
  departmentId: string
  directManager1Id: string
  directManager2Id: string
  divisionId: string
  employeeClassificationId: string
  employeeType: string
  fieldControlId: string
  jobCodeId: string
  jobFunctionId: string
  jobLevelId: string
  positionId: string
  positionLevelId: string
  salaryAdminPlanId: string
  sectionId: string
  segmentId: string
  storeId: string
  subDivisionId: string
  userId: string
  directManager1: User
  directManager2: User
  positionLevel?: PositionLevel
  position?: Position
  store?: Store
  jobLevel?: JobLevel
  salaryAdminPlan?: SalaryAdminPlan
  company?: Company
  jobFunction?: JobFunction
  division?: Division
  subDivision?: SubDivision
  segment?: Segment
  department?: Department
  section?: Section
  fieldControl?: FieldControl
  employeeClassification?: EmployeeClassification
  jobCode?: JobCode
}

export type User = BaseEntity & {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  creatorId: string | null
  updaterId: string | null
  tenantId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  employeeType: string
  positionLevelId: string
  positionId: string
  storeId: string
  jobLevelId: string
  salaryAdminPlanId: string
  companyId: string
  jobFunctionId: string
  divisionId: string
  subDivisionId: string
  segmentId: string
  departmentId: string
  sectionId: string
  fieldControlId: string
  employeeClassificationId: string
  jobCodeId: string
  grade: null
  directManager1Id: string
  directManager2Id: string
  hireDate: string
  resignationDate: string | null
  status: boolean
  permissions: string[]
  position?: Position
  store?: Store
  jobLevel?: JobLevel
  salaryAdminPlan?: SalaryAdminPlan
  company?: Company
  jobFunction?: JobFunction
  division?: Division
  subDivision?: SubDivision
  segment?: Segment
  department?: Department
  section?: Section
  fieldControl?: FieldControl
  employeeClassification?: EmployeeClassification
  jobCode?: JobCode
  defaultManager?: User
  isDisabled?: boolean
  kpiTransactionId?: string
  userCareerHistory?: UserCareerHistory
  userCareerHistories?: UserCareerHistory[]
  companyName?: string
  storeName?: string

  roles?: RoleType[]
  positionName?: string
  user?: User
  genTrOneYear?: boolean
  genTrSixtyDays?: boolean
  genTrOneHundredDays?: boolean
  avatar?: string
}

// export type Option = {
//   label: string
//   value: string
// }

// export type DefaultOptions = Option[]

export type KpiTransactionDetail = BaseEntity & {
  name: string
  description: string
  goalCategory: GoalCategoryType
  weight: number
  actual: number
  unitType: UnitType
  customUnitType: string
  scoreType: ScoreType
  jsonScale: Scale
  comment: string
  note: string
  assignableId: string
  kpiType: KpiType
  kpiTransaction?: KpiTransaction[]
  kpiTransactionDetailHistory?: KpiTransactionDetailHistory[]
  target: number
}

export type KpiTransactionDetailHistory = BaseEntity & {
  kpiTransactionDetailId: string
  attachmentId: string
  kpiTransactionDetail?: KpiTransactionDetail
}

export type KpiBehaviorTransactionDetail = BaseEntity & {
  kpiTransactionId: string
  kpiPeriodTemplatePositionId: string
  kpiBehaviorTransactionId: string
  jsonBehaviorDetailId: string
  actual: number
  kpiPeriodTemplateUser?: KpiPeriodTemplatePosition
  kpiTransaction?: KpiTransaction
  kpiBehaviorTransaction?: KpiBehaviorTransaction
}

export type KpiBehaviorTransaction = BaseEntity & {
  kpiPeriodTemplateId: string
  kpiTransactionId: string
  evaluatorId: string
  seq: number
  isActive: boolean
  comment?: string
  attachmentId?: string
  commentToMgr?: string
  attachmentToMgrId?: string
  kpiPeriodTemplate: KpiPeriodTemplate
  kpiTransaction: KpiTransaction
  kpiBehaviorTransactionDetails?: KpiBehaviorTransactionDetail[]
}

export type ScoreBySystem = {
  behavior: number
  kpiOther: number
  kpiCompany: number
  kpiIndividual: number
}

export type KpiTransaction = BaseEntity & {
  kpiPeriodTemplateId: string
  kpiPeriodTemplatePositionId: string
  userId: string
  kpiStatus: KpiStatus
  resetState: string | null
  comment: string | null
  mgrComment: string | null
  grade: string | null
  attachmentId: string | null
  mgrAttachmentId: string | null
  kpiTransactionDetails: KpiTransactionDetail[]
  finalGrade: string
  calGrade: string
  mgrGrade: string
  scoreBySystem: ScoreBySystem
}

export type KpiTemplateTimeline = BaseEntity & {
  kpiPeriodTemplatePositionId: string
  stateKpi: StateKpiType
  startDate: string
  endDate: string
}

export type KpiPeriodTemplatePosition = BaseEntity & {
  kpiPeriodTemplateId: string
  name: string
  description: string
  positionIds: string[]
  employeeTypes: string[]
  employeeClassificationIds: string[]
  positionLevelIds: string[]
  salaryAdminPlanIds: string[]
  companyIds: string[]
  storeIds: string[] | null
  jobLevelIds: string[] | null
  jobFunctionIds: string[] | null
  divisionIds: string[] | null
  subDivisionIds: string[] | null
  segmentIds: string[] | null
  departmentIds: string[] | null
  sectionIds: string[] | null
  fieldControlIds: string[] | null
  jobCodeIds: string[] | null
  calKpi: string
  calKpiCompany: string
  calKpiOther: string
  calBehavior: string
  reqOneYear: boolean
  isCalibrate: boolean
  levelApprove: number
  defaultMgr: number
  isActive: boolean

  jsonBehavior: JsonBehavior
  kpiTemplateTimelines?: KpiTemplateTimeline[]
  kpiTransaction?: KpiTransaction[]
}

export type BehaviorTemplateDetail = BaseEntity & {
  seq: number
  name: string
  description: string
  behaviorTemplateId: string
}

export type AssessmentTemplate = BaseEntity & {
  name: string
  assessmentType: string
  companies?: string[]
  descriptionForUser: string
  descriptionForMgr: string
  departments?: string[]
  employeeClassifications?: string[]
  divisions?: string[]
  subDivisions?: string[]
  jobCodes?: string[]
  jobFunctions?: string[]
  jobLevels?: string[]
  positionLevels?: string[]
  salaryAdminPlans?: string[]
  stores?: string[]
  jsonCompanies: {
    storeIds: string[]
    companyId: string
    divisionIds: string[]
    departmentIds: string[]
    jobFunctionIds: string[]
  }[]
  jsonJobLevelIds: string[]
  jsonJobCodeIds: string[]
  jsonSalaryAdminPlanIds: string[]
  jsonEmployeeTypes: EmployeeType[]
  jsonEmployeeClassificationIds: string[]
  jsonPositionLevelIds: string[]
  jsonScaleForGrade?: JsonScale
  jsonTimeline: {
    // one-year
    mgr1: number
    mgr2: number
    mgr3: number
    mgr4: number
    feedback: number

    //probation
    mgr1_60: number
    mgr2_60: number
    mgr1_100: number
    mgr2_100: number

    mgr160: number
    mgr260: number
    mgr1100: number
    mgr2100: number

    acceptGrade: number
  }

  isActive: boolean
  jsonCalBehavior: {
    cal: number
    jsonBehavior: BehaviorTemplate
  }
  passValue: number
  levelApprove: number
  defaultMgr: number
}

export type KpiPeriodTemplate = BaseEntity & {
  name: string
  year: string
  quarter: QuarterType
  startDate: string
  endDate: string
  minKpi: number
  maxKpi: number
  descriptionForUser: string
  descriptionForMgr: string
  formType: FormType

  jsonScaleForGrade: JsonScale
  jsonCalKpi?: {
    cal: number
    jsonScale: JsonScale
  }
  jsonCalKpiCompany?: {
    cal: number
    jsonScale: JsonScale
  }
  jsonCalKpiOther?: {
    cal: number
    jsonScale: JsonScale
  }
  jsonCalBehavior?: {
    cal: number
    jsonBehavior: JsonBehavior
  }
  kpiTemplateTimelines?: KpiTemplateTimeline[]

  companies?: string[]
  departments?: string[]
  employeeClassifications?: string[]
  divisions?: string[]
  subDivisions?: string[]
  jobCode?: string[]
  jobFunctions?: string[]
  jobLevels?: string[]
  positionLevels?: string[]
  salaryAdminPlans?: string[]
  stores?: string[]
  defaultMgr?: number
  employeeQuantity?: number
  isCalibrated?: boolean
  reqOneYear?: boolean
  jsonEmployeeTypes?: EmployeeType[]
}

export type JsonScaleKpiTransactionDetail = {
  name: string
  jsonScaleDetails: ScaleDetail[]
  positionTarget: string
}

export type KpiLibrary = BaseEntity & {
  name: string
  description: string
  category: string
  kpiLibraryPositions: KpiLibraryPosition[]
  companyId: string
}

export type KpiLibraryPosition = BaseEntity & {
  positionId: string
  kpiLibraryId: string
}

export type KpiTransactionQuarter = {
  year: string
  quarter?: string
  managerComment?: string
  isRejected?: boolean
  kpiTransaction: KpiTransaction
}

export type KpiLibraryWithCategory = {
  category: string
  kpiLibraries: KpiLibrary[]
}

export type Paging = {
  totalPages?: number
  totalRecords?: number
  currentPage?: number
  hasMorePages?: boolean
}

export type JsonResult = {
  grade?: number
  isPassed?: boolean
}

export type AssessmentTransactionDetail = BaseEntity & {
  assessmentTransactionEvaluatorId: string
  seq: number
  name: string
  description: string
  actual: string | null
}

export type HistoryScore = HistoryScoreDetail[]

export type HistoryScoreDetail = {
  actual: string
  assessmentTransactionDetailId: string
  assessmentTransactionEvaluatorId: string
  evaluatorId: string
  fullName: string
}

export type AssessmentTransactionEvaluator = BaseEntity & {
  fullName?: string
  empId?: string
  assessmentTransactionId: string
  evaluatorId: string
  comment: string | null
  endDate: string
  jsonResult: JsonResult
  seq: number
  isSubmitted: boolean
  isActive: boolean
  assessmentTransactionDetails?: AssessmentTransactionDetail[]
  avatar?: string
}

export type AssessmentTransactionsOneYear = BaseEntity & {
  isMyCrew: boolean
  fullName: string
  empId: string
  positionName: string
  storeName: string
  assessmentType: string
  userId: string
  assessmentStatus: string
  acceptorId: string | null
  jsonScale: JsonScale
  customUnitType: string | null
  passValue: number
  topPerformances: string | null
  jsonResult: JsonResult
  assessmentTemplateId: string
  assessmentTransactionEvaluators: AssessmentTransactionEvaluator[]
  defaultDetails: AssessmentTransactionDetail[]
  avatar?: string
  acceptGradeEndDate: string
  feedbackEndDate: string | null
  historyScore?: HistoryScore[]
  descriptionForMgr?: string
  descriptionForUser?: string
}
