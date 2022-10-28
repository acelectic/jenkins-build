import styled from "@emotion/styled"
import { useCallback, useMemo } from "react"
import Sarabun from "../../../components/common/Sarabun"
import { InputField, SelectField } from "../../../components/fields"
import { BaseEntity, Scale } from "../../../services/entity-typed"
import { BehaviorTemplateDetail } from "../../../services/kpi-template/kpi-template-type"
import { Edit2 } from "react-feather"
import IconButton from "../../../components/common/IconButton"
import {
  GRAYSCALE_DARKGRAY_40,
  SECONDARY_BG,
  WHITE,
} from "../../../constants/colors"

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
`

const FieldContainer = styled.div<{
  viewMode: boolean
}>`
  flex: 8;
  background-color: ${({ viewMode }) => (viewMode ? WHITE : SECONDARY_BG)};
  padding: 14px 12px 14px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const ViewModeFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: flex-start; */
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

type BehaviorRowProps = {
  index: number
  viewMode?: boolean
  detail?: BaseEntity & {
    actual: string
    jsonBehaviorDetailId: string
    kpiBehaviorTransactionId: string
    kpiPeriodTemplatePositionId: string
    kpiTransactionId: string
    updaterId: string
    jsonScale: Scale
    behaviorTemplateDetail: BehaviorTemplateDetail
  }
  length?: number
  canEdit?: boolean
}

const ProbationRowDetail = (props: BehaviorRowProps) => {
  const {
    viewMode = false,
    detail,
    index,
    length = -1,
    canEdit = false,
  } = props
  // console.debug('detail', detail)

  const option = useMemo(() => {
    return detail?.jsonScale.scaleDetails.map((scaleDetail) => {
      return {
        label: `${scaleDetail.scaleName}-${scaleDetail.description}`,
        value: scaleDetail.value,
      }
    })
  }, [detail?.jsonScale.scaleDetails])

  const actualScore = useMemo(() => {
    if (detail?.actual === "0" || Number(detail?.actual) === 0) {
      return "-"
    }

    const scaleDetail = detail?.jsonScale.scaleDetails.find(
      (scaleDetail) => scaleDetail.value === Number(detail.actual)
    )
    return `${scaleDetail?.scaleName}  `
  }, [detail?.actual, detail?.jsonScale.scaleDetails])

  const required = useCallback(
    (value: any) => (value ? undefined : "Required"),
    []
  )

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
          <Sarabun style={{ lineHeight: "26px" }}>{index + 1}</Sarabun>
        </NumberCircle>
      </LabelContainer>
      <TextContainer>
        <Sarabun>{`${detail?.behaviorTemplateDetail.name ?? ""}`}</Sarabun>
        <Sarabun color={"gray"}>
          {detail?.behaviorTemplateDetail.description ?? ""}
        </Sarabun>
      </TextContainer>
      <FieldContainer viewMode={viewMode}>
        <InputField
          name={`kpiBehaviorTransaction.kpiBehaviorTransactionDetails[${index}].id`}
          placeholder={""}
          defaultValue={detail?.id ?? ""}
          validate={required}
          required={true}
          style={{ display: "none" }}
        />
        {viewMode ? (
          <ViewModeFieldContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Sarabun
                style={{ margin: `${canEdit ? "10px 40px 0px 100px" : ""}` }}
              >
                {actualScore}
              </Sarabun>
              {canEdit ? (
                <div>
                  <IconButton
                    icon={<Edit2 />}
                    onClick={() => {
                      console.debug("edit")
                    }}
                    iconSize={"medium"}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </ViewModeFieldContainer>
        ) : (
          <SelectField
            name={`kpiBehaviorTransaction.kpiBehaviorTransactionDetails[${index}].actual`}
            options={option}
            placeHolder="เลือกระดับคะแนน"
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              flex: 1,
            }}
            validate={required}
            required={true}
            isSpacialOption={true}
          />
        )}
      </FieldContainer>
    </RowContainer>
  )
}

export default ProbationRowDetail
