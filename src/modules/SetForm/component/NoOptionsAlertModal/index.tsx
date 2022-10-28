import styled from "@emotion/styled"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/common/Button"
import Icon from "../../../../components/common/Icon"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"

const SaveButtonArea = styled.div`
  flex: 2;
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
  margin-top: 8px;
  margin-bottom: 40px;
`
type IModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NoOptionsAlertModal = (props: IModalProps) => {
  const { showModal, setShowModal } = props

  const { t } = useTranslation()

  const onOkClick = useCallback(() => {
    setShowModal(false)
  }, [setShowModal])
  return (
    <Modal
      visibleUseState={[showModal, setShowModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showCloseIcon
      showOkButton={false}
      onClose={onOkClick}
    >
      <ModalContent>
        <Details>
          <Icon width={64} height={64} iconName="warningOrange" />
          <Sarabun type="H4">{t(`เทมเพลตแบบประเมินถูกลบแล้วกรุณาเลือกใหม่`)}</Sarabun>
        </Details>

        <SaveButtonArea>
          <Button height={48} style={{ width: "100%" }} onClick={onOkClick}>
            {t(`ตกลง`)}
          </Button>
        </SaveButtonArea>
      </ModalContent>
    </Modal>
  )
}

export default NoOptionsAlertModal
