import styled from "@emotion/styled"
import { Box } from "@mui/material"
import Sarabun from "./common/Sarabun"
import {
  ERROR,
  SECONDARY_BG,
  SEMANTIC_ERROR_DARK,
  SEMANTIC_SUCCESS_DARK,
} from "../constants/colors"
import Icon from "./common/Icon"

const Body = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  justify-content: space-between;
`

const Column = styled.div<{
  color?: string
  width?: number
}>`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 8px;
  flex: none;
  align-self: stretch;
  background-color: ${({ color }) => color};
  width: ${({ width }) => `${width}px`};
  min-width: 230px;
`
const SumDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const Template = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
  align-self: stretch;
  justify-content: center;
`

const Detail = styled.div`
  display: flex;
  flex-direction: row;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

type TargetCardsProps = {
  sumScore?: number
}
const SumTargetCards = (props: TargetCardsProps) => {
  const { sumScore } = props
  return (
    <Body>
      <Column />
      <Detail>
        <Column width={447}>
          <Template style={{ alignItems: "flex-end", gap: 0 }}>
            <Row>
              <Sarabun type="H5">{"รวม"}</Sarabun>
              <Sarabun type="H5" color={ERROR}>
                {"*"}
              </Sarabun>
            </Row>
            <Sarabun type="Body2">{"ผลรวมต้องรวมได้ 100 %"}</Sarabun>
          </Template>
        </Column>
        <Column color={SECONDARY_BG} width={200}>
          <Template>
            <SumDetail>
              {sumScore === 100 ? (
                <Icon iconName="checkCircle" width={24} height={24} />
              ) : (
                <div></div>
              )}

              <Sarabun
                type={"H6"}
                color={`${
                  sumScore === 100 ? SEMANTIC_SUCCESS_DARK : SEMANTIC_ERROR_DARK
                }`}
              >
                {sumScore || ""}
              </Sarabun>
              <Sarabun type="H6">{"%"}</Sarabun>
            </SumDetail>
          </Template>
        </Column>
        <Box minWidth={106} width={106} />
      </Detail>
    </Body>
  )
}

export default SumTargetCards
