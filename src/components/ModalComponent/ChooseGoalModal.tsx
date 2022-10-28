import Modal from "../../components/common/Modal"
import styled from "@emotion/styled"
import Icon from "../../components/common/Icon"
import Sarabun from "../../components/common/Sarabun"
import { Divider } from "@mui/material"
import { useMemo } from "react"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 4px;
`
const MuiDivider = styled(Divider)`
  margin-top: 24px;
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

type ModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
  onOpenCreateGoalModal?: () => void
  onOpenCopyGoalModal?: () => void
  onOpenChooseFromLibraryModal?: () => void
  quarter?: string
  year?: string
}

const ChooseGoalModal = (props: ModalProps) => {
  const {
    showModal,
    setShowModal,
    onClose,
    onOpenCreateGoalModal,
    onOpenCopyGoalModal,
    onOpenChooseFromLibraryModal,
    quarter = "",
    year = "",
  } = props

  const yearQuarter = useMemo(() => {
    if (year && quarter) {
      return `${year}/${quarter}`
    }
    return ""
  }, [quarter, year])

  return (
    <Modal
      visibleUseState={[showModal, setShowModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showOkButton={false}
      showCloseIcon
      onClose={onClose}
    >
      <Body>
        <Sarabun type="H3" lineHeight={"36"}>
          {`เลือกวิธีเพิ่มเป้าหมาย ${yearQuarter}`}
        </Sarabun>
        <Div
          title="createGoalByPreviousQuarter"
          onClick={onOpenCreateGoalModal}
        >
          <Frame>
            <Content>
              <AddFileDiv>
                <Icon
                  iconName="addFile"
                  width={32}
                  height={32}
                  style={{ height: "100%" }}
                />
              </AddFileDiv>
              <TextDiv>
                <Sarabun type="H5" lineHeight={"18"}>
                  {`สร้างเป้าหมายใหม่ด้วยตนเอง`}
                </Sarabun>
                <Sarabun type="Body2">{`สร้างเป้าหมายใหม่ด้วยตนเอง`}</Sarabun>
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
        <MuiDivider />
        <Div title="createGoalFromLibrary" onClick={onOpenCopyGoalModal}>
          <Frame>
            <Content>
              <Icon
                iconName="copy"
                width={64}
                height={64}
                style={{ height: "100%" }}
              />
              <TextDiv>
                <Sarabun type="H5" lineHeight={"18"}>
                  {`คัดลอกเป้าหมายจากไตรมาสที่ผ่านมา`}
                </Sarabun>
                <Sarabun type="Body2">{`สามารถคัดลอกเป้าหมายที่เคยใช้ในการประเมินจากไตรมาสที่ผ่านมาได้`}</Sarabun>
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
        <Div title="createGoalBySelf" onClick={onOpenChooseFromLibraryModal}>
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
                  {`เลือกเป้าหมายจาก Library`}
                </Sarabun>
                <Sarabun type="Body2">{`เลือกเป้าหมายที่มีอยู่แล้วใน Library ได้`}</Sarabun>
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
  )
}

export default ChooseGoalModal
