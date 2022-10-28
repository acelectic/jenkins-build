import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useMemo } from "react"
import { useTranslation } from "react-i18next"
import Avatar from "./common/Avatar"
import Icon from "./common/Icon"
import Sarabun from "./common/Sarabun"
import Tab, { TabItem } from "./common/Tab"

const HeaderBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  gap: 8px;
  height: 150px;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  box-sizing: border-box;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  text-align: start;
  flex-direction: column;
  box-sizing: border-box;
`

const ResultDiv = styled.div<{
  result: string
  isOneYear?: boolean
}>`
  display: flex;
  width: 100%;

  padding: 12px;
  gap: 4px;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${({ result, isOneYear }) => {
    return isOneYear && result !== "รอผล"
      ? "#E9FFF1"
      : result === "ผ่าน"
      ? "#E9FFF1"
      : result === "ไม่ผ่าน"
      ? "#FFE5E5"
      : "#FFF4EB"
  }}; ;
`

const WaitingDiv = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: row;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`

export type ProbationManagerTabItem = {
  name?: string
  role?: string
  result?: string
  date?: string
  score?: number
  content?: ReactNode
  disabled?: boolean
  avatar?: string
  isSummitted?: boolean
}

type ProbationManagerTabProps = {
  items?: ProbationManagerTabItem[]
  defaultTab?: number
  tabMode?: "Probation" | "OneYear"
  defaultTabMarginBottom?: number
  contentStyle?: CSSProperties
}

const ProbationManagerTab = (props: ProbationManagerTabProps) => {
  const {
    items = [],
    defaultTab = 1,
    tabMode = "OneYear",
    defaultTabMarginBottom,
    contentStyle,
  } = props
  const { t } = useTranslation()

  const tabProps: TabItem[] = useMemo(() => {
    return items.map((item, index) => {
      return {
        label: (
          <HeaderBody key={index}>
            <Row>
              <Avatar src={item.avatar} />
              <Column>
                <Sarabun type="Caption" weight={600} style={{ lineHeight: "18px" }}>
                  {t(`หัวหน้าลำดับที่ ${item.role}`)}
                </Sarabun>
                <Sarabun type="Subtitle1" style={{ lineHeight: "22px" }}>
                  {t(`${item.name}`)}
                </Sarabun>
              </Column>
            </Row>
            <ResultDiv result={item.result || ""} isOneYear={tabMode === "OneYear"}>
              <Sarabun type="Caption" weight={600} style={{ lineHeight: "18px" }}>
                {t(`ผลการประเมิน `)}
                {/*หากไม่มีผลลัพธ์มาก็จะไม่แสดงวันที่*/}
                <span style={{ color: "#6E6D72" }}>
                  {item.result !== "รอผล" ? `${t("ประเมินเมื่อ")}: ${item.date}` : ""}
                </span>
              </Sarabun>
              {/*ผลลัพธ์ประเภทไหน*/}
              {tabMode === "OneYear" ? (
                item.result !== "รอผล" ? (
                  <Sarabun type="H6" color="#007528">
                    {t(`${item.score}`)}
                  </Sarabun>
                ) : (
                  <WaitingDiv>
                    <Icon iconName="hourGlassLow" width={20} height={20} />
                    <Sarabun type="H6" color="#AB4D00" style={{ marginBottom: "4px" }}>
                      {t(`${item.result}`)}
                    </Sarabun>
                  </WaitingDiv>
                )
              ) : item.result === "ผ่าน" ? (
                /*หากโหมดของ Tab ที่ใช้เป็นโหมดสำหรับ OneYear ก็จะแสดงแบบหนึ่งถ้าไม่ใช่ก็จะแสดงอีกแบบหนึ่ง*/
                <WaitingDiv>
                  <Icon iconName="checkCircle" width={20} height={20} />
                  <Sarabun type="H6" color="#007528" style={{ marginBottom: "2px" }}>
                    {t(`${item.result}`)}
                  </Sarabun>
                </WaitingDiv>
              ) : item.result === "รอผล" /*ผลลัพธ์ประเภทไหน*/ ? (
                <WaitingDiv>
                  <Icon iconName="hourGlassLow" width={20} height={20} />
                  <Sarabun type="H6" color="#AB4D00" style={{ marginBottom: "4px" }}>
                    {t(`${item.result}`)}
                  </Sarabun>
                </WaitingDiv>
              ) : (
                /*ผลลัพธ์ประเภทไหน*/
                <WaitingDiv>
                  <Icon iconName="xCircle" width={20} height={20} />
                  <Sarabun type="H6" color="#BB0000" style={{ marginBottom: "2px" }}>
                    {t(`${item.result}`)}
                  </Sarabun>
                </WaitingDiv>
              )}
            </ResultDiv>
          </HeaderBody>
        ),
        content: item.content,
        disabled: item.disabled,
      }
    })
  }, [items, t, tabMode])

  return (
    <Tab
      items={tabProps}
      defaultTab={defaultTab}
      defaultTabMarginBottom={defaultTabMarginBottom}
      contentStyle={contentStyle}
    />
  )
}

export default ProbationManagerTab
