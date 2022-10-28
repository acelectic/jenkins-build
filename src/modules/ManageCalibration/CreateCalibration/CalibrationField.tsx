import { Form } from "react-final-form"
import { ICalibrationSelectUserType, ICreateCalibrateFormValues, IUserCalibrate } from "."
import arrayMutators from "final-form-arrays"
import Card from "../../../components/common/Card"
import SettingFinalCalibrationState from "./SettingFinalCalibrationState"
import SettingSubCalibrationState from "./SettingSubCalibrationState"
import Box from "@mui/material/Box"
import Button from "../../../components/common/Button"
import styled from "@emotion/styled"
import { useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import CalibrateEmployeeListModal, { EmployeeList } from "../Component/CalibrateEmployeeListModal"
import {
  CreateCalibrateSessionBody,
  CreateCalibrateSessionParams,
  ICreateCalibrateSessionResponse,
  ICalibrateSessionDuplicateUser,
  IFinalCalibrateSession,
} from "../../../services/manage-calibration/manage-calibration-type"
import { useSnackbar } from "../../../utils/custom-hook"
import { first, omitBy } from "lodash"
import _ from "lodash"
import dayjs from "dayjs"
import HeaderCalibrateCard from "./HeaderCalibrateCard"
import SuccessCalibrateCard from "./SuccessCalibrateCard"
import { useRouter } from "../../../utils/helper"
import { useCreateCalibrateSession } from "../../../services/manage-calibration/manage-calibration-query"
import paths from "../../../constants/paths"
import { v4 as uuidv4 } from "uuid"
import LoadingLayout from "../../../components/common/LoadingLayout"
import { CalibrationSettingState } from "../../../services/enum-typed"
import { set } from "lodash"

export const omitSelectEmployeeOptionValues = (data: Record<string, any>) => {
  return omitBy(data, (value, key) => key.endsWith("Options"))
}

const ButtonNextState = styled.div({
  display: "flex",
  justifyContent: "end",
})

const CalibrateDetailAreaStyled = styled.div({
  marginTop: 24,
})
type ICalibrationFieldProps = {
  initialFormValues: ICreateCalibrateFormValues
}

const CalibrationField = (props: ICalibrationFieldProps) => {
  const { initialFormValues } = props
  const { t } = useTranslation()
  const { snackbar } = useSnackbar()
  const { push } = useRouter()
  const idemKey = useMemo(() => uuidv4(), [])

  const [showSuccessCard, setShowSuccessCard] = useState(false)
  const [calibrationSettingState, setCalibrationSettingState] = useState<CalibrationSettingState>(
    CalibrationSettingState.SETTING_FINAL_CALIBRATION,
  )
  const [showDuplicateUsers, setShowDuplicateUsers] = useState(false)
  const [duplicateUsers, setDuplicateUsers] = useState<ICalibrateSessionDuplicateUser[]>([])
  const [showUserSubjectFinalCalibrate, setShowUserSubjectFinalCalibrate] = useState(false)
  const [userSubjectFinalCalibrates, setUserSubjectFinalCalibrates] = useState<IUserCalibrate[]>([])

  const [finalCalibrateSession, setFinalCalibrateSession] = useState<IFinalCalibrateSession>()
  const [subCalibrateSessions, setSubCalibrateSessions] = useState<IFinalCalibrateSession[]>([])

  const employeeDuplicateList = useMemo(() => {
    return duplicateUsers.map(
      (user): EmployeeList => {
        const { prefix, firstName, lastName, employeeId } = user
        return {
          name: `${prefix}${firstName} ${lastName}`,
          eId: employeeId,
        }
      },
    )
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

  const { mutate: createCalibrateSession, isLoading } = useCreateCalibrateSession()

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
  const createParams = useCallback(
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
      const createParam: CreateCalibrateSessionParams = {
        removeCalibratedUserIds: removeCalibratedUserIds,
        finalCalibrateSession: {
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
        idemKey: idemKey,
      }
      return createParam
    },
    [duplicateUsers, idemKey],
  )

  const onSubmit = useCallback(
    (values: ICreateCalibrateFormValues) => {
      if (calibrationSettingState === CalibrationSettingState.SETTING_FINAL_CALIBRATION) {
        setCalibrationSettingState(CalibrationSettingState.SETTING_SUB_CALIBRATION)
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
          calibrationSettingState === CalibrationSettingState.SETTING_SUB_CALIBRATION
        const isHasSubCalibrate = !!values.subCalibrateSessions.length
        if (isSubjectNotEqual && isHasSubCalibrate) {
          const { userNotInFinalList } = userSubjectsNotInFinal(
            finalCalibrateSessionSubjects!,
            subCalibrateSessionsSubjects,
          )
          setShowUserSubjectFinalCalibrate(true)
          setUserSubjectFinalCalibrates(userNotInFinalList || [])
        } else {
          const params: CreateCalibrateSessionParams = createParams(values)
          createCalibrateSession(params, {
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
            },
            onError: (error) => {
              snackbar({ message: error.message, type: "error" })
            },
          })
        }
        //  setShowSuccessCard(true)
      }
    },
    [
      calibrationSettingState,
      createCalibrateSession,
      createParams,
      onGetUserSubjectsInFinalAndSub,
      snackbar,
      userSubjectsNotInFinal,
    ],
  )

  const onCloseShowDuplicateUsers = useCallback(() => {
    setShowDuplicateUsers(false)
  }, [])

  const onCloseShowFinalSubject = useCallback(() => {
    setShowUserSubjectFinalCalibrate(false)
  }, [])

  const onConfirmEdit = useCallback(() => {
    push(
      paths.manageCalibrationEdit({
        routeParam: { calibrationId: finalCalibrateSession?.id! },
      }),
    )
  }, [finalCalibrateSession?.id, push])

  const onClickBack = useCallback(() => {
    if (
      calibrationSettingState === CalibrationSettingState.SETTING_SUB_CALIBRATION &&
      !showSuccessCard
    ) {
      setCalibrationSettingState(CalibrationSettingState.SETTING_FINAL_CALIBRATION)
    } else {
      push(paths.manageCalibration())
    }
  }, [calibrationSettingState, push, showSuccessCard])

  const validate = useCallback(
    (values: ICreateCalibrateFormValues) => {
      const errors: IFormValueErrors<ICreateCalibrateFormValues> = {}

      if (calibrationSettingState === CalibrationSettingState.SETTING_FINAL_CALIBRATION) {
        const isYearInvalid =
          first(values.finalCalibrateSession)?.year &&
          first(values.finalCalibrateSession)?.year?.length !== 4
        if (isYearInvalid) {
          set(errors, "finalCalibrateSession[0].year", "กรุณาใส่เลขปีให้ถูกต้อง")
        }
      }

      return errors
    },
    [calibrationSettingState],
  )

  return (
    <>
      <HeaderCalibrateCard
        calibrationSettingState={calibrationSettingState}
        onClickBack={onClickBack}
      />

      {/* พื้นที่สำหรับแสดงข้อความเมื่อสร้างวง Calibration สำเร็จ */}
      {showSuccessCard ? (
        <SuccessCalibrateCard
          finalCalibrateSession={finalCalibrateSession}
          subCalibrateSessions={subCalibrateSessions}
          onConfirmEdit={onConfirmEdit}
        />
      ) : (
        <CalibrateDetailAreaStyled>
          <Form<ICreateCalibrateFormValues>
            onSubmit={onSubmit}
            initialValues={initialFormValues}
            validate={validate}
            mutators={{
              ...arrayMutators,
            }}
          >
            {({ handleSubmit, invalid, values }) => {
              return (
                <LoadingLayout isLoading={isLoading}>
                  <Card>
                    {calibrationSettingState ===
                      CalibrationSettingState.SETTING_FINAL_CALIBRATION && (
                      <SettingFinalCalibrationState />
                    )}
                    {calibrationSettingState ===
                      CalibrationSettingState.SETTING_SUB_CALIBRATION && (
                      <SettingSubCalibrationState />
                    )}
                  </Card>
                  <Box height={32} />
                  <ButtonNextState>
                    <Button onClick={handleSubmit} isDisabledButton={invalid}>
                      {calibrationSettingState === CalibrationSettingState.SETTING_FINAL_CALIBRATION
                        ? t("ไปตั้งค่าปรับเทียบวงย่อย​")
                        : t("สร้างวงปรับเทียบผลงาน")}
                    </Button>
                  </ButtonNextState>
                  <CalibrateEmployeeListModal
                    showConfirmModal={showDuplicateUsers}
                    setShowConfirmModal={setShowDuplicateUsers}
                    employeeList={employeeDuplicateList}
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
                </LoadingLayout>
              )
            }}
          </Form>
        </CalibrateDetailAreaStyled>
      )}
    </>
  )
}

export default CalibrationField
