import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { first } from "lodash"
import { useMemo } from "react"
import Sarabun from "./Sarabun"
import { BLACK, WHITE } from "../../constants/colors"
import { Scale } from "../../services/entity-typed"

const ScoreDetailPosition = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-shadow: 0px 0px 0px ${BLACK};
`

const Score = styled.div<{
  bgColor: string
}>`
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  min-width: 32px;
  min-height: 32px;
  max-width: 32px;
  max-height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`
type ScoreType = {
  grade: string | number
  jsonScale: Scale
}

const GradeWithColors = (props: ScoreType) => {
  const { grade, jsonScale } = props
  const { scaleDetails } = jsonScale

  const finalScale = useMemo(() => {
    if (grade) {
      const jsonScaleDetail = scaleDetails.find(
        (scaleDetail) => scaleDetail.value === Number(grade)
      )
      return jsonScaleDetail
    } else {
      return first(scaleDetails)
    }
  }, [scaleDetails, grade])
  //
  return (
    <>
      <Score bgColor={`${finalScale?.color}1a` ?? WHITE}>
        <Sarabun type="H5" color={`${finalScale?.color}`}>
          {grade ?? "1"}
        </Sarabun>
      </Score>
      <Box width={5} />
      <ScoreDetailPosition>
        <Sarabun type="Body2" color={`${finalScale?.color}`}>
          {finalScale?.description ?? "-"}
        </Sarabun>
      </ScoreDetailPosition>
    </>
  )
}

export default GradeWithColors
