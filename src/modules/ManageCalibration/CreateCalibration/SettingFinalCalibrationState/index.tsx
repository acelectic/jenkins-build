import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import dayjs from "dayjs"
import _, { get, map } from "lodash"
import { useCallback, useMemo, useState } from "react"
import { useForm, useFormState } from "react-final-form"
import { useTranslation } from "react-i18next"
import {
  ICalibrationSelectUserType,
  ICreateCalibrateFormValues,
  ISelectUserCalibration,
  IUserCalibrate,
} from ".."
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import ModalSelectEmployees from "../../../../components/ModalSelectEmployees"
import { useSetNormalizeHierarchyOption } from "../../../../components/SelectHierarchyGroup/helper"
import {
  ISelectEmployeeFormSubmitValues,
  ISelectHierarchyGroupFormValues,
} from "../../../../components/SelectHierarchyGroup/interface"
import { IBaseStructureOption } from "../../../../services/group-employee/group-employee-type"
import { useFetchUsersByHierarchyOnlySelected } from "../../../../services/user/user-query"
// import { Company } from "../../../../services/set-form/set-form-type"
import { useVisible } from "../../../../utils/custom-hook"
import CreateCalibrateField, { EnumCalibrateSelectUser } from "../components/CreateCalibrateField"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0 0 0;
  gap: 16px;
  width: 648px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 32px;
`

const SettingFinalCalibrationState = () => {
  const { t } = useTranslation()

  const formState = useFormState<ICreateCalibrateFormValues>()
  const formChange = useForm()

  const [fieldsName, setFieldsName] = useState<string>("")
  const [fieldArrayIndex, setFieldArrayIndex] = useState(0)
  const [selectUserState, setSelectUserState] = useState<EnumCalibrateSelectUser>()
  const modalVisible = useVisible()
  const [showDuplicateUserInCalibrateModal, setShowDuplicateUserInCalibrateModal] = useState(false)
  const [employeeGroups, setEmployeeGroups] = useState<IBaseStructureOption[]>([])

  const {
    mutateAsync: fetchUsersByHierarchyOnlySelected,
    isLoading,
  } = useFetchUsersByHierarchyOnlySelected()
  const { getFilterOptionIds } = useSetNormalizeHierarchyOption()

  const { values: formValues } = formState
  const { finalCalibrateSession: finalCalibrateSessions } = formValues
  const endDate = finalCalibrateSessions?.[0]?.endDate

  const isRequireKpiTransaction = useMemo(() => {
    return selectUserState === EnumCalibrateSelectUser.SUBJECTS ? true : false
  }, [selectUserState])

  const onClickSelect = useCallback(
    (calibrateSelectUser: EnumCalibrateSelectUser, fieldArrayIndex: number, fieldsName: string) => {
      setSelectUserState(calibrateSelectUser)
      setFieldArrayIndex(fieldArrayIndex)
      setFieldsName(fieldsName)
      modalVisible.open()
    },
    [modalVisible],
  )

  // เลือกเฉพาะพนักงานในวงที่ไม่ซ้ำกับพนักงานที่เลือกมาใหม่
  const filterUserNotSelected = useCallback(
    (detailUserCalibrate: ISelectUserCalibration, employeesSelected?: IBaseStructureOption[]) => {
      const userGroups = _.groupBy(employeesSelected, (employee) => employee.id)
      // จัดกลุ่มตามม user id ถ้าพนักงานที่เลือกมายังไม่เคยถูกเลือกจะได้ undefined
      const ownerUserNotDuplicates = detailUserCalibrate.owner.userCalibrate.filter(
        (user) => userGroups[user.id] === undefined,
      )
      const committeesUserNotDuplicates = detailUserCalibrate.committees.userCalibrate.filter(
        (user) => userGroups[user.id] === undefined,
      )
      const hrUserNotDuplicates = detailUserCalibrate.hr.userCalibrate.filter(
        (user) => userGroups[user.id] === undefined,
      )
      const subjectsUserNotDuplicates = detailUserCalibrate.subjects.userCalibrate.filter(
        (user) => userGroups[user.id] === undefined,
      )
      return {
        ownerUserNotDuplicates,
        committeesUserNotDuplicates,
        hrUserNotDuplicates,
        subjectsUserNotDuplicates,
      }
    },
    [],
  )

  // สำหรับเช็คพนักงานในวง calibrate ว่ามีซ้ำกันหรือไม่ภายในวงเดียวกันถ้าซ้ำจะเอาออก
  const onChangeCalibrateUser = useCallback(
    (employeesSelected: IBaseStructureOption[]) => {
      const detailUserCalibrate = finalCalibrateSessions[fieldArrayIndex]
      const {
        ownerUserNotDuplicates,
        committeesUserNotDuplicates,
        hrUserNotDuplicates,
        subjectsUserNotDuplicates,
      } = filterUserNotSelected(detailUserCalibrate /* values?.employeesSelected */)

      const newParams = {
        ...detailUserCalibrate,
        owner: {
          ...detailUserCalibrate.owner,
          userCalibrate: ownerUserNotDuplicates,
        },
        committees: {
          ...detailUserCalibrate.committees,
          userCalibrate: committeesUserNotDuplicates,
        },
        hr: {
          ...detailUserCalibrate.hr,
          userCalibrate: hrUserNotDuplicates,
        },
        subjects: {
          ...detailUserCalibrate.subjects,
          userCalibrate: subjectsUserNotDuplicates,
        },
      } as ISelectUserCalibration

      return newParams
    },
    [fieldArrayIndex, filterUserNotSelected, finalCalibrateSessions],
  )

  // เช็คว่าพนักงานที่เลือกมาซ้ำกันหรือไม่ถ้าซ้ำจะคืน true
  const checkUserIsDuplicate = useCallback(
    (employeesSelected: IBaseStructureOption[]) => {
      // จัดกลุ่มตามม user id ถ้าพนักงานเคยถูกเลือกจะไม่ได้ undefined
      const userGroups = _.groupBy(employeesSelected, (employee) => employee.id)
      const detailUserCalibrate = finalCalibrateSessions[fieldArrayIndex]

      const ownerUserNotDuplicates: IUserCalibrate[] = []
      const committeesUserNotDuplicates: IUserCalibrate[] = []
      const hrUserNotDuplicates: IUserCalibrate[] = []
      const subjectsUserNotDuplicates: IUserCalibrate[] = []

      // เช็คว่า user ที่เลือกมาจาก OWNER,COMMITTEES,SUBJECTS,HR ถ้า user ที่เลือกมาจากช่องไหนก็จะไม่เลือก user ช่องนั้นมาจาก duplicate
      switch (selectUserState) {
        case EnumCalibrateSelectUser.OWNER: {
          selectUserCalibrateCommittees()
          selectUserCalibrateHr()
          selectUserCalibrateSubjects()
          break
        }
        case EnumCalibrateSelectUser.COMMITTEES: {
          selectUserCalibrateOwner()
          selectUserCalibrateHr()
          selectUserCalibrateSubjects()
          break
        }
        case EnumCalibrateSelectUser.HR: {
          selectUserCalibrateOwner()
          selectUserCalibrateCommittees()
          selectUserCalibrateSubjects()
          break
        }
        case EnumCalibrateSelectUser.SUBJECTS: {
          selectUserCalibrateOwner()
          selectUserCalibrateHr()
          selectUserCalibrateCommittees()
          break
        }
        default:
          break
      }

      function selectUserCalibrateOwner() {
        detailUserCalibrate.owner.userCalibrate.forEach((user) => {
          if (userGroups[user.id] !== undefined) {
            ownerUserNotDuplicates.push(...userGroups[user.id])
          }
        })
      }

      function selectUserCalibrateCommittees() {
        detailUserCalibrate.committees.userCalibrate.forEach((user) => {
          if (userGroups[user.id] !== undefined) {
            committeesUserNotDuplicates.push(...userGroups[user.id])
          }
        })
      }

      function selectUserCalibrateHr() {
        detailUserCalibrate.hr.userCalibrate.forEach((user) => {
          if (userGroups[user.id] !== undefined) {
            hrUserNotDuplicates.push(...userGroups[user.id])
          }
        })
      }

      function selectUserCalibrateSubjects() {
        detailUserCalibrate.subjects.userCalibrate.forEach((user) => {
          if (userGroups[user.id] !== undefined) {
            subjectsUserNotDuplicates.push(...userGroups[user.id])
          }
        })
      }

      if (
        ownerUserNotDuplicates.length ||
        committeesUserNotDuplicates.length ||
        hrUserNotDuplicates.length ||
        subjectsUserNotDuplicates.length
      ) {
        return true
      } else {
        return false
      }
    },
    [fieldArrayIndex, finalCalibrateSessions, selectUserState],
  )

  // เช็ค user ใน subject ว่ามีใน subject ของวงย่อยหรือไม่
  const checkUserSubject = useCallback(
    (employeesSelected?: IBaseStructureOption[]) => {
      const userGroups = _.groupBy(employeesSelected, (employee) => employee.id)
      const { subCalibrateSessions } = formState.values
      const newParams = subCalibrateSessions.map((e) => {
        const { subjects } = e
        const subjectsDuplicates: IUserCalibrate[] = e.subjects.userCalibrate.filter(
          (user) => userGroups[user.id] !== undefined,
        )
        return {
          ...e,
          subjects: {
            ...subjects,
            userCalibrate: subjectsDuplicates,
          },
        } as ISelectUserCalibration
      })
      return newParams
    },
    [formState.values],
  )

  // เซ็ต user ที่เลือกจาก modal ลงไปหน้าหลัก
  const onConfirmSelectUser = useCallback(
    async (values: ISelectHierarchyGroupFormValues & ISelectEmployeeFormSubmitValues) => {
      const {
        companySelected,
        jobFunctionSelected,
        divisionSelected,
        subDivisionSelected,
        departmentSelected,
        storeSelected,
        userSelected,
      } = values
      const {
        salaryAdminPlanIds,
        positionLevelIds,
        jobLevelIds,
        jobCodeIds,
        employeeClassificationIds,
        employeeTypes,
      } = getFilterOptionIds(values)
      modalVisible.close()
      try {
        const { data: fetchEmployees } = await fetchUsersByHierarchyOnlySelected({
          companySelected,
          jobFunctionSelected,
          divisionSelected,
          subDivisionSelected,
          departmentSelected,
          storeSelected,
          userSelected,
          startDate: dayjs().tz().startOf("day").format(),
          endDate: dayjs().tz().startOf("day").format(),
          page: 1,
          limit: 1000,
          isRequireKpiTransaction,
          salaryAdminPlanIds,
          positionLevelIds,
          jobLevelIds,
          jobCodeIds,
          employeeClassificationIds,
          employeeTypes,
        })

        const employeesSelected = map(
          fetchEmployees || [],
          (e): IBaseStructureOption => ({
            ...e,
            id: e.id,
            name: [e.prefix + e.firstName, e.lastName, `(EID: ${e.employeeId})`].join(" "),
          }),
        )

        const isDuplicate = checkUserIsDuplicate(employeesSelected)
        if (isDuplicate) {
          setEmployeeGroups(employeesSelected)
          setShowDuplicateUserInCalibrateModal(true)
        } else {
          const newValues: ICalibrationSelectUserType = {
            ...values,
            userCalibrate: employeesSelected,
          }
          const newParams = onChangeCalibrateUser(employeesSelected)
          formChange.change("finalCalibrateSession[0]", newParams)
          formChange.change(fieldsName, newValues)
        }
        if (selectUserState === EnumCalibrateSelectUser.SUBJECTS) {
          const newParams = checkUserSubject(employeesSelected)
          formChange.change("subCalibrateSessions", newParams)
        }
      } catch (error) {
        //
      }
    },
    [
      checkUserIsDuplicate,
      checkUserSubject,
      fetchUsersByHierarchyOnlySelected,
      fieldsName,
      formChange,
      getFilterOptionIds,
      isRequireKpiTransaction,
      modalVisible,
      onChangeCalibrateUser,
      selectUserState,
    ],
  )

  const selectEmployeesFieldName = useMemo(() => {
    const baseFieldName = "finalCalibrateSession[0]"
    const selectEmployeesFieldNameList = []
    switch (selectUserState) {
      case EnumCalibrateSelectUser.OWNER:
        selectEmployeesFieldNameList.push("owner")
        break
      case EnumCalibrateSelectUser.COMMITTEES:
        selectEmployeesFieldNameList.push("committees")
        break
      case EnumCalibrateSelectUser.HR:
        selectEmployeesFieldNameList.push("hr")
        break
      case EnumCalibrateSelectUser.SUBJECTS:
      default:
        selectEmployeesFieldNameList.push("subjects")
        break
    }
    return [baseFieldName, ...selectEmployeesFieldNameList].join(".")
  }, [selectUserState])

  // เช็คว่าเมื่อตอนกดปุ่ม select user มาจากช่องไหนเพื่อคืนข้อความตาม Modal
  const titleModal = useMemo(() => {
    switch (selectUserState) {
      case EnumCalibrateSelectUser.OWNER:
        return "เลือกประธานวง (Owner)"
      case EnumCalibrateSelectUser.COMMITTEES:
        return "เลือกคณะกรรมการ (Committees)"
      case EnumCalibrateSelectUser.HR:
        return "เลือก HR ที่ดูแล"
      default:
        return "พนักงานที่ได้รับการประเมิน (Subjects)"
    }
  }, [selectUserState])

  const onClose = useCallback(() => {
    setShowDuplicateUserInCalibrateModal(false)
  }, [])

  const onConfirmSelectDuplicateUser = useCallback(() => {
    const fieldValues = get(formState.values || {}, fieldsName, {})
    const newValues: ICalibrationSelectUserType = {
      ...fieldValues,
      userCalibrate:
        employeeGroups || [] /* employeeGroup?.employeesSelected as IUserCalibrate[] */,
      companies: [] /* employeeGroup?.companies as Company[] */,
    }
    const newParams = onChangeCalibrateUser(employeeGroups)
    formChange.change("finalCalibrateSession[0]", newParams)
    formChange.change(fieldsName, newValues)
    setShowDuplicateUserInCalibrateModal(false)
  }, [employeeGroups, fieldsName, formChange, formState.values, onChangeCalibrateUser])

  return (
    <>
      <Sarabun type="H4">{t("ตั้งค่าวงปรับเทียบผลงานใหญ่")}</Sarabun>
      <Box height={32} />
      <CreateCalibrateField
        onClickSelectUser={onClickSelect}
        fieldName={"finalCalibrateSession"}
        isLoading={isLoading}
      />
      <ModalSelectEmployees
        fieldName={selectEmployeesFieldName}
        title={titleModal}
        description={
          selectUserState === EnumCalibrateSelectUser.OWNER ? "(เลือกได้ 1 คน)" : undefined
        }
        visible={modalVisible.visible}
        onClose={modalVisible.close}
        onConfirm={onConfirmSelectUser}
        selectedLimit={selectUserState === EnumCalibrateSelectUser.OWNER ? 1 : undefined}
        isRequireKpiTransaction={isRequireKpiTransaction}
        limitMaxEmployeesSelect={1000}
        isRequired={selectUserState !== EnumCalibrateSelectUser.COMMITTEES ? true : false}
        endDate={dayjs(endDate).isValid() ? dayjs(endDate) : undefined}
      />
      <Modal
        visibleUseState={[showDuplicateUserInCalibrateModal, setShowDuplicateUserInCalibrateModal]}
        closeOnClickOutside={false}
        showCancelButton={false}
        showCloseIcon
        onCancel={onClose}
        onClose={onClose}
        onOk={onConfirmSelectDuplicateUser}
        onOkText={"ยืนยัน"}
      >
        <Body>
          <Sarabun type="H4">{t(`ยืนยันการเปลี่ยนหน้าที่พนักงานใช่หรือไม่`)}</Sarabun>
          <Sarabun type="Body2">
            {t(
              `ในวงปรับเทียบมีพนักงานนี้อยู่ในหน้าที่อื่นอยู่แล้ว คุณต้องการยืนยันที่จะเปลี่ยนใช่หรือไม่`,
            )}
          </Sarabun>
        </Body>
      </Modal>
    </>
  )
}

export default SettingFinalCalibrationState
