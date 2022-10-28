import dayjs from "dayjs"
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query"
import { EnumTemplateType } from "../../modules/Template/CreateTemplate/SettingTemplateState"
import { api } from "../../utils/api"
import { useSnackbar } from "../../utils/custom-hook"
import { checkHierarchyParamsNotEmpty } from "../group-employee/group-employee-query"
import {
  KpiTemplateListDetails,
  PagingParams,
  CreateTemplateParams,
  TemplateResponse,
  TemplateDetailParams,
  IGetOptionHierarchyNamesParams,
  IGetOptionHierarchyNamesResponse,
} from "./kpi-template-type"

const FORMS = `forms`
const FORMS_KPI = `${FORMS}/kpi`
const FORMS_KPI_OPTION_HIERARCHY_NAMES = `${FORMS_KPI}/options/hierarchy-names`

const TEMPLATE = `templates`
const BEHAVIOR_TEMPLATE = `${TEMPLATE}/behavior-template`
const SCALE_TEMPLATE = `${TEMPLATE}/scale`
const EDIT = `edit`

export const useCreateKpiTemplate = () => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: CreateTemplateParams) => {
      const { data } = await api.cpallPmsBackOffice.post<any>(`${TEMPLATE}`, params)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TEMPLATE])
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useGetKpiTemplate = (
  params: PagingParams,
  option?: UseQueryOptions<KpiTemplateListDetails>,
) => {
  const { limit: perPage, page, orderBy, q } = params
  return useQuery(
    [TEMPLATE, params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<KpiTemplateListDetails>(`${TEMPLATE}`, {
        useTemplateList: {
          isSelected: true,
          params: {
            limit: perPage,
            page: page || 1,
            orderBy: orderBy,
            q: q,
          },
        },
        useTemplateDetail: { isSelected: false },
      })
      return data
    },
    { ...option, keepPreviousData: true },
  )
}

export const useGetTemplateDetail = (detailParams: TemplateDetailParams) => {
  const { templateId, templateType } = detailParams
  return useQuery(
    [BEHAVIOR_TEMPLATE, SCALE_TEMPLATE, detailParams],
    async () => {
      // เช็ค type ของ template เพื่อยิง api ตาม path
      if (templateType === EnumTemplateType.BEHAVIOR) {
        const { data } = await api.cpallPmsBackOffice.get<TemplateResponse>(
          `${BEHAVIOR_TEMPLATE}/${templateId}/${EDIT}`,
        )
        return data
      } else {
        const { data } = await api.cpallPmsBackOffice.get<TemplateResponse>(
          `${SCALE_TEMPLATE}/${templateId}/${EDIT}`,
        )
        return data
      }
    },
    { enabled: !!templateId },
  )
}

export const useUpdateTemplate = (templateId?: string) => {
  const queryClient = useQueryClient()
  const mutate = useMutation(
    async (params: CreateTemplateParams) => {
      const { forKpi } = params
      if (forKpi) {
        const { data } = await api.cpallPmsBackOffice.put<any>(
          `${SCALE_TEMPLATE}/${templateId}`,
          params,
        )
        return data
      } else {
        const { data } = await api.cpallPmsBackOffice.put<any>(
          `${BEHAVIOR_TEMPLATE}/${templateId}`,
          params,
        )
        return data
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TEMPLATE])
        queryClient.invalidateQueries([BEHAVIOR_TEMPLATE, SCALE_TEMPLATE])
      },
      onError: (error: any) => {
        console.debug(error)
      },
    },
  )
  return mutate
}

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient()
  const { snackbar } = useSnackbar()
  return useMutation(
    async ({
      templateId,
      templateType,
    }: {
      templateId: string
      templateType: EnumTemplateType
    }) => {
      // เช็ค type ของ template เพื่อยิง api ตาม path
      if (templateType === EnumTemplateType.BEHAVIOR) {
        return await api.cpallPmsBackOffice.delete(`${BEHAVIOR_TEMPLATE}/${templateId}`)
      } else {
        return await api.cpallPmsBackOffice.delete(`${SCALE_TEMPLATE}/${templateId}`)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TEMPLATE])
        queryClient.invalidateQueries([BEHAVIOR_TEMPLATE, SCALE_TEMPLATE])
        snackbar({ message: "Success", type: "success" })
      },
      onError: (error: any) => {
        snackbar({ message: "Error", type: "error" })
      },
    },
  )
}

/**
 * @description เอาไว้ get values สำหรับ initial form values หน้าเลือกพนักงานจากโครงสร้าง
 */
export const useGetOptionHierarchyNames = (params: IGetOptionHierarchyNamesParams) => {
  return useQuery(
    [FORMS, FORMS_KPI, FORMS_KPI_OPTION_HIERARCHY_NAMES, params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetOptionHierarchyNamesResponse>(
        `${FORMS_KPI_OPTION_HIERARCHY_NAMES}`,
        params,
      )
      return data
    },
    {
      enabled: checkHierarchyParamsNotEmpty(params.companySelected),
      staleTime: 10 * 1000,
      cacheTime: 10 * 1000,
      keepPreviousData: true,
    },
  )
}

export const useFetchOptionHierarchyNames = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: IGetOptionHierarchyNamesParams) => {
      const { data } = await api.cpallPmsBackOffice.post<IGetOptionHierarchyNamesResponse>(
        `${FORMS_KPI_OPTION_HIERARCHY_NAMES}`,
        params,
      )
      return data
    },
    {
      onSuccess: (response, params) => {
        queryClient.setQueryData(
          [FORMS, FORMS_KPI, FORMS_KPI_OPTION_HIERARCHY_NAMES, params],
          response,
          {
            updatedAt: dayjs().add(30, "second").unix(),
          },
        )
      },
    },
  )
}
