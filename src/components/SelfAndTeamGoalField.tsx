import QuarterCard from "./common/QuarterCard"
import styled from "@emotion/styled"
import { InputField } from "./fields"
import Sarabun from "./common/Sarabun"
import KPIReportCard from "./KPIReportCard"
import QuarterCardTitleComponent from "./QuarterCardTitle"
import { WHITE } from "../constants/colors"
import CustomIcon from "./common/Icon"
import { removeDecimalWhenZero } from "../utils/helper"
// import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import AvatarImage from "../assets/images/profile-circle.svg"

const SelfAndTeamGoalContainer = styled.div`
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

const KpiCardsContainer = styled.div`
  margin-bottom: 24px;
`

const KpiCardWrap = styled.div`
  margin-bottom: 16px;
`

const AvatarImg = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 18px;
`

const ViewModeMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 11px;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const EditTargetContainer = styled.div`
  display: flex;
  flex-direction: row;
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

type SelfAndTeamGoalProps = {
  viewMode?: boolean
  name?: string
  currentUserName?: string
  isManagerEvaluate?: boolean
  hideComment?: boolean
  showEditKpi?: boolean
  weight?: string
}

const SelfAndTeamGoalField = (props: SelfAndTeamGoalProps) => {
  // const { t } = useTranslation()
  const { viewMode = false, hideComment = false, showEditKpi = false, weight } = props

  const isShowSection = useMemo(() => {
    return weight !== "0.00"
  }, [weight])

  const renderKpiReportCard = useMemo(() => {
    return (
      <KpiCardWrap>
        <KPIReportCard backGroundColorOtherMode={"#052c36"} isEdit={!viewMode} />
      </KpiCardWrap>
    )
  }, [viewMode])

  const renderMgrCommentEditMode = useMemo(() => {
    return (
      <>
        <MessageLabelContainer>
          <CustomIcon iconName="chatText" width={24} height={24} style={{ marginRight: 8 }} />
          <Sarabun type="H5" style={{ lineHeight: 1.8 }}>{`ข้อความเกี่ยวกับเป้าหมาย KPI ${
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

            {/* <UploadFieldContainer>
              <>upload</>
            </UploadFieldContainer> */}
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
                  name="mgrComment"
                  placeholder="ระบุข้อความ หรือคำอธิบายเกี่ยวกับผลงานของคุณให้หัวหน้าเพื่อประกอบการประเมินเกรด"
                  isRequired={false}
                  required={false}
                  showDescription={false}
                  rows={6}
                  multiline={true}
                  defaultValue={""}
                  disabled={true}
                />
              </InputDiv>
              {/* <UploadFieldViewModeContainer>
                <>upload</>
              </UploadFieldViewModeContainer> */}
            </RightMessage>
          </RightContainer>
        </SideBySideContainer>
      </>
    )
  }, [viewMode])

  return (
    <SelfAndTeamGoalContainer style={{ display: isShowSection ? "inherit" : "none" }}>
      <QuarterCard
        titleComponent={
          <QuarterCardTitleComponent
            leftIconName="userWhite"
            title={`เป้าหมายจากคุณและทีม ${removeDecimalWhenZero(`${weight}`)}%`}
            tooltipText={"เป้าหมายจากคุณและทีม"}
            rightComponent={
              <>
                {showEditKpi && (
                  <EditTargetContainer>
                    <CustomIcon iconName="add" width={18} height={18} style={{ marginRight: 5 }} />
                    <Sarabun
                      color={WHITE}
                      weight={500}
                      size={14}
                      isLink={true}
                      style={{ color: WHITE, textDecorationColor: WHITE }}
                    >
                      แก้ไขเป้าหมาย
                    </Sarabun>
                  </EditTargetContainer>
                )}
              </>
            }
          />
        }
      >
        <KpiCardsContainer>{renderKpiReportCard}</KpiCardsContainer>

        {!hideComment && <>{renderMgrCommentEditMode}</>}
      </QuarterCard>
    </SelfAndTeamGoalContainer>
  )
}

export default SelfAndTeamGoalField
