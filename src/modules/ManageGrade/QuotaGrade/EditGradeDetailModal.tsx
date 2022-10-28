import styled from "@emotion/styled"
import { useCallback, useState } from "react"
import { Field } from "react-final-form"
import { FieldArray } from "react-final-form-arrays"
import { OnChange } from "react-final-form-listeners"
import { useTranslation } from "react-i18next"
import Alert from "../../../components/common/Alert"
import Button from "../../../components/common/Button"
import Modal from "../../../components/common/Modal"
import Sarabun from "../../../components/common/Sarabun"
import { InputField } from "../../../components/fields"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  GRAYSCALE_LIGHTGRAY_10,
} from "../../../constants/colors"
import { IQuotaGradeType } from "../../../services/quota-grade/quota-grade-type"
import { normalizeNumber } from "../../../utils/helper"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
`

const DetailZone = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  box-sizing: border-box;
  /* overflow: hidden; */
`

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${GRAYSCALE_DARKGRAY_40};
  align-items: center;
  box-sizing: border-box;
  padding: 8px;
  gap: 124px;
  border-radius: 8px 8px 0 0;
`

const AlertBox = styled.div`
  margin: 28px 0 16px 0;
  display: flex;
  justify-content: flex-end;
`

const DetailRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 16px;
  gap: 108px;
  border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
`

const ContentZone = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* overflow: auto; */
`

const SumaryRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 16px;
  gap: 124px;
  border-radius: 0 0 8px 8px;
`

const ButtonZone = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  gap: 16px;
`

const PieIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GRAYSCALE_DARKGRAY_80};
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

type ModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onOk: () => void
  onClose: () => void
  fieldName: string
  isCalibrated: boolean
  invalid: boolean
}

const EditGradeDetailModal = (props: ModalProps) => {
  const { showModal, setShowModal, onOk, onClose, fieldName, isCalibrated, invalid } = props
  const { t } = useTranslation()

  const [percentGrade, setPerCentGrade] = useState(100)

  const onChangePercentGrade = useCallback(
    (newValue: number, previousValue: number) => {
      const currentValue = newValue - previousValue
      setPerCentGrade(percentGrade + currentValue)
    },
    [percentGrade],
  )
  return (
    <Modal
      visibleUseState={[showModal, setShowModal]}
      showCloseIcon={true}
      showCancelButton={false}
      showOkButton={false}
      onCancel={onClose}
      onClose={onClose}
      onOk={onOk}
      style={{
        maxWidth: "626px",
        width: "626px",
      }}
    >
      <Field name={`${fieldName}`}>
        {({ input }) => {
          const quotaValue: IQuotaGradeType = input.value
          return (
            <Body>
              <Sarabun type="H3" style={{ marginBottom: "24px" }}>
                {t(`แก้ไขรายละเอียดโควต้าเกรด`)}
              </Sarabun>
              <Sarabun type="Body2" color={GRAYSCALE_DARKGRAY_80} style={{ marginBottom: "8px" }}>
                {t(`ชื่อโควต้าเกรด`)}
              </Sarabun>

              <Sarabun type="Subtitle1" style={{ marginBottom: "30px" }}>
                {t(`${quotaValue.name}`)}
              </Sarabun>
              <DetailZone>
                <HeaderRow>
                  <Sarabun type="Subtitle2">{t(`เกรด`)}</Sarabun>
                  <Sarabun type="Subtitle2">{t(`โควต้า (%)`)}</Sarabun>
                </HeaderRow>
                <ContentZone>
                  <FieldArray name={`${fieldName}.grades`}>
                    {({ fields: gradeFields }) => {
                      return gradeFields.map((gradeFieldsName) => {
                        return (
                          <div key={gradeFieldsName}>
                            <Field name={`${gradeFieldsName}.grade`}>
                              {({ input }) => {
                                return (
                                  <DetailRow>
                                    <PieIndex>
                                      <Sarabun type="H6" color={`${GRAYSCALE_LIGHTGRAY_10}`}>
                                        {input.value}
                                      </Sarabun>
                                    </PieIndex>
                                    <InputField
                                      name={`${gradeFieldsName}.quota`}
                                      endUnit={true}
                                      unitText="%"
                                      style={{
                                        width: "136px",
                                      }}
                                      disabled={
                                        !isCalibrated
                                          ? input.value === 1 ||
                                            input.value === 2 ||
                                            input.value === 5
                                            ? true
                                            : false
                                          : false
                                      }
                                      parse={normalizeNumber}
                                      inputProps={{ maxLength: 2 }}
                                    />
                                    <OnChange name={`${gradeFieldsName}.quota`}>
                                      {(value, previous) => {
                                        onChangePercentGrade(value, previous)
                                      }}
                                    </OnChange>
                                  </DetailRow>
                                )
                              }}
                            </Field>
                          </div>
                        )
                      })
                    }}
                  </FieldArray>
                </ContentZone>
                <SumaryRow>
                  <Sarabun type="H5">{t(`รวม`)}</Sarabun>
                  <Sarabun type="H5">{`${percentGrade} %`}</Sarabun>
                </SumaryRow>
              </DetailZone>
              <AlertBox>
                <Alert type="info" text="กรุณากรอกจำนวนโควต้าให้ครบ 100" size="wrapContent" />
              </AlertBox>
              <ButtonZone>
                <Button buttonType="outlined" style={{ width: "100%" }} onClick={onClose}>
                  {t(`ยกเลิก`)}
                </Button>
                <Button
                  style={{ width: "100%" }}
                  onClick={() => {
                    onOk()
                    onClose()
                  }}
                  isDisabledButton={invalid}
                >
                  {t(`บันทึก`)}
                </Button>
              </ButtonZone>
            </Body>
          )
        }}
      </Field>
    </Modal>
  )
}

export default EditGradeDetailModal
