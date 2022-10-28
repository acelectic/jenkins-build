import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import Sarabun from "../../../components/common/Sarabun"
import {
  GRAYSCALE_DARKGRAY_60,
  SEMANTIC_SUCCESS_DARK,
} from "../../../constants/colors"

const ActiveArea = styled.div`
  display: flex;
  align-items: center;
`

const ActiveCircle = styled.div<{ isActive: boolean }>`
  border-radius: 50%;
  background-color: ${({ isActive }) =>
    isActive ? SEMANTIC_SUCCESS_DARK : GRAYSCALE_DARKGRAY_60};
  height: 8px;
  width: 8px;
`
type ActiveStatusProps = {
  isActive?: boolean
  textStatus?: string
}
const ActiveStatus = (props: ActiveStatusProps) => {
  const { isActive = false, textStatus } = props
  return (
    <ActiveArea>
      <ActiveCircle isActive={isActive} />
      <Box width={8} />
      <Sarabun
        type="Body2"
        color={isActive ? SEMANTIC_SUCCESS_DARK : GRAYSCALE_DARKGRAY_60}
      >
        {textStatus}
      </Sarabun>
    </ActiveArea>
  )
}

export default ActiveStatus
