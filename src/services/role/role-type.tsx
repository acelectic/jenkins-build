import {
  RoleFilterByOptions,
  RoleOrderByOptions,
  UserInRoleOrderByOptions,
} from "../enum-typed"

export type GetRoleParamOld = {
  roles: {
    isSelected: boolean
    limit: number
    page?: number
    q?: string | undefined
  }
  roleDetail: RoleDetailParam
  users: UsersParam
}

export type GetRoleParam = {
  limit: number
  page?: number
  q?: string | undefined
  orderBy?: RoleOrderByOptions
  filterBy?: RoleFilterByOptions
}

export type RoleDetailParam = {
  isSelected: boolean
  roleId: string
}

export type RoleDetailResponse = {
  role: RoleDetailItem
  permissions: RolePermissions[]
  users: RoleUser
}

export type UsersParam = {
  isSelected: boolean
  roleId: string
  limit: number
  page?: number
  q?: string | undefined
}

export type RoleListResponseOld = {
  roles: {
    isSelected: boolean
    paging: Paging
    data: Role[]
  }
  roleDetail: RoleDetail
  users: RoleUser
}

export type RoleListResponse = {
  paging: Paging
  data: Role[]
}

export type SearchUsersType = {
  data: {
    id: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    createdBy: string
    updatedBy: string
    tenantId: string
    employeeId: string
    firstName: string
    lastName: string
    position: string
  }[]
}

export type GetSearchUsersResponse = {
  roles: {
    isSelected: boolean
    paging: Paging
    data: Role[]
  }
  roleDetail: RoleDetail
  users: RoleUser
  searchUsers: SearchUsersType
}

export type RoleAddType = {
  name: string
  description: string
  isActive: boolean
  permissionIds: string[]
}

export type GetCreateRoleParams = {
  roleDetail: {
    isSelected: boolean
  }
}

export type CreateRoleResponse = {
  roleDetail: {
    isSelected: boolean
    permissions: PermissionDetailType[]
  }
}

export type PermissionDetailType = {
  subjects: SubjectType[]
  featureName: string
}

export type SubjectType = {
  isSelected: boolean
  subjectName: string
  feature: string
  permissions: PermissionData[]
}

export type PermissionData = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  name: string
  subject: string
  action: string
  feature: string
  isSelected: boolean
}

export type GetEditRoleParams = {
  roles: {
    isSelected: boolean
    limit: number
    page: number
  }
  roleDetail: RoleDetailParam
  users: UsersParam
  searchUsers: SearchUsersParams
}

export type RoleUpdateUserType = {
  userIds: []
}

export type RoleEditResponse = {
  roles: {
    isSelected: boolean
    paging: Paging
    data: Role[]
  }
  roleDetail: RoleDetail
  users: RoleUser
  searchUsers: SearchUsersType
}

export type SearchUsersParams = {
  isSelected: boolean
  limit: number
  page: number
  excludeRoleId: string
  q?: string
}

export type RoleEditType = {
  name: string
  description: string
  isActive: boolean
  permissionIds: string[]
}

export type Role = {
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
}

export type Paging = {
  lastPage: number
  totalRecords: number
  currentPage: string
  hasMorePages: boolean
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
  permissions: PermissionType[]
}

export type PermissionType = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  name: string
  subject: string
  action: string
  PermissionsRole: PermissionRoleType
}

export type PermissionRoleType = {
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  permissionId: string
  roleId: string
}

export type RoleUser = {
  paging: {
    lastPage: number
    totalRecords: number
    currentPage: string
    hasMorePages: boolean
  }
  data: RoleUserData[]
}

export type RoleUserData = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  employeeId: string
  firstName: string
  lastName: string
  positionName: string
  companyName: string
  storeName: string
}

export type RoleDetail = {
  isSelected: boolean
  role: RoleDetailItem
}

export type RoleDetailItem = {
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
}

export type RolePermissions = {
  subjects: RoleSubjects[]
  featureName: string
}

export type RoleSubjects = {
  isSelected: boolean
  subjectName: string
  feature: string
  permissions: PermissionDetail[]
}

export type PermissionDetail = {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
  updatedBy: string
  tenantId: string
  name: string
  subject: string
  action: string
  feature: string
  isSelected: boolean
}

export enum RoleListDropdownStatus {
  SelectAll = "All",
  SelectActive = "Active",
  SelectNotActive = "Not Active",
}

export type EditUserParams = {
  userId: string
}

export type RoleValuesType = {
  name: string
  description: string
  isActive: string
  permissions: string[]
}

export type UserPageParam = {
  limit: number
  page?: number
  q?: string | undefined
  orderBy?: UserInRoleOrderByOptions
}
