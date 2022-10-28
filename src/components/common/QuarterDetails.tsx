import styled from "@emotion/styled"
import { Box, Card } from "@mui/material"
import { CSSProperties, MouseEvent, ReactNode } from "react"
import {
  GRAYSCALE_DARKGRAY_40,
  GRAYSCALE_LIGHTGRAY_10,
  GRAYSCALE_DARKGRAY_60,
} from "../../constants/colors"
import { ipadPro, mobile, tablet } from "../../utils/responsive-helper"
import Icon, { IconNameKeys } from "./Icon"
import Sarabun from "./Sarabun"

const CardStyled = styled(Card)`
  border: 1px solid ${GRAYSCALE_DARKGRAY_40};
  width: 100%;
  border-radius: 8;
  min-height: fit-content;
  box-sizing: border-box;
`

const StepAssessment = styled.div`
  grid-area: step;
  height: 100%;

  min-width: 60px;
  align-self: center;
  text-align: center;
  > * {
    padding: 14.5px;
    box-sizing: border-box;
  }
`

const ButtonLayout = styled.div`
  grid-area: button;
  flex: 2.5;
  align-self: center;
  text-align: center;
  min-width: 80px;
`

const FlexColumn = styled(Box)`
  display: grid;
  flex: 1;
  grid-template-areas: "icon detail step button";
  grid-template-columns: 64px auto minmax(auto, 156px) minmax(min-content, 186px);
  align-items: center;
  padding-left: 16px;
  height: 100%;

  /* border-bottom: 1px solid ${GRAYSCALE_DARKGRAY_40};
  > .detail {
    margin: 14.5px 0;
  } */

  ${mobile} {
    display: flex;
    flex-flow: column;
    grid-row-gap: 16px;
    padding: 16px;
  }

  ${tablet} {
    grid-template-columns: 64px auto minmax(auto, 150px) minmax(min-content, 260px);
    grid-template-areas:
      "icon detail detail detail"
      "step step . button";
    grid-row-gap: 16px;
    padding: 16px;
  }

  ${ipadPro} {
    grid-template-columns: 64px auto minmax(auto, 150px) minmax(min-content, 260px);
    grid-template-areas:
      "icon detail detail detail"
      "step step . button";
    grid-row-gap: 16px;
    padding: 16px;
  }
`

const ChildrenLayout = styled(Box)`
  background-color: ${GRAYSCALE_LIGHTGRAY_10};
`

const EmployeeDetailLayout = styled(Box)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  height: 100%;

  grid-area: detail;

  padding-left: 24px;
  box-sizing: border-box;

  cursor: ${(props) => {
    // console.debug({ props })
    return !!props?.onClick ? "pointer" : "default"
  }};
  /* > * {
    cursor: inherit;
  } */
`

type QuarterCardProps = {
  title?: string
  description?: string | ReactNode
  children?: ReactNode
  style?: CSSProperties
  button?: ReactNode
  stepAssessment: ReactNode
  date?: string
  borderColor?: string
  icon?: IconNameKeys
  onClick?: (event: MouseEvent<HTMLDivElement>) => void
}

const QuarterDetails = (props: QuarterCardProps) => {
  const {
    title,
    children,
    description,
    button,
    stepAssessment,
    date,
    onClick,
    borderColor = GRAYSCALE_DARKGRAY_40,
    style,
    icon = "searchFileCircle",
  } = props

  return (
    <CardStyled
      elevation={0}
      style={{
        border: `1px solid ${borderColor}`,
        width: "100%",
        borderRadius: 8,
        minHeight: "fit-content",
        ...style,
      }}
    >
      <FlexColumn>
        {/* <IconContainer className="icon"> */}
        <Icon iconName={icon} width={64} height={64} />
        {/* </IconContainer> */}
        <EmployeeDetailLayout onClick={onClick}>
          <Sarabun type="Caption" style={{ lineHeight: "18px" }}>
            {title}
            {typeof description === "string" ? (
              <Sarabun size={20} weight={600} style={{ marginTop: 6 }}>
                {description}
              </Sarabun>
            ) : (
              description
            )}
            {date && (
              <Sarabun type="Caption" color={GRAYSCALE_DARKGRAY_60} style={{ lineHeight: "18px" }}>
                {date}
              </Sarabun>
            )}
          </Sarabun>
        </EmployeeDetailLayout>
        <StepAssessment>{stepAssessment}</StepAssessment>
        {/* TODO: ซ่อนปุ่มไว้ทำไมหว่า */}
        {/* {!isMobile && <ButtonLayout>{button}</ButtonLayout>} */}
        <ButtonLayout>{button}</ButtonLayout>
      </FlexColumn>
      <ChildrenLayout>{children && children}</ChildrenLayout>
    </CardStyled>
  )
}

export default QuarterDetails
