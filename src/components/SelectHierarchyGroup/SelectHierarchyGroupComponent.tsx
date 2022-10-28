/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FormApi } from "final-form"
import { forEach, keyBy, map } from "lodash"
import { useGetOptionHierarchyNames } from "../../services/kpi-template/kpi-template-query"
import { IBaseStructureOption } from "../../services/group-employee/group-employee-type"
import styled from "@emotion/styled"
import { GRAYSCALE_DARKGRAY_40 } from "../../constants/colors"
import SelectHierarchyGroupSideMenu, {
  EnumTabMenuKey,
  ISelectHierarchyGroupSideMenuItem,
} from "./SelectHierarchyGroupSideMenu"
import SelectHierarchyGroupSelector from "./SelectHierarchyGroupSelector"
import dayjs from "dayjs"
import SelectHierarchyGroupResult from "./SelectHierarchyGroupResult"
import {
  IParentFromValues,
  ISelectedOption,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import { useForm, useFormState } from "react-final-form"
import { makeOption, EnumSelectHierarchyGroupField } from "./helper"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  height: 681px;
  overflow: hidden;
  box-sizing: border-box;
`

const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${GRAYSCALE_DARKGRAY_40};
  width: 14%;
  min-width: fit-content;
  overflow-y: auto;
`

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 43%;
  padding: 16px;
  gap: 8px;
  overflow-y: auto;
  border-right: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 100%;
  max-width: 43%;
  padding: 16px;
  gap: 8px;
  overflow-y: auto;
  border-right: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

export type ISelectHierarchyGroupCustomRef = {
  form?: FormApi<ISelectHierarchyGroupFormValues>
  submit: () => Promise<void>
}

type ISelectHierarchyGroupComponentProps = {
  hideCountUsers?: boolean
}
const SelectHierarchyGroupComponent = (props: ISelectHierarchyGroupComponentProps) => {
  const { hideCountUsers = false } = props

  const { t } = useTranslation()
  const [activeMenu, setActiveMenu] = useState<EnumTabMenuKey>(EnumTabMenuKey.COMPANY)
  const [isApiFetching, setIsApiFetching] = useState<boolean>(false)

  const [isOptionsInitialed, setIsOptionsInitialed] = useState<boolean>(false)

  const form = useForm<ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues>()
  const { values: formValues } = useFormState<
    IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues
  >()

  const { startDate: templateStartDate, endDate: templateEndDate, reqOneYear: isReqOneYear } =
    formValues || {}

  const {
    data: optionHierarchyNames,
    isFetching: isOptionHierarchyNamesLoading,
  } = useGetOptionHierarchyNames({
    companySelected: formValues?.companySelected,
    jobFunctionSelected: formValues?.jobFunctionSelected,
    divisionSelected: formValues?.divisionSelected,
    subDivisionSelected: formValues?.subDivisionSelected,
    departmentSelected: formValues?.departmentSelected,
    storeSelected: formValues?.storeSelected,
    jobLevelIds: formValues?.jobLevelIds || [],
    jobCodeIds: formValues?.jobCodeIds || [],
    salaryAdminPlanIds: formValues?.salaryAdminPlanIds || [],
    employeeClassificationIds: formValues?.employeeClassificationIds || [],
    positionLevelIds: formValues?.positionLevelIds || [],
  })

  const menuItems: ISelectHierarchyGroupSideMenuItem = useMemo(() => {
    return {
      organizationMenus: [
        {
          label: t("บริษัท"),
          key: EnumTabMenuKey.COMPANY,
          totalItem: 0,
        },
        {
          label: t("สายงาน"),
          key: EnumTabMenuKey.JOB_FUNCTION,
          totalItem: 0,
        },
        {
          label: t("สำนักงาน"),
          key: EnumTabMenuKey.DIVISION,
          totalItem: 0,
        },
        {
          label: t("ระดับด้าน"),
          key: EnumTabMenuKey.SUB_DIVISION,
          totalItem: 0,
        },
        {
          label: t("ฝ่ายงาน"),
          key: EnumTabMenuKey.DEPARTMENT,
          totalItem: 0,
        },
        {
          label: t("หน่วยงาน"),
          key: EnumTabMenuKey.STORE,
          totalItem: 0,
        },
      ],
      filterMenus: [
        {
          label: t("PC grade"),
          key: EnumTabMenuKey.JOB_LEVEL,
          totalItem: 0,
        },
        {
          label: t("Job code"),
          key: EnumTabMenuKey.JOB_CODE,
          totalItem: 0,
        },
        {
          label: t("Salary Plan"),
          key: EnumTabMenuKey.SALARY_PLAN,
          totalItem: 0,
        },
        {
          label: t("ประเภทพนักงาน"),
          key: EnumTabMenuKey.EMPLOYEE_TYPE,
          totalItem: 0,
        },
        {
          label: t("Emp Class"),
          key: EnumTabMenuKey.EMPLOYEE_CLASS,
          totalItem: 0,
        },
        {
          label: t("Supervisor Level"),
          key: EnumTabMenuKey.SUPERVISOR_LEVEL,
          totalItem: 0,
        },
      ],
    }
  }, [t])

  const fetchInitialOptionsData = useCallback(() => {
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
    setIsOptionsInitialed(true)
  }, [
    form,
    formValues?.departmentSelected,
    formValues?.divisionSelected,
    formValues?.employeeTypes,
    formValues?.jobFunctionSelected,
    formValues?.subDivisionSelected,
    optionHierarchyNames?.companies,
    optionHierarchyNames?.employeeClassifications,
    optionHierarchyNames?.jobCodes,
    optionHierarchyNames?.jobLevels,
    optionHierarchyNames?.positionLevels,
    optionHierarchyNames?.salaryAdminPlans,
    t,
  ])

  const onApiFetching = useCallback((isFetching: boolean) => {
    setIsApiFetching(isFetching)
  }, [])

  useEffect(() => {
    const isDebug: boolean = true
    if (!isDebug && !isOptionsInitialed && !isOptionHierarchyNamesLoading) {
      fetchInitialOptionsData()
    }
  }, [fetchInitialOptionsData, isOptionsInitialed, isOptionHierarchyNamesLoading])

  const onChangeMenu = useCallback((key: EnumTabMenuKey) => {
    setActiveMenu(key)
  }, [])

  useEffect(() => {
    // console.debug({ formValues })
  }, [formValues])

  return (
    <Container>
      <SideMenuContainer>
        <SelectHierarchyGroupSideMenu
          activeMenu={activeMenu}
          onChangeMenu={onChangeMenu}
          items={menuItems}
          isDisabled={isApiFetching}
        />
      </SideMenuContainer>
      <CenterContainer>
        <SelectHierarchyGroupSelector
          activeMenu={activeMenu}
          templateStartDate={dayjs(templateStartDate)}
          templateEndDate={dayjs(templateEndDate)}
          isReqOneYear={isReqOneYear}
          onApiFetching={onApiFetching}
        />
      </CenterContainer>
      <ResultContainer>
        <SelectHierarchyGroupResult isHideCountUsers={hideCountUsers} />
      </ResultContainer>
    </Container>
  )
}

export default SelectHierarchyGroupComponent
