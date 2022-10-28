import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import dayjs from "dayjs"
import _, { Dictionary, first, map } from "lodash"
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
import { useVisible } from "../../../../utils/custom-hook"
import CreateCalibrateField, { EnumCalibrateSelectUser } from "../components/CreateCalibrateField"

const BodyStyled = styled.div`
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

const SettingSubCalibrationState = () => {
  const { t } = useTranslation()

  const formState = useFormState<ICreateCalibrateFormValues>()
  const formChange = useForm()

  const [fieldsName, setFieldsName] = useState<string>("")
  const [selectUserState, setSelectUserState] = useState<EnumCalibrateSelectUser>()
  const [fieldArrayIndex, setFieldArrayIndex] = useState(0)
  const [showDuplicateUserInCalibrateModal, setShowDuplicateUserInCalibrateModal] = useState(false)
  const [showDuplicateSubjectUserModal, setShowDuplicateSubjectUserModal] = useState(false)
  const [duplicateSubjectUsers, setDuplicateSubjectUsers] = useState<ISelectUserCalibration[]>()

  const [userSubjects, setUserSubjects] = useState<ICalibrationSelectUserType>()

  const modalVisible = useVisible()
  const {
    mutateAsync: fetchUsersByHierarchyOnlySelected,
    isLoading,
  } = useFetchUsersByHierarchyOnlySelected()
  const { getFilterOptionIds } = useSetNormalizeHierarchyOption()

  const { values: fromValues } = formState
  const { subCalibrateSessions, finalCalibrateSession: finalCalibrateSessions } = fromValues
  const endDate = finalCalibrateSessions?.[fieldArrayIndex]?.endDate

  const isRequireKpiTransaction = useMemo(() => {
    return selectUserState === EnumCalibrateSelectUser.SUBJECTS ? true : false
  }, [selectUserState])

  const scopeUserIds = useMemo(() => {
    const userIds = first(finalCalibrateSessions)?.subjects.userCalibrate.map((user) => user.id)
    return userIds
  }, [finalCalibrateSessions])

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
    (
      detailUserCalibrate: ISelectUserCalibration,
      userGroups: Dictionary<[IBaseStructureOption, ...IBaseStructureOption[]]>,
    ) => {
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
    (userGroups: Dictionary<[IBaseStructureOption, ...IBaseStructureOption[]]>) => {
      const detailUserCalibrate = subCalibrateSessions[fieldArrayIndex]
      const {
        committeesUserNotDuplicates,
        hrUserNotDuplicates,
        ownerUserNotDuplicates,
        subjectsUserNotDuplicates,
      } = filterUserNotSelected(detailUserCalibrate, userGroups)

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
    [fieldArrayIndex, filterUserNotSelected, subCalibrateSessions],
  )

  // เช็คว่าพนักงานที่เลือกมาซ้ำกันหรือไม่ถ้าซ้ำจะคืน true
  const checkUserIsDuplicate = useCallback(
    (employeesSelected: IBaseStructureOption[]) => {
      const userGroups = _.groupBy(employeesSelected, (employee) => employee.id)
      const detailUserCalibrate = subCalibrateSessions[fieldArrayIndex]
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

      // จัดกลุ่มตามม user id ถ้าพนักงานเคยถูกเลือกจะไม่ได้ undefined
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
    [fieldArrayIndex, selectUserState, subCalibrateSessions],
  )

  // หาพนักงานที่ไม่ซ้ำกันในวงย่อยกับพนักงานที่เลือกมาใหม่
  const findSubCalibrateNotDuplicates = useCallback(
    (employeesSelected: IBaseStructureOption[]) => {
      // จัดกลุ่มตาม id พนักงานที่เลือกมาจาก modal เพื่อนำไปกรองหาพนักงานที่เลือกใน subject ว่ามีพนักงานซ้ำกันหรือไม่
      const userGroups = _.groupBy(employeesSelected, (employee) => employee.id)
      let isDuplicateSelectUser = false
      let isDuplicateSubject = false
      // เวลาเลือกพนักงานมาจะทำการเช็คว่ามีพนักงานซ้ำกันหรือไม่
      const subCalibrateSessionsNotDuplicates = subCalibrateSessions.map(
        (subCalibrateSession, index) => {
          // ถ้า array index ของ subCalibrateSessions ตรงกับช่องที่เลือกพนักงงานมาจะเช็คด้วยว่า มีพนักงานซ้ำกันภายในหรือไม่
          // ถ้าไม่ตรงกันจะเช็คแค่ subjects ทั้งหมดว่ามีพนักงานซ้ำกันหรือไม่

          if (index === fieldArrayIndex) {
            isDuplicateSelectUser = checkUserIsDuplicate(employeesSelected)
            const newValue = onChangeCalibrateUser(userGroups)
            return newValue
          } else {
            // หา user ที่ไม่ซ้ำกันเพื่อไปเซ็ตลง value
            const subjectsNotDuplicates: IUserCalibrate[] = subCalibrateSession.subjects.userCalibrate.filter(
              (o) => userGroups[o.id] === undefined,
            )

            // หา user ที่เลือกมาใหม่ว่าซ้ำกันไหม
            const subjectsDuplicates: IUserCalibrate[] = subCalibrateSession.subjects.userCalibrate.filter(
              (o) => userGroups[o.id] !== undefined,
            )
            if (subjectsDuplicates.length) {
              isDuplicateSubject = true
            }

            return {
              ...subCalibrateSession,
              subjects: {
                ...subCalibrateSession.subjects,
                userCalibrate: subjectsNotDuplicates,
              },
            } as ISelectUserCalibration
          }
        },
      )
      return { subCalibrateSessionsNotDuplicates, isDuplicateSelectUser, isDuplicateSubject }
    },
    [checkUserIsDuplicate, fieldArrayIndex, onChangeCalibrateUser, subCalibrateSessions],
  )

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
          scopeUserIds:
            selectUserState === EnumCalibrateSelectUser.SUBJECTS ? scopeUserIds : undefined,
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
        const {
          isDuplicateSelectUser,
          isDuplicateSubject,
          subCalibrateSessionsNotDuplicates,
        } = findSubCalibrateNotDuplicates(employeesSelected)

        const newValues: ICalibrationSelectUserType = {
          ...values,
          userCalibrate: employeesSelected,
        }
        // ถ้า duplicateSubject เป็น true คือ user ที่เลือกใน subject นั้นซ้ำกับวงย่อยอื่น
        // ถ้า duplicateSelectUser เป็น true คือ user ที่เลือกภายในวงย่อยนั้นซ้ำกัน
        if (isDuplicateSubject) {
          setDuplicateSubjectUsers(subCalibrateSessionsNotDuplicates)
          setUserSubjects(newValues)
          setShowDuplicateSubjectUserModal(true)
        } else if (isDuplicateSelectUser) {
          setDuplicateSubjectUsers(subCalibrateSessionsNotDuplicates)
          setUserSubjects(newValues)
          setShowDuplicateUserInCalibrateModal(true)
        } else {
          //เซ็ตพนักงานที่มี subject ไม่ซ้ำกัน
          formChange.change("subCalibrateSessions", subCalibrateSessionsNotDuplicates)
          //เซ็ตพนักงานที่เลือกจาก modal
          formChange.change(fieldsName, newValues)
        }
        //setIsOpenModal(false)
      } catch (error) {
        //
      }
    },
    [
      fetchUsersByHierarchyOnlySelected,
      fieldsName,
      findSubCalibrateNotDuplicates,
      formChange,
      getFilterOptionIds,
      isRequireKpiTransaction,
      modalVisible,
      scopeUserIds,
      selectUserState,
    ],
  )

  const selectEmployeesFieldName = useMemo(() => {
    const baseFieldName = `subCalibrateSessions[${fieldArrayIndex}]`
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
  }, [fieldArrayIndex, selectUserState])

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

  const onConfirmShowDuplicateSubjectUser = useCallback(() => {
    formChange.change("subCalibrateSessions", duplicateSubjectUsers)
    formChange.change(fieldsName, userSubjects)
    setShowDuplicateSubjectUserModal(false)
  }, [duplicateSubjectUsers, fieldsName, formChange, userSubjects])

  const onCloseShowDuplicateSubjectUser = useCallback(() => {
    setShowDuplicateSubjectUserModal(false)
  }, [])

  const onConfirmDuplicateUserInCalibrate = useCallback(() => {
    formChange.change("subCalibrateSessions", duplicateSubjectUsers)
    formChange.change(fieldsName, userSubjects)
    setShowDuplicateUserInCalibrateModal(false)
  }, [duplicateSubjectUsers, fieldsName, formChange, userSubjects])

  return (
    <>
      <Sarabun type="H4">{t("ตั้งค่าวงปรับเทียบผลงานย่อย")}</Sarabun>
      <Box height={32} />

      <CreateCalibrateField
        fieldName="subCalibrateSessions"
        onClickSelectUser={onClickSelect}
        isShowAddCalibrateButton={true}
        isSubCalibrate={true}
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
        scopeUserIds={
          selectUserState === EnumCalibrateSelectUser.SUBJECTS ? scopeUserIds : undefined
        }
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
        //showOkButton={FormatColorReset}
        onCancel={onClose}
        onClose={onClose}
        onOk={onConfirmDuplicateUserInCalibrate}
        onOkText={"ยืนยัน"}
      >
        <BodyStyled>
          <Sarabun type="H4">{t(`ยืนยันการเปลี่ยนหน้าที่พนักงานใช่หรือไม่`)}</Sarabun>
          <Sarabun type="Body2">
            {t(
              `ในวงปรับเทียบมีพนักงานนี้อยู่ในหน้าที่อื่นอยู่แล้ว คุณต้องการยืนยันที่จะเปลี่ยนใช่หรือไม่`,
            )}
          </Sarabun>
        </BodyStyled>
      </Modal>
      <Modal
        visibleUseState={[showDuplicateSubjectUserModal, setShowDuplicateSubjectUserModal]}
        closeOnClickOutside={false}
        showCancelButton={false}
        showCloseIcon
        //showOkButton={FormatColorReset}
        onCancel={onCloseShowDuplicateSubjectUser}
        onClose={onCloseShowDuplicateSubjectUser}
        onOk={onConfirmShowDuplicateSubjectUser}
        onOkText={"ยืนยัน"}
      >
        <BodyStyled>
          <Sarabun type="H4">{t(`ยืนยันการเปลี่ยนวงปรับเทียบให้กับพนักงานใช่หรือไม่`)}</Sarabun>
          <Sarabun type="Body2">
            {t(
              `มีพนักงานที่คุณเลือกอยู่ในวงปรับเทียบย่อยอื่นแล้ว ยืนยันที่ต้องการเปลี่ยนใช่หรือไม่`,
            )}
          </Sarabun>
        </BodyStyled>
      </Modal>
    </>
  )
}

export default SettingSubCalibrationState
