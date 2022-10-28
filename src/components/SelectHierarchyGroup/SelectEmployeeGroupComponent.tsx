/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { css } from "@emotion/css"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { chunk, compact, forEach, keyBy, map, uniq } from "lodash"
import { useGetOptionHierarchyNames } from "../../services/kpi-template/kpi-template-query"
import {
  IBaseStructureOption,
  IGetHierarchyOption,
} from "../../services/group-employee/group-employee-type"
import styled from "@emotion/styled"
import { GRAYSCALE_DARKGRAY_40, GRAY_D9D9D9 } from "../../constants/colors"
import SelectHierarchyGroupSideMenu, {
  EnumTabMenuKey,
  ISelectHierarchyGroupSideMenuItem,
} from "./SelectHierarchyGroupSideMenu"
import SelectHierarchyGroupSelector from "./SelectHierarchyGroupSelector"
import dayjs from "dayjs"
import {
  IParentFromValues,
  ISelectedOption,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import { FormSpy, useForm, useFormState } from "react-final-form"
import {
  EnumSelectHierarchyGroupField,
  pickSelectHierarchyFieldsOnly,
  useSetNormalizeHierarchyOption,
  makeOption,
} from "./helper"
import { styled as muiStyled, Theme, CSSObject } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SelectableEmployeeList, { ISelectableEmployeeListProps } from "./SelectableEmployeeList"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import Button from "../common/Button"
import SelectEmployeeGroupResult from "./SelectEmployeeGroupResult"
import { useFetchUsersByHierarchyOnlySelected } from "../../services/user/user-query"
import { IGetUsersByHierarchyOnlySelectedParams } from "../../services/user/user-type"
import { checkHierarchyParamsNotEmpty } from "../../services/group-employee/group-employee-query"

const drawerWidth = 240

const inModalStyle = css`
  height: inherit;

  .result {
    min-width: unset;
  }
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  height: 681px;
  overflow: hidden;
  box-sizing: border-box;

  > main {
    height: 100%;
    flex: 1;
    > * {
      height: inherit;
    }
  }
`

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 100%;
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

const MenuZone = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${GRAYSCALE_DARKGRAY_40};
  min-width: ${drawerWidth}px;
  position: relative;
  overflow-y: auto;
`

const ConfirmButtonLayout = styled(Box)`
  position: static;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: ${GRAY_D9D9D9};
  padding: 20px;
  justify-content: flex-end;
  display: flex;
  grid-column-gap: 10px;
  > button {
    height: 31px;
    width: 121px;
    min-height: unset !important;
  }
`

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  position: "absolute",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "absolute",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

export const DrawerHeader = muiStyled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}))

const Drawer = muiStyled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  position: "relative",
}))

type ISelectEmployeeGroupComponentProps = Omit<ISelectableEmployeeListProps, "activeMenu"> & {
  isInModal?: boolean
}

const SelectEmployeeGroupComponent = (props: ISelectEmployeeGroupComponentProps) => {
  const {
    isRequireKpiTransaction,
    scopeUserIds,
    selectedLimit,
    isNotRequireSelectCompany,
    isInModal,
    isDisabledByKpiStatus,
  } = props

  const { t } = useTranslation()
  const [isUserInitialed, setIsUserInitialed] = useState(false)
  const [isCompanyInitialed, setIsCompanyInitialed] = useState(false)
  const [isOptionsInitialed, setIsOptionsInitialed] = useState(false)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [activeMenu, setActiveMenu] = useState<EnumTabMenuKey>()
  const [isApiFetching, setIsApiFetching] = useState<boolean>(false)

  const [prevFormValues, setPrevFormValues] = useState<ISelectHierarchyGroupFormValues>({})
  const form = useForm<ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues>()
  const { values: formValues } = useFormState<
    IParentFromValues & ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues
  >()
  const {
    setFilterOptionsToForm,
    setHierarchyOptionsToForm,
    getFinalFilterOptionIds,
    getHierarchyOptionsSelected,
  } = useSetNormalizeHierarchyOption()

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

  const { mutateAsync: fetchUsersByHierarchyOnlySelected } = useFetchUsersByHierarchyOnlySelected()

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

  const fetchInitialOptionsData = useCallback(async () => {
    const employeeTypes = formValues?.employeeTypes || []
    // console.debug("fetchInitialOptionsData")

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
    const positionLevelOptions: ISelectedOption = {
      selectOptions: keyBy(positionLevelsSelected, "id"),
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
      form.change(EnumSelectHierarchyGroupField.POSITION_LEVEL_OPTIONS, positionLevelOptions)
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

  useEffect(() => {
    if (!isOptionsInitialed && !isOptionHierarchyNamesLoading) {
      fetchInitialOptionsData()
    }
  }, [fetchInitialOptionsData, isOptionsInitialed, isOptionHierarchyNamesLoading])

  useEffect(() => {
    const { companies, companySelected } = formValues || {}
    // console.debug({ isCompanyInitialedFormValues: formValues, companySelected, isCompanyInitialed })
    if (
      !isCompanyInitialed &&
      !companySelected?.selectedIds?.length &&
      !companySelected?.excludeIds?.length
    ) {
      const companySelectedIds: string[] = []
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
        companySelectedIds.push(companyId)
        jobFunctionsSelectedIds.push(...(jobFunctionIds || []))
        divisionsSelectedIds.push(...(divisionIds || []))
        subDivisionsSelectedIds.push(...(subDivisionIds || []))
        departmentsSelectedIds.push(...(departmentIds || []))
        storesSelectedIds.push(...(storeIds || []))
      })

      const companySelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(companySelectedIds),
        excludeIds: [],
      }
      const jobFunctionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(jobFunctionsSelectedIds),
        excludeIds: [],
      }
      const divisionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(divisionsSelectedIds),
        excludeIds: [],
      }
      const subDivisionSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(subDivisionsSelectedIds),
        excludeIds: [],
      }
      const departmentSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(departmentsSelectedIds),
        excludeIds: [],
      }
      const storeSelected: IGetHierarchyOption = {
        isCheckedAll: false,
        selectedIds: uniq(storesSelectedIds),
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
      setIsCompanyInitialed(true)
    }
  }, [
    fetchInitialOptionsData,
    form,
    formValues,
    formValues.employeeTypes,
    isCompanyInitialed,
    optionHierarchyNames,
    t,
  ])

  const fetchInitialUserData = useCallback(async () => {
    const {
      companyOptions,
      jobFunctionOptions,
      divisionOptions,
      subDivisionOptions,
      departmentOptions,
      storeOptions,
      jobLevelOptions,
      employeeTypeOptions,
      salaryAdminPlanOptions,
      jobCodeOptions,
      employeeClassificationOptions,
    } = formValues || {}

    const filterOptionIds = getFinalFilterOptionIds({
      companyOptions,
      jobFunctionOptions,
      divisionOptions,
      subDivisionOptions,
      departmentOptions,
      storeOptions,
      jobLevelOptions,
      employeeTypeOptions,
      salaryAdminPlanOptions,
      jobCodeOptions,
      employeeClassificationOptions,
    })
    const {
      companySelected,
      jobFunctionSelected,
      divisionSelected,
      subDivisionSelected,
      departmentSelected,
      storeSelected,
    } = getHierarchyOptionsSelected({
      companyOptions,
      jobFunctionOptions,
      divisionOptions,
      subDivisionOptions,
      departmentOptions,
      storeOptions,
      jobLevelOptions,
      employeeTypeOptions,
      salaryAdminPlanOptions,
      jobCodeOptions,
      employeeClassificationOptions,
    })

    // console.debug({
    //   companyOptions,
    //   jobFunctionOptions,
    //   divisionOptions,
    //   subDivisionOptions,
    //   departmentOptions,
    //   storeOptions,
    //   jobLevelOptions,
    //   employeeTypeOptions,
    //   salaryAdminPlanOptions,
    //   jobCodeOptions,
    //   employeeClassificationOptions,
    //   filterOptionIds,
    //   companySelected,
    //   jobFunctionSelected,
    //   divisionSelected,
    //   subDivisionSelected,
    //   departmentSelected,
    //   storeSelected,
    // })
    const canFetchUserData: boolean = checkHierarchyParamsNotEmpty(companySelected)
    // console.debug({ canFetchUserData })
    if (canFetchUserData) {
      const batchInitialSelectedUserIdsSize = 20
      const batchInitialSelectedUserIds = chunk(
        formValues?.userSelected?.selectedIds || [],
        batchInitialSelectedUserIdsSize,
      )
      for (const batchIndexString in batchInitialSelectedUserIds) {
        const batchIndex = Number(batchIndexString)
        const initialSelectedUserIds = batchInitialSelectedUserIds[batchIndex]
        const fetchUsersByHierarchyOnlySelectedParams: IGetUsersByHierarchyOnlySelectedParams = {
          ...filterOptionIds,
          companySelected,
          jobFunctionSelected,
          divisionSelected,
          subDivisionSelected,
          departmentSelected,
          storeSelected,
          userSelected: {
            isCheckedAll: false,
            selectedIds: initialSelectedUserIds,
            excludeIds: [],
          },
          companies: [],
          startDate: dayjs(templateStartDate).tz().startOf("day").format(),
          endDate: dayjs(templateEndDate).tz().startOf("day").format(),
          page: batchIndex + 1,
          limit: batchInitialSelectedUserIdsSize,
          isRequireKpiTransaction,
          scopeUserIds,
        }
        const { data: users } = await fetchUsersByHierarchyOnlySelected(
          fetchUsersByHierarchyOnlySelectedParams,
        )

        const resultFetchInitialUsers = users.map(
          (user): IBaseStructureOption => {
            const { id: userId, prefix, firstName, lastName, employeeId, ...restUser } = user
            return {
              id: userId,
              name: compact([
                compact([prefix, firstName]).join(""),
                lastName,
                `(EID: ${employeeId})`,
              ]).join(" "),
              firstName: firstName,
              lastName: lastName,
              prefix: prefix,
              employeeId: employeeId,
              ...restUser,
            }
          },
        )

        const userOptions: ISelectedOption = {
          selectOptions: keyBy(resultFetchInitialUsers, "id"),
          excludeOptions: {},
        }
        form.batch(() => {
          form.change(EnumSelectHierarchyGroupField.USER_OPTIONS, userOptions)
        })
      }

      setIsUserInitialed(true)
    }
  }, [
    fetchUsersByHierarchyOnlySelected,
    form,
    formValues,
    getFinalFilterOptionIds,
    getHierarchyOptionsSelected,
    isRequireKpiTransaction,
    scopeUserIds,
    templateEndDate,
    templateStartDate,
  ])

  useEffect(() => {
    // console.debug({ isOptionsInitialed, isUserInitialed })
    if (!isUserInitialed && isOptionsInitialed) {
      fetchInitialUserData()
    }
  }, [fetchInitialUserData, isOptionsInitialed, isUserInitialed])

  const onCancelFilterClick = useCallback(() => {
    const onlyFilterFields = pickSelectHierarchyFieldsOnly(prevFormValues)
    form.batch(() => {
      Object.entries(onlyFilterFields).forEach(([key, value]) => {
        if (value) {
          form.change(key as any, value)
        }
      })
      setFilterOptionsToForm(form, formValues)
      setHierarchyOptionsToForm(form, formValues)
    })

    setIsDrawerVisible(false)
  }, [form, formValues, prevFormValues, setFilterOptionsToForm, setHierarchyOptionsToForm])

  const onConfirmFilterClick = useCallback(() => {
    setFilterOptionsToForm(form, formValues)
    setHierarchyOptionsToForm(form, formValues)

    setIsDrawerVisible(false)
  }, [form, formValues, setFilterOptionsToForm, setHierarchyOptionsToForm])

  const onChangeMenu = useCallback((key: EnumTabMenuKey) => {
    setActiveMenu(key)
  }, [])

  const onToggleDrawerClick = useCallback(() => {
    setIsDrawerVisible((prev) => {
      const newDrawerVisible = !prev
      // console.debug({ onToggleDrawerClick: formValues })
      if (newDrawerVisible) {
        setPrevFormValues(pickSelectHierarchyFieldsOnly(formValues))
      } else {
        onCancelFilterClick()
      }
      return newDrawerVisible
    })
  }, [formValues, onCancelFilterClick])

  useEffect(() => {
    if (!isDrawerVisible) {
      setActiveMenu(undefined)
    }
  }, [isDrawerVisible])

  useEffect(() => {
    if (!activeMenu) {
      setIsApiFetching(false)
    }
  }, [activeMenu])

  const onApiFetching = useCallback((isFetching: boolean) => {
    setIsApiFetching(isFetching)
  }, [])

  return (
    <Container className={isInModal ? inModalStyle : ""}>
      <CssBaseline />

      <Drawer variant="permanent" open={isDrawerVisible}>
        <DrawerHeader>
          <IconButton onClick={onToggleDrawerClick}>
            {isDrawerVisible ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <MenuZone
          style={{
            display: isDrawerVisible ? "block" : "none",
          }}
        >
          <SelectHierarchyGroupSideMenu
            activeMenu={activeMenu}
            onChangeMenu={onChangeMenu}
            items={menuItems}
            isDisabled={isApiFetching}
          />
        </MenuZone>
      </Drawer>
      <CenterContainer className="center">
        {activeMenu && (
          <>
            <SelectHierarchyGroupSelector
              activeMenu={activeMenu}
              templateStartDate={dayjs(templateStartDate)}
              templateEndDate={dayjs(templateEndDate)}
              isReqOneYear={isReqOneYear}
              onApiFetching={onApiFetching}
            />
            <FormSpy<ISelectHierarchyGroupFormValues> subscription={{}}>
              {() => {
                return (
                  <ConfirmButtonLayout>
                    <Button onClick={onCancelFilterClick}>{t("ยกเลิก")}</Button>
                    <Button onClick={onConfirmFilterClick}>{t("ตกลง")}</Button>
                  </ConfirmButtonLayout>
                )
              }}
            </FormSpy>
          </>
        )}
        <SelectableEmployeeList
          activeMenu={activeMenu}
          templateStartDate={dayjs(templateStartDate)}
          templateEndDate={dayjs(templateEndDate)}
          isRequireKpiTransaction={isRequireKpiTransaction}
          scopeUserIds={scopeUserIds}
          selectedLimit={selectedLimit}
          isNotRequireSelectCompany={isNotRequireSelectCompany}
          isDisabledByKpiStatus={isDisabledByKpiStatus}
          isReqOneYear={isReqOneYear}
          isUserInitialed={isUserInitialed}
        />
      </CenterContainer>
      <ResultContainer className="result">
        <SelectEmployeeGroupResult
          templateStartDate={dayjs(templateStartDate)}
          templateEndDate={dayjs(templateEndDate)}
          isRequireKpiTransaction={isRequireKpiTransaction}
          scopeUserIds={scopeUserIds}
          isReqOneYear={isReqOneYear}
        />
      </ResultContainer>
    </Container>
  )
}

export default SelectEmployeeGroupComponent
