import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import DevelopmentGuideImage from "../assets/images/development-guide.png"

import { BLACK, GRAYSCALE_DARKGRAY_40, SECONDARY_BG, WHITE } from "../constants/colors"

import Sarabun from "./common/Sarabun"
import { DropdownField } from "./fields"
import { CalKpiPercent } from "./ModalKpiTemplateExample"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: #ffffff;
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 24px 24px 24px 24px;
`

const Content = styled.div`
  display: flex;
  height: fit-content;
  box-sizing: border-box;
  flex-direction: row;
`

const LeftBox = styled.div`
  display: flex;
  border: 0px solid ${BLACK};
  width: 50%;
  box-sizing: border-box;
  min-width: 460px;
  height: 366px;
  /* margin-top: 28px; */
`
const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  /* border: 1px solid greenyellow; */
  box-sizing: border-box;
  width: 50%;
  height: 366px;
  /* padding-top: 28px; */
  /* margin-top: 28px; */
`

const BottomRightBoxArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 19px 25px 12px 40px;
  background-color: ${SECONDARY_BG};
  box-sizing: border-box;
  border-radius: 12px;
`
const YouEvaluateScore = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  box-sizing: border-box;
`
const YouEvaluateDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  /* border: 1px solid ${BLACK}; */
  box-sizing: border-box;
`
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ScoreNumberArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 50%;
  box-sizing: border-box;
  border: 0px solid blue;
`
const ScoreNumberBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  border: 0px solid green;
  box-sizing: border-box;
`

const ScoreBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 65%;
  box-sizing: border-box;
  border: 0px solid black;
`

const ScoreUnit = styled.div`
  display: flex;
  /* padding-top: 4px; */
  width: 35%;
  justify-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
  border: 0px solid black;
`

const Underline = styled(Box)`
  height: 1px;
  border-top: 1px solid ${GRAYSCALE_DARKGRAY_40};
  width: 100%;
`
const ScoreArea = styled.div`
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
`
const ScoreNameArea = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  width: 50%;
  border: 0px solid red;
`

type Props = {
  isViewMode?: boolean
  isCompleteAllScore?: boolean
  data?: CalKpiPercent
}

const ScoreAssessment = (props: Props) => {
  const { isViewMode = false, isCompleteAllScore = false, data } = props
  // const { calBehavior, calKpi, calKpiCompany, calKpiOther } = score
  const { t } = useTranslation()

  return (
    <Body>
      <Content>
        <LeftBox>
          <img src={DevelopmentGuideImage} alt="title" />
        </LeftBox>

        <RightBox>
          {/* <ScoreDetail
            scores={10}
            bfCalibrateStatus={currentKpiTransaction?.bfCalibrateStatus}
          /> */}
          <Sarabun type="H6">{t("คะแนนที่ระบบประเมินให้")}</Sarabun>
          {data?.calCompany && data.calCompany > 0 ? (
            <>
              <ScoreArea>
                <ScoreNameArea>
                  <Sarabun type="Body1">{t(`คะแนน KPI ขององค์กร (${data.calCompany}%) `)}</Sarabun>
                </ScoreNameArea>
                <ScoreNumberArea>
                  <ScoreNumberBox>
                    <ScoreBox>
                      <Sarabun type="H6" weight={700} lineHeight={"22"}>
                        10
                      </Sarabun>
                    </ScoreBox>
                    <ScoreUnit style={{ marginBottom: 2 }}>
                      <Sarabun type="Body1">{t("คะแนน")}</Sarabun>
                    </ScoreUnit>
                  </ScoreNumberBox>
                </ScoreNumberArea>
              </ScoreArea>
              <Underline />
            </>
          ) : null}
          {data?.calKpi && data.calKpi > 0 ? (
            <>
              <ScoreArea>
                <ScoreNameArea>
                  <Sarabun type="Body1">{t(`คะแนน KPI ที่กำหนดเอง (${data.calKpi}%) `)}</Sarabun>
                </ScoreNameArea>
                <ScoreNumberArea>
                  <ScoreNumberBox>
                    <ScoreBox>
                      <Sarabun type="H6" weight={700} lineHeight={"22"}>
                        10
                      </Sarabun>
                    </ScoreBox>
                    <ScoreUnit style={{ marginBottom: 2 }}>
                      <Sarabun type="Body1">{t("คะแนน")}</Sarabun>
                    </ScoreUnit>
                  </ScoreNumberBox>
                </ScoreNumberArea>
              </ScoreArea>
              <Underline />
            </>
          ) : null}
          {data?.calOther && data.calOther > 0 ? (
            <>
              <ScoreArea>
                <ScoreNameArea>
                  <Sarabun type="Body1">{t(`คะแนน KPI อื่นๆ (${data.calOther}%) `)}</Sarabun>
                </ScoreNameArea>
                <ScoreNumberArea>
                  <ScoreNumberBox>
                    <ScoreBox>
                      <Sarabun type="H6" weight={700} lineHeight={"22"}>
                        10
                      </Sarabun>
                    </ScoreBox>
                    <ScoreUnit style={{ marginBottom: 2 }}>
                      <Sarabun type="Body1">{t("คะแนน")}</Sarabun>
                    </ScoreUnit>
                  </ScoreNumberBox>
                </ScoreNumberArea>
              </ScoreArea>
              <Underline />
            </>
          ) : null}
          {data?.calBehavior && data.calBehavior > 0 ? (
            <>
              <ScoreArea>
                <ScoreNameArea>
                  <Sarabun type="Body1">{t(`คะแนนพฤติกรรม (${data.calBehavior}%) `)}</Sarabun>
                </ScoreNameArea>
                <ScoreNumberArea>
                  <ScoreNumberBox>
                    <ScoreBox>
                      <Sarabun type="H6" weight={700} lineHeight={"22"}>
                        10
                      </Sarabun>
                    </ScoreBox>
                    <ScoreUnit style={{ marginBottom: 2 }}>
                      <Sarabun type="Body1">{t("คะแนน")}</Sarabun>
                    </ScoreUnit>
                  </ScoreNumberBox>
                </ScoreNumberArea>
              </ScoreArea>
              <Underline />
            </>
          ) : null}
          <ScoreArea>
            <ScoreNameArea>
              <Sarabun type="Body1">{t(`รวม`)}</Sarabun>
            </ScoreNameArea>
            <ScoreNumberArea>
              <ScoreNumberBox>
                <ScoreBox>
                  <Sarabun type="H6" weight={700} lineHeight={"22"}>
                    10
                  </Sarabun>
                </ScoreBox>
                <ScoreUnit style={{ marginBottom: 2 }}>
                  <Sarabun type="Body1">{t("คะแนน")}</Sarabun>
                </ScoreUnit>
              </ScoreNumberBox>
            </ScoreNumberArea>
          </ScoreArea>
          <Underline />
          <BottomRightBoxArea style={isViewMode ? { backgroundColor: `${SECONDARY_BG}` } : {}}>
            {/* <BottomRightBoxArea style={{ backgroundColor: SEMANTIC_SUCCESS_BG }}> */}
            <YouEvaluateDetail style={isViewMode ? { width: "50%" } : {}}>
              <Sarabun type="H6">{t(`คะแนนที่คุณให้`)}</Sarabun>
              <Info>
                <Sarabun type="Subtitle2" style={{ textDecoration: "underline" }}>
                  {t(`ดูคะแนนย้อนหลัง`)}
                </Sarabun>
              </Info>
            </YouEvaluateDetail>
            <YouEvaluateScore style={isViewMode ? { width: "50%", alignItems: "end" } : {}}>
              {isViewMode ? (
                <>
                  <ScoreNumberBox>
                    <ScoreBox>
                      <Sarabun type="H1">5</Sarabun>
                    </ScoreBox>

                    <ScoreUnit>
                      <Sarabun style={{ paddingBottom: 5 }} type="Subtitle1">
                        {t("คะแนน")}
                      </Sarabun>
                    </ScoreUnit>
                  </ScoreNumberBox>
                </>
              ) : (
                <>
                  {isCompleteAllScore ? (
                    <>
                      <DropdownField
                        name={"mgrGrade"}
                        style={{
                          width: "250px",
                          backgroundColor: WHITE,
                          borderRadius: "8px",
                        }}
                        options={[]}
                        label=""
                        onChange={() => {}}
                        disabled={true}
                      />
                    </>
                  ) : (
                    <>
                      <Sarabun size={18} weight={700} color={WHITE}>
                        {t(`กรุณารอคะแนนในแต่ละส่วนให้ครบก่อน`)}
                      </Sarabun>
                    </>
                  )}
                </>
              )}
            </YouEvaluateScore>
          </BottomRightBoxArea>
        </RightBox>
      </Content>
      {/* {currentKpiTransaction?.bfCalibrateStatus && (
        <AlertBox>
          <Alert type="error" text={forceCloseMsg} size="wrapContent" />
        </AlertBox>
      )} */}
    </Body>
  )
}

export default ScoreAssessment
