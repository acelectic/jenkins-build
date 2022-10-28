/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from "@emotion/styled"
import dayjs from "dayjs"
import { map } from "lodash"
import { Dispatch, useCallback, useEffect, useMemo, useState } from "react"
import { useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import KpiTransactionDetailsField from "../../../components/KpiTransactionDetailsField"
import ModalViewUserManageKpiBase from "../../../components/ModalViewUserManageKpiBase"
import {
  useSelectEmployeeFormStateHelper,
  useSetNormalizeHierarchyOption,
} from "../../../components/SelectHierarchyGroup/helper"
import {
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  PRIMARY_DARK,
  WHITE,
} from "../../../constants/colors"
import { CreateKpiState, KpiStatus } from "../../../services/enum-typed"
import { checkHierarchyParamsNotEmpty } from "../../../services/group-employee/group-employee-query"
import { IKpiTransactionDetailUserResponse } from "../../../services/manage-kpi/mange-kpi-type"
import { useGetUsersByHierarchyOnlySelected } from "../../../services/user/user-query"
import { IGetUsersByHierarchyOnlySelectedParams } from "../../../services/user/user-type"
import { format2DecimalNumber, useRouter } from "../../../utils/helper"
import { ISelectEmployee } from "./KpiTransactionDetailTemplate"

const Body = styled.div`
  background-color: ${WHITE};
  padding: 8px;
  margin-top: 32px;
  border: 0px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Container = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 100%;
`

const ContentBox = styled.div`
  background-color: ${WHITE};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 32px 24px;
  width: 100%;
  height: 100%;

  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const FieldAndHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  height: 100%;
`

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  bottom: 0;
  margin-top: 24px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`
const SuccessHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 32px;
  margin: 64px 0px;
`
const SuccessIcon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 24px;
`

const ModalArea = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  text-align: center;
  align-items: center;
  gap: 16px;
  padding: 8px 0px 40px 0px;
`
const SarabunOnClick = styled(Sarabun)`
  border-bottom: 1px solid ${PRIMARY_DARK};
  :hover {
    cursor: pointer;
  }
`

type IConfirmStateProps = {
  setCurrentState: Dispatch<React.SetStateAction<CreateKpiState>>
  handleSubmit: () => void
  isSuccess?: boolean
}

const ConfirmState = (props: IConfirmStateProps) => {
  const { goBack } = useRouter()
  const { setCurrentState, handleSubmit, isSuccess = false } = props
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [isOpenModalViewUser, setIsOpenModalViewUser] = useState(false)
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false)
  const [success /* setSuccess */] = useState(isSuccess)
  const formState = useFormState()
  const { values: formValues } = formState
  const isRequireKpiTransaction = true

  const { getFinalFilterOptionIds } = useSetNormalizeHierarchyOption()
  const usersSelectedStateHelper = useSelectEmployeeFormStateHelper({
    defaultLimit: 5,
  })

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

  const { data: usersSelectedResponse /* isFetching */ } = useGetUsersByHierarchyOnlySelected(
    params,
    {
      enabled: checkHierarchyParamsNotEmpty(params?.userSelected),
    },
  )
  const { data: usersSelected, paging } = usersSelectedResponse || {}
  const { totalRecords } = paging || {}

  useEffect(() => {
    formValues.selectedEmployees?.forEach((employee: ISelectEmployee) => {
      if (employee.kpiStatus !== KpiStatus.NEW && employee.kpiStatus !== KpiStatus.SENT) {
        setIsWarningModalVisible(true)
      }
    })
  }, [formValues.selectedEmployees])

  const data = useMemo(() => {
    return map(
      usersSelected || [],
      (user): IKpiTransactionDetailUserResponse => {
        const { id, employeeId, firstName, lastName, prefix } = user
        return {
          id,
          employeeId,
          firstName,
          lastName,
          prefix,
        }
      },
    )
  }, [usersSelected])

  const onClickChangeBackState = useCallback(() => {
    setCurrentState(CreateKpiState.CHOOSE_EMPLOYEES)
  }, [setCurrentState])

  const onClickValidate = useCallback(() => {
    setShowModal(true)
  }, [])

  const onOk = useCallback(() => {
    handleSubmit()
  }, [handleSubmit])

  const onClickOpenModalViewUser = useCallback(() => {
    setIsOpenModalViewUser(true)
  }, [])

  return (
    <>
      {success && (
        <SuccessHeader>
          <SuccessIcon>
            <Icon iconName="done" height={240} width={320} />

            <Sarabun type="H3" color={WHITE}>{`สร้างเป้าหมายสำเร็จแล้ว`}</Sarabun>
            <Sarabun
              type="H6"
              color={WHITE}
            >{`สามารถแก้ไข หรือใส่ค่าที่ทำได้จริงเพิ่มเติมที่หน้าสร้างเป้าหมายให้พนักงาน`}</Sarabun>
          </SuccessIcon>

          <Button
            startIcon={<Icon iconName="squaresFour" width={24} height={24} />}
            width={230}
            height={56}
            textColor={`${WHITE}`}
            onClick={() => {
              goBack()
            }}
          >
            {t(`ย้อนกลับไปยังเมนูหลัก`)}
          </Button>
        </SuccessHeader>
      )}
      <Body>
        <Container>
          <ContentBox>
            <Sarabun type="H4" style={{ marginBottom: "16px" }}>
              {"ตรวจสอบและยืนยัน"}
            </Sarabun>
            <KpiTransactionDetailsField
              viewMode
              viewModeEdit={true}
              optionsDropdownUnit={[]}
              optionsDropdownType={[]}
              isShowBorder={false}
              isShowMiniKpiReportCard={false}
            />
            <FieldAndHeader>
              <div style={{ display: "flex" }}>
                <Sarabun
                  type="Body2"
                  color={GRAYSCALE_DARKGRAY_80}
                >{`กลุ่มพนักงานที่ใช้เป้าหมายนี้`}</Sarabun>
                <Sarabun type="Body2" color={ERROR}>
                  *
                </Sarabun>
              </div>

              <Row style={{ gap: "12PX", alignItems: "center" }}>
                {/* //TODO:ตรงนี้ยังเป็นข้อมูลmock */}
                <Sarabun type="Subtitle1">{`${format2DecimalNumber(
                  totalRecords || 0,
                )} คน`}</Sarabun>
                <SarabunOnClick
                  type="Subtitle1"
                  color={`${PRIMARY_DARK}`}
                  onClick={onClickOpenModalViewUser}
                >
                  {t(`ดูรายชื่อพนักงาน`)}
                </SarabunOnClick>
              </Row>
            </FieldAndHeader>
          </ContentBox>

          {!success && (
            <ButtonArea>
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
                height={48}
                width={230}
                onClick={onClickValidate}
              >{`ยืนยันสร้างเป้าหมาย`}</Button>
            </ButtonArea>
          )}

          <ModalViewUserManageKpiBase
            visibleUseState={[isOpenModalViewUser, setIsOpenModalViewUser]}
            data={data || []}
            onChangePage={usersSelectedStateHelper.onPageChange}
            onChangeRowsPerPage={usersSelectedStateHelper.onRowsPerPageChange}
            page={usersSelectedStateHelper.page}
            pageSize={usersSelectedStateHelper.limit}
            totalSize={totalRecords || 0}
          />

          <Modal
            visibleUseState={[showModal, setShowModal]}
            showCloseIcon
            closeOnClickOutside={false}
            // onClose={onClose}
            onOk={onOk}
            maxWidth={"482px"}
          >
            <ModalArea>
              {isWarningModalVisible ? (
                <>
                  <Icon width={64} height={64} iconName="warningOrange" />
                  <Sarabun type="H4">
                    {`มีพนักงานที่มอบเป้าหมายนี้ให้ ทำการประเมินเลยขั้นตอนตั้งเป้าหมายแล้วคุณยืนยันที่จะสร้างเป้าหมายหรือไม่?`}
                  </Sarabun>
                  <Sarabun type="Body1" color={GRAYSCALE_DARKGRAY_80}>
                    {`หากคุณยืนยัน การประเมินของพนักงานจะถูกย้อนกลับไปที่ขั้นตอนตั้งเป้าหมายทั้งหมด`}
                  </Sarabun>
                </>
              ) : (
                <Sarabun type="H4">{`คุณยืนยันที่จะสร้างเป้าหมายหรือไม่?`}</Sarabun>
              )}
            </ModalArea>
          </Modal>
        </Container>
      </Body>
    </>
  )
}

export default ConfirmState
