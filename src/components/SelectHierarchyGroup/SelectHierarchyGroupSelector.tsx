/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dayjs, { Dayjs } from "dayjs"
import { debounce, keyBy, map } from "lodash"
import { useCallback, useMemo, useEffect, useRef, useState } from "react"
import { useForm, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import {
  useGetCompanyOption,
  useGetJobFunctionOption,
  useGetDivisionOption,
  useGetDepartmentOption,
  useGetStoreOption,
  useGetJobCodeOption,
  useGetSubDivisionOption,
  useGetCountUsersFromHierarchy,
} from "../../services/group-employee/group-employee-query"
import {
  makeOption,
  useSelectEmployeeBaseOptions,
  useSelectEmployeeFormStateHelper,
} from "./helper"
import {
  ISelectEmployeeFormSubmitValuesKey,
  ISelectEmployeeFormValuesKey,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import SelectableList from "./SelectableList"
import { EnumTabMenuKey } from "./SelectHierarchyGroupSideMenu"
import {
  extractOptions,
  EnumSelectHierarchyGroupField,
  useSetNormalizeHierarchyOption,
} from "./helper"

type ISelectHierarchyGroupSelectorProps = {
  activeMenu: EnumTabMenuKey
  templateEndDate: Dayjs
  templateStartDate: Dayjs
  isReqOneYear?: boolean
  onApiFetching?: (isFetching: boolean) => void
}

const SelectHierarchyGroupSelector = (props: ISelectHierarchyGroupSelectorProps) => {
  const { templateStartDate, templateEndDate, isReqOneYear, activeMenu, onApiFetching } = props
  const { t } = useTranslation()

  const form = useForm<ISelectHierarchyGroupFormValues>()
  const formStateOnChange = useFormState<ISelectHierarchyGroupFormValues>()
  const { values: formValues } = formStateOnChange
  const formValuesRef = useRef<ISelectHierarchyGroupFormValues>()
  const [debounceFormValues, setDebounceFormValues] = useState<ISelectHierarchyGroupFormValues>()

  const setFormValuesToState = useMemo(
    () =>
      debounce(() => {
        const formValues = formValuesRef.current
        setDebounceFormValues(formValues)
      }, 300),
    [],
  )

  useEffect(() => {
    formValuesRef.current = formValues
    setFormValuesToState()
  }, [formValues, setFormValuesToState])

  const { getFilterOptionIds } = useSetNormalizeHierarchyOption()

  const companySelected = useMemo(() => {
    return extractOptions(debounceFormValues?.companyOptions)
  }, [debounceFormValues?.companyOptions])

  const jobFunctionSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.jobFunctionOptions)
  }, [debounceFormValues?.jobFunctionOptions])

  const divisionSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.divisionOptions)
  }, [debounceFormValues?.divisionOptions])

  const subDivisionSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.subDivisionOptions)
  }, [debounceFormValues?.subDivisionOptions])

  const departmentSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.departmentOptions)
  }, [debounceFormValues?.departmentOptions])

  const storeSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.storeOptions)
  }, [debounceFormValues?.storeOptions])

  const jobLevelSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.jobLevelOptions)
  }, [debounceFormValues?.jobLevelOptions])

  const jobCodeSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.jobCodeOptions)
  }, [debounceFormValues?.jobCodeOptions])

  const salaryAdminPlanSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.salaryAdminPlanOptions)
  }, [debounceFormValues?.salaryAdminPlanOptions])

  const employeeTypeSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.employeeTypeOptions)
  }, [debounceFormValues?.employeeTypeOptions])

  const employeeClassificationSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.employeeClassificationOptions)
  }, [debounceFormValues?.employeeClassificationOptions])

  const positionLevelSelected = useMemo(() => {
    return extractOptions(debounceFormValues?.positionLevelOptions)
  }, [debounceFormValues?.positionLevelOptions])

  const filterOptionIds = useMemo(() => {
    return getFilterOptionIds(formValues)
  }, [formValues, getFilterOptionIds])

  const companyStateHelper = useSelectEmployeeFormStateHelper({
    defaultLimit: 500,
  })
  const jobFunctionStateHelper = useSelectEmployeeFormStateHelper()
  const divisionStateHelper = useSelectEmployeeFormStateHelper()
  const subDivisionStateHelper = useSelectEmployeeFormStateHelper()
  const departmentStateHelper = useSelectEmployeeFormStateHelper()
  const storeStateHelper = useSelectEmployeeFormStateHelper()
  const jobCodeStateHelper = useSelectEmployeeFormStateHelper()

  const {
    // jobCodeOptions: totalJobCodeOptions,
    jobLevelOptions,
    employeeTypeOptions,
    salaryAdminPlanOptions,
    positionLevelOptions,
    employeeClassificationOptions,
    isBaseOptionsLoading,
  } = useSelectEmployeeBaseOptions()

  const {
    data: companyOptionRes,
    // isLoading: isCompanyOptionResLoading,
    isFetching: isCompanyOptionResFetching,
  } = useGetCompanyOption({
    q: companyStateHelper.q,
    page: companyStateHelper.page,
    limit: companyStateHelper.limit,
    companySelected,
  })

  const {
    data: jobFunctionOptionRes,
    // isLoading: isJobFunctionOptionResLoading,
    isFetching: isJobFunctionOptionResFetching,
  } = useGetJobFunctionOption({
    q: jobFunctionStateHelper.q,
    page: jobFunctionStateHelper.page,
    limit: jobFunctionStateHelper.limit,
    companySelected,
    jobFunctionSelected,
  })

  const {
    data: divisionOptionRes,
    // isLoading: isDivisionOptionResLoading,
    isFetching: isDivisionOptionResFetching,
  } = useGetDivisionOption({
    q: divisionStateHelper.q,
    page: divisionStateHelper.page,
    limit: divisionStateHelper.limit,
    companySelected,
    jobFunctionSelected,
    divisionSelected,
  })

  const {
    data: subDivisionOptionRes,
    // isLoading: isSubDivisionOptionResLoading,
    isFetching: isSubDivisionOptionResFetching,
  } = useGetSubDivisionOption({
    q: subDivisionStateHelper.q,
    page: subDivisionStateHelper.page,
    limit: subDivisionStateHelper.limit,
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
  })

  const {
    data: departmentOptionRes,
    // isLoading: isDepartmentOptionResLoading,
    isFetching: isDepartmentOptionResFetching,
  } = useGetDepartmentOption({
    q: departmentStateHelper.q,
    page: departmentStateHelper.page,
    limit: departmentStateHelper.limit,
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
  })

  const {
    data: storeOptionRes,
    // isLoading: isStoreOptionResLoading,
    isFetching: isStoreOptionResFetching,
  } = useGetStoreOption({
    q: storeStateHelper.q,
    page: storeStateHelper.page,
    limit: storeStateHelper.limit,
    companies: [],
    endDate: dayjs(templateEndDate).tz().startOf("day").format(),
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
    ...filterOptionIds,
  })

  const {
    data: jobCodeOptionRes,
    // isLoading: isJobCodeOptionResLoading,
    isFetching: isJobCodeOptionResFetching,
  } = useGetJobCodeOption({
    q: jobCodeStateHelper.q,
    page: jobCodeStateHelper.page,
    limit: jobCodeStateHelper.limit,
  })

  const {
    data: countUser,
    isLoading: isCountUserLoading,
    isFetching: isCountUserFetching,
  } = useGetCountUsersFromHierarchy({
    startDate: dayjs(templateStartDate).tz().startOf("day").format(),
    endDate: dayjs(templateEndDate).tz().startOf("day").format(),
    reqOneYear: isReqOneYear,
    companySelected,
    jobFunctionSelected,
    divisionSelected,
    subDivisionSelected,
    departmentSelected,
    storeSelected,
    ...filterOptionIds,
  })

  const companyOptions = useMemo(() => {
    const optionAfterSelected = map(companyOptionRes?.companies || [], makeOption(t("รหัสบริษัท")))
    return optionAfterSelected
  }, [companyOptionRes?.companies, t])

  const jobFunctionOptions = useMemo(() => {
    return map(jobFunctionOptionRes?.jobFunctions || [], makeOption(t("รหัสสายงาน")))
  }, [jobFunctionOptionRes?.jobFunctions, t])

  const divisionOptions = useMemo(() => {
    return map(divisionOptionRes?.divisions || [], makeOption(t("รหัสสำนักงาน")))
  }, [divisionOptionRes?.divisions, t])

  const subDivisionOptions = useMemo(() => {
    return map(subDivisionOptionRes?.subDivisions || [], makeOption(t("รหัสระดับด้าน")))
  }, [subDivisionOptionRes?.subDivisions, t])

  const departmentOptions = useMemo(() => {
    return map(departmentOptionRes?.departments || [], makeOption(t("รหัสฝ่ายงาน")))
  }, [departmentOptionRes?.departments, t])

  const storeOptions = useMemo(() => {
    return map(storeOptionRes?.stores || [], makeOption(t("รหัสหน่วยงาน")))
  }, [storeOptionRes?.stores, t])

  const jobCodeOptions = useMemo(() => {
    return map(jobCodeOptionRes?.jobCodes || [], makeOption(t("JOB Code")))
  }, [jobCodeOptionRes?.jobCodes, t])

  useEffect(() => {
    const isApiFetching =
      isBaseOptionsLoading ||
      isCompanyOptionResFetching ||
      isJobFunctionOptionResFetching ||
      isDivisionOptionResFetching ||
      isSubDivisionOptionResFetching ||
      isDepartmentOptionResFetching ||
      isStoreOptionResFetching ||
      isJobCodeOptionResFetching ||
      isCountUserLoading
    onApiFetching?.(isApiFetching)
  }, [
    isBaseOptionsLoading,
    isCompanyOptionResFetching,
    isCountUserLoading,
    isDepartmentOptionResFetching,
    isDivisionOptionResFetching,
    isJobCodeOptionResFetching,
    isJobFunctionOptionResFetching,
    isStoreOptionResFetching,
    isSubDivisionOptionResFetching,
    onApiFetching,
  ])

  const handleCheckAllCompany = useCallback(
    (isCheckedAll: boolean) => {
      if (isCheckedAll) {
        form.change(EnumSelectHierarchyGroupField.COMPANY_OPTIONS, {
          isCheckedAll,
          selectOptions: keyBy(companyOptions, (e) => e.id),
          excludeOptions: {},
        })
      } else {
        form.change(EnumSelectHierarchyGroupField.COMPANY_OPTIONS, {
          isCheckedAll,
          selectOptions: {},
          excludeOptions: {},
        })
      }
    },
    [companyOptions, form],
  )

  const getClearRelateOptionsCallback = useCallback(
    (curFieldName: ISelectEmployeeFormValuesKey) => {
      const relateFieldNames: ISelectEmployeeFormValuesKey[] = [
        "companyOptions",
        "jobFunctionOptions",
        "divisionOptions",
        "subDivisionOptions",
        "departmentOptions",
        "storeOptions",
      ]

      const relateFieldSelectedNames: ISelectEmployeeFormSubmitValuesKey[] = [
        "companySelected",
        "jobFunctionSelected",
        "divisionSelected",
        "subDivisionSelected",
        "departmentSelected",
        "storeSelected",
      ]

      return () => {
        const curFieldIndex = relateFieldNames.indexOf(curFieldName)
        if (curFieldIndex > -1) {
          form.batch(() => {
            for (let i = curFieldIndex + 1; i < relateFieldNames.length; i++) {
              const removeFieldName = relateFieldNames[i]
              const removeFieldSelectedNames = relateFieldSelectedNames[i]

              form.change(`${removeFieldName}.isIncludeNull` as any, false)
              form.change(`${removeFieldName}.isCheckedAll` as any, false)
              form.change(`${removeFieldName}.selectOptions` as any, {})
              form.change(`${removeFieldName}.excludeOptions` as any, {})

              form.change(`${removeFieldSelectedNames}.isIncludeNull` as any, false)
              form.change(`${removeFieldSelectedNames}.isCheckedAll` as any, false)
              form.change(`${removeFieldSelectedNames}.selectedIds` as any, [])
              form.change(`${removeFieldSelectedNames}.excludeIds` as any, [])
            }
          })
        }
      }
    },
    [form],
  )

  useEffect(() => {
    form.change(
      `${EnumSelectHierarchyGroupField.COMPANY_OPTIONS}.countTotalOptions` as any,
      companyOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.JOB_FUNCTION_OPTIONS}.countTotalOptions` as any,
      jobFunctionOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.DIVISION_OPTIONS}.countTotalOptions` as any,
      divisionOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.SUB_DIVISION_OPTIONS}.countTotalOptions` as any,
      subDivisionOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.DEPARTMENT_OPTIONS}.countTotalOptions` as any,
      departmentOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.STORE_OPTIONS}.countTotalOptions` as any,
      storeOptionRes?.paging?.totalRecords || 0,
    )

    form.change(
      `${EnumSelectHierarchyGroupField.JOB_CODE_OPTIONS}.countTotalOptions` as any,
      jobCodeOptionRes?.paging?.totalRecords || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.JOB_LEVEL_OPTIONS}.countTotalOptions` as any,
      jobLevelOptions?.length || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.SALARY_ADMIN_PLAN_OPTIONS}.countTotalOptions` as any,
      salaryAdminPlanOptions?.length || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.EMPLOYEE_TYPE_OPTIONS}.countTotalOptions` as any,
      employeeTypeOptions?.length || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.EMPLOYEE_CLASSIFICATION_OPTIONS}.countTotalOptions` as any,
      employeeClassificationOptions?.length || 0,
    )
    form.change(
      `${EnumSelectHierarchyGroupField.POSITION_LEVEL_OPTIONS}.countTotalOptions` as any,
      positionLevelOptions?.length || 0,
    )
  }, [
    companyOptionRes?.paging?.totalRecords,
    companySelected,
    departmentOptionRes?.paging?.totalRecords,
    departmentSelected,
    divisionOptionRes?.paging?.totalRecords,
    divisionSelected,
    employeeClassificationOptions?.length,
    employeeClassificationSelected?.excludeIds?.length,
    employeeClassificationSelected?.selectedIds?.length,
    employeeTypeOptions?.length,
    employeeTypeSelected?.excludeIds?.length,
    employeeTypeSelected?.selectedIds?.length,
    form,
    jobCodeOptionRes?.paging?.totalRecords,
    jobCodeSelected?.selectedIds?.length,
    jobFunctionOptionRes?.paging?.totalRecords,
    jobFunctionSelected,
    jobLevelOptions?.length,
    jobLevelSelected?.excludeIds?.length,
    jobLevelSelected?.selectedIds?.length,
    positionLevelOptions?.length,
    positionLevelSelected?.excludeIds?.length,
    positionLevelSelected?.selectedIds?.length,
    salaryAdminPlanOptions?.length,
    salaryAdminPlanSelected?.excludeIds?.length,
    salaryAdminPlanSelected?.selectedIds?.length,
    storeOptionRes?.paging?.totalRecords,
    storeSelected,
    subDivisionOptionRes?.paging?.totalRecords,
    subDivisionSelected,
  ])

  useEffect(() => {
    form.change("countUser", countUser || 0)
  }, [countUser, form])

  useEffect(() => {
    form.change("isCountUserFetching", isCountUserFetching)
  }, [countUser, form, isCountUserFetching])

  return (
    <>
      {activeMenu === EnumTabMenuKey.COMPANY && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.COMPANY_OPTIONS}
          clearRelateOptions={getClearRelateOptionsCallback(
            EnumSelectHierarchyGroupField.COMPANY_OPTIONS,
          )}
          searchPlaceholder={t(`ค้นหาชื่อบริษัท หรือ รหัสบริษัท`)}
          // isFetching={isApiFetching}
          options={companyOptions}
          paging={companyOptionRes?.paging}
          onPageChange={companyStateHelper.onPageChange}
          onRowsPerPageChange={companyStateHelper.onRowsPerPageChange}
          limit={companyStateHelper.limit}
          onSearch={companyStateHelper.onSearch}
          onCheckedAllChange={handleCheckAllCompany}
          hidePaginate
        />
      )}
      {activeMenu === EnumTabMenuKey.JOB_FUNCTION && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.JOB_FUNCTION_OPTIONS}
          clearRelateOptions={getClearRelateOptionsCallback(
            EnumSelectHierarchyGroupField.JOB_FUNCTION_OPTIONS,
          )}
          searchPlaceholder={t(`ค้นหาชื่อสายงาน หรือ รหัสสายงาน`)}
          isFetching={isCompanyOptionResFetching || isJobFunctionOptionResFetching}
          options={jobFunctionOptions}
          paging={jobFunctionOptionRes?.paging}
          onPageChange={jobFunctionStateHelper.onPageChange}
          onRowsPerPageChange={jobFunctionStateHelper.onRowsPerPageChange}
          limit={jobFunctionStateHelper.limit}
          onSearch={jobFunctionStateHelper.onSearch}
          isShowNullValue
        />
      )}
      {activeMenu === EnumTabMenuKey.DIVISION && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.DIVISION_OPTIONS}
          clearRelateOptions={getClearRelateOptionsCallback(
            EnumSelectHierarchyGroupField.DIVISION_OPTIONS,
          )}
          searchPlaceholder={t(`ค้นหาชื่อสำนักงาน หรือ รหัสสำนักงาน`)}
          isFetching={
            isCompanyOptionResFetching ||
            isJobFunctionOptionResFetching ||
            isDivisionOptionResFetching
          }
          options={divisionOptions}
          paging={divisionOptionRes?.paging}
          onPageChange={divisionStateHelper.onPageChange}
          onRowsPerPageChange={divisionStateHelper.onRowsPerPageChange}
          limit={divisionStateHelper.limit}
          onSearch={divisionStateHelper.onSearch}
          isShowNullValue
        />
      )}
      {activeMenu === EnumTabMenuKey.SUB_DIVISION && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.SUB_DIVISION_OPTIONS}
          clearRelateOptions={getClearRelateOptionsCallback(
            EnumSelectHierarchyGroupField.SUB_DIVISION_OPTIONS,
          )}
          searchPlaceholder={t(`ค้นหาชื่อด้าน หรือ รหัสระดับด้าน`)}
          isFetching={
            isCompanyOptionResFetching ||
            isJobFunctionOptionResFetching ||
            isDivisionOptionResFetching ||
            isSubDivisionOptionResFetching
          }
          options={subDivisionOptions}
          paging={subDivisionOptionRes?.paging}
          onPageChange={subDivisionStateHelper.onPageChange}
          onRowsPerPageChange={subDivisionStateHelper.onRowsPerPageChange}
          limit={subDivisionStateHelper.limit}
          onSearch={subDivisionStateHelper.onSearch}
          isShowNullValue
        />
      )}
      {activeMenu === EnumTabMenuKey.DEPARTMENT && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.DEPARTMENT_OPTIONS}
          clearRelateOptions={getClearRelateOptionsCallback(
            EnumSelectHierarchyGroupField.DEPARTMENT_OPTIONS,
          )}
          searchPlaceholder={t(`ค้นหาชื่อฝ่ายงาน หรือ รหัสฝ่ายงาน`)}
          isFetching={
            isCompanyOptionResFetching ||
            isJobFunctionOptionResFetching ||
            isDivisionOptionResFetching ||
            isSubDivisionOptionResFetching ||
            isDepartmentOptionResFetching
          }
          options={departmentOptions}
          paging={departmentOptionRes?.paging}
          onPageChange={departmentStateHelper.onPageChange}
          onRowsPerPageChange={departmentStateHelper.onRowsPerPageChange}
          limit={departmentStateHelper.limit}
          onSearch={departmentStateHelper.onSearch}
          isShowNullValue
        />
      )}
      {activeMenu === EnumTabMenuKey.STORE && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.STORE_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อหน่วยงาน หรือ รหัสหน่วยงาน`)}
          isFetching={
            isCompanyOptionResFetching ||
            isJobFunctionOptionResFetching ||
            isDivisionOptionResFetching ||
            isSubDivisionOptionResFetching ||
            isDepartmentOptionResFetching ||
            isStoreOptionResFetching
          }
          options={storeOptions}
          paging={storeOptionRes?.paging}
          onPageChange={storeStateHelper.onPageChange}
          onRowsPerPageChange={storeStateHelper.onRowsPerPageChange}
          limit={storeStateHelper.limit}
          onSearch={storeStateHelper.onSearch}
        />
      )}

      {/* --------------------- filter option below --------------------- */}
      {activeMenu === EnumTabMenuKey.JOB_LEVEL && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.JOB_LEVEL_OPTIONS}
          searchPlaceholder={t(`ค้นหารหัส PC Grade`)}
          options={jobLevelOptions}
          hidePaginate
          isLocalSearch
        />
      )}

      {activeMenu === EnumTabMenuKey.JOB_CODE && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.JOB_CODE_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อหรือรหัส Job Code`)}
          isFetching={isJobCodeOptionResFetching}
          options={jobCodeOptions}
          paging={jobCodeOptionRes?.paging}
          onPageChange={jobCodeStateHelper.onPageChange}
          onRowsPerPageChange={jobCodeStateHelper.onRowsPerPageChange}
          limit={jobCodeStateHelper.limit}
          onSearch={jobCodeStateHelper.onSearch}
        />
      )}

      {activeMenu === EnumTabMenuKey.SALARY_PLAN && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.SALARY_ADMIN_PLAN_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อหรือรหัส Salary Plan`)}
          options={salaryAdminPlanOptions}
          hidePaginate
          isLocalSearch
        />
      )}

      {activeMenu === EnumTabMenuKey.EMPLOYEE_TYPE && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.EMPLOYEE_TYPE_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อประเภทพนักงาน`)}
          options={employeeTypeOptions}
          hidePaginate
          isLocalSearch
        />
      )}
      {activeMenu === EnumTabMenuKey.EMPLOYEE_CLASS && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.EMPLOYEE_CLASSIFICATION_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อหรือรหัส EMP Class`)}
          options={employeeClassificationOptions}
          hidePaginate
          isLocalSearch
        />
      )}

      {activeMenu === EnumTabMenuKey.SUPERVISOR_LEVEL && (
        <SelectableList
          fieldName={EnumSelectHierarchyGroupField.POSITION_LEVEL_OPTIONS}
          searchPlaceholder={t(`ค้นหาชื่อหรือรหัส Supervisor Level`)}
          options={positionLevelOptions}
          hidePaginate
          isLocalSearch
        />
      )}
    </>
  )
}

export default SelectHierarchyGroupSelector
