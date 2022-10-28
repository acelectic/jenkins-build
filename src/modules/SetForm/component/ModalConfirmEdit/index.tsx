import styled from "@emotion/styled"
import { useMemo } from "react"
import Modal from "../../../../components/common/Modal"
import Sarabun from "../../../../components/common/Sarabun"
import { AssessmentTypeKpiTemplateResponse } from "../../../../services/set-form/set-form-type"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 434px;
  text-align: center;
  margin: 0 0 24px 0;
`
type IModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
  assessmentType: AssessmentTypeKpiTemplateResponse
}

const ModalConfirmEdit = (props: IModalProps) => {
  const { showConfirmModal, setShowConfirmModal, onOk, onClose, assessmentType } = props

  const title = useMemo(() => {
    if (assessmentType === AssessmentTypeKpiTemplateResponse.KPI) {
      return "Form ประจำไตรมาส"
    } else if (assessmentType === AssessmentTypeKpiTemplateResponse.ONE_YEAR) {
      return "Form ครบรอบ 1 ปี"
    } else {
      return "Form ทดลองงาน"
    }
  }, [assessmentType])

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
          {`คุณยืนยันที่จะแก้ไข ${title} นี้หรือไม่?`}
        </Sarabun>
      </Body>
    </Modal>
  )
}

export default ModalConfirmEdit
