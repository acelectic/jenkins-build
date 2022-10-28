import {
  AssessmentTemplate,
  AssessmentTransactionsOneYear,
  Paging,
  Scale,
  User,
} from "../entity-typed"
import {
  AssessmentStatus,
  AssessmentType,
  EnumKpiStatusTrackFilter,
  EnumOneYearStatusTrackFilter,
  EnumProbationResultTrackFilter,
  EnumProbationStatusTrackFilter,
  FormType,
  KpiStatus,
} from "../enum-typed"

export type IKpiTrackAssessmentData = {
  Id: string
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  storeName: string
  companyName: string
  year: string
  quarter: string
  status: KpiStatus
  statusStartDate: string
  timeRemaining: string
  formType: FormType
  startDate: string
  endDate: string
  avatar: string
}

export type IOneYearTrackAssessmentData = {
  Id: string
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  storeName: string
  companyName: string
  assessmentType: AssessmentType
  status: AssessmentStatus
  mgrSeq: number
  endDate: string
  timeRemaining: string
  avatar?: string
}

export type IIsPassed = {
  isPassed: boolean
}

export type IProbationTrackAssessmentData = {
  Id: string
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  storeName: string
  companyName: string
  assessmentStatus100: AssessmentStatus
  assessmentStatus60: AssessmentStatus
  result100: IIsPassed
  result60: IIsPassed
  mgrSeq: number
  timeRemaining: number
  avatar?: string
}

export type KpiTransaction = {
  paging: Paging
  data: IKpiTrackAssessmentData[]
}

export type OneYearTransaction = {
  paging: Paging
  data: IOneYearTrackAssessmentData[]
}

export type ProbationTransaction = {
  paging: Paging
  data: IProbationTrackAssessmentData[]
}

export type GetTrackAssessmentResponse = {
  probationNotificationAmount: number
  kpiTransactions: KpiTransaction
  oneYearTransactions: OneYearTransaction
  probationTransactions: ProbationTransaction
  kpiOption: {
    kpiStatus: BaseOptionType[]
  }
  oneYearOption: {
    assessmentStatus: BaseOptionType[]
  }
  probationOption: {
    assessmentStatus: BaseOptionType[]
    evaluatorResults: BaseOptionType[]
  }
}

export enum KpiTrackOrderBy {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  STORE_ASC = "store_asc",
  STORE_DESC = "store_desc",
  COMPANY_ASC = "company_asc",
  COMPANY_DESC = "company_desc",
  QUARTER_ASC = "quarter_asc",
  QUARTER_DESC = "quarter_desc",
  STATUS_ASC = "status_asc",
  STATUS_DESC = "status_desc",
}

export enum OneYearTrackOrderBy {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  STORE_ASC = "store_asc",
  STORE_DESC = "store_desc",
  COMPANY_ASC = "company_asc",
  COMPANY_DESC = "company_desc",
  END_DATE_ASC = "end_date_asc",
  END_DATE_DESC = "end_date_desc",
  STATUS_ASC = "status_asc",
  STATUS_DESC = "status_desc",
}

export enum ProbationTrackOrderBy {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  STORE_ASC = "store_asc",
  STORE_DESC = "store_desc",
  COMPANY_ASC = "company_asc",
  COMPANY_DESC = "company_desc",
  SIXTY_DAY_ASC = "sixty_day_asc",
  SIXTY_DAY_DESC = "sixty_day_desc",
  HUNDRED_DAY_ASC = "hundred_day_asc",
  HUNDRED_DAY_DESC = "hundred_day_desc",
  STATUS_ASC = "status_asc",
  STATUS_DESC = "status_desc",
}

export type KpiParams = {
  limit?: number
  orderBy?: KpiTrackOrderBy
  page?: number
  q?: string
  filterByStatus?: EnumKpiStatusTrackFilter
}

export type OneYearParams = {
  limit?: number
  orderBy?: OneYearTrackOrderBy
  page?: number
  q?: string
  filterByStatus?: EnumOneYearStatusTrackFilter
}

export type ProbationParams = {
  limit?: number
  orderBy?: ProbationTrackOrderBy
  page?: number
  q?: string
  filterByStatus?: EnumProbationStatusTrackFilter
  filterByResult?: EnumProbationResultTrackFilter
}

export type KpiTrackSelectedParams = {
  isSelected: boolean
  params?: KpiParams
}

export type OneYearTrackSelectedParams = {
  isSelected: boolean
  params?: OneYearParams
}

export type ProbationTrackSelectedParams = {
  isSelected: boolean
  params?: ProbationParams
}

export type GetTrackAssessmentParams = {
  kpiTransactions: KpiTrackSelectedParams
  oneYearTransactions: OneYearTrackSelectedParams
  probationTransactions: ProbationTrackSelectedParams
}

//Detail Type

export type DetailHeader = {
  seq: number
  name: string
}

export type SixtyDay = {
  detailHeaders: DetailHeader[]
  passValue: number
  jsonScale: Scale
  assessmentTemplate: AssessmentTemplate
  assessmentTransactionSixtyDay?: AssessmentTransactionsOneYear
}

export type OneHundredDay = {
  detailHeaders: DetailHeader[]
  passValue: number
  jsonScale: Scale
  assessmentTemplate: AssessmentTemplate
  assessmentTransactionOneHundredDay?: AssessmentTransactionsOneYear
}

export type GetTrackAssessmentDetailResponse = {
  myUser: User
  sixtyDay: SixtyDay
  oneHundredDay: OneHundredDay
}

export type IGetTrackAssessmentOptionsParam = {
  kpiOption?: {}
  oneYearOption?: {}
  probationOption?: {}
}
