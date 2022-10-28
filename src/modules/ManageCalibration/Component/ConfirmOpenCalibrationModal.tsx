import styled from "@emotion/styled"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import paths from "../../../constants/paths"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0 24px 0;
  gap: 16px;
  max-width: 420px;
  margin-bottom: 40px;
  align-items: center;
  text-align: center;
`

type ConfirmOpenCalibrationModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
  onOk: () => void
}

const ConfirmOpenCalibrationModal = (
  props: ConfirmOpenCalibrationModalProps
) => {
  const { showConfirmModal, setShowConfirmModal, onClose, onOk } = props

  const history = useHistory()

  const gotoManageCalibration = useCallback(() => {
    history.push(paths.manageCalibration())
  }, [history])

  const { t } = useTranslation()

  return (
    <Modal
      visibleUseState={[showConfirmModal, setShowConfirmModal]}
      closeOnClickOutside={false}
      showCancelButton
      showCloseIcon
      showOkButton
      onCancel={onClose}
      onClose={onClose}
      onOk={() => {
        onOk()
        gotoManageCalibration()
      }}
      style={{ maxWidth: "568px" }}
    >
      <Body>
        <Sarabun type="H4">
          {t("คุณยืนยันเปิดวงปรับเทียบผลงานนี้หรือไม่?")}
        </Sarabun>
        <Sarabun type="Body1" style={{ width: "86%" }}>
          {t(
            "เมื่อยืนยันแล้ว ระบบจะแสดงวงปรับเทียบผลงานนี้ให้หัวหน้าวงและคณะกรรมการดูข้อมูลพนักงานที่ได้รับการประเมินได้"
          )}
        </Sarabun>
      </Body>
    </Modal>
  )
}

export default ConfirmOpenCalibrationModal
