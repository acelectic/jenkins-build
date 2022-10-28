import styled from "@emotion/styled"
import { Box } from "@mui/material"
import Button from "../../../components/common/Button"
import Icon from "../../../components/common/Icon"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;
`

const SaveButtonArea = styled.div`
  flex: 2;
  justify-content: end;
  justify-items: flex-end;
  text-align: end;
`
const CancelButtonArea = styled.div`
  flex: 1;
  justify-content: start;
  text-align: start;
`

type ModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
  isLoading?: boolean
}

const DeleteModal = (props: ModalProps) => {
  const { showModal, setShowModal, onOk, onClose } = props

  return (
    <Modal
      visibleUseState={[showModal, setShowModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showCloseIcon
      showOkButton={false}
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
    >
      <div style={{ width: "625px", textAlign: "center" }}>
        <Box height={30} />
        <Icon width={91} height={90} iconName="warningOrange" />
        <Box height={30} />
        <Sarabun
          style={{
            margin: "0 0 24px 0",
            lineHeight: "30px",
          }}
          type="H4"
        >
          คุณยืนยันที่จะลบ KPI Library หรือไม่?
        </Sarabun>

        <ButtonArea>
          <CancelButtonArea>
            <Button
              buttonType="outlined"
              width={250}
              height={48}
              onClick={onClose}
            >
              ยกเลิก
            </Button>
          </CancelButtonArea>
          <SaveButtonArea>
            <Button width={250} height={48} onClick={onOk}>
              ยืนยันลบ
            </Button>
          </SaveButtonArea>
        </ButtonArea>
      </div>
    </Modal>
  )
}

export default DeleteModal
