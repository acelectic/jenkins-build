import Icon, { IconNameKeys } from "./common/Icon"
import Sarabun, { SarabunTypes } from "./common/Sarabun"
import styled from "@emotion/styled"
import { WHITE } from "../constants/colors"
import { ReactNode } from "react"

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
`

type QuarterCardTitleProps = {
  leftIconName?: IconNameKeys
  title: string
  rightComponent?: ReactNode
  tooltipText?: string
  isShowTooltip?: boolean
  textColor?: string
  typeText?: SarabunTypes
}

const QuarterCardTitle = (props: QuarterCardTitleProps) => {
  const { leftIconName = "home", title, rightComponent, textColor, typeText } = props
  return (
    <TitleContainer>
      <LeftSide>
        <Icon iconName={leftIconName} width={32} height={32} />
        <Sarabun color={textColor ?? WHITE} type={typeText ?? "H4"}>
          {title}
        </Sarabun>
      </LeftSide>
      <RightSide>{rightComponent}</RightSide>
    </TitleContainer>
  )
}

export default QuarterCardTitle
