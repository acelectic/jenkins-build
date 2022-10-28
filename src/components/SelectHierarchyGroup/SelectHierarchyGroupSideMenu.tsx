import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { Box } from "@mui/system"
import { useMemo } from "react"
import { Field, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
  PRIMARY_BG,
  PRIMARY_LIGHT,
  WHITE,
} from "../../constants/colors"
import { format2DecimalNumber } from "../../utils/helper"
import Icon from "../common/Icon"
import Sarabun from "../common/Sarabun"
import { parseOptionHashToValuesArray } from "./helper"
import {
  ISelectedOption,
  ISelectEmployeeFormValuesKey,
  ISelectHierarchyGroupFormValues,
} from "./interface"

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 8px;
`

const OrganizationDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
`

const MenuList = styled(Button)`
  display: flex;
  flex-flow: row;
  padding: 12px 16px;
  margin-right: 4px;
  border-radius: 8px;
  grid-column-gap: 4px;
  justify-content: flex-start;
  align-items: center;
  justify-content: space-between;
  min-height: fit-content;
`

const TotalSelected = styled(Box)`
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 1px 3px;
  background-color: ${PRIMARY_LIGHT};
  margin-left: auto;
`

export enum EnumTabMenuKey {
  COMPANY = "company",
  JOB_FUNCTION = "job_function",
  DIVISION = "division",
  SUB_DIVISION = "sub_division",
  DEPARTMENT = "department",
  STORE = "store",
  JOB_LEVEL = "job_level",
  JOB_CODE = "job_code",
  SALARY_PLAN = "salary_plan",
  EMPLOYEE_TYPE = "employee_type",
  EMPLOYEE_CLASS = "employee_class",
  SUPERVISOR_LEVEL = "supervisor_level",
}

export type ISelectHierarchyGroupMenuItemData = {
  label: string
  key: EnumTabMenuKey
  totalItem?: number
}

export const menuSelectedFieldMapping: Record<EnumTabMenuKey, ISelectEmployeeFormValuesKey> = {
  [EnumTabMenuKey.COMPANY]: "companyOptions",
  [EnumTabMenuKey.JOB_FUNCTION]: "jobFunctionOptions",
  [EnumTabMenuKey.DIVISION]: "divisionOptions",
  [EnumTabMenuKey.SUB_DIVISION]: "subDivisionOptions",
  [EnumTabMenuKey.DEPARTMENT]: "departmentOptions",
  [EnumTabMenuKey.STORE]: "storeOptions",
  [EnumTabMenuKey.JOB_LEVEL]: "jobLevelOptions",
  [EnumTabMenuKey.JOB_CODE]: "jobCodeOptions",
  [EnumTabMenuKey.SALARY_PLAN]: "salaryAdminPlanOptions",
  [EnumTabMenuKey.EMPLOYEE_TYPE]: "employeeTypeOptions",
  [EnumTabMenuKey.EMPLOYEE_CLASS]: "employeeClassificationOptions",
  [EnumTabMenuKey.SUPERVISOR_LEVEL]: "positionLevelOptions",
}

export type ISelectHierarchyGroupSideMenuItem = {
  organizationMenus: ISelectHierarchyGroupMenuItemData[]
  filterMenus: ISelectHierarchyGroupMenuItemData[]
}

type ISelectHierarchyGroupSideMenuProps = {
  onChangeMenu: (key: EnumTabMenuKey) => void
  activeMenu?: EnumTabMenuKey
  items: ISelectHierarchyGroupSideMenuItem
  isDisabled?: boolean
}
const activeColor = PRIMARY_BG
const SelectHierarchyGroupSideMenu = (props: ISelectHierarchyGroupSideMenuProps) => {
  const { onChangeMenu, activeMenu, items, isDisabled } = props
  const { filterMenus, organizationMenus } = items
  const { t } = useTranslation()
  const { values: formValues } = useFormState<ISelectHierarchyGroupFormValues>()
  const { companyOptions: companies } = formValues || {}
  const { selectOptions, excludeOptions } = companies || {}

  const isSelectedCompany = useMemo(() => {
    return (
      parseOptionHashToValuesArray(selectOptions)?.length ||
      parseOptionHashToValuesArray(excludeOptions)?.length
    )
  }, [excludeOptions, selectOptions])

  return (
    <>
      <OrganizationDiv>
        <TitleRow>
          <Icon iconName="circlesThree" width={32} height={32} />
          <Sarabun type="Subtitle1">{t(`ผังองค์กร`)}</Sarabun>
        </TitleRow>
        {organizationMenus.map((item, index) => {
          const { key, label } = item
          return (
            <MenuList
              key={key}
              onClick={onChangeMenu.bind(null, key)}
              style={{
                backgroundColor: activeMenu === key ? `${activeColor}` : undefined,
              }}
              disabled={(index !== 0 && !isSelectedCompany) || isDisabled}
            >
              <Sarabun
                type="Body1"
                color={
                  (index !== 0 && !isSelectedCompany) || isDisabled ? "rgba(0, 0, 0, 0.3)" : "black"
                }
              >
                {t(`${label}`)}
              </Sarabun>
              <Field<ISelectedOption>
                name={`${menuSelectedFieldMapping[key]}`}
                subscription={{ value: true }}
              >
                {({ input }) => {
                  const {
                    countTotalOptions,
                    isIncludeNull = false,
                    isShowNullValue = false,
                    isCheckedAll = false,
                    selectOptions,
                    excludeOptions,
                  } = input.value

                  let selectedCount = 0
                  if (isCheckedAll) {
                    if (!isIncludeNull && isShowNullValue) {
                      selectedCount += 1
                    }
                    selectedCount +=
                      Number(countTotalOptions || 0) -
                      parseOptionHashToValuesArray(excludeOptions).length
                  } else {
                    if (isIncludeNull && isShowNullValue) {
                      selectedCount += 1
                    }
                    selectedCount += parseOptionHashToValuesArray(selectOptions).length
                  }
                  return (
                    <Box display={selectedCount ? "block" : "none"}>
                      <TotalSelected>
                        <Sarabun type="Caption" color={WHITE}>
                          {format2DecimalNumber(selectedCount)}
                        </Sarabun>
                      </TotalSelected>
                    </Box>
                  )
                }}
              </Field>
            </MenuList>
          )
        })}
      </OrganizationDiv>
      <FilterDiv>
        <TitleRow>
          <Icon iconName="filter" width={32} height={32} />
          <Sarabun type="Subtitle1">{t(`Filter`)}</Sarabun>
        </TitleRow>
        {filterMenus.map((item, index) => {
          const { key, label } = item
          return (
            <MenuList
              key={key}
              onClick={onChangeMenu.bind(null, key)}
              style={{
                backgroundColor: activeMenu === key ? `${activeColor}` : undefined,
              }}
            >
              <Sarabun type="Body1">{t(`${label}`)}</Sarabun>
              <Field<ISelectedOption>
                name={`${menuSelectedFieldMapping[key]}`}
                subscription={{ value: true }}
              >
                {({ input }) => {
                  const {
                    countTotalOptions,
                    isIncludeNull = false,
                    isShowNullValue = false,
                    isCheckedAll = false,
                    selectOptions,
                    excludeOptions,
                  } = input.value

                  let selectedCount = 0
                  if (isCheckedAll) {
                    if (!isIncludeNull && isShowNullValue) {
                      selectedCount += 1
                    }
                    selectedCount +=
                      Number(countTotalOptions || 0) -
                      parseOptionHashToValuesArray(excludeOptions).length
                  } else {
                    if (isIncludeNull && isShowNullValue) {
                      selectedCount += 1
                    }
                    selectedCount += parseOptionHashToValuesArray(selectOptions).length
                  }
                  return (
                    <Box display={selectedCount ? "block" : "none"}>
                      <TotalSelected>
                        <Sarabun type="Caption" color={WHITE}>
                          {format2DecimalNumber(selectedCount)}
                        </Sarabun>
                      </TotalSelected>
                    </Box>
                  )
                }}
              </Field>
            </MenuList>
          )
        })}
      </FilterDiv>
    </>
  )
}

export default SelectHierarchyGroupSideMenu
