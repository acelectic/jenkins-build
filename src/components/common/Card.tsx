import {
  Card as BaseMuiCard,
  CardContent,
  CardProps as BaseCardProps,
  CardActions,
} from "@mui/material"
import styled from "@emotion/styled"
import { CSSProperties } from "react"

const MuiCard = styled(BaseMuiCard)`
  display: grid;
  /* justify-items: start; */
  align-items: start;
`

const MuiCardContent = styled(CardContent)`
  grid-column-start: 1;
  grid-row-start: 1;
  display: flex;
  flex-flow: column;
  height: 100%;
`

const CoverContent = styled(CardContent)`
  grid-column-start: 1;
  grid-row-start: 1;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  height: 100%;
  z-index: 1000;
`
const MuiCardAction = styled(CardActions)`
  margin-top: auto;
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`

type CardProps = {
  disabled?: boolean
  actionContent?: React.ReactNode
  styleContent?: CSSProperties
  styleCard?: CSSProperties
} & BaseCardProps

// type CardPortalProps = {
//   children: React.ReactNode
// }

const Card = (props: CardProps) => {
  const {
    children,
    disabled = false,
    actionContent,
    styleContent,
    styleCard,
    ...restProps
  } = props
  return (
    <MuiCard {...restProps} style={styleCard}>
      <MuiCardContent style={styleContent}>{children}</MuiCardContent>
      {!disabled && actionContent && (
        <MuiCardAction>{actionContent}</MuiCardAction>
      )}
      {disabled && <CoverContent />}
    </MuiCard>
  )
}
// const CardPortal = (props: CardPortalProps) => {
//   const { children } = props
//   return
// }

export default Card
