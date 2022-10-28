import styled from "@emotion/styled"
import { useCallback, useMemo } from "react"
import Sarabun from "./common/Sarabun"
import { DropdownField, InputField } from "./fields"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_DARKGRAY_80,
  SECONDARY_BG,
  SEMANTIC_SUCCESS_BG,
  SUCCESS,
  WHITE,
} from "../constants/colors"
// import { JsonScale } from "../services/entity-typed"

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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 10px 16px 13px;
  /* border: 1px solid green; */
`

const TextContainer = styled.div`
  flex: 20;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 0px 16px 0px;
  /* border: 1px solid blue; */
  margin-top: 4px;
`

const FieldContainer = styled.div<{
  viewMode: boolean
}>`
  flex: 8;
  background-color: ${({ viewMode }) => (viewMode ? WHITE : SECONDARY_BG)};
  padding: 14px 12px 14px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ViewModeFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;

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

const CrewScoreContainer = styled.div`
  min-width: 56px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

type BehaviorRowProps = {
  index: number
  viewMode?: boolean
  length?: number
  isManagerEvaluate?: boolean
  name?: string
  description?: string
}

const BehaviorRow = (props: BehaviorRowProps) => {
  const {
    viewMode = false,
    isManagerEvaluate = false,
    index,
    length = -1,
    name,
    description,
  } = props
  // console.debug('detail', detail)

  const option: BaseOptionType[] | undefined = []

  const required = useCallback((value: any) => (value ? undefined : "Required"), [])

  const isFirst = useMemo(() => {
    return index === 0
  }, [index])

  const isLast = useMemo(() => {
    return index + 1 === length
  }, [index, length])

  return (
    <RowContainer isFirst={isFirst} isLast={isLast}>
      <LabelContainer>
        <NumberCircle>
          <Sarabun type="H5" style={{ lineHeight: "26px" }}>
            {index}
          </Sarabun>
        </NumberCircle>
      </LabelContainer>
      <TextContainer>
        <Sarabun type="H6">{name}</Sarabun>
        <Sarabun type="Body2" color={GRAYSCALE_DARKGRAY_80} style={{ marginTop: 12 }}>
          {description}
        </Sarabun>
      </TextContainer>

      {isManagerEvaluate && (
        <FieldContainer viewMode={true}>
          <CrewScoreContainer style={{ backgroundColor: `${SEMANTIC_SUCCESS_BG}` }}>
            <Sarabun type="H4" color={SUCCESS}>
              4
            </Sarabun>
          </CrewScoreContainer>
        </FieldContainer>
      )}

      <FieldContainer viewMode={viewMode}>
        <InputField
          name={`kpiBehaviorTransaction.kpiBehaviorTransactionDetails[${index}].id`}
          placeholder={""}
          validate={required}
          required={true}
          style={{ display: "none" }}
        />
        {/* เคสประเมินตนเองวิวโหมด */}
        {!isManagerEvaluate && viewMode && (
          <ViewModeFieldContainer>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Sarabun type="H4" style={{ paddingRight: 4 }}>
                4
              </Sarabun>
              <Sarabun type="Body1" style={{ lineHeight: "33px" }}>
                `actual des`
              </Sarabun>
            </div>
          </ViewModeFieldContainer>
        )}

        {/* เคสประเมินตนเอง ไม่วิวโหมด */}
        {!isManagerEvaluate && !viewMode && (
          <DropdownField
            name={`kpiBehaviorTransaction.kpiBehaviorTransactionDetails[${index}].actual`}
            options={option}
            placeHolder="เลือกระดับคะแนน"
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              flex: 1,
              maxWidth: 280,
            }}
            validate={required}
            required={true}
            isSpacialOption={true}
            disabled={true}
          />
        )}

        {/* เคสประเมินคนอื่นไม่วิวโหมด */}
        {isManagerEvaluate && !viewMode && (
          <DropdownField
            name={`kpiBehaviorTransaction.kpiBehaviorTransactionDetails[${index}].actual`}
            options={option}
            placeHolder="เลือกระดับคะแนน"
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              flex: 1,
              maxWidth: 230,
            }}
            validate={required}
            required={true}
            isSpacialOption={true}
            disabled={true}
          />
        )}
      </FieldContainer>
    </RowContainer>
  )
}

export default BehaviorRow
