import styled from "@emotion/styled"
import { GRAYSCALE_DARKGRAY_60, WHITE, GRAYSCALE_DARKGRAY_80 } from "../constants/colors"

import Button from "./common/Button"
import Icon from "./common/Icon"

import Sarabun from "./common/Sarabun"

const ChangeQuarterContainer = styled.div`
  width: 242px;
  height: 64px;
  display: flex;
  flex-direction: row;
  /* background-color: green; */
  align-items: center;
  justify-content: center;
`

const QuarterDisplay = styled.div`
  width: 162px;
  height: 56px;
  border: 1px solid ${GRAYSCALE_DARKGRAY_60};
  border-radius: 8px;
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export type ChangeQuarterProps = {
  year?: string
  quarter?: string
  startDate?: string
  endDate?: string
}

const ChangeQuarter = (props: ChangeQuarterProps) => {
  const { year, quarter, startDate, endDate } = props

  return (
    <>
      <ChangeQuarterContainer>
        <Button
          isDisabledButton
          style={{
            width: 32,
            height: 32,
            minWidth: 32,
            minHeight: 32,
            borderRadius: 8,
          }}
        >
          <Icon iconName={"caretLeftWhite"} height={12} width={12} />
        </Button>
        <div style={{ width: 8 }} />
        <QuarterDisplay>
          <Sarabun size={14} weight={600}>
            {`${year}/${quarter}`}
          </Sarabun>
          <Sarabun size={14} weight={400} color={GRAYSCALE_DARKGRAY_80}>
            {`(${startDate}-${endDate})`}
          </Sarabun>
        </QuarterDisplay>
        <div style={{ width: 8 }} />
        <Button
          isDisabledButton
          style={{
            width: 32,
            height: 32,
            minWidth: 32,
            minHeight: 32,
            borderRadius: 8,
          }}
        >
          <Icon iconName={"caretRightWhite"} height={12} width={12} />
        </Button>
      </ChangeQuarterContainer>
    </>
  )
}

export default ChangeQuarter
