/* export type UserDataType = {
  employeeId: string
  name: string
  department: string
  field: string
  position: string
  status: String
  onClick: () => void
} */

import { BaseEntity, User } from "../entity-typed"
import { EmployeeType, GetAllUserFilter, GetAllUserOrder, KpiStatus } from "../enum-typed"
import { CompaniesParamsDto, IGetHierarchyOption } from "../group-employee/group-employee-type"
import { Role } from "../role/role-type"

export type PagingType = {
  lastPage: number
  totalRecords: number
  currentPage: string
  hasMorePages: boolean
}

export type PositionType = {
  code: string
  id: string
  name: string
  storeId: string
}

export type RoleType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  name: string
  description: string
  isActive: boolean
  RolesUser: RoleUserType[]
}

export type UserDetailType = {
  isSelect: boolean
  organizationDetails?: OrganizationDetailsResponse
  userVisibility?: ParamUserVisibilityUpdate
} & User

export type RoleUserType = {
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  userId: string
  roleId: string
}

export type searchRoleType = {
  isSelected: boolean
  paging: {
    lastPage: number
    totalRecords: number
    currentPage: number
    hasMorePage: boolean
  }
  data: RoleType[]
}

export type ParamsUsersType = {
  isSelected: boolean
  limit?: number
  page?: number
  q?: string
  orderBy?: GetAllUserOrder
  filterBy?: GetAllUserFilter
}

export type PageParams = {
  limit?: number
  page?: number
  q?: string
}

export type ParamUserDetailType = {
  isSelected: boolean
  userId?: string
}

export type ParamsMyCrews = {
  isSelected: boolean
  limit?: number
  page?: number
  orderBy?: any
  userId?: string
  q?: string
}

export type ParamsMyRoles = {
  isSelected: boolean
  limit?: number
  page?: number
  orderBy?: any
  userId?: string
  q?: string
}

export type ParamRolesType = {
  isSelected: boolean
  userId?: string
  role?: number
  limit?: number
}

export type ParamSearchRoleType = {
  isSelected: boolean
  limit?: number
  page?: number
  q?: string
}

export type UserPageResponse = {
  users: {
    isSelect: boolean
    paging: PagingType
    data: User[]
  }
  userDetail: UserDetailType
  myCrews: {
    paging: PagingType
    myCrews: MyCrewResponse[]
  }
  myRoles: {
    paging: PagingType
    myRoles: Role[]
  }
}

export type UserPageTestResponse = {
  paging: PagingType
  data: DataType[]
}

export type DataType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  creatorId: string
  updaterId: string
  tenantId: string
  employeeId: string
  suffix: string
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
  grade: string
  directManager1Id: string
  directManager2Id: string
  hireDate: string
  resignationDate: string
  status: boolean
  userCareerHistory?: UserCareerHistory
  position: string
  function: string
  department: string
  isActive: boolean
  roles: RoleType[]
}

export type UserPageEditResponse = {
  userDetail: UserDetailType
  searchRoles: searchRoleType
}

export type ParamUserPage = {
  users: ParamsUsersType
  userDetail: ParamUserDetailType
  myCrews: ParamsMyCrews
  myRoles: ParamsMyRoles
}

export type ParamUserPageEdit = {
  userDetail: ParamUserDetailType
  searchRoles: ParamSearchRoleType
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

export type IGetUsersByHierarchyParams = {
  limit?: number
  page?: number
  q?: string
  companies?: CompaniesParamsDto[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]

  startDate: string //template start date
  endDate: string //template end date

  isRequireKpiTransaction?: boolean
  scopeUserIds?: string[]

  // for new modal
  companySelected?: IGetHierarchyOption
  jobFunctionSelected?: IGetHierarchyOption
  divisionSelected?: IGetHierarchyOption
  subDivisionSelected?: IGetHierarchyOption
  departmentSelected?: IGetHierarchyOption
  storeSelected?: IGetHierarchyOption

  isReqOneYear?: boolean
}

export type IGetUsersByHierarchyResponse = WithPaging<{
  data: (Pick<User, "id" | "prefix" | "firstName" | "lastName" | "employeeId"> & {
    kpiStatus?: KpiStatus
    kpiTransactionId?: string
  })[]
}>

export interface IGetUsersByHierarchyOnlySelectedParams extends IGetUsersByHierarchyParams {
  userSelected?: IGetHierarchyOption
}

export type IGetUsersByHierarchyOnlySelectedResponse = IGetUsersByHierarchyResponse

export type MyCrewResponse = {
  avatar: any
  createdAt: string
  creatorId: string
  deletedAt: string
  employeeId: string
  firstName: string
  genTrOneHundredDays: boolean
  genTrOneYear: boolean
  genTrSixtyDays: boolean
  grade: number
  hireDate: string
  id: string
  lastName: string
  positionName: string
  prefix: string
  resignationDate: string
  status: boolean
  storeName: string
  tenantId: string
  updatedAt: string
  updaterId: string
}

export type IParamsUpdateUserDetail = {
  myMgr?: IParamsMgrUpdate
  myCrew?: ParamMyCrewUpdate
  myRole?: ParamMyRolesUpdate
  userVisibility?: ParamUserVisibilityUpdate & {
    // for new modal
    companySelected?: IGetHierarchyOption
    jobFunctionSelected?: IGetHierarchyOption
    divisionSelected?: IGetHierarchyOption
    subDivisionSelected?: IGetHierarchyOption
    departmentSelected?: IGetHierarchyOption
    storeSelected?: IGetHierarchyOption
  }
}

export type IParamsMgrUpdate = {
  directManager1Id: string
  directManager2Id: string
}

export type ParamMyCrewUpdate = {
  userIds: string[]
}

export type ParamMyRolesUpdate = {
  roleIds: string[]
}

export type ParamGetOptionsAutoComplete = {
  q?: string
  limit?: number
}

export type CrewAutoCompleteResponse = {
  paging: PagingType
  users: MyCrewResponse[]
}

export type RoleAutoCompleteResponse = {
  paging: PagingType
  myRoles: Role[]
}

export type CompanySelect = {
  companyId: string
  divisionIds?: string[]
  departmentIds?: string[]
  jobFunctionIds?: string[]
  storeIds?: string[]
}

export type ParamUserVisibilityUpdate = {
  companies?: CompanySelect[]
  jobLevelIds?: string[]
  jobCodeIds?: string[]
  salaryAdminPlanIds?: string[]
  employeeTypes?: EmployeeType[] | string[]
  employeeClassificationIds?: string[]
  positionLevelIds?: string[]
}

export type OrganizationDetailsResponse = {
  companies: string[]
  divisions: string[]
  stores: string[]
  departments: string[]
  jobFunctions: string[]

  jobLevels: string[]
  jobCodes: string[]
  salaryAdminPlans: string[]
  employeeClassifications: string[]
  positionLevels: string[]
  employeeTypes: EmployeeType[]
}
