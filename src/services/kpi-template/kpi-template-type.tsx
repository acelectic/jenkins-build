import { EnumTemplateType } from "../../modules/Template/CreateTemplate/SettingTemplateState"
import { KpiTemplateTimeline, KpiTransaction, ScaleDetail } from "../entity-typed"
import { PositionTargetType, StateKpiType } from "../enum-typed"
import { IGetHierarchyOption } from "../group-employee/group-employee-type"
import { ISubmitCreateKpiType } from "../set-form/set-form-type"

export enum KpiStatus {
  NEW = "new",
  SENT = "sent",
  APPROVED = "approved",
  MGR_REVIEW = "mgr_review",
  CALIBRATION = "calibration",
  ONE_ONE_MEETING = "1_1meeting",
  ACCEPT_GRADES = "accept_grade",
}

export enum UnitType {
  PERCENT = "%",
  CALL = "Call",
  PPM = "PPM",
  SKU = "SKU",
  PERSON = "คน",
  TIME = "ครั้ง",
  SCORE = "คะแนน",
  PROJECT = "โปรเจค",
  BATH = "บาท",
  SUBJECT = "เรื่อง",
  MILLION_BATH = "ล้านบาท",
  DAY = "วัน",
  DATE = "วันที่",
  BRANCH = "สาขา",
  OTHER = "อื่นๆ",
}

export enum TemplateOrder {
  NAME_ASC = "name_asc",
  NAME_DESC = "name_desc",
  TYPE_ASC = "type_asc",
  TYPE_DESC = "type_desc",
  TOPIC_AMOUNT_ASC = "topic_amount_asc",
  TOPIC_AMOUNT_DESC = "topic_amount_desc",
  CREATED_AT_ASC = "created_at_asc",
  CREATED_AT_DESC = "created_at_desc",
}

export type KpiPeriodTemplateResponse = {
  kpiPeriodTemplates: KpiPeriodTemplate[]
}

export type KpiPeriodTemplate = BaseEntity & {
  name: string
  year: string
  quarter: string
  startDate: string
  endDate: string
  minKpi: string
  maxKpi: string
  jsonScale: JsonScale[]
  kpiPeriodTemplatePositions: KpiPeriodTemplatePosition[]
}

export type JsonScale = BaseEntity & {
  name: string
  description: string
  positionTarget: string
  scaleDetails: Scale[]
  jsonScaleDetails?: ScaleDetail[]
  maxKpi?: number | null
  minKpi?: number | null
}

export type Scale = {
  color: string
  value: number
  scaleName: string
  description: string
}

export type BaseEntity = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  creatorId: string
  updaterId: string
  tenantId: string
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

export type JsonBehavior = BaseEntity & {
  name: string
  unitType: UnitType
  jsonScale: Scale
  scoreType: string
  description: string
  behaviorTemplateDetails: []
}

export type BehaviorTemplateDetail = BaseEntity & {
  name: string
  description: string
  behaviorTemplateId: string
  seq?: number
}

export enum EmployeeType {
  FULL_TIME = "full time",
  PART_TIME = "part time",
}

export interface ScaleDetailInf {
  color: string
  value?: number
  scaleName: string
  description: string
}

export interface ScaleInf {
  name: string
  positionTarget?: PositionTargetType
  jsonScaleDetails: ScaleDetailInf[]
}

export interface CompanyInf {
  companyId: string
  jobFunctionIds?: string[]
  divisionIds?: string[]
  departmentIds?: string[]
  storeIds?: string[]
}

export type CreateKpiTemplateParams = {
  name: string
  descriptionForUser: string
  descriptionForMgr: string
  formType: "quarter"
  quarter: string
  year: string
  startDate: string
  endDate: string
  jsonScaleForGrade: ScaleInf
  jsonCompanies: CompanyInf[]
  jsonJobLevelIds?: string[]
  jsonJobCodeIds?: string[]
  jsonSalaryAdminPlanIds?: string[]
  jsonEmployeeTypes?: EmployeeType[]
  jsonEmployeeClassificationIds?: string[]
  jsonPositionLevelIds?: string[]
  jsonCalKpi: {
    cal: number
    scaleId: string
  }
  jsonCalKpiCompany: {
    cal: number
    scaleId: string
  }
  jsonCalKpiOther: {
    cal: number
    scaleId: string
  }
  jsonCalBehavior: {
    cal: number
    behaviorTemplateId: string
  }
  reqOneYear: boolean
  isCalibrated: boolean
  levelApprove: number
  defaultMgr: number
  kpiTemplateTimelines: {
    stateKpi: StateKpiType
    startDate: string
  }[]
}

export type OptionWithCodeResponse = {
  id: string
  code: string
  name: string
}

export type OptionWithDescriptionResponse = {
  id: string
  code: string
  description: string
}

export type BaseOptionResponse = {
  id: string
  name: string
}

export type OrganizationResponse = {
  company?: OptionWithCodeResponse
  jobFunction?: OptionWithCodeResponse
  jobFunctions?: OptionWithCodeResponse[]
  division?: OptionWithCodeResponse
  divisions?: OptionWithCodeResponse[]
  subDivision?: OptionWithCodeResponse
  segment?: OptionWithCodeResponse
  department?: OptionWithCodeResponse
  departments?: OptionWithCodeResponse[]
  section?: OptionWithCodeResponse
  fieldControl?: OptionWithCodeResponse
  stores?: OptionWithCodeResponse[]
}

export type CreateKpiTemplateOption = {
  employeeTypes: string[]
  stores: OptionWithCodeResponse[]
  sections: OptionWithCodeResponse[]
  salaryAdminPlans: OptionWithDescriptionResponse[]
  positionLevels: OptionWithDescriptionResponse[]
  jobCodes: OptionWithDescriptionResponse[]
  employeeClassifications: OptionWithDescriptionResponse[]
  kpiPeriodTemplates: BaseOptionResponse[]
  behaviorTemplates: BaseOptionResponse[]
  organization: OrganizationResponse
  positions: OptionWithCodeResponse[]
  optionScale: BaseOptionResponse[]
  companies: OptionWithCodeResponse[]
}

export type GetOrganizationParams = {
  fieldControlId?: string
  sectionId?: string
  departmentId?: string
  segmentId?: string
  subDivisionId?: string
  divisionId?: string
  jobFunctionId?: string
  companyId?: string
  lessThenEqualDate?: Date
}

export type OptionResponse = {
  employeeTypes: string[]
  stores: OptionWithCodeResponse[]
  sections: OptionWithCodeResponse[]
  salaryAdminPlans: OptionWithDescriptionResponse[]
  positionLevels: OptionWithDescriptionResponse[]
  jobCodes: OptionWithDescriptionResponse[]
  employeeClassifications: OptionWithDescriptionResponse[]
  kpiPeriodTemplates: BaseOptionResponse[]
  behaviorTemplates: BaseOptionResponse[]
  organization: OrganizationResponse
  positions: OptionWithCodeResponse[]
}

type Paging = {
  lastPage: number
  totalRecords: number
  currentPage: string
  hasMorePages: boolean
}

export type KpiTemplateList = {
  createdAt: string
  id: string
  name: string
  topicAmount?: number
  type: EnumTemplateType
  scales: number
}

export enum TypeKpiTemplate {
  ASSIGN_TEMPLATE = "assignTemplate",
  EMPTY_TEMPLATE = "emptyTemplate",
}

export type KpiTemplateListDetails = {
  data: KpiTemplateList[]
  paging: Paging
}

export type PagingParams = {
  limit: number
  page?: number
  q?: string
  orderBy?: TemplateOrder
}

export type CreateTemplateParams = {
  name: string
  details?: TemplateBehaviorDetailParams[]
  minKpi?: number
  maxKpi?: number
  positionTarget?: string | number
  jsonScaleDetails: ScaleDetail[]
  forKpi: boolean
}

export type TemplateBehaviorDetailParams = {
  name: string
  description: string
  seq: number
}

export type TemplateResponse = {
  scale?: JsonScale
  behaviorTemplate?: BehaviorTemplate
}

export type BehaviorTemplate = BaseEntity & {
  name: string
  jsonScale: JsonScale
  behaviorTemplateDetails: BehaviorTemplateDetail[]
}

export type TemplateDetailParams = {
  templateType: EnumTemplateType
  templateId: string
}

export type IGetOptionHierarchyNamesParams = Pick<
  ISubmitCreateKpiType,
  | "jobLevelIds"
  | "jobCodeIds"
  | "salaryAdminPlanIds"
  | "employeeTypes"
  | "employeeClassificationIds"
  | "positionLevelIds"
> & {
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption
}

interface IBaseHierarchyNamesResponse {
  id: string
  name?: string
  code?: string
  description?: string
}

interface ICompanyResponse extends IBaseHierarchyNamesResponse {
  jobFunctions: IBaseHierarchyNamesResponse[]
  divisions: IBaseHierarchyNamesResponse[]
  subDivisions: IBaseHierarchyNamesResponse[]
  departments: IBaseHierarchyNamesResponse[]
  stores: IBaseHierarchyNamesResponse[]
}

export interface IGetOptionHierarchyNamesResponse {
  companies: ICompanyResponse[]
  jobLevels: IBaseHierarchyNamesResponse[]
  jobCodes: IBaseHierarchyNamesResponse[]
  salaryAdminPlans: IBaseHierarchyNamesResponse[]
  employeeClassifications: IBaseHierarchyNamesResponse[]
  positionLevels: IBaseHierarchyNamesResponse[]
}
