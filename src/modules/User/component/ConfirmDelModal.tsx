import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
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
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
`
type IModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
}

const ConfirmDelModal = (props: IModalProps) => {
  const { showModal, setShowModal, onOk, onClose } = props
  const { t } = useTranslation()

  return (
    <Modal
      visibleUseState={[showModal, setShowModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showOkButton={false}
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
    >
      <ModalContent>
        <Details>
          <Icon width={64} height={64} iconName="warningOrange" />
          <Sarabun type="H4">{t(`คุณยืนยันที่จะลบบทบาทนี้หรือไม่?`)}</Sarabun>
        </Details>

        <ButtonArea>
          <CancelButtonArea>
            <Button buttonType="outlined" width={209} height={48} onClick={onClose}>
              {t(`ยกเลิก`)}
            </Button>
          </CancelButtonArea>
          <SaveButtonArea>
            <Button width={209} height={48} onClick={onOk}>
              {t(`ยืนยัน`)}
            </Button>
          </SaveButtonArea>
        </ButtonArea>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDelModal
