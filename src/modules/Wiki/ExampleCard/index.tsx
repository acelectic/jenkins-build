import Card from "../../../components/common/Card"
import { Divider as MuiDivider } from "@mui/material"
import { spacing } from "@mui/system"
import styled from "styled-components/macro"
import Kanit from "../../../components/common/Kanit"
import { mobile } from "../../../utils/responsive-helper"

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  margin-bottom: 10px;

  ${mobile} {
    grid-template-columns: auto;
  }
`
const Divider = styled(MuiDivider)(spacing)

const ExampleCard = () => {
  return (
    <>
      <Card>
        <Kanit type="XsTitle">
          import Card from "../../../components/common/Card"
        </Kanit>
        <GridLayout>
          <Card>This is Card</Card>
          <pre>{`<Card>This is Card</Card>`}</pre>
        </GridLayout>
        <Divider my={6} />
      </Card>
      <Card disabled elevation={2}>
        <Kanit>This is Disable Card</Kanit>
      </Card>
    </>
  )
}

export default ExampleCard
