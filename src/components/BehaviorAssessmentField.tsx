import QuarterCard from "./common/QuarterCard"
import styled from "@emotion/styled"
import { InputField } from "./fields"
import Sarabun from "./common/Sarabun"
import QuarterCardTitleComponent from "./QuarterCardTitle"
import { useCallback, useMemo } from "react"
import AvatarImage from "../assets/images/profile-circle.svg"
import CustomIcon from "./common/Icon"
import { removeDecimalWhenZero } from "../utils/helper"
import BehaviorRow from "./BehaviorRow"
import { BehaviorTemplateDetail } from "../services/entity-typed"

const BehaviorAssessmentContainer = styled.div`
  margin-top: 24px;
`

const InputDiv = styled.div`
  margin: 10px 0 10px 0;
`

const MessageLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`

const RowContainer = styled.div`
  margin-bottom: 30px;
`

const ViewModeMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 11px;
`

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 18px;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const SideBySideContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 300px;
`

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  /* background-color: red; */
  flex-direction: column;
  margin-right: 20px;
`
const RightContainer = styled.div`
  flex: 1;
  display: flex;
  /* background-color: green; */
  flex-direction: column;
  margin-left: 20px;
`

const LeftMessage = styled.div`
  margin-left: 65px;
`

const RightMessage = styled.div`
  margin-left: 65px;
`

type BehaviorAssessmentProps = {
  viewMode?: boolean
  weight?: string
  name?: string
  currentUserName?: string
  isManagerEvaluate?: boolean
  behaviorTemplateDetails?: BehaviorTemplateDetail[]
}

const BehaviorAssessmentField = (props: BehaviorAssessmentProps) => {
  const {
    viewMode = false,
    weight = "0.00",

    isManagerEvaluate = true,
    behaviorTemplateDetails,
  } = props

  const renderBehaviorRows = useMemo(() => {
    return behaviorTemplateDetails?.map((behaviorTemplate, index) => {
      return (
        <BehaviorRow
          key={behaviorTemplate.id}
          index={index + 1}
          isManagerEvaluate={true}
          name={behaviorTemplate.name}
          description={behaviorTemplate.description}
        />
      )
    })
  }, [behaviorTemplateDetails])

  const required = useCallback((value: any) => (value ? undefined : "Required"), [])

  const renderMgrCommentEditMode = useMemo(() => {
    return (
      <>
        <MessageLabelContainer>
          <CustomIcon iconName="chatText" width={24} height={24} style={{ marginRight: 8 }} />
          <Sarabun type="H5" style={{ lineHeight: 1.8 }}>{`ข้อความเกี่ยวกับแบบประเมินพฤติกรรม ${
            !viewMode ? "(ถ้ามี)" : ""
          }`}</Sarabun>
        </MessageLabelContainer>
        <SideBySideContainer>
          <LeftContainer>
            <ViewModeMessageContainer>
              <AvatarImg src={AvatarImage} alt="avatar" />
              <NameContainer>
                <Sarabun type="H5">{`นาย ทดลอง ปรองดอง`}</Sarabun>
                <Sarabun type="Body2">ผู้ถูกประเมิน</Sarabun>
              </NameContainer>
            </ViewModeMessageContainer>
            <LeftMessage>
              <Sarabun type="Body1">{``}</Sarabun>
            </LeftMessage>
          </LeftContainer>
          <RightContainer>
            <ViewModeMessageContainer>
              <AvatarImg src={AvatarImage} alt="avatar" />
              <NameContainer>
                <Sarabun type="H5">{`นายทดลอง ปรองดอง`}</Sarabun>
                <Sarabun type="Body2">ผู้ประเมิน</Sarabun>
              </NameContainer>
            </ViewModeMessageContainer>
            <RightMessage>
              <InputDiv>
                <InputField
                  name={`kpiBehaviorTransaction.comment`}
                  placeholder="ระบุข้อความ หรือคำอธิบายเกี่ยวกับผลงานของคุณให้หัวหน้าเพื่อประกอบการประเมินเกรด"
                  isRequired={false}
                  required={false}
                  showDescription={false}
                  rows={6}
                  multiline={true}
                  defaultValue={``}
                  disabled={true}
                />
              </InputDiv>
            </RightMessage>
          </RightContainer>
        </SideBySideContainer>
      </>
    )
  }, [viewMode])

  return (
    <BehaviorAssessmentContainer style={{ display: "inherit" }}>
      <QuarterCard
        titleComponent={
          <QuarterCardTitleComponent
            leftIconName="smileyWhite"
            tooltipText="แบบประเมินพฤติกรรม"
            title={`แบบประเมินพฤติกรรม ${removeDecimalWhenZero(weight)}%`}
          />
        }
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 20 }} />
          <div
            style={{
              flex: 8,
              display: isManagerEvaluate ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              // border: '1px solid black',
              marginTop: 8,
              marginBottom: 21,
            }}
          >
            <Sarabun type="Body1">คะแนนที่ลูกทีมประเมินตนเอง</Sarabun>
          </div>
          <div
            style={{
              flex: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: '1px solid black',
              marginTop: 8,
              marginBottom: 21,
            }}
          >
            <Sarabun type="Body1">คะแนน</Sarabun>
          </div>
        </div>

        <InputField
          name={`kpiBehaviorTransaction.id`}
          placeholder={""}
          validate={required}
          required={true}
          style={{ display: "none" }}
        />
        <RowContainer>{renderBehaviorRows}</RowContainer>

        {renderMgrCommentEditMode}
      </QuarterCard>
    </BehaviorAssessmentContainer>
  )
}

export default BehaviorAssessmentField
