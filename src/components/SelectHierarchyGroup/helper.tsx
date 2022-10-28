/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormApi } from "final-form"
import { compact, forEach, keyBy, map, pick } from "lodash"
import { useCallback, useMemo, useRef, useState } from "react"
import { useForm } from "react-final-form"
import { useTranslation } from "react-i18next"
import { IKpiPeriodTemplateForm } from "../../modules/SetForm/CreateForm/KpiPeriodTemplate/KpiTemplateForm"
import { IOneYearTemplateFormType } from "../../modules/SetForm/CreateForm/OneYearTemplate/OneYearTemplateForm"
import { IProbationTemplateFormType } from "../../modules/SetForm/CreateForm/ProbationTemplate/ProbationTemplateForm"
import { useGetBaseOption } from "../../services/group-employee/group-employee-query"
import {
  IBaseStructureOption,
  IGetHierarchyOption,
} from "../../services/group-employee/group-employee-type"
import { useFetchOptionHierarchyNames } from "../../services/kpi-template/kpi-template-query"
import { IGetOptionHierarchyNamesResponse } from "../../services/kpi-template/kpi-template-type"
import { ICompany } from "../../services/set-form/set-form-type"
import {
  IParentFromValues,
  ISelectedOption,
  ISelectEmployeeFormSubmitValues,
  ISelectEmployeeFormValuesKey,
  ISelectHierarchyGroupFormValues,
} from "./interface"

export const extractOptions = (data?: ISelectedOption) => {
  const { isCheckedAll = false, isIncludeNull = false, selectOptions, excludeOptions } = data || {}

  const selectedIds: (string | null)[] = compact(
    map(Object.values(selectOptions || {}) || [], (e) => e?.id),
  )
  const excludeIds: (string | null)[] = compact(
    map(Object.values(excludeOptions || {}) || [], (e) => e?.id),
  )
  if (isCheckedAll) {
    if (isIncludeNull) {
      excludeIds.push(null)
    }
  } else {
    if (isIncludeNull) {
      selectedIds.push(null)
    }
  }
  return {
    isCheckedAll,
    selectedIds,
    excludeIds,
  }
}

export const parseOptionHashToValuesArray = (
  optionsHash?: Record<string, IBaseStructureOption>,
) => {
  return compact(Object.values(optionsHash || {}) || [])
}

export const getFinalSelectedOptions = (
  options: IBaseStructureOption[],
  data?: ISelectedOption,
  debug = false,
) => {
  const { isCheckedAll, selectOptions, excludeOptions } = data || {}
  const selectOptionList = parseOptionHashToValuesArray(selectOptions)
  const excludeOptionList = parseOptionHashToValuesArray(excludeOptions)
  const excludeOptionHashIds = keyBy(excludeOptionList, "id")
  if (debug) {
    // console.debug({
    //   data,
    //   selectOptionList,
    //   excludeOptionList,
    // })
  }

  if (selectOptionList?.length) {
    return selectOptionList
  } else if (isCheckedAll) {
    if (excludeOptionList?.length) {
      return options.filter((option) => !excludeOptionHashIds[option.id])
    } else {
      return []
    }
  } else {
    return []
  }
}

export enum EnumSelectHierarchyGroupField {
  COMPANY_OPTIONS = "companyOptions",
  JOB_FUNCTION_OPTIONS = "jobFunctionOptions",
  DIVISION_OPTIONS = "divisionOptions",
  SUB_DIVISION_OPTIONS = "subDivisionOptions",
  DEPARTMENT_OPTIONS = "departmentOptions",
  STORE_OPTIONS = "storeOptions",
  JOB_LEVEL_OPTIONS = "jobLevelOptions",
  EMPLOYEE_TYPE_OPTIONS = "employeeTypeOptions",
  SALARY_ADMIN_PLAN_OPTIONS = "salaryAdminPlanOptions",
  POSITION_LEVEL_OPTIONS = "positionLevelOptions",
  JOB_CODE_OPTIONS = "jobCodeOptions",
  EMPLOYEE_CLASSIFICATION_OPTIONS = "employeeClassificationOptions",
  COUNT_USER = "countUser",
  IS_COUNT_USER_FETCHING = "isCountUserFetching",
  USER_OPTIONS = "userOptions",
  COUNT_SELECT_USER = "countSelectUser",
}

export const useSetNormalizeHierarchyOption = () => {
  const {
    jobCodeOptions,
    jobLevelOptions,
    employeeTypeOptions,
    salaryAdminPlanOptions,
    positionLevelOptions,
    employeeClassificationOptions,
  } = useSelectEmployeeBaseOptions()

  const getFinalFilterOptionIds = useCallback(
    (formValues: ISelectHierarchyGroupFormValues) => {
      const jobCodeOptionList = getFinalSelectedOptions(
        jobCodeOptions,
        formValues?.jobCodeOptions,
        true,
      )
      // console.debug({ jobCodeOptionList })
      const jobLevelOptionList = getFinalSelectedOptions(
        jobLevelOptions,
        formValues?.jobLevelOptions,
      )
      const salaryAdminPlanOptionList = getFinalSelectedOptions(
        salaryAdminPlanOptions,
        formValues?.salaryAdminPlanOptions,
      )
      const employeeTypeOptionList = getFinalSelectedOptions(
        employeeTypeOptions,
        formValues?.employeeTypeOptions,
      )
      const employeeClassificationOptionList = getFinalSelectedOptions(
        employeeClassificationOptions,
        formValues?.employeeClassificationOptions,
      )
      const positionLevelOptionList = getFinalSelectedOptions(
        positionLevelOptions,
        formValues?.positionLevelOptions,
      )
      return {
        jobCodeOptionList,
        jobLevelOptionList,
        salaryAdminPlanOptionList,
        employeeTypeOptionList,
        employeeClassificationOptionList,
        positionLevelOptionList,
      }
    },
    [
      employeeClassificationOptions,
      employeeTypeOptions,
      jobCodeOptions,
      jobLevelOptions,
      positionLevelOptions,
      salaryAdminPlanOptions,
    ],
  )

  const getFilterOptionIds = useCallback(
    (formValues: ISelectHierarchyGroupFormValues) => {
      const {
        jobCodeOptionList,
        jobLevelOptionList,
        salaryAdminPlanOptionList,
        employeeTypeOptionList,
        employeeClassificationOptionList,
        positionLevelOptionList,
      } = getFinalFilterOptionIds(formValues)

      const result = {
        employeeTypes: mapGetOptionIds(employeeTypeOptionList || []),
        jobCodeIds: mapGetOptionIds(jobCodeOptionList || []),
        jobLevelIds: mapGetOptionIds(jobLevelOptionList || []),
        positionLevelIds: mapGetOptionIds(positionLevelOptionList || []),
        salaryAdminPlanIds: mapGetOptionIds(salaryAdminPlanOptionList || []),
        employeeClassificationIds: mapGetOptionIds(employeeClassificationOptionList || []),
      }

      return result
    },
    [getFinalFilterOptionIds],
  )

  const getHierarchyOptionsSelected = useCallback(
    (formValues?: ISelectHierarchyGroupFormValues) => {
      const companySelected = extractOptions(formValues?.companyOptions)
      const jobFunctionSelected = extractOptions(formValues?.jobFunctionOptions)
      const divisionSelected = extractOptions(formValues?.divisionOptions)
      const subDivisionSelected = extractOptions(formValues?.subDivisionOptions)
      const departmentSelected = extractOptions(formValues?.departmentOptions)
      const storeSelected = extractOptions(formValues?.storeOptions)
      const userSelected = extractOptions(formValues?.userOptions)

      return {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      }
    },
    [],
  )

  const setFilterOptionsToForm = useCallback(
    (
      form: FormApi<ISelectHierarchyGroupFormValues>,
      formValues: ISelectHierarchyGroupFormValues,
      fieldPrefix?: string,
    ) => {
      const {
        jobCodeOptionList,
        jobLevelOptionList,
        salaryAdminPlanOptionList,
        employeeTypeOptionList,
        employeeClassificationOptionList,
        positionLevelOptionList,
      } = getFinalFilterOptionIds(formValues)
      form.change(
        `${fieldPrefix || ""}${EnumSelectHierarchyGroupField.JOB_CODE_OPTIONS}.totalOptions` as any,
        jobCodeOptionList,
      )
      form.change(
        `${fieldPrefix || ""}${
          EnumSelectHierarchyGroupField.JOB_LEVEL_OPTIONS
        }.totalOptions` as any,
        jobLevelOptionList,
      )
      form.change(
        `${fieldPrefix || ""}${
          EnumSelectHierarchyGroupField.SALARY_ADMIN_PLAN_OPTIONS
        }.totalOptions` as any,
        salaryAdminPlanOptionList,
      )
      form.change(
        `${fieldPrefix || ""}${
          EnumSelectHierarchyGroupField.EMPLOYEE_TYPE_OPTIONS
        }.totalOptions` as any,
        employeeTypeOptionList,
      )
      form.change(
        `${fieldPrefix || ""}${
          EnumSelectHierarchyGroupField.EMPLOYEE_CLASSIFICATION_OPTIONS
        }.totalOptions` as any,
        employeeClassificationOptionList,
      )
      form.change(
        `${fieldPrefix || ""}${
          EnumSelectHierarchyGroupField.POSITION_LEVEL_OPTIONS
        }.totalOptions` as any,
        positionLevelOptionList,
      )

      const {
        employeeTypes,
        jobCodeIds,
        jobLevelIds,
        positionLevelIds,
        salaryAdminPlanIds,
        employeeClassificationIds,
      } = getFilterOptionIds(formValues)

      form.change(`${fieldPrefix || ""}employeeTypes` as any, employeeTypes)
      form.change(`${fieldPrefix || ""}jobCodeIds` as any, jobCodeIds)
      form.change(`${fieldPrefix || ""}jobLevelIds` as any, jobLevelIds)
      form.change(`${fieldPrefix || ""}positionLevelIds` as any, positionLevelIds)
      form.change(`${fieldPrefix || ""}salaryAdminPlanIds` as any, salaryAdminPlanIds)
      form.change(`${fieldPrefix || ""}employeeClassificationIds` as any, employeeClassificationIds)
    },
    [getFilterOptionIds, getFinalFilterOptionIds],
  )

  const setHierarchyOptionsToForm = useCallback(
    (
      form: FormApi<ISelectHierarchyGroupFormValues>,
      formValues?: ISelectHierarchyGroupFormValues,
      fieldPrefix?: string,
    ) => {
      const {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      } = getHierarchyOptionsSelected(formValues)
      const submitValues: ISelectEmployeeFormSubmitValues = {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      }
      Object.entries(submitValues).forEach(([key, value]) => {
        form.change(`${fieldPrefix || ""}${key}` as any, value)
      })
    },
    [getHierarchyOptionsSelected],
  )

  return {
    getFilterOptionIds,
    getFinalFilterOptionIds,
    getHierarchyOptionsSelected,
    setHierarchyOptionsToForm,
    setFilterOptionsToForm,
  }
}

export const mapGetOptionIds = (options?: IBaseStructureOption[]) => {
  return map(options || [], (d) => d.id)
}

export const makeOption = (codeLabel?: string) => (d: any): IBaseStructureOption => {
  const _codeLabel = compact([codeLabel, d.code]).join(" ")
  return {
    ...d,
    name: compact([d.name, d.description, d.code ? `(${_codeLabel})` : undefined]).join(" "),
  }
}

export const useSelectEmployeeBaseOptions = () => {
  const { t } = useTranslation()
  const { data: baseOptionData, isLoading: isBaseOptionsLoading } = useGetBaseOption()
  const { options } = baseOptionData || {}
  const {
    jobLevels,
    jobCodes,
    employeeTypes,
    salaryAdminPlans,
    positionLevels,
    employeeClassifications,
  } = options || {}

  const jobCodeOptions = useMemo(() => {
    return map(jobCodes || [], makeOption())
  }, [jobCodes])

  const jobLevelOptions = useMemo(() => {
    return map(jobLevels || [], makeOption())
  }, [jobLevels])

  const employeeTypeOptions = useMemo(() => {
    return map(
      employeeTypes || [],
      (d): IBaseStructureOption => {
        return {
          id: d,
          name: t(d),
        }
      },
    )
  }, [employeeTypes, t])

  const salaryAdminPlanOptions = useMemo(() => {
    return map(salaryAdminPlans || [], makeOption())
  }, [salaryAdminPlans])

  const positionLevelOptions = useMemo(() => {
    return map(positionLevels || [], makeOption())
  }, [positionLevels])

  const employeeClassificationOptions = useMemo(() => {
    return map(employeeClassifications || [], makeOption())
  }, [employeeClassifications])

  return {
    jobCodeOptions,
    jobLevelOptions,
    employeeTypeOptions,
    salaryAdminPlanOptions,
    positionLevelOptions,
    employeeClassificationOptions,
    isBaseOptionsLoading,
  }
}

export const defaultRowsPerPageOptions: number[] = [50, 100, 150, 200]

export const useSelectEmployeeFormStateHelper = <
  L extends typeof defaultRowsPerPageOptions[number]
>(option?: {
  defaultPage?: number
  defaultLimit?: L | number
}) => {
  const { defaultPage = 1, defaultLimit = 50 } = option || {}
  const [page, setPage] = useState(defaultPage)
  const [limit, setLimit] = useState(defaultLimit)
  const [q, setQ] = useState<string | undefined>("")

  const onPageChange = useCallback((page: number) => {
    setPage(Math.max(page, 1))
  }, [])

  const onRowsPerPageChange = useCallback((rowsPerPage: number) => {
    setLimit(Math.max(rowsPerPage as L, 1))
  }, [])

  const onSearch = useCallback((q: string) => {
    setQ(q || undefined)
    setPage(1)
  }, [])

  return { q, page, limit, onPageChange, onRowsPerPageChange, onSearch }
}

export const pickSelectHierarchyFieldsOnly = (formValues: ISelectHierarchyGroupFormValues) => {
  const fieldNames: ISelectEmployeeFormValuesKey[] = [
    "companyOptions",
    "jobFunctionOptions",
    "divisionOptions",
    "subDivisionOptions",
    "departmentOptions",
    "storeOptions",
    "jobLevelOptions",
    "employeeTypeOptions",
    "salaryAdminPlanOptions",
    "positionLevelOptions",
    "jobCodeOptions",
    "employeeClassificationOptions",
  ]

  return pick(formValues || {}, fieldNames)
}

export const useSelectHierarchyInitialFormValues = () => {
  const { t } = useTranslation()
  const form = useForm<ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues>()
  const isFetching = useRef(false)
  const { mutate: fetchOptionHierarchyNames } = useFetchOptionHierarchyNames()

  const fetchInitialOptionsData = useCallback(
    (
      formValues: Partial<IParentFromValues & ISelectEmployeeFormSubmitValues>,
      optionHierarchyNames: IGetOptionHierarchyNamesResponse,
    ) => {
      const employeeTypes = formValues?.employeeTypes || []

      const companiesSelected: IBaseStructureOption[] = []
      const jobFunctionsSelected: IBaseStructureOption[] = []
      const divisionsSelected: IBaseStructureOption[] = []
      const subDivisionsSelected: IBaseStructureOption[] = []
      const departmentsSelected: IBaseStructureOption[] = []
      const storesSelected: IBaseStructureOption[] = []

      const jobLevelsSelected: IBaseStructureOption[] = []
      const employeeTypesSelected: IBaseStructureOption[] = []
      const salaryAdminPlansSelected: IBaseStructureOption[] = []
      const positionLevelsSelected: IBaseStructureOption[] = []
      const jobCodesSelected: IBaseStructureOption[] = []
      const employeeClassificationsSelected: IBaseStructureOption[] = []

      forEach(optionHierarchyNames?.companies || [], (company) => {
        const { jobFunctions, divisions, subDivisions, departments, stores } = company

        companiesSelected.push(makeOption(t("รหัสบริษัท"))(company))
        jobFunctionsSelected.push(...map(jobFunctions || [], makeOption(t("รหัสสายงาน"))))
        divisionsSelected.push(...map(divisions || [], makeOption(t("รหัสสำนักงาน"))))
        subDivisionsSelected.push(...map(subDivisions || [], makeOption(t("รหัสระดับด้าน"))))
        departmentsSelected.push(...map(departments || [], makeOption(t("รหัสฝ่ายงาน"))))
        storesSelected.push(...map(stores || [], makeOption(t("JOB Code"))))
      })
      jobLevelsSelected.push(...map(optionHierarchyNames?.jobLevels || [], makeOption()))
      employeeTypesSelected.push(
        ...map(
          employeeTypes || [],
          (d): IBaseStructureOption => {
            return {
              id: d,
              name: t(d),
            }
          },
        ),
      )
      salaryAdminPlansSelected.push(
        ...map(optionHierarchyNames?.salaryAdminPlans || [], makeOption()),
      )
      positionLevelsSelected.push(...map(optionHierarchyNames?.positionLevels || [], makeOption()))
      jobCodesSelected.push(...map(optionHierarchyNames?.jobCodes || [], makeOption()))
      employeeClassificationsSelected.push(
        ...map(optionHierarchyNames?.employeeClassifications || [], makeOption()),
      )

      const formValuesJobFunctionSelected = formValues?.jobFunctionSelected
      const formValuesDivisionSelected = formValues?.divisionSelected
      const formValuesSubDivisionSelected = formValues?.subDivisionSelected
      const formValuesDepartmentSelected = formValues?.departmentSelected

      const companyOptions: ISelectedOption = {
        selectOptions: keyBy(companiesSelected, "id"),
        excludeOptions: {},
      }
      const jobFunctionOptions: ISelectedOption = {
        isIncludeNull: formValuesJobFunctionSelected?.selectedIds?.includes(null),
        selectOptions: keyBy(jobFunctionsSelected, "id"),
        excludeOptions: {},
      }
      const divisionOptions: ISelectedOption = {
        isIncludeNull: formValuesDivisionSelected?.selectedIds?.includes(null),
        selectOptions: keyBy(divisionsSelected, "id"),
        excludeOptions: {},
      }
      const subDivisionOptions: ISelectedOption = {
        isIncludeNull: formValuesSubDivisionSelected?.selectedIds?.includes(null),
        selectOptions: keyBy(subDivisionsSelected, "id"),
        excludeOptions: {},
      }
      const departmentOptions: ISelectedOption = {
        isIncludeNull: formValuesDepartmentSelected?.selectedIds?.includes(null),
        selectOptions: keyBy(departmentsSelected, "id"),
        excludeOptions: {},
      }
      const storeOptions: ISelectedOption = {
        selectOptions: keyBy(storesSelected, "id"),
        excludeOptions: {},
      }
      const jobLevelOptions: ISelectedOption = {
        selectOptions: keyBy(jobLevelsSelected, "id"),
        excludeOptions: {},
      }
      const employeeTypeOptions: ISelectedOption = {
        selectOptions: keyBy(employeeTypesSelected, "id"),
        excludeOptions: {},
      }
      const salaryAdminPlanOptions: ISelectedOption = {
        selectOptions: keyBy(salaryAdminPlansSelected, "id"),
        excludeOptions: {},
      }
      const jobCodeOptions: ISelectedOption = {
        selectOptions: keyBy(jobCodesSelected, "id"),
        excludeOptions: {},
      }
      const employeeClassificationOptions: ISelectedOption = {
        selectOptions: keyBy(employeeClassificationsSelected, "id"),
        excludeOptions: {},
      }

      form.batch(() => {
        form.change(EnumSelectHierarchyGroupField.COMPANY_OPTIONS, companyOptions)
        form.change(EnumSelectHierarchyGroupField.JOB_FUNCTION_OPTIONS, jobFunctionOptions)
        form.change(EnumSelectHierarchyGroupField.DIVISION_OPTIONS, divisionOptions)
        form.change(EnumSelectHierarchyGroupField.SUB_DIVISION_OPTIONS, subDivisionOptions)
        form.change(EnumSelectHierarchyGroupField.DEPARTMENT_OPTIONS, departmentOptions)
        form.change(EnumSelectHierarchyGroupField.STORE_OPTIONS, storeOptions)
        form.change(EnumSelectHierarchyGroupField.JOB_LEVEL_OPTIONS, jobLevelOptions)
        form.change(EnumSelectHierarchyGroupField.EMPLOYEE_TYPE_OPTIONS, employeeTypeOptions)
        form.change(EnumSelectHierarchyGroupField.SALARY_ADMIN_PLAN_OPTIONS, salaryAdminPlanOptions)
        form.change(EnumSelectHierarchyGroupField.JOB_CODE_OPTIONS, jobCodeOptions)
        form.change(
          EnumSelectHierarchyGroupField.EMPLOYEE_CLASSIFICATION_OPTIONS,
          employeeClassificationOptions,
        )
      })
    },
    [form, t],
  )

  const getAndSetInitialCompany = useCallback(
    (companies: ICompany[]) => {
      const companiesSelectedIds: string[] = []
      const jobFunctionsSelectedIds: string[] = []
      const divisionsSelectedIds: string[] = []
      const subDivisionsSelectedIds: string[] = []
      const departmentsSelectedIds: string[] = []
      const storesSelectedIds: string[] = []

      forEach(companies || [], (company) => {
        const {
          companyId,
          jobFunctionIds,
          divisionIds,
          subDivisionIds,
          departmentIds,
          storeIds,
        } = company
        companiesSelectedIds.push(companyId)
        jobFunctionsSelectedIds.push(...(jobFunctionIds || []))
        divisionsSelectedIds.push(...(divisionIds || []))
        subDivisionsSelectedIds.push(...(subDivisionIds || []))
        departmentsSelectedIds.push(...(departmentIds || []))
        storesSelectedIds.push(...(storeIds || []))
      })

      const companySelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: companiesSelectedIds,
        excludeIds: [],
      }
      const jobFunctionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: jobFunctionsSelectedIds,
        excludeIds: [],
      }
      const divisionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: divisionsSelectedIds,
        excludeIds: [],
      }
      const subDivisionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: subDivisionsSelectedIds,
        excludeIds: [],
      }
      const departmentSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: departmentsSelectedIds,
        excludeIds: [],
      }
      const storeSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: storesSelectedIds,
        excludeIds: [],
      }

      form.batch(() => {
        form.change("companySelected", companySelected)
        form.change("jobFunctionSelected", jobFunctionSelected)
        form.change("divisionSelected", divisionSelected)
        form.change("subDivisionSelected", subDivisionSelected)
        form.change("departmentSelected", departmentSelected)
        form.change("storeSelected", storeSelected)
      })
      return {
        companySelected: companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected: storeSelected,
      }
    },
    [form],
  )

  const fetchInitialValues = useCallback(
    (
      formValues:
        | Partial<IOneYearTemplateFormType>
        | Partial<IProbationTemplateFormType>
        | Partial<IKpiPeriodTemplateForm>,
    ) => {
      const tempFormValues = formValues || {}
      const { companies = [] } = tempFormValues || {}
      if (companies?.length) {
        const {
          companySelected,
          jobFunctionSelected,
          divisionSelected,
          subDivisionSelected,
          departmentSelected,
          storeSelected,
        } = getAndSetInitialCompany(companies || [])

        const customFormValues: Partial<IParentFromValues & ISelectEmployeeFormSubmitValues> = {
          ...formValues,
          reqOneYear:
            "reqOneYear" in tempFormValues ? tempFormValues?.reqOneYear === "true" : false,
          companySelected,
          jobFunctionSelected,
          divisionSelected,
          subDivisionSelected,
          departmentSelected,
          storeSelected,
        }
        if (!isFetching.current) {
          isFetching.current = true
          fetchOptionHierarchyNames(
            {
              companySelected,
              jobFunctionSelected,
              divisionSelected,
              subDivisionSelected,
              departmentSelected,
              storeSelected,
              jobLevelIds: formValues?.jobLevelIds || [],
              jobCodeIds: formValues?.jobCodeIds || [],
              salaryAdminPlanIds: formValues?.salaryAdminPlanIds || [],
              employeeClassificationIds: formValues?.employeeClassificationIds || [],
              positionLevelIds: formValues?.positionLevelIds || [],
            },
            {
              onSuccess: (response) => {
                fetchInitialOptionsData(customFormValues, response)
                setTimeout(() => {
                  isFetching.current = false
                }, 500)
              },
            },
          )
        }
      }
    },
    [fetchInitialOptionsData, fetchOptionHierarchyNames, getAndSetInitialCompany],
  )

  return {
    fetchInitialOptionsData,
    fetchInitialValues,
  }
}
