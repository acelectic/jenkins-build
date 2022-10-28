import styled from "@emotion/styled"
import { useTranslation } from "react-i18next"
import Avatar from "../../../components/common/Avatar"
import Button from "../../../components/common/Button"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
  PRIMARY_DARK,
} from "../../../constants/colors"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 0 0 0;
  gap: 16px;
  width: 648px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 4px;
`

const ListDiv = styled.div`
  display: flex;
  padding: 16px;
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
  box-sizing: border-box;
  width: 100%;
  height: 264px;
  max-height: 264px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 8px;
  padding-right: 16px;
`

const EmployeeCardRow = styled.div`
  display: flex;
  min-height: 32px;
  max-height: 32px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
  padding: 4px 4px 4px 8px;
  box-sizing: border-box;
  border-radius: 24px;
  flex-direction: row;
  gap: 8px;
`

const ButtonZone = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 24px;
`

export type EmployeeList = {
  name: string
  eId: string
  avatar?: string
}

type CalibrateEmployeeListModalModalProps = {
  showConfirmModal: boolean
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  onOk?: () => void
  isAvailableToConfirm?: boolean
  employeeList?: EmployeeList[]
}

const CalibrateEmployeeListModal = (
  props: CalibrateEmployeeListModalModalProps
) => {
  const {
    showConfirmModal,
    setShowConfirmModal,
    onClose,
    onOk,
    isAvailableToConfirm = true,
    employeeList,
  } = props

  const { t } = useTranslation()

  return (
    <Modal
      visibleUseState={[showConfirmModal, setShowConfirmModal]}
      closeOnClickOutside={false}
      showCancelButton={false}
      showCloseIcon
      showOkButton={isAvailableToConfirm ? false : true}
      onCancel={onClose}
      onClose={onClose}
      onOk={isAvailableToConfirm ? onOk : onClose}
      onOkText={isAvailableToConfirm ? "ยืนยัน" : "ตกลง"}
    >
      <Body>
        <Sarabun
          type="H4"
          style={{
            width: !isAvailableToConfirm ? "72%" : "96%",
            marginBottom: "8px",
          }}
        >
          {t(
            isAvailableToConfirm
              ? "มีพนักงานที่ได้รับการประเมินอยู่ในวงปรับเทียบผลงานอื่นแล้ว คุณยืนยันจะย้ายพนักงานมาที่วงปรับเทียบผลงานนี้หรือไม่?"
              : "มีพนักงานในวงปรับเทียบผลงานใหญ่ที่ยังไม่ได้อยู่ในวงปรับเทียบผลงานย่อย"
          )}
        </Sarabun>
        <Row>
          <Sarabun type="Body2">
            {isAvailableToConfirm
              ? t(`พนักงานที่มีชื่อในวงปรับเทียบผลงานอื่นแล้ว`)
              : t(`พนักงานยังไม่ได้อยู่ในวงปรับเทียบผลงานย่อย`)}
          </Sarabun>
          <Sarabun type="Subtitle1" color={PRIMARY_DARK}>
            {t(`${employeeList?.length || 0} คน`)}
          </Sarabun>
        </Row>

        <ListDiv>
          <Content>
            {employeeList?.map((emp, index) => {
              return (
                <EmployeeCardRow key={index}>
                  <Avatar width={24} height={24} src={emp.avatar} />
                  <Sarabun type="Body1">{`${emp.name} (EID: ${emp.eId})`}</Sarabun>
                </EmployeeCardRow>
              )
            })}
          </Content>
        </ListDiv>
        {!isAvailableToConfirm ? (
          <Sarabun type="H6">
            {t("กรุณาเพิ่มพนักงานในวงปรับเทียบผลงานย่อยให้ครบก่อน")}
          </Sarabun>
        ) : null}
        {isAvailableToConfirm && (
          <ButtonZone>
            <Button buttonType="outlined" width={300} onClick={onClose}>
              {t(`ยกเลิก`)}
            </Button>
            <Button width={300} onClick={onOk}>
              {t(`ยืนยัน`)}
            </Button>
          </ButtonZone>
        )}
      </Body>
    </Modal>
  )
}

export default CalibrateEmployeeListModal
