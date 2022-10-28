import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  // UseQueryOptions,
} from "react-query"
import { SignInParams, UserResponse } from "./auth-types"
import { api } from "../../utils/api"
import dayjs from "dayjs"
import LocalStorageHelper from "../../utils/local-storage-helper"
import { sleep } from "../../utils/helper"

export const AUTH = "auth"

export const SIGN_IN = `${AUTH}/sign-in`

export const CURRENT_USER = `${AUTH}/getme`

export const HEALTH = "health"

// key for cache only
export const CURRENT_USER_PERMISSIONS = "permissions"

export const useHealthCheck = (options?: UseQueryOptions) => {
  return useQuery(
    [HEALTH],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get(HEALTH)
      return data
    },
    {
      cacheTime: Infinity,
      staleTime: 5 * 60 * 1000,
      useErrorBoundary: false,
      ...options,
    },
  )
}

export const useSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: SignInParams) => {
      const { data } = await api.cpallPmsBackOffice.post<UserResponse>(SIGN_IN, params)
      return data
    },
    {
      onSuccess: (data) => {
        const { id: userId, tenantId, accessToken } = data.user
        LocalStorageHelper.setAccessToken(accessToken)
        LocalStorageHelper.setEncryptValue(LocalStorageHelper.keys.USER_ID, userId)
        LocalStorageHelper.setEncryptValue(LocalStorageHelper.keys.TENANT_ID, tenantId)
        queryClient.refetchQueries([CURRENT_USER])
      },
      onError: () => { },
    },
  )
}

export const useSignOut = () => {
  const queryClient = useQueryClient()
  return useMutation<any, string>(
    async () => {
      await sleep(300)
      return {
        status: 200,
      }
    },
    {
      onSuccess: () => {
        LocalStorageHelper.clearStore()
        queryClient.refetchQueries([CURRENT_USER])
        queryClient.removeQueries()
      },
    },
  )
}

export const useCurrentUser = (option?: UseQueryOptions<UserResponse>) => {
  const accessToken = LocalStorageHelper.getAccessToken()
  return useQuery<UserResponse>(
    [CURRENT_USER],
    async () => {
      const timeStart = dayjs()
      const { data } = await api.cpallPmsBackOffice.get<UserResponse>(CURRENT_USER)
      const timeEnd = dayjs()
      const delay = timeStart.add(300, "millisecond").diff(timeEnd)
      if (delay > 0) {
        await sleep(delay)
      }
      return data
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: !!accessToken,
      onError: () => {
        // LocalStorageHelper.clearAccessToken()
      },
      ...option,
    },
  )
}

export const useGetCurrentUserPermissions = () => {
  return useQuery(
    [CURRENT_USER, CURRENT_USER_PERMISSIONS],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<UserResponse>(CURRENT_USER)
      return data.user.permissions
    },
    {
      retry: 0,
      cacheTime: 3 * 60 * 1000,
      staleTime: 15 * 1000,
      initialData: [],
      initialDataUpdatedAt: dayjs().unix(),
    },
  )
}
