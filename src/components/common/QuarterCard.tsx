import styled from "@emotion/styled"
import { Card } from "@mui/material"
import { CSSProperties, ReactNode } from "react"
import Sarabun from "./Sarabun"

const CustomQuarterCard = styled(Card)`
  background: white;
  box-sizing: border-box;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
`
const HeaderArea = styled.div<{ headerColor: string }>`
  display: flex;
  flex: 1;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${({ headerColor }) => headerColor};
  box-sizing: border-box;
  align-items: center;
  border-radius: 8px 8px 0 0;
`

const BodyArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 16px 16px 16px;
  margin-top: auto;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;
`

export type QuarterCardProps = {
  title?: string
  titleComponent?: ReactNode
  children?: ReactNode
  style?: CSSProperties
  headerColor?: string
  bodyStyle?: CSSProperties
}

const QuarterCard = (props: QuarterCardProps) => {
  const {
    title,
    titleComponent,
    children,
    style,
    headerColor = "#0067CF",
    bodyStyle,
  } = props
  return (
    <CustomQuarterCard style={style}>
      <HeaderArea headerColor={headerColor}>
        {titleComponent ? (
          titleComponent
        ) : (
          <Sarabun size={28} color={"white"}>
            {title}
          </Sarabun>
        )}
      </HeaderArea>
      <BodyArea style={bodyStyle}>{children}</BodyArea>
    </CustomQuarterCard>
  )
}

export default QuarterCard
