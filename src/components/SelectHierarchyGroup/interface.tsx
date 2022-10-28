import {
  IBaseStructureOption,
  IGetHierarchyOption,
} from "../../services/group-employee/group-employee-type"
import { ISubmitCreateKpiType } from "../../services/set-form/set-form-type"
import { EnumSelectedEmployeeType } from "../fields/ChooseSelectGroupComponent"

export type ICompaniesOption = IBaseStructureOption

export interface IJobFunctionsOption extends IBaseStructureOption {
  companyId: string
}

export interface IDivisionsOption extends IBaseStructureOption {
  companyId: string
  jobFunctionId?: string
}

export interface IDepartmentsOption extends IBaseStructureOption {
  companyId: string
  jobFunctionId?: string
  divisionId?: string
}

export interface IStoresOption extends IBaseStructureOption {
  companyId: string
}

export type ISelectedOption = {
  isCheckedAll?: boolean
  isIncludeNull?: boolean
  isShowNullValue?: boolean // flag for show select null
  q?: string
  selectOptions: Record<string, IBaseStructureOption>
  excludeOptions: Record<string, IBaseStructureOption>

  countTotalOptions?: number
  totalOptions?: IBaseStructureOption[]
}

export interface ISelectHierarchyGroupFormValues {
  // hierarchy structure
  companyOptions?: ISelectedOption
  jobFunctionOptions?: ISelectedOption
  divisionOptions?: ISelectedOption
  subDivisionOptions?: ISelectedOption
  departmentOptions?: ISelectedOption
  storeOptions?: ISelectedOption

  // filter
  jobLevelOptions?: ISelectedOption
  employeeTypeOptions?: ISelectedOption
  salaryAdminPlanOptions?: ISelectedOption
  positionLevelOptions?: ISelectedOption
  jobCodeOptions?: ISelectedOption
  employeeClassificationOptions?: ISelectedOption

  countUser?: number
  isCountUserFetching?: boolean

  userOptions?: ISelectedOption

  countSelectUser?: number
  isCountUserSelectFetching?: boolean
}

export type ISelectEmployeeFormValuesKey = keyof ISelectHierarchyGroupFormValues

export type ISelectEmployeeFormSubmitValues = {
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption

  jobLevelSelected?: IBaseStructureOption[]
  jobCodeSelected?: IBaseStructureOption[]
  employeeTypeSelected?: IBaseStructureOption[]
  salaryAdminPlanSelected?: IBaseStructureOption[]
  employeeClassificationSelected?: IBaseStructureOption[]
  positionLevelSelected?: IBaseStructureOption[]

  userSelected?: IGetHierarchyOption
}

export type ISelectEmployeeFormSubmitValuesKey = keyof ISelectEmployeeFormSubmitValues

export interface IParentFromValues
  extends Pick<
    ISubmitCreateKpiType,
    | "companies"
    | "jobLevelIds"
    | "jobCodeIds"
    | "salaryAdminPlanIds"
    | "employeeTypes"
    | "employeeClassificationIds"
    | "positionLevelIds"
  > {
  startDate: string
  endDate: string
  reqOneYear?: boolean

  selectEmployeeType: EnumSelectedEmployeeType
}
