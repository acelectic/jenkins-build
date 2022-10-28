import { ScaleDetail, User } from "../entity-typed"
import { EmployeeType, EnumCreateJobStatus, FormFilterOptions, StateKpiType } from "../enum-typed"
import { AssessmentTemplate, KpiPeriodTemplate } from "../entity-typed"
import { EnumSetFormTemplateType } from "../../modules/SetForm/component/AssessmentTable"
import { ISelectHierarchyGroupFormValues } from "../../components/SelectHierarchyGroup/interface"
import { IGetHierarchyOption } from "../group-employee/group-employee-type"

export type AssessmentListResponse = {
  inProgressList: AssessmentList
  finishedList: AssessmentList
  kpiPeriodTemplate: KpiPeriodTemplate
  assessmentTemplate: AssessmentTemplate
}

export type AssessmentList = {
  paging: Paging
  data: AssessmentRow[]
}

export type Paging = {
  totalPages: number
  totalRecords: number
  currentPage: number
  hasMorePages: boolean
}

export type AssessmentRow = {
  id: string
  name: string
  type: TemplateType
  assessmentType?: AssessmentTypeKpiTemplateResponse | null
  quarter: string | null
  year: string | null
  startDate: string
  endDate: string
  createdAt: string
  isActive: boolean
  createJobStatus: EnumCreateJobStatus
}

export enum TemplateType {
  KPI = "kpi",
  ASSESSMENT = "assessment",
}

export enum TemplateTypeDelete {
  KPI = "kpi",
  PROBATION = "probation",
  ONE_YEAR = "one-year",
}

export type AssessmentListParams = {
  useFinishedList: ListParam
  useInProgressList: ListParam
  useFormDetail: FormDetailParams
}

export type FormDetailParams = {
  isSelected: boolean
  params?: { type: TemplateType; templateId: string }
}

export type ListParam = {
  isSelected: boolean
  params?: {
    q?: string
    page?: number
    limit?: number
    orderBy?: AssessmentTemplateOrder
    filterBy?: FormFilterOptions | EnumSetFormTemplateType
  }
}

export enum AssessmentTemplateOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  TYPE_ASC = "type_asc",
  TYPE_DESC = "type_desc",
  START_DATE_ASC = "start_date_asc",
  START_DATE_DESC = "start_date_desc",
  END_DATE_ASC = "end_date_asc",
  END_DATE_DESC = "end_date_desc",
  CREATED_AT_ASC = "created_at_asc",
  CREATED_AT_DESC = "created_at_desc",
  ACTIVE_STATUS_ASC = "active_status_asc",
  ACTIVE_STATUS_DESC = "active_status_desc",
}

export enum AssessmentTypeKpiTemplateResponse {
  PROBATION = "probation",
  ONE_YEAR = "1year",
  KPI = "kpi",
}

export type OptionKpiTemplateResponse = {
  behaviorTemplateOptions: IOptionsResponse[]
  scaleOptions?: IOptionsResponse[]
}

export type IOptionsResponse = {
  id: string
  name: string
}

export type ISubmitCreateOneYearType = {
  name: string
  descriptionForUser: string
  descriptionForMgr: string
  companies: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
  scaleForGrade: JsonScaleForGrade
  timelineForOneYear: JsonTimelineForOneYear
  calBehavior: JsonCalBehavior
  isActive: boolean
  passValue?: number
  levelApprove: number
  defaultMgr: number

  groupSelected?: ISelectHierarchyGroupFormValues

  // for new modal
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption
}

export type ISubmitCreateProbationType = {
  name: string
  descriptionForUser: string
  descriptionForMgr: string
  companies: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
  calBehavior: JsonCalBehavior
  timelineForProbation: JsonTimelineForProbation
  isActive: boolean
  passValue: number
  levelApprove: number
  defaultMgr: number

  groupSelected?: ISelectHierarchyGroupFormValues

  // for new modal
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption
}

export type IRemoveKpiPeriodTemplateUserType = {
  kpiPeriodTemplateIds: string[]
  userIds: string[]
}

export type ISubmitCreateKpiType = {
  removeKpiPeriodTemplateUser?: IRemoveKpiPeriodTemplateUserType
  name: string
  descriptionForUser: string
  descriptionForMgr: string
  formType: string
  quarter: string
  year: string
  startDate: string
  endDate: string
  scaleForGrade: JsonScaleForGrade
  companies: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
  calKpi?: JsonCalKpi
  calKpiCompany?: JsonCalKpi
  calKpiOther?: JsonCalKpi
  calBehavior?: JsonCalBehavior
  kpiTemplateTimelines: IKpiTemplateTimelines[]
  reqOneYear: boolean
  isCalibrated: boolean
  levelApprove: number
  defaultMgr: number

  groupSelected?: ISelectHierarchyGroupFormValues

  // for new modal
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption

  userSelected?: IGetHierarchyOption
  isOrganize?: boolean
}

export type IKpiTemplateTimelines = {
  stateKpi: StateKpiType
  startDate: string
  endDate: string
}

export type ICompany = {
  companyId: string
  jobFunctionIds?: string[]
  divisionIds?: string[]
  subDivisionIds?: string[]
  departmentIds?: string[]
  storeIds?: string[]
}

export type JsonScaleForGrade = {
  name: string
  jsonScaleDetails: ScaleDetail[]
}

export type JsonTimelineForOneYear = {
  mgr1: number
  mgr2?: number
  mgr3?: number
  mgr4?: number
  feedback: number
  acceptGrade: number
}

export type JsonTimelineForProbation = {
  mgr1_60: number
  mgr2_60?: number
  mgr1_100: number
  mgr2_100?: number
  acceptGrade: number

  mgr160?: number
  mgr260?: number
  mgr1100?: number
  mgr2100?: number
}

export type JsonCalBehavior = {
  cal?: number
  behaviorTemplateId?: string
  name?: string
}

export type JsonCalKpi = {
  cal?: number
  scaleId?: string
  name?: string
}

export type EmployeeResponse = {
  employeeQuantity: number
  paging: Paging
  data: EmployeeForKpiTemplate[]
}

export type EmployeeForKpiTemplate = {
  userId: string
  employeeId: string
  prefix: string
  firstName: string
  lastName: string
  positionId: string
  positionName: string
  storeId: string
  storeName: string
}

export type UserCareerHistory = {
  id: string
  createdAt: string
  position: Position
  store: Store
}

export type Position = {
  id: string
  name: string
}

export type Store = {
  id: string
  name: string
}

export type ValidateCreateKpiPeriodTemplateResponse = {
  kpiPeriodTemplateIds: string[]
  users: Pick<User, "employeeId" | "firstName" | "id" | "lastName" | "avatar">[]
}

export type ParamsGetEmployeesByKpiTemplateId = {
  templateId: string
  isKpiType: boolean
  page?: number
  limit?: number
}

export type IGetEmployeesPreviewParams = {
  page?: number
  limit?: number
  reqOneYear?: boolean
  quarterStartDate?: string
  quarterEndDate?: string
  companies?: ICompany[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]

  // for new modal
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption
  userSelected?: IGetHierarchyOption
}
