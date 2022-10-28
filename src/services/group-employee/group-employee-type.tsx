import { ISelectEmployeeFormSubmitValues } from "../../components/SelectHierarchyGroup/interface"
import { EmployeeType, KpiStatus } from "../enum-typed"

export type ICompanyOption = {
  id: string
  name: string
  code: string
}

export type SectionOption = {
  id: string
  code: string
  name: string
}

export type SalaryAdminPlanOption = {
  id: string
  code: string
  description: string
}

export type PositionLevelOption = {
  id: string
  code: string
  description: string
}

export type JobCodeOption = {
  id: string
  code: string
  description: string
}

export type EmployeeClassificationOption = {
  id: string
  code: string
  description: string
}

export type OptionScaleOption = {
  id: string
  name: string
}

export type KpiPeriodTemplateOption = {
  id: string
  name: string
}

export type BehaviorTemplateOption = {
  id: string
  name: string
}

export type JobLevelOption = {
  id: string
  name: string
}

export type IGetBaseOptionResponse = {
  options: {
    jobLevels: JobLevelOption[]
    jobCodes: JobCodeOption[]
    employeeTypes: EmployeeType[]
    salaryAdminPlans: SalaryAdminPlanOption[]
    positionLevels: PositionLevelOption[]
    employeeClassifications: EmployeeClassificationOption[]
  }
}

export type IBaseStructureOption = {
  isChecked?: boolean
  id: string
  name: string
  code?: string
  description?: string
  companyId?: string
  jobFunctionId?: string
  divisionId?: string
  departmentId?: string
  storeId?: string
  kpiTransactionId?: string
  kpiStatus?: KpiStatus
  firstName?: string
  lastName?: string
  prefix?: string
  employeeId?: string
  disabled?: boolean
}

export type Department = IBaseStructureOption & {}

export type Division = IBaseStructureOption & {
  departments?: Department[]
}

export type JobFunction = IBaseStructureOption & {
  divisions?: Division[]
}

export type Store = IBaseStructureOption & {
  companyId: string
}

export type Company = IBaseStructureOption & {
  jobFunctions?: JobFunction[]
  stores?: Store[]
}

export type GetBaseStructureOptionResponse = {
  companies?: Company[]
  userCount?: number
}

export type BaseOptionParams = {
  ids: string[]
  isSelectedAll: boolean
}

export type CompaniesParamsDto = {
  companyId: string
  jobFunctionIds?: string[]
  divisionIds?: string[]
  subDivisionIds?: string[]
  departmentIds?: string[]
  storeIds?: string[]
}

export type MetaParams = {
  isSelected: boolean
  limit?: number
  page?: number
  q?: string
}

interface StoreParams extends MetaParams {
  companies: CompaniesParamsDto[]
  endDate?: string
}

interface GetCountUsersFromHierarchyParams extends ISelectEmployeeFormSubmitValues, MetaParams {
  endDate?: string
  reqOneYear?: boolean
  startDate?: string
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: (EmployeeType | string)[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
}

export type IGetHierarchyOption = {
  isCheckedAll: boolean
  selectedIds: (string | null)[]
  excludeIds: (string | null)[]
}

export interface IBaseSelectHierarchyParams {
  excludeIds?: (string | null)[]
}

export interface ISelectIdWithExcludesParams {
  selectedIds?: (string | null)[]
  excludeIds?: (string | null)[]
}

export type IGetStructureOptionParams = {
  // old params
  companyIds?: string[]
  jobFunctionIds?: string[]
  divisionIds?: string[]
  subDivisionIds?: string[]

  // new params
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption

  // companySelected: ISelectIdWithExcludesParams
  // departmentSelected: ISelectIdWithExcludesParams
  // divisionSelected: ISelectIdWithExcludesParams
  // jobFunctionSelected: ISelectIdWithExcludesParams
  // subDivisionSelected: ISelectIdWithExcludesParams

  company: MetaParams
  jobFunction: MetaParams
  division: MetaParams
  subDivision: MetaParams
  department: MetaParams
  store: StoreParams
  countUser: GetCountUsersFromHierarchyParams
}

export type IGetStructureOptionResponse = {
  companies?: WithPaging<{
    companies: IBaseStructureOption[]
  }>
  jobFunctions?: WithPaging<{
    jobFunctions: IBaseStructureOption[]
  }>
  divisions?: WithPaging<{
    divisions: IBaseStructureOption[]
  }>
  subDivisions?: WithPaging<{
    subDivisions: IBaseStructureOption[]
  }>
  departments?: WithPaging<{
    departments: IBaseStructureOption[]
  }>
  stores?: WithPaging<{
    stores: IBaseStructureOption[]
  }>
  countUser?: number
}
