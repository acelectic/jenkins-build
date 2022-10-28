import { identity, pickBy } from "lodash"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { api } from "../../utils/api"
import { GetAllUserFilter, GetAllUserOrder } from "../enum-typed"
import {
  checkHierarchyParamsNotEmpty,
  mergeStructureOptionParams,
} from "../group-employee/group-employee-query"
import {
  CrewAutoCompleteResponse,
  IGetUsersByHierarchyOnlySelectedParams,
  IGetUsersByHierarchyOnlySelectedResponse,
  IGetUsersByHierarchyParams,
  IGetUsersByHierarchyResponse,
  PageParams,
  ParamGetOptionsAutoComplete,
  IParamsUpdateUserDetail,
  ParamUserPage,
  ParamUserPageEdit,
  RoleAutoCompleteResponse,
  UserPageEditResponse,
  UserPageResponse,
  UserPageTestResponse,
} from "./user-type"

export const USERS = "users"
const USERS_BY_HIERARCHY = `${USERS}/get-user-by-hierarchy`
const USERS_BY_HIERARCHY_ONLY_SELECTED = `${USERS}/get-user-by-hierarchy/only-selected`
const ROLES = "roles"

export const useGetUserPage = (
  param: ParamUserPage,
  option?: UseQueryOptions<UserPageResponse>,
) => {
  return useQuery(
    [USERS, param],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<UserPageResponse>(USERS, param)
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useGetUserTest = (param: PageParams) => {
  const { limit, page } = param
  return useQuery(
    [USERS, param],
    async ({ pageParam }) => {
      const { data } = await api.cpallPmsBackOffice.get<UserPageTestResponse>(`${USERS}/test`, {
        limit,
        page: page || 1,
      })
      return data
    },
    { keepPreviousData: true },
  )
}

export const useGetAutocompleteRoleOpitions = <T extends BaseOptionType = BaseOptionType>() => {
  const mutate = useMutation(async (params: ParamUserPageEdit) => {
    const { q } = params.searchRoles
    if (!q) return await Promise.resolve([])
    const { data } = await api.cpallPmsBackOffice.get<UserPageEditResponse>(`${USERS}/edit`, params)
    const options = data.searchRoles.data.map((role) => {
      return {
        label: role.name,
        value: role.id,
      } as T
    })
    return options
  })
  return mutate
}

export const useUpdateUserRole = (userId?: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (data?: string[]) => {
      return await api.cpallPmsBackOffice.put(`${USERS}/${userId}`, {
        roleIds: data,
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([USERS])
      },
    },
  )
  return mutate
}

export const useGetUsersByHierarchy = (
  params: IGetUsersByHierarchyParams,
  options?: UseQueryOptions<IGetUsersByHierarchyOnlySelectedResponse>,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
  } = params
  
  const _params = mergeStructureOptionParams(
    pickBy(
      {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        ...params,
      },
      identity,
    ),
  )
  return useQuery(
    [USERS, USERS_BY_HIERARCHY, _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetUsersByHierarchyResponse>(
        `${USERS_BY_HIERARCHY}`,
        _params,
      )
      return data
    },
    {
      enabled: checkHierarchyParamsNotEmpty(_params?.companySelected),
      staleTime: 15 * 1000,
      cacheTime: 15 * 1000,
      keepPreviousData: true,
      ...options,
    },
  )
}

export const useGetUsersByHierarchyOnlySelected = (
  params: IGetUsersByHierarchyOnlySelectedParams,
  options?: UseQueryOptions<IGetUsersByHierarchyOnlySelectedResponse>,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
  } = params
  const _params = mergeStructureOptionParams(
    pickBy(
      {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        ...params,
      },
      identity,
    ),
  )

  return useQuery(
    [USERS, USERS_BY_HIERARCHY_ONLY_SELECTED, _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetUsersByHierarchyOnlySelectedResponse>(
        `${USERS_BY_HIERARCHY_ONLY_SELECTED}`,
        _params,
      )
      return data
    },
    {
      enabled: checkHierarchyParamsNotEmpty(_params?.companySelected),
      staleTime: 15 * 1000,
      cacheTime: 15 * 1000,
      keepPreviousData: true,
      ...options,
    },
  )
}

export const useFetchUsersByHierarchyOnlySelected = () => {
  return useMutation(async (params: IGetUsersByHierarchyOnlySelectedParams) => {
    const { data } = await api.cpallPmsBackOffice.post<IGetUsersByHierarchyOnlySelectedResponse>(
      `${USERS_BY_HIERARCHY_ONLY_SELECTED}`,
      params,
    )
    return data
  })
}

export const useGetAutoCompleteMgrOptions = () => {
  const mutate = useMutation(async (q: string) => {
    if (!q) return await Promise.resolve([])
    const { data } = await api.cpallPmsBackOffice.get<UserPageResponse>(USERS, {
      users: {
        isSelected: true,
        limit: 5,
        page: 1,
        q: q,
        filterBy: GetAllUserFilter.STATUS_ACTIVE,
        orderBy: GetAllUserOrder.NAME_ASC,
      },
      userDetail: { isSelected: false },
      myCrews: { isSelected: false },
      myRoles: { isSelected: false },
    })
    return data.users.data
  })
  return mutate
}

export const useGetAutoCompleteCrewOptions = (userId: string) => {
  const mutate = useMutation(async (params: ParamGetOptionsAutoComplete) => {
    const { q, limit } = params
    if (!q) return await Promise.resolve([])
    const { data } = await api.cpallPmsBackOffice.get<CrewAutoCompleteResponse>(
      `${USERS}/${userId}/search-user-for-add`,
      {
        limit: limit,
        q: q,
      },
    )
    return data.users
  })
  return mutate
}

export const useGetAutoCompleteRoleOptions = (userId: string) => {
  const mutate = useMutation(async (params: ParamGetOptionsAutoComplete) => {
    const { q, limit } = params
    if (!q) return await Promise.resolve([])
    const { data } = await api.cpallPmsBackOffice.get<RoleAutoCompleteResponse>(
      `${USERS}/${userId}/search-role-for-add`,
      {
        limit: limit,
        q: q,
      },
    )
    return data.myRoles
  })
  return mutate
}

export const useUpdateUserDetail = (userId?: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: IParamsUpdateUserDetail) => {
      return await api.cpallPmsBackOffice.patch(`${USERS}/${userId}`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([USERS])
        queryClient.invalidateQueries([ROLES])
      },
    },
  )
  return mutate
}

export const useGetUserProfileImage = (
  userId?: string,
  size: "large" | "medium" | "small" | "thumb" = "medium",
) => {
  return useQuery(
    [USERS, userId, "image-profile", { size }],
    async () => {
      const { data } = await api.cpallPmsBackOffice.getFile(
        `${USERS}/${userId}/profile.jpg`,
        {
          size,
        },
        {
          headers: {
            Accept: "image/*",
          },
        },
      )
      return data
    },
    {
      enabled: !!userId,
    },
  )
}
