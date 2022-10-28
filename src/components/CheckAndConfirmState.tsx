import styled from "@emotion/styled"
import dayjs from "dayjs"
import { Dispatch, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Button from "../components/common/Button"
import Icon from "../components/common/Icon"
import Sarabun from "../components/common/Sarabun"
import { PRIMARY_MAIN, SECONDARY_LIGHT, WHITE } from "../constants/colors"
import paths from "../constants/paths"
import {
  OptionKpiTemplateResponse,
  ValidateCreateKpiPeriodTemplateResponse,
} from "../services/set-form/set-form-type"
import { TemplateCreateState, TemplateType } from "../services/enum-typed"
import ModalKpiTemplateExample from "./ModalKpiTemplateExample"
import ModalOneYearExample from "./ModalOneYearExample"
import ModalProbationExample from "./ModalProbationExample"
import TemplateDetail from "./TemplateDetail"
import TemplateDetailOneYear from "./TemplateDetailOneYear"
import TemplateDetailProbation from "./TemplateDetailProbation"
import Modal from "./common/Modal"
import DuplicateEmployeeListModal, {
  IEmployeeList,
} from "../modules/SetForm/component/DuplicateEmployeeListModal"
import {
  useGetEmployeesPreview,
  useValidateCreateKpiPeriodTemplate,
} from "../services/set-form/set-form-query"
import { parseFormValue } from "../modules/SetForm/shared"
import { useForm } from "react-final-form"
import { IKpiPeriodTemplateForm } from "../modules/SetForm/CreateForm/KpiPeriodTemplate/KpiTemplateForm"
import { IOneYearTemplateFormType } from "../modules/SetForm/CreateForm/OneYearTemplate/OneYearTemplateForm"
import { IProbationTemplateFormType } from "../modules/SetForm/CreateForm/ProbationTemplate/ProbationTemplateForm"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "./SelectHierarchyGroup/interface"
import { mapGetOptionIds } from "./SelectHierarchyGroup/helper"

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 32px 24px;
  align-items: flex-start;
  gap: 32px;
`

const ButtonZone = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  box-sizing: border-box;
  margin-top: 24px;
  justify-content: space-between;
`

const RowButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 48px;
`

const SuccessDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 64px;
  width: 100%;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
`

type ICheckAndConfirmProps = {
  isSuccess?: boolean //ยิงapi สำเร็จไว้สลับcomponent
  type: TemplateType
  setCurrentState: Dispatch<React.SetStateAction<TemplateCreateState>>
  handleSubmit: () => void
  options?: OptionKpiTemplateResponse
  isEdit?: boolean
  isSubmitLoading?: boolean
  valuesKpi?: IKpiPeriodTemplateForm &
    Partial<ISelectEmployeeFormSubmitValues> &
    Partial<ISelectHierarchyGroupFormValues>
  valuesOneYear?: IOneYearTemplateFormType
  valuesProbation?: IProbationTemplateFormType
}

const CheckAndConfirmState = (props: ICheckAndConfirmProps) => {
  const {
    isSuccess = false,
    type,
    setCurrentState,
    handleSubmit,
    options,
    isEdit = false,
    isSubmitLoading,
    valuesKpi,
    valuesOneYear,
    valuesProbation,
  } = props
  const history = useHistory()
  const { change } = useForm()
  const { t } = useTranslation()
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isOpenDuplicateEmployeeListModal, setIsOpenDuplicateEmployeeListModal] = useState(false)
  const [duplicateEmployeeList, setDuplicateUserList] = useState<IEmployeeList[]>([])
  const [tempRemoveKpiPeriodTemplateUser, setTempRemoveKpiPeriodTemplateUser] = useState<
    ValidateCreateKpiPeriodTemplateResponse | undefined
  >()
  const { mutateAsync: checkDuplicateEmployee } = useValidateCreateKpiPeriodTemplate()
  const { data: employeesPreview, isLoading: isEmployeesPreviewLoading } = useGetEmployeesPreview({
    page: page,
    limit: pageSize,
    reqOneYear:
      type === TemplateType.KPI &&
      (valuesKpi?.reqOneYear === "true" || valuesKpi?.reqOneYear === true)
        ? true
        : false,
    quarterStartDate: dayjs.tz(valuesKpi?.startDate).format(),
    quarterEndDate: dayjs.tz(valuesKpi?.endDate).format(),
    companies: valuesKpi?.companies,

    employeeClassificationIds: mapGetOptionIds(
      valuesKpi?.employeeClassificationOptions?.totalOptions,
    ),
    employeeTypes: mapGetOptionIds(valuesKpi?.employeeTypeOptions?.totalOptions),
    jobCodeIds: mapGetOptionIds(valuesKpi?.jobCodeOptions?.totalOptions),
    jobLevelIds: mapGetOptionIds(valuesKpi?.jobLevelOptions?.totalOptions),
    positionLevelIds: mapGetOptionIds(valuesKpi?.positionLevelOptions?.totalOptions),
    salaryAdminPlanIds: mapGetOptionIds(valuesKpi?.salaryAdminPlanOptions?.totalOptions),

    companySelected: valuesKpi?.companySelected,
    jobFunctionSelected: valuesKpi?.jobFunctionSelected,
    divisionSelected: valuesKpi?.divisionSelected,
    subDivisionSelected: valuesKpi?.subDivisionSelected,
    departmentSelected: valuesKpi?.departmentSelected,
    storeSelected: valuesKpi?.storeSelected,
    userSelected: valuesKpi?.userSelected,
  })

  const onClickChangeBackState = useCallback(() => {
    setCurrentState(TemplateCreateState.SELECT_EMPLOYEE)
  }, [setCurrentState])

  const onClickOpenModalExample = useCallback(() => {
    setIsOpenModalPreview(true)
  }, [])

  const onClickGoToList = useCallback(() => {
    history.push(paths.setForm())
  }, [history])

  const onOpenConfirmButtonClick = useCallback(async () => {
    if (type === TemplateType.KPI) {
      const removeKpiPeriodTemplateUser = await checkDuplicateEmployee(parseFormValue(valuesKpi!))
      const { users = [] } = removeKpiPeriodTemplateUser
      if (users.length > 0) {
        setDuplicateUserList(
          users.map((u) => ({
            employeeId: u.employeeId,
            name: `${u.firstName} ${u.lastName}`,
            avatar: u.avatar,
          })),
        )
        setTempRemoveKpiPeriodTemplateUser(removeKpiPeriodTemplateUser)
        setIsOpenDuplicateEmployeeListModal(true)
        return
      }
    }
    setIsOpenModalConfirm(true)
  }, [checkDuplicateEmployee, type, valuesKpi])

  const onCloseConfirmModal = useCallback(() => {
    setIsOpenModalConfirm(false)
  }, [])

  const onDuplicateEmployeeListOkClick = useCallback(() => {
    change("removeKpiPeriodTemplateUser", {
      kpiPeriodTemplateIds: tempRemoveKpiPeriodTemplateUser?.kpiPeriodTemplateIds,
      userIds: tempRemoveKpiPeriodTemplateUser?.users.map((v) => v.id),
    })

    handleSubmit()

    change("removeKpiPeriodTemplateUser", undefined)
    setIsOpenDuplicateEmployeeListModal(false)
  }, [
    change,
    handleSubmit,
    setIsOpenDuplicateEmployeeListModal,
    tempRemoveKpiPeriodTemplateUser?.kpiPeriodTemplateIds,
    tempRemoveKpiPeriodTemplateUser?.users,
  ])

  const onDuplicateEmployeeListCancelClick = useCallback(() => {
    setIsOpenDuplicateEmployeeListModal(false)
    setDuplicateUserList([])
    setTempRemoveKpiPeriodTemplateUser(undefined)
    change("removeKpiPeriodTemplateUser", undefined)
  }, [change])

  return (
    <>
      {isSuccess && (
        <SuccessDiv>
          <Center>
            <Icon iconName="done" width={320} height={240} />
          </Center>
          <Sarabun type="H3" style={{ marginBottom: "24px" }} color={WHITE}>
            {t(`สร้างแบบฟอร์มสำเร็จแล้ว`)}
          </Sarabun>
          <Sarabun type="H6" style={{ marginBottom: "16px" }} color={WHITE}>
            {t(`แบบฟอร์มนี้จะไม่สามารถแก้ไขได้อีก หากต้องการแก้ไข กรุณาลบและสร้างใหม่ค่ะ`)}
          </Sarabun>
          {/*//TODO plug ปุ่ม ให้กดย้อนไปหน้า dashboard*/}
          <Center>
            <Button
              startIcon={<Icon iconName="squaresFour" width={24} height={24} />}
              width={230}
              height={56}
              backgroundColor={`${SECONDARY_LIGHT}`}
              textColor={`${WHITE}`}
              onClick={onClickGoToList}
            >
              {t(`ย้อนกลับไปยังเมนูหลัก`)}
            </Button>
          </Center>
        </SuccessDiv>
      )}

      <Container>
        <Sarabun type="H4">{t(`ตรวจสอบและยืนยัน`)}</Sarabun>
        {type === TemplateType.KPI ? (
          <TemplateDetail
            isForm={true}
            values={valuesKpi}
            options={options}
            employeeList={employeesPreview?.data}
            pagingResponse={employeesPreview?.paging}
            pageStates={[page, setPage]}
            pageSizeStates={[pageSize, setPageSize]}
            isLoading={isEmployeesPreviewLoading}
          />
        ) : type === TemplateType.ONE_YEAR ? (
          <TemplateDetailOneYear isForm={true} values={valuesOneYear} options={options} />
        ) : (
          <TemplateDetailProbation isForm={true} values={valuesProbation} options={options} />
        )}
      </Container>

      {!isSuccess && (
        <ButtonZone>
          <Button
            buttonType="outlined"
            startIcon={<Icon iconName="caretLeft" width={24} height={24} />}
            onClick={onClickChangeBackState}
            width={200}
          >
            {t(`ย้อนกลับ`)}
          </Button>
          <RowButton>
            <Button buttonType="outlined" width={230} onClick={onClickOpenModalExample}>
              {t(`แสดงตัวอย่างแบบฟอร์ม`)}
            </Button>
            <Button
              onClick={onOpenConfirmButtonClick}
              width={260}
              backgroundColor={`${PRIMARY_MAIN}`}
              isLoading={isSubmitLoading}
            >
              {!isEdit ? t(`ยืนยันสร้างฟอร์ม`) : t(`ยืนยันแก้ไขฟอร์ม`)}
            </Button>
          </RowButton>
        </ButtonZone>
      )}

      {type === TemplateType.KPI && (
        <ModalKpiTemplateExample
          visibleUseState={[isOpenModalPreview, setIsOpenModalPreview]}
          data={{
            calKpi: valuesKpi?.jsonCalKpi !== undefined ? Number(valuesKpi?.jsonCalKpi.cal) : 0,
            calCompany:
              valuesKpi?.jsonCalKpiCompany !== undefined
                ? Number(valuesKpi?.jsonCalKpiCompany.cal)
                : 0,
            calOther:
              valuesKpi?.jsonCalKpiOther !== undefined ? Number(valuesKpi?.jsonCalKpiOther.cal) : 0,
            calBehavior:
              valuesKpi?.jsonCalBehavior !== undefined ? Number(valuesKpi?.jsonCalBehavior.cal) : 0,
          }}
          year={valuesKpi?.year}
          quarter={valuesKpi?.quarter}
          startDate={dayjs(valuesKpi?.startDate).locale("th").format("DD MMMM")}
          endDate={dayjs(valuesKpi?.endDate).locale("th").format("DD MMMM")}
          behaviorTemplateId={
            valuesKpi?.jsonCalBehavior !== undefined
              ? valuesKpi?.jsonCalBehavior.behaviorTemplateId
              : ""
          }
        />
      )}

      {type === TemplateType.ONE_YEAR && (
        <ModalOneYearExample
          visibleUseState={[isOpenModalPreview, setIsOpenModalPreview]}
          behaviorTemplateId={
            valuesOneYear?.jsonCalBehavior !== undefined
              ? valuesOneYear?.jsonCalBehavior.behaviorTemplateId
              : ""
          }
          levelApprove={valuesOneYear?.levelApprove}
          evaluatorMessage={valuesOneYear?.descriptionForMgr}
        />
      )}

      {type === TemplateType.PROBATION && (
        <ModalProbationExample
          visibleUseState={[isOpenModalPreview, setIsOpenModalPreview]}
          seq={2}
          targetScore={valuesProbation?.passValue || 0}
          evaluatorMessage={valuesProbation?.descriptionForMgr || "-"}
          behaviorTemplateId={
            valuesProbation?.calBehavior !== undefined
              ? valuesProbation?.calBehavior.behaviorTemplateId
              : ""
          }
        />
      )}

      <DuplicateEmployeeListModal
        showConfirmModal={isOpenDuplicateEmployeeListModal}
        setShowConfirmModal={setIsOpenDuplicateEmployeeListModal}
        onOk={onDuplicateEmployeeListOkClick}
        onClose={onDuplicateEmployeeListCancelClick}
        employeeList={duplicateEmployeeList}
      />

      <Modal
        visibleUseState={[isOpenModalConfirm, setIsOpenModalConfirm]}
        onOk={() => {
          handleSubmit()
          onCloseConfirmModal()
        }}
        onCancel={onCloseConfirmModal}
      >
        <Sarabun type="H4" style={{ marginBottom: "40px" }}>
          {!isEdit
            ? t(`คุณยืนยันที่จะสร้างแบบฟอร์มหรือไม่`)
            : t(`คุณยืนยันที่จะแก้ไขแบบฟอร์มหรือไม่`)}
        </Sarabun>
      </Modal>
    </>
  )
}

export default CheckAndConfirmState
