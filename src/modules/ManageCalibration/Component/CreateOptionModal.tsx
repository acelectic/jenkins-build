import styled from "@emotion/styled"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import Icon from "../../../components/common/Icon"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { PRIMARY_MAIN } from "../../../constants/colors"
import paths from "../../../constants/paths"
import CopyCalibrationModal from "./CopyCalibrationModal"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 4px;
`

const Div = styled.div`
  display: flex;
  margin-top: 24px;
  padding: 16px;
  background-color: "#FFFFFF";
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  :hover {
    cursor: pointer;
    border: 1px solid ${PRIMARY_MAIN};
  }
`
const Frame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const AddFileDiv = styled.div`
  display: flex;
  align-items: center;
  background: #edf6ff;
  border-radius: 8px;
  padding: 16px;
`
const TextDiv = styled.div`
  padding: 5px 45px 5px 16px;
  display: flex;
  flex-direction: column;
`

type CreateOptionModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}

const CreateOptionModal = (props: CreateOptionModalProps) => {
  const { showConfirmModal, setShowConfirmModal, onClose } = props

  const history = useHistory()

  const [openCopyModal, setOpenCopyModal] = useState(false)

  const { t } = useTranslation()

  const onSelectCreateCalibration = useCallback(() => {
    history.push(paths.manageCalibrationCreate())
  }, [history])

  const onOpenCopyModal = useCallback(() => {
    setOpenCopyModal(true)
  }, [])
  return (
    <>
      <Modal
        visibleUseState={[showConfirmModal, setShowConfirmModal]}
        closeOnClickOutside={false}
        showCancelButton={false}
        showCloseIcon
        showOkButton={false}
        onCancel={onClose}
        onClose={onClose}
      >
        <Body>
          <Sarabun type="H3" lineHeight={"36"}>
            {t(`เลือกวิธีสร้างวงปรับเทียบผลงาน`)}
          </Sarabun>
          <Div onClick={onSelectCreateCalibration}>
            <Frame>
              <Content>
                <Icon iconName="copy" width={64} height={64} style={{ height: "100%" }} />
                <TextDiv>
                  <Sarabun type="H5" lineHeight={"18"}>
                    {t(`สร้างวงปรับเทียบผลงานใหม่`)}
                  </Sarabun>
                  <Sarabun type="Body2">
                    {t(`กรอกรายละเอียด ตั้งค่า และเลือกกลุ่มคนเข้าวงปรับเทียบผลงานด้วยตัวเอง`)}
                  </Sarabun>
                </TextDiv>
              </Content>
              <Icon
                iconName="caretUp"
                width={24}
                height={24}
                style={{ height: "100%", transform: "rotate(90deg)" }}
              />
            </Frame>
          </Div>
          <Div onClick={onOpenCopyModal}>
            <Frame>
              <Content>
                <AddFileDiv>
                  <Icon
                    iconName="chooseFromInLibrary"
                    width={32}
                    height={32}
                    style={{ height: "100%" }}
                  />
                </AddFileDiv>

                <TextDiv>
                  <Sarabun type="H5" lineHeight={"18"}>
                    {t(`คัดลอกจากแบบฟอร์มที่เคยสร้างแล้ว`)}
                  </Sarabun>
                  <Sarabun type="Body2">
                    {t(
                      `สามารถสร้างวงปรับเทียบผลงานใหม่จากการคัดลอก และดัดแปลงวงปรับเทียบผลงานที่เคยสร้างไว้แล้วได้`,
                    )}
                  </Sarabun>
                </TextDiv>
              </Content>
              <Icon
                iconName="caretUp"
                width={24}
                height={24}
                style={{ height: "100%", transform: "rotate(90deg)" }}
              />
            </Frame>
          </Div>
        </Body>
      </Modal>
      <CopyCalibrationModal visibleUseState={[openCopyModal, setOpenCopyModal]} />
    </>
  )
}

export default CreateOptionModal
