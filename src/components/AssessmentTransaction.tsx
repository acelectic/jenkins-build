import styled from "@emotion/styled"
import { useMemo } from "react"
import {
  BLACK,
  ERROR,
  GRAYSCALE_DARKGRAY_40,
  SECONDARY_BG,
  SECONDARY_MAIN,
  SEMANTIC_SUCCESS_BG,
  SEMANTIC_SUCCESS_DARK,
} from "../constants/colors"
import Icon from "./common/Icon"
import QuarterCard from "./common/QuarterCard"
import Sarabun from "./common/Sarabun"
import assessmentResult from "../assets/images/assessment-result.svg"
import { useScreen } from "../utils/responsive-helper"
import { BehaviorTemplateDetail } from "../services/entity-typed"
import Avatar from "./common/Avatar"
import QuarterCardTitle from "./QuarterCardTitle"
import Input from "./common/Input"
import { Box, Divider } from "@mui/material"
import AssessmentTransactionRowDetail from "./AssessmentTransactionRowDetail"
import { useTranslation } from "react-i18next"
import { DropdownField, InputField } from "./fields"

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BehaviorAssessmentContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
`
const ScoreDiv = styled.div`
  margin: 10px 0 16px 0;
`
const ScoreContent = styled.div`
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  margin: 10px 0 10px 0;
  border-radius: 8px;
  display: flex;
`
const ScoreLeftBox = styled.div`
  width: 50%;
`

const ScoreRightBox = styled.div`
  width: 50%;
`
const ResultScoreBox = styled.div`
  background-color: ${SEMANTIC_SUCCESS_BG};
  height: 100px;
  align-items: center;
  text-align: justify;
  display: flex;
  justify-content: space-between;
  padding: 0px 84px 0px 20px;
  margin-top: 16px;
  border-radius: 12px;
  width: auto;
  max-width: 100%;
`

const MessageLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  margin: 24px 0 16px 0;
`

const RowContainer = styled.div`
  margin-bottom: 30px;
`

const ViewModeMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`

const CommentContainer = styled.div`
  flex: 10;
`

const CommentDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
const CommentLastThreeMonths = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`
const OneYearScoreBox = styled.div`
  display: grid;
  grid-template-columns: minmax(50px, max-content) auto;
  grid-column-gap: 20px;

  background-color: ${SECONDARY_BG};
  min-height: 72px;
  align-items: center;
  text-align: justify;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-top: 37px;
  border-radius: 12px;
`
const ResultScoreLayout = styled(Box)<{ viewMode?: boolean }>`
  ${({ viewMode }) =>
    viewMode
      ? `* {
    word-break: break-word;
    white-space: break-spaces;
    height: auto;
    div.MuiInput-root {
      padding: 8px;
      height: auto !important;
    }
  }`
      : ""}
`

type BehaviorAssessmentProps = {
  seq?: number
  behaviorTemplateDetails: BehaviorTemplateDetail[]
  targetScore?: number
  isOneYear?: boolean
}

const AssessmentTransaction = (props: BehaviorAssessmentProps) => {
  const { seq = 1, targetScore = 80, behaviorTemplateDetails, isOneYear = false } = props
  const { isTablet } = useScreen()
  const { t } = useTranslation()

  const score = useMemo(() => {
    return 82
  }, [])

  const resultText = useMemo(() => {
    return (
      <Sarabun type="H1" style={{ color: `${SEMANTIC_SUCCESS_DARK}` }}>
        {t(`ผ่าน`)}
      </Sarabun>
    )
  }, [t])

  const renderTransactionDetailRows = useMemo(() => {
    return behaviorTemplateDetails.map((item, index) => {
      return (
        <AssessmentTransactionRowDetail
          index={index}
          titleName={item.name}
          description={item.description}
        />
      )
    })
  }, [behaviorTemplateDetails])

  const commentBox = useMemo(() => {
    const list = []
    for (let i = 1; i <= seq; ++i) {
      if (i === seq) {
        list.push(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: seq !== 1 ? "50%" : "100%",
              gap: "16px",
              // paddingBottom: "24px",
            }}
          >
            <CommentDetailContainer>
              <ViewModeMessageContainer>
                <Avatar width={64} height={64} />
                <NameContainer>
                  <Sarabun type="H5">{"ทดลอง ปรองดอง"}</Sarabun>
                  <Sarabun type="Body2">{t(`ผู้ประเมิน${"  "}(หัวหน้าลำดับที่ ${i})`)}</Sarabun>
                </NameContainer>
              </ViewModeMessageContainer>
            </CommentDetailContainer>
            <div>
              <Input
                placeholder={t(
                  `ระบุข้อความ หรือคำอธิบายเกี่ยวกับผลงานของคุณให้หัวหน้าเพื่อประกอบการประเมินเกรด`,
                )}
                isRequired={false}
                required={false}
                showDescription={false}
                rows={6}
                multiline={true}
                disabled={true}
              />
            </div>
          </div>,
        )
      } else {
        list.push(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              gap: "16px",
              paddingBottom: "32px",
            }}
          >
            <CommentDetailContainer>
              <ViewModeMessageContainer>
                <Avatar width={64} height={64} />
                <NameContainer>
                  <Sarabun type="H5">{"ทดลอง ปรองดอง"}</Sarabun>
                  <Sarabun type="Body2">{t(`ผู้ประเมิน${"  "}(หัวหน้าลำดับที่ ${i})`)}</Sarabun>
                </NameContainer>
              </ViewModeMessageContainer>
            </CommentDetailContainer>

            <CommentContainer>
              <Sarabun type="Body1">{"ผลงานยอดเยี่ยมมากครับ พัฒนาต่อไปนะครับ"}</Sarabun>
            </CommentContainer>
          </div>,
        )
      }
    }
    return list
  }, [seq, t])

  return (
    <BehaviorAssessmentContainer style={{ display: "inherit" }}>
      <QuarterCard
        titleComponent={<QuarterCardTitle title={t(`แบบประเมิน`)} leftIconName="smileyWhite" />}
        bodyStyle={{ padding: "24px", border: `1px solid ${SECONDARY_MAIN}` }}
      >
        <Sarabun type="Body1">
          {t(`กรุณาตรวจสอบคะแนนที่หัวหน้าคนก่อนหน้าประเมินไว้
          และสามารถแก้ไขได้หากผลการประเมินไม่ถูกต้อง`)}
        </Sarabun>
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: 40,
              marginBottom: 12,
              marginRight: 120,
            }}
          >
            <Sarabun type="Body1">{t(`คะแนนระดับฝ่าย`)}</Sarabun>
          </div>
        </div>
        <RowContainer>{renderTransactionDetailRows}</RowContainer>

        <ScoreDiv>
          <MessageLabelContainer>
            <Icon
              iconName="clipBoardText"
              width={20}
              height={25}
              style={{
                marginRight: "8px",
              }}
              stroke={BLACK}
            />
            <Sarabun type="H4" style={{ marginBottom: "4px" }}>
              {t(`ผลการประเมิน`)}
            </Sarabun>
          </MessageLabelContainer>
          <ScoreContent style={{ flexDirection: isTablet ? "column" : "row" }}>
            <ScoreLeftBox style={{ width: isTablet ? "100%" : "50%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <img src={assessmentResult} alt="title" />
              </div>
            </ScoreLeftBox>
            {isOneYear ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "16px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Sarabun
                    type="Body1"
                    style={{
                      paddingTop: "4px",
                      marginRight: "80px",
                      minWidth: "100px",
                      whiteSpace: "nowrap",
                    }}
                  >{`คะแนนเฉลี่ยของการประเมิน`}</Sarabun>
                  <Sarabun
                    type="H5"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >{`4.5`}</Sarabun>
                  <Sarabun
                    type="Body1"
                    style={{
                      paddingTop: "4px",
                      marginLeft: "80px",
                      whiteSpace: "nowrap",
                    }}
                  >{`คะแนน`}</Sarabun>
                </div>
                <OneYearScoreBox>
                  <Row>
                    <Sarabun type="H6" style={{ whiteSpace: "nowrap" }}>
                      ผลการประเมินที่คุณให้
                    </Sarabun>
                    <span style={{ color: `${ERROR}` }}>*</span>
                  </Row>
                  <ResultScoreLayout viewMode={true}>
                    <DropdownField
                      name="grade"
                      options={[{ label: "5.0 เกินความคาดหวังเล็กน้อย", value: "5" }]}
                      placeHolder="เลือกระดับคะแนน"
                      style={{
                        backgroundColor: "white",
                        borderRadius: 8,
                        flex: 1,
                      }}
                      isSpacialOption={true}
                      viewMode={true}
                    />
                  </ResultScoreLayout>
                </OneYearScoreBox>
              </div>
            ) : (
              <ScoreRightBox style={{ width: isTablet ? "100%" : "50%" }}>
                <div style={{ padding: "24px" }}>
                  <Sarabun
                    type="H6"
                    style={{
                      padding: "0px",
                      whiteSpace: "nowrap",
                      marginBottom: "16px",
                    }}
                  >
                    {t(`ผลการประเมินที่ระบบประเมินให้`)}
                  </Sarabun>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        padding: "12px 30px",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        width: "65%",
                      }}
                    >
                      <Sarabun type="Body1">{t(`คะแนนการประเมิน `)}</Sarabun>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                          gap: "44px",
                          marginRight: "26px",
                        }}
                      >
                        <Sarabun type="H6">{`${score}`}</Sarabun>
                        <Sarabun type="Body1">{t(`คะแนน`)}</Sarabun>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
                <ResultScoreBox style={{ flexDirection: isTablet ? "column" : "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "baseline",
                      gap: "8px",
                      paddingRight: "54px",
                    }}
                  >
                    <div>
                      <Sarabun type="H6">{t(`ผลการประเมิน`)}</Sarabun>
                      <Sarabun type="Subtitle2">
                        {t(`(เกณฑ์ผ่านการประเมินอยู่ที่ ${targetScore} คะแนนขึ้นไป)`)}
                      </Sarabun>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                        gap: "8px",
                        paddingRight: "54px",
                      }}
                    >
                      <Icon iconName="checkCircle" width={24} height={24} />
                      {resultText}
                    </div>
                  </div>
                </ResultScoreBox>
              </ScoreRightBox>
            )}
          </ScoreContent>
        </ScoreDiv>
        {isOneYear && (
          <CommentLastThreeMonths>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <Icon iconName="folderOpen" />
              <Sarabun type="H5" style={{ padding: "8px" }}>
                ผลงานโดดเด่นในรอบ 3 เดือนล่าสุด (ถ้ามี)
              </Sarabun>
            </div>
            <Box height={12} />

            <InputField name="topPerformances" rows={6} multiline={true} disabled={true} />
          </CommentLastThreeMonths>
        )}

        <MessageLabelContainer>
          <Icon iconName="chatText" width={24} height={22} style={{ marginRight: 8 }} />
          <Sarabun type="H4">{t(`ข้อความเกี่ยวกับแบบประเมินพฤติกรรม ${"(ถ้ามี)"}`)}</Sarabun>
        </MessageLabelContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
            width: "100%",
            borderRadius: "12px",
            padding: "24px",
            // gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {commentBox}
        </div>
      </QuarterCard>
    </BehaviorAssessmentContainer>
  )
}

export default AssessmentTransaction
