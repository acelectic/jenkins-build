import styled from "@emotion/styled"
import { useState } from "react"
import { KpiType } from "../services/enum-typed"
import CustomIcon from "./common/Icon"
import Sarabun from "./common/Sarabun"
import OldTag from "./common/OldTag"
import { ERROR, GRAYSCALE_DARKGRAY_80, PRIMARY_DARK, PRIMARY_MAIN } from "../constants/colors"
import { useTranslation } from "react-i18next"
import Progress from "./common/Progress"

// import { KpiTransactionDetail } from '../../services/entity-typed'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding-top: 16px;
`

const TitleDiv = styled.div<{ kpiType?: KpiType }>`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 20px;
`

const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 16px;
`

const PieIndexDiv = styled.div`
  border-radius: 50%;
  background-color: #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 32px;
  height: 32px;
  box-sizing: border-box;
`

const TitleTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 12px 0 12px;
  box-sizing: border-box;
  margin-right: 16px;
`

const SarabunDefault = styled(Sarabun)<{
  kpiType?: KpiType
  defaultFont?: string
  specialFont?: string
}>`
  color: ${({ kpiType, defaultFont, specialFont }) => {
    return kpiType === KpiType.COMPANY ? defaultFont : specialFont
  }};
`

const GoalTag = styled(OldTag)<{ kpiType: string | null | undefined }>`
  margin-left: 16px;
  visibility: ${({ kpiType }) => {
    return kpiType === KpiType.INDIVIDUAL ? "hidden" : "visible"
  }};
`

export const DisplayDetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  margin-left: 16px;
`

export const BorderLeft = styled.div`
  margin-top: 12px;
  border-left: 1.5px solid #dbdbdb;
  width: 0;
  height: 24px;
`

const DetailDiv = styled.div<{ kpiType?: KpiType }>`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 6px 0 3px 0;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  width: 130px;
  /* cursor: pointer; */
`

const ContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding-left: 56px;
`

export const Result = styled.div<{
  isEdit?: boolean
}>`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 0;
  width: 65%;
  background-color: ${({ isEdit }) => {
    return isEdit ? " #EDF6FF" : null
  }};
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  margin-top: 7px;
`

export const ActualScore = styled.div`
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  width: 205px;
  margin-top: 7px;
`

export const ProgressDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
`

export const AttachFileDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 130px;
`

type KPIReportCardProps = {
  isEdit: boolean
  backGroundColorDefault?: string
  backGroundColorOtherMode?: string
  fontColorDefault?: string
  fontColorOtherMode?: string
  index?: number
}

const KPIReportCard = (props: KPIReportCardProps) => {
  const { t } = useTranslation()
  const {
    // kpiTransactionDetail,
    isEdit = false,
    index = 1,
  } = props
  // const jsonScale = kpiTransactionDetail.jsonScale
  const [, /* showViewModal */ setShowViewModal] = useState<boolean>(false)
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Body>
          <TitleDiv kpiType={KpiType.COMPANY}>
            <TitleContent>
              <div>
                <PieIndexDiv>
                  <Sarabun type={"H5"} style={{ lineHeight: "26px" }}>{`${index}`}</Sarabun>
                </PieIndexDiv>
              </div>
              <TitleTextDiv>
                <Sarabun
                  type={"H6"}
                  style={{
                    lineHeight: "24px",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1px",
                  }}
                >
                  {`กำไร`}
                  <GoalTag
                    text=" ได้รับมอบหมาย"
                    kpiType={KpiType.COMPANY}
                    style={{
                      backgroundColor: `${PRIMARY_DARK}`,
                      height: "30px",
                    }}
                  />
                </Sarabun>
                <Sarabun
                  style={{ lineHeight: "20px", marginTop: 8 }}
                  type={"Body2"}
                  color={GRAYSCALE_DARKGRAY_80}
                >
                  {`กำไรที่ควรทำได้ในไตรมาสนี้`}
                </Sarabun>
              </TitleTextDiv>
            </TitleContent>
            <DisplayDetailDiv>
              <BorderLeft />
              <DetailDiv onClick={setShowViewModal.bind(null, true)}>
                <CustomIcon iconName="eye" width={24} height={24} />
                <SarabunDefault
                  style={{ lineHeight: "20px" }}
                  type={"Subtitle2"}
                  color={PRIMARY_MAIN}
                  weight={600}
                >
                  {t("ดูรายละเอียด")}
                </SarabunDefault>
              </DetailDiv>
            </DisplayDetailDiv>
          </TitleDiv>
          <ContentDiv>
            <Column>
              <Sarabun type={"Caption"} style={{ lineHeight: "18px" }} weight={600}>
                น้ำหนัก
              </Sarabun>
              <Sarabun type={"Subtitle1"} style={{ lineHeight: "22px" }} weight={600}>
                {`10 %`}
              </Sarabun>
            </Column>
            <Column>
              <Sarabun type={"Caption"} style={{ lineHeight: "18px" }} weight={600}>
                ค่าเป้าหมาย
              </Sarabun>
              <Sarabun type={"Subtitle1"} style={{ lineHeight: "22px" }} weight={600}>
                {`1 บาท`}
              </Sarabun>
            </Column>

            <Result isEdit={isEdit}>
              <ActualScore>
                <div style={{ display: "flex" }}>
                  <Sarabun
                    type={"Caption"}
                    style={{ lineHeight: "18px", display: "inline-block" }}
                    weight={600}
                  >
                    {t("ผลงานที่ทำได้")}
                  </Sarabun>
                  <Sarabun size={14} weight={300} color={ERROR}>
                    *
                  </Sarabun>
                </div>
                <Sarabun type={"Subtitle1"} style={{ lineHeight: "22px" }} weight={600}>
                  {`2 บาท`}
                </Sarabun>
              </ActualScore>
              <ProgressDiv>
                <Progress actual={10} scoreType={"test"} />
              </ProgressDiv>

              <DisplayDetailDiv>
                <BorderLeft
                // style={{
                //   borderWidth: !isEdit
                //     ? input.value
                //       ? "1px"
                //       : "0px"
                //     : "1px",
                // }}
                />
                <AttachFileDiv></AttachFileDiv>
              </DisplayDetailDiv>
            </Result>
          </ContentDiv>
        </Body>
      </div>
    </>
  )
}

export default KPIReportCard
