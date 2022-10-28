/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from "@emotion/styled"
import { Box, CircularProgress, TablePagination } from "@mui/material"
import { Dispatch, useCallback, useEffect, useMemo, useState, ChangeEvent, MouseEvent } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import Sarabun from "../../../components/common/Sarabun"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  PRIMARY,
  PRIMARY_MAIN,
  WHITE,
} from "../../../constants/colors"
import CalibrateImg from "../../../assets/images/calibrate.svg"
import { CreateKpiState } from "../../../services/enum-typed"
import { useForm, useFormState } from "react-final-form"
import ModalSelectEmployees from "../../../components/ModalSelectEmployees"
import { useVisible } from "../../../utils/custom-hook"
import Avatar from "../../../components/common/Avatar"
import {
  IParentFromValues,
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../components/SelectHierarchyGroup/interface"
import {
  useSelectEmployeeFormStateHelper,
  useSetNormalizeHierarchyOption,
} from "../../../components/SelectHierarchyGroup/helper"
import { IGetUsersByHierarchyOnlySelectedParams } from "../../../services/user/user-type"
import { useGetUsersByHierarchyOnlySelected } from "../../../services/user/user-query"
import { compact, remove } from "lodash"
import dayjs from "dayjs"
import { format2DecimalNumber } from "../../../utils/helper"
import { checkHierarchyParamsNotEmpty } from "../../../services/group-employee/group-employee-query"
import { IKpiTransactionDetailFormValues } from "./KpiTransactionDetailTemplate"

const Body = styled.div`
  background-color: ${WHITE};
  padding: 8px;
  margin-top: 32px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Container = styled.div`
  background-color: ${WHITE};

  padding: 16px;
  align-self: stretch;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const TitleBox = styled.div`
  display: flex;
`
const ImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`
const ChildButton = styled.div`
  display: flex;
  align-items: center;
`
const BottomCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`
const UserCardBox = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  width: 370px;
  background: #4674ea;
  gap: 8px;
  padding: 4px 8px 4px 8px;
  align-items: center;
  border-radius: 24px;
  justify-content: space-between;
  margin-top: 8px;
`
const UserCardHeaderBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const PaginateLayout = styled(Box)`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-column-gap: 10px;
  margin-top: auto;
  margin-bottom: 0;
`

const CircularProgressStyled = styled(CircularProgress)`
  color: ${GRAYSCALE_DARKGRAY_80};
`

type IChooseEmployeeStateProps = {
  setCurrentState: Dispatch<React.SetStateAction<CreateKpiState>>
}

const ChooseEmployeeState = (props: IChooseEmployeeStateProps) => {
  const { setCurrentState } = props
  const { t } = useTranslation()
  const modalVisible = useVisible()

  const form = useForm()
  const { values: formValues } = useFormState<
    IKpiTransactionDetailFormValues &
      ISelectHierarchyGroupFormValues &
      ISelectEmployeeFormSubmitValues &
      IParentFromValues
  >()
  const { userSelected } = formValues || {}

  const [isSelectEmployee, setIsSelectEmployee] = useState(false)

  const {
    setFilterOptionsToForm,
    setHierarchyOptionsToForm,
    getFinalFilterOptionIds,
  } = useSetNormalizeHierarchyOption()

  const usersSelectedStateHelper = useSelectEmployeeFormStateHelper({
    defaultLimit: 5,
  })
  const isRequireKpiTransaction = true

  const params = useMemo(() => {
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
    } = formValues
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
    const _params: IGetUsersByHierarchyOnlySelectedParams = {
      ...filterOptionIds,
      companySelected: formValues?.companySelected,
      jobFunctionSelected: formValues?.jobFunctionSelected,
      divisionSelected: formValues?.divisionSelected,
      subDivisionSelected: formValues?.subDivisionSelected,
      departmentSelected: formValues?.departmentSelected,
      storeSelected: formValues?.storeSelected,
      userSelected: formValues?.userSelected,
      page: usersSelectedStateHelper.page,
      limit: usersSelectedStateHelper.limit,
      q: usersSelectedStateHelper.q,
      isRequireKpiTransaction,
      startDate: dayjs().startOf("day").tz().format(),
      endDate: dayjs().startOf("day").tz().format(),
    }
    return _params
  }, [
    formValues,
    getFinalFilterOptionIds,
    isRequireKpiTransaction,
    usersSelectedStateHelper.limit,
    usersSelectedStateHelper.page,
    usersSelectedStateHelper.q,
  ])

  const { data: usersSelectedResponse, isFetching } = useGetUsersByHierarchyOnlySelected(params, {
    enabled: checkHierarchyParamsNotEmpty(params?.userSelected),
  })
  const { paging } = usersSelectedResponse || {}
  const { totalRecords } = paging || {}

  const onRemoveUserClick = useCallback(
    (userId: string) => {
      const { selectedIds, excludeIds } = userSelected || {}
      if (selectedIds?.includes(userId)) {
        remove(selectedIds, (id) => id === userId)
        form.change("userSelected" as any, {
          isCheckedAll: false,
          selectedIds: selectedIds,
          excludeIds: [],
        })
      } else {
        form.change("userSelected" as any, {
          isCheckedAll: true,
          selectedIds: [],
          excludeIds: [...(excludeIds || []), userId],
        })
      }
    },
    [form, userSelected],
  )

  const onClickSelectEmployee = useCallback(
    (values: ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues) => {
      setFilterOptionsToForm(form, values)
      setHierarchyOptionsToForm(form, values)
      modalVisible.close()
    },
    [form, modalVisible, setFilterOptionsToForm, setHierarchyOptionsToForm],
  )

  const onClickChangeNextState = useCallback(() => {
    setCurrentState(CreateKpiState.EVALUATE_AND_CONFIRM)
  }, [setCurrentState])

  const onClickChangeBackState = useCallback(() => {
    setCurrentState(CreateKpiState.FILL_DETAIL)
  }, [setCurrentState])

  const handlePageChange = useCallback(
    (event: MouseEvent<unknown> | null, page: number) => {
      usersSelectedStateHelper.onPageChange(page + 1)
    },
    [usersSelectedStateHelper],
  )

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      usersSelectedStateHelper.onRowsPerPageChange(parseInt(event.target.value, 10))
      usersSelectedStateHelper.onPageChange(1)
    },
    [usersSelectedStateHelper],
  )

  useEffect(() => {
    if (totalRecords) {
      setIsSelectEmployee(true)
    } else {
      setIsSelectEmployee(false)
    }
  }, [formValues.selectedEmployees, totalRecords])

  return (
    <Body>
      <Container>
        <HeaderBox>
          <TitleBox>
            {!isSelectEmployee ? (
              <Sarabun type="H2">{t(`เลือกพนักงานที่ใช้เป้าหมายนี้`)}</Sarabun>
            ) : (
              <Sarabun type="H2">{`เลือกพนักงานที่ใช้เป้าหมายนี้ - ${
                totalRecords || 0
              } คน`}</Sarabun>
            )}
          </TitleBox>
          {isSelectEmployee && (
            <ImageBox>
              <Button
                buttonType="outlined"
                backgroundColor="white"
                onClick={modalVisible.open}
                width={230}
              >
                <ChildButton>
                  <Icon iconName="plus" width={18} height={18} />
                  <Sarabun type="Button" color={`${PRIMARY}`}>
                    {t("เพิ่มพนักงาน")}
                  </Sarabun>
                </ChildButton>
              </Button>
            </ImageBox>
          )}
        </HeaderBox>

        <Box height={42} />
        {!isSelectEmployee && (
          <>
            <ImageBox>
              <img src={CalibrateImg} alt="title" />
            </ImageBox>
            <ImageBox>
              <Button
                buttonType="outlined"
                backgroundColor="white"
                onClick={modalVisible.open}
                width={230}
                style={{ marginTop: "24px" }}
              >
                <ChildButton>
                  <Icon iconName="plus" width={18} height={18} />
                  <Sarabun type="Button" color={`${PRIMARY}`}>
                    {t("เพิ่มพนักงาน")}
                  </Sarabun>
                </ChildButton>
              </Button>
            </ImageBox>
          </>
        )}
        {isFetching ? (
          <Box display="flex" justifyContent="center" padding="20px">
            <CircularProgressStyled size={24} />
          </Box>
        ) : (
          checkHierarchyParamsNotEmpty(userSelected) &&
          isSelectEmployee && (
            <>
              <div style={{ maxHeight: "650px", overflowY: "auto", minHeight: "400px" }}>
                {usersSelectedResponse?.data?.map((user) => {
                  const { id: userId, prefix, firstName, lastName, employeeId } = user

                  const name = compact([
                    compact([prefix, firstName]).join(""),
                    lastName,
                    `(EID: ${employeeId})`,
                  ]).join(" ")
                  return (
                    <UserCardBox key={userId}>
                      <UserCardHeaderBox>
                        <Avatar width={34} height={34} style={{ marginRight: "4px" }} />
                        <Sarabun size={14} weight={700} color="white">
                          {name}
                        </Sarabun>
                      </UserCardHeaderBox>
                      <Icon
                        iconName="xCircleWhite"
                        onClick={onRemoveUserClick.bind(null, userId)}
                      />
                    </UserCardBox>
                  )
                })}
              </div>
              <PaginateLayout>
                <TablePagination
                  sx={{
                    borderBottomWidth: 0,
                  }}
                  page={paging?.currentPage ? Math.max(Number(paging?.currentPage) - 1, 0) : 0}
                  count={paging?.totalRecords || 0}
                  labelDisplayedRows={({ from, to, count, page }) => {
                    return `${format2DecimalNumber(from)}–${format2DecimalNumber(to)} of ${
                      count !== -1
                        ? format2DecimalNumber(count)
                        : `more than ${format2DecimalNumber(to)}`
                    }`
                  }}
                  onPageChange={handlePageChange}
                  rowsPerPage={usersSelectedStateHelper.limit}
                  rowsPerPageOptions={[5, 10, 20]}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </PaginateLayout>
            </>
          )
        )}
      </Container>
      <BottomCard>
        <Button
          buttonType="outlined"
          width={202}
          height={48}
          startIcon={<Icon iconName="caretLeft" width={24} height={24} />}
          onClick={onClickChangeBackState}
        >
          {"ย้อนกลับ"}
        </Button>
        <Button
          buttonType="contained"
          width={268}
          height={48}
          onClick={onClickChangeNextState}
          isDisabledButton={!totalRecords}
          backgroundColor={PRIMARY_MAIN}
          endIcon={
            <Icon
              iconName="vector"
              width={7.5}
              height={15}
              stroke={WHITE}
              style={{ marginLeft: "16px" }}
            />
          }
        >
          {t(`ไปตรวจสอบและยืนยัน`)}
        </Button>
      </BottomCard>
      <ModalSelectEmployees
        title={"เลือกพนักงาน"}
        description={"(เลือกได้มากกว่า 1 คน)"}
        visible={modalVisible.visible}
        onClose={modalVisible.close}
        onConfirm={onClickSelectEmployee}
        isRequireKpiTransaction={isRequireKpiTransaction}
        isDisabledByKpiStatus
        isRequired
      />
    </Body>
  )
}

export default ChooseEmployeeState
