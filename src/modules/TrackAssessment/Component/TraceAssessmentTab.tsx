import * as React from "react"
import { Tab as MuiTab } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import { TabPanel as MuiTabPanel } from "@mui/lab/"
import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useCallback, useState } from "react"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
  SECONDARY_DARK,
  SECONDARY_LIGHT,
  WHITE,
} from "../../../constants/colors"
import Sarabun from "../../../components/common/Sarabun"

const AntTabs = styled(TabList)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
  borderRadius: "8px 8px 0 0 ",
  overflow: "hidden",
  boxSizing: "border-box",
})

const TabPanel = styled(MuiTabPanel)`
  display: flex;
  padding: 0px;
  box-sizing: border-box;
`

const ContentDiv = styled.div<{
  isDefaultTab: boolean
  defaultTabMarginBottom: number
}>`
  margin-bottom: ${({ isDefaultTab, defaultTabMarginBottom }) => {
    return isDefaultTab ? `${defaultTabMarginBottom}px` : 0
  }};
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${WHITE};
  box-sizing: border-box;
`

const ActiveTab = styled(MuiTab)<{
  isActive?: boolean
  index: number
  itemLength: number
}>`
  padding: 0px;
  background-color: ${({ isActive }) => {
    return isActive ? `${WHITE}` : `${GRAYSCALE_LIGHTGRAY_10}`
  }};
  min-width: ${({ index, itemLength }) => {
    return index === itemLength - 1 ? `50%` : ""
  }};
  border-radius: ${({ index, itemLength }) => {
    return index === 0
      ? "8px 0 0 0"
      : index === itemLength - 2
      ? "0 8px 0 0"
      : "0 0 0 0"
  }};
  border-bottom: ${({ isActive }) => {
    return !isActive ? `1px solid ${GRAYSCALE_DARKGRAY_40}` : null
  }};
`

const TopBack = styled.div<{
  defaultTab: number
  index: number
  itemLength: number
}>`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 8px;
  border-radius: ${({ index, itemLength }) => {
    return index === 0
      ? "8px 0 0 0"
      : index === itemLength - 2
      ? "0 8px 0 0"
      : "0 0 0 0"
  }};
`

const TopFront = styled.div<{
  defaultTab: number
  index: number
  itemLength: number
  isActive: boolean
  currentTab: number
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ index, itemLength }) => {
    return index !== itemLength - 1
      ? `${SECONDARY_LIGHT}`
      : `${GRAYSCALE_LIGHTGRAY_10}`
  }};
  border-radius: ${({ index, itemLength }) => {
    return index === itemLength - 2 ? "0 8px 0 0" : null
  }};
  border-right: ${({ currentTab, isActive, index, itemLength }) => {
    return index !== itemLength - 2 &&
      index !== 0 &&
      !isActive &&
      index + 1 - currentTab !== -1
      ? `1px solid ${GRAYSCALE_DARKGRAY_40}`
      : null
  }};
  border-left: ${({ isActive, currentTab, index, itemLength }) => {
    return index !== itemLength - 2 &&
      index !== 0 &&
      !isActive &&
      currentTab - index + 1 !== 1
      ? `1px solid ${GRAYSCALE_DARKGRAY_40}`
      : null
  }};
  border: ${({ index, itemLength }) => {
    return index === itemLength - 1 ? 0 : null
  }};
`

const TopCurrent = styled.div<{
  isActive: boolean
}>`
  width: ${({ isActive }) => {
    return isActive ? "100%" : 0
  }};
  height: 100%;
  background-color: ${SECONDARY_DARK};
  border-radius: 8px 8px 0 0;
`

const ContentTab = styled.div<{
  isActive: boolean
  defaultTab: number
  index: number
  itemLength: number
}>`
  display: flex;
  border: ${({ isActive }) => {
    return !isActive ? `1px solid ${GRAYSCALE_DARKGRAY_40}` : null
  }};
  border-left: ${({ index, isActive }) => {
    return index === 0 && isActive ? `1px solid ${GRAYSCALE_DARKGRAY_40}` : null
  }};
  border-right: ${({ index, isActive, itemLength }) => {
    return index === itemLength - 1 && isActive
      ? `1px solid ${GRAYSCALE_DARKGRAY_40}`
      : null
  }};
  border-top: ${({ index, itemLength }) => {
    return index === itemLength - 1 ? 0 : null
  }};
  flex-direction: row;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 16px;
`

const NoticeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`

const LabelDiv = styled.div`
  width: 100%;
  height: 100%;
`

export type TrackAssessmentTabItem = {
  label: ReactNode
  content?: ReactNode
  isNotice?: boolean
  noticeNumber?: number
  disabled?: boolean
}

type TrackAssessmentTabProps = {
  items: TrackAssessmentTabItem[]
  defaultTab?: number
  style?: CSSProperties
  defaultTabMarginBottom?: number
  contentStyle?: CSSProperties
}

const TrackAssessmentTab = (props: TrackAssessmentTabProps) => {
  const {
    style,
    items,
    defaultTab = 1,
    defaultTabMarginBottom = 0,
    contentStyle,
  } = props
  const [currentTab, setCurrentTab] = useState<string>(`${defaultTab}`)

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newTab: string) => {
      setCurrentTab(newTab)
    },
    []
  )

  return (
    <TabContext value={currentTab}>
      <AntTabs style={style} variant="fullWidth" onChange={handleChange}>
        {items.map((item, index) => {
          return (
            <ActiveTab
              key={index}
              isActive={`${index + 1}` === currentTab ? true : false}
              index={index}
              itemLength={items.length}
              label={
                <LabelDiv>
                  <TopBack
                    defaultTab={defaultTab}
                    index={index}
                    itemLength={items.length}
                  >
                    <TopFront
                      defaultTab={defaultTab}
                      index={index}
                      itemLength={items.length}
                      isActive={currentTab === `${index + 1}`}
                      currentTab={Number(currentTab)}
                    >
                      <TopCurrent isActive={currentTab === `${index + 1}`} />
                    </TopFront>
                  </TopBack>
                  <ContentTab
                    isActive={currentTab === `${index + 1}`}
                    defaultTab={defaultTab}
                    index={index}
                    itemLength={items.length}
                  >
                    <Sarabun type="Subtitle1">{item.label}</Sarabun>
                    {item.isNotice && index === 1 ? (
                      <NoticeBox>
                        <Sarabun type="Caption" color={`${WHITE}`}>
                          {item.noticeNumber}
                        </Sarabun>
                      </NoticeBox>
                    ) : null}
                  </ContentTab>
                </LabelDiv>
              }
              value={`${index + 1}`}
              disabled={item.disabled}
            />
          )
        })}
      </AntTabs>
      {items.map((item, index) => {
        return (
          <TabPanel key={index} value={`${index + 1}`}>
            <ContentDiv
              defaultTabMarginBottom={defaultTabMarginBottom}
              isDefaultTab={`${defaultTab}` === currentTab}
              style={{ ...contentStyle }}
            >
              {item.content}
            </ContentDiv>
          </TabPanel>
        )
      })}
    </TabContext>
  )
}

export default TrackAssessmentTab
