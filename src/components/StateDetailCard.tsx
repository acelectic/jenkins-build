import styled from "@emotion/styled"
// import { Button } from '@mui/material'
import { useCallback } from "react"
import Sarabun from "./common/Sarabun"
import { useRouter } from "../utils/helper"
import Button from "./common/Button"
import TimeManagementImg from "../assets/images/time-management.png"
import { PRIMARY, WHITE } from "../constants/colors"
import { AlertTriangle } from "react-feather"
import { Box } from "@mui/material"

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  /* padding: 40px 0 0px 0; */
  width: 100%;
  text-align: center;
  margin-bottom: 64px;
  margin-top: 64px;
`

const SarabunDefault = styled(Sarabun)`
  line-height: 40px;
`

const SarabunTitle = styled(Sarabun)`
  margin-top: 10px;
  line-height: 40px;
  text-align: center;
`

const SarabunDescription = styled(Sarabun)`
  margin-top: 6px;
  line-height: 40px;
  text-align: center;
`

const SarabunDetail = styled(Sarabun)`
  margin-top: 10px;
  line-height: 40px;
  text-align: center;
  max-width: 960px;
  text-align: center;
`

const ActionSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0px solid black;
`

// const BackToDashBoardButton = styled(Button)`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   /* padding: 18px 22px; */
//   background: ${PRIMARY};
//   box-sizing: border-box;
//   gap: 18px;
// `

type StateDetailCardProps = {
  // titleIconName?: IconNameKeys
  titleIconWidth?: number
  titleIconHeight?: number
  titleImage?: string
  titleMessage?: string
  descriptionMessage?: string
  detailMessage?: string
  detailDescriptionMessage?: string
  onCancelClick?: React.MouseEventHandler<Element>
  onCancelText?: string
  hideAction?: boolean
  isHaveButton?: boolean
}

const StateDetailCard = (props: StateDetailCardProps) => {
  const {
    titleImage = TimeManagementImg,
    titleMessage = "Enter your Title Message",
    descriptionMessage = "Enter your Description Message",
    detailMessage = "Enter your Detail Message",
    detailDescriptionMessage = "",
    onCancelClick,
    onCancelText = "ยกเลิกคำร้องขอแก้ไขเป้าหมาย",
    hideAction = false,
    isHaveButton = true,
  } = props

  const { push } = useRouter()

  const onGoBackClick = useCallback(() => {
    push("/dashboard")
  }, [push])

  return (
    <Body>
      {/* <CustomIcon iconName={titleIconName} width={titleIconWidth} height={titleIconHeight} /> */}
      <img src={titleImage} alt="title" />
      <SarabunTitle>{titleMessage}</SarabunTitle>
      <SarabunDescription>{descriptionMessage}</SarabunDescription>
      <SarabunDetail>{detailMessage}</SarabunDetail>
      {detailDescriptionMessage && (
        <Sarabun style={{ lineHeight: "15px" }}>
          {detailDescriptionMessage}
        </Sarabun>
      )}

      {isHaveButton && (
        <ActionSection style={{ display: hideAction ? "none" : "flex" }}>
          <Button onClick={onGoBackClick} startIcon={<AlertTriangle />}>
            {/* <CustomIcon iconName="home" width={36} height={36} /> */}
            <SarabunDefault color={WHITE}>{`กลับ PMS แดชบอร์ด`}</SarabunDefault>
          </Button>

          {onCancelClick && (
            <>
              <Box style={{ width: 84 }} />
              {/* <Sarabun size={20} weight={700} isLink={true} onClick={onCancelClick}>
              {onCancelText}
            </Sarabun> */}
              <Button onClick={onCancelClick}>
                <Sarabun color={PRIMARY}>{onCancelText}</Sarabun>
              </Button>
            </>
          )}
        </ActionSection>
      )}
    </Body>
  )
}

export default StateDetailCard
