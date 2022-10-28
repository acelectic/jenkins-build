import styled from "@emotion/styled"
import { Box, CircularProgress, TablePagination } from "@mui/material"
import { useTranslation } from "react-i18next"
import { GRAYSCALE_DARKGRAY_80, PRIMARY_LIGHT, WHITE } from "../../constants/colors"
import Sarabun from "../common/Sarabun"
import Icon from "../common/Icon"
import { format2DecimalNumber } from "../../utils/helper"
import { useForm, useFormState } from "react-final-form"
import {
  EnumSelectHierarchyGroupField,
  extractOptions,
  useSelectEmployeeFormStateHelper,
  useSetNormalizeHierarchyOption,
} from "./helper"
import {
  IParentFromValues,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./interface"
import { useCallback, useMemo, ChangeEvent, MouseEvent, useEffect } from "react"
import { useGetUsersByHierarchyOnlySelected } from "../../services/user/user-query"
import { IGetUsersByHierarchyOnlySelectedParams } from "../../services/user/user-type"
import dayjs, { Dayjs } from "dayjs"
import { compact, isEmpty, map } from "lodash"
import { IBaseStructureOption } from "../../services/group-employee/group-employee-type"
import { checkHierarchyParamsNotEmpty } from "../../services/group-employee/group-employee-query"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-bottom: 0;

  gap: 8px;
  overflow: auto;
  width: 100%;
  height: 100%;
`

const ViewTitleLayout = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  grid-column-gap: 8px;
  align-items: center;
  justify-content: flex-start;
`

const Center = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
  > svg {
    width: 100%;
  }
`

const CircularProgressStyled = styled(CircularProgress)`
  width: 18px;
  height: 18px;
  color: ${GRAYSCALE_DARKGRAY_80};
`

const HierarchyListItemLayout = styled(Box)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  grid-row-gap: 4px;
`

const HierarchyListItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px 4px 8px;
  gap: 8px;
  min-height: 30px;
  background: ${PRIMARY_LIGHT};
  border-radius: 24px;

  > button {
    padding: 0;
  }
`

const PaginateLayout = styled(Box)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-column-gap: 10px;
  margin-top: auto;
  margin-bottom: 0;
`

type ISelectEmployeeGroupResultProps = {
  isRequireKpiTransaction: boolean
  scopeUserIds: string[]
  templateStartDate?: Dayjs
  templateEndDate?: Dayjs
  isReqOneYear?: boolean
}

const SelectEmployeeGroupResult = (props: ISelectEmployeeGroupResultProps) => {
  const {
    isRequireKpiTransaction,
    scopeUserIds,
    templateStartDate,
    templateEndDate,
    isReqOneYear = false,
  } = props

  const { t } = useTranslation()
  const { getFilterOptionIds } = useSetNormalizeHierarchyOption()

  const usersByHierarchyOnlySelectedStateHelper = useSelectEmployeeFormStateHelper({
    defaultLimit: 20,
  })

  const form = useForm()
  const { values: formValues } = useFormState<
    ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues & IParentFromValues
  >()
  const { userOptions } = formValues || {}
  const { isCheckedAll } = userOptions || {}

  const params = useMemo(() => {
    const filterOptionIds = getFilterOptionIds(formValues)
    // const userSelected = checkHierarchyParamsNotEmpty(formValues?.userSelected)
    //   ? formValues?.userSelected
    //   : extractOptions(formValues?.userOptions)
    const userSelected = extractOptions(formValues?.userOptions)
    const _params: IGetUsersByHierarchyOnlySelectedParams = {
      ...filterOptionIds,
      companySelected: formValues?.companySelected,
      jobFunctionSelected: formValues?.jobFunctionSelected,
      divisionSelected: formValues?.divisionSelected,
      subDivisionSelected: formValues?.subDivisionSelected,
      departmentSelected: formValues?.departmentSelected,
      storeSelected: formValues?.storeSelected,
      userSelected,
      companies: [],
      startDate: dayjs(templateStartDate).tz().startOf("day").format(),
      endDate: dayjs(templateEndDate).tz().startOf("day").format(),
      page: usersByHierarchyOnlySelectedStateHelper.page,
      limit: usersByHierarchyOnlySelectedStateHelper.limit,
      q: usersByHierarchyOnlySelectedStateHelper.q,
      isRequireKpiTransaction,
      scopeUserIds,
      isReqOneYear,
    }
    // console.debug({ IGetUsersByHierarchyOnlySelectedParams: _params })
    return _params
  }, [
    formValues,
    getFilterOptionIds,
    isReqOneYear,
    isRequireKpiTransaction,
    scopeUserIds,
    templateEndDate,
    templateStartDate,
    usersByHierarchyOnlySelectedStateHelper.limit,
    usersByHierarchyOnlySelectedStateHelper.page,
    usersByHierarchyOnlySelectedStateHelper.q,
  ])

  const { data: usersByHierarchyOnlySelected, isFetching } = useGetUsersByHierarchyOnlySelected(
    params,
    {
      enabled:
        (checkHierarchyParamsNotEmpty(params?.companySelected) &&
          checkHierarchyParamsNotEmpty(params?.userSelected)) ||
        !!isCheckedAll,
    },
  )

  const { paging } = usersByHierarchyOnlySelected || {}
  const { totalRecords } = paging || {}

  const options = useMemo(() => {
    const tempOptions: IBaseStructureOption[] = map(
      usersByHierarchyOnlySelected?.data || [],
      (user) => {
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
    return tempOptions
  }, [usersByHierarchyOnlySelected?.data])

  const totalSelected = useMemo(() => {
    const userOptionsSelect = extractOptions(userOptions)
    if (
      isCheckedAll ||
      !isEmpty(userOptionsSelect?.selectedIds) ||
      !isEmpty(userOptionsSelect?.excludeIds)
    ) {
      return totalRecords || 0
    } else {
      return 0
    }
  }, [isCheckedAll, totalRecords, userOptions])

  const handleOnRemoveItem = useCallback(
    (option: IBaseStructureOption) => {
      const { id } = option
      if (isCheckedAll) {
        form.change(`${EnumSelectHierarchyGroupField.USER_OPTIONS}.selectOptions.${id}`, null)
        form.change(`${EnumSelectHierarchyGroupField.USER_OPTIONS}.excludeOptions.${id}`, option)
      } else {
        form.change(`${EnumSelectHierarchyGroupField.USER_OPTIONS}.selectOptions.${id}`, null)
        form.change(`${EnumSelectHierarchyGroupField.USER_OPTIONS}.excludeOptions.${id}`, null)
      }
    },
    [form, isCheckedAll],
  )

  const handlePageChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
      usersByHierarchyOnlySelectedStateHelper.onPageChange(page + 1)
    },
    [usersByHierarchyOnlySelectedStateHelper],
  )

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      usersByHierarchyOnlySelectedStateHelper.onRowsPerPageChange(parseInt(event.target.value, 10))
      usersByHierarchyOnlySelectedStateHelper.onPageChange(1)
    },
    [usersByHierarchyOnlySelectedStateHelper],
  )

  useEffect(() => {
    form.change("countSelectUser", totalSelected || 0)
  }, [form, totalSelected])

  useEffect(() => {
    form.change("isCountUserSelectFetching", isFetching)
  }, [form, isFetching])

  return (
    <Layout>
      <ViewTitleLayout>
        <Sarabun type="H6">{t(`กลุ่มพนักงานที่เลือก`)}</Sarabun>
        <Box position="relative">
          <Box
            position="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              opacity: isFetching ? 1 : 0,
            }}
          >
            <CircularProgressStyled size="small" />
          </Box>
          <Box
            style={{
              opacity: !isFetching ? 1 : 0,
            }}
          >
            <Sarabun type="H6">{`(${format2DecimalNumber(
              Number(totalSelected || 0),
            )} คน)`}</Sarabun>
          </Box>
        </Box>
      </ViewTitleLayout>
      {!totalSelected ? (
        <Center>
          <Icon iconName="done" width={320} height={240} />
          <Sarabun type="Body2">{t(`ยังไม่มีกลุ่มพนักงานที่เลือก`)}</Sarabun>
        </Center>
      ) : (
        <>
          <HierarchyListItemLayout>
            {!isFetching &&
              map(options || [], (option) => {
                const { id, employeeId, prefix, firstName, lastName } = option
                const name = compact([
                  compact([prefix, firstName]).join(""),
                  lastName,
                  `(EID: ${employeeId})`,
                ]).join(" ")
                return (
                  <HierarchyListItem key={id}>
                    <Sarabun type="Body1" color={`${WHITE}`}>{`${name}`}</Sarabun>
                    <Icon
                      iconName="xCircleWhite"
                      width={20}
                      height={20}
                      onClick={handleOnRemoveItem.bind(null, option)}
                    />
                  </HierarchyListItem>
                )
              })}
          </HierarchyListItemLayout>
          {!!options?.length && !isFetching && (
            <PaginateLayout>
              <TablePagination
                sx={{
                  borderBottomWidth: 0,
                }}
                page={paging?.currentPage ? Math.max(Number(paging?.currentPage) - 1, 0) : 0}
                labelDisplayedRows={({ from, to, count, page }) => {
                  return `${format2DecimalNumber(from)}–${format2DecimalNumber(to)} of ${
                    count !== -1
                      ? format2DecimalNumber(count)
                      : `more than ${format2DecimalNumber(to)}`
                  }`
                }}
                count={paging?.totalRecords || 0}
                onPageChange={handlePageChange}
                rowsPerPage={usersByHierarchyOnlySelectedStateHelper.limit}
                rowsPerPageOptions={[20, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </PaginateLayout>
          )}
        </>
      )}
    </Layout>
  )
}

export default SelectEmployeeGroupResult
