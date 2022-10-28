import { useCallback, useMemo, useState } from "react"
import Button from "../../../components/common/Button"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import Icon from "../../../components/common/Icon"
import { TemplateDetailParams } from "../../../services/kpi-template/kpi-template-type"
import { useHistory } from "react-router-dom"
import paths from "../../../constants/paths"
import CalibrationSession from "./CalibrationSession"
import {
  useDeleteCalibration,
  useGetCalibrateSessionDetailModal,
} from "../../../services/manage-calibration/manage-calibration-query"
import { CalibrationState } from "../../../services/enum-typed"
import { useTranslation } from "react-i18next"
import Authorize from "../../../components/Authorize"
import { PERMISSIONS } from "../../../services/enum-typed"

const useStyle = makeStyles((theme) => ({
  detailTemplateColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "40px",
  },
  detailTemplateRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  copyTemplate: {
    display: "flex",
    flex: 3,
    justifyContent: "end",
  },
  chooseTemplate: {
    display: "flex",
    flexDirection: "column",
  },
  createTemplate: {
    backgroundColor: "gray",
    padding: "32px",
    cursor: "pointer",
  },
  copyCreateTemplate: {
    backgroundColor: "gray",
    padding: "32px",
  },
  whiteColor: {
    color: "#FFFFFF",
  },
  nameEvaluatorText: {
    backgroundColor: "#E7E8EE",
    padding: 16,
  },
  nameEvaluatorArea: {
    display: "flex",
    marginLeft: 24,
  },
  divider: {
    backgroundColor: "black",
    height: "1px",
  },
  detailHeader: {
    display: "flex",
    marginLeft: 24,
  },
}))

type CalibrationDetailModalProps = {
  id?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCancel?: () => void
  onConfirmDelete?: () => void
  onConfirmEdit?: () => void
  templateDetailParams?: TemplateDetailParams
}

const CalibrationDetailModal = (props: CalibrationDetailModalProps) => {
  const {
    id = "",
    isOpen,
    setIsOpen,
    onCancel,
    /*  onConfirmDelete,
    onConfirmEdit,
    templateDetailParams, */
  } = props

  const { t } = useTranslation()
  const { data, isLoading } = useGetCalibrateSessionDetailModal(id)
  const { mutate: deleteCalibration } = useDeleteCalibration(id)
  const { calibrateSession } = data || {}
  const { finalCalibrateSessionWithUser, subCalibrateSessionsWithUser } = calibrateSession || {}
  // const { name } = finalCalibrateSessionWithUser || {}

  const classes = useStyle()
  // const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const history = useHistory()

  // const onOpenEditModal = useCallback(() => {
  //   setOpenEditModal(true)
  // }, [])

  // const onCloseEditModal = useCallback(() => {
  //   setOpenEditModal(false)
  // }, [])

  const onOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true)
  }, [])

  // const onCloseDeleteModal = useCallback(() => {
  //   setOpenDeleteModal(false)
  // }, [])

  // const Owner = useMemo(() => {
  //   return data?.finalCalibrateSession.calibrators.find(
  //     (calibrator) => calibrator.calibratorType === CalibratorType.OWNER
  //   )
  // }, [data?.finalCalibrateSession.calibrators])

  // const calibrateSession = useMemo(() => {
  //   return data?.finalCalibrateSession.calibrators.find(
  //     (calibrator) => calibrator.calibratorType === CalibratorType.OWNER
  //   )
  // }, [data?.finalCalibrateSession.calibrators])

  const onClickCopyCalibration = useCallback(() => {
    history.push(paths.manageCalibrationCopy({ routeParam: { calibrationId: id } }))
  }, [history, id])

  const onClickEditCalibration = useCallback(() => {
    history.push(paths.manageCalibrationEdit({ routeParam: { calibrationId: id } }))
  }, [history, id])

  const onClickDelete = useCallback(() => {
    deleteCalibration(undefined, {
      onSuccess: () => {
        setOpenDeleteModal(false)
        setIsOpen(false)
      },
    })
  }, [deleteCalibration, setIsOpen])

  const calibrateState = useMemo(() => {
    return finalCalibrateSessionWithUser?.calibrationState
  }, [finalCalibrateSessionWithUser?.calibrationState])
  return (
    <>
      <Modal
        visibleUseState={[isOpen, setIsOpen]}
        showCancelButton={false}
        showOkButton={false}
        onCancel={onCancel}
        onClose={() => {
          setIsOpen(false)
        }}
        maxWidth={"1200px"}
        fitMaxWidth
        isLoading={isLoading}
      >
        <div className={classes.detailTemplateColumn}>
          <div className={classes.detailTemplateRow}>
            <Sarabun size={32} weight={600}>
              {t("วงปรับเทียบผลงานใหญ่")}
            </Sarabun>
            <div className={classes.copyTemplate}>
              <Authorize permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_CREATE]}>
                <Button
                  startIcon={<Icon iconName="copyWhite" width={24} height={24} />}
                  onClick={onClickCopyCalibration}
                >
                  {t("คัดลอกวงปรับเทียบ")}
                </Button>
              </Authorize>
              <Authorize permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_DELETE]}>
                <Box width={16} />

                <Button
                  onClick={onOpenDeleteModal}
                  startIcon={<Icon iconName="trashWhite" width={24} height={24} />}
                >
                  {t("ลบวงปรับเทียบ")}
                </Button>
              </Authorize>
              <Authorize permissions={[PERMISSIONS.MANAGE_CALIBRATION_MANAGE_CALIBRATION_UPDATE]}>
                <Box width={16} />
                <Button
                  onClick={onClickEditCalibration}
                  startIcon={<Icon iconName="pencilWhite" width={24} height={24} />}
                >
                  {calibrateState === CalibrationState.PENDING
                    ? t("ตรวจสอบและเปิดใช้งาน")
                    : t("แก้ไขวงปรับเทียบ")}
                </Button>
              </Authorize>
            </div>
          </div>
          <CalibrationSession calibrateSession={finalCalibrateSessionWithUser} />
          {subCalibrateSessionsWithUser &&
            subCalibrateSessionsWithUser.map((subCalibrateSession, index) => (
              <CalibrationSession type="sub" calibrateSession={subCalibrateSession} index={index} />
            ))}
        </div>
      </Modal>
      <Modal visibleUseState={[openDeleteModal, setOpenDeleteModal]} onOk={onClickDelete}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Sarabun type="H4">{t("คุณยืนยันที่จะลบวงเปรียบเทียบนี้หรือไม่")}</Sarabun>
          <Box height={16} />
        </div>
      </Modal>
      {/* <ConfirmEdit
        isOpen={openEditModal}
        setIsOpen={setOpenEditModal}
        onCancel={onCloseEditModal}
        onConfirm={onConfirmEditTemplate}
      />
      <ConfirmDelete
        isOpen={openDeleteModal}
        setIsOpen={setOpenDeleteModal}
        onCancel={onCloseDeleteModal}
        onConfirm={onConfirmDelete}
        behaviorTemplate={templateDetailResponse?.behaviorTemplate}
        scale={templateDetailResponse?.scale}
      /> */}
    </>
  )
}

export default CalibrationDetailModal
