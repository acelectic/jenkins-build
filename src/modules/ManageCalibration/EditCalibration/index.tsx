import Box from "@mui/material/Box"

import { useCallback, useMemo, useState } from "react"
import { Form } from "react-final-form"
import { useTranslation } from "react-i18next"
import arrayMutators from "final-form-arrays"
import Card from "../../../components/common/Card"
import Button from "../../../components/common/Button"
import { first } from "lodash"
import {
  useCalibrateSessionCopyAndEdit,
  useEditCalibrateSession,
} from "../../../services/manage-calibration/manage-calibration-query"
import {
  CreateCalibrateSessionBody,
  CreateCalibrateSessionParams,
  ICreateCalibrateSessionResponse,
  ICalibrateSessionDuplicateUser,
  IFinalCalibrateSession,
} from "../../../services/manage-calibration/manage-calibration-type"
import CalibrateEmployeeListModal, { EmployeeList } from "../Component/CalibrateEmployeeListModal"
import _ from "lodash"
import dayjs from "dayjs"
import { useSnackbar } from "../../../utils/custom-hook"
import {
  ICalibrationSelectUserType,
  ICreateCalibrateFormValues,
  IUserCalibrate,
} from "../CreateCalibration"
import HeaderCalibrateCard from "../CreateCalibration/HeaderCalibrateCard"
import SuccessCalibrateCard from "../CreateCalibration/SuccessCalibrateCard"
import SettingFinalCalibrationState from "../CreateCalibration/SettingFinalCalibrationState"
import SettingSubCalibrationState from "../CreateCalibration/SettingSubCalibrationState"
import { useRouter } from "../../../utils/helper"
import LoadingLayout from "../../../components/common/LoadingLayout"
import paths from "../../../constants/paths"
import { v4 as uuidv4 } from "uuid"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import styled from "@emotion/styled"
import { CalibrationSettingState } from "../../../services/enum-typed"
import { omitSelectEmployeeOptionValues } from "../CreateCalibration/CalibrationField"
import { getCalibrateInitialFormValues } from "../helper"

const ButtonNextState = styled("div")({
  display: "flex",
  justifyContent: "end",
})

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 434px;
  text-align: center;
  margin: 0 0 24px 0;
`

const EditCalibration = () => {
  const { snackbar } = useSnackbar()
  const { t } = useTranslation()
  const { query, push } = useRouter<{ calibrationId: string }>()
  const { calibrationId } = query

  const [calibrationState, setCalibrationState] = useState<CalibrationSettingState>(
    CalibrationSettingState.SETTING_FINAL_CALIBRATION,
  )
  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [showDuplicateUsers, setShowDuplicateUsers] = useState(false)
  const [duplicateUsers, setDuplicateUsers] = useState<ICalibrateSessionDuplicateUser[]>([])
  const [showUserSubjectFinalCalibrate, setShowUserSubjectFinalCalibrate] = useState(false)
  const [userSubjectFinalCalibrates, setUserSubjectFinalCalibrates] = useState<IUserCalibrate[]>([])
  const [finalCalibrateSession, setFinalCalibrateSession] = useState<IFinalCalibrateSession>()
  const [subCalibrateSessions, setSubCalibrateSessions] = useState<IFinalCalibrateSession[]>([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [updateCalibrateParams, setUpdateCalibrateParams] = useState<CreateCalibrateSessionParams>()

  const { data: calibrateResponse, isLoading } = useCalibrateSessionCopyAndEdit(calibrationId)
  const {
    mutate: editCalibrateSession,
    isLoading: isLoadingEditCalibrate,
  } = useEditCalibrateSession(calibrationId)

  const initialFormValues = useMemo((): ICreateCalibrateFormValues => {
    return getCalibrateInitialFormValues(calibrateResponse)
  }, [calibrateResponse])

  const idemKey = useMemo(() => {
    const key = uuidv4()
    return key
  }, [])

  // เอาเฉพาะ UserSubjects ที่อยู่ในวง final และ sub ของ calibrate
  const onGetUserSubjectsInFinalAndSub = useCallback((values: ICreateCalibrateFormValues) => {
    const { subjects: finalCalibrateSessionSubjects } = first(values.finalCalibrateSession) || {}
    const subCalibrateSessionsSubjects = values.subCalibrateSessions.reduce(
      (acc: IUserCalibrate[], subCalibrateSession) => {
        const { subjects } = subCalibrateSession
        acc.push(...subjects.userCalibrate)
        return acc
      },
      [],
    )
    return { finalCalibrateSessionSubjects, subCalibrateSessionsSubjects }
  }, [])

  // หา userSubjects ที่ไม่ตรงกันในวง final และ sub
  const userSubjectsNotInFinal = useCallback(
    (
      finalCalibrateSubjects: ICalibrationSelectUserType,
      subCalibrateSubjects: IUserCalibrate[],
    ) => {
      const groupSubCalibrateSessionsSubjects = _.groupBy(
        subCalibrateSubjects,
        (subject) => subject.id,
      )
      const userNotInFinalList = finalCalibrateSubjects?.userCalibrate.filter(
        (subject) => groupSubCalibrateSessionsSubjects[subject.id] === undefined,
      )
      return { userNotInFinalList }
    },
    [],
  )

  // สำหรับปั่นของไว้ตอนส่งให้ api สร้างวง calibrate
  const updateParams = useCallback(
    (values: ICreateCalibrateFormValues) => {
      const { finalCalibrateSession: finalCalibrateSessions, subCalibrateSessions } = values
      const {
        nameCalibration: finalNameCalibrateSession,
        detailCalibration,
        dateCalibration,
        committees: committeesFinalCalibrateSession,
        hr: hrFinalCalibrateSession,
        owner: ownerFinalCalibrateSession,
        subjects: subjectsFinalCalibrateSession,
        formType,
        quarter,
        year,
        startDate,
        endDate,
        calibrationState,
        id,
      } = first(finalCalibrateSessions) || {}
      const removeCalibratedUserIds: string[] = []
      duplicateUsers.forEach((duplicateUser) => {
        removeCalibratedUserIds.push(...duplicateUser.calibratedUserIds)
      })
      setShowDuplicateUsers(false)
      const { userCalibrate: ownerFinalUserCalibrates, ...ownerFinalValues } =
        ownerFinalCalibrateSession || {}
      const { userCalibrate: committeesFinalUserCalibrates, ...committeesFinalValues } =
        committeesFinalCalibrateSession || {}
      const { userCalibrate: hrFinalUserCalibrates, ...hrFinalValues } =
        hrFinalCalibrateSession || {}
      const { userCalibrate: subjectsFinalUserCalibrates, ...subjectsFinalValues } =
        subjectsFinalCalibrateSession || {}

      //ปั่นของยิง api ตอนนี้ยังไม่ได้ทำ modal เลือก user จึง hard code ส่วนที่เป็น Id ไว้ก่อน
      const updateParams: CreateCalibrateSessionParams = {
        idemKey: idemKey,
        removeCalibratedUserIds: removeCalibratedUserIds,
        finalCalibrateSession: {
          id: id,
          name: finalNameCalibrateSession || "",
          description: detailCalibration,

          sessionStartDate: dateCalibration
            ? dayjs(dateCalibration).format("YYYY-MM-DD")
            : undefined,
          formType: formType!,
          quarter: quarter || undefined,
          year: year || dayjs().format("YYYY"),
          quarterStartDate: dayjs(startDate).format("YYYY-MM-DD"),
          quarterEndDate: dayjs(endDate).format("YYYY-MM-DD"),
          calibrationState: calibrationState,
          owner: {
            ...omitSelectEmployeeOptionValues(ownerFinalValues),
            userId: first(ownerFinalUserCalibrates)?.id!,
          },
          committee: committeesFinalUserCalibrates?.length
            ? {
                ...omitSelectEmployeeOptionValues(committeesFinalValues),
                userIds: committeesFinalUserCalibrates?.map((committee) => committee.id) || [],
              }
            : undefined,
          hr: {
            ...omitSelectEmployeeOptionValues(hrFinalValues),
            userIds: hrFinalUserCalibrates?.map((hr) => hr.id) || [],
          },
          subject: {
            ...omitSelectEmployeeOptionValues(subjectsFinalValues),
            userIds: subjectsFinalUserCalibrates?.map((subject) => subject.id) || [],
          },
        },
        subCalibrateSessions: subCalibrateSessions.map(
          (subCalibrateSession): CreateCalibrateSessionBody => {
            const {
              committees,
              detailCalibration,
              hr,
              nameCalibration,
              owner,
              subjects,
              dateCalibration,
              calibrationState,
              id,
              endDate,
              formType,
              quarter,
              startDate,
              year,
            } = subCalibrateSession

            const { userCalibrate: ownerUserCalibrates, ...ownerValue } = owner
            const { userCalibrate: committeesUserCalibrates, ...committeesValue } = committees
            const { userCalibrate: hrUserCalibrates, ...hrValue } = hr
            const { userCalibrate: subjectsUserCalibrates, ...subjectsValue } = subjects
            return {
              id: id,
              calibrationState: calibrationState,
              name: nameCalibration,
              sessionStartDate: dateCalibration
                ? dayjs(dateCalibration).format("YYYY-MM-DD")
                : undefined,
              formType: formType!,
              quarter: quarter || undefined,
              year: year || dayjs().format("YYYY"),
              quarterStartDate: dayjs(startDate).format("YYYY-MM-DD"),
              quarterEndDate: dayjs(endDate).format("YYYY-MM-DD"),

              description: detailCalibration,
              owner: {
                ...omitSelectEmployeeOptionValues(ownerValue),
                userId: first(ownerUserCalibrates)?.id!,
              },
              committee: committeesUserCalibrates.length
                ? {
                    ...omitSelectEmployeeOptionValues(committeesValue),
                    userIds: committeesUserCalibrates.map((committee) => committee.id),
                  }
                : undefined,
              hr: {
                ...omitSelectEmployeeOptionValues(hrValue),
                userIds: hrUserCalibrates.map((hr) => hr.id),
              },
              subject: {
                ...omitSelectEmployeeOptionValues(subjectsValue),
                userIds: subjectsUserCalibrates.map((subject) => subject.id),
              },
            }
          },
        ),
      }
      return updateParams
    },
    [duplicateUsers, idemKey],
  )

  const onSubmit = useCallback(
    (values: ICreateCalibrateFormValues) => {
      if (calibrationState === CalibrationSettingState.SETTING_FINAL_CALIBRATION) {
        setCalibrationState(CalibrationSettingState.SETTING_SUB_CALIBRATION)
      } else {
        const {
          finalCalibrateSessionSubjects,
          subCalibrateSessionsSubjects,
        } = onGetUserSubjectsInFinalAndSub(values)

        // เช็คว่าจำนวน subject ใน sub calibrate มี user รวมกันเท่ากับ final calibrate หรือไม่
        // ถ้าไม่เท่ากันจะหาคนที่ขาดไปของ final calibrate ถ้าเท่ากันจะสามารถสร้างได้
        const isSubjectNotEqual =
          finalCalibrateSessionSubjects?.userCalibrate.length !==
            subCalibrateSessionsSubjects.length &&
          calibrationState === CalibrationSettingState.SETTING_SUB_CALIBRATION
        const isHasSubCalibrate = !!values.subCalibrateSessions.length

        if (isSubjectNotEqual && isHasSubCalibrate) {
          const { userNotInFinalList } = userSubjectsNotInFinal(
            finalCalibrateSessionSubjects!,
            subCalibrateSessionsSubjects,
          )
          setShowUserSubjectFinalCalibrate(true)
          setUserSubjectFinalCalibrates(userNotInFinalList || [])
        } else {
          const params = updateParams(values)
          setUpdateCalibrateParams(params)
          setShowConfirmModal(true)
        }
        //  setShowSuccessCard(true)
      }
    },
    [calibrationState, onGetUserSubjectsInFinalAndSub, updateParams, userSubjectsNotInFinal],
  )

  const onConfirmUpdateCalibrate = useCallback(() => {
    editCalibrateSession(updateCalibrateParams!, {
      onSuccess: (response: ICreateCalibrateSessionResponse) => {
        // ถ้า api คืน response duplicateUsers มาให้จะแสดง modal แจ้งเตือนพนักงานซ้ำ
        // ถ้าคืน response มาจะแสดงข้อความสำเร็จ
        if (response.duplicateUsers) {
          setDuplicateUsers(response.duplicateUsers)
          setShowDuplicateUsers(true)
        } else {
          const { finalCalibrateSession, subCalibrateSessions } = response
          setShowSuccessCard(true)
          setFinalCalibrateSession(finalCalibrateSession)
          setSubCalibrateSessions(subCalibrateSessions)
          snackbar({ message: "Success", type: "success" })
        }
        setShowConfirmModal(false)
      },
      onError: (error: any) => {
        setShowConfirmModal(false)
        snackbar({ message: error.message, type: "error" })
      },
    })
  }, [editCalibrateSession, snackbar, updateCalibrateParams])

  const onCloseUpdateCalibrate = useCallback(() => {
    setShowConfirmModal(false)
  }, [])

  const onClickBack = useCallback(() => {
    if (calibrationState === CalibrationSettingState.SETTING_SUB_CALIBRATION && !showSuccessCard) {
      setCalibrationState(CalibrationSettingState.SETTING_FINAL_CALIBRATION)
    } else {
      push(paths.manageCalibration())
    }
  }, [calibrationState, push, showSuccessCard])

  const employeeList = useMemo(() => {
    const userList = duplicateUsers.map(
      (user): EmployeeList => {
        const { prefix, firstName, lastName, employeeId } = user
        return {
          name: `${prefix}${firstName} ${lastName}`,
          eId: employeeId,
        }
      },
    )
    return userList
  }, [duplicateUsers])

  const employeeFinalSubjectList = useMemo(() => {
    const userList = userSubjectFinalCalibrates.map(
      (user): EmployeeList => {
        const { name } = user
        return {
          name: name,
          eId: "",
        }
      },
    )
    return userList
  }, [userSubjectFinalCalibrates])

  const onCloseShowDuplicateUsers = useCallback(() => {
    setShowDuplicateUsers(false)
  }, [])

  const onCloseShowFinalSubject = useCallback(() => {
    setShowUserSubjectFinalCalibrate(false)
  }, [])

  const onConfirmEdit = useCallback(() => {
    setShowSuccessCard(false)
    setCalibrationState(CalibrationSettingState.SETTING_FINAL_CALIBRATION)
  }, [])

  return (
    <>
      <HeaderCalibrateCard calibrationSettingState={calibrationState} onClickBack={onClickBack} />

      {/* พื้นที่สำหรับแสดงข้อความเมื่อสร้างวง Calibration สำเร็จ */}
      {showSuccessCard ? (
        <SuccessCalibrateCard
          title={"แก้ไขวงปรับเทียบผลงานแล้ว"}
          finalCalibrateSession={finalCalibrateSession}
          subCalibrateSessions={subCalibrateSessions}
          onConfirmEdit={onConfirmEdit}
        />
      ) : (
        <LoadingLayout isLoading={isLoading}>
          <Box height={24} />
          <Form<ICreateCalibrateFormValues>
            onSubmit={onSubmit}
            initialValues={initialFormValues}
            mutators={{
              ...arrayMutators,
            }}
          >
            {({ handleSubmit, invalid }) => {
              return (
                <LoadingLayout isLoading={isLoadingEditCalibrate}>
                  <Card>
                    {calibrationState === CalibrationSettingState.SETTING_FINAL_CALIBRATION && (
                      <SettingFinalCalibrationState />
                    )}
                    {calibrationState === CalibrationSettingState.SETTING_SUB_CALIBRATION && (
                      <SettingSubCalibrationState />
                    )}
                  </Card>
                  <Box height={32} />
                  <ButtonNextState>
                    <Button onClick={handleSubmit} isDisabledButton={invalid}>
                      {calibrationState === CalibrationSettingState.SETTING_FINAL_CALIBRATION
                        ? t("ไปตั้งค่าปรับเทียบวงย่อย​")
                        : t("แก้ไขวงปรับเทียบผลงาน")}
                    </Button>
                  </ButtonNextState>
                  <CalibrateEmployeeListModal
                    showConfirmModal={showDuplicateUsers}
                    setShowConfirmModal={setShowDuplicateUsers}
                    employeeList={employeeList}
                    onClose={onCloseShowDuplicateUsers}
                    onOk={handleSubmit}
                  />
                  <CalibrateEmployeeListModal
                    showConfirmModal={showUserSubjectFinalCalibrate}
                    setShowConfirmModal={setShowUserSubjectFinalCalibrate}
                    employeeList={employeeFinalSubjectList}
                    onOk={onCloseShowFinalSubject}
                    onClose={onCloseShowFinalSubject}
                    isAvailableToConfirm={false}
                  />
                  <Modal
                    visibleUseState={[showConfirmModal, setShowConfirmModal]}
                    closeOnClickOutside={false}
                    showCancelButton
                    showCloseIcon
                    showOkButton
                    onCancel={onCloseUpdateCalibrate}
                    onClose={onCloseUpdateCalibrate}
                    onOk={onConfirmUpdateCalibrate}
                  >
                    <Body>
                      <Sarabun
                        style={{
                          margin: "0 0 16px 0",
                        }}
                        type="H4"
                      >
                        {`คุณยืนยันที่จะแก้ไขวงปรับเทียบนี้หรือไม่?`}
                      </Sarabun>
                    </Body>
                  </Modal>
                </LoadingLayout>
              )
            }}
          </Form>
        </LoadingLayout>
      )}
    </>
  )
}

export default EditCalibration
