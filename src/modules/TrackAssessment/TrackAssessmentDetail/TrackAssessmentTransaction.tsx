import styled from "@emotion/styled"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import Avatar from "../../../components/common/Avatar"
import { Divider } from "../../../components/common/Divider"
import Icon from "../../../components/common/Icon"
import QuarterCard from "../../../components/common/QuarterCard"
import Sarabun from "../../../components/common/Sarabun"
import QuarterCardTitle from "../../../components/QuarterCardTitle"
import {
  BLACK,
  GRAYSCALE_DARKGRAY_40,
  SECONDARY_BG,
  SECONDARY_MAIN,
  SEMANTIC_ERROR_BG,
  SEMANTIC_ERROR_DARK,
  SEMANTIC_SUCCESS_BG,
  SEMANTIC_SUCCESS_DARK,
  WHITE,
} from "../../../constants/colors"
import { AssessmentTransactionEvaluator } from "../../../services/entity-typed"
import { useScreen } from "../../../utils/responsive-helper"
import assessmentResult from "../../../assets/images/assessment-result.svg"
import TrackAssessmentTransactionRowDetail from "./TrackAssessmentTransactionRowDetail"
import { first, last, sum } from "lodash"
import { normalizeDateAndTimeTh } from "../../../utils/helper"
import { DropdownField } from "../../../components/fields"
import { Field } from "react-final-form"

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BehaviorAssessmentContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
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
  padding: 16px;
  margin-top: 16px;
  border-radius: 12px;
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

const TitleTextRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`

const TitleDescriptionText = styled.div`
  display: flex;
  padding: 12px;
  background-color: ${GRAYSCALE_DARKGRAY_40};
  border-radius: 8px;
  margin: 20px 0;
`

type TrackAssessmentProps = {
  assessmentDetailType?: "60" | "100"
  seq?: number
  targetScore?: number
  isOneYear?: boolean
  assessmentTransactionEvaluators?: AssessmentTransactionEvaluator[]
  isSameEvaluator?: boolean
  isSubmit: boolean
  descriptionForMgr?: string
}

const TrackAssessmentTransaction = (props: TrackAssessmentProps) => {
  const {
    seq = 1,
    targetScore = 80,
    assessmentDetailType = "60",
    assessmentTransactionEvaluators: evaluators,
    isSameEvaluator,
    isSubmit,
    descriptionForMgr = "ไม่มีข้อมูล",
  } = props
  const { isTablet } = useScreen()
  const { t } = useTranslation()

  const firstEvaluator = useMemo(() => first(evaluators), [evaluators])
  const secondEvaluator = useMemo(() => last(evaluators), [evaluators])

  const score = useMemo(() => {
    const scoreArray =
      seq === 1
        ? firstEvaluator?.assessmentTransactionDetails?.map((item) => {
            return Number(item.actual)
          })
        : secondEvaluator?.assessmentTransactionDetails?.map((item) => {
            return Number(item.actual)
          })
    return sum(scoreArray)
  }, [
    firstEvaluator?.assessmentTransactionDetails,
    secondEvaluator?.assessmentTransactionDetails,
    seq,
  ])

  const resultText = useMemo(() => {
    return (
      <Sarabun
        type="H1"
        style={{
          color: firstEvaluator?.jsonResult.isPassed
            ? `${SEMANTIC_SUCCESS_DARK}`
            : `${SEMANTIC_ERROR_DARK}`,
        }}
      >
        {t(firstEvaluator?.jsonResult.isPassed ? `ผ่าน` : `ไม่ผ่าน`)}
      </Sarabun>
    )
  }, [firstEvaluator?.jsonResult.isPassed, t])

  const renderTransactionDetailRows = useMemo(() => {
    return seq === 1
      ? firstEvaluator?.assessmentTransactionDetails?.map((item, index) => {
          return (
            <TrackAssessmentTransactionRowDetail
              index={index}
              titleName={item.name}
              description={item.description}
              actaul={item.actual}
              viewMode={true}
              key={item.id + index}
            />
          )
        })
      : secondEvaluator?.assessmentTransactionDetails?.map((item, index) => {
          return (
            <TrackAssessmentTransactionRowDetail
              index={index}
              titleName={item.name}
              description={item.description}
              actaul={item.actual}
              key={item.id + index}
              viewMode={true}
            />
          )
        })
  }, [
    firstEvaluator?.assessmentTransactionDetails,
    secondEvaluator?.assessmentTransactionDetails,
    seq,
  ])

  const commentBox = useMemo(() => {
    const evaluatorNumber = isSameEvaluator ? 1 : 2
    const list = []
    for (let i = 1; i <= evaluatorNumber; ++i) {
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
                <Sarabun type="H5">{`${
                  i === 1 ? firstEvaluator?.fullName : secondEvaluator?.fullName
                }`}</Sarabun>
                <Sarabun type="Body2">
                  {t(`ผู้ประเมิน${"  "}(หัวหน้าลำดับที่ ${i})`)}
                </Sarabun>
              </NameContainer>
            </ViewModeMessageContainer>
          </CommentDetailContainer>

          <CommentContainer>
            <Sarabun type="Body1">
              {i === 1
                ? firstEvaluator?.comment
                  ? firstEvaluator?.comment
                  : "-"
                : secondEvaluator?.comment
                ? secondEvaluator?.comment
                : "-"}
            </Sarabun>
          </CommentContainer>
        </div>
      )
    }
    return list
  }, [
    firstEvaluator?.comment,
    firstEvaluator?.fullName,
    isSameEvaluator,
    secondEvaluator?.comment,
    secondEvaluator?.fullName,
    t,
  ])

  const dropDownOption: BaseOptionType[] = useMemo(
    () => [
      {
        label: "ผ่าน",
        value: "true",
      },
      {
        label: "ไม่ผ่าน",
        value: "false",
      },
    ],
    []
  )

  return (
    <BehaviorAssessmentContainer style={{ display: "inherit" }}>
      <TitleTextRow>
        <Sarabun type="H3">
          {t(`ประเมินผลการทดลองงานครบ ${assessmentDetailType} วัน`)}
        </Sarabun>
        <Sarabun type="Body1">
          {`(ประเมินผลเมื่อ : ${normalizeDateAndTimeTh(
            seq === 1
              ? firstEvaluator?.updatedAt || ""
              : secondEvaluator?.updatedAt || ""
          )} วัน)`}
        </Sarabun>
      </TitleTextRow>
      <TitleDescriptionText>
        <Sarabun type="Body1">{`${descriptionForMgr}`}</Sarabun>
      </TitleDescriptionText>
      <QuarterCard
        titleComponent={
          <QuarterCardTitle
            title={t(`แบบประเมิน`)}
            leftIconName="smileyWhite"
          />
        }
        bodyStyle={{ padding: "24px", border: `1px solid ${SECONDARY_MAIN}` }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginTop: 12,
              marginBottom: 12,
              marginRight: 138,
            }}
          >
            <Sarabun type="Body1">{t(`คะแนน`)}</Sarabun>
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
                  boxSizing: "border-box",
                }}
              >
                <img src={assessmentResult} alt="title" />
              </div>
            </ScoreLeftBox>
            <ScoreRightBox
              style={{
                width: isTablet ? "100%" : "50%",
                paddingRight: "24px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ padding: "24px" }}>
                <Sarabun
                  type="H6"
                  style={{
                    padding: "0px",
                    whiteSpace: "nowrap",
                    marginBottom: "16px",
                    boxSizing: "border-box",
                  }}
                >
                  {t(`ผลการประเมินที่ระบบประเมินให้`)}
                </Sarabun>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "12px 30px",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      width: "65%",
                      boxSizing: "border-box",
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
                        boxSizing: "border-box",
                      }}
                    >
                      <Sarabun type="H6">{`${score}`}</Sarabun>
                      <Sarabun type="Body1">{t(`คะแนน`)}</Sarabun>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              {(isSameEvaluator || seq === 2) && isSubmit ? (
                <Field name={"result.isPassed"}>
                  {({ input }) => {
                    // console.debug("555", input.value, isSubmit)
                    return (
                      <ResultScoreBox
                        style={{
                          backgroundColor:
                            input.value === "true"
                              ? SEMANTIC_SUCCESS_BG
                              : SEMANTIC_ERROR_BG,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "8px",
                            paddingRight: "54px",
                            width: "100%",
                          }}
                        >
                          <div>
                            <Sarabun type="H6">{t(`ผลการประเมิน`)}</Sarabun>
                            <Sarabun type="Subtitle2">
                              {t(
                                `(เกณฑ์ผ่านการประเมินอยู่ที่ ${targetScore} คะแนนขึ้นไป)`
                              )}
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
                            <Icon
                              iconName={
                                input.value === "true"
                                  ? "checkCircle"
                                  : "xCircle"
                              }
                              width={24}
                              height={24}
                            />
                            <Sarabun
                              type="H1"
                              color={
                                input.value === "true"
                                  ? SEMANTIC_SUCCESS_DARK
                                  : SEMANTIC_ERROR_DARK
                              }
                            >
                              {input.value === "true" ? "ผ่าน" : "ไม่ผ่าน"}
                            </Sarabun>
                          </div>
                        </div>
                      </ResultScoreBox>
                    )
                  }}
                </Field>
              ) : (
                <ResultScoreBox
                  style={{
                    flexDirection: isTablet ? "column" : "row",
                    backgroundColor:
                      isSameEvaluator || seq === 2
                        ? `${SECONDARY_BG}`
                        : !firstEvaluator?.jsonResult.isPassed
                        ? `${SEMANTIC_ERROR_BG}`
                        : "",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      paddingRight: "54px",
                      width: "100%",
                    }}
                  >
                    <div>
                      <Sarabun type="H6">{t(`ผลการประเมิน`)}</Sarabun>
                      <Sarabun type="Subtitle2">
                        {t(
                          `(เกณฑ์ผ่านการประเมินอยู่ที่ ${targetScore} คะแนนขึ้นไป)`
                        )}
                      </Sarabun>
                    </div>

                    {seq === 1 && !isSameEvaluator ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "baseline",
                          gap: "8px",
                          paddingRight: "54px",
                        }}
                      >
                        <Icon
                          iconName={
                            firstEvaluator?.jsonResult.isPassed
                              ? "checkCircle"
                              : "xCircle"
                          }
                          width={24}
                          height={24}
                        />
                        {resultText}
                      </div>
                    ) : (
                      <DropdownField
                        name={"result.isPassed"}
                        options={dropDownOption}
                        style={{ backgroundColor: `${WHITE}` }}
                      />
                    )}
                  </div>
                </ResultScoreBox>
              )}
            </ScoreRightBox>
          </ScoreContent>
        </ScoreDiv>

        <MessageLabelContainer>
          <Icon
            iconName="chatText"
            width={24}
            height={22}
            style={{ marginRight: 8 }}
          />
          <Sarabun type="H4">
            {t(`ข้อความเกี่ยวกับแบบประเมินพฤติกรรม ${"(ถ้ามี)"}`)}
          </Sarabun>
        </MessageLabelContainer>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            border: `1px solid ${GRAYSCALE_DARKGRAY_40}`,
            width: "100%",
            borderRadius: "12px",
            padding: "24px",
            flexWrap: "wrap",
          }}
        >
          {commentBox}
        </div>
      </QuarterCard>
    </BehaviorAssessmentContainer>
  )
}

export default TrackAssessmentTransaction
