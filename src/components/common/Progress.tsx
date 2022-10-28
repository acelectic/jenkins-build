import styled from "@emotion/styled"
import { CSSProperties, useState } from "react"
import { useTranslation } from "react-i18next"
import Sarabun from "./Sarabun"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin: 3px 0 7.5px 0;
`

const Header = styled.div<{ haveActualScore: boolean }>`
  display: ${({ haveActualScore }) => {
    return !haveActualScore ? "none" : ""
  }};
`

const ProgressDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
  margin-top: 12.5px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  background-color: #dbdbdb;
  margin: 0 8px 0 8px;
`

const ProgressWidth = styled.div<{ haveActualScore: boolean }>`
  height: 100%;
  visibility: ${({ haveActualScore }) => {
    return haveActualScore ? "visible" : "hidden"
  }};
`

type ProgressProps = {
  actual: number | null | undefined | string
  scoreType: string | null | undefined
  className?: string
  style?: CSSProperties
  fontColor?: string
  isInputFieldEmpty?: boolean
}

const Progress = (props: ProgressProps) => {
  const { className, style } = props

  const [currentScore] = useState<number>(5)

  const [haveActualScore] = useState<boolean>(true)

  const { t } = useTranslation()
  return (
    <Body className={className} style={style}>
      <Header haveActualScore={haveActualScore}>
        <Sarabun type={"Caption"} style={{ lineHeight: "18px" }} weight={600}>
          {t(`คะแนน`)}
        </Sarabun>
        <Sarabun type={"H6"} style={{ lineHeight: "24px" }} weight={600}>
          {currentScore}
        </Sarabun>
      </Header>
      <ProgressDiv>
        <Sarabun size={8} weight={600}>
          0
        </Sarabun>
        <ProgressBar>
          <ProgressWidth
            style={{ width: `100%`, backgroundColor: "green" }}
            haveActualScore={haveActualScore}
          />
        </ProgressBar>
        <Sarabun size={8} weight={600}>
          {5}
        </Sarabun>
      </ProgressDiv>
    </Body>
  )
}

export default Progress
