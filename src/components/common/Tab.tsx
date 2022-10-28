import * as React from "react"
import { Tab as MuiTab } from "@mui/material"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import { TabPanel as MuiTabPanel } from "@mui/lab/"
import styled from "@emotion/styled"
import { CSSProperties, ReactNode, useCallback, useState } from "react"
import { GRAYSCALE_DARKGRAY_40, WHITE } from "../../constants/colors"

const AntTabs = styled(TabList)({
  "& .MuiTabs-indicator": {
    backgroundColor: "transparent",
  },
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
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${WHITE};
  border-radius: 0 0 8px 8px;
  border-left: 1px solid #dbdbdb;
  border-right: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`

const ActiveTab = styled(MuiTab)<{
  isActive?: boolean
  index: number
  itemLength: number
}>`
  padding: 0px;
  background-color: ${({ isActive }) => {
    return isActive ? `${WHITE}` : `${GRAYSCALE_DARKGRAY_40}`
  }};
  border-radius: ${({ index, itemLength }) => {
    return index === 0
      ? "8px 0 0 0"
      : index === itemLength - 1
      ? "0 8px 0 0"
      : "0 0 0 0"
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
  background-color: #dbdbdb;
  border-radius: ${({ index, itemLength }) => {
    return index === 0
      ? "8px 0 0 0"
      : index === itemLength - 1
      ? "0 8px 0 0"
      : "0 0 0 0"
  }};
`

const TopFront = styled.div<{
  defaultTab: number
  index: number
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ index, defaultTab }) => {
    return index < defaultTab ? "#65B2FF" : "#DBDBDB"
  }};
  border-radius: ${({ index, defaultTab }) => {
    return index === defaultTab - 1 ? "0 8px 0 0" : null
  }};
`

const TopCurrent = styled.div<{
  isActive: boolean
}>`
  width: ${({ isActive }) => {
    return isActive ? "100%" : 0
  }};
  height: 100%;
  background-color: #007dff;
  border-radius: 8px 8px 0 0;
`

const LabelDiv = styled.div`
  width: 100%;
  height: 100%;
`

const ContentTab = styled.div<{
  isActive: boolean
  defaultTab: number
  index: number
  itemLength: number
}>`
  display: flex;
  background-color: white;
  border: ${({ isActive }) => {
    return !isActive ? "1px solid #dbdbdb" : null
  }};
  opacity: ${({ index, defaultTab }) => {
    return index >= defaultTab ? "0.4" : null
  }};
  border-left: ${({ index, isActive }) => {
    return index === 0 && isActive ? "1px solid #dbdbdb" : null
  }};
  border-right: ${({ index, isActive, itemLength }) => {
    return index === itemLength - 1 && isActive ? "1px solid #dbdbdb" : null
  }};
`

export type TabItem = {
  label: ReactNode
  content?: ReactNode
  disabled?: boolean
}

type TabProps = {
  items: TabItem[]
  defaultTab?: number
  style?: CSSProperties
  defaultTabMarginBottom?: number
  contentStyle?: CSSProperties
}

const Tab = (props: TabProps) => {
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
                    <TopFront defaultTab={defaultTab} index={index}>
                      <TopCurrent isActive={currentTab === `${index + 1}`} />
                    </TopFront>
                  </TopBack>
                  <ContentTab
                    isActive={currentTab === `${index + 1}`}
                    defaultTab={defaultTab}
                    index={index}
                    itemLength={items.length}
                  >
                    {item.label}
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

export default Tab
