import { useInfiniteQuery, useMutation, useQueryClient } from "react-query"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import {
  ICalibrateSessionBodyParams,
  ICalibrateSessionCopyAndEditResponse,
  ICalibrateSessionDetailResponse,
  ICalibrateSessionResponse,
  CreateCalibrateSessionParams,
  ICreateCalibrateSessionResponse,
  GetCalibrationResponse,
} from "./manage-calibration-type"
import { last } from "lodash"
import { setTimeoutInValidateQueryAggregate } from "../../utils/helper"

const CALIBRATE_SESSION = "calibrate-sessions"
const FOR_COPY_AND_EDIT = "for-copy-and-edit"
const ACTIVE = "active"
const CALIBRATION = "calibration"

export const useCalibrateSession = (params: ICalibrateSessionBodyParams, lastPage?: number) => {
  const { q, orderBy, limit, isCompleteState } = params

  const query = useInfiniteQuery(
    [CALIBRATE_SESSION, { q, orderBy, limit, isCompleteState }, "infinite", "CALIBRATE_SESSION"],

    async ({ pageParam }) => {
      const { data } = await api.cpallPmsBackOffice.get<ICalibrateSessionResponse>(
        CALIBRATE_SESSION,
        {
          q: q,
          orderBy: orderBy,
          limit: limit || 1,
          page: pageParam || 1,
          isCompleteState: isCompleteState,
        },
      )
      return data
    },
    {
      getNextPageParam: (lastGroup: ICalibrateSessionResponse) => {
        const { paging } = lastGroup
        const { hasMorePages, currentPage } = paging
        return hasMorePages ? Number(currentPage) + 1 : null
      },
    },
  )

  useEffect(() => {
    const { data, isFetching, fetchNextPage } = query
    const currentPage = last(data?.pageParams) as number
    if (lastPage && !isFetching && (!currentPage || Number(currentPage) < lastPage)) {
      fetchNextPage()
    }
  }, [lastPage, query])

  return query
}

export const useCreateCalibrateSession = () => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: CreateCalibrateSessionParams) => {
      console.debug({ useCreateCalibrateSession: params })
      const { data } = await api.cpallPmsBackOffice.post<ICreateCalibrateSessionResponse>(
        `${CALIBRATE_SESSION}`,
        params,
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CALIBRATE_SESSION])
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useGetCalibrateSessionDetailModal = (calibrateSessionId: string) => {
  return useQuery([CALIBRATE_SESSION, calibrateSessionId], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ICalibrateSessionDetailResponse>(
      `${CALIBRATE_SESSION}/${calibrateSessionId}`,
    )
    return data
  })
}

export const useCalibrateSessionCopyAndEdit = (calibrateSessionId: string) => {
  return useQuery([CALIBRATE_SESSION, FOR_COPY_AND_EDIT, calibrateSessionId], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ICalibrateSessionCopyAndEditResponse>(
      `${CALIBRATE_SESSION}/${calibrateSessionId}/${FOR_COPY_AND_EDIT}`,
    )
    return data
  })
}

export const useEditCalibrateSession = (calibrateSessionId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: CreateCalibrateSessionParams) => {
      console.debug({ useEditCalibrateSession: params })
      const { data } = await api.cpallPmsBackOffice.put<ICreateCalibrateSessionResponse>(
        `${CALIBRATE_SESSION}/${calibrateSessionId}`,
        params,
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CALIBRATE_SESSION])
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useUpdateCalibrateState = (calibrateSessionId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async () => {
      const { data } = await api.cpallPmsBackOffice.patch<ICreateCalibrateSessionResponse>(
        `${CALIBRATE_SESSION}/${calibrateSessionId}/${ACTIVE}`,
      )
      return data
    },
    {
      onSuccess: async () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([CALIBRATE_SESSION])
        }, 3 * 1000)
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useDeleteCalibration = (calibrateSessionId: string) => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  return useMutation(
    async () => {
      return await api.cpallPmsBackOffice.delete(`${CALIBRATE_SESSION}/${calibrateSessionId}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CALIBRATE_SESSION])
        snackbar({ message: "success", type: "success" })
      },
      onError: (error) => {
        console.debug("error", error)
      },
    },
  )
}

export const useCalibration = (calibrateSessionId: string) => {
  return useQuery([CALIBRATE_SESSION, CALIBRATION, calibrateSessionId], async () => {
    const { data } = await api.cpallPmsBackOffice.get<GetCalibrationResponse>(
      `${CALIBRATE_SESSION}/${calibrateSessionId}/${CALIBRATION}`,
    )
    return data
  })
}
