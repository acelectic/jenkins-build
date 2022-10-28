import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { TrackFormType } from "../../modules/TrackAssessment/TrackAssessmentDetail"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import { setTimeoutInValidateQueryAggregate } from "../../utils/helper"
import {
  GetTrackAssessmentDetailResponse,
  GetTrackAssessmentResponse,
  KpiParams,
  OneYearParams,
  ProbationParams,
} from "./track-assessment-type"

const TRACK_ASSESSMENT = "track-assessments"
const TRACK_ASSESSMENT_PROBATION = `${TRACK_ASSESSMENT}/probations`
const MANAGE_ASSESSMENT_RESULT = `${TRACK_ASSESSMENT_PROBATION}/manage-assessment-results`

export const useGetOneYearTrackAssessment = (
  params: OneYearParams,
  option?: UseQueryOptions<GetTrackAssessmentResponse>,
) => {
  const { limit, orderBy, page, q, filterByStatus } = params
  return useQuery(
    [TRACK_ASSESSMENT, { limit, orderBy, page, q, filterByStatus }, "OneYear"],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<GetTrackAssessmentResponse>(
        `${TRACK_ASSESSMENT}`,
        {
          kpiTransactions: {
            isSelected: false,
          },
          oneYearTransactions: {
            isSelected: true,
            params: {
              orderBy: orderBy,
              q: q,
              limit: limit,
              page: page || 1,
              filterByStatus: filterByStatus,
            },
          },
          probationTransactions: {
            isSelected: false,
          },
          oneYearOption: {},
        },
      )
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useGetKpiTrackAssessment = (
  params: KpiParams,
  option?: UseQueryOptions<GetTrackAssessmentResponse>,
) => {
  const { limit, orderBy, page, q, filterByStatus } = params
  return useQuery(
    [TRACK_ASSESSMENT, { limit, orderBy, page, q, filterByStatus }, "KPI"],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<GetTrackAssessmentResponse>(
        `${TRACK_ASSESSMENT}`,
        {
          kpiTransactions: {
            isSelected: true,
            params: {
              orderBy: orderBy,
              q: q,
              limit: limit,
              page: page || 1,
              filterByStatus: filterByStatus,
            },
          },
          oneYearTransactions: {
            isSelected: false,
          },
          probationTransactions: {
            isSelected: false,
          },
          kpiOption: {},
        },
      )
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useGetProbationTrackAssessment = (
  params: ProbationParams,
  option?: UseQueryOptions<GetTrackAssessmentResponse>,
) => {
  const { limit, orderBy, page, q, filterByStatus, filterByResult } = params
  return useQuery(
    [TRACK_ASSESSMENT, { limit, orderBy, page, q, filterByStatus, filterByResult }, "Probation"],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<GetTrackAssessmentResponse>(
        `${TRACK_ASSESSMENT}`,
        {
          kpiTransactions: {
            isSelected: false,
          },
          oneYearTransactions: {
            isSelected: false,
          },
          probationTransactions: {
            isSelected: true,
            params: {
              orderBy: orderBy,
              q: q,
              limit: limit,
              page: page || 1,
              filterByStatus: filterByStatus,
              filterByResult: filterByResult,
            },
          },
          probationOption: {},
        },
      )
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useGetTrackAssessmentDetail = (params: string) => {
  return useQuery([TRACK_ASSESSMENT_PROBATION, params], async () => {
    const { data } = await api.cpallPmsBackOffice.get<GetTrackAssessmentDetailResponse>(
      `${TRACK_ASSESSMENT_PROBATION}/${params}`,
    )
    return data
  })
}

export const useSubmitAssessmentResults = (id: string) => {
  const { snackbar } = useSnackbar()
  const queryClient = useQueryClient()
  return useMutation(
    async (params: TrackFormType) => {
      // console.debug("Params:", params)
      const { data } = await api.cpallPmsBackOffice.put<any>(
        `${MANAGE_ASSESSMENT_RESULT}/${id}`,
        params,
      )
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.refetchQueries([TRACK_ASSESSMENT])
        }, 3 * 1000)

        snackbar({ message: "Success", type: "success" })
      },
      // onError: () => {
      //   snackbar({ message: "Error", type: "error" })
      // },
    },
  )
}
