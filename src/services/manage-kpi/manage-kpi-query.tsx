import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import { setTimeoutInValidateQueryAggregate } from "../../utils/helper"
import { DASHBOARDS } from "../dashboard/dashboard-query"
import { REPORTS } from "../report/report-query"
import {
  ManageKpiResponse,
  ManagerKpiParams,
  ISubmitCreateKpiTransactionDetail,
  ISubmitUpdateKpiTransactionDetail,
} from "./mange-kpi-type"

const MANAGE_KPI_ASSESSMENTS = "manage-kpi-assignments"

export const useGetManageKpiInfinite = (params: ManagerKpiParams, lastPage?: number) => {
  const { kpiTransactionDetails } = params
  const query = useInfiniteQuery(
    [MANAGE_KPI_ASSESSMENTS, params],
    async ({ pageParam }) => {
      const { data } = await api.cpallPmsBackOffice.get<ManageKpiResponse>(
        `${MANAGE_KPI_ASSESSMENTS}`,
        {
          ...params,
          kpiTransactionDetails: {
            isSelected: true,
            params: {
              limit: kpiTransactionDetails.params?.limit,
              page: pageParam || 1,
              isActiveTemplate: kpiTransactionDetails.params?.isActiveTemplate,
              orderBy: kpiTransactionDetails.params?.orderBy,
              q: kpiTransactionDetails.params?.q,
            },
          },
        },
      )
      return data
    },
    {
      getNextPageParam: (lastGroup: ManageKpiResponse) => {
        const { kpiTransactionDetails } = lastGroup
        const { paging } = kpiTransactionDetails
        const { hasMorePages, currentPage } = paging

        return hasMorePages ? Number(currentPage) + 1 : null
      },
    },
  )
  return query
}

export const useGetManageKpi = (params: ManagerKpiParams) => {
  return useQuery([MANAGE_KPI_ASSESSMENTS, params], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ManageKpiResponse>(
      `${MANAGE_KPI_ASSESSMENTS}`,
      {
        ...params,
      },
    )
    return data
  })
}

export const useGetKpiTransactionDetail = (kpiTransactionDetailId: string) => {
  return useQuery(
    [kpiTransactionDetailId, MANAGE_KPI_ASSESSMENTS],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<ManageKpiResponse>(
        `${MANAGE_KPI_ASSESSMENTS}`,
        {
          kpiTransactionDetails: {
            isSelected: false,
          },
          kpiTransactionDetail: {
            isSelected: true,
            params: {
              kpiTransactionDetailId: kpiTransactionDetailId,
            },
          },
          kpiTransactionDetailUsers: {
            isSelected: true,
            params: {
              kpiTransactionDetailId: kpiTransactionDetailId,
              limit: 200000,
            },
          },
          oldKpiTransactions: { isSelected: false },
          kpiLibrary: {
            isSelected: false,
          },
          structureOptions: {
            isSelected: false,
          },
          userByHierarchy: {
            isSelected: false,
          },
          options: {
            isSelected: true,
          },
        },
      )
      return data
    },
    { enabled: !!kpiTransactionDetailId },
  )
}

export const useGetKpiLibrary = () => {
  return useQuery([MANAGE_KPI_ASSESSMENTS, "kpiLibrary"], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ManageKpiResponse>(
      `${MANAGE_KPI_ASSESSMENTS}`,
      {
        kpiTransactionDetails: {
          isSelected: false,
        },
        kpiTransactionDetail: {
          isSelected: false,
        },
        oldKpiTransactions: { isSelected: false },
        kpiTransactionDetailUsers: {
          isSelected: false,
        },
        kpiLibrary: {
          isSelected: true,
          params: {},
        },
        structureOptions: {
          isSelected: false,
        },
        userByHierarchy: {
          isSelected: false,
        },
        options: {
          isSelected: true,
        },
      },
    )
    return data
  })
}

export const useGetOptions = () => {
  return useQuery([MANAGE_KPI_ASSESSMENTS, "options"], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ManageKpiResponse>(
      `${MANAGE_KPI_ASSESSMENTS}`,
      {
        kpiTransactionDetails: {
          isSelected: false,
        },
        kpiTransactionDetail: {
          isSelected: false,
        },
        kpiTransactionDetailUsers: {
          isSelected: false,
        },
        oldKpiTransactions: { isSelected: false },
        kpiLibrary: {
          isSelected: false,
          params: {},
        },
        structureOptions: {
          isSelected: false,
        },
        userByHierarchy: {
          isSelected: false,
        },
        options: {
          isSelected: true,
        },
      },
    )
    return data.options
  })
}

export const useCreateKpiTransactionDetail = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (params: ISubmitCreateKpiTransactionDetail) => {
      const { data } = await api.cpallPmsBackOffice.post(`${MANAGE_KPI_ASSESSMENTS}`, {
        ...params,
      })
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([MANAGE_KPI_ASSESSMENTS])
        queryClient.invalidateQueries([DASHBOARDS])
        queryClient.invalidateQueries([REPORTS])
        snackbar({ message: "success", type: "success" })
      },
      onError: (error: any) => {
        console.debug(error)
        snackbar({ message: error.message, type: "error" })
      },
    },
  )
  return mutate
}

export const useDeleteKpiTransactionDetail = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (kpiTransactionDetailId: string) => {
      return await api.cpallPmsBackOffice.delete(
        `${MANAGE_KPI_ASSESSMENTS}/${kpiTransactionDetailId}`,
      )
    },
    {
      onSuccess: async () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([MANAGE_KPI_ASSESSMENTS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 2 * 1000)
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}

export const useUpdateKpiTransactionDetail = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (params: ISubmitUpdateKpiTransactionDetail) => {
      const { data } = await api.cpallPmsBackOffice.post(`${MANAGE_KPI_ASSESSMENTS}/update`, {
        ...params,
      })
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([MANAGE_KPI_ASSESSMENTS])
        queryClient.invalidateQueries([DASHBOARDS])
        queryClient.invalidateQueries([REPORTS])
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}
