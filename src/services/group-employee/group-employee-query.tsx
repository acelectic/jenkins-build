import deepmerge from "deepmerge"
import { ceil, chunk } from "lodash"
import { useQuery, UseQueryOptions } from "react-query"
import { api } from "../../utils/api"
import {
  IBaseStructureOption,
  IGetBaseOptionResponse,
  IGetHierarchyOption,
  IGetStructureOptionParams,
  IGetStructureOptionResponse,
  MetaParams,
} from "./group-employee-type"

const FORM = `/forms`
const FORM_KPI = `${FORM}/kpi`
const FORM_KPI_BASE_OPTION = `${FORM_KPI}/base-option`
const FORM_KPI_STRUCTURE_OPTION = `${FORM_KPI}/structure-option`

export const useGetBaseOption = () => {
  return useQuery(
    [FORM_KPI_BASE_OPTION],
    async () => {
      const { data } = await api.cpallPmsBackOffice.get<IGetBaseOptionResponse>(
        `${FORM_KPI_BASE_OPTION}`,
      )
      return data
    },
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  )
}

type IBaseParams = Pick<
  IGetStructureOptionParams,
  | "companyIds"
  | "jobFunctionIds"
  | "divisionIds"
  | "subDivisionIds"
  // new
  | "companySelected"
  | "jobFunctionSelected"
  | "divisionSelected"
  | "subDivisionSelected"
  | "departmentSelected"
>

const baseStructureOptionParams: IGetStructureOptionParams = {
  companyIds: [],
  jobFunctionIds: [],
  divisionIds: [],
  subDivisionIds: [],
  companySelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  jobFunctionSelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  divisionSelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  subDivisionSelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  departmentSelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  storeSelected: {
    isCheckedAll: false,
    selectedIds: [],
    excludeIds: [],
  },
  company: {
    isSelected: false,
    limit: 100,
    page: 1,
    q: undefined,
  },
  jobFunction: {
    isSelected: false,
    limit: 100,
    page: 1,
    q: undefined,
  },
  division: {
    isSelected: false,
    limit: 100,
    page: 1,
    q: undefined,
  },
  subDivision: {
    isSelected: false,
    limit: 100,
    page: 1,
    q: undefined,
  },
  department: {
    isSelected: false,
    limit: 100,
    page: 1,
    q: undefined,
  },
  store: {
    isSelected: false,
    companies: [],
    endDate: undefined,
  },
  countUser: {
    isSelected: false,
  },
}
const baseUseQueryOption: Readonly<
  Pick<UseQueryOptions, "staleTime" | "cacheTime" | "keepPreviousData">
> = {
  staleTime: 5 * 1000,
  cacheTime: 30 * 1000,
  keepPreviousData: true,
} as const

// eslint-disable-next-line @typescript-eslint/naming-convention
type OmitIsSelected<T> = Omit<T, "isSelected">

export const mergeStructureOptionParams = (
  newParams: Partial<IGetStructureOptionParams>,
): IGetStructureOptionParams => {
  const _newParams: IGetStructureOptionParams = {
    ...baseStructureOptionParams,
    ...newParams,
  }
  const params: IGetStructureOptionParams = deepmerge(baseStructureOptionParams, _newParams)
  return params
}

export const checkHierarchyParamsNotEmpty = (data?: IGetHierarchyOption) => {
  return !!data?.isCheckedAll || !!data?.selectedIds?.length || !!data?.excludeIds?.length
}

export const useGetCompanyOption = (
  params: OmitIsSelected<IGetStructureOptionParams["company"]> &
    Pick<IGetStructureOptionParams, "companySelected">,
) => {
  const { companySelected, ...restParams } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    company: { ...restParams, isSelected: true },
    companySelected: companySelected || baseStructureOptionParams.companySelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "company", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.companies
    },
    {
      ...baseUseQueryOption,
    },
  )
}

export const useGetJobFunctionOption = (
  params: OmitIsSelected<IGetStructureOptionParams["jobFunction"]> &
    Pick<IGetStructureOptionParams, "companyIds" | "companySelected" | "jobFunctionSelected">,
) => {
  const { companySelected, jobFunctionSelected, ...restParams } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    jobFunction: { ...restParams, isSelected: true },
    companySelected,
    jobFunctionSelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "jobFunction", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.jobFunctions
    },
    {
      enabled: checkHierarchyParamsNotEmpty(companySelected),
      ...baseUseQueryOption,
    },
  )
}

export const useGetDivisionOption = (
  params: OmitIsSelected<IGetStructureOptionParams["division"]> &
    Pick<
      IGetStructureOptionParams,
      | "companyIds"
      | "jobFunctionIds"
      | "companySelected"
      | "jobFunctionSelected"
      | "divisionSelected"
    >,
) => {
  const { companySelected, jobFunctionSelected, divisionSelected, ...restParams } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    division: { ...restParams, isSelected: true },
    companySelected: companySelected,
    jobFunctionSelected: jobFunctionSelected,
    divisionSelected: divisionSelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "division", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.divisions
    },
    {
      enabled: checkHierarchyParamsNotEmpty(companySelected),
      ...baseUseQueryOption,
    },
  )
}

export const useGetSubDivisionOption = (
  params: OmitIsSelected<IGetStructureOptionParams["subDivision"]> &
    Pick<
      IGetStructureOptionParams,
      | "companyIds"
      | "jobFunctionIds"
      | "divisionIds"
      | "companySelected"
      | "jobFunctionSelected"
      | "divisionSelected"
      | "subDivisionSelected"
    >,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    ...restParams
  } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    subDivision: { ...restParams, isSelected: true },
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "subDivision", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.subDivisions
    },
    {
      enabled: checkHierarchyParamsNotEmpty(companySelected),
      ...baseUseQueryOption,
    },
  )
}

export const useGetDepartmentOption = (
  params: OmitIsSelected<IGetStructureOptionParams["department"]> &
    Pick<
      IGetStructureOptionParams,
      | "companyIds"
      | "jobFunctionIds"
      | "divisionIds"
      | "subDivisionIds"
      | "companySelected"
      | "jobFunctionSelected"
      | "divisionSelected"
      | "subDivisionSelected"
      | "departmentSelected"
    >,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    ...restParams
  } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    department: { ...restParams, isSelected: true },
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "department", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.departments
    },
    {
      enabled: checkHierarchyParamsNotEmpty(companySelected),
      ...baseUseQueryOption,
    },
  )
}

export const useGetStoreOption = (
  params: OmitIsSelected<IGetStructureOptionParams["store"]> &
    Omit<IBaseParams, "companies"> &
    Pick<
      IGetStructureOptionParams,
      | "companySelected"
      | "jobFunctionSelected"
      | "divisionSelected"
      | "subDivisionSelected"
      | "departmentSelected"
      | "storeSelected"
    >,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
    ...restParams
  } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    store: { ...restParams, isSelected: true },
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
  })

  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "store", _params],
    async () => {
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.stores
    },
    {
      enabled: checkHierarchyParamsNotEmpty(companySelected),
      ...baseUseQueryOption,
    },
  )
}

export const useGetCountUsersFromHierarchy = (
  params: OmitIsSelected<IGetStructureOptionParams["countUser"]> &
    Omit<IBaseParams, "companies"> &
    Pick<
      IGetStructureOptionParams,
      | "companySelected"
      | "jobFunctionSelected"
      | "divisionSelected"
      | "subDivisionSelected"
      | "departmentSelected"
      | "storeSelected"
    >,
) => {
  const {
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
    ...restParams
  } = params
  const _params: IGetStructureOptionParams = mergeStructureOptionParams({
    countUser: { ...restParams, isSelected: true },
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
  })
  return useQuery(
    [FORM, FORM_KPI, FORM_KPI_STRUCTURE_OPTION, "count-users-from-hierarchy", _params],
    async () => {
      if (!checkHierarchyParamsNotEmpty(companySelected)) return 0
      const { data } = await api.cpallPmsBackOffice.post<IGetStructureOptionResponse>(
        `${FORM_KPI_STRUCTURE_OPTION}`,
        _params,
      )
      return data?.countUser
    },
    {
      ...baseUseQueryOption,
      placeholderData: 0,
    },
  )
}

export const useGetJobCodeOption = (params: Omit<MetaParams, "isSelected">) => {
  const { q, page = 1, limit = 100 } = params
  const { data: baseOption } = useGetBaseOption()
  return useQuery(
    [FORM, FORM_KPI, "custom-job-code-paginate", params],
    async () => {
      const jobCodes = baseOption?.options?.jobCodes || []
      let filterJobCodes = jobCodes
      if (q) {
        filterJobCodes = jobCodes?.filter((d) => d.code?.includes(q) || d.description?.includes(q))
      }
      const chunkDataList = chunk(filterJobCodes, limit)
      const totalRecords = filterJobCodes?.length
      const lastPage = ceil(totalRecords / limit)
      const hasMorePages = page < lastPage
      const resultJobCodes = chunkDataList[Math.max(page - 1, 0)] || []
      const response: WithPaging<{
        jobCodes: IBaseStructureOption[]
      }> = {
        jobCodes: resultJobCodes as IBaseStructureOption[],
        paging: {
          currentPage: `${page}`,
          lastPage,
          totalRecords,
          hasMorePages,
        },
      }
      return response
    },
    {
      enabled: !!baseOption,
      ...baseUseQueryOption,
    },
  )
}
