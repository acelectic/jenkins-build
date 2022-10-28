import { useTranslation } from "react-i18next"
import Card from "../../../components/common/Card"
import Sarabun from "../../../components/common/Sarabun"
import SuccessStateCard from "../../../components/common/SuccessStateCard"
import {
  BLACK,
  ERROR,
  GRAYSCALE_DARKGRAY_80,
  PRIMARY_DARK,
  SECONDARY_BG,
  SECONDARY_MAIN,
  WHITE,
} from "../../../constants/colors"
import { IFinalCalibrateSession } from "../../../services/manage-calibration/manage-calibration-type"
import CalibrationSession from "../CalibrationDetailModal/CalibrationSession"
import Button from "../../../components/common/Button"
import { useCallback, useMemo, useState } from "react"
import Modal from "../../../components/common/Modal"
import { useUpdateCalibrateState } from "../../../services/manage-calibration/manage-calibration-query"
import { useSnackbar } from "../../../utils/custom-hook"
import { useRouter } from "../../../utils/helper"
import paths from "../../../constants/paths"
import { CalibrationState } from "../../../services/enum-typed"
import styled from "@emotion/styled"
import _ from "lodash"

const CardSuccessStyled = styled.div({
  backgroundColor: SECONDARY_BG,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "35px 24px",
  borderRadius: 8,
})

const TextAreaStyled = styled.div({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
})

const OpenCalibrateAreaStyled = styled.div({
  marginLeft: 64,
})

const SarabunDetailStyled = styled(Sarabun)({
  maxWidth: 420,
  marginBottom: 12,
})

const BodyStyled = styled.div({
  marginTop: 64,
})

const CalibrateDetailStyled = styled.div({
  marginTop: 64,
})

const SubCalibrateStyled = styled.div({
  marginTop: 32,
})

type ISuccessCalibrateCardProps = {
  title?: string
  finalCalibrateSession?: IFinalCalibrateSession
  subCalibrateSessions?: IFinalCalibrateSession[]
  onConfirmEdit?: Function
}

const SuccessCalibrateCard = (props: ISuccessCalibrateCardProps) => {
  const {
    finalCalibrateSession,
    subCalibrateSessions,
    title = "สร้างวงปรับเทียบผลงานแล้ว",
    onConfirmEdit,
  } = props
  const { t } = useTranslation()
  const { snackbar } = useSnackbar()
  const { push } = useRouter()

  const { mutate: updateCalibrateState } = useUpdateCalibrateState(finalCalibrateSession?.id!)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const onClickActiveCalibrateSession = useCallback(() => {
    const findSubCalibrateStartDateEmpty = subCalibrateSessions?.find((calibrateSession) =>
      _.isEmpty(calibrateSession.sessionStartDate),
    )
    const isSessionStartDateInvalid = !!(
      !finalCalibrateSession?.sessionStartDate || findSubCalibrateStartDateEmpty
    )
    if (isSessionStartDateInvalid) {
      setIsOpenEditModal(true)
    } else {
      setIsOpenModal(true)
    }
  }, [finalCalibrateSession?.sessionStartDate, subCalibrateSessions])

  const onConfirmUpdate = useCallback(() => {
    updateCalibrateState(undefined, {
      onSuccess: () => {
        push(paths.manageCalibration())
        snackbar({ message: "Success", type: "success" })
      },
      onError: (error) => {
        snackbar({ message: error.message, type: "error" })
      },
    })
  }, [push, snackbar, updateCalibrateState])

  const calibrateState = useMemo(() => {
    return finalCalibrateSession?.calibrationState
  }, [finalCalibrateSession?.calibrationState])

  return (
    <BodyStyled>
      <SuccessStateCard title={title} titleColor={WHITE} isShowButton={false} marginBottom={0} />
      {calibrateState === CalibrationState.PENDING && (
        <CardSuccessStyled>
          <Sarabun type={"H5"} style={{ maxWidth: 320 }} color={PRIMARY_DARK}>
            {t(
              "คุณสามารถเปิดใช้งานวงปรับเทียบผลงานเพื่อให้หัวหน้าวงและคณะกรรมการเห็นข้อมูล วงปรับเทียบผลงานได้",
            )}
          </Sarabun>
          <OpenCalibrateAreaStyled>
            <SarabunDetailStyled color={ERROR}>
              {t(
                "หากคุณยังไม่เปิดใช้งานวงปรับเทียบผลงานตอนนี้คุณสามารถเปิดใช้งาน หรือสร้างวงปรับเทียบผลงานย่อยที่หน้าจัดการวงปรับเทียบผลงาน",
              )}
            </SarabunDetailStyled>
            <Button
              onClick={onClickActiveCalibrateSession}
              style={{ backgroundColor: `${SECONDARY_MAIN}` }}
            >
              {t("เปิดใช้งานวงปรับเทียบผลงานนี้")}
            </Button>
          </OpenCalibrateAreaStyled>
        </CardSuccessStyled>
      )}
      <CalibrateDetailStyled>
        <Card>
          <Sarabun type="H4" style={{ marginBottom: 32 }}>
            {t("วงปรับเทียบผลงานใหญ่")}
          </Sarabun>
          <CalibrationSession calibrateSession={finalCalibrateSession} />
          {subCalibrateSessions?.map((subCalibrateSession, index) => (
            <SubCalibrateStyled>
              <CalibrationSession type="sub" calibrateSession={subCalibrateSession} index={index} />
              {/* <Box height={32} /> */}
            </SubCalibrateStyled>
          ))}
        </Card>
        <Modal visibleUseState={[isOpenEditModal, setIsOpenEditModal]} onOk={onConfirmEdit}>
          <TextAreaStyled>
            <Sarabun type="H4" color={BLACK}>
              {t("วงเปรียบเปรียบนี้ยังไม่มีวันที่นัดปรับเทียบผลงาน")}
            </Sarabun>
            <Sarabun
              type="Body1"
              color={GRAYSCALE_DARKGRAY_80}
              style={{ margin: "16px 0px 40px 0px" }}
            >
              {t("กดยืนยันเพื่อแก้ไขวงเปรียบเทียบนี้")}
            </Sarabun>
          </TextAreaStyled>
        </Modal>
        <Modal visibleUseState={[isOpenModal, setIsOpenModal]} onOk={onConfirmUpdate}>
          <TextAreaStyled>
            <Sarabun type="H4" color={BLACK}>
              {t("คุณยืนยันเปิดวงปรับเทียบผลงานนี้หรือไม่?")}
            </Sarabun>
            <Sarabun
              type="Body1"
              color={GRAYSCALE_DARKGRAY_80}
              style={{ margin: "16px 0px 40px 0px" }}
            >
              {t(
                "เมื่อยืนยันแล้ว ระบบจะแสดงวงปรับเทียบผลงานนี้ให้หัวหน้าวงและคณะกรรมการดูข้อมูลพนักงานที่ได้รับการประเมินได้",
              )}
            </Sarabun>
          </TextAreaStyled>
        </Modal>
      </CalibrateDetailStyled>
    </BodyStyled>
  )
}

export default SuccessCalibrateCard
