import styled from "@emotion/styled"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { GRAYSCALE_DARKGRAY_80 } from "../../../constants/colors"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 434px;
  text-align: center;
  gap: 16px;
  margin: 0 0 24px 0;
`
type ConfirmSubmitModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
  titleText: string
}

const ConfirmSubmitModal = (props: ConfirmSubmitModalProps) => {
  const { showConfirmModal, setShowConfirmModal, onOk, onClose, titleText } = props

  return (
    <Modal
      visibleUseState={[showConfirmModal, setShowConfirmModal]}
      closeOnClickOutside={false}
      showCancelButton
      showCloseIcon
      showOkButton
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
    >
      <Body>
        <Sarabun type="H4">{titleText}</Sarabun>
        <Sarabun
          type="Body1"
          color={GRAYSCALE_DARKGRAY_80}
        >{`หากคุณส่งผลการประเมินแล้ว จะแก้ไชไม่ได้อีก`}</Sarabun>
      </Body>
    </Modal>
  )
}

export default ConfirmSubmitModal
