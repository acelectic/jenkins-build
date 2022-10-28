import styled from "@emotion/styled"
import Modal from "../../components/common/Modal"
import Sarabun from "../../components/common/Sarabun"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 434px;
  text-align: center;
  margin: 0 0 40px 0;
`
type ModalProps = {
  showExitModal: boolean
  setShowExitModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
}

const ExitModal = (props: ModalProps) => {
  const { showExitModal, setShowExitModal, onOk, onClose } = props

  return (
    <Modal
      visibleUseState={[showExitModal, setShowExitModal]}
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
            lineHeight: "30px",
          }}
          type="H4"
        >
          {`คุณยืนยันจะออกจากการเพิ่มเป้าหมายนี้ โดยที่ยังไม่ได้บันทึกหรือไม่ ?`}
        </Sarabun>
        <Sarabun
          style={{
            lineHeight: "22px",
          }}
          type="Body1"
        >
          {`หากคุณยืนยันที่จะออกก่อนที่จะบันทึก ข้อมูลเป้าหมายนี้ที่คุณเลือก หรือพิมพ์ไว้จะหายไปทั้งหมด`}
        </Sarabun>
      </Body>
    </Modal>
  )
}

export default ExitModal
