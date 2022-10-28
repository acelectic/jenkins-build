import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import { setTimeoutInValidateQueryAggregate } from "../../utils/helper"
import { DASHBOARDS } from "../dashboard/dashboard-query"
import { checkHierarchyParamsNotEmpty } from "../group-employee/group-employee-query"
import { REPORTS } from "../report/report-query"
import {
  AssessmentListParams,
  AssessmentListResponse,
  AssessmentTypeKpiTemplateResponse,
  EmployeeResponse,
  OptionKpiTemplateResponse,
  ParamsGetEmployeesByKpiTemplateId,
  IGetEmployeesPreviewParams,
  ISubmitCreateKpiType,
  ISubmitCreateOneYearType,
  ISubmitCreateProbationType,
  TemplateTypeDelete,
  ValidateCreateKpiPeriodTemplateResponse,
} from "./set-form-type"

const FORMS = "forms"
const FORMS_ONE_YEAR = `${FORMS}/one-year`
const FORMS_PROBATION = `${FORMS}/probation`
const FORMS_EMPLOYEES_PREVIEW = `${FORMS}/employees-preview`
const FORMS_KPI = `${FORMS}/kpi`
const FORMS_KPI_VALIDATE = `${FORMS_KPI}/validate`

export const useGetSetFormList = (params: AssessmentListParams) => {
  return useQuery([FORMS, params], async () => {
    const { data } = await api.cpallPmsBackOffice.get<AssessmentListResponse>(`${FORMS}`, {
      ...params,
    })
    return data
  })
}

export const useGetAssessmentTemplateListPage = (
  param: AssessmentListParams,
  lastPage?: number,
) => {
  const { useInProgressList, useFinishedList } = param
  const { params: inProgressList, isSelected: isSelectedInProgressList } = useInProgressList
  const { params: finishedList, isSelected: isSelectedFinishedList } = useFinishedList
  return useInfiniteQuery(
    [FORMS, param, "infinite"],
    async ({ pageParam }) => {
      // เช็คว่าต้องการเอาแบบฟอร์มที่ดำเนินการอยู่หรือไม่
      // ปั่น params เอาตามแบบฟอร์มตัวที่เลือก
      if (isSelectedInProgressList) {
        const { q, orderBy, limit } = inProgressList || {}
        const { data } = await api.cpallPmsBackOffice.get<AssessmentListResponse>(`${FORMS}`, {
          ...param,
          useInProgressList: {
            isSelected: isSelectedInProgressList,
            params: {
              limit: limit,
              page: pageParam || 1,
              orderBy: orderBy,
              q: q,
            },
          },
        })

        return data
      } else {
        const { q, orderBy, limit } = finishedList || {}
        const { data } = await api.cpallPmsBackOffice.get<AssessmentListResponse>(`${FORMS}`, {
          ...param,
          useFinishedList: {
            isSelected: isSelectedFinishedList,
            params: {
              limit: limit,
              page: pageParam || 1,
              orderBy: orderBy,
              q: q,
            },
          },
        })

        return data
      }
    },
    {
      getNextPageParam: (lastGroup: AssessmentListResponse) => {
        const { inProgressList, finishedList } = lastGroup
        const { paging: pagingInProgress } = inProgressList
        const { paging: pagingFinishedList } = finishedList
        const {
          hasMorePages: hasMorePagesInProgress,
          currentPage: currentPageInProgress,
        } = pagingInProgress
        const {
          hasMorePages: hasMorePagesFinishedList,
          currentPage: currentPageFinishedList,
        } = pagingFinishedList

        // เช็คว่าแบบฟอร์มที่ดำเนินการอยู่มีหน้าต่อไปหรือไม่ถ้ามีจะ +1 ไปหน้าต่อไป
        // ไม่มีจะคืน null
        if (hasMorePagesInProgress) {
          return Number(currentPageInProgress) + 1
        }
        // เช็คว่าแบบฟอร์มที่ที่สำเร็จแล้วมีหน้าต่อไปหรือไม่ถ้ามีจะ +1 ไปหน้าต่อไป
        else if (hasMorePagesFinishedList) {
          return Number(currentPageFinishedList) + 1
        } else {
          return null
        }
      },
    },
  )
}

export const useGetAssessmentTemplateDetail = (param: AssessmentListParams) => {
  const { useFormDetail } = param
  return useQuery(
    [FORMS, "assessment-template-detail", param],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<AssessmentListResponse>(`${FORMS}`, {
        useFinishedList: { isSelected: false },
        useInProgressList: { isSelected: false },
        useFormDetail,
      })
      return data
    },
    { enabled: !!param.useFormDetail.params?.templateId },
  )
}

export const useDeleteKpiTemplate = (templateType: AssessmentTypeKpiTemplateResponse) => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const assessmentType =
    templateType === AssessmentTypeKpiTemplateResponse.ONE_YEAR ? "one-year" : templateType
  const mutate = useMutation(
    async (kpiTemplateId: string) => {
      return await api.cpallPmsBackOffice.delete(`${FORMS}/${assessmentType}/${kpiTemplateId}`, {})
    },
    {
      onSuccess: (response, templateId: string) => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.removeQueries([FORMS, FORMS_KPI, { templateId }])
          queryClient.removeQueries([FORMS, "assessment-template-detail"])
          queryClient.removeQueries([FORMS, FORMS_ONE_YEAR, { templateId }])

          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([FORMS, FORMS_KPI])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}

export const useGetOptionKpiTemplate = (type: TemplateTypeDelete) => {
  return useQuery([FORMS, type, "options"], async () => {
    const { data } = await api.cpallPmsBackOffice.get<OptionKpiTemplateResponse>(
      `${FORMS}/${type}/template-options`,
    )
    return data
  })
}

export const useCreateOneYearTemplate = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (params: ISubmitCreateOneYearType) => {
      const { data } = await api.cpallPmsBackOffice.post(`${FORMS_ONE_YEAR}`, params)
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}

export const useCreateProbationTemplate = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (params: ISubmitCreateProbationType) => {
      const { data } = await api.cpallPmsBackOffice.post(`${FORMS_PROBATION}`, params)
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}

export const useCreateKpiTemplate = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  const mutate = useMutation(
    async (params: ISubmitCreateKpiType) => {
      const { data } = await api.cpallPmsBackOffice.post(`${FORMS_KPI}`, params)
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
        snackbar({ message: "success", type: "success" })
      },
    },
  )
  return mutate
}

export const useGetOneYearForEdit = (templateId: string) => {
  return useQuery(
    [FORMS, FORMS_ONE_YEAR, { templateId }, "oneYearEdit"],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<ISubmitCreateOneYearType>(
        `${FORMS_ONE_YEAR}/${templateId}`,
      )
      return data
    },
    { enabled: !!templateId },
  )
}

export const useUpdateOneYearTemplate = (templateId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: ISubmitCreateOneYearType) => {
      const { data } = await api.cpallPmsBackOffice.put(`${FORMS_ONE_YEAR}/${templateId}`, params)
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
      },
    },
  )
  return mutate
}

export const useGetProbationForEdit = (templateId: string) => {
  return useQuery(
    [FORMS, FORMS_PROBATION, { templateId }, "probationEdit"],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<ISubmitCreateProbationType>(
        `${FORMS_PROBATION}/${templateId}`,
      )
      return data
    },
    { enabled: !!templateId },
  )
}

export const useUpdateProbationTemplate = (templateId: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: ISubmitCreateProbationType) => {
      const { data } = await api.cpallPmsBackOffice.put(`${FORMS_PROBATION}/${templateId}`, params)
      return data
    },
    {
      onSuccess: () => {
        setTimeoutInValidateQueryAggregate(() => {
          queryClient.invalidateQueries([FORMS])
          queryClient.invalidateQueries([DASHBOARDS])
          queryClient.invalidateQueries([REPORTS])
        }, 3 * 1000)
      },
    },
  )
  return mutate
}

export const useGetKpiForEdit = (templateId: string) => {
  return useQuery([FORMS, FORMS_KPI, { templateId }, "kpi_copy"], async () => {
    const { data } = await api.cpallPmsBackOffice.get<ISubmitCreateKpiType>(
      `${FORMS_KPI}/${templateId}`,
    )
    return data
  })
}

export const useGetEmployeesByKpiTemplate = (params: ParamsGetEmployeesByKpiTemplateId) => {
  const { isKpiType, templateId, page, limit } = params
  return useQuery(
    [FORMS, FORMS_KPI, { templateId }, "employees", params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<EmployeeResponse>(
        `${FORMS_KPI}/${templateId}/employees`,
        { page: page, limit: limit },
      )
      return data
    },
    { enabled: isKpiType },
  )
}

export const useValidateCreateKpiPeriodTemplate = () => {
  return useMutation(async (params: ISubmitCreateKpiType) => {
    const { data } = await api.cpallPmsBackOffice.post<ValidateCreateKpiPeriodTemplateResponse>(
      `${FORMS_KPI_VALIDATE}`,
      params,
    )
    return data
  })
}

export const useGetEmployeesPreview = (params: IGetEmployeesPreviewParams) => {
  return useQuery(
    [FORMS, FORMS_EMPLOYEES_PREVIEW, params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<EmployeeResponse>(
        `${FORMS_EMPLOYEES_PREVIEW}`,
        params,
      )
      return data
    },
    { enabled: checkHierarchyParamsNotEmpty(params.companySelected) },
  )
}
