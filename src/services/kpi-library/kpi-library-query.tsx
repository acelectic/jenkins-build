import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import {
  CategoryOptionsResponse,
  CreateKpiLibraryParams,
  CreateKpiLibraryResponse,
  GetKpiLibrary,
  KpiLibraryResponse,
} from "./kpi-library-types"

const KPI_LIBRARY = `/kpi-libraries`
const CATEGORY_OPTIONS = `${KPI_LIBRARY}/options`
const MANAGE_KPI_ASSESSMENTS = "manage-kpi-assignments"

export const useGetKpiLibraryPage = (
  params: GetKpiLibrary,
  option?: UseQueryOptions<KpiLibraryResponse>,
) => {
  const { perPage, page, orderBy } = params.meta
  return useQuery(
    [KPI_LIBRARY, params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<KpiLibraryResponse>(`${KPI_LIBRARY}`, {
        meta: { limit: perPage, page: page || 1, orderBy: orderBy },
      })
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useOptionCategory = () => {
  return useQuery([CATEGORY_OPTIONS], async () => {
    const { data } = await api.cpallPmsBackOffice.get<CategoryOptionsResponse>(
      `${CATEGORY_OPTIONS}`,
    )
    return data
  })
}

export const useCreateKpiLibrary = () => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: CreateKpiLibraryParams) => {
      const { data } = await api.cpallPmsBackOffice.post<CreateKpiLibraryResponse>(
        KPI_LIBRARY,
        params,
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([MANAGE_KPI_ASSESSMENTS])
        queryClient.invalidateQueries([KPI_LIBRARY])
        queryClient.invalidateQueries([CATEGORY_OPTIONS])
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useDeleteKpiLibrary = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  return useMutation(
    async (kpiLibraryId: string) => {
      return await api.cpallPmsBackOffice.delete(`${KPI_LIBRARY}/${kpiLibraryId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([KPI_LIBRARY])
        queryClient.invalidateQueries([CATEGORY_OPTIONS])
        snackbar({ message: "success", type: "success" })
      },
      onError: (error) => {
        console.debug("error", error)
      },
    },
  )
}

export const useUpdateKpiLibrary = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  return useMutation(
    async (params: CreateKpiLibraryParams) => {
      const { id } = params
      return await api.cpallPmsBackOffice.put(`${KPI_LIBRARY}/${id}`, params)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([KPI_LIBRARY])
        queryClient.invalidateQueries([CATEGORY_OPTIONS])
        snackbar({ message: "success", type: "success" })
      },
      onError: (error) => {
        console.debug("error", error)
      },
    },
  )
}
