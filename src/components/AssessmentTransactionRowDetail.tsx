import styled from "@emotion/styled"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  WHITE,
} from "../constants/colors"
import Icon from "./common/Icon"
import Sarabun from "./common/Sarabun"

const RowContainer = styled.div<{
  isFirst: boolean
  isLast: boolean
}>`
  display: flex;
  flex-direction: row;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  min-height: 104px;
  border-top-left-radius: ${({ isFirst }) => (isFirst ? "8px" : "0px")};
  border-top-right-radius: ${({ isFirst }) => (isFirst ? "8px" : "0px")};
  overflow: hidden;
  border-bottom-left-radius: ${({ isLast }) => (isLast ? "8px" : "0px")};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? "8px" : "0px")};
  margin-top: -1px;
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`

const TextContainer = styled.div`
  flex: 20;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 0px 16px 0px;
  gap: 8px;
`

const FieldContainer = styled.div<{
  viewMode: boolean
  editMode: boolean
}>`
  background-color: ${WHITE};
  padding: 28px 16px 28px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ViewModeFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`

const NumberCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${GRAYSCALE_DARKGRAY_40};
`

type AssessmentTransactionRowDetailProps = {
  index: number
  viewMode?: boolean
  length?: number
  editMode?: boolean
  fieldArrayName?: string
  titleName?: string
  description?: string
}

const AssessmentTransactionRowDetail = (
  props: AssessmentTransactionRowDetailProps
) => {
  const { index, length = -1, titleName, description } = props
  let { viewMode = false, editMode = false } = props
  const isFirst = useMemo(() => {
    return index === 0
  }, [index])

  const isLast = useMemo(() => {
    return index + 1 === length
  }, [index, length])

  const { t } = useTranslation()

  return (
    <RowContainer isFirst={isFirst} isLast={isLast}>
      <LabelContainer>
        <NumberCircle>
          <Sarabun type="H5" style={{ lineHeight: "26px" }}>
            {index + 1}
          </Sarabun>
        </NumberCircle>
      </LabelContainer>
      <TextContainer>
        <Sarabun type="H6">{t(`${titleName}`)}</Sarabun>
        <Sarabun type="Body2" color={GRAYSCALE_DARKGRAY_80}>
          {t(`${description}`)}
        </Sarabun>
      </TextContainer>
      <FieldContainer viewMode={viewMode} editMode={editMode}>
        <ViewModeFieldContainer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Sarabun
              type="H4"
              style={{
                margin: "0px 12px 0px 100px",
                paddingTop: "6px",
                backgroundColor: "#E9FFF1",
                height: "48px",
                width: "56px",
                textAlign: "center",
                borderRadius: "8px",
                color: "#007528",
              }}
            >
              5.0
            </Sarabun>
            <div style={{ marginRight: "100px" }}>
              <Icon iconName="notePencil" />
            </div>
          </div>
        </ViewModeFieldContainer>
      </FieldContainer>
    </RowContainer>
  )
}

export default AssessmentTransactionRowDetail
