import { useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../utils/api"
import {
  RoleAddType,
  GetRoleParamOld,
  RoleListResponseOld,
  RoleEditType,
  GetSearchUsersResponse,
  GetEditRoleParams,
  GetCreateRoleParams,
  CreateRoleResponse,
  EditUserParams,
  GetRoleParam,
  RoleListResponse,
  RoleDetailResponse,
  UserPageParam,
} from "./role-type"

const defaultRoleParam: DeepPartial<GetRoleParamOld> = {
  roles: {
    isSelected: false,
    limit: 0,
  },
  roleDetail: {
    isSelected: false,
  },
  users: {
    isSelected: false,
    limit: 0,
    q: "",
  },
}

export const ROLES = "roles"

export const ROLESTATUS = "status"

export const useGetUsers = () => {}

export const CREATEROLE = `${ROLES}/create`

export const EDITROLE = `${ROLES}/edit`

export const USERS = "users"

export const useGetRolePage = (params: GetRoleParam) => {
  // list มีไว้ให้เวลา invalidateQueries มาโดนแค่ตัวนี้ตัวเดียว
  return useQuery(
    [ROLES, "list", params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<RoleListResponse>(
        ROLES,

        params,
      )
      return data
    },
    { keepPreviousData: true },
  )
}

export const useGetRoleDetail = (roleId: string, params?: UserPageParam) => {
  return useQuery([ROLES, roleId, params], async () => {
    const { data } = await api.cpallPmsBackOffice.get<RoleDetailResponse>(
      `${ROLES}/${roleId}`,
      params,
    )
    return data
  })
}

export const useGetUserTable = (params: Pick<GetRoleParamOld, "users">) => {
  const { users } = params
  const { roleId } = users
  return useQuery(
    [ROLES, roleId, params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<RoleListResponseOld>(ROLES, {
        ...defaultRoleParam,
        ...params,
      })
      return data.users
    },
    { keepPreviousData: true, enabled: !!users.roleId },
  )
}

export const useGetUserName = <T extends BaseOptionType = BaseOptionType>(
  params: Pick<GetRoleParamOld, "users">,
) => {
  return useMutation([ROLES], async (param: any) => {
    const { q } = param

    if (!q) return await Promise.resolve([])
    params.users.q = q
    const { data } = await api.cpallPmsBackOffice.get<RoleListResponseOld>(ROLES, {
      ...defaultRoleParam,
      ...params,
    })
    const options = data.users.data.map((c) => {
      return { label: `${c.firstName} ${c.lastName}`, value: c.employeeId } as T
    })
    return options
  })
}

export const useGetRoleName = <T extends BaseOptionType = BaseOptionType>(
  params: Pick<GetRoleParamOld, "roles">,
) => {
  return useMutation([ROLES], async (param: any) => {
    const { q } = param

    if (!q) return await Promise.resolve([])
    params.roles.q = q
    const { data } = await api.cpallPmsBackOffice.get<RoleListResponseOld>(ROLES, {
      ...defaultRoleParam,
      ...params,
    })
    const options = data.roles.data.map((c) => {
      return { label: `${c.name}`, value: c.name } as T
    })
    return options
  })
}

export const useGetRole = (params: GetRoleParamOld) => {
  const { roleDetail } = params
  const { roleId } = roleDetail
  return useQuery([ROLES, roleId], async () => {
    const { data: roleDetailData } = await api.cpallPmsBackOffice.get<RoleListResponseOld>(
      ROLES,
      params,
    )
    return roleDetailData
  })
}

export const useGetCreateRole = (params: GetCreateRoleParams) => {
  return useQuery([ROLES, params], async () => {
    const { data } = await api.cpallPmsBackOffice.get<CreateRoleResponse>(CREATEROLE, params)
    return data
  })
}

export const useGetEditRoleDetail = (params: Omit<GetEditRoleParams, "roles">) => {
  return useQuery(
    [ROLES, params],
    async () => {
      const { roleDetail } = params
      const { roleId } = roleDetail
      const { data: roleDetailData } = await api.cpallPmsBackOffice.get<RoleDetailResponse>(
        `${ROLES}/${roleId}`,
      )
      return roleDetailData
    },
    { keepPreviousData: true },
  )
}

export const useGetAsyncSearchUserOptions = <T extends BaseOptionType = BaseOptionType>() => {
  const mutate = useMutation(async (params: GetEditRoleParams) => {
    const { searchUsers } = params
    const { q } = searchUsers
    if (!q) return await Promise.resolve([])
    const { data } = await api.cpallPmsBackOffice.get<GetSearchUsersResponse>(`${EDITROLE}`, params)
    const options = data.searchUsers.data.map((user) => {
      return {
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      } as T
    })
    return options
  })
  return mutate
}

export const useAddRole = () => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (data: RoleAddType) => {
      const response = await api.cpallPmsBackOffice.post<RoleAddType>(`${ROLES}`, {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        permissionIds: data.permissionIds,
      })
      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ROLES])
      },
    },
  )
  return mutate
}

export const useEditRole = (roleId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (data: RoleEditType) => {
      const response = await api.cpallPmsBackOffice.put<RoleEditType>(`${ROLES}/${roleId}`, {
        name: data.name,
        description: data.description,
        isActive: data.isActive,
        permissionIds: data.permissionIds,
      })
      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ROLES])
      },
    },
  )
  return mutate
}

export const useDeleteRole = (roleId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async () => {
      return await api.cpallPmsBackOffice.delete(`${ROLES}/${roleId}`, {})
    },
    {
      onSuccess: () => {
        //        queryClient.removeQueries([ROLES, roleId])
        queryClient.invalidateQueries([ROLES, "list"])
      },
    },
  )
  return mutate
}

export const useAddRoleUsers = (roleId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (data: EditUserParams) => {
      const response = await api.cpallPmsBackOffice.post(`${ROLES}/${roleId}/${USERS}`, data)
      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ROLES])
      },
    },
  )
  return mutate
}

export const useDeleteRoleUsers = (roleId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (data: EditUserParams) => {
      const response = await api.cpallPmsBackOffice.delete(`${ROLES}/${roleId}/${USERS}`, data)
      return response
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([ROLES])
      },
    },
  )
  return mutate
}
