import styled from "@emotion/styled"
import { Box } from "@mui/system"
import dayjs, { Dayjs } from "dayjs"
import { compact, map } from "lodash"
import { useMemo } from "react"
import { useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import { KpiStatus } from "../../services/enum-typed"
import { checkHierarchyParamsNotEmpty } from "../../services/group-employee/group-employee-query"
import { IBaseStructureOption } from "../../services/group-employee/group-employee-type"
import { useGetUsersByHierarchy } from "../../services/user/user-query"
import { IGetUsersByHierarchyParams } from "../../services/user/user-type"
import Kanit from "../common/Kanit"
import {
  parseOptionHashToValuesArray,
  EnumSelectHierarchyGroupField,
  useSelectEmployeeFormStateHelper,
  useSetNormalizeHierarchyOption,
} from "./helper"
import {
  IParentFromValues,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import SelectableList from "./SelectableList"
import { EnumTabMenuKey } from "./SelectHierarchyGroupSideMenu"

const Layout = styled(Box)`
  overflow: auto;
  height: inherit;
`

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  overflow: auto;
`

export type ISelectableEmployeeListProps = {
  activeMenu?: EnumTabMenuKey
  isRequireKpiTransaction: boolean
  scopeUserIds: string[]
  selectedLimit?: number
  templateStartDate?: Dayjs
  templateEndDate?: Dayjs
  isNotRequireSelectCompany?: boolean
  isDisabledByKpiStatus?: boolean
  isReqOneYear?: boolean
  isUserInitialed?: boolean
}
const SelectableEmployeeList = (props: ISelectableEmployeeListProps) => {
  const {
    activeMenu,
    isRequireKpiTransaction,
    scopeUserIds,
    selectedLimit,
    templateStartDate,
    templateEndDate,
    isNotRequireSelectCompany = false,
    isDisabledByKpiStatus = false,
    isReqOneYear = false,
    isUserInitialed = false,
  } = props
  const { t } = useTranslation()
  const { getFilterOptionIds } = useSetNormalizeHierarchyOption()

  const usersByHierarchyStateHelper = useSelectEmployeeFormStateHelper()
  const { values: formValues } = useFormState<
    ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues & IParentFromValues
  >()
  const filterOptionIds = useMemo(() => {
    return getFilterOptionIds(formValues)
  }, [formValues, getFilterOptionIds])

  const params = useMemo(() => {
    const _params: IGetUsersByHierarchyParams = {
      ...filterOptionIds,
      companySelected: formValues?.companySelected,
      jobFunctionSelected: formValues?.jobFunctionSelected,
      divisionSelected: formValues?.divisionSelected,
      subDivisionSelected: formValues?.subDivisionSelected,
      departmentSelected: formValues?.departmentSelected,
      storeSelected: formValues?.storeSelected,
      companies: [],
      startDate: dayjs(templateStartDate).tz().startOf("day").format(),
      endDate: dayjs(templateEndDate).tz().startOf("day").format(),
      page: usersByHierarchyStateHelper.page,
      limit: usersByHierarchyStateHelper.limit,
      q: usersByHierarchyStateHelper.q,
      isRequireKpiTransaction,
      scopeUserIds,
      isReqOneYear,
    }
    return _params
  }, [
    filterOptionIds,
    formValues?.companySelected,
    formValues?.departmentSelected,
    formValues?.divisionSelected,
    formValues?.jobFunctionSelected,
    formValues?.storeSelected,
    formValues?.subDivisionSelected,
    isReqOneYear,
    isRequireKpiTransaction,
    scopeUserIds,
    templateEndDate,
    templateStartDate,
    usersByHierarchyStateHelper.limit,
    usersByHierarchyStateHelper.page,
    usersByHierarchyStateHelper.q,
  ])

  const { data: usersByHierarchyRes, isFetching } = useGetUsersByHierarchy(params, {
    enabled: isNotRequireSelectCompany || checkHierarchyParamsNotEmpty(params?.companySelected),
  })

  const options = useMemo(() => {
    const tempOptions: IBaseStructureOption[] = map(usersByHierarchyRes?.data || [], (user) => {
      const { id: userId, prefix, firstName, lastName, employeeId, kpiStatus, ...restUser } = user
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
        disabled:
          isDisabledByKpiStatus &&
          kpiStatus &&
          ![KpiStatus.NEW, KpiStatus.SENT].includes(kpiStatus),
        ...restUser,
      }
    })
    return tempOptions
  }, [usersByHierarchyRes?.data, isDisabledByKpiStatus])

  const canSelectUsers = useMemo(() => {
    const { isCheckedAll, selectOptions } = formValues?.companyOptions || {}
    const selectOptionList = parseOptionHashToValuesArray(selectOptions)
    if (selectOptionList?.length || isNotRequireSelectCompany) {
      return true
    } else if (isCheckedAll) {
      return true
    } else {
      return false
    }
  }, [formValues?.companyOptions, isNotRequireSelectCompany])

  return !activeMenu ? (
    <Layout component="main">
      <ContentLayout>
        {canSelectUsers ? (
          <SelectableList
            fieldName={EnumSelectHierarchyGroupField.USER_OPTIONS}
            searchPlaceholder={t("ค้นหาชื่อ หรือ รหัสพนักงาน")}
            options={options}
            onPageChange={usersByHierarchyStateHelper.onPageChange}
            onRowsPerPageChange={usersByHierarchyStateHelper.onRowsPerPageChange}
            limit={usersByHierarchyStateHelper.limit}
            onSearch={usersByHierarchyStateHelper.onSearch}
            paging={usersByHierarchyRes?.paging}
            isFetching={isFetching || !isUserInitialed}
            selectedLimit={selectedLimit}
            isHideSelectAll={selectedLimit === 1}
          />
        ) : (
          <Box>
            <Kanit>{t("Please choose least one company")}</Kanit>
          </Box>
        )}
      </ContentLayout>
    </Layout>
  ) : null
}

export default SelectableEmployeeList
