import styled from "@emotion/styled"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "../../../components/common/Sarabun"
import { ERROR } from "../../../constants/colors"

import { InputField } from "../../../components/fields"

const RowSpaceBetween = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  width: 100%;
  padding: 0px;
  gap: 8px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

type IDescriptionForUserAndMgrFieldProps = {
  fieldNameForUser: string
  fieldNameForMgr: string
}

const DescriptionForUserAndMgrField = (props: IDescriptionForUserAndMgrFieldProps) => {
  const { t } = useTranslation()
  const { fieldNameForUser = "descriptionForUser", fieldNameForMgr = "descriptionForMgr" } = props

  const required = useCallback((value: string) => {
    return value ? undefined : "Required"
  }, [])

  return (
    <RowSpaceBetween>
      <Column>
        <Row>
          <Sarabun type="Body2">{t(`ข้อความที่ต้องการสื่อสารกับผู้ถูกประเมิน`)}</Sarabun>
          <Sarabun type="Body2" color={ERROR}>
            {t(`*`)}
          </Sarabun>
        </Row>
        <InputField
          placeholder="กรุณากรอกข้อมูล"
          name={fieldNameForUser}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          style={{ width: "100%" }}
          validate={required}
        />
      </Column>
      <Column>
        <Row>
          <Sarabun type="Body2">{t(`ข้อความที่ต้องการสื่อสารกับผู้ประเมิน`)}</Sarabun>
          <Sarabun type="Body2" color={ERROR}>
            {t(`*`)}
          </Sarabun>
        </Row>
        <InputField
          placeholder="กรุณากรอกข้อมูล"
          variant="outlined"
          name={fieldNameForMgr}
          multiline
          rows={4}
          fullWidth
          style={{ width: "100%" }}
          validate={required}
        />
      </Column>
    </RowSpaceBetween>
  )
}

export default DescriptionForUserAndMgrField
