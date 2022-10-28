import styled from "@emotion/styled"
import Link from "@mui/material/Link"
import { CSSProperties } from "react"
import { SECONDARY_LIGHT } from "../../constants/colors"
import Icon, { IconNameKeys } from "./Icon"
import Sarabun from "./Sarabun"

const GoToPrevious = styled(Link)`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 8px;
`

const MySarabun = styled(Sarabun)`
  border-bottom: 1.2px solid ${SECONDARY_LIGHT};
  padding-bottom: 2px;
`

type GoBackProps = {
  onGoBackClick?: () => void
  iconName?: IconNameKeys
  goBackText?: string
  iconWidth?: number
  iconHeight?: number
  textColor?: string
  textStyle?: CSSProperties
}

const GoBackHeader = (props: GoBackProps) => {
  const {
    onGoBackClick,
    iconName = "caretLeftSecondaryRightBlue",
    goBackText = "ย้อนกลับ",
    textStyle,
    iconWidth = 16,
    iconHeight = 16,
    textColor = SECONDARY_LIGHT,
  } = props

  return (
    <GoToPrevious underline="none" onClick={onGoBackClick}>
      <Icon iconName={iconName} height={iconHeight} width={iconWidth} />
      <MySarabun type="Body2" color={textColor} style={{ ...textStyle }}>
        {`${goBackText}`}
      </MySarabun>
    </GoToPrevious>
  )
}

export default GoBackHeader
