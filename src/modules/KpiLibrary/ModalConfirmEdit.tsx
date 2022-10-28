import styled from "@emotion/styled"
import Modal from "../../components/common/Modal"
import Sarabun from "../../components/common/Sarabun"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 434px;
  text-align: center;
  margin: 0 0 24px 0;
`
type ModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
  isUpdate?: boolean
}

const ModalConfirmEdit = (props: ModalProps) => {
  const { showConfirmModal, setShowConfirmModal, onOk, onClose, isUpdate = true } = props

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
        <Sarabun
          style={{
            margin: "0 0 16px 0",
          }}
          type="H4"
        >
          {isUpdate
            ? `คุณยืนยันที่จะแก้ไข Library นี้หรือไม่?`
            : `คุณยืนยันที่จะลบ Library นี้หรือไม่?`}
        </Sarabun>
      </Body>
    </Modal>
  )
}

export default ModalConfirmEdit
